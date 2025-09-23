const User = require("../models/User");
const Cart = require("../models/Cart");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

// Login user and merge cart
const loginUser = async (req, res) => {
  try {
    const { email, password, guestId } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Handle cart merging if guestId is provided
    if (guestId) {
      try {
        const guestCart = await Cart.findOne({ guestId });
        const userCart = await Cart.findOne({ user: user._id });

        if (guestCart && guestCart.products.length > 0) {
          if (userCart) {
            // Merge guest cart into user cart
            guestCart.products.forEach((guestItem) => {
              const productIndex = userCart.products.findIndex(
                (item) =>
                  item.productId.toString() ===
                    guestItem.productId.toString() &&
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
          } else {
            // Assign guest cart to user
            guestCart.user = user._id;
            guestCart.guestId = undefined;
            await guestCart.save();
          }

          // Delete guest cart after merging
          await Cart.findOneAndDelete({ guestId });
        }
      } catch (mergeError) {
        console.error("Cart merge error during login:", mergeError);
        // Continue with login even if cart merge fails
      }
    }

    // Generate token
    const token = generateToken(user._id);

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token,
      message: "Login successful",
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  loginUser,
};
