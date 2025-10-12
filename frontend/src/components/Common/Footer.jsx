import React from "react";
import { HiPhone, HiShoppingBag } from "react-icons/hi2";
import { TbBrandMeta } from "react-icons/tb";
import { IoLogoInstagram } from "react-icons/io";
import { Link } from "react-router-dom";
import { RiTwitterXLine } from "react-icons/ri";

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="container mx-auto px-4 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Newsletter Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Newsletter
              </h3>
              <HiShoppingBag className="h-5 w-5 text-gray-600" />
            </div>
            <p className="text-gray-600 mb-4 leading-relaxed">
              Be the first to hear about new products, exclusive events, and
              online offers.
            </p>
            <div className="bg-green-50 p-3 rounded-lg mb-6">
              <p className="text-sm font-medium text-green-800">
                Sign up and get 10% off on your first order!
              </p>
            </div>
            <form className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 text-sm border border-gray-200 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent bg-white"
                required
              />
              <button
                type="submit"
                className="bg-gray-900 text-white px-6 py-3 text-sm font-medium rounded-r-lg hover:bg-gray-800 transition-colors duration-200"
              >
                Subscribe
              </button>
            </form>
          </div>

          {/* Shop Links */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Shop</h3>
            <nav className="space-y-3">
              <Link
                to="#"
                className="block text-gray-600 hover:text-gray-900 transition-colors duration-200 text-sm"
              >
                Men's Top Wear
              </Link>
              <Link
                to="#"
                className="block text-gray-600 hover:text-gray-900 transition-colors duration-200 text-sm"
              >
                Women's Top Wear
              </Link>
              <Link
                to="#"
                className="block text-gray-600 hover:text-gray-900 transition-colors duration-200 text-sm"
              >
                Men's Bottom Wear
              </Link>
              <Link
                to="#"
                className="block text-gray-600 hover:text-gray-900 transition-colors duration-200 text-sm"
              >
                Women's Bottom Wear
              </Link>
            </nav>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-6">
              Support
            </h3>
            <nav className="space-y-3">
              <Link
                to="#"
                className="block text-gray-600 hover:text-gray-900 transition-colors duration-200 text-sm"
              >
                Contact Us
              </Link>
              <Link
                to="#"
                className="block text-gray-600 hover:text-gray-900 transition-colors duration-200 text-sm"
              >
                About Us
              </Link>
              <Link
                to="#"
                className="block text-gray-600 hover:text-gray-900 transition-colors duration-200 text-sm"
              >
                FAQs
              </Link>
              <Link
                to="#"
                className="block text-gray-600 hover:text-gray-900 transition-colors duration-200 text-sm"
              >
                Features
              </Link>
            </nav>
          </div>

          {/* Follow Us & Contact */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-6">
              Connect
            </h3>

            {/* Social Links */}
            <div className="flex items-center gap-4 mb-8">
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-white border border-gray-200 rounded-lg hover:border-gray-300 hover:shadow-sm transition-all duration-200"
                aria-label="Facebook"
              >
                <TbBrandMeta className="h-5 w-5 text-gray-600" />
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-white border border-gray-200 rounded-lg hover:border-gray-300 hover:shadow-sm transition-all duration-200"
                aria-label="Instagram"
              >
                <IoLogoInstagram className="h-5 w-5 text-gray-600" />
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-white border border-gray-200 rounded-lg hover:border-gray-300 hover:shadow-sm transition-all duration-200"
                aria-label="Twitter"
              >
                <RiTwitterXLine className="h-5 w-5 text-gray-600" />
              </a>
            </div>

            {/* Contact Info */}
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <p className="text-sm font-medium text-gray-900 mb-2">
                Need Help?
              </p>
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-gray-100 rounded-md">
                  <HiPhone className="h-4 w-4 text-gray-600" />
                </div>
                <span className="text-sm text-gray-600">0123-465-789</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="border-t border-gray-200 bg-white">
        <div className="container mx-auto px-4 lg:px-8 py-6">
          <p className="text-center text-sm text-gray-500">
            © 2025 CompileTab. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
