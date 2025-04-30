// resumeController.js
import Resume from "../models/Resume.js";

// Save resume to DB (linked to user)
export const createResume = async (req, res) => {
  try {
    const resume = new Resume({
      ...req.body,
      user: req.user._id,  // ✅ This links resume to the logged-in user
    });

    const saved = await resume.save();
    res.status(201).json({ id: saved._id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to save resume" });
  }
};

// Get resume by ID
export const getResumeById = async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id);
    if (!resume) return res.status(404).json({ message: "Resume not found" });
    res.json(resume);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch resume", error: err.message });
  }
};

// Get all resumes of the logged-in user
export const getUserResumes = async (req, res) => {
  try {
    const resumes = await Resume.find({ user: req.user._id });
    res.json(resumes);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch user resumes", error: err.message });
  }
};
// Delete resume by ID (protected)
export const deleteResumeById = async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id);
    if (!resume) {
      return res.status(404).json({ message: "Resume not found" });
    }

    // Ensure the user deleting the resume is the owner
    if (resume.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized to delete this resume" });
    }

    await Resume.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Resume deleted successfully" });
  } catch (err) {
    console.error("Error deleting resume:", err);
    res.status(500).json({ message: "Failed to delete resume", error: err.message });
  }
};


