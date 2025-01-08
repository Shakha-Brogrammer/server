const express = require("express");
const Category = require("../models/categories");
const router = express.Router();
const upload = require("../multer");

router.get("/categories", async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

router.get("/categories/:id", async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    res.status(200).json(category);
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

router.post("/categories", upload.single("image"), async (req, res) => {
  const category = new Category({
    name: req.body.name,
    image: req.file ? req.file.path : "",
  });

  try {
    const savedCategory = await category.save();
    res.status(201).json(savedCategory);
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

router.put("/categories/:id", upload.single("image"), async (req, res) => {
  try {
    const updatedCategory = await Category.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        image: req.file ? req.file.path : "",
      },
      { new: true }
    );
    res.status(200).json(updatedCategory);
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

router.delete("/categories/:id", async (req, res) => {
  try {
    const removedCategory = await Category.findByIdAndDelete(req.params.id);
    res.status(200).json(removedCategory);
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

module.exports = router;
