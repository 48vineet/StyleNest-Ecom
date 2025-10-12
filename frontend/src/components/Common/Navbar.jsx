import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  HiOutlineUser,
  HiOutlineShoppingBag,
  HiBars3BottomRight,
} from "react-icons/hi2";
import Searchbar from "./Searchbar";
import CartDrawer from "../Layout/CartDrawer";
import { IoMdClose } from "react-icons/io";
import { useSelector } from "react-redux";
import LogoImage from "../../assets/LogoStyleNest.png";

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [navDrawerOpen, setNavDrawerOpen] = useState(false);

  const { cart } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);

  const cartItemCount =
    cart?.products?.reduce((total, products) => total + products.quantity, 0) ||
    0;

  const toggleNavDrawer = () => {
    setNavDrawerOpen(!navDrawerOpen);
  };

  const toggleCartDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  // Prevent body scroll when drawer is open
  useEffect(() => {
    if (navDrawerOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [navDrawerOpen]);

  const navLinks = [
    { to: "/collections/all?gender=Men", label: "Men" },
    { to: "/collections/all?gender=Women", label: "Women" },
    { to: "/collections/all?category=Top Wear", label: "Top Wear" },
    { to: "/collections/all?category=Bottom Wear", label: "Bottom Wear" },
  ];

  return (
    <>
      <nav className="bg-white border-b border-gray-100 sticky top-0 z-30">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link
              to="/"
              className="text-2xl font-bold text-gray-900 hover:text-gray-700 transition-all duration-300 tracking-wider hover:tracking-widest"
            >
              STYLENEST
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.to}
                  className="text-gray-600 hover:text-gray-900 font-medium text-sm uppercase tracking-wider transition-colors duration-200 relative group"
                >
                  {link.label}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gray-900 transition-all duration-200 group-hover:w-full"></span>
                </Link>
              ))}
            </div>

            {/* Right Icons */}
            <div className="flex items-center space-x-2">
              {/* Admin Button */}
              {user && user.role === "admin" && (
                <Link
                  to="/admin"
                  className="hidden sm:block bg-gray-900 text-white px-3 py-1.5 rounded-md text-sm font-medium hover:bg-gray-800 transition-colors"
                >
                  Admin
                </Link>
              )}

              {/* Profile */}
              <Link
                to="/profile"
                className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all duration-200"
              >
                <HiOutlineUser className="h-6 w-6" />
              </Link>

              {/* Cart */}
              <button
                onClick={toggleCartDrawer}
                className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all duration-200"
              >
                <HiOutlineShoppingBag className="h-6 w-6" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full min-w-[20px] h-5 flex items-center justify-center px-1 font-medium">
                    {cartItemCount}
                  </span>
                )}
              </button>

              {/* Search */}
              <Searchbar />

              {/* Mobile Menu Button */}
              <button
                onClick={toggleNavDrawer}
                className="lg:hidden p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all duration-200"
              >
                <HiBars3BottomRight className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Cart Drawer */}
      <CartDrawer drawerOpen={drawerOpen} toggleCartDrawer={toggleCartDrawer} />

      {/* Mobile Navigation Overlay */}
      {navDrawerOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={toggleNavDrawer}
        />
      )}

      {/* Mobile Navigation Drawer */}
      <div
        className={`fixed top-0 left-0 w-80 max-w-[85vw] h-full bg-white shadow-xl transform transition-transform duration-300 z-50 lg:hidden ${
          navDrawerOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Menu</h2>
          <button
            onClick={toggleNavDrawer}
            className="p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <IoMdClose className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation Links */}
        <div className="p-4">
          <nav className="space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                onClick={toggleNavDrawer}
                className="block px-3 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors font-medium"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Admin Link for Mobile */}
          {user && user.role === "admin" && (
            <div className="mt-6 pt-4 border-t border-gray-200">
              <Link
                to="/admin"
                onClick={toggleNavDrawer}
                className="block w-full bg-gray-900 text-white text-center px-4 py-2 rounded-lg font-medium hover:bg-gray-800 transition-colors"
              >
                Admin Panel
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
