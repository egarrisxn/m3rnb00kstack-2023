import { NavLink } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { ThemeToggle } from "./ThemeToggle";

export function Navbar({ pages }) {
  const { user, logout } = useAuth();

  return (
    <header className="mb-8 sm:pt-4">
      <nav className="p-4 sm:py-5 shadow-lg shadow-slate-400 dark:shadow-lg dark:shadow-slate-100/10 sm:border bg-[#282f48] text-white border-b sm:rounded-3xl container mx-auto flex flex-col sm:flex-row justify-center sm:justify-between items-center gap-4 sm:gap-0">
        <NavLink
          to="/"
          aria-label="Home"
          className="flex flex-row items-center gap-0.5"
        >
          <img src="/m3rn.png" alt="Logo" className="size-8 " />{" "}
          <p className=" text-4xl leading-none tracking-tighter font-black text-slate-600 dark:text-slate-400 mb-1">
            <span className="text-red-600">B00K</span>STACK
          </p>
        </NavLink>
        <div className="flex items-center flex-row gap-3 sm:gap-4">
          {pages?.map((page) => (
            <NavLink
              key={page.path}
              to={page.path}
              style={({ isActive }) => {
                return {
                  color: isActive ? "red" : "inherit",
                };
              }}
              className={({ isActive, isPending }) => {
                return isActive ? "active" : isPending ? "pending" : "";
              }}
            >
              {page.label}
            </NavLink>
          ))}
          {!!user && (
            <NavLink
              key={"logout"}
              onClick={logout}
              className=" hover:text-slate-500"
              aria-label="logout"
            >
              Logout
            </NavLink>
          )}
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
