import React from "react";
import { Facebook, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#bcdffe] py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4 md:px-6 text-gray-800">

        {/* Top  - 2 Rows */}
        <div className="grid grid-cols-1 gap-y-10 p-2 sm:p-7">

          {/* pahale: Brand, Follow Us, Contact */}
          <div className="grid grid-cols-3 gap-15 sm:gap-55">
           
            <div>
              <div className="flex items-center gap-3 mb-4 ">
                <img
                  src="/images.png"
                  alt="Logo"
                  className="w-10 h-10 rounded-full border border-black"
                />
                <h3 className="font-bold text-lg">E-Comm</h3>
              </div>
              <p className="text-xs leading-relaxed mt-3 overflow-hidden text-clip">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s.
              </p>
            </div>

          
            <div>
              <h4 className="font-semibold text-lg mb-4">Follow Us</h4>
              <p className="text-xs leading-relaxed mb-4">
                Since the 1500s, when an unknown printer took a galley of type
                and scrambled.
              </p>
              <div className="flex gap-8">
                <div className="flex items-center justify-center text-sky-800 cursor-pointer">
                  <Facebook className="w-4 h-4  fill-sky-800" />
                </div>
                <div className="flex items-center justify-center text-sky-400 cursor-pointer">
                  <Twitter className="w-4 h-4 fill-sky-400" />
                </div>
              </div>
            </div>

         
            <div>
              <h4 className="font-semibold text-lg mb-4">Contact Us</h4>
              <p className="text-xs leading-relaxed">
                E-Comm, 4578
                <br />
                Marmora Road,
                <br />
                Glasgow D04 89GR
              </p>
            </div>
          </div>

          {/* Row 2: Information, Service, My Account, Our Offers */}
          <div className="grid grid-cols-4 gap-8 text-sm">
            
            <div>
              <h4 className="font-semibold text-base mb-3">Information</h4>
              <ul className="space-y-1">
                <li className="cursor-pointer hover:text-blue-600">About Us</li>
                <li className="cursor-pointer hover:text-blue-600">
                  Information
                </li>
                <li className="cursor-pointer hover:text-blue-600">
                  Privacy Policy
                </li>
                <li className="cursor-pointer hover:text-blue-600">
                  Terms & Conditions
                </li>
              </ul>
            </div>

           
            <div>
              <h4 className="font-semibold text-base mb-3">Service</h4>
              <ul className="space-y-1">
                <li className="cursor-pointer hover:text-blue-600">About Us</li>
                <li className="cursor-pointer hover:text-blue-600">
                  Information
                </li>
                <li className="cursor-pointer hover:text-blue-600">
                  Privacy Policy
                </li>
                <li className="cursor-pointer hover:text-blue-600">
                  Terms & Conditions
                </li>
              </ul>
            </div>

           
            <div>
              <h4 className="font-semibold text-base mb-3">My Account</h4>
              <ul className="space-y-1">
                <li className="cursor-pointer hover:text-blue-600">About Us</li>
                <li className="cursor-pointer hover:text-blue-600">
                  Information
                </li>
                <li className="cursor-pointer hover:text-blue-600">
                  Privacy Policy
                </li>
                <li className="cursor-pointer hover:text-blue-600">
                  Terms & Conditions
                </li>
              </ul>
            </div>

         
            <div>
              <h4 className="font-semibold text-base mb-3">Our Offers</h4>
              <ul className="space-y-1">
                <li className="cursor-pointer hover:text-blue-600">About Us</li>
                <li className="cursor-pointer hover:text-blue-600">
                  Information
                </li>
                <li className="cursor-pointer hover:text-blue-600">
                  Privacy Policy
                </li>
                <li className="cursor-pointer hover:text-blue-600">
                  Terms & Conditions
                </li>
              </ul>
            </div>
          </div>
        </div>

       
        <div className="border-t border-white mt-8 md:mt-10 pt-4 md:pt-6 ml-15 mr-15">
          <div className="max-w-7xl mx-auto px-4 md:px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-gray-500 text-sm">
            <p className="text-center md:text-left">
              © 2018 Ecommerce theme by www.bisenbaev.com
            </p>

         
            <div className="flex flex-wrap sm:gap-2 justify- sm:justify-end">
              <div className="px-2 py-1">
                <img
                  src="footer/westernunion.png"
                  alt="weternunion"
                  className="object-contain w-[39px] h-[23.16px]"
                />
              </div>
              <div className="px-2 py-1">
                <img
                  src="footer/mastercard.png"
                  alt="weternunion"
                  className="object-contain w-[39px] h-[23.16px]"
                />
              </div>
              <div className="px-2 py-1">
                <img
                  src="footer/paypal.png"
                  alt="weternunion"
                  className="object-contain w-[39px] h-[23.16px]"
                />
              </div>
              <div className="px-2 py-1">
                <img
                  src="footer/visa.png"
                  alt="weternunion"
                  className="object-contain w-[39px] h-[23.16px]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
