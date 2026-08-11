import { prisma } from "@/lib/prisma";
import MovieCard from "../app/components/MovieCard";

export const revalidate = 0;

export default async function HomePage() {
  const movies = await prisma.movie.findMany({
    include: {
      reviews: { select: { rating: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-8">
      <div className="bg-white border border-stone-200/80 rounded-2xl p-8 shadow-sm text-center max-w-3xl mx-auto">
        <h1 className="text-3xl font-extrabold text-stone-900 tracking-tight">
          Discover & Rate Classic Cinema
        </h1>
        <p className="text-stone-500 text-sm mt-2 max-w-xl mx-auto leading-relaxed">
          Explore curated titles, check audience scores, and log in to share your personal reviews.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {movies.map((movie) => {
          const reviewCount = movie.reviews.length;
          const avgRating =
            reviewCount > 0
              ? movie.reviews.reduce((sum, r) => sum + r.rating, 0) / reviewCount
              : null;

          return (
            <MovieCard
              key={movie.id}
              id={movie.id}
              title={movie.title}
              description={movie.description}
              imageUrl={movie.imageUrl}
              avgRating={avgRating}
              reviewCount={reviewCount}
            />
          );
        })}
      </div>
    </div>
  );
}