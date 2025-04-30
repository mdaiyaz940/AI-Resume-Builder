import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import resumeRoutes from "./routes/resumeRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";

dotenv.config();

const app = express();
app.use(express.json());

// Configure CORS
const corsOptions = {
  origin: 'https://ai-resume-builder-sand-nu.vercel.app', // Only allow requests from your frontend's origin
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, // Allow sending cookies across origins (if needed)
  allowedHeaders: 'Content-Type, Authorization', // Specify allowed headers
};

app.use(cors(corsOptions));

// Routes
app.use("/api/resume", resumeRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/ai", aiRoutes);

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB connected"))
.catch((err) => console.error("❌ MongoDB connection error:", err));

// Start server (not strictly needed for Vercel, but good for local)
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});

module.exports = app;