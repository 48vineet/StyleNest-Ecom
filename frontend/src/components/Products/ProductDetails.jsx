import React, { useEffect, useState } from "react";
import { FaCartShopping } from "react-icons/fa6";
import { toast } from "sonner";
import ProductGrid from "./ProductGrid";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  fetchProductById,
  fetchSimilarProducts,
} from "../../redux/slices/productsSlice";

import { addToCart } from "../../redux/slices/cartSlice";

function ProductDetails({ productId, productData }) {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { selectedProduct, loading, error, similarProducts } = useSelector(
    (state) => state.products
  );

  const { user, guestId } = useSelector((state) => state.auth);
  const [mainImage, setMainImage] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedcolor, setSelectedcolor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const productFetchId = productId || id;
  const currentProduct = productData || selectedProduct;

  useEffect(() => {
    if (!productData && productFetchId) {
      dispatch(fetchProductById(productFetchId));
    }

    if (productFetchId) {
      dispatch(fetchSimilarProducts({ id: productFetchId }));
    }
  }, [dispatch, productFetchId, productData]);

  useEffect(() => {
    if (!mainImage && currentProduct?.images?.length > 0) {
      setMainImage(currentProduct.images[0].url);
    }
  }, [mainImage, currentProduct]);

  const handelQuantityChange = (action) => {
    if (action === "plus") setQuantity((prev) => prev + 1);
    if (action === "minus" && quantity > 1) setQuantity((prev) => prev - 1);
  };

  const handelAddToCart = () => {
    if (!selectedSize || !selectedcolor) {
      toast.error("Please select a size and color before adding.", {
        duration: 1000,
      });
      return;
    }

    setIsButtonDisabled(true);

    dispatch(
      addToCart({
        productId: productFetchId,
        quantity,
        size: selectedSize,
        color: selectedcolor,
        guestId,
        userId: user?._id,
      })
    )
      .then(() => {
        toast.success("Product added to cart!", { duration: 1000 });
      })
      .finally(() => {
        setIsButtonDisabled(false);
      });
  };

  if (!productData && loading) return <p>Loading...</p>;
  if (!productData && error)
    return <p className="text-red-500">Error: {error}</p>;

  return (
    <div className="p-4 sm:p-6">
      {currentProduct && (
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row gap-6 md:gap-8">
            {/* Image Section */}
            <div className="md:w-1/2">
              {/* Desktop Layout */}
              <div className="hidden md:flex gap-6">
                {/* Thumbnails - Desktop */}
                <div className="flex flex-col space-y-4">
                  {currentProduct.images?.map((image, index) => (
                    <img
                      key={index}
                      src={image.url}
                      alt={image.altText || `Thumbnail ${index}`}
                      className={`w-20 h-20 object-cover rounded-lg cursor-pointer border-2 transition-all duration-200 ${
                        mainImage === image.url
                          ? "border-black"
                          : "border-gray-200"
                      }`}
                      onClick={() => setMainImage(image.url)}
                    />
                  ))}
                </div>

                {/* Main Image - Desktop */}
                <div className="flex-1">
                  {mainImage ? (
                    <img
                      src={mainImage}
                      alt="Main Product"
                      className="w-full h-auto object-cover rounded-lg"
                    />
                  ) : (
                    <p>Loading image...</p>
                  )}
                </div>
              </div>

              {/* Mobile Layout */}
              <div className="md:hidden">
                {/* Main Image - Mobile */}
                <div className="mb-4">
                  {mainImage ? (
                    <img
                      src={mainImage}
                      alt="Main Product"
                      className="w-full h-auto object-cover rounded-lg"
                    />
                  ) : (
                    <p>Loading image...</p>
                  )}
                </div>

                {/* Thumbnails - Mobile */}
                <div className="flex overflow-x-auto space-x-4 pb-2">
                  {currentProduct.images?.map((image, index) => (
                    <img
                      key={index}
                      src={image.url}
                      alt={image.altText || `Thumbnail${index}`}
                      className={`flex-none w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-lg cursor-pointer border-2 transition-all duration-200 ${
                        mainImage === image.url
                          ? "border-black"
                          : "border-gray-200"
                      }`}
                      onClick={() => setMainImage(image.url)}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Product Details Section */}
            <div className="md:w-1/2 space-y-4 sm:space-y-6">
              {/* Title & Price */}
              <div>
                <h1 className="text-2xl sm:text-3xl md:text-3xl font-light mb-2">
                  {currentProduct.name}
                </h1>
                <div className="flex items-baseline gap-3">
                  <p className="text-xl sm:text-2xl font-medium text-gray-900">
                    ${currentProduct.price}
                  </p>
                  {currentProduct.orignalPrice && (
                    <p className="text-lg sm:text-xl text-gray-400 line-through">
                      ${currentProduct.orignalPrice}
                    </p>
                  )}
                </div>
              </div>

              {/* Description */}
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                {currentProduct.description}
              </p>

              {/* Colors Section */}
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <p className="text-sm font-medium text-gray-900">Color</p>
                  {selectedcolor && (
                    <span className="text-xs sm:text-sm text-gray-500 capitalize">
                      {selectedcolor}
                    </span>
                  )}
                </div>
                <div className="flex gap-2 sm:gap-3">
                  {currentProduct.colors?.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedcolor(color)}
                      className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 transition-all duration-200 ${
                        selectedcolor === color
                          ? "border-black scale-105"
                          : "border-gray-200"
                      }`}
                      style={{
                        backgroundColor: color.toLowerCase(),
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Size Section */}
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <p className="text-sm font-medium text-gray-900">Size</p>
                  {selectedSize && (
                    <span className="text-xs sm:text-sm text-gray-500">
                      {selectedSize}
                    </span>
                  )}
                </div>
                <div className="grid grid-cols-4 sm:grid-cols-6 md:flex md:flex-wrap gap-2">
                  {currentProduct.sizes?.map((size) => (
                    <button
                      onClick={() => setSelectedSize(size)}
                      key={size}
                      className={`px-3 py-2 sm:px-4 sm:py-2 rounded border text-xs sm:text-sm font-medium transition-all duration-200 ${
                        selectedSize === size
                          ? "bg-black text-white border-black"
                          : "bg-white text-gray-900 border-gray-200"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity Section */}
              <div>
                <p className="text-sm font-medium text-gray-900 mb-3">
                  Quantity
                </p>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center border border-gray-200 rounded">
                    <button
                      onClick={() => handelQuantityChange("minus")}
                      className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center text-gray-600 text-lg disabled:opacity-50"
                      disabled={quantity <= 1}
                    >
                      −
                    </button>
                    <span className="w-10 sm:w-12 text-center font-medium text-sm sm:text-base">
                      {quantity}
                    </span>
                    <button
                      onClick={() => handelQuantityChange("plus")}
                      className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center text-gray-600 text-lg"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* Add to Cart Button */}
              <button
                disabled={isButtonDisabled || !selectedSize || !selectedcolor}
                onClick={handelAddToCart}
                className={`w-full py-3 sm:py-4 rounded flex items-center justify-center gap-2 text-sm sm:text-base font-medium transition-all duration-200 ${
                  isButtonDisabled || !selectedSize || !selectedcolor
                    ? "cursor-not-allowed opacity-50 bg-gray-200 text-gray-500"
                    : "bg-black text-white"
                }`}
              >
                {isButtonDisabled ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span className="hidden sm:inline">Adding to cart...</span>
                    <span className="sm:hidden">Adding...</span>
                  </>
                ) : (
                  <>
                    <FaCartShopping className="w-4 h-4 sm:w-5 sm:h-5" />
                    Add to cart
                  </>
                )}
              </button>

              {/* Selection Reminder - Mobile */}
              {(!selectedSize || !selectedcolor) && (
                <p className="text-xs text-gray-500 text-center sm:hidden">
                  Please select size and color
                </p>
              )}

              {/* Product Characteristics */}
              <div className="pt-4 border-t border-gray-100">
                <h3 className="text-base font-medium mb-3">Product Details</h3>
                <div className="space-y-2 text-sm text-gray-600">
                  {currentProduct.brand && (
                    <div className="flex justify-between">
                      <span>Brand</span>
                      <span className="font-medium">
                        {currentProduct.brand}
                      </span>
                    </div>
                  )}
                  {currentProduct.material && (
                    <div className="flex justify-between">
                      <span>Material</span>
                      <span className="font-medium">
                        {currentProduct.material}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Similar Products Section */}
          {similarProducts && similarProducts.length > 0 && (
            <div className="mt-16 sm:mt-20 text-center">
              <h2 className="text-3xl lg:text-4xl font-light text-gray-900 mb-4">
                You Might Also Like
              </h2>
              <div className="w-24 h-px bg-gray-900 mx-auto mb-6"> </div>
              <br />
              <ProductGrid
                products={similarProducts}
                loading={loading}
                error={error}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default ProductDetails;
