import express from "express";
import { registerUser, loginUser, getUserScore, updateUserScore } from "../controllers/authController.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

// Score APIs
router.post("/score", getUserScore);
router.put("/score", updateUserScore);

export default router;
