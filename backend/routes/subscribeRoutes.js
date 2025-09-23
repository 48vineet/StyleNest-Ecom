const express = require("express");
const router = express.Router();
const Subscriber = require("../models/Subscriber");

//! POST /api/subscribe

router.post("/subscribe", async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  try {
    // check if email is alredy subscrbed
    let subscriber = await Subscriber.findOne({ email });

    if (subscriber) {
      return res.status(400).json({ message: "Email is alredy subscribed" });
    }
    // if not then create subscriber
    subscriber = new Subscriber({ email });
    await subscriber.save();
    res.status(201).json({ message: "Sucessfully Subscribed to news letter" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
