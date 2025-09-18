// import React, { useState } from "react";

// export default function Sidebar({
//   categories,
//   selectedCategory,
//   onCategoryChange,
//   onColorChange,
//   selectedColor,
//   priceRange,
//   onPriceChange,
//   onResetFilters
// }) {
//   const [openCats, setOpenCats] = useState(true);

//   const colorOptions = ["blue", "red", "black", "yellow", "pink", "brown", "beige", "green", "white"];

//   return (
//     <aside
//       className="w-[355px] h-[1385px] md:w-[355px] md:h-[1385px] absolute md:relative"
//       style={{ top: "95.27px", left: "21.4px" }}
//     >
//       <div className="p-4 rounded-md bg-white shadow-md">
//         {/* Categories */}
//         <h3 className="font-semibold mb-3">Categories</h3>
//         <button
//           className="text-sm mb-2 inline-flex items-center gap-2"
//           onClick={() => setOpenCats((s) => !s)}
//           aria-expanded={openCats}
//         >
//           {openCats ? "▾" : "▸"} All Categories
//         </button>
//         {openCats && (
//           <ul className="space-y-2 text-sm">
//             {categories.map((c) => (
//               <li key={c}>
//                 <button
//                   onClick={() => onCategoryChange(c)}
//                   className={`w-full text-left py-1 px-2 rounded ${
//                     selectedCategory === c ? "bg-blue-50" : "hover:bg-gray-50"
//                   }`}
//                 >
//                   {c}
//                 </button>
//               </li>
//             ))}
//           </ul>
//         )}

//         {/* Price */}
//         <div className="mt-6">
//           <h3 className="font-semibold mb-2">Price</h3>
//           <div className="text-sm mb-2">
//             <span className="mr-2">${priceRange[0]}</span> -{" "}
//             <span className="ml-2">${priceRange[1]}</span>
//           </div>
//           <input
//             aria-label="min price"
//             type="range"
//             min="0"
//             max="500"
//             value={priceRange[0]}
//             onChange={(e) =>
//               onPriceChange([Number(e.target.value), priceRange[1]])
//             }
//             className="w-full"
//           />
//           <input
//             aria-label="max price"
//             type="range"
//             min="0"
//             max="1000"
//             value={priceRange[1]}
//             onChange={(e) =>
//               onPriceChange([priceRange[0], Number(e.target.value)])
//             }
//             className="w-full mt-2"
//           />
//         </div>

//         {/* Colors */}
//         <div className="mt-6">
//           <h3 className="font-semibold mb-2">Colors</h3>
//           <div className="flex flex-wrap gap-2">
//             {colorOptions.map((c) => (
//               <button
//                 key={c}
//                 onClick={() => onColorChange(c === selectedColor ? "" : c)}
//                 className={`w-7 h-7 rounded-full border flex items-center justify-center focus:outline-none ${
//                   selectedColor === c
//                     ? "ring-2 ring-offset-2 ring-blue-400"
//                     : ""
//                 }`}
//                 aria-pressed={selectedColor === c}
//                 title={c}
//               >
//                 <span className="sr-only">{c}</span>
//                 <span
//                   style={{
//                     width: 20,
//                     height: 20,
//                     borderRadius: 999,
//                     backgroundColor:
//                       c === "brown"
//                         ? "#b5651d"
//                         : c === "beige"
//                         ? "#f5e6c8"
//                         : c,
//                   }}
//                 />
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* Reset Filters */}
//         <div className="mt-6">
//           <button
//             onClick={onResetFilters}
//             className="px-3 py-2 bg-gray-100 rounded text-sm"
//           >
//             Reset Filters
//           </button>
//         </div>
//       </div>
//     </aside>
//   );
// }

/////////////

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
    <aside className="w-full md:w-auto">
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
        {/* Price */}
        {/* <div className="mt-6 bg-neutral-100 p-4 rounded-sm">
          <h3 className="text-lg font-medium mb-2">Price</h3>
          <div className="text-sm mb-2">
            <span className="mr-2">${priceRange[0]}</span> - {" "}
            <span className="ml-2">${priceRange[1]}</span>
          </div>
          <input
            aria-label="min price"
            type="range"
            min="0"
            max="500"
            value={priceRange[0]}
            onChange={(e) =>
              onPriceChange([Number(e.target.value), priceRange[1]])
            }
            className="w-full"
          />
          <input
            aria-label="max price"
            type="range"
            min="0"
            max="1000"
            value={priceRange[1]}
            onChange={(e) =>
              onPriceChange([priceRange[0], Number(e.target.value)])
            }
            className="w-full"
          />
        </div> */}
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
