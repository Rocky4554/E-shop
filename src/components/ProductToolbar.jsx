import React from "react";
import { Grid3X3, AlignJustify } from "lucide-react";

const ProductToolbar = ({
  totalItems = 0,
  currentSort = "name_asc",
  onSortChange = () => {},
  itemsPerPage = 6,
  onItemsPerPageChange = () => {},
  showSortDropdown = true,
  showItemsPerPageDropdown = true,
  showViewToggle = true,
  currentView = "grid", 
  onViewChange = () => {},
  sortOptions = [
    { value: "name_asc", label: "Name (A → Z)" },
    { value: "name_desc", label: "Name (Z → A)" },
    { value: "price_asc", label: "Price (Low → High)" },
    { value: "price_desc", label: "Price (High → Low)" },
    { value: "popularity_desc", label: "Popularity" },
  ],
  itemsPerPageOptions = [6, 12, 24],
  className = ""
}) => {
  const handleSortChange = (e) => {
    onSortChange(e.target.value);
  };

  const handleItemsPerPageChange = (e) => {
    onItemsPerPageChange(Number(e.target.value));
  };

  const handleViewToggle = (view) => {
    onViewChange(view);
  };

  return (
    <div className={`md:flex flex-col md:flex-row items-center justify-between gap-3 mb-4 bg-neutral-100 h-[62.57px] rounded ${className}`}>
      {/* Left section - Items count, Sort, Items per page */}
      <div className="flex items-center gap-8 p-4">
        {/* Items count */}
        <div className="text-sm text-gray-900">
          {totalItems} Items
        </div>

        {/* Sort dropdown - hidden on mobile */}
        {showSortDropdown && (
          <div className="hidden rounded-sm md:flex justify-between items-center">
            <label className="text-sm">Sort By</label>
            <select
              value={currentSort}
              onChange={handleSortChange}
              className="shadow px-2 py-1 text-sm m-2 cursor-pointer"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Items per page dropdown */}
        {showItemsPerPageDropdown && (
          <div className="flex justify-between items-center">
            <label className="text-sm">Show</label>
            <select
              value={itemsPerPage}
              onChange={handleItemsPerPageChange}
              className="shadow px-2 py-1 text-sm m-2 cursor-pointer"
            >
              {itemsPerPageOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Right Part*/}
      {showViewToggle && (
       
        <div className="flex items-center gap-3 p-2">
                <div className="hidden md:flex items-center gap-2">
                  {/* grid/list view icons */}
                  <button className="p-2 hover:bg-neutral-200 rounded hover:cursor-pointer hover:text-blue-600">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-grip"
                    >
                      <circle cx="12" cy="5" r="1" />
                      <circle cx="19" cy="5" r="1" />
                      <circle cx="5" cy="5" r="1" />
                      <circle cx="12" cy="12" r="1" />
                      <circle cx="19" cy="12" r="1" />
                      <circle cx="5" cy="12" r="1" />
                      <circle cx="12" cy="19" r="1" />
                      <circle cx="19" cy="19" r="1" />
                      <circle cx="5" cy="19" r="1" />
                    </svg>
                  </button>
                  <button className="p-2 hover:bg-neutral-200 rounded hover:cursor-pointer hover:text-blue-600">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-text-align-justify"
                    >
                      <path d="M3 5h18" />
                      <path d="M3 12h18" />
                      <path d="M3 19h18" />
                    </svg>
                  </button>
                </div>
              </div>
      )}
    </div>
  );
};

export default ProductToolbar;