import Link from "next/link";
import StarRating from "./StarRating";

interface MovieCardProps {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  avgRating: number | null;
  reviewCount: number;
}

export default function MovieCard({
  id,
  title,
  description,
  imageUrl,
  avgRating,
  reviewCount,
}: MovieCardProps) {
  return (
    <Link
      href={`/movies/${id}`}
      className="group bg-white rounded-xl border border-stone-200/80 shadow-sm hover:shadow-md hover:border-amber-400 transition-all duration-200 flex flex-col overflow-hidden"
    >
      <div className="relative h-60 w-full overflow-hidden bg-stone-100">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {avgRating !== null && (
          <div className="absolute top-3 right-3 bg-stone-900/80 text-white text-xs font-semibold px-2.5 py-1 rounded-full flex items-center space-x-1 shadow">
            <span className="text-amber-400">★</span>
            <span>{avgRating.toFixed(1)}</span>
          </div>
        )}
      </div>

      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="font-bold text-stone-800 text-lg group-hover:text-amber-700 transition-colors">
            {title}
          </h3>
          <p className="text-stone-500 text-xs mt-1.5 line-clamp-2 leading-relaxed">
            {description}
          </p>
        </div>

        <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between">
          {avgRating !== null ? (
            <StarRating rating={avgRating} />
          ) : (
            <span className="text-xs text-stone-400 font-medium">Unrated</span>
          )}
          <span className="text-xs text-stone-500 font-medium">
            {reviewCount} {reviewCount === 1 ? "review" : "reviews"}
          </span>
        </div>
      </div>
    </Link>
  );
}