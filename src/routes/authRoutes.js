import express from "express";
import { registerUser, loginUser, logoutUser, getMe } from "../controllers/authController.js";
import { verifyToken, checkRole } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public routes
router.post("/register", registerUser);
router.post("/login", loginUser);

// Protected routes
router.get("/me", verifyToken, getMe);  // User info after login
router.post("/logout", verifyToken, logoutUser);

export default router;
