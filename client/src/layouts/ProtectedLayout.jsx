import { Navigate, useOutlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";

export function ProtectedLayout() {
  const { user } = useAuth();
  const outlet = useOutlet();

  if (!user) {
    return <Navigate to="/" />;
  }

  return (
    <main className="min-h-screen flex flex-col w-full mx-auto bg-slate-50 dark:bg-gray-800 text-black dark:text-white">
      <Navbar
        pages={[
          { label: "Books", path: "all" },
          { label: "Profile", path: "profile" },
        ]}
      />
      <div className="flex flex-1 flex-col size-full mx-auto">{outlet}</div>
      <Footer />
    </main>
  );
}
