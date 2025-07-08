const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  products: [
    {
      product: {
        _id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        sareeId: { type: String },
        title: { type: String, required: true },
        price: { type: Number, required: true },
        image: { type: String },
      },
      quantity: { type: Number, required: true },
    },
  ],
  totalAmount: { type: Number, required: true },
  paymentMethod: { type: String, enum: ["RAZORPAY", "COD"], required: true },
  address: {
    name: { type: String, required: false },
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, default: "maharashtra" },
    pincode: { type: String, required: true },
  },
  paymentStatus: {
    type: String,
    enum: ["Pending", "Paid", "Failed"],
    default: "Pending",
  },
  adminVerified: { type: Boolean, default: false },

  orderStatus: {
    type: String,
    enum: ["Pending", "Confirmed", "Packed", "Shipped", "Delivered"],
    default: "Pending",
  },

  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Order", orderSchema);
