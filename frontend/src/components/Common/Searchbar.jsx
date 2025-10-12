import React, { useState } from "react";
import { HiMagnifyingGlass, HiMiniXMark } from "react-icons/hi2";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  fetchProductsByFilters,
  setFilters,
} from "../../redux/slices/productsSlice";

const Searchbar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSearchToggle = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      // Focus on input when opening
      setTimeout(() => {
        document.getElementById("search-input")?.focus();
      }, 100);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      dispatch(setFilters({ search: searchTerm.trim() }));
      dispatch(fetchProductsByFilters({ search: searchTerm.trim() }));
      navigate(`/collections/all?search=${searchTerm.trim()}`);
      setIsOpen(false);
      setSearchTerm("");
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    setSearchTerm("");
  };

  return (
    <>
      {/* Search Container */}
      <div
        className={`transition-all duration-300 ease-in-out ${
          isOpen
            ? "fixed top-0 left-0 w-full bg-white shadow-lg z-50 border-b border-gray-200"
            : "relative"
        }`}
        style={isOpen ? { height: "calc(2.5rem + 4rem)" } : {}} // Height of topbar + navbar
      >
        {isOpen ? (
          <div className="h-full flex items-center">
            <div className="container mx-auto px-4 lg:px-8">
              <form onSubmit={handleSearch} className="flex items-center gap-4">
                <div className="flex-1 relative">
                  <input
                    id="search-input"
                    type="text"
                    placeholder="Search for products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 pr-12 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                  />
                  <button
                    type="submit"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1.5 text-gray-500 hover:text-gray-900 transition-colors"
                  >
                    <HiMagnifyingGlass className="h-5 w-5" />
                  </button>
                </div>
                <button
                  type="button"
                  onClick={handleClose}
                  className="p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <HiMiniXMark className="h-6 w-6" />
                </button>
              </form>
            </div>
          </div>
        ) : (
          <button
            onClick={handleSearchToggle}
            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all duration-200"
          >
            <HiMagnifyingGlass className="h-6 w-6" />
          </button>
        )}
      </div>
    </>
  );
};

export default Searchbar;
