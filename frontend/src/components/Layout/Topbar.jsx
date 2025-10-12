import React from "react";
import { TbBrandMeta } from "react-icons/tb";
import { IoLogoInstagram } from "react-icons/io";
import { RiTwitterXLine } from "react-icons/ri";

const Topbar = () => {
  return (
    <div className="bg-gray-900 text-white text-sm">
      <div className="container mx-auto flex justify-between items-center py-2 px-4 lg:px-8">
        {/* Social Links */}
        <div className="hidden md:flex items-center space-x-3">
          <a
            href="#"
            className="p-1.5 hover:bg-gray-800 rounded-md transition-colors duration-200"
            aria-label="Facebook"
          >
            <TbBrandMeta className="h-4 w-4" />
          </a>
          <a
            href="#"
            className="p-1.5 hover:bg-gray-800 rounded-md transition-colors duration-200"
            aria-label="Instagram"
          >
            <IoLogoInstagram className="h-4 w-4" />
          </a>
          <a
            href="#"
            className="p-1.5 hover:bg-gray-800 rounded-md transition-colors duration-200"
            aria-label="Twitter"
          >
            <RiTwitterXLine className="h-4 w-4" />
          </a>
        </div>

        {/* Center Message */}
        <div className="flex-1 text-center">
          <span className="font-medium">
            Free Shipping Worldwide • Fast & Reliable Delivery
          </span>
        </div>

        {/* Contact */}
        <div className="hidden md:block">
          <a
            href="tel:+12345678901"
            className="hover:text-gray-300 transition-colors duration-200 font-medium"
          >
            +1 (234) 567-8901
          </a>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
