import React from "react";
import MensCollectionImage from "../../assets/men.png";
import WomensCollectionImage from "../../assets/womens-collection.webp";
import { Link } from "react-router-dom";
const GenderCollection = () => {
  return (
    <section className="py-16 px-4 lg:px-0 ">
      <div className="container mx-auto flex flex-col md:flex-row gap-8">
        {/* Women */}
        <div className="relative flex-1">
          <img
            src={WomensCollectionImage}
            alt="Women's Collection"
            className="w-full h-[700px] object-cover"
          />
          <div className="absolute bottom-10 left-8 bg-white opacity-90 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              Women's Collection
            </h2>
            <Link
              to="/collections/all?gender=Women"
              className="text-gray-900 underline"
            >
              Shop Now
            </Link>
          </div>
        </div>
        {/* Mens Collection */}
        <div className="relative flex-1">
          <img
            src={MensCollectionImage}
            alt="Men's Collection"
            className="w-full h-[700px] object-cover"
          />
          <div className="absolute bottom-10 left-8 bg-white opacity-90 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              Men's Collection
            </h2>
            <Link
              to="/collections/all?gender=Men"
              className="text-gray-900 underline"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GenderCollection;
