// backend/controllers/analyzeController.js
import axios from "axios";
import Resume from "../models/Resume.js";

export const analyzeResume = async (req, res) => {
  const { resumeText, jobRole } = req.body;

  if (!resumeText || !jobRole) {
    return res.status(400).json({ error: "Resume text and job role are required" });
  }

  const prompt = `
You are an expert ATS (Applicant Tracking System) analyst.

Please analyze the resume below for the role of "${jobRole}". Use ONLY the following format in your response:

---
**ATS Score:** X/100

**Improvement Suggestions:**
- First improvement
- Second improvement
- Third improvement

**Essential Keywords:**
1. Keyword1
2. Keyword2
3. Keyword3
4. Keyword4
5. Keyword5
---

Only use these section headers **exactly** as written. Do not include any additional explanation or sections. Resume below:

${resumeText}
`;

  try {
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`;

    const response = await axios.post(apiUrl, {
      contents: [
        {
          role: "user",
          parts: [{ text: prompt }],
        },
      ],
    });

    const output = response.data.candidates?.[0]?.content?.parts?.[0]?.text || "❌ No analysis returned.";
    // console.log("[Gemini] AI Output Preview:\n", output.slice(0, 200));

    res.json({ output });

    await Resume.create({
      summary: resumeText,
      user: req.user._id,
      analyzed: true,
    });
  } catch (error) {
    console.error("Gemini analysis error:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to analyze resume." });
  }
};