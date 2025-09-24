import React from "react";
import { RiDeleteBin3Line } from "react-icons/ri";
import { useDispatch } from "react-redux";
import {
  updateCartItemQuantity,
  removeFromCart,
} from "../../redux/slices/cartSlice";

const CartContents = ({ cart, userId, guestId }) => {
  const dispatch = useDispatch();

  //! handel adding or substracting
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
    <div>
      {cart.products.map((product, index) => {
        return (
          <div
            key={index}
            className="flex items-start justify-between py-4 border-b border-gray-300"
          >
            <div className="flex items-center">
              <img
                src={product.image}
                alt={product.name}
                className="w-20 h-24 object-cover mr-4 rounded"
              />
              <div>
                <h3>{product.name}</h3>
                <p className="text-sm text-gray-500">
                  Size: {product.size} | Color: {product.color}
                </p>
                <div className="flex items-center mt-2">
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
                    className="bg-white hover:bg-gray-200 rounded-md w-8 h-8 text-lg font-bold flex items-center justify-center"
                  >
                    -
                  </button>
                  <span className="mx-3">{product.quantity}</span>
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
                    className="bg-white hover:bg-gray-200 rounded-md w-8 h-8 text-lg font-bold flex items-center justify-center"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
            <div>
              <p>$ {product.price.toLocaleString()}</p>
              <button
                onClick={() =>
                  handleRemoveFromCart(
                    product.productId,
                    product.size,
                    product.color
                  )
                }
              >
                <RiDeleteBin3Line className="h-6 w-6 mt-3 ms-2 text-red-600"></RiDeleteBin3Line>
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CartContents;
