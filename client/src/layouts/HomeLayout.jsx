import { Navigate, useOutlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";

export function HomeLayout() {
  const { user } = useAuth();
  const outlet = useOutlet();

  if (user) {
    return <Navigate to="/profile" replace />;
  }

  return (
    <main className="min-h-screen flex flex-col mx-auto w-full bg-slate-50 dark:bg-gray-800 text-black dark:text-white">
      <Navbar
        pages={[
          { label: "Books", path: "books" },
          { label: "Login", path: "login" },
        ]}
      />
      <div className="flex flex-1 flex-col size-full mx-auto">{outlet}</div>
      <Footer />
    </main>
  );
}
