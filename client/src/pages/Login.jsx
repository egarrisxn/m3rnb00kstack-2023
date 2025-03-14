import { AuthForm } from "../components/AuthForm";

export function LoginPage() {
  return (
    <div className="container w-full max-w-6xl text-center sm:text-justify mx-auto p-6 space-y-1">
      <div className="sm:mt-8">
        <AuthForm mode="login" />
      </div>
    </div>
  );
}
