const express = require("express");
const mongoose = require("mongoose");
const Product = require("../models/Products"); // Assuming you have a Product model
const router = express.Router();

// Route to fetch paginated products (with optional category filter)
router.get("/getProducts", async (req, res) => {
  try {
    let { page = 1, limit = 5, category, occasion } = req.query;
    page = parseInt(page);
    limit = parseInt(limit);

    let filter = {};
    if (category) {
      filter.category = category;
    }
    if (occasion) {
      filter.occasion = occasion;
    }

    const products = await Product.find(filter)
      .skip((page - 1) * limit)
      .limit(limit);

    const totalProducts = await Product.countDocuments(filter); // Total products in DB (filtered)

    res.json({
      success: true,
      products,
      totalProducts,
      totalPages: Math.ceil(totalProducts / limit),
      currentPage: page,
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// Route to fetch a product by ID
router.get("/get-details/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) return res.status(404).json({ message: "Product not found" });

    res.json(product);
  } catch (error) {
    console.error("Error fetching product details:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

router.get("/products/latest", async (req, res) => {
  try {
    const latestProducts = await Product.find()
      .sort({ createdAt: -1 })
      .limit(5);
    res.json(latestProducts);
  } catch (error) {
    res.status(500).json({ message: "Error fetching latest products", error });
  }
});

router.get("/similar/:productId", async (req, res) => {
  try {
    const productId = req.params.productId;
    const currentProduct = await Product.findById(productId);

    if (!currentProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    const similarProducts = await Product.find({
      category: currentProduct.category,
      _id: { $ne: productId },
    }).limit(5);

    res.json(similarProducts);
  } catch (error) {
    res.status(500).json({ message: "Error fetching similar products", error });
  }
});

router.get("/products/best-seller", async (req, res) => {
  try {
    const bestSelling = await Product.find({ isBestSelled: true })
      .sort({ createdAt: -1 })
      .limit(5);
    console.log(bestSelling);
    res.json(bestSelling);
  } catch (err) {
    console.log(err);
  }
});

const dayWeddingColors = [
  "yellow",
  "orange",
  "pink",
  "red",
  "peach",
  "light green",
  "cream",
  "light blue",
  "baby pink",
  "sky blue",
  "beige",
  "gold",
  "light purple",
  "rose gold",
  "turquoise",
  "lemon yellow",
  "mint green",
];

const nightWeddingColors = [
  "blue",
  "navy",
  "purple",
  "maroon",
  "black",
  "dark green",
  "bronze",
  "silver",
  "wine",
  "deep red",
  "royal blue",
  "charcoal grey",
  "midnight blue",
  "burgundy",
  "violet",
  "deep plum",
];

const dayWeddingFabrics = [
  "cotton",
  "chiffon",
  "georgette",
  "silk blend",
  "organza",
  "linen",
  "net",
  "soft silk",
  "mul cotton",
  "handloom",
  "cotton silk",
  "tissue",
  "rayon",
];

const nightWeddingFabrics = [
  "velvet",
  "pure silk",
  "brocade",
  "satin",
  "heavy silk",
  "jacquard",
  "raw silk",
  "banarasi silk",
  "crepe",
  "tussar silk",
  "heavy organza",
  "kanjeevaram silk",
];

const matchSareesByCriteria = (saree, colorsArray, fabricsArray) => {
  const sareeColors = saree.color.toLowerCase().split(/\s+and\s+|\s*,\s*/);

  const colorMatch = sareeColors.some((color) => colorsArray.includes(color));

  const fabricMatch = fabricsArray.includes(saree.fabric.toLowerCase());

  return colorMatch || fabricMatch;
};

router.get("/sarees/day-wedding", async (req, res) => {
  try {
    const sarees = await Product.find({});
    const filteredSarees = sarees.filter((saree) =>
      matchSareesByCriteria(saree, dayWeddingColors, dayWeddingFabrics)
    );
    res.status(200).json(filteredSarees);
  } catch (error) {
    console.error("Error fetching day wedding sarees:", error);
    res.status(500).json({ error: error.message });
  }
});

router.get("/sarees/night-wedding", async (req, res) => {
  try {
    const sarees = await Product.find({});
    const filteredSarees = sarees.filter((saree) =>
      matchSareesByCriteria(saree, nightWeddingColors, nightWeddingFabrics)
    );
    res.status(200).json(filteredSarees);
  } catch (error) {
    console.error("Error fetching night wedding sarees:", error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
