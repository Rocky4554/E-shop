import React from "react";

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  return (
    <nav
      aria-label="Pagination"
      className="flex items-center justify-center gap-2 py-4"
    >
      {pages.map((p) => (
        <button
          key={p}
          onClick={() => onPageChange(p)}
          className={`w-[69.41px] h-[68.56px] flex items-center justify-center cursor-pointer ${
            p === currentPage ? "text-white bg-[rgba(64,191,255,1)]" : ""
          }`}
          aria-current={p === currentPage ? "page" : undefined}
        >
          {p}
        </button>
      ))}
    </nav>
  );
}
