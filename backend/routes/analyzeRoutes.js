// File: routes/analyzeRoutes.js
import express from "express";
import { analyzeResume } from "../controllers/analyzeController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/resume", protect, analyzeResume);

export default router;
