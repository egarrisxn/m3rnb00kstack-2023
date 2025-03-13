export function useEnv() {
  const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5050";
  return { apiUrl };
}
