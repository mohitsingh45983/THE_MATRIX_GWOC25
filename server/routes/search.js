const express = require("express");
const router = express.Router();
const Saree = require("../models/Products");

// router.get("/search", async (req, res) => {
//   try {
//     const searchQuery = req.query.search;

//     console.log(searchQuery)
//     if (!searchQuery) {
//       return res.status(400).json({ message: "Search query is required" });
//     }

//     const results = await Saree.find(
//       {
//         $or: [
//           { $text: { $search: searchQuery } },
//           { name: { $regex: searchQuery, $options: "i" } },
//           { description: { $regex: searchQuery, $options: "i" } },
//           { category: { $regex: searchQuery, $options: "i" } },
//           { fabric: { $regex: searchQuery, $options: "i" } },
//           { workType: { $regex: searchQuery, $options: "i" } },
//           { occasion: { $regex: searchQuery, $options: "i" } },
//           { color: { $regex: searchQuery, $options: "i" } }
//         ]
//       },
//       { score: { $meta: "textScore" } }
//     )
//     .sort({ score: { $meta: "textScore" } }) // Sort by relevance
//     .limit(10);

//     console.log(results)

//     res.json(results);

//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server Error" });
//   }
// });

router.get("/search", async (req, res) => {
  try {
    const { search } = req.query;

    console.log(search);

    if (!search) {
      return res.status(400).json({ message: "Search query is required" });
    }

    const results = await Saree.find({
      $text: { $search: search },
    });

    res.json(results);
    console.log(results);
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
});

module.exports = router;
