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
    <div className="border rounded-lg p-4 relative hover:shadow-lg transition bg-white">
      {product.isHot && (
        <span className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 text-xs rounded">HOT</span>
      )}

      <div className={`w-full h-44 rounded-md flex items-center justify-center overflow-hidden ${colorPanelClass}`}>
        <img
          src={product.imageUrl}
          alt={product.name}
          className="object-contain w-full h-full"
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
