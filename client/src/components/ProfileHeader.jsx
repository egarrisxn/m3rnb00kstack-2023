import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { apiUrl } from "../hooks/useEnv";

export function ProfileHeader() {
  const { user } = useAuth();
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!user?.token) {
        setError("User not authenticated.");
        return;
      }

      try {
        const response = await fetch(`${apiUrl}/api/users/auth`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }

        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setError(`Failed to fetch user data: ${error.message}`);
      }
    };

    fetchData();
  }, [user?.token]);

  return (
    <>
      <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
        Hello, {userData?.email || "Guest"}! {/* Display fetched email */}
      </h1>
      {error && <p className="text-red-500">{error}</p>}
    </>
  );
}
