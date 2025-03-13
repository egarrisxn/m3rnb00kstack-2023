import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="pt-1"
    >
      {theme === "dark" ? (
        <Moon size={18} className="text-yellow-500 hover:text-yellow-600" />
      ) : (
        <Sun size={18} className="text-slate-800 hover:text-slate-950" />
      )}
    </button>
  );
}
