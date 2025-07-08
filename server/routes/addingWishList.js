const express = require("express");
const router = express.Router();
const User = require("../models/Users");
const Saree = require("../models/Products");

// Get wishlist with product details
router.get("/get/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).populate("wishlist");

    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });

    res.json({ success: true, wishlist: user.wishlist });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch wishlist" });
  }
});

// Add/Remove item from wishlist
router.post("/:userId", async (req, res) => {
  const { userId } = req.params;
  const { productId } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });

    const index = user.wishlist.indexOf(productId);
    if (index > -1) {
      user.wishlist.splice(index, 1);
    } else {
      user.wishlist.push(productId);
    }

    await user.save();
    const updatedUser = await User.findById(userId).populate("wishlist");

    res.json({ success: true, wishlist: updatedUser.wishlist });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to update wishlist" });
  }
});

router.delete("/:userId", async (req, res) => {
  const { userId } = req.params;
  const { productId } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });

    user.wishlist = user.wishlist.filter((id) => id.toString() !== productId);
    await user.save();

    const updatedUser = await User.findById(userId).populate("wishlist");
    res.json({ success: true, wishlist: updatedUser.wishlist });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to remove from wishlist" });
  }
});

module.exports = router;
