import React ,{ useState }from "react";
import { ShoppingCart, Menu, X } from "lucide-react";

export default function Navbar() {
    const [mobileOpen, setMobileOpen] = useState(false);


  return (
    <header className="w-full bg-white border-b border-gray-100">
      <div className="flex justify-between items-center h-16 mx-auto max-w-screen-xl p-4 md:p-1">
        
        {/* Logo */}
        <div className="flex items-center gap-2 cursor-pointer">
           <img src="/images.png" alt="Logo" className="w-10 h-10 rounded-full border-black" loading="lazy"/>
          <h1 className="text-2xl font-bold text-gray-900">E-Comm</h1>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-20 text-lg font-medium text-gray-700">
          <a className="hover:text-blue-600" href="#">HOME</a>
          <a className="hover:text-blue-600" href="#">BAG</a>
          <a className="hover:text-blue-600" href="#">SNEAKERS</a>
          <a className="hover:text-blue-600" href="#">BELT</a>
          <a className="hover:text-blue-600" href="#">CONTACT</a>
        </nav>

        {/* Cart and Mobile Menu Button */}
        <div className="flex items-center gap-5 cursor-pointer">
          <div className="flex items-center gap-2 text-sm text-gray-700">
            <ShoppingCart size={25} className="text-gray-950" />
            <span className="hidden sm:inline font-medium text-base">
              Items <span className="font-semibold text-gray-500 ml-2">$0.00</span>
            </span>
          </div>

          {/* Dorpdown button on mobile */}
          <button
            className="md:hidden p-2 text-gray-700"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <nav className="md:hidden flex flex-col items-center gap-6 py-6 text-lg font-medium text-gray-700 border-t border-gray-200 hover:bg-neutarl-200">
          <a href="#">HOME</a>
          <a href="#">BAG</a>
          <a href="#">SNEAKERS</a>
          <a href="#">BELT</a>
          <a href="#">CONTACT</a>
        </nav>
      )}
    </header>
  );
}