// import React, { useMemo, useState, useEffect } from "react";
// import productsData from "../data/products";
// import Navbar from "../components/Navbar";
// import Sidebar from "../components/Sidebar";
// import ProductCard from "../components/ProductCard";
// import Pagination from "../components/Pagination";
// import Footer from "../components/Footer";

// function useQueryState(defaults) {
//   const [state, setState] = useState(() => {
//     try {
//       const q = new URLSearchParams(window.location.search);
//       return {
//         sort: q.get("sort") || defaults.sort,
//         page: Number(q.get("page") || defaults.page),
//         color: q.get("color") || defaults.color
//       };
//     } catch {
//       return defaults;
//     }
//   });

//   useEffect(() => {
//     const q = new URLSearchParams(window.location.search);
//     if (state.sort) q.set("sort", state.sort);
//     else q.delete("sort");
//     if (state.page) q.set("page", String(state.page));
//     else q.delete("page");
//     if (state.color) q.set("color", state.color);
//     else q.delete("color");
//     const newUrl = `${window.location.pathname}?${q.toString()}`;
//     window.history.replaceState({}, "", newUrl);
//   }, [state]);

//   return [state, setState];
// }

// export default function Home() {
//   const [queryState, setQueryState] = useQueryState({ sort: "name_asc", page: 1, color: "" });

//   // local filter state
//   const [selectedCategory, setSelectedCategory] = useState("");
//   const [priceRange, setPriceRange] = useState([0, 1000]);
//   const [perPage, setPerPage] = useState(12);

//   // derive categories from data
//   const categories = useMemo(() => {
//     const set = new Set(productsData.map((p) => p.category));
//     return Array.from(set);
//   }, []);

//   // apply filters -> filteredProducts
//   const filtered = useMemo(() => {
//     const { color } = queryState;
//     return productsData.filter((p) => {
//       if (selectedCategory && p.category !== selectedCategory) return false;
//       if (color && !p.colors.includes(color)) return false;
//       if (p.discountPrice < priceRange[0] || p.discountPrice > priceRange[1]) return false;
//       return true;
//     });
//   }, [selectedCategory, queryState.color, priceRange]);

//   // apply sorting
//   const sorted = useMemo(() => {
//     const arr = [...filtered];
//     const s = queryState.sort || "name_asc";
//     if (s === "name_asc") arr.sort((a, b) => a.name.localeCompare(b.name));
//     if (s === "name_desc") arr.sort((a, b) => b.name.localeCompare(a.name));
//     if (s === "price_asc") arr.sort((a, b) => a.discountPrice - b.discountPrice);
//     if (s === "price_desc") arr.sort((a, b) => b.discountPrice - a.discountPrice);
//     if (s === "popularity_desc") arr.sort((a, b) => b.ratingCount - a.ratingCount);
//     return arr;
//   }, [filtered, queryState.sort]);

//   // pagination
//   const totalPages = Math.max(1, Math.ceil(sorted.length / perPage));
//   const currentPage = Math.min(queryState.page || 1, totalPages);

//   useEffect(() => {
//     // keep page valid if filters change
//     if (queryState.page > totalPages) {
//       setQueryState((s) => ({ ...s, page: 1 }));
//     }
//   }, [totalPages]);

//   const visible = useMemo(() => {
//     const start = (currentPage - 1) * perPage;
//     return sorted.slice(start, start + perPage);
//   }, [sorted, currentPage, perPage]);

//   function handleSortChange(e) {
//     setQueryState((s) => ({ ...s, sort: e.target.value, page: 1 }));
//   }

//   function handlePageChange(p) {
//     setQueryState((s) => ({ ...s, page: p }));
//   }

//   function handleColorChange(color) {
//     setQueryState((s) => ({ ...s, color, page: 1 }));
//   }

//   function handleResetFilters() {
//     setSelectedCategory("");
//     setPriceRange([0, 1000]);
//     setPerPage(12);
//     setQueryState((s) => ({ ...s, color: "", page: 1, sort: "name_asc" }));
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <Navbar />

//       <main className="max-w-7xl mx-auto px-4 md:px-6 py-6">
//         <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
//           {/* Sidebar */}
//           <div className="md:col-span-3">
//             <Sidebar
//               categories={categories}
//               selectedCategory={selectedCategory}
//               onCategoryChange={(c) => setSelectedCategory((prev) => (prev === c ? "" : c))}
//               onColorChange={handleColorChange}
//               selectedColor={queryState.color}
//               priceRange={priceRange}
//               onPriceChange={setPriceRange}
//               onResetFilters={handleResetFilters}
//             />
//           </div>

//           {/* Content */}
//           <div className="md:col-span-9">
//             {/* Hero / header */}
//             <div className="rounded-lg bg-blue-400 h-44 p-6 flex items-center justify-between text-white mb-6">
//               <div>
//                 <h2 className="text-2xl font-bold">Adidas Men Running</h2>
//                 <p className="text-sm opacity-90">Sneakers — Performance and design. Taken right to the edge.</p>
//               </div>
//               <div className="w-40 h-40 bg-white rounded-md flex items-center justify-center">
//                 <img src="https://picsum.photos/seed/hero/300/180" alt="hero" />
//               </div>
//             </div>

//             {/* Controls */}
//             <div className="flex flex-col md:flex-row items-center justify-between gap-3 mb-4">
//               <div className="flex items-center gap-3">
//                 <div className="text-sm text-gray-700">13 Items</div>
//                 <label className="text-sm">Sort By</label>
//                 <select value={queryState.sort} onChange={handleSortChange} className="border rounded px-2 py-1 text-sm">
//                   <option value="name_asc">Name (A → Z)</option>
//                   <option value="name_desc">Name (Z → A)</option>
//                   <option value="price_asc">Price (Low → High)</option>
//                   <option value="price_desc">Price (High → Low)</option>
//                   <option value="popularity_desc">Popularity</option>
//                 </select>
//               </div>

//               <div className="flex items-center gap-3">
//                 <label>Show</label>
//                 <select value={perPage} onChange={(e) => setPerPage(Number(e.target.value))} className="border rounded px-2 py-1 text-sm">
//                   <option value={6}>6</option>
//                   <option value={12}>12</option>
//                   <option value={24}>24</option>
//                 </select>
//                 <div className="hidden md:flex items-center gap-2">
//                   <button className="p-2 border rounded">☰</button>
//                   <button className="p-2 border rounded">▦</button>
//                 </div>
//               </div>
//             </div>

//             {/* Grid */}
//             {visible.length === 0 ? (
//               <div className="p-6 bg-white rounded-md text-center">
//                 <p className="mb-3">No products match your filters.</p>
//                 <button onClick={handleResetFilters} className="px-3 py-2 bg-blue-500 text-white rounded">Reset filters</button>
//               </div>
//             ) : (
//               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {visible.map((p) => (
//                   <ProductCard key={p.id} product={p} activeColor={queryState.color} />
//                 ))}
//               </div>
//             )}

//             {/* Pagination */}
//             <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
//           </div>
//         </div>
//       </main>

//       <Footer />
//     </div>
//   );
// }

///////////////// Working code

// import React, { useMemo, useState, useEffect } from "react";
// import productsData from "../data/products";
// import Navbar from "../components/Navbar";
// import Sidebar from "../components/Sidebar";
// import ProductCard from "../components/ProductCard";
// import Pagination from "../components/Pagination";
// import Footer from "../components/Footer";

// function useQueryState(defaults) {
//   const [state, setState] = useState(() => {
//     try {
//       const q = new URLSearchParams(window.location.search);
//       return {
//         sort: q.get("sort") || defaults.sort,
//         page: Number(q.get("page") || defaults.page),
//         color: q.get("color") || defaults.color,
//       };
//     } catch {
//       return defaults;
//     }
//   });

//   useEffect(() => {
//     const q = new URLSearchParams(window.location.search);
//     if (state.sort) q.set("sort", state.sort);
//     else q.delete("sort");
//     if (state.page) q.set("page", String(state.page));
//     else q.delete("page");
//     if (state.color) q.set("color", state.color);
//     else q.delete("color");
//     const newUrl = `${window.location.pathname}?${q.toString()}`;
//     window.history.replaceState({}, "", newUrl);
//   }, [state]);

//   return [state, setState];
// }

// export default function Home() {
//   const [queryState, setQueryState] = useQueryState({
//     sort: "name_asc",
//     page: 1,
//     color: "",
//   });

//   // local filter state
//   const [selectedCategory, setSelectedCategory] = useState("");
//   const [priceRange, setPriceRange] = useState([0, 1000]);
//   const [perPage, setPerPage] = useState(12);

//   // derive categories from data
//   const categories = useMemo(() => {
//     const set = new Set(productsData.map((p) => p.category));
//     return Array.from(set);
//   }, []);

//   // total category items
//   const categoryCounts = useMemo(() => {
//     return productsData.reduce((acc, product) => {
//       acc[product.category] = (acc[product.category] || 0) + 1;
//       return acc;
//     }, {});
//   }, []);

//   // Total items across all categories
//   const totalItems = useMemo(() => {
//     return Object.values(categoryCounts).reduce((sum, count) => sum + count, 0);
//   }, [categoryCounts]);

//   // apply filters
//   const filtered = useMemo(() => {
//     const { color } = queryState;
//     return productsData.filter((p) => {
//       if (selectedCategory && p.category !== selectedCategory) return false;
//       if (color && !p.colors.includes(color)) return false;
//       if (p.discountPrice < priceRange[0] || p.discountPrice > priceRange[1])
//         return false;
//       return true;
//     });
//   }, [selectedCategory, queryState.color, priceRange]);

//   // apply sorting
//   const sorted = useMemo(() => {
//     const arr = [...filtered];
//     const s = queryState.sort || "name_asc";
//     if (s === "name_asc") arr.sort((a, b) => a.name.localeCompare(b.name));
//     if (s === "name_desc") arr.sort((a, b) => b.name.localeCompare(a.name));
//     if (s === "price_asc")
//       arr.sort((a, b) => a.discountPrice - b.discountPrice);
//     if (s === "price_desc")
//       arr.sort((a, b) => b.discountPrice - a.discountPrice);
//     if (s === "popularity_desc")
//       arr.sort((a, b) => b.ratingCount - a.ratingCount);
//     return arr;
//   }, [filtered, queryState.sort]);

//   // pagination
//   const totalPages = Math.max(1, Math.ceil(sorted.length / perPage));
//   const currentPage = Math.min(queryState.page || 1, totalPages);

//   useEffect(() => {
//     if (queryState.page > totalPages) {
//       setQueryState((s) => ({ ...s, page: 1 }));
//     }
//   }, [totalPages]);

//   const visible = useMemo(() => {
//     const start = (currentPage - 1) * perPage;
//     return sorted.slice(start, start + perPage);
//   }, [sorted, currentPage, perPage]);

//   function handleSortChange(e) {
//     setQueryState((s) => ({ ...s, sort: e.target.value, page: 1 }));
//   }

//   function handlePageChange(p) {
//     setQueryState((s) => ({ ...s, page: p }));
//   }

//   function handleColorChange(color) {
//     setQueryState((s) => ({ ...s, color, page: 1 }));
//   }

//   function handleResetFilters() {
//     setSelectedCategory("");
//     setPriceRange([0, 1000]);
//     setPerPage(12);
//     setQueryState((s) => ({
//       ...s,
//       color: "",
//       page: 1,
//       sort: "name_asc",
//     }));
//   }

//   return (
//     <div className="max-h-screen flex flex-col bg-white">
//       <Navbar />

//       {/* main grows to push footer down */}
//       <main className="flex-1 max-w-7xl mx-auto md:py-6 w-full">
//         <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
//           {/* Sidebar */}
//           <div className="md:col-span-3">
//             <Sidebar
//               categories={categories}
//               categoryCounts={categoryCounts}
//               totalItems={totalItems}

//               selectedCategory={selectedCategory}
//               onCategoryChange={(c) =>
//                 setSelectedCategory((prev) => (prev === c ? "" : c))
//               }
//               onColorChange={handleColorChange}
//               selectedColor={queryState.color}
//               priceRange={priceRange}
//               onPriceChange={setPriceRange}
//               onResetFilters={handleResetFilters}
//             />
//           </div>

//           {/* Content */}
//           <div className="md:col-span-9 flex flex-col">
//             {/* Hero / header */}
//             <div className="rounded-lg bg-blue-400 h-44 p-6 flex items-center justify-between text-white mb-6">
//               <div>
//                 <h2 className="text-2xl font-bold">Adidas Men Running</h2>
//                 <p className="text-sm opacity-90">
//                   Sneakers — Performance and design. Taken right to the edge.
//                 </p>
//               </div>
//               <div className="w-40 h-40 bg-white rounded-md flex items-center justify-center">
//                 <img src="https://picsum.photos/seed/hero/300/180" alt="hero" />
//               </div>
//             </div>

//             {/* Controls */}
//             <div className="flex flex-col md:flex-row items-center justify-between gap-3 mb-4">
//               <div className="flex items-center gap-3">
//                 <div className="text-sm text-gray-700">
//                   {sorted.length} Items
//                 </div>
//                 <label className="text-sm">Sort By</label>
//                 <select
//                   value={queryState.sort}
//                   onChange={handleSortChange}
//                   className="border rounded px-2 py-1 text-sm"
//                 >
//                   <option value="name_asc">Name (A → Z)</option>
//                   <option value="name_desc">Name (Z → A)</option>
//                   <option value="price_asc">Price (Low → High)</option>
//                   <option value="price_desc">Price (High → Low)</option>
//                   <option value="popularity_desc">Popularity</option>
//                 </select>
//               </div>

//               <div className="flex items-center gap-3">
//                 <label>Show</label>
//                 <select
//                   value={perPage}
//                   onChange={(e) => setPerPage(Number(e.target.value))}
//                   className="border rounded px-2 py-1 text-sm"
//                 >
//                   <option value={6}>6</option>
//                   <option value={12}>12</option>
//                   <option value={24}>24</option>
//                 </select>
//                 <div className="hidden md:flex items-center gap-2">
//                   <button className="p-2 border rounded">☰</button>
//                   <button className="p-2 border rounded">▦</button>
//                 </div>
//               </div>
//             </div>

//             {/* Grid grows */}
//             <div className="flex-1">
//               {visible.length === 0 ? (
//                 <div className="p-6 bg-white rounded-md text-center">
//                   <p className="mb-3">No products match your filters.</p>
//                   <button
//                     onClick={handleResetFilters}
//                     className="px-3 py-2 bg-blue-500 text-white rounded"
//                   >
//                     Reset filters
//                   </button>
//                 </div>
//               ) : (
//                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//                   {visible.map((p) => (
//                     <ProductCard
//                       key={p.id}
//                       product={p}
//                       activeColor={queryState.color}
//                     />
//                   ))}
//                 </div>
//               )}
//             </div>

//             {/* Pagination row sticks bottom of column */}
//             <div className="mt-6 flex items-center justify-between">
//               <Pagination
//                 currentPage={currentPage}
//                 totalPages={totalPages}
//                 onPageChange={handlePageChange}
//               />
//               <button className="text-blue-500 font-medium">
//                 More Options
//               </button>
//             </div>
//           </div>
//         </div>
//       </main>

//       <Footer />
//     </div>
//   );
// }

//////////////////

import React, { useMemo, useState, useEffect } from "react";
import productsData from "../data/products";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import ProductCard from "../components/ProductCard";
import Pagination from "../components/Pagination";
import Footer from "../components/Footer";
import DualRangeSlider from "../components/PriceSlider";
import { X, ArrowDownUp, Funnel, ArrowDownZA } from "lucide-react";

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

  // local filter state
  const [selectedCategory, setSelectedCategory] = useState("");
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [perPage, setPerPage] = useState(6);

  const [showSortModal, setShowSortModal] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);

  // derive categories from data
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

  // Total items across all categories
  const totalItems = useMemo(() => {
    return Object.values(categoryCounts).reduce((sum, count) => sum + count, 0);
  }, [categoryCounts]);

  // apply filters
  const filtered = useMemo(() => {
    const { color } = queryState;
    return productsData.filter((p) => {
      if (selectedCategory && p.category !== selectedCategory) return false;
      if (color && !p.colors.includes(color)) return false;
      if (p.discountPrice < priceRange[0] || p.discountPrice > priceRange[1])
        return false;
      return true;
    });
  }, [selectedCategory, queryState.color, priceRange]);

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

  // pagination
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
    setPriceRange([0, 1000]);
    setPerPage(12);
    setQueryState((s) => ({
      ...s,
      color: "",
      page: 1,
      sort: "name_asc",
    }));
  }

  return (
    <div className="max-h-screen flex flex-col bg-white">
      <Navbar />

      {/* main grows to push footer down */}
      <main className="flex-1 max-w-7xl mx-auto md:py-6 w-full">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="md:col-span-1">
            <Sidebar
              categories={categories}
              categoryCounts={categoryCounts}
              totalItems={totalItems}
              selectedCategory={selectedCategory}
              onCategoryChange={(c) =>
                setSelectedCategory((prev) => (prev === c ? "" : c))
              }
              onColorChange={handleColorChange}
              selectedColor={queryState.color}
              priceRange={priceRange}
              onPriceChange={setPriceRange}
              onResetFilters={handleResetFilters}
            />
          </div>

          {/* Content */}
          <div className="col-span-1 md:col-span-3 flex flex-col">
            {/* Hero Image */}
            <div
              className="w-full bg-[#29B6F6] flex items-center justify-between px-6 md:px-12 py-8 md:py-16 mb-2 md:mb-4"
              style={{
                background: "linear-gradient(135deg, #4FC3F7 0%, #29B6F6 100%)",
              }}
            >
              {/* Text Section */}
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
                {/* <button className="bg-[rgba(64,191,255,1)] bg-opacity-20 hover:bg-white/30 px-4 py-2 rounded transition-all duration-200 underline">
                  <p className="text-white text-xs md:text-lg">SHOP NOW</p>
                </button> */}
              </div>

              {/* Image Section */}
              <div className="flex-1 flex justify-center md:justify-end mt-6 md:mt-0">
                <img
                  src="/shoe.png"
                  alt="Adidas Running Sneaker"
                  className="w-[500px] sm:w-[260px] md:w-[400px] lg:w-[500px] h-auto object-contain drop-shadow-xl sm:-mb-8"
                />
              </div>
            </div>

            {/* Sorting filters */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-3 mb-4 bg-neutral-100 h-[62.57px] rounded">
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
                  <button className="p-2 hover:bg-neutral-200 rounded hover:cursor-pointer hover:text-blue-600">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="lucide lucide-grip-icon lucide-grip"
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
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="lucide lucide-text-align-justify-icon lucide-text-align-justify"
                    >
                      <path d="M3 5h18" />
                      <path d="M3 12h18" />
                      <path d="M3 19h18" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Product*/}
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
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {visible.map((p) => (
                    <div
                      key={p.id}
                      className="w-full max-w-[328px] h-[408px] bg-white rounded shadow mx-auto"
                    >
                      <ProductCard product={p} activeColor={queryState.color} />
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="mt-6 flex justify-center">
              <div className="w-[1070px] h-[68.56px] bg-neutral-100 flex items-center justify-center rounded">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Mobile bottom sticky buttons */}
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

      {/* Sort button */}
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

      {/* Filter button */}
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

            {/* Price button */}
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
