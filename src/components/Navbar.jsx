import React from "react";
import { ShoppingCart, Menu, X } from "lucide-react";

export default function Navbar() {


  return (
    <header className="w-full bg-white border-b border-gray-100 relative hidden md:block">

      <div className="hidden lg:block h-16">

        <div className="absolute top-[13.27px] left-[27.4px] w-[182px] h-[44px] flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-blue-400 flex items-center justify-center text-white font-bold text-lg">
            E
          </div>
          <h1 className="text-2xl font-bold text-gray-900">E-Comm</h1>
        </div>

        <nav className="absolute top-[17.27px] left-[407.4px] w-[804px] h-[40px] flex gap-20 text-lg font-medium text-gray-700 ">
          <a className="hover:text-blue-600" href="#">HOME</a>
          <a className="hover:text-blue-600" href="#">BAG</a>
          <a className="hover:text-blue-600" href="#">SNEAKERS</a>
          <a className="hover:text-blue-600" href="#">BELT</a>
          <a className="hover:text-blue-600" href="#">CONTACT</a>
        </nav>
        
        <div className="absolute top-1/2 right-6 transform -translate-y-1/2 flex items-center gap-5 text-sm text-gray-700">
          <ShoppingCart size={25} className="text-gray-950" />
          <span className="font-medium text-base">
            Items <span className="font-semibold text-gray-500 ml-2">$0.00</span>
          </span>
        </div>
      </div>

      {/* Tablet Layout */}
      <div className="hidden md:block lg:hidden">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-400 flex items-center justify-center text-white font-bold text-lg">
              E
            </div>
            <h1 className="text-xl font-bold text-gray-900">E-Comm</h1>
          </div>
          
          <nav className="flex gap-8 text-sm font-medium text-gray-700">
            <a className="hover:text-blue-600" href="#">HOME</a>
            <a className="hover:text-blue-600" href="#">BAG</a>
            <a className="hover:text-blue-600" href="#">SNEAKERS</a>
            <a className="hover:text-blue-600" href="#">BELT</a>
            <a className="hover:text-blue-600" href="#">CONTACT</a>
          </nav>
          
          <div className="flex items-center gap-3 text-sm text-gray-700">
            <ShoppingCart size={22} className="text-gray-950" />
            <span className="font-medium">
              Items <span className="font-semibold text-gray-500 ml-2">$0.00</span>
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}