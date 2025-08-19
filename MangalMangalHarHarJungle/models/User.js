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
    match: /^[0-9]{10}$/   // ensures 10 digit number
  },
  pincode: {
    type: String,
    required: true,
    maxlength: 6,          // max 6 characters
    minlength: 6           // exactly 6
  }
});

const User = mongoose.model("User", userSchema);
module.exports = User;
