import React from "react";
import Hero from "../components/Layout/Hero";
import GenderCollection from "../components/Products/GenderCollection";
import NewArrivals from "../components/Products/NewArrivals";
import ProductDetails from "../components/Products/ProductDetails";
import ProductGrid from "../components/Products/ProductGrid";
import FeaturedCollection from "../components/Products/FeaturedCollection";
import FeaturesSection from "../components/Products/FeaturesSection";

const placeholderProducts = [
  {
    _id: 1,
    name: "product 1",
    price: 100,
    images: [
      {
        url: "https://picsum.photos/500/500?random=8",
      },
    ],
  },
  {
    _id: 2,
    name: "product 2",
    price: 100,
    images: [
      {
        url: "https://picsum.photos/500/500?random=6",
      },
    ],
  },
  {
    _id: 3,
    name: "product 3",
    price: 100,
    images: [
      {
        url: "https://picsum.photos/500/500?random=3",
      },
    ],
  },
  {
    _id: 4,
    name: "product 4",
    price: 100,
    images: [
      {
        url: "https://picsum.photos/500/500?random=3",
      },
    ],
  },
  {
    _id: 5,
    name: "product 5",
    price: 100,
    images: [
      {
        url: "https://picsum.photos/500/500?random=8",
      },
    ],
  },
  {
    _id: 6,
    name: "product 6",
    price: 100,
    images: [
      {
        url: "https://picsum.photos/500/500?random=6",
      },
    ],
  },
  {
    _id: 7,
    name: "product 7",
    price: 100,
    images: [
      {
        url: "https://picsum.photos/500/500?random=8",
      },
    ],
  },
  {
    _id: 8,
    name: "product 8",
    price: 100,
    images: [
      {
        url: "https://picsum.photos/500/500?random=1",
      },
    ],
  },
];

const Home = () => { 
  return (
    <div>
      <Hero />
      <GenderCollection></GenderCollection>
      <NewArrivals></NewArrivals>
      {/* Best Seller */}
      <h2 className="text-3xl text-center font-semibold mb-4">Best Seller</h2>
      <div className="flex justify-center">
        <div
          className="w-full max-w-[1200px] px-4"
          style={{ textAlign: "left" }}
        >
          <ProductDetails />
        </div>
      </div>
      <div className="container mx-auto ">
        <h2 className="text-3xl text-center font-semibold mb-4">
          Top Wear For Women
        </h2>
        <ProductGrid products={placeholderProducts}></ProductGrid>
      </div>
      <FeaturedCollection></FeaturedCollection>
      <FeaturesSection></FeaturesSection>
    </div>
  );
};

export default Home;
