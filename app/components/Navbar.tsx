import Link from "next/link";
import { getSessionUser } from "@/lib/auth";
import { logoutAction } from "@/lib/actions/authActions";

export default async function Navbar() {
  const user = await getSessionUser();

  return (
    <header className="sticky top-0 z-50 bg-white/90 border-b border-stone-200/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-2xl">🎬</span>
          <span className="text-xl font-extrabold tracking-tight text-stone-800">
            Cine<span className="text-amber-600">Rate</span>
          </span>
        </Link>

        <nav className="flex items-center space-x-6">
          <Link href="/" className="text-sm font-medium text-stone-600 hover:text-stone-900 transition">
            Catalog
          </Link>

          {user?.role === "ADMIN" && (
            <Link
              href="/admin"
              className="bg-amber-100 hover:bg-amber-200 text-amber-800 text-xs font-semibold px-3 py-1.5 rounded-lg border border-amber-300/60 transition"
            >
              Admin Panel
            </Link>
          )}

          {user ? (
            <div className="flex items-center space-x-3 pl-2 border-l border-stone-200">
              <div className="text-right hidden sm:block">
                <p className="text-xs font-semibold text-stone-800">{user.name}</p>
                <p className="text-[10px] text-amber-700 font-mono uppercase tracking-wider">
                  {user.role}
                </p>
              </div>
              <form action={logoutAction}>
                <button
                  type="submit"
                  className="text-xs font-medium text-stone-500 hover:text-stone-800 bg-stone-100 hover:bg-stone-200 px-3 py-1.5 rounded-lg border border-stone-200 transition"
                >
                  Logout
                </button>
              </form>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <Link
                href="/login"
                className="text-sm font-medium text-stone-600 hover:text-stone-900 px-3 py-1.5 transition"
              >
                Sign In
              </Link>
              <Link
                href="/register"
                className="bg-stone-900 hover:bg-stone-800 text-white text-sm font-medium px-4 py-1.5 rounded-lg shadow-sm transition"
              >
                Register
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}