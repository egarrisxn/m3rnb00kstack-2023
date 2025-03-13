import { NavLink } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { ThemeToggle } from "./ThemeToggle";

export const Navbar = ({ pages }) => {
  const { user, logout } = useAuth();

  return (
    <header className="mb-8 sm:pt-4">
      <nav className="p-4 sm:py-5 shadow-lg dark:shadow-slate-100/10 sm:border bg-white text-black border-b sm:rounded-3xl container mx-auto flex flex-col sm:flex-row justify-center sm:justify-between items-center gap-4 sm:gap-0">
        <NavLink
          to="/"
          aria-label="Home"
          className="flex text-slate-600 dark:text-slate-400 text-3xl leading-none tracking-tight font-black"
        >
          <img src="/book.png" alt="Logo" className="size-8 pr-0.5" /> M
          <span className="text-red-400">B</span>S
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
};
