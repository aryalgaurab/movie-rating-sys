import Link from "next/link";
import LoginForm from "./LoginForm";

export default function LoginPage() {
  return (
    <div className="max-w-md mx-auto my-12 bg-white border border-stone-200/80 rounded-2xl p-8 shadow-sm">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-stone-900">Welcome Back</h1>
        <p className="text-xs text-stone-500 mt-1">Log in to manage movies or write reviews</p>
      </div>

      <LoginForm />

      <p className="text-center text-xs text-stone-500 mt-6">
        Don't have an account?{" "}
        <Link href="/register" className="text-amber-700 font-semibold hover:underline">
          Register here
        </Link>
      </p>
    </div>
  );
}