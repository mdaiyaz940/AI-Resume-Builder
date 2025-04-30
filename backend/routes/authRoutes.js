// routes/authRoutes.js
import express from "express";
import { protect } from "../middleware/authMiddleware.js";

import { registerUser, loginUser } from "../controllers/authController.js";

const router = express.Router();

// POST /api/auth/register
router.post("/register", registerUser);

// POST /api/auth/login
router.post("/login", loginUser);
// GET /api/auth/profile → Returns logged-in user info
router.get("/profile", protect, (req, res) => res.json({ user: req.user }));

export default router;
