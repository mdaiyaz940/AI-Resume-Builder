// aiRoutes.js
import express from "express";
import axios from "axios";
import { config } from "dotenv";

config();
const router = express.Router();

router.post("/generate", async (req, res) => {
  const { prompt, model } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: "Prompt is required." });
  }

  try {
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${model || 'gemini-1.5-flash'}:generateContent?key=${process.env.GEMINI_API_KEY}`;

    const response = await axios.post(
      apiUrl,
      {
        contents: [
          {
            role: "user",
            parts: [{ text: prompt }], // The backend receives the prompt as is
          },
        ],
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const output =
      response.data.candidates?.[0]?.content?.parts?.[0]?.text ||
      "❌ No response returned.";

    res.json({ output });
  } catch (error) {
    console.error("Gemini generation error:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to generate content." });
  }
});

export default router;