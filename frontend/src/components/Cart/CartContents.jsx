import React from "react";
import { RiDeleteBin3Line, RiSubtractLine, RiAddLine } from "react-icons/ri";
import { useDispatch } from "react-redux";
import {
  updateCartItemQuantity,
  removeFromCart,
} from "../../redux/slices/cartSlice";

const CartContents = ({ cart, userId, guestId }) => {
  const dispatch = useDispatch();

  const handleToCart = (productId, delta, quantity, size, color) => {
    const newQuantity = quantity + delta;
    if (newQuantity >= 1) {
      dispatch(
        updateCartItemQuantity({
          productId,
          quantity: newQuantity,
          guestId,
          userId,
          size,
          color,
        })
      );
    }
  };

  const handleRemoveFromCart = (productId, size, color) => {
    dispatch(removeFromCart({ productId, guestId, userId, size, color }));
  };

  return (
    <div className="space-y-6">
      {cart.products.map((product, index) => {
        return (
          <div
            key={index}
            className="flex items-start gap-4 pb-6 border-b border-gray-100 last:border-b-0"
          >
            {/* Product Image */}
            <div className="flex-shrink-0">
              <img
                src={product.image}
                alt={product.name}
                className="w-24 h-auto object-contain rounded-lg"
              />
            </div>

            {/* Product Details */}
            <div className="flex-1 min-w-0">
              <h3 className="text-base font-medium text-gray-900 mb-2">
                {product.name}
              </h3>

              <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                <span>
                  Size:{" "}
                  <span className="text-gray-700 font-medium">
                    {product.size}
                  </span>
                </span>
                <span>
                  Color:{" "}
                  <span className="text-gray-700 font-medium">
                    {product.color}
                  </span>
                </span>
              </div>

              {/* Quantity Controls */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() =>
                    handleToCart(
                      product.productId,
                      -1,
                      product.quantity,
                      product.size,
                      product.color
                    )
                  }
                  className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                  disabled={product.quantity <= 1}
                >
                  <RiSubtractLine className="w-4 h-4 text-gray-600" />
                </button>

                <span className="text-base font-medium text-gray-900 min-w-[24px] text-center">
                  {product.quantity}
                </span>

                <button
                  onClick={() =>
                    handleToCart(
                      product.productId,
                      1,
                      product.quantity,
                      product.size,
                      product.color
                    )
                  }
                  className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                >
                  <RiAddLine className="w-4 h-4 text-gray-600" />
                </button>
              </div>
            </div>

            {/* Price and Remove */}
            <div className="flex flex-col items-end gap-3">
              <p className="text-lg font-semibold text-gray-900">
                ${product.price.toLocaleString()}
              </p>

              <button
                onClick={() =>
                  handleRemoveFromCart(
                    product.productId,
                    product.size,
                    product.color
                  )
                }
                className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-md transition-colors"
              >
                <RiDeleteBin3Line className="w-4 h-4" />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CartContents;
