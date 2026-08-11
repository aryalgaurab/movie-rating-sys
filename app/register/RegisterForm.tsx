"use client";

import { useState, useTransition, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { registerAction } from "@/lib/actions/authActions";

export default function RegisterForm() {
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    startTransition(async () => {
      setError(null);

      try {
        const result = await registerAction(formData);

        if (!result.success) {
          setError(result.message ?? "Registration failed.");
          return;
        }

        router.push("/login");
      } catch (error) {
        console.error("Register action failed:", error);
        setError("Registration failed. Please try again.");
      }
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <div>
        <label className="block text-xs font-semibold text-stone-700 mb-1">Full Name</label>
        <input
          type="text"
          name="name"
          required
          placeholder="Alex Mercer"
          className="w-full bg-stone-50 border border-stone-300 rounded-lg px-3.5 py-2 text-sm text-stone-800 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500"
        />
      </div>

      <div>
        <label className="block text-xs font-semibold text-stone-700 mb-1">Email Address</label>
        <input
          type="email"
          name="email"
          required
          placeholder="alex@example.com"
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
        disabled={isPending}
        className="w-full bg-stone-900 hover:bg-stone-800 text-white font-semibold text-sm py-2.5 rounded-lg shadow-sm transition disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isPending ? "Creating account..." : "Sign Up"}
      </button>
    </form>
  );
}
