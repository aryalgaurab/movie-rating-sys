"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    
    console.error("Application Error:", error);
  }, [error]);

  return (
    <div className="max-w-xl mx-auto my-12 bg-red-50 border border-red-200 rounded-2xl p-6 text-center shadow-sm">
      <div className="text-red-500 text-3xl mb-2">⚠️</div>
      <h2 className="text-lg font-bold text-red-800">{error.message}</h2>
      <p className="text-sm text-red-600 mt-2 mb-6">
        {""}
      </p>
      <button
        onClick={() => reset()}
        className="bg-red-700 hover:bg-red-800 text-white font-medium text-xs px-5 py-2.5 rounded-lg transition"
      >
        Try Again
      </button>
    </div>
  );
}