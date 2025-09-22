import React, { useState } from "react";
import Rating from "./Rating";
import { HeartPlus } from "lucide-react";

const colorMap = {
  blue: "bg-blue-500",
  black: "bg-black",
  red: "bg-red-500",
  yellow: "bg-yellow-400",
  pink: "bg-pink-500",
  brown: "bg-amber-500",
  beige: "bg-amber-500",
  green: "bg-green-500",
  white: "bg-white",
  grey: "bg-gray-400",
};

export default function ProductCard({ product, activeColor }) {
  const colorPanelClass = activeColor ? true : false;
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="w-full h-full rounded-lg relative cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {product.isHot && (
        <span className="absolute top-0 left-0 bg-[rgba(255,72,88,1)] text-white text-sm w-[69.74px] h-[34.7px] flex items-center justify-center z-20">
          HOT
        </span>
      )}

      <div className="w-full h-[286.55px] overflow-hidden relative">
        <img
          src={product.imageUrl}
          alt={product.name}
         
          className="sm:object-cover w-full h-full"
          loading="lazy"
        />

        {/*Color Options when select colrs */}
        {colorPanelClass && (
          <div className="absolute bottom-3 left-3 flex gap-2 items-center z-10 bg-white/80 px-2 py-1">
            {product.colors.slice(0, 5).map((c) => {
              const color = c.toLowerCase();
              return (
                <span
                  key={color}
                  title={color}
                  className={`w-3 h-3 rounded-full border ${
                    colorMap[color] || colorMap.default
                  }`}
                  style={{
                    backgroundColor: color === "brown" ? "#b5651d" : undefined,
                  }}
                />
              );
            })}
          </div>
        )}
      </div>

 
      <div className="p-4 text-center bg-white border-2 border-neutral-100 rounded-md shadow-sm">
        {hovered ? (
          <div className="flex flex-col justify-between items-center cursor-pointer">
            <div className="mb-2">
              <button className="border px-8 py-1 text-sm cursor-pointer">❤️ Wishlist</button>
            </div>

            <div className="flex flex-row justify-center items-center gap-4">
              <p className="text-sm mb-2">
                Sizes:{" "}
                <span className="font-medium">{product.size || "L"}</span>
              </p>

              <p className="text-sm mb-2">
                Color: <span className="font-medium">{product.colors}</span>
              </p>
            </div>
            <div className="flex gap-2 items-center">
              <div className="text-blue-600 font-bold">
                Rs. {product.discountPrice}
              </div>
              <div className="text-sm text-gray-400 line-through">
                Rs. {product.price}
              </div>
              <div className="text-sm font-bold text-red-500">
                ({product.discountPercent}% OFF)
              </div>
            </div>
          </div>
        ) : (
          <>
            <h3 className="text-lg font-bold text-[#223263]">{product.name}</h3>

            <div className="flex justify-center items-center text-[#FFC600] text-sm my-2">
              <Rating value={product.ratingValue} count={product.ratingCount} />

            </div>
      
            <div className="flex items-center justify-center gap-2 flex-wrap">
              <div className="text-[#40BFFF] font-bold">
                Rs. {product.discountPrice}
              </div>
              <div className="text-sm text-gray-400 line-through">
                Rs. {product.price}
              </div>
              <div className="text-sm font-bold text-[#FB7181]">
                {product.discountPercent}% OFF
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
