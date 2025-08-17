import React, { useEffect, useState } from "react";
import { FaCartShopping } from "react-icons/fa6";
import { toast } from "sonner";
import ProductGrid from "./ProductGrid";
function ProductDetails({ products }) {
  const selectedProduct = {
    name: "Stylish Jacket",
    price: 120,
    orignalPrice: 199,
    description: "This is stylish jacket perfect for any ocassion",
    brand: "FasionBrand",
    material: "Leather",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Red", "Black"],
    images: [
      {
        url: "https://picsum.photos/500/500?random=1",
        altText: "Stylish Jacket 1",
      },
      {
        url: "https://picsum.photos/500/500?random=2",
        altText: "Stylish Jacket 2",
      },
    ],
  };

  const similarProducts = [
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
          url: "https://picsum.photos/500/500?random=6",
        },
      ],
    },
  ];

  const [mainImage, setMainImage] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedcolor, setSelectedcolor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  useEffect(() => {
    if (selectedProduct?.images?.length > 0) {
      setMainImage(selectedProduct.images[0].url);
    }
  }, [selectedProduct]); // ✅ Correct usage
  const handelQuantityChange = (action) => {
    if (action == "plus") setQuantity((prev) => prev + 1);
    if (action == "minus" && quantity > 1) setQuantity((prev) => prev - 1);
  };
  const handelAddToCart = () => {
    if (!selectedSize || !selectedcolor) {
      // Fix condition
      toast.error("Please select a size and color before adding.", {
        duration: 1000,
      });
      return;
    }

    setIsButtonDisabled(true);
    setTimeout(() => {
      toast.success("Product added to cart", {
        duration: 1000,
      });
      setIsButtonDisabled(false);
    }, 500);
  };

  return (
    <div className="p-6">
      <div className="max-w-6xl bg-white p-8 rounded-lg  ">
        <div className="flex flex-col md:flex-row">
          {/* left thumnails */}
          <div className="hidden md:flex flex-col space-y-4 mr-6">
            {selectedProduct.images.map((image, index) => (
              <img
                key={index}
                src={image.url}
                alt={image.altText || `Thumnail${index}`}
                className={`w-20 h-20 object-cover rounded-lg cursor-pointer border ${
                  mainImage === image.url ? "border-black" : "bg-gray-300"
                }`}
                onClick={() => setMainImage(image.url)}
              />
            ))}
          </div>
          {/* Main Image */}
          <div className="md:w-1/2">
            <div className="mb-4">
              {mainImage && (
                <img
                  src={mainImage}
                  alt="Main Product"
                  className="w-full h-auto object-cover rounded-lg"
                />
              )}
            </div>
          </div>
          {/* Mobile Thumbnail */}
          <div className="md:hidden flex overscroll-x-scroll space-x-4 mb-4">
            {selectedProduct.images.map((image, index) => (
              <img
                key={index}
                src={image.url}
                alt={image.altText || `Thumnail${index}`}
                className={`w-20 h-20 object-cover rounded-lg cursor-pointer border ${
                  mainImage === image.url ? "border-black" : "bg-gray-300"
                }`}
                onClick={() => setMainImage(image.url)}
              />
            ))}
          </div>
          <div className="md:w-1/2 md:ml-10">
            <h1 className="text-2xl md:text-3xl font-semibold mb-2">
              {selectedProduct.name}
            </h1>
            <p className="text-lg text-gray-600 mb-1 line-through">
              {selectedProduct.orignalPrice &&
                `  ${selectedProduct.orignalPrice}`}
            </p>
            <p className="text-xl text-gray-500 mb-2">
              $ {selectedProduct.price}
            </p>
            <p className="text-gray-500 mb-4 ">{selectedProduct.description}</p>
            <div className="mb-4">
              <p className="text-gray-700">Colors:</p>
              <div className="flex gap-2 mt-2">
                {selectedProduct.colors.map((colors) => (
                  <button
                    key={colors}
                    onClick={() => setSelectedcolor(colors)} // Update the state with the selected color
                    className={`w-8 h-8 rounded-full border ${
                      selectedcolor === colors
                        ? "border-black"
                        : "border-gray-300"
                    }`}
                    style={{
                      backgroundColor: colors.toLocaleLowerCase(),
                      filter: "brightness(0.5)",
                    }}
                  ></button>
                ))}
              </div>
            </div>
            <div className="mb-4">
              <p className="text-gray-700">Size:</p>
              <div className="flex gap-2 mt-2">
                {selectedProduct.sizes.map((size) => (
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
            <div className="mb-6 ">
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
            <button
              disabled={isButtonDisabled}
              onClick={handelAddToCart} // Pass function reference instead of invoking it
              className={`bg-black text-white py-2 px-6 rounded w-full mb-4 ${
                isButtonDisabled
                  ? "cursor-not-allowed opacity-50"
                  : "bg-gray-900"
              }`}
            >
              {isButtonDisabled ? "Adding..." : "ADD TO CART "}
              <FaCartShopping className="h-5 w-5 font-bold inline-block" />
            </button>
            <div className="mt-10 text-gray-700">
              <h3 className="text-xl font-bold mb-4">Charecteristics:</h3>
              <table className="w-full text-left text-sm  text-gray-600">
                <tbody>
                  <tr>
                    <td className="py-1">Brand</td>
                    <td className="py-1">{selectedProduct.brand}</td>
                  </tr>
                  <tr>
                    <td className="py-1">Material</td>
                    <td className="py-1">{selectedProduct.material}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="mt-20">
          <h2 className="text-2xl text-center font-semibold mb-4">
            You May Also Like
          </h2>
          <ProductGrid products={similarProducts} />
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
