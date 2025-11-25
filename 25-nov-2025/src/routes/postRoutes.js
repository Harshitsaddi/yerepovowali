const express = require("express");
const Post = require("../models/Post");
const redisClient = require("../redis");

const router = express.Router();

// GET all posts (with Redis Cache)
router.get("/", async (req, res) => {
  try {
    // Check if Redis is connected
    if (redisClient && redisClient.isOpen) {
      const cachedData = await redisClient.get("posts");

      if (cachedData) {
        return res.json({
          source: "redis cache",
          data: JSON.parse(cachedData)
        });
      }
    }

    // Fetch from MongoDB
    const posts = await Post.find();

    // If redis is available → store cache
    if (redisClient && redisClient.isOpen) {
      await redisClient.setEx("posts", 30, JSON.stringify(posts)); // cache for 30 sec
    }

    return res.json({
      source: "mongodb",
      data: posts
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// CREATE POST → clear redis cache
router.post("/", async (req, res) => {
  try {
    const newPost = await Post.create(req.body);

    if (redisClient && redisClient.isOpen) {
      await redisClient.del("posts");
    }

    res.status(201).json({
      message: "Post created",
      data: newPost
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
