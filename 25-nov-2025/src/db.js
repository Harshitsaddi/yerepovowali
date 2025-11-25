const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/mongooseDemo");
    console.log("📌 MongoDB Connected");
  } catch (err) {
    console.log("❌ DB Connection Error:", err.message);
  }
};

module.exports = connectDB;
