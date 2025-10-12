import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ProductGrid = ({ products, loading, error }) => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [mainImage, setMainImage] = useState("");

  useEffect(() => {
    if (selectedProduct?.images?.length > 0) {
      setMainImage(selectedProduct.images[0].url);
    }
  }, [selectedProduct]);

  if (loading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
        {[...Array(8)].map((_, index) => (
          <div key={index} className="space-y-4">
            <div className="w-full aspect-[3/4] bg-gray-100 rounded-lg animate-pulse"></div>
            <div className="space-y-3">
              <div className="h-5 bg-gray-100 rounded animate-pulse"></div>
              <div className="h-6 bg-gray-100 rounded w-1/2 animate-pulse"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-16">
        <p className="text-red-600 font-medium">
          Error loading products: {error}
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
      {products.map((product, index) => (
        <Link
          key={product._id || index}
          to={`/product/${product._id}`}
          className="group block"
        >
          <article className="space-y-4">
            {/* Product Image - Increased size */}
            <div className="relative w-full aspect-[3/4] overflow-hidden bg-gray-50 rounded-lg">
              <img
                src={product.images?.[0]?.url}
                alt={product.images?.[0]?.altText || product.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
              />
            </div>

            {/* Product Details - Increased text sizes and spacing */}
            <div className="space-y-2">
              <h3 className="text-gray-900 font-normal text-base leading-tight line-clamp-2">
                {product.name}
              </h3>

              <p className="text-gray-900 font-semibold text-lg">
                $ {product.price}
              </p>
            </div>
          </article>
        </Link>
      ))}
    </div>
  );
};

export default ProductGrid;
