import express from "express";
import cors from "cors";
import { fileURLToPath } from "url";
import path, { dirname } from "path";
import books from "./routes/books.js";
import users from "./routes/users.js";
import "dotenv/config";

const PORT = process.env.PORT || "";
const app = express();

// Fix for __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Define allowed origins for CORS
const allowedOrigins = [
  "http://localhost:4173",
  "http://localhost:4173/",
  "http://localhost:5173",
  "http://localhost:5173/",
  "http://localhost:5050",
  "http://localhost:5050/",
  // "https://m3rnb00kstack-f375270a798a.herokuapp.com",
  // "https://m3rnb00kstack-f375270a798a.herokuapp.com/",
  // "https://m3rnb00kstack.netlify.app",
  // "https://m3rnb00kstack.netlify.app/",
];

// Middleware setup
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin, like mobile apps or curl requests
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
    credentials: true,
  })
);

// Handle preflight requests
app.options("*", cors());

app.use(express.json());

// Route handlers
app.use("/api/users", users);
app.use("/api/books", books);

// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, "./client/dist")));

// Handle all other routes by serving the React frontend's index.html
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/dist", "index.html"));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is working at Port ${PORT} or http://localhost:${PORT}`);
});
