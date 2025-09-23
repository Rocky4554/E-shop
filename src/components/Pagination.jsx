import React from "react";

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav
      aria-label="Pagination"
      className="flex flex-wrap items-center justify-center gap-2 py-4"
    >
      {pages.map((p) => (
        <button
          key={p}
          onClick={() => onPageChange(p)}
          className={`flex items-center justify-center cursor-pointer 
            text-sm sm:text-base 
            w-8 h-8 sm:w-[69.41px] sm:h-[68.56px] 
            rounded-full sm:rounded-none
            transition-colors
            ${p === currentPage 
              ? "text-white bg-[rgba(64,191,255,1)]" 
              : "hover:bg-blue-500 hover:text-white sm:hover:bg-neutral-200 sm:hover:text-black"
            }`}
          aria-current={p === currentPage ? "page" : undefined}
        >
          {p}
        </button>
      ))}
    </nav>
  );
}
