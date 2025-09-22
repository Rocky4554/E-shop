import React, { useMemo, useState, useEffect } from "react";
import productsData from "../data/products";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import ProductCard from "../components/ProductCard";
import Pagination from "../components/Pagination";
import Footer from "../components/Footer";
import ProductToolbar from "../components/ProductToolbar";
import MobileFilterModal from "../components/MobileFilterModal";



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
  const [currentView, setCurrentView] = useState("grid");

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

  // Updated to work with ProductToolbar - receives sort value directly
  function handleSortChange(sortValue) {
    setQueryState((s) => ({ ...s, sort: sortValue, page: 1 }));
  }

  function handlePageChange(p) {
    setQueryState((s) => ({ ...s, page: p }));
  }

  function handleColorChange(color) {
    setQueryState((s) => ({ ...s, color, page: 1 }));
  }

  function handleViewChange(view) {
    setCurrentView(view);
  }

  function handleCategoryChange(category) {
    setSelectedCategory((prev) => (prev === category ? "" : category));
  }

  function handleBrandChange(brand) {
    setSelectedBrand((prev) => (prev === brand ? "" : brand));
  }

  function handleGenderChange(gender) {
    setSelectedGender((prev) => (prev === gender ? "" : gender));
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
              onCategoryChange={handleCategoryChange}
              onColorChange={handleColorChange}
              selectedColor={queryState.color}
              priceRange={priceRange}
              onPriceChange={setPriceRange}
              onResetFilters={handleResetFilters}
              selectedBrand={selectedBrand}
              onBrandChange={handleBrandChange}
              selectedGender={selectedGender}
              onGenderChange={handleGenderChange}
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

                  <button className="mt-6 py-2 rounded hover:bg-white/30 transition text-xs md:text-sm md:text-base md:font-semibold underline cursor-pointer">
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

              {/* Product Toolbar */}
            <ProductToolbar
              totalItems={sorted.length}
              currentSort={queryState.sort}
              onSortChange={handleSortChange}
              itemsPerPage={perPage}
              onItemsPerPageChange={setPerPage}
              currentView={currentView}
              onViewChange={handleViewChange}
            />

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

      {/* Mobile Filter function */}
      <MobileFilterModal
        // Sort Modal Props
        showSortModal={showSortModal}
        onCloseSortModal={() => setShowSortModal(false)}
        currentSort={queryState.sort}
        onSortChange={handleSortChange}

        // Filter Modal Props  
        showFilterModal={showFilterModal}
        onCloseFilterModal={() => setShowFilterModal(false)}

        // Categories
        categories={categories}
        categoryCounts={categoryCounts}
        totalItems={totalItems}
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}

     
        selectedColor={queryState.color}
        onColorChange={handleColorChange}

      
        priceRange={priceRange}
        onPriceChange={setPriceRange}

      
        brands={brands}
        brandCounts={brandCounts}
        selectedBrand={selectedBrand}
        onBrandChange={handleBrandChange}
        showBrands={true}

      
        genders={genders}
        genderCounts={genderCounts}
        selectedGender={selectedGender}
        onGenderChange={handleGenderChange}
        showGenders={true}

      
        onResetFilters={handleResetFilters}
      />

      <Footer />
    </div>
  );
}