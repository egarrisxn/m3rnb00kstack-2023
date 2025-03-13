import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { Alert } from "./Alert";

const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5050";

export function AuthForm({ mode }) {
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm();

  const { login } = useAuth();
  const navigate = useNavigate();

  const isLoginMode = mode === "login";

  const onSubmit = async (formData) => {
    const endpoint = `${apiUrl}/api/users/${
      isLoginMode ? "login" : "register"
    }`;
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        await login(data); // Automatically log in the user
        reset();
        alert(
          isLoginMode
            ? "Login successful!"
            : "Registration successful! You are now logged in."
        );
        navigate("/");
      } else {
        setError("serverError", {
          message: data.message || `An error occurred during ${mode}`,
        });
      }
    } catch (error) {
      setError("serverError", {
        message: `Error connecting to the ${mode} server`,
      });
    }
  };

  return (
    <div className="mt-8 sm:mt-24 shadow-slate-400 shadow-lg dark:shadow-slate-100/10 sm:border dark:bg-[#282f48]   bg-white text-black sm:rounded-3xl container max-w-xl w-full mx-auto px-8 py-10 ">
      <h2 className="text-2xl font-semibold mb-8 dark:text-slate-200 text-slate-900">
        {isLoginMode ? "Login" : "Register"}
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {errors.serverError && (
          <Alert message={errors.serverError.message} type="error" />
        )}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-slate-700 dark:text-slate-400"
          >
            Email
          </label>
          <input
            className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            type="email"
            id="email"
            {...register("email", { required: "Email is required" })}
          />
          {errors.email && (
            <span className="text-red-600">{errors.email.message}</span>
          )}
        </div>
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-slate-700 dark:text-slate-400"
          >
            Password
          </label>
          <input
            className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            id="password"
            type="password"
            {...register("password", { required: "Password is required" })}
          />
          {errors.password && (
            <span className="text-red-600">{errors.password.message}</span>
          )}
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {isLoginMode ? "Login" : "Register"}
          </button>
        </div>
        <div className="flex justify-center mt-4">
          <button
            type="button"
            onClick={() => navigate(isLoginMode ? "/register" : "/login")}
            className="text-indigo-600 hover:text-indigo-500"
          >
            {isLoginMode
              ? "Don't have an account? Register"
              : "Already have an account? Login"}
          </button>
        </div>
      </form>
    </div>
  );
}
