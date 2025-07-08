const express = require("express");
const router = express.Router();
const Product = require("../models/Products");
const multer = require("multer");
const User = require("../models/Users");
const Products = require("../models/Products");
const cloudinary = require("cloudinary").v2;

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEYS,
  api_secret: process.env.API_SECRET,
});
const upload = multer({ dest: "uploads/" });

// Route to add a review with media uploads to Cloudinary
router.post(
  "/products/:productId/reviews/:userId",
  upload.array("media", 10),
  async (req, res) => {
    const { productId, userId } = req.params;
    const { text, rating } = req.body;
    const mediaFiles = req.files;

    try {
      const user = await User.findById(userId);
      const userName = user.name;

      const product = await Product.findById(productId);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      const uploadMedia = async (file) => {
        const result = await cloudinary.uploader.upload(file.path, {
          resource_type: file.mimetype.startsWith("video") ? "video" : "image",
        });
        return result.secure_url;
      };

      const mediaUrls = await Promise.all(
        mediaFiles.map(async (file) => {
          return await uploadMedia(file);
        })
      );

      const images = mediaUrls.filter((url) => url.includes("/image/upload/"));
      const videos = mediaUrls.filter((url) => url.includes("/video/upload/"));

      const newReview = {
        user: userId,
        userName: userName,
        text,
        rating,
        images,
        videos,
      };

      // Add the review to the product
      product.reviews.push(newReview);
      await product.save();

      // Respond with the new review
      res.status(201).json(newReview);
    } catch (error) {
      console.error("Error adding review:", error);
      res.status(500).json({ message: "Error adding review", error });
    }
  }
);

router.get("/products/:productId/reviews", async (req, res) => {
  const { productId } = req.params;

  try {
    const product = await Product.findById(productId).select("reviews");

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(product.reviews);
  } catch (error) {
    console.error("Error fetching reviews:", error);
    res.status(500).json({ message: "Error fetching reviews", error });
  }
});

router.put("/edit-review/:sareeId/:reviewId", async (req, res) => {
  try {
    const { sareeId, reviewId } = req.params;

    console.log(req.params);
    const { text, rating, images, videos } = req.body;

    console.log(req.body);

    const saree = await Products.findById(sareeId);
    if (!saree) return res.status(404).json({ error: "Saree not found." });

    const review = saree.reviews.id(reviewId);
    if (!review) return res.status(404).json({ error: "Review not found." });

    review.text = text || review.text;
    review.rating = rating || review.rating;
    review.images = images || review.images;
    review.videos = videos || review.videos;

    await saree.save();
    res.status(200).json({ message: "Review updated successfully.", review });
  } catch (error) {
    res.status(500).json({ error: "Failed to update review." });
  }
});

router.delete("/delete-review/:sareeId/:reviewId", async (req, res) => {
  try {
    const { sareeId, reviewId } = req.params;

    console.log(req.params);

    const saree = await Products.findById(sareeId);

    console.log(saree);
    if (!saree) return res.status(404).json({ error: "Saree not found." });

    saree.reviews = saree.reviews.filter(
      (review) => review._id.toString() !== reviewId
    );
    await saree.save();
    res.status(200).json({ message: "Review deleted successfully." });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete review." });
  }
});

module.exports = router;
