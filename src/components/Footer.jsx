
import React from "react";

export default function Footer() {
  return (
    <footer className="mt-12 bg-blue-50 py-10">
      <div className="max-w-7xl mx-auto px-4 md:px-6 grid grid-cols-1 md:grid-cols-4 gap-6">
        <div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-300 flex items-center justify-center text-white">E</div>
            <h3 className="font-bold">E-Comm</h3>
          </div>
          <p className="text-sm text-gray-600 mt-3">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
          </p>
        </div>
        <div>
          <h4 className="font-semibold">Information</h4>
          <ul className="text-sm text-gray-700 mt-3 space-y-1">
            <li>About Us</li>
            <li>Information</li>
            <li>Privacy Policy</li>
            <li>Terms & Conditions</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold">My Account</h4>
          <ul className="text-sm text-gray-700 mt-3 space-y-1">
            <li>About Us</li>
            <li>Information</li>
            <li>Privacy Policy</li>
            <li>Terms & Conditions</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold">Contact Us</h4>
          <p className="text-sm text-gray-700 mt-3">E-Comm, 4578 Marmora Road, Glasgow D04 89GR</p>
        </div>
      </div>
    </footer>
  );
}
