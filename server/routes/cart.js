const express = require("express");
const Cart = require("../models/Cart");
const router = express.Router();

router.get("/:userId", async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId }).populate(
      "items.productId"
    );
    if (!cart) return res.status(200).json({ items: [] });
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch cart" });
  }
});

router.post("/add", async (req, res) => {
  try {
    const { userId, productId, name, price, image, sareeId } = req.body;
    let cart = await Cart.findOne({ userId });

    console.log("this is sareeID", sareeId);
    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }

    const existingItem = cart.items.find(
      (item) => item.productId.toString() === productId
    );
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.items.push({ productId, sareeId, name, price, image, quantity: 1 });
    }
    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ error: "Failed to add to cart" });
    console.log(error);
  }
});

router.post("/update-quantity", async (req, res) => {
  const { userId, productId, quantity } = req.body;

  console.log(productId);

  try {
    await Cart.updateOne(
      { userId, "items.productId": productId },
      { $set: { "items.$.quantity": quantity } }
    );

    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: "Failed to update quantity" });
  }
});

router.post("/remove", async (req, res) => {
  try {
    const { userId, productId } = req.body;

    console.log(productId);

    const cart = await Cart.findOne({ userId });

    if (!cart) return res.status(404).json({ error: "Cart not found" });

    cart.items = cart.items.filter((item) => item._id.toString() !== productId);

    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ error: "Failed to remove from cart" });
  }
});

router.delete("/clear-cart/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    await Cart.deleteMany({ userId });

    res.json({ success: true, message: "Cart cleared successfully." });
  } catch (error) {
    res.status(500).json({ success: false, error: "Failed to clear cart." });
  }
});

module.exports = router;
