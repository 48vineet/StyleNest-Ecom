import React from "react";
import MensCollectionImage from "../../assets/men.png";
import WomensCollectionImage from "../../assets/womens-collection.webp";
import { Link } from "react-router-dom";

const GenderCollection = () => {
  return (
    <section className="py-16 lg:py-24 px-4 lg:px-8">
      <div className="container mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-light text-gray-900 mb-4">
            Our Collections
          </h2>
          <div className="w-24 h-px bg-gray-900 mx-auto"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Women's Collection */}
          <div className="group relative overflow-hidden h-[600px]">
            <img
              src={WomensCollectionImage}
              alt="Women's Collection"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>

            {/* Content */}
            <div className="absolute bottom-0 left-0 right-0 p-8 lg:p-12">
              <div className="flex items-center gap-3 mb-4">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                <div className="w-8 h-px bg-white/40"></div>
              </div>

              <h3 className="text-3xl lg:text-4xl font-light text-white mb-3">
                Women
              </h3>

              <p className="text-white/80 text-lg mb-6 font-light">
                Elegant designs for the modern woman
              </p>

              <Link
                to="/collections/all?gender=Women"
                className="inline-flex items-center gap-2 text-white font-light text-lg border-b border-white/60 pb-1 hover:border-white transition-colors duration-300"
              >
                <span>Shop Collection</span>
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </Link>
            </div>
          </div>

          {/* Men's Collection */}
          <div className="group relative overflow-hidden h-[600px]">
            <img
              src={MensCollectionImage}
              alt="Men's Collection"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>

            {/* Content */}
            <div className="absolute bottom-0 left-0 right-0 p-8 lg:p-12">
              <div className="flex items-center gap-3 mb-4">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                <div className="w-8 h-px bg-white/40"></div>
              </div>

              <h3 className="text-3xl lg:text-4xl font-light text-white mb-3">
                Men
              </h3>

              <p className="text-white/80 text-lg mb-6 font-light">
                Contemporary styles for the discerning gentleman
              </p>

              <Link
                to="/collections/all?gender=Men"
                className="inline-flex items-center gap-2 text-white font-light text-lg border-b border-white/60 pb-1 hover:border-white transition-colors duration-300"
              >
                <span>Shop Collection</span>
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="text-center mt-16 pt-16 border-t border-gray-200">
          <Link
            to="/collections/all"
            className="inline-flex items-center gap-3 text-gray-900 text-lg font-light hover:text-gray-700 transition-colors duration-300"
          >
            <span>View All Collections</span>
            <div className="w-8 h-8 border border-gray-900 rounded-full flex items-center justify-center hover:bg-gray-900 hover:text-white transition-colors duration-300">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default GenderCollection;
