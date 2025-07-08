require("dotenv").config();
const express = require("express");
const http = require("http");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

//importing routes
const authRoutes = require("./routes/auth.js");
const newSareeAdd = require("./routes/addNewSaree.js");
const productGet = require("./routes/products.js");
const cartRoutes = require("./routes/cart");
const paymentRoutes = require("./routes/payments.js");
const reviewSection = require("./routes/reviewSection.js");
const addingWishList = require("./routes/addingWishList.js");
const orders = require("./routes/orders.js");
const searchRoutes = require("./routes/search.js");
//defining the cors

app.use(
  cors({
    origin: ["https://kashvi-creation-psi.vercel.app", "http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
    optionsSuccessStatus: 200,
  })
);

app.use((req, res, next) => {
  res.header(
    "Access-Control-Allow-Origin",
    "https://kashvi-creation-psi.vercel.app",
    "http://localhost:5173"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

//defining the routes
app.use("/auth", authRoutes);
app.use("/saree-related", newSareeAdd);
app.use("/product-related", productGet);
app.use("/cart-related", cartRoutes);
app.use("/payment-related", paymentRoutes);
app.use("/review-related", reviewSection);
app.use("/wishlist-related", addingWishList);
app.use("/orders-related", orders);
app.use("/search-related", searchRoutes);

//statring the server
const server = http.createServer(app);
const PORT = process.env.PORT || 3001;

mongoose
  .connect(process.env.MONGO_URI || "mongodb://localhost:27017", {
    dbName: "Kashvi_Saree",
  })
  .then(() => {
    server.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
  })
  .catch((err) => console.log(`Database connection error: ${err.message}`));
