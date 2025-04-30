// models/resumeModel.js
import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  summary: String,
  skills: String,
  experience: [
    {
      jobTitle: String,
      company: String,
      startDate: String,
      endDate: String,
      description: String,
    },
  ],
  education: [
    {
      institution: String,
      degree: String,
      startDate: String,
      endDate: String,
      description: String,
    },
  ],
  projects: [
    {
      title: String,
      description: String,
      technologies: String,
    },
  ],
  achievements: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
}, { timestamps: true });

const Resume = mongoose.model("Resume", resumeSchema);
export default Resume;