import React from "react";

export default function Rating({ value = 0, count = 0 }) {
  const full = Math.floor(value);
  const half = value - full >= 0.5;
  const totalStars = 5;
  return (
    <div className="flex items-center gap-2 text-xs" aria-label={`Rating ${value} out of 5`}>
      <div className="flex items-center">
        {[...Array(totalStars)].map((_, i) => {
          const idx = i + 1;
          const starClass =
            idx <= full ? "text-yellow-400" : half && idx === full + 1 ? "text-yellow-400" : "text-gray-300";
          return (
            <svg key={i} className={`w-4 h-4 ${starClass}`} viewBox="0 0 20 20" fill="currentColor" aria-hidden>
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.955a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.287 3.955c.3.921-.755 1.688-1.54 1.118L10 13.347l-3.37 2.448c-.784.57-1.839-.197-1.54-1.118l1.287-3.955a1 1 0 00-.364-1.118L2.644 9.382c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.286-3.955z" />
            </svg>
          );
        })}
      </div>
      <div className="text-gray-500">({count})</div>
    </div>
  );
}
