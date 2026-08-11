import { prisma } from "@/lib/prisma";
import { getSessionUser } from "@/lib/auth";
import { submitReview } from "@/lib/actions/reviewActions";
import StarRating from "../../components/StarRating";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function MovieDetailPage({ params }: Props) {
  const { id } = await params;
  const user = await getSessionUser();

  const movie = await prisma.movie.findUnique({
    where: { id },
    include: {
      reviews: {
        include: { user: { select: { name: true } } },
        orderBy: { createdAt: "desc" },
      },
    },
  });

  if (!movie) notFound();

  const userReview = movie.reviews.find((r) => r.userId === user?.id);
  const totalReviews = movie.reviews.length;
  const avgRating =
    totalReviews > 0
      ? movie.reviews.reduce((sum: number, r: { rating: number }) => sum + r.rating, 0) / totalReviews
      : null;

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div className="bg-white border border-stone-200/80 rounded-2xl p-6 sm:p-8 shadow-sm flex flex-col md:flex-row gap-8">
        <img
          src={movie.imageUrl}
          alt={movie.title}
          className="w-full md:w-56 h-80 object-cover rounded-xl bg-stone-100 shadow-sm"
        />
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-extrabold text-stone-900">{movie.title}</h1>
            <div className="flex items-center space-x-3 mt-3">
              {avgRating !== null ? (
                <>
                  <StarRating rating={avgRating} />
                  <span className="text-sm font-semibold text-stone-800">
                    {avgRating.toFixed(1)} / 5.0
                  </span>
                </>
              ) : (
                <span className="text-xs text-stone-400 font-medium">No ratings yet</span>
              )}
              <span className="text-xs text-stone-400">•</span>
              <span className="text-xs text-stone-500 font-medium">{totalReviews} reviews</span>
            </div>
            <p className="text-stone-600 text-sm mt-4 leading-relaxed">{movie.description}</p>
          </div>
        </div>
      </div>

      <div className="bg-white border border-stone-200/80 rounded-2xl p-6 sm:p-8 shadow-sm">
        <h2 className="text-lg font-bold text-stone-900 mb-4">
          {userReview ? "Update Your Review" : "Write a Review"}
        </h2>

        {user ? (
          <form action={submitReview} className="space-y-4 max-w-xl">
            <input type="hidden" name="movieId" value={movie.id} />

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">Rating</label>
              <select
                name="rating"
                defaultValue={userReview?.rating || "5"}
                className="bg-stone-50 border border-stone-300 rounded-lg px-3 py-2 text-sm text-stone-800 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500"
              >
                <option value="5">5 Stars - Outstanding</option>
                <option value="4">4 Stars - Very Good</option>
                <option value="3">3 Stars - Average</option>
                <option value="2">2 Stars - Poor</option>
                <option value="1">1 Star - Terrible</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">Your Thoughts</label>
              <textarea
                name="comment"
                rows={3}
                required
                defaultValue={userReview?.comment || ""}
                placeholder="Share what you liked or disliked..."
                className="w-full bg-stone-50 border border-stone-300 rounded-lg px-3.5 py-2 text-sm text-stone-800 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500"
              />
            </div>

            <button
              type="submit"
              className="bg-amber-600 hover:bg-amber-700 text-white font-semibold text-sm px-5 py-2 rounded-lg shadow-sm transition"
            >
              {userReview ? "Update Review" : "Post Review"}
            </button>
          </form>
        ) : (
          <p className="text-xs text-stone-500">
            You must be logged in to post a review.{" "}
            <a href="/login" className="text-amber-700 font-semibold hover:underline">
              Sign in here
            </a>.
          </p>
        )}
      </div>

      <div className="bg-white space-y-4 border border-stone-200/80 p-5 rounded-xl shadow-sm">
        <h2 className="text-lg font-bold text-stone-900">User Reviews</h2>
        {movie.reviews.length === 0 ? (
          <p className="text-xs text-stone-400">Be the first to leave a review for this movie!</p>
        ) : (
          movie.reviews.map((rev: { id: string; user: { name: string }; rating: number; comment: string }) => (
            <div key={rev.id} className="bg-white border border-stone-200/80 p-5 rounded-xl shadow-sm space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-stone-800">{rev.user.name}</span>
                <StarRating rating={rev.rating} />
              </div>
              <p className="text-xs text-stone-600 leading-relaxed">{rev.comment}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}