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

  // Use productData if provided, otherwise fall back to Redux state
  const currentProduct = productData || selectedProduct;

  useEffect(() => {
    // Only fetch if we don't have product data and have an ID
    if (!productData && productFetchId) {
      dispatch(fetchProductById(productFetchId));
    }

    // Always fetch similar products
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
    if (action == "plus") setQuantity((prev) => prev + 1);
    if (action == "minus" && quantity > 1) setQuantity((prev) => prev - 1);
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

  // Show loading only if we're waiting for Redux data and don't have productData
  if (!productData && loading) return <p>Loading...</p>;
  if (!productData && error)
    return <p className="text-red-500">Error: {error}</p>;

  return (
    <div className="p-6">
      {currentProduct && (
        <div className="max-w-6xl bg-white p-8 rounded-lg">
          <div className="flex flex-col md:flex-row">
            {/* left thumbnails */}
            <div className="hidden md:flex flex-col space-y-4 mr-6">
              {currentProduct.images?.map((image, index) => (
                <img
                  key={index}
                  src={image.url}
                  alt={image.altText || `Thumbnail ${index}`}
                  className={`w-20 h-20 object-cover rounded-lg cursor-pointer border ${
                    mainImage === image.url ? "border-black" : "bg-gray-300"
                  }`}
                  onClick={() => {
                    setMainImage(image.url);
                  }}
                />
              ))}
            </div>

            {/* Main Image */}
            <div className="md:w-1/2">
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
            </div>

            {/* Mobile Thumbnail */}
            <div className="md:hidden flex overflow-x-scroll space-x-4 mb-4">
              {currentProduct.images?.map((image, index) => (
                <img
                  key={index}
                  src={image.url}
                  alt={image.altText || `Thumbnail${index}`}
                  className={`w-20 h-20 object-cover rounded-lg cursor-pointer border ${
                    mainImage === image.url ? "border-black" : "bg-gray-300"
                  }`}
                  onClick={() => setMainImage(image.url)}
                />
              ))}
            </div>

            {/* Product Details Section */}
            <div className="md:w-1/2 md:ml-10">
              <h1 className="text-2xl md:text-3xl font-semibold mb-2">
                {currentProduct.name}
              </h1>
              <p className="text-lg text-gray-600 mb-1 line-through">
                {currentProduct.orignalPrice &&
                  `$${currentProduct.orignalPrice}`}
              </p>
              <p className="text-xl text-gray-500 mb-2">
                ${currentProduct.price}
              </p>
              <p className="text-gray-500 mb-4">{currentProduct.description}</p>

              {/* Colors Section */}
              <div className="mb-4">
                <p className="text-gray-700">Colors:</p>
                <div className="flex gap-2 mt-2">
                  {currentProduct.colors?.map((colors) => (
                    <button
                      key={colors}
                      onClick={() => setSelectedcolor(colors)}
                      className={`w-8 h-8 rounded-full border ${
                        selectedcolor === colors
                          ? "border-black"
                          : "border-gray-300"
                      }`}
                      style={{
                        backgroundColor: colors.toLowerCase(),
                        filter: "brightness(0.5)",
                      }}
                    ></button>
                  ))}
                </div>
              </div>

              {/* Size Section */}
              <div className="mb-4">
                <p className="text-gray-700">Size:</p>
                <div className="flex gap-2 mt-2">
                  {currentProduct.sizes?.map((size) => (
                    <button
                      onClick={() => setSelectedSize(size)}
                      key={size}
                      className={`px-4 py-2 rounded border ${
                        selectedSize === size ? "bg-black text-white" : ""
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity Section */}
              <div className="mb-6">
                <p className="text-gray-700">Quantity:</p>
                <div className="flex items-center space-x-4 mt-2">
                  <button
                    onClick={() => handelQuantityChange("minus")}
                    className="px-2 py-1 bg-gray-200 text-lg"
                  >
                    -
                  </button>
                  <span className="text-lg">{quantity}</span>
                  <button
                    onClick={() => handelQuantityChange("plus")}
                    className="px-2 py-1 bg-gray-200 text-lg"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Add to Cart Button */}
              <button
                disabled={isButtonDisabled}
                onClick={handelAddToCart}
                className={`bg-black text-white py-2 px-6 rounded w-full mb-4 flex items-center justify-center gap-2 ${
                  isButtonDisabled
                    ? "cursor-not-allowed opacity-50"
                    : "hover:bg-gray-900"
                }`}
              >
                {isButtonDisabled ? "Adding..." : "ADD TO CART"}
                <FaCartShopping className="h-5 w-5 font-bold" />
              </button>

              {/* Product Characteristics */}
              <div className="mt-10 text-gray-700">
                <h3 className="text-xl font-bold mb-4">Characteristics:</h3>
                <table className="w-full text-left text-sm text-gray-600">
                  <tbody>
                    <tr>
                      <td className="py-1">Brand</td>
                      <td className="py-1">{currentProduct.brand}</td>
                    </tr>
                    <tr>
                      <td className="py-1">Material</td>
                      <td className="py-1">{currentProduct.material}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Similar Products Section */}
          <div className="mt-20">
            <h2 className="text-2xl text-center font-semibold mb-4">
              You May Also Like
            </h2>
            <ProductGrid
              products={similarProducts}
              loading={loading}
              error={error}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductDetails;
