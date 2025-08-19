const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  address: {
    type: String,
    required: true,
    trim: true
  },
  phone: {
    type: String,
    required: true,
    match: /^[0-9]{10}$/   // Ensures 10 digit number
  },
  pincode: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 6           // Exactly 6 characters
  }
});

const User = mongoose.model("User", userSchema);
module.exports = User;
