const express = require("express");
const router = express.Router();
const User = require("../models/User");

// POST - Create user
router.post("/add", async (req, res) => {
  try {
    const { name, address, phone, pincode } = req.body;

    const newUser = new User({ name, address, phone, pincode });
    await newUser.save();

    res.status(201).json({ message: "User added successfully!", user: newUser });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET - Fetch all users
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
