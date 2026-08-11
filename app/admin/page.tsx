import { getSessionUser } from "@/lib/auth";
import { createMovie } from "@/lib/actions/movieActions";
import { redirect } from "next/navigation";

export default async function AdminPage() {
  const user = await getSessionUser();

  if (!user || user.role !== "ADMIN") {
    redirect("/login");
  }

  return (
    <div className="max-w-2xl mx-auto my-8">
      <div className="bg-white border border-stone-200/80 rounded-2xl p-8 shadow-sm">
        <h1 className="text-2xl font-bold text-stone-900">Admin Dashboard</h1>
        <p className="text-xs text-stone-500 mt-1 mb-6">
          Add a new movie entry to the CineRate database.
        </p>

        <form action={createMovie} className="space-y-5">
          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">Movie Title</label>
            <input
              type="text"
              name="title"
              required
              placeholder="e.g. Dune: Part Two"
              className="w-full bg-stone-50 border border-stone-300 rounded-lg px-3.5 py-2 text-sm text-stone-800 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">Poster Image URL</label>
            <input
              type="url"
              name="imageUrl"
              required
              placeholder="https://images.unsplash.com/photo-..."
              className="w-full bg-stone-50 border border-stone-300 rounded-lg px-3.5 py-2 text-sm text-stone-800 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">Description</label>
            <textarea
              name="description"
              rows={4}
              required
              placeholder="Provide a synopsis..."
              className="w-full bg-stone-50 border border-stone-300 rounded-lg px-3.5 py-2 text-sm text-stone-800 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500"
            />
          </div>

          <button
            type="submit"
            className="bg-amber-600 hover:bg-amber-700 text-white font-semibold text-sm px-6 py-2.5 rounded-lg shadow-sm transition"
          >
            Add Movie to Catalog
          </button>
        </form>
      </div>
    </div>
  );
}