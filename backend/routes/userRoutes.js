const express = require("express");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

const router = express.Router();

//? @route POST /api/user/register

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    let user = await User.findOne({ email });

    if (user) return res.status(400).json({ message: "User Alredy Exist" });

    user = new User({ name, email, password });

    await user.save();

    //? Create JWT payload
    const payload = { user: { id: user._id }, role: user.role };

    //? Sign and return the token data
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "12h" },
      (error, token) => {
        if (error) throw error;

        //? send the user and token in response
        res.status(201).json({
          user: {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
          },
          token,
        });
      }
    );
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
});

//! Login POST request

router.post("/login", async (req, res) => {
  console.log("Request Body:", req.body); // Debugging log
  const { email, password } = req.body;

  try {
    //? Validate email and password
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Please provide email and password" });
    }

    //? Find user by email
    let user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid Credentials" });

    //? Check if password matches
    const isMatch = await user.matchPassword(password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid Credentials" });

    //? Create JWT payload
    const payload = { user: { id: user._id }, role: user.role };

    //? Sign and return the token data
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "12h" },
      (error, token) => {
        if (error) throw error;

        //? Send the user and token in response
        res.json({
          user: {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
          },
          token,
        });
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});


//! GET api/user/profile

router.get("/profile", (req,res)=> {
  
})


module.exports = router;
