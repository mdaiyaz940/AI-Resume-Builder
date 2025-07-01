import express from "express";
import { getResumeStats } from "../controllers/statsController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, getResumeStats); // /api/stats

export default router;
