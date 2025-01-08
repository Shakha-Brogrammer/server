const express = require("express");
const router = express.Router();
const Product = require("../models/products");
const upload = require("../multer");

router.get("/products", async (req, res) => {
  try {
    const produsts = await Product.find();
    res.status(200).json(produsts);
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

router.get("/products/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

router.post("/products", upload.single("image"), async (req, res) => {
  const product = new Product({
    name: req.body.name,
    price: req.body.price,
    image: req.file ? req.file.path : "",
    color: req.body.color,
    category: req.body.category,
  });

  try {
    const savedProduct = await product.save();
    res.status(201).json(savedProduct);
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

router.put("/products/:id", upload.single("image"), async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        price: req.body.price,
        image: req.file ? req.file.path : "",
        color: req.body.color,
        category: req.body.category,
      },
      { new: true }
    );
    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

router.delete("/products/:id", async (req, res) => {
  try {
    const removedProduct = await Product.findByIdAndDelete(req.params.id);
    res.status(200).json(removedProduct);
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

module.exports = router;
