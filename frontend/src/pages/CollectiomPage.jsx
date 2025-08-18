import React, { useEffect, useState, useRef } from "react";
import { FaFilter } from "react-icons/fa6";
import FilterSidebar from "../components/Products/FilterSidebar";
import SortOptions from "../components/Products/SortOptions";
import ProductGrid from "../components/Products/ProductGrid";

const CollectiomPage = () => {
  const [products, setProducts] = useState([]);
  const sidebarRef = useRef(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handelClickOutside = (e) => {
    if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
      setIsSidebarOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handelClickOutside);
    return () => {
      document.removeEventListener("mousedown", handelClickOutside);
    };
  });

  useEffect(() => {
    setTimeout(() => {
      const fetchProducts = [
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
      setProducts(fetchProducts);
    }, 1000);
  }, []);
  return (
    <div className="flex flex-col lg:flex-row">
      {/* Mobile filter button */}
      <button
        onClick={toggleSidebar}
        className="lg:hidden border p-2 flex justify-center items-center"
      >
        <FaFilter className="mr-2"></FaFilter> Filters
      </button>
      {/* Filter slidebar */}
      <div
        ref={sidebarRef}
        className={`fixed inset-y-0 z-50 left-0 w-64 bg-white overflow-y-auto transition-transform duration-400 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:static lg:translate-x-0`}
      >
        <FilterSidebar></FilterSidebar>
      </div>
      <div className="flex-grow p-4 ">
        <h2 className="text-2xl uppercase mb-4"> All Collection </h2>
        {/* Sort Options */}
        <SortOptions></SortOptions>
        {/* Products Grid */}
        <ProductGrid products={products}></ProductGrid>
      </div>
    </div>
  );
};

export default CollectiomPage;
