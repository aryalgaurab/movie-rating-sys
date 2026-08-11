import Link from "next/link";
import RegisterForm from "./RegisterForm";

export default function RegisterPage() {
  return (
    <div className="max-w-md mx-auto my-12 bg-white border border-stone-200/80 rounded-2xl p-8 shadow-sm">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-stone-900">Create an Account</h1>
        <p className="text-xs text-stone-500 mt-1">Join CineRate to post reviews and ratings</p>
      </div>

      <RegisterForm />

      <p className="text-center text-xs text-stone-500 mt-6">
        Already have an account?{" "}
        <Link href="/login" className="text-amber-700 font-semibold hover:underline">
          Log in
        </Link>
      </p>
    </div>
  );
}