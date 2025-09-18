import React from "react";

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  return (
    <nav aria-label="Pagination" className="flex items-center justify-center gap-2 py-4">
      <button
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        className="px-3 py-1 border rounded"
        aria-label="Previous page"
      >
        Prev
      </button>

      {pages.map((p) => (
        <button
          key={p}
          onClick={() => onPageChange(p)}
          className={`px-3 py-1 border rounded ${p === currentPage ? "bg-blue-500 text-white" : ""}`}
          aria-current={p === currentPage ? "page" : undefined}
        >
          {p}
        </button>
      ))}

      <button
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        className="px-3 py-1 border rounded"
        aria-label="Next page"
      >
        Next
      </button>
    </nav>
  );
}
