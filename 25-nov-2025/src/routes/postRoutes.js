const express = require("express");
const Post = require("../models/Post");
const router = express.Router();

// GET all posts
router.get("/", async (req, res) => {
  const posts = await Post.find();
  res.json({
    source: "database",
    data: posts
  });
});

// CREATE post
router.post("/", async (req, res) => {
  const post = await Post.create(req.body);
  res.status(201).json({
    message: "Post Created",
    data: post
  });
});

module.exports = router;
