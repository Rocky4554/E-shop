import React from "react";
import { X, ArrowDownUp, Funnel } from "lucide-react";
import DualRangeSlider from "./PriceSlider";

const MobileFilterModal = ({
  
  showSortModal = false,
  onCloseSortModal = () => {},
  currentSort = "name_asc",
  onSortChange = () => {},
  sortOptions = [
    { value: "name_asc", label: "Name (A → Z)" },
    { value: "name_desc", label: "Name (Z → A)" },
    { value: "price_asc", label: "Price (Low → High)" },
    { value: "price_desc", label: "Price (High → Low)" },
    { value: "popularity_desc", label: "Popularity" },
  ],

  
  showFilterModal = false,
  onCloseFilterModal = () => {},
  
  // Categories
  categories = [],
  categoryCounts = {},
  totalItems = 0,
  selectedCategory = "",
  onCategoryChange = () => {},

  // Colors
  colors = ["Red", "Blue", "Green", "Black", "White", "Gray"],
  selectedColor = "",
  onColorChange = () => {},

  
  priceRange = [0, 1000],
  onPriceChange = () => {},


  brands = [],
  brandCounts = {},
  selectedBrand = "",
  onBrandChange = () => {},

  genders = [],
  genderCounts = {},
  selectedGender = "",
  onGenderChange = () => {},


  onResetFilters = () => {},

  showCategories = true,
  showColors = true,
  showPriceRange = true,
  showBrands = false,
  showGenders = false,
}) => {
  const handleSortChange = (value) => {
    onSortChange(value);
    onCloseSortModal();
  };

  const handleColorToggle = (color) => {
    onColorChange(selectedColor === color ? "" : color);
  };

  const handleApplyFilters = () => {
    onCloseFilterModal();
  };

  const handleResetFilters = () => {
    onResetFilters();
    onCloseFilterModal();
  };

  return (
    <>
     
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 p-3 flex justify-around items-center md:hidden">
        <button
          onClick={() => onCloseSortModal(false)}
          className="flex justify-center flex-1 gap-2 py-2 mx-2 bg-neutral-100 text-gray-900 rounded font-medium"
        >
          <ArrowDownUp className="text-black" />
          Sort
        </button>
        <button
          onClick={() => onCloseFilterModal(false)}
          className="flex justify-center flex-1 gap-2 py-2 mx-2 bg-neutral-100 text-gray-900 rounded font-medium"
        >
          <Funnel className="text-black fill-stone-600" />
          Filter
        </button>
      </div>

     
      {showSortModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex justify-center items-center">
          <div className="bg-white w-80 rounded shadow-lg p-4 relative">
            <button
              onClick={onCloseSortModal}
              className="absolute top-2 right-2 text-gray-600 hover:text-black"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-lg font-semibold mb-3">Sort By</h3>
            <select
              value={currentSort}
              onChange={(e) => handleSortChange(e.target.value)}
              className="w-full border px-2 py-2 rounded"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}

    
      {showFilterModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex justify-center items-center">
          <div className="bg-white w-96 max-h-[90vh] overflow-y-auto rounded shadow-lg p-4 relative">
            <button
              onClick={onCloseFilterModal}
              className="absolute top-2 right-2 text-gray-600 hover:text-black"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-lg font-semibold mb-4">Filters</h3>

            {showCategories && categories.length > 0 && (
              <div className="mb-6">
                <h4 className="font-medium mb-3">Categories</h4>
                <div className="space-y-2">
                  <button
                    onClick={() => onCategoryChange("")}
                    className={`block w-full text-left px-3 py-2 rounded ${
                      !selectedCategory ? "bg-blue-500 text-white" : "bg-gray-100"
                    }`}
                  >
                    All Categories ({totalItems})
                  </button>
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => onCategoryChange(category)}
                      className={`block w-full text-left px-3 py-2 rounded ${
                        selectedCategory === category
                          ? "bg-blue-500 text-white"
                          : "bg-gray-100"
                      }`}
                    >
                      {category} ({categoryCounts[category] || 0})
                    </button>
                  ))}
                </div>
              </div>
            )}

        
            {showBrands && brands.length > 0 && (
              <div className="mb-6">
                <h4 className="font-medium mb-3">Brands</h4>
                <div className="space-y-2">
                  <button
                    onClick={() => onBrandChange("")}
                    className={`block w-full text-left px-3 py-2 rounded ${
                      !selectedBrand ? "bg-blue-500 text-white" : "bg-gray-100"
                    }`}
                  >
                    All Brands
                  </button>
                  {brands.map((brand) => (
                    <button
                      key={brand}
                      onClick={() => onBrandChange(brand)}
                      className={`block w-full text-left px-3 py-2 rounded ${
                        selectedBrand === brand
                          ? "bg-blue-500 text-white"
                          : "bg-gray-100"
                      }`}
                    >
                      {brand} ({brandCounts[brand] || 0})
                    </button>
                  ))}
                </div>
              </div>
            )}

          
            {showGenders && genders.length > 0 && (
              <div className="mb-6">
                <h4 className="font-medium mb-3">Genders</h4>
                <div className="space-y-2">
                  <button
                    onClick={() => onGenderChange("")}
                    className={`block w-full text-left px-3 py-2 rounded ${
                      !selectedGender ? "bg-blue-500 text-white" : "bg-gray-100"
                    }`}
                  >
                    All Genders
                  </button>
                  {genders.map((gender) => (
                    <button
                      key={gender}
                      onClick={() => onGenderChange(gender)}
                      className={`block w-full text-left px-3 py-2 rounded ${
                        selectedGender === gender
                          ? "bg-blue-500 text-white"
                          : "bg-gray-100"
                      }`}
                    >
                      {gender} ({genderCounts[gender] || 0})
                    </button>
                  ))}
                </div>
              </div>
            )}

       
            {showColors && colors.length > 0 && (
              <div className="mb-6">
                <h4 className="font-medium mb-3">Colors</h4>
                <div className="flex flex-wrap gap-2">
                  {colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => handleColorToggle(color)}
                      className={`px-3 py-1 rounded border text-sm ${
                        selectedColor === color
                          ? "bg-blue-500 text-white border-blue-500"
                          : "bg-white text-gray-700 border-gray-300"
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

        
            {showPriceRange && (
              <div className="mb-6">
                <DualRangeSlider
                  priceRange={priceRange}
                  onPriceChange={onPriceChange}
                />
              </div>
            )}

            <div className="space-y-3 bottom-0 left-0 right-0 bg-white p-4 border-t z-50">
              <button
                onClick={handleApplyFilters}
                className="w-full py-2 bg-sky-500 text-white rounded hover:bg-blue-600 font-medium"
              >
                Apply Filters
              </button>
              <button
                onClick={handleResetFilters}
                className="w-full py-2 bg-red-500 text-white rounded hover:bg-red-600 font-medium"
              >
                Reset All Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MobileFilterModal;