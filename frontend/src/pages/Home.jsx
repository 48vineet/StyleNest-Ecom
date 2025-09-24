import React, { useState } from "react";
import Hero from "../components/Layout/Hero";
import GenderCollection from "../components/Products/GenderCollection";
import NewArrivals from "../components/Products/NewArrivals";
import ProductDetails from "../components/Products/ProductDetails";
import ProductGrid from "../components/Products/ProductGrid";
import FeaturedCollection from "../components/Products/FeaturedCollection";
import FeaturesSection from "../components/Products/FeaturesSection";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsByFilters } from "../redux/slices/productsSlice";
import axios from "axios";

const Home = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);
  const [bestSellerProducts, setBestSellerProducts] = useState(null);
  const [bestSellerLoading, setBestSellerLoading] = useState(false);
  const [bestSellerError, setBestSellerError] = useState(null);

  React.useEffect(() => {
    dispatch(
      fetchProductsByFilters({
        gender: "Women",
        category: "Bottom Wear",
        limit: 8,
      })
    );

    const fetchBestSellers = async () => {
      setBestSellerLoading(true);
      setBestSellerError(null);

      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/products/best-seller`
        );

        setBestSellerProducts(response.data);
      } catch (error) {
        console.error("Error fetching best sellers:", error);
        setBestSellerError(error.message);
      } finally {
        setBestSellerLoading(false);
      }
    };

    fetchBestSellers();
  }, [dispatch]);

  const renderBestSeller = () => {
    if (bestSellerLoading) {
      return <p className="text-center">Loading best seller...</p>;
    }

    if (bestSellerError) {
      return (
        <p className="text-center text-red-500">
          Error loading best seller: {bestSellerError}
        </p>
      );
    }

    if (!bestSellerProducts) {
      return <p className="text-center">No best seller product found</p>;
    }

    // Pass both productId and productData to avoid unnecessary API calls
    return (
      <ProductDetails
        productId={bestSellerProducts._id}
        productData={bestSellerProducts}
      />
    );
  };

  return (
    <div>
      <Hero />
      <GenderCollection />
      <NewArrivals />

      {/* Best Seller Section */}
      <div className="container mx-auto mb-8">
        <h2 className="text-3xl text-center font-semibold mb-4">Best Seller</h2>
        {renderBestSeller()}
      </div>

      <div className="container mx-auto">
        <h2 className="text-3xl text-center font-semibold mb-4">
          Top Wear For Women
        </h2>
        <ProductGrid products={products} loading={loading} error={error} />
      </div>

      <FeaturedCollection />
      <FeaturesSection />
    </div>
  );
};

export default Home;
