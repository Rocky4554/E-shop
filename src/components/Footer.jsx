import React from "react";
import { Facebook, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#cce4ff] py-10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-5 gap-8 text-gray-800">
        {/* E-Comm Brand */}
        <div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
              ⬢
            </div>
            <h3 className="font-bold text-lg">E-Comm</h3>
          </div>
          <p className="text-sm mt-3 leading-relaxed">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry’s standard dummy text
            ever. Since the 1500s, when an unknown printer.
          </p>
        </div>

        {/* Follow Us */}
        <div>
          <h4 className="font-semibold text-lg mb-3">Follow Us</h4>
          <p className="text-sm leading-relaxed mb-3">
            Since the 1500s, when an unknown printer took a galley of type and
            scrambled.
          </p>
          <div className="flex gap-3 text-blue-600">
            <Facebook className="w-5 h-5 cursor-pointer" />
            <Twitter className="w-5 h-5 cursor-pointer" />
          </div>
        </div>

        {/* Contact Us */}
        <div>
          <h4 className="font-semibold text-lg mb-3">Contact Us</h4>
          <p className="text-sm leading-relaxed">
            E-Comm , 4578 <br />
            Marmora Road, <br />
            Glasgow D04 89GR
          </p>
        </div>

        {/* Information */}
        <div>
          <h4 className="font-semibold text-lg mb-3">Information</h4>
          <ul className="text-sm space-y-1">
            <li>About Us</li>
            <li>Information</li>
            <li>Privacy Policy</li>
            <li>Terms & Conditions</li>
          </ul>
        </div>

        {/* Our Offers */}
        <div>
          <h4 className="font-semibold text-lg mb-3">Our Offers</h4>
          <ul className="text-sm space-y-1">
            <li>About Us</li>
            <li>Information</li>
            <li>Privacy Policy</li>
            <li>Terms & Conditions</li>
          </ul>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-300 mt-10 pt-6">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-gray-500 text-sm">
          <p>© 2018 Ecommerce theme by www.bisenbaev.com</p>

          {/* Payment Logos */}
          <div className="flex gap-3">
            <img src="/images/western-union.png" alt="Western Union" className="h-6" />
            <img src="/images/mastercard.png" alt="Mastercard" className="h-6" />
            <img src="/images/paypal.png" alt="Paypal" className="h-6" />
            <img src="/images/visa.png" alt="Visa" className="h-6" />
          </div>
        </div>
      </div>
    </footer>
  );
}
