import Link from "next/link";
import { loginAction } from "@/lib/actions/authActions";

export default function LoginPage() {
  return (
    <div className="max-w-md mx-auto my-12 bg-white border border-stone-200/80 rounded-2xl p-8 shadow-sm">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-stone-900">Welcome Back</h1>
        <p className="text-xs text-stone-500 mt-1">Log in to manage movies or write reviews</p>
      </div>

      <form action={loginAction} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-stone-700 mb-1">Email Address</label>
          <input
            type="email"
            name="email"
            required
            placeholder="user@movies.com"
            className="w-full bg-stone-50 border border-stone-300 rounded-lg px-3.5 py-2 text-sm text-stone-800 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-stone-700 mb-1">Password</label>
          <input
            type="password"
            name="password"
            required
            placeholder="••••••••"
            className="w-full bg-stone-50 border border-stone-300 rounded-lg px-3.5 py-2 text-sm text-stone-800 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-amber-600 hover:bg-amber-700 text-white font-semibold text-sm py-2.5 rounded-lg shadow-sm transition"
        >
          Sign In
        </button>
      </form>

      <p className="text-center text-xs text-stone-500 mt-6">
        Don't have an account?{" "}
        <Link href="/register" className="text-amber-700 font-semibold hover:underline">
          Register here
        </Link>
      </p>
    </div>
  );
}