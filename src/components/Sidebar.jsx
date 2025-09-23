import React, { useState } from "react";
import DualRangeSlider from "./PriceSlider";

export default function Sidebar({
  categories,
  selectedCategory,
  onCategoryChange,
  selectedBrand,
  onBrandChange,
  selectedGender,
  onGenderChange,
  onColorChange,
  selectedColor,
  priceRange,
  onPriceChange,
  onResetFilters,
  totalItems,
  categoryCounts,
  brands,
  brandCounts,
  genders,
  genderCounts,
}) {
  const [openCats, setOpenCats] = useState(true);
  const [openCategories, setOpenCategories] = useState(true);
  const [More, setMore] = useState(true);
  const [Brands, setBrands] = useState(false);
  const [Gender, setGender] = useState(false);

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
    <aside className="hidden w-full md:w-auto md:block md:flex-shrink-0 ">
      <div className="rounded-sm bg-white sticky top-24 ">
        {/* Categories */}
        <div className="bg-neutral-100 p-4 rounded-sm">
          <button
            className="w-full flex items-center justify-between text-lg font-medium mb-3 cursor-pointer"
            onClick={() => setOpenCategories((s) => !s)}
            aria-expanded={openCategories}
          >
            <span className="text-[20px] font-poppins font-[500]">
              All Categories
            </span>
            {openCategories ? <ChevronUp /> : <ChevronDown />}
          </button>

          {openCategories && (
            <div className="mt-6">
              <button
                className="text-sm mb-2 flex w-full items-center justify-between cursor-pointer"
                onClick={() => setOpenCats((s) => !s)}
                aria-expanded={openCats}
              >
                <span className="text-[20px] font-poppins font-[500]">
                  Hot Deals
                </span>
                <span className="text-gray-500">({totalItems})</span>
                {openCats ? <ChevronUp /> : <ChevronDown />}
              </button>

              {openCats && (
                <ul className="space-y-3 mt-6 text-sm">
                  {categories.map((c) => (
                    <li key={c}>
                      <button
                        onClick={() => onCategoryChange(c)}
                        className={`w-full text-left py-2 px-2 text-[18px] font-[400] rounded flex justify-between cursor-pointer ${
                          selectedCategory === c
                            ? "bg-blue-100 text-blue-800 font-medium"
                            : "hover:text-blue-600"
                        }`}
                      >
                        {c}
                        <span className="text-gray-500">
                          {categoryCounts?.[c] || 0}
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>

        {/* Price */}
        <DualRangeSlider
          priceRange={priceRange}
          onPriceChange={onPriceChange}
        />

        {/* Color */}
        <div className="mt-6 bg-neutral-100 p-4 rounded-sm">
          <h3 className="text-[20px] font-poppins font-[500]">COLORS</h3>
          <div className="flex flex-wrap gap-2 mt-2">
            {colorOptions.map((c) => (
              <button
                key={c}
                onClick={() => onColorChange(c === selectedColor ? "" : c)}
                className={`w-7 h-7 rounded-full shadow-2xl flex items-center justify-center focus:outline-none cursor-pointer ${
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

        {/* More Section */}
        <div className="bg-neutral-100 p-4 rounded-sm mt-6">
          <button
            className="w-full flex items-center justify-between text-lg font-medium mb-3 cursor-pointer"
            onClick={() => setMore((s) => !s)}
            aria-expanded={More}
          >
            <span className="text-[20px] font-poppins font-[500]">More</span>
            {More ? <ChevronUp /> : <ChevronDown />}
          </button>

          {More && (
            <>
              {/* Brands */}
              <div className="mt-6">
                <button
                  className="text-sm mb-2 flex w-full items-center justify-between cursor-pointer"
                  onClick={() => setBrands((s) => !s)}
                  aria-expanded={Brands}
                >
                  <span className="text-[20px] font-poppins font-[500]">
                    Brands
                  </span>
                  {Brands ? <ChevronUp /> : <ChevronDown />}
                </button>

                {Brands && (
                  <ul className="space-y-3 mt-6 text-sm">
                    <li>
                      <button
                        onClick={() => onBrandChange("")}
                        className={`w-full text-left py-2 px-2 text-[18px] font-[400] font-Proxima Nova rounded flex justify-between cursor-pointer${
                          !selectedBrand
                            ? "bg-blue-100 text-blue-800 font-medium"
                            : "hover:text-blue-600 cursor-pointer"
                        }`}
                      >
                        All Brands{" "}
                        <span className="text-gray-500 cursor-pointer">({totalItems})</span>
                      </button>
                    </li>
                    {brands.map((b) => (
                      <li key={b}>
                        <button
                          onClick={() => onBrandChange(b)}
                          className={`w-full text-left py-2 px-2 text-[18px] font-[400] font-Proxima Nova rounded flex justify-between ${
                            selectedBrand === b
                              ? "bg-blue-100 text-blue-800 font-medium"
                              : "hover:bg-blue-50"
                          }`}
                        >
                          {b}
                          <span className="text-gray-500">
                            {brandCounts?.[b] || 0}
                          </span>
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Gender */}
              <div className="mt-6">
                <button
                  className="text-sm mb-2 flex w-full items-center justify-between"
                  onClick={() => setGender((s) => !s)}
                  aria-expanded={Gender}
                >
                  <span className="text-[20px] font-poppins font-[500]">
                    Gender
                  </span>
                  {Gender ? <ChevronUp /> : <ChevronDown />}
                </button>

                {Gender && (
                  <ul className="space-y-3 mt-6 text-sm">
                    <li>
                      <button
                        onClick={() => onGenderChange("")}
                        className={`w-full text-left py-2 px-2 text-[18px] font-[400] font-Proxima Nova rounded flex justify-between ${
                          !selectedGender
                            ? "bg-blue-100 text-blue-800 font-medium"
                            : "hover:text-blue-600"
                        }`}
                      >
                        All Genders{" "}
                        <span className="text-gray-500 cursor-pointer">({totalItems})</span>
                      </button>
                    </li>
                    {genders.map((g) => (
                      <li key={g}>
                        <button
                          onClick={() => onGenderChange(g)}
                          className={`w-full text-left py-2 px-2 text-[18px] font-[400] font-Proxima Nova rounded flex justify-between cursor-pointer ${
                            selectedGender === g
                              ? "bg-blue-100 text-blue-800 font-medium"
                              : "hover:bg-blue-50"
                          }`}
                        >
                          {g}
                          <span className="text-gray-500">
                            {genderCounts?.[g] || 0}
                          </span>
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </>
          )}
        </div>

        {/* Reset Filters */}
        <div className="mt-6 sticky bottom-0">
          <button
            onClick={onResetFilters}
            className="px-3 py-2 bg-gray-100 rounded cursor-pointer text-[20px] font-poppins font-[500] shadow"
          >
            Reset Filters
          </button>
        </div>
      </div>
    </aside>
  );
}

function ChevronUp() {
  return (
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
    >
      <path d="m18 15-6-6-6 6" />
    </svg>
  );
}

function ChevronDown() {
  return (
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
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}
