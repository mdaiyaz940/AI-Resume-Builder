// routes/resumeRoutes.js
import express from "express";
import {
  createResume,
  getResumeById,
  getUserResumes,
  deleteResumeById, // ✅ Import the delete controller function
} from "../controllers/resumeController.js";
import { saveResumeAnalysis } from "../controllers/analyzeController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/save-analysis", protect, saveResumeAnalysis);
// Protected route to save resume
router.post("/", protect, createResume);

// Get all resumes of the logged-in user
router.get("/user/all", protect, getUserResumes);

// Public route to fetch resume by ID
router.get("/:id", getResumeById);

// Protected route to delete resume by ID
router.delete("/:id", protect, deleteResumeById); // ✅ Add this DELETE route

export default router;