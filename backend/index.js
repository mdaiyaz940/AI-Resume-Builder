// backend/index.js
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import resumeRoutes from "./routes/resumeRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import aiRoutes from "./routes/aiRoutes.js"; // Import the aiRoutes
import analyzeRoutes from "./routes/analyzeRoutes.js";
import statsRoutes from "./routes/statsRoutes.js";
import cors from 'cors';

dotenv.config();

const app = express();
app.use(express.json({ limit: '10mb' })); // or more if needed
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));

// Manual CORS middleware
app.use((req, res, next) => {
  const allowedOrigins = ['https://ai-resume-builder-sand-nu.vercel.app','https://ai-resume-builder-sand-nu.vercel.app/', 'http://localhost:5173'];
  const origin = req.headers.origin;

  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }

  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true');

  if (req.method === 'OPTIONS') {
    return res.sendStatus(204); // Respond to preflight requests
  }

  next();
});

// Routes
app.use("/api/resume", resumeRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/ai", aiRoutes); // Add this line to integrate AI routes
app.use("/api/analyze", analyzeRoutes);
app.use("/api/stats", statsRoutes); // ✅ New route

// MongoDB Connection

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));
console.log("Starting the server...");

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});

export default app;