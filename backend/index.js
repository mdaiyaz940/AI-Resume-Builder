// backend/index.js
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import resumeRoutes from "./routes/resumeRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";
import analyzeRoutes from "./routes/analyzeRoutes.js";
import statsRoutes from "./routes/statsRoutes.js";
import cors from 'cors';

dotenv.config();

const app = express();
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// ✅ FIXED: Use only one CORS configuration
const allowedOrigins = [
  "http://localhost:5173",
  "https://ai-resume-builder-sand-nu.vercel.app",
  "https://ai-resume-builder-dtcle4fgh-md-aiyaz-ansaris-projects.vercel.app"
];

app.use(cors({
  origin: function (origin, callback) {
    console.log("Origin:", origin);
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// ❌ REMOVED: Manual CORS middleware (this was conflicting)

// Routes
app.use("/api/resume", resumeRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/analyze", analyzeRoutes);
app.use("/api/stats", statsRoutes);

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