const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const User = require("../models/user");

router.post("/register", async (req, res) => {
  const { password, username, name } = req.body;

  try {
    const existUser = await User.findOne({ username });
    if (existUser) return res.status(400).json({ message: "User is existing" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUserData = {
      ...req.body,
      password: hashedPassword,
    };

    const newUser = new User(newUserData);
    const savedUser = await newUser.save();

    res.status(200).json(savedUser);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

module.exports = router;
