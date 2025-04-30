import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import resumeRoutes from "./routes/resumeRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";  // Import the aiRoutes

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/resume", resumeRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/ai", aiRoutes);  // Add this line to integrate AI routes

// MongoDB Connection
console.log("Attempting to connect to MongoDB...");
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
