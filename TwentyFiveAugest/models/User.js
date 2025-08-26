import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },

    score: {
    type: Number,
    default: 0, // starts with 0
  },
});

export default mongoose.model("User", userSchema);
