const express = require("express");
const Cart = require("../models/Cart");
const Product = require("../models/Product");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

//! Helper function to get cart by userId or guestId
const getCart = async (userId, guestId) => {
  if (userId) {
    return await Cart.findOne({ user: userId });
  } else if (guestId) {
    return await Cart.findOne({ guestId });
  }
  return null;
};

//! GET /api/cart
router.get("/", async (req, res) => {
  try {
    const { userId, guestId } = req.query;

    if (!userId && !guestId) {
      return res.status(400).json({ message: "userId or guestId is required" });
    }

    const cart = await getCart(userId, guestId);

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    res.status(200).json(cart);
  } catch (error) {
    console.error("GET /api/cart error:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

//! POST /api/cart
router.post("/", async (req, res) => {
  try {
    if (req.body && Object.keys(req.body).length === 0) {
      return res.status(400).json({ message: "Request body cannot be empty" });
    }

    const { productId, quantity, size, color, guestId, userId } =
      req.body || {};

    if (!productId) {
      return res.status(400).json({ message: "productId is required" });
    }

    if (!quantity) {
      return res.status(400).json({ message: "quantity is required" });
    }

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "product not found" });

    //? Determine if user is guest or logged in
    let cart = await getCart(userId, guestId);

    //? if cart exists update it
    if (cart) {
      // Ensure products array exists
      if (!cart.products) {
        cart.products = [];
      }

      const productIndex = cart.products.findIndex(
        (p) =>
          p.productId.toString() === productId &&
          p.size === size &&
          p.color === color
      );

      if (productIndex > -1) {
        //? Product already exists, update it
        cart.products[productIndex].quantity += parseInt(quantity);
      } else {
        // add new product
        cart.products.push({
          productId,
          name: product.name,
          image: product.images[0].url,
          price: product.price,
          size,
          color,
          quantity: parseInt(quantity),
        });
      }

      //? Recalculate the total price
      cart.totalPrice = cart.products.reduce(
        (acc, item) => acc + parseFloat(item.price) * item.quantity,
        0
      );
      await cart.save();
      return res.status(200).json(cart);
    } else {
      //Create New Cart for guest or user
      const newCart = await Cart.create({
        user: userId ? userId : undefined,
        guestId: guestId ? guestId : "guest_" + new Date().getTime(),
        products: [
          {
            productId,
            name: product.name,
            image: product.images[0].url,
            price: product.price,
            size,
            color,
            quantity: parseInt(quantity),
          },
        ],
        totalPrice: parseFloat(product.price) * parseInt(quantity),
      });
      res.status(201).json(newCart);
    }
  } catch (error) {
    console.error("POST /api/cart error:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

//! PUT /api/cart
router.put("/", async (req, res) => {
  try {
    const { productId, quantity, size, color, guestId, userId } =
      req.body || {};

    if (!productId) {
      return res.status(400).json({
        message: "productId is required",
        receivedBody: req.body,
      });
    }

    if (quantity === undefined || quantity === null) {
      return res.status(400).json({
        message: "quantity is required",
        receivedBody: req.body,
      });
    }

    let cart = await getCart(userId, guestId);
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const productIndex = cart.products.findIndex(
      (p) =>
        p.productId.toString() === productId &&
        p.size === size &&
        p.color === color
    );

    if (productIndex > -1) {
      if (quantity > 0) {
        cart.products[productIndex].quantity = parseInt(quantity);
      } else {
        cart.products.splice(productIndex, 1); //? remove product if quantity is zero
      }

      cart.totalPrice = cart.products.reduce(
        (acc, item) => acc + parseFloat(item.price) * item.quantity,
        0
      );
      await cart.save();
      return res.status(200).json(cart);
    } else {
      return res.status(404).json({ message: "Product not found in cart" });
    }
  } catch (error) {
    console.error("PUT /api/cart error:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

//! DELETE /api/cart (request body version)
router.delete("/", async (req, res) => {
  try {
    const { productId, size, color, guestId, userId } = req.body || {};

    if (!productId) {
      return res.status(400).json({ message: "productId is required" });
    }

    let cart = await getCart(userId, guestId);
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const productIndex = cart.products.findIndex(
      (p) =>
        p.productId.toString() === productId &&
        (!size || p.size === size) &&
        (!color || p.color === color)
    );

    if (productIndex > -1) {
      cart.products.splice(productIndex, 1);
      cart.totalPrice = cart.products.reduce(
        (acc, item) => acc + parseFloat(item.price) * item.quantity,
        0
      );
      await cart.save();
      return res.status(200).json(cart);
    } else {
      return res.status(404).json({ message: "Product not found in cart" });
    }
  } catch (error) {
    console.error("DELETE /api/cart error:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

//! POST /api/cart/merge

router.post("/merge", protect, async (req, res) => {
  const { guestId } = req.body;
  try {
    // Check if user is authenticated
    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    //? find guest cart and user cart
    const guestCart = await Cart.findOne({ guestId });
    const userCart = await Cart.findOne({ user: req.user._id });

    if (!guestCart) {
      return res
        .status(404)
        .json({ message: "Guest cart not found or already merged" });
    }

    if (guestCart.products.length === 0) {
      return res.status(400).json({ message: "Guest Cart is Empty" });
    }

    if (userCart) {
      //? Merging guest cart into user cart
      guestCart.products.forEach((guestItem) => {
        const productIndex = userCart.products.findIndex(
          (item) =>
            item.productId.toString() === guestItem.productId.toString() &&
            item.size === guestItem.size &&
            item.color === guestItem.color
        );

        if (productIndex > -1) {
          userCart.products[productIndex].quantity += guestItem.quantity;
        } else {
          userCart.products.push(guestItem);
        }
      });

      userCart.totalPrice = userCart.products.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );

      await userCart.save();

      //? Remove Guest Cart after mergining
      try {
        await Cart.findOneAndDelete({ guestId });
      } catch (error) {
        console.error("Error Deleting Guest Cart :", error);
      }

      res.status(201).json(userCart);
    } else {
      //? if user has no guest Cart assign the guestCart to the user
      guestCart.user = req.user._id;
      guestCart.guestId = undefined;
      await guestCart.save();
      res.status(200).json(guestCart);
    }
  } catch (error) {
    console.error("POST /api/cart/merge error:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

module.exports = router;
