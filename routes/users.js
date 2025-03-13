import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { ObjectId } from "mongodb";
import db from "../db/connection.js";
import auth from "../utils/middleware.js";
import "dotenv/config";

const router = express.Router();
const userCollection = db.collection("users");

const JWT_SECRET = process.env.JWT_SECRET;

// Helper function to validate MongoDB ObjectId format
const isValidObjectId = (id) => /^[a-fA-F0-9]{24}$/.test(id);

//! Private Routes

// GET the user (/api/users/auth) - Authenticated users only
router.get("/auth", auth, async (request, response) => {
  const { email } = request.user; // Extract email from the token

  try {
    // Find user by email
    const user = await userCollection.findOne({ email });

    if (!user) {
      return response.status(404).send({ message: "User not found" });
    }

    // Exclude the password field from the response
    const { password, ...userWithoutPassword } = user;
    response.status(200).send(userWithoutPassword);
  } catch (error) {
    response
      .status(500)
      .send({ message: "Error fetching user", error: error.message });
  }
});

//! Public Routes

// REGISTER a new user (/api/users/register) - Public access
router.post("/register", async (request, response) => {
  const { email, password } = request.body;

  try {
    // Check if user already exists
    const userExists = await userCollection.findOne({ email });

    if (userExists) {
      return response.status(400).send({ message: "User already exists" });
    }

    // Hash the password and create a new user
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = { email, password: hashedPassword };

    await userCollection.insertOne(newUser);

    // Generate a JWT token
    const token = jwt.sign({ email: newUser.email }, JWT_SECRET, {
      expiresIn: "1h",
    });

    response.status(201).send({ token });
  } catch (error) {
    response.status(500).send({ message: "Error registering user" });
  }
});

// LOGIN the user (/api/users/login) - Public access
router.post("/login", async (request, response) => {
  const { email, password } = request.body;

  try {
    // Find user by email
    const user = await userCollection.findOne({ email });

    if (!user)
      return response.status(400).send({ message: "Invalid credentials" });

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return response.status(400).send({ message: "Invalid credentials" });

    // Generate a JWT token
    const token = jwt.sign({ email: user.email }, JWT_SECRET, {
      expiresIn: "1h",
    });

    response.status(200).send({ token });
  } catch (error) {
    response.status(500).send({ message: "Error logging in" });
  }
});

// GET all users (/api/users/all) - Public access
router.get("/all", async (request, response) => {
  try {
    // Fetch all users from the database
    const users = await userCollection.find({}).toArray();

    // Exclude the password field from the response
    const usersWithoutPasswords = users.map(
      ({ password, ...userWithoutPassword }) => userWithoutPassword
    );

    response.status(200).send(usersWithoutPasswords);
  } catch (error) {
    response.status(500).send({ message: "Error fetching users" });
  }
});

// GET user by ID (/api/users/:id) - Public access
router.get("/:id", async (request, response) => {
  const { id } = request.params;

  // Check if the ID is a valid MongoDB ObjectId
  if (!isValidObjectId(id)) {
    return response.status(400).send({ message: "Invalid user ID format" });
  }

  try {
    // Find user by ID
    const user = await userCollection.findOne({ _id: new ObjectId(id) });

    if (!user) return response.status(404).send({ message: "User not found" });

    // Exclude the password field from the response
    const { password, ...userWithoutPassword } = user;
    response.status(200).send(userWithoutPassword);
  } catch (error) {
    response.status(500).send({ message: "Error fetching user" });
  }
});

export default router;
