import React from "react";
import Rating from "./Rating";

function colorToBg(color) {
  const map = {
    blue: "bg-blue-50",
    black: "bg-gray-100",
    red: "bg-red-50",
    yellow: "bg-yellow-50",
    pink: "bg-pink-50",
    brown: "bg-amber-50",
    beige: "bg-amber-50",
    green: "bg-green-50",
    white: "bg-white"
  };
  return map[color] || "bg-white";
}

export default function ProductCard({ product, activeColor }) {
  const colorPanelClass = activeColor ? colorToBg(activeColor) : "bg-white";

  return (
    <div className="w-full h-full rounded-lg relative hover:shadow-lg transition bg-neutral-100">
      {product.isHot && (
        <span className="absolute top-0 left-0 bg-red-500 text-center text-white text-shadow-2xs text-18px w-[69.74px] h-[34.7px] rounded-xs py-1 shadow-b shadow-r ">HOT</span>
      )}

      <div className={`w-full h-[286.55px] rounded-xs overflow-hidden ${colorPanelClass}`} >
        <img
          src={product.imageUrl}
          alt={product.name}
          // className="object-contain w-full h-full"
          className="object-cover w-full h-full"
          loading="lazy"
        />
      </div>

      <h3 className="mt-3 text-sm font-semibold text-gray-800">{product.name}</h3>
      <Rating value={product.ratingValue} count={product.ratingCount} />

      <div className="mt-2 flex items-end justify-between">
        <div>
          <div className="text-blue-600 font-bold text-lg">${product.discountPrice.toFixed(2)}</div>
          <div className="text-sm text-gray-400 line-through">${product.price.toFixed(2)}</div>
        </div>
        <div className="text-sm text-red-500">{product.discountPercent}% Off</div>
      </div>

      <div className="mt-3 flex gap-2 items-center">
        {product.colors.slice(0, 5).map((c) => (
          <span
            key={c}
            title={c}
            className={`w-4 h-4 rounded-full border ${c === "white" ? "bg-white" : ""} ${c !== "white" ? "bg-" + c + "-500" : "bg-white"}`}
            style={{ backgroundColor: c === "brown" ? "#b5651d" : undefined }}
          />
        ))}
      </div>
    </div>
  );
}


/////////////
// import React, { useState } from "react";

// export default function ProductCard({ product }) {
//   const [hovered, setHovered] = useState(false);

//   return (
//     <div
//       className="w-full h-full bg-white rounded-lg relative overflow-hidden border"
//       onMouseEnter={() => setHovered(true)}
//       onMouseLeave={() => setHovered(false)}
//     >
//       {/* HOT badge */}
//       {product.isHot ? (
//         <div className="absolute top-0 left-0 bg-red-500 text-white text-xs px-3 py-1">
//           HOT
//         </div>
//       ) : null}

//       {/* Image box */}
//       <div className="w-full h-44 flex items-center justify-center bg-gray-100">
//         <img
//           src={product.imageUrl}
//           alt={product.name}
//           className="w-full h-full object-contain"
//         />
//       </div>

//       {/* Details part - slides up */}
//       <div
//         className={`absolute bottom-0 left-0 w-full bg-white transition-all duration-500 ${
//           hovered ? "translate-y-0" : "translate-y-[55%]"
//         }`}
//       >
//         {/* Default (like shoe card) */}
//         {!hovered && (
//           <div className="p-3">
//             <h3 className="text-sm font-bold text-gray-900">{product.name}</h3>

//             {/* Stars (simple fresher style) */}
//             <div className="flex items-center text-yellow-500 text-sm">
//               ★★★★☆ <span className="text-gray-500 ml-1">({product.ratingCount})</span>
//             </div>

//             <div className="mt-2 flex justify-between items-end">
//               <div>
//                 <div className="text-blue-600 font-bold text-lg">
//                   ${product.discountPrice}
//                 </div>
//                 <div className="text-sm text-gray-400 line-through">
//                   ${product.price}
//                 </div>
//               </div>
//               <div className="text-sm text-red-500">
//                 {product.discountPercent}% Off
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Hover (like Myntra card) */}
//         {hovered && (
//           <div className="p-3">
//             <div className="flex justify-between items-center mb-2">
//               <button className="border px-3 py-1 text-sm">❤️ Wishlist</button>
//               <span className="text-xs text-gray-400">AD</span>
//             </div>

//             <p className="text-sm mb-2">
//               Sizes: <span className="font-medium">{product.size || "L"}</span>
//             </p>

//             <div className="flex gap-2 items-center">
//               <div className="text-gray-900 font-bold">
//                 Rs. {product.discountPrice}
//               </div>
//               <div className="text-sm text-gray-400 line-through">
//                 Rs. {product.price}
//               </div>
//               <div className="text-sm text-red-500">
//                 ({product.discountPercent}% OFF)
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }


// import React, { useState } from "react";

// export default function ProductCard({ product }) {
//   const [hovered, setHovered] = useState(false);

//   return (
//     <div
//       className="w-[326.37px] bg-white rounded-lg relative overflow-hidden shadow-sm"
//       onMouseEnter={() => setHovered(true)}
//       onMouseLeave={() => setHovered(false)}
//     >
//       {/* HOT badge */}
//       {product.isHot ? (
//         <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-3 py-1 rounded">
//           HOT
//         </div>
//       ) : null}

//       {/* Image box */}
//       <div className="w-full h-[286.55px]">
//         <img
//           src={product.imageUrl}
//           alt={product.name}
//           className="w-full h-full object-cover"
//         />
//       </div>

//       {/* Details part */}
//       <div
//         className={`absolute bottom-0 left-0 w-full bg-white transition-all duration-500 ${
//           hovered ? "translate-y-0" : "translate-y-[0]" /* default visible */
//         }`}
//       >
//         {/* Default (like shoe card) */}
//         {!hovered && (
//           <div className="p-4 text-center">
//             <h3 className="text-lg font-bold text-gray-900">{product.name}</h3>

//             {/* Stars */}
//             <div className="flex justify-center items-center text-yellow-500 text-sm my-2">
//               ★★★★☆{" "}
//               <span className="text-gray-500 ml-1">({product.ratingCount})</span>
//             </div>

//             {/* Prices */}
//             <div className="flex justify-center items-center gap-2">
//               <div className="text-blue-600 font-bold text-xl">
//                 ${product.discountPrice}
//               </div>
//               <div className="text-sm text-gray-400 line-through">
//                 ${product.price}
//               </div>
//               <div className="text-sm text-red-500">
//                 {product.discountPercent}% Off
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Hover (unchanged) */}
//         {hovered && (
//           <div className="p-3">
//             <div className="flex justify-between items-center mb-2">
//               <button className="border px-3 py-1 text-sm">❤️ Wishlist</button>
//               <span className="text-xs text-gray-400">AD</span>
//             </div>

//             <p className="text-sm mb-2">
//               Sizes: <span className="font-medium">{product.size || "L"}</span>
//             </p>

//             <div className="flex gap-2 items-center">
//               <div className="text-gray-900 font-bold">
//                 Rs. {product.discountPrice}
//               </div>
//               <div className="text-sm text-gray-400 line-through">
//                 Rs. {product.price}
//               </div>
//               <div className="text-sm text-red-500">
//                 ({product.discountPercent}% OFF)
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

