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
  const [perPage, setPerPage] = useState(12);

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
            {/* Hero image */}
            <div className="bg-blue-400 h-44 p-6 flex items-center justify-between text-white mb-6">
              <div>
                <h2 className="text-2xl font-bold">Adidas Men Running</h2>
                <p className="text-sm opacity-90">
                  Sneakers — Performance and design. Taken right to the edge.
                </p>
              </div>
              <div className="w-40 h-40 bg-white rounded-md flex items-center justify-center">
                <img src="https://picsum.photos/seed/hero/300/180" alt="hero" />
              </div>
            </div>

            {/* Controls */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-3 mb-4">
              <div className="flex items-center gap-3">
                <div className="text-sm text-gray-700">
                  {sorted.length} Items
                </div>
                <label className="text-sm">Sort By</label>
                <select
                  value={queryState.sort}
                  onChange={handleSortChange}
                  className="border rounded px-2 py-1 text-sm"
                >
                  <option value="name_asc">Name (A → Z)</option>
                  <option value="name_desc">Name (Z → A)</option>
                  <option value="price_asc">Price (Low → High)</option>
                  <option value="price_desc">Price (High → Low)</option>
                  <option value="popularity_desc">Popularity</option>
                </select>
              </div>

              <div className="flex items-center gap-3">
                <label>Show</label>
                <select
                  value={perPage}
                  onChange={(e) => setPerPage(Number(e.target.value))}
                  className="border rounded px-2 py-1 text-sm"
                >
                  <option value={6}>6</option>
                  <option value={12}>12</option>
                  <option value={24}>24</option>
                </select>
                <div className="hidden md:flex items-center gap-2">
                  <button className="p-2 border rounded">☰</button>
                  <button className="p-2 border rounded">▦</button>
                </div>
              </div>
            </div>

            {/* Products */}
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
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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

            {/* Pagination row sticks bottom of column */}
            <div className="mt-6 flex items-center justify-between">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
              <button className="text-blue-500 font-medium">
                More Options
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
