import { NavLink } from "react-router-dom";

export function HomePage() {
  return (
    <>
      <div className="container w-full max-w-6xl text-center sm:text-justify mx-auto p-6 space-y-1">
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
          Welcome to The MERN Book Stack!
        </h1>
        <div className="flex flex-row items-center gap-1 justify-center sm:justify-start font-medium text-sm sm:text-lg">
          <NavLink
            to="/login"
            aria-label="Login"
            className="flex text-blue-600 hover:underline underline-offset-4"
          >
            Login
          </NavLink>
          <p className="text-slate-700 dark:text-slate-400">
            to start adding books!
          </p>
        </div>
      </div>
      <div className="p-4">
        <div className="mt-4 container max-w-6xl w-full mx-auto p-2 rounded-3xl bg-white border shadow-lg shadow-slate-400 dark:shadow-slate-100/10">
          <img
            src="/hero.png"
            alt="Logo"
            className="flex rounded-lg object-cover"
          />
        </div>
      </div>
    </>
  );
}
