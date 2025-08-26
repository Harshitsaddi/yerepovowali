import User from "../models/User.js";
import bcrypt from "bcryptjs";

// REGISTER
export const registerUser = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      fullName,
      email,
      password: hashedPassword,
      score: 0, // initialize score
    });

    res.status(201).json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// LOGIN
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    res.status(200).json({ message: "Login successful", user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET USER SCORE
export const getUserScore = async (req, res) => {
  try {
    const { email } = req.body; // find user by email
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ score: user.score });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE SCORE
export const updateUserScore = async (req, res) => {
  try {
    const { email, score } = req.body;

    const user = await User.findOneAndUpdate(
      { email },
      { $set: { score } },
      { new: true }
    );

    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ message: "Score updated successfully", score: user.score });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
