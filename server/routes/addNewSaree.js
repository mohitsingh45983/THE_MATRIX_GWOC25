const express = require("express");
const multer = require("multer");
const Saree = require("../models/Products");
const cloudinary = require("../config/cloudinary");

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Function to upload images to Cloudinary
const uploadToCloudinary = (fileBuffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: "sarees" },
      (error, result) => {
        if (error) reject(error);
        else resolve(result.secure_url);
      }
    );
    stream.end(fileBuffer);
  });
};

// ✅ *Add Saree Route*
router.post("/add-saree", upload.array("images", 4), async (req, res) => {
  try {
    const {
      name,
      sareeId,
      description,
      price,
      fabric,
      category,
      color,
      stock,
      workType,
      occasion,
      featured,
      bestSelling,
    } = req.body;

    const imageUploadPromises = req.files.map((file) =>
      uploadToCloudinary(file.buffer)
    );
    const imageUrls = await Promise.all(imageUploadPromises);

    const newSaree = new Saree({
      name,
      sareeId,
      description,
      price,
      fabric,
      category,
      color,
      stock,
      workType,
      occasion,
      featured: featured === "true",
      isBestSelled: bestSelling === "true",
      images: imageUrls,
    });

    await newSaree.save();
    res
      .status(201)
      .json({ message: "Saree added successfully!", success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error", success: false });
  }
});

router.put("/update-saree/:id", upload.array("images", 4), async (req, res) => {
  try {
    const sareeId = req.params.id;
    const updateData = req.body;

    if (req.files && req.files.length > 0) {
      const imageUploadPromises = req.files.map((file) =>
        uploadToCloudinary(file.buffer)
      );
      updateData.images = await Promise.all(imageUploadPromises);
    }

    if (updateData.featured !== undefined) {
      updateData.featured = updateData.featured === "true";
    }

    const updatedSaree = await Saree.findByIdAndUpdate(sareeId, updateData, {
      new: true,
    });

    if (!updatedSaree)
      return res.status(404).json({ message: "Saree not found" });

    res
      .status(200)
      .json({ message: "✅ Saree updated successfully!", updatedSaree });
  } catch (error) {
    console.error("Error updating saree:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/get-saree-data", async (req, res) => {
  try {
    const sarees = await Saree.find();
    res.json(sarees);
  } catch (error) {
    res.status(500).json({ message: "Error fetching sarees", error });
  }
});

router.delete("/deleteSaree/:id", async (req, res) => {
  try {
    const saree = await Saree.findByIdAndDelete(req.params.id);
    if (!saree) {
      return res.status(404).json({ message: "Saree not found" });
    }
    res.json({ message: "Saree deleted successfully", deletedSaree: saree });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

module.exports = router;
