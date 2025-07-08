const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  userName: { type: String },
  text: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  images: [{ type: String }],
  videos: [{ type: String }],
  createdAt: { type: Date, default: Date.now },
});

const SareeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  sareeId: { type: String, required: true },
  description: { type: String },
  price: { type: Number },
  fabric: { type: String, required: true },
  category: { type: String, required: true },
  workType: { type: String, required: true },
  occasion: { type: String, required: true },
  color: { type: String },
  stock: { type: Number, required: true, default: 1 },
  images: [{ type: String }],
  ratings: { type: Number, default: 0 },
  reviews: [reviewSchema],
  featured: { type: Boolean, default: false },
  isBestSelled: { type: Boolean, default: false },
});

SareeSchema.index({
  name: "text",
  description: "text",
  category: "text",
  fabric: "text",
  workType: "text",
  occasion: "text",
  color: "text",
});

module.exports = mongoose.model("Saree", SareeSchema);
