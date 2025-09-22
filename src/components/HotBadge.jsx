import React from "react";

const HotBadge = ({ isVisible = false, className = "" }) => {
  if (!isVisible) return null;

  return (
    <span 
      className={`absolute top-0 left-0 bg-[rgba(255,72,88,1)] text-white text-sm w-[69.74px] h-[34.7px] flex items-center justify-center z-20 ${className}`}
    >
      HOT
    </span>
  );
};

export default HotBadge;