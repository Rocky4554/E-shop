import React, { useMemo, useState, useEffect } from "react";
import productsData from "../data/products";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import ProductCard from "../components/ProductCard";
import Pagination from "../components/Pagination";
import Footer from "../components/Footer";
import DualRangeSlider from "../components/PriceSlider";
import { X, ArrowDownUp, Funnel} from "lucide-react";

// use code spliting for better performance

function useQueryState(defaults) {
  const [state, setState] = useState(() => {
    try {
      const q = new URLSearchParams(window.location.search);
      return {
        sort: q.get("sort") || defaults.sort,
        page: Number(q.get("page") || defaults.page),
        color: q.get("color") || defaults.color,
      };
    } catch {
      return defaults;
    }
  });

  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    if (state.sort) q.set("sort", state.sort);
    else q.delete("sort");
    if (state.page) q.set("page", String(state.page));
    else q.delete("page");
    if (state.color) q.set("color", state.color);
    else q.delete("color");
    const newUrl = `${window.location.pathname}?${q.toString()}`;
    window.history.replaceState({}, "", newUrl);
  }, [state]);

  return [state, setState];
}

export default function Home() {
  const [queryState, setQueryState] = useQueryState({
    sort: "name_asc",
    page: 1,
    color: "",
  });

  // filter state
  const [selectedCategory, setSelectedCategory] = useState("");
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [perPage, setPerPage] = useState(6);

  // sticky button on phone
  const [showSortModal, setShowSortModal] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedGender, setSelectedGender] = useState("");

  // categories from data
  const categories = useMemo(() => {
    const set = new Set(productsData.map((p) => p.category));
    return Array.from(set);
  }, []);

  // total category items
  const categoryCounts = useMemo(() => {
    return productsData.reduce((acc, product) => {
      acc[product.category] = (acc[product.category] || 0) + 1;
      return acc;
    }, {});
  }, []);

  // Total items in all categories
  const totalItems = useMemo(() => {
    return Object.values(categoryCounts).reduce((sum, count) => sum + count, 0);
  }, [categoryCounts]);

  //  brands
  const brands = useMemo(() => {
    const set = new Set(productsData.map((p) => p.brand));
    return Array.from(set);
  }, []);

  // count of brand
  const brandCounts = useMemo(() => {
    return productsData.reduce((acc, product) => {
      acc[product.brand] = (acc[product.brand] || 0) + 1;
      return acc;
    }, {});
  }, []);

  //  genders
  const genders = useMemo(() => {
    const set = new Set(productsData.map((p) => p.gender));
    return Array.from(set);
  }, []);

  // gender number
  const genderCounts = useMemo(() => {
    return productsData.reduce((acc, product) => {
      acc[product.gender] = (acc[product.gender] || 0) + 1;
      return acc;
    }, {});
  }, []);

  // apply filters
  const filtered = useMemo(() => {
    const { color } = queryState;
    return productsData.filter((p) => {
      if (selectedCategory && p.category !== selectedCategory) return false;
      if (color && !p.colors.includes(color)) return false;
      if (p.discountPrice < priceRange[0] || p.discountPrice > priceRange[1])
        return false;
      if (selectedBrand && p.brand !== selectedBrand) return false;
      if (selectedGender && p.gender !== selectedGender) return false;
      return true;
    });
  }, [
    selectedCategory,
    queryState.color,
    priceRange,
    selectedBrand,
    selectedGender,
  ]);

  // apply sorting
  const sorted = useMemo(() => {
    const arr = [...filtered];
    const s = queryState.sort || "name_asc";
    if (s === "name_asc") arr.sort((a, b) => a.name.localeCompare(b.name));
    if (s === "name_desc") arr.sort((a, b) => b.name.localeCompare(a.name));
    if (s === "price_asc")
      arr.sort((a, b) => a.discountPrice - b.discountPrice);
    if (s === "price_desc")
      arr.sort((a, b) => b.discountPrice - a.discountPrice);
    if (s === "popularity_desc")
      arr.sort((a, b) => b.ratingCount - a.ratingCount);
    return arr;
  }, [filtered, queryState.sort]);

  // pagination page handling
  const totalPages = Math.max(1, Math.ceil(sorted.length / perPage));
  const currentPage = Math.min(queryState.page || 1, totalPages);

  useEffect(() => {
    if (queryState.page > totalPages) {
      setQueryState((s) => ({ ...s, page: 1 }));
    }
  }, [totalPages]);

  const visible = useMemo(() => {
    const start = (currentPage - 1) * perPage;
    return sorted.slice(start, start + perPage);
  }, [sorted, currentPage, perPage]);

  function handleSortChange(e) {
    setQueryState((s) => ({ ...s, sort: e.target.value, page: 1 }));
  }

  function handlePageChange(p) {
    setQueryState((s) => ({ ...s, page: p }));
  }

  function handleColorChange(color) {
    setQueryState((s) => ({ ...s, color, page: 1 }));
  }

  function handleResetFilters() {
    setSelectedCategory("");
    setSelectedBrand("");
    setSelectedGender("");
    setPriceRange([0, 1000]);
    setPerPage(6);

    setQueryState((s) => ({
      ...s,
      color: "",
      brand: "",
      gender: "",
      page: 1,
      sort: "name_asc",
    }));
  }

  return (
    <div className="max-h-screen flex flex-col bg-white overflow-x-hidden">
      <Navbar />
      <main className="flex-1 max-w-8xl mx-auto md:py-6 md:px-4 w-full">
        <div className="grid grid-cols-1 md:grid-cols-4 md:gap-4">
          {/* Sidebar */}
          <div className="md:col-span-1">
            <Sidebar
              categories={categories}
              categoryCounts={categoryCounts}
              totalItems={totalItems}
              brands={brands}
              brandCounts={brandCounts}
              genders={genders}
              genderCounts={genderCounts}
              selectedCategory={selectedCategory}
              onCategoryChange={(c) =>
                setSelectedCategory((prev) => (prev === c ? "" : c))
              }
              onColorChange={handleColorChange}
              selectedColor={queryState.color}
              priceRange={priceRange}
              onPriceChange={setPriceRange}
              onResetFilters={handleResetFilters}
              selectedBrand={selectedBrand}
              onBrandChange={(b) =>
                setSelectedBrand((prev) => (prev === b ? "" : b))
              }
              selectedGender={selectedGender}
              onGenderChange={(g) =>
                setSelectedGender((prev) => (prev === g ? "" : g))
              }
            />
          </div>

          {/* All contents*/}
          <div className="col-span-1 md:col-span-3 flex flex-col">
              {/* Hero part */}
            <div
              className="w-full bg-[#29B6F6] flex items-center justify-between px-6 md:px-12 py-8 md:py-16 mb-2 md:mb-4"
              style={{
                background: "linear-gradient(135deg, #4FC3F7 0%, #29B6F6 100%)",
              }}
            >
              {/* Hero Text */}
              <div className="md:flex-1 flex-1 text-left text-white max-w-md sm:mt-10">
                <h2 className="text-1xl font-semibold font-poppins md:text-3xl leading-tight">
                  Adidas Men Running
                </h2>
                <h2 className="text-1xl font-semibold font-poppins md:text-3xl mt-1">
                  Sneakers
                </h2>
                <p className="text-xs md:text-lg md:-mt-2">
                  Performance and design. Taken right to the edge.
                </p>

                <button className="mt-6 py-2 rounde hover:bg-white/30 transition text-xs md:text-sm md:text-base md:font-semibold underline cursor-pointer">
                  SHOP NOW
                </button>
              </div>

              {/* Hero Image */}
              <div className="flex-1 flex justify-center md:justify-end mt-6 md:mt-0">
                <img
                  src="products/shoe.png"
                  alt="Adidas Running Sneaker"
                  className="w-[500px] sm:w-[260px] md:w-[400px] lg:w-[500px] h-auto object-contain drop-shadow-xl sm:-mb-8"
                />
              </div>
            </div>

            {/* Sorting filters on Desktop only */}
            <div className="md:flex flex-col md:flex-row items-center justify-between gap-3 mb-4 bg-neutral-100 h-[62.57px] rounded ">
              <div className="flex items-center gap-8 p-4">
                <div className="text-sm text-gray-900">
                  {sorted.length} Items
                </div>

                <div className="hidden rounded-sm md:flex justify-between items-center">
                  <label className="text-sm">Sort By</label>
                  <select
                    value={queryState.sort}
                    onChange={handleSortChange}
                    className="shadow px-2 py-1 text-sm m-2 cursor-pointer"
                  >
                    <option value="name_asc">Name (A → Z)</option>
                    <option value="name_desc">Name (Z → A)</option>
                    <option value="price_asc">Price (Low → High)</option>
                    <option value="price_desc">Price (High → Low)</option>
                    <option value="popularity_desc">Popularity</option>
                  </select>
                </div>

                <div className="flex justify-between items-center">
                  <label className="text-sm">Show</label>
                  <select
                    value={perPage}
                    onChange={(e) => setPerPage(Number(e.target.value))}
                    className="shadow px-2 py-1 text-sm m-2 cursor-pointer"
                  >
                    <option value={6}>6</option>
                    <option value={12}>12</option>
                    <option value={24}>24</option>
                  </select>
                </div>
              </div>

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
            </div>

            {/* Products */}
            <div className="col-span-1 md:col-span-3 flex flex-col min-h-screen">
              <div className="flex-1">
                {visible.length === 0 ? (
                  <div className="p-6 bg-white rounded-md text-center">
                    <p className="mb-3">No products match your filters.</p>
                    <button
                      onClick={handleResetFilters}
                      className="px-3 py-2 bg-blue-500 text-white rounded"
                    >
                      Reset filters
                    </button>
                  </div>
                ) : (
                  <div className="flex px-3 sm:px-0">
                    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 sm:gap-6 gap-3">
                      {visible.map((p) => (
                        <div
                          key={p.id}
                          className="w-full sm:max-w-[328px] sm:h-[408px] bg-white mx-auto"
                        >
                          <ProductCard
                            product={p}
                            activeColor={queryState.color}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Pagination */}
              <div className="mt-6 flex justify-center mb-4">
                <div className="w-full max-w-[1070px] h-[68.56px] bg-neutral-100 flex items-center justify-center rounded">
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Mobile sticky button for filters on mobile only */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 p-3 flex justify-around items-center md:hidden">
        <button
          onClick={() => setShowSortModal(true)}
          className="flex justify-center flex-1 gap-2 py-2 mx-2 bg-neutral-100 text-gray-900 rounded font-medium"
        >
          <ArrowDownUp className="text-black" />
          Sort
        </button>
        <button
          onClick={() => setShowFilterModal(true)}
          className="flex justify-center flex-1 gap-2 py-2 mx-2 bg-neutral-100 text-gray-900 rounded font-medium"
        >
          <Funnel className="text-black fill-stone-600" />
          Filter
        </button>
      </div>

      {/* Sort for mobile*/}
      {showSortModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex justify-center items-center">
          <div className="bg-white w-80 rounded shadow-lg p-4 relative">
            <button
              onClick={() => setShowSortModal(false)}
              className="absolute top-2 right-2 text-gray-600 hover:text-black"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-lg font-semibold mb-3">Sort By</h3>
            <select
              value={queryState.sort}
              onChange={(e) => {
                handleSortChange(e);
                setShowSortModal(false);
              }}
              className="w-full border px-2 py-2 rounded"
            >
              <option value="name_asc">Name (A → Z)</option>
              <option value="name_desc">Name (Z → A)</option>
              <option value="price_asc">Price (Low → High)</option>
              <option value="price_desc">Price (High → Low)</option>
              <option value="popularity_desc">Popularity</option>
            </select>
          </div>
        </div>
      )}

      {/* Filter for mobile*/}
      {showFilterModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex justify-center items-center">
          <div className="bg-white w-96 max-h-[90vh] overflow-y-auto rounded shadow-lg p-4 relative">
            <button
              onClick={() => setShowFilterModal(false)}
              className="absolute top-2 right-2 text-gray-600 hover:text-black"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-lg font-semibold mb-4">Filters</h3>

            {/* Categories */}
            <div className="mb-6">
              <h4 className="font-medium mb-3">Categories</h4>
              <div className="space-y-2">
                <button
                  onClick={() => setSelectedCategory("")}
                  className={`block w-full text-left px-3 py-2 rounded ${
                    !selectedCategory ? "bg-blue-500 text-white" : "bg-gray-100"
                  }`}
                >
                  All Categories ({totalItems})
                </button>
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`block w-full text-left px-3 py-2 rounded ${
                      selectedCategory === category
                        ? "bg-blue-500 text-white"
                        : "bg-gray-100"
                    }`}
                  >
                    {category} ({categoryCounts[category]})
                  </button>
                ))}
              </div>
            </div>

            {/* Colors */}
            <div className="mb-6">
              <h4 className="font-medium mb-3">Colors</h4>
              <div className="flex flex-wrap gap-2">
                {["Red", "Blue", "Green", "Black", "White", "Gray"].map(
                  (color) => (
                    <button
                      key={color}
                      onClick={() =>
                        handleColorChange(
                          queryState.color === color ? "" : color
                        )
                      }
                      className={`px-3 py-1 rounded border text-sm ${
                        queryState.color === color
                          ? "bg-blue-500 text-white border-blue-500"
                          : "bg-white text-gray-700 border-gray-300"
                      }`}
                    >
                      {color}
                    </button>
                  )
                )}
              </div>
            </div>

            {/* Price Range */}
            <div className="mb-6">
              <DualRangeSlider
                priceRange={priceRange}
                onPriceChange={setPriceRange}
              />
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 bottom-0 left-0 right-0 bg-white p-4 border-t z-50">
              <button
                onClick={() => setShowFilterModal(false)}
                className="w-full py-2 bg-sky-500 text-black rounded hover:bg-blue-600 font-medium"
              >
                Apply Filters
              </button>
              <button
                onClick={() => {
                  handleResetFilters();
                  setShowFilterModal(false);
                }}
                className="w-full py-2 bg-red-500 text-black rounded hover:bg-red-300 font-medium"
              >
                Reset All Filters
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
