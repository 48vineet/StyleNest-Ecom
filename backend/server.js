const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");

const app = express();
app.use(express.json());
app.use(cors());
dotenv.config();

const PORT = process.env.PORT || 3000;
connectDB();

app.get("/", (req, res) => {
  res.send("WELCOME TO STYLENEST API!");
});

//! Api Routes

app.use("/api/user", userRoutes);
app.use("/api/products", productRoutes);

app.listen(PORT, () => {
  console.log(`App is listining on http://localhost:${PORT}`);
});
