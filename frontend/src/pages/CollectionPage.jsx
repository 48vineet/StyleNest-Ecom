import React, { useEffect, useState, useRef } from "react";
import { FaFilter } from "react-icons/fa6";
import FilterSidebar from "../components/Products/FilterSidebar";
import SortOptions from "../components/Products/SortOptions";
import ProductGrid from "../components/Products/ProductGrid";
import { useParams, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsByFilters } from "../redux/slices/productsSlice";

const CollectionPage = () => {
  const { collection } = useParams();
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);
  const queryParams = Object.fromEntries([...searchParams]);
  const sidebarRef = useRef(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchProductsByFilters({ collection, ...queryParams }));
  }, [dispatch, collection, searchParams]);

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

  return (
    <div className="w-full">
      {/* Mobile filter button */}
      <button
        onClick={toggleSidebar}
        className="lg:hidden border p-2 flex justify-center items-center mx-4 my-2"
      >
        <FaFilter className="mr-2"></FaFilter> Filters
      </button>

      <div className="flex flex-col lg:flex-row">
        {/* Filter slidebar - Fixed for mobile, 20% width for desktop */}
        <div
          ref={sidebarRef}
          className={`fixed inset-y-0 z-50 left-0 w-64 bg-white overflow-y-auto transition-transform duration-400 lg:relative lg:w-1/5 lg:min-w-[250px] ${
            isSidebarOpen
              ? "translate-x-0"
              : "-translate-x-full lg:translate-x-0"
          }`}
        >
          <FilterSidebar></FilterSidebar>
        </div>

        {/* Main content area - 80% width */}
        <div className="w-full lg:w-4/5 px-6 py-4 lg:px-8">
          <h2 className="text-3xl text-center lg:text-4xl font-light text-gray-900 mb-4">
            All Collection
          </h2>
          <div className="w-24 h-px bg-gray-900 mx-auto"></div>
          <br />

          {/* Sort Options */}
          <SortOptions></SortOptions>

          {/* Products Grid */}
          <ProductGrid
            products={products}
            loading={loading}
            error={error}
          ></ProductGrid>
        </div>
      </div>
    </div>
  );
};

export default CollectionPage;
