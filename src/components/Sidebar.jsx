import React, { useState } from "react";
import DualRangeSlider from "./PriceSlider";

export default function Sidebar({
  categories,
  selectedCategory,
  onCategoryChange,
  onColorChange,
  selectedColor,
  priceRange,
  onPriceChange,
  onResetFilters,
  totalItems,
  categoryCounts,
}) {
  const [openCats, setOpenCats] = useState(true);
  const [openCategories, setOpenCategories] = useState(false);

  const colorOptions = [
    "blue",
    "red",
    "black",
    "yellow",
    "pink",
    "brown",
    "beige",
    "green",
    "white",
  ];

  return (
    <aside className="hidden w-full md:w-auto md:block md:flex-shrink-0">
      <div className="rounded-sm bg-white sticky top-24">
        {/* Categories */}
        <div className="bg-neutral-100 p-4 rounded-sm">
          <button
            className="w-full flex items-center justify-between text-lg font-medium mb-3"
            onClick={() => setOpenCategories((s) => !s)}
            aria-expanded={openCategories}
          >
            <span>Categories</span>
            {openCategories ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-chevron-up"
              >
                <path d="m18 15-6-6-6 6" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-chevron-down"
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            )}
          </button>

          {openCategories && (
            <div>
              <button
                className="text-sm mb-2 flex w-full items-center justify-between"
                onClick={() => setOpenCats((s) => !s)}
                aria-expanded={openCats}
              >
                <span>All Categories</span>
                <span className="text-gray-500">({totalItems})</span>
                {openCats ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-chevron-up"
                  >
                    <path d="m18 15-6-6-6 6" />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-chevron-down"
                  >
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                )}
              </button>

              {openCats && (
                <ul className="space-y-2 text-sm">
                  {categories.map((c) => (
                    <li key={c}>
                      <button
                        onClick={() => onCategoryChange(c)}
                        className={`w-full text-left py-1 px-2 rounded flex justify-between ${
                          selectedCategory === c
                            ? "bg-blue-100"
                            : "hover:text-blue-600"
                        }`}
                      >
                        {c}{" "}
                        <span className="text-gray-500">
                          {categoryCounts[c]}
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>
       
        <DualRangeSlider
          priceRange={priceRange}
          onPriceChange={onPriceChange}
        />
        {/* Colors */}
        <div className="mt-6 bg-neutral-100 p-4 rounded-sm">
          <h3 className="text-lg font-medium mb-2">Colors</h3>
          <div className="flex flex-wrap gap-2">
            {colorOptions.map((c) => (
              <button
                key={c}
                onClick={() => onColorChange(c === selectedColor ? "" : c)}
                className={`w-7 h-7 rounded-full border flex items-center justify-center focus:outline-none ${
                  selectedColor === c
                    ? "ring-2 ring-offset-2 ring-blue-400"
                    : ""
                }`}
                aria-pressed={selectedColor === c}
                title={c}
              >
                <span className="sr-only">{c}</span>
                <span
                  style={{
                    width: 20,
                    height: 20,
                    borderRadius: 999,
                    backgroundColor:
                      c === "brown" ? "#b5651d" : c === "beige" ? "#f5e6c8" : c,
                  }}
                />
              </button>
            ))}
          </div>
        </div>
        {/* Brands */}
        <div className="bg-neutral-100 p-4 rounded-sm mt-6">
          <button
            className="text-lg font-medium mb-2 flex w-full items-center justify-between"
            onClick={() => setOpenCats((s) => !s)}
            aria-expanded={openCats}
          >
            <span>BRAND</span>
            {openCats ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-chevron-up"
              >
                <path d="m18 15-6-6-6 6" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-chevron-down"
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            )}
          </button>

          {openCats && (
            <ul className="space-y-2 text-sm">
              {categories.map((c) => (
                <li key={c}>
                  <button
                    onClick={() => onCategoryChange(c)}
                    className={`w-full text-left py-1 rounded ${
                      selectedCategory === c
                        ? "bg-blue-50"
                        : "hover:text-blue-600"
                    }`}
                  >
                    {c}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
        {/* Reset Filters */}
        <div className="mt-6">
          <button
            onClick={onResetFilters}
            className="px-3 py-2 bg-gray-100 rounded text-sm"
          >
            Reset Filters
          </button>
        </div>
      </div>
    </aside>
  );
}
