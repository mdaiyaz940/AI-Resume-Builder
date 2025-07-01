import Resume from "../models/Resume.js";

export const getResumeStats = async (req, res) => {
  try {
    const userId = req.user._id;

    const totalResumes = await Resume.countDocuments({ user: userId });
    const analyzedResumes = await Resume.countDocuments({ user: userId, analyzed: true });

    res.json({ totalResumes, analyzedResumes });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch stats", error: err.message });
  }
};
