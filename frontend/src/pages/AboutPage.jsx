// src/pages/AboutPage.jsx
import React from "react";

export default function AboutPage() {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-emerald-700 mb-4">About ResuMate</h1>

      <p className="text-gray-700 text-lg mb-6">
        <strong>ResuMate</strong> is your intelligent career companion — combining a powerful AI-powered resume builder with a deep ATS analyzer to help you stand out in today’s competitive job market. 
        Whether you're crafting a resume from scratch or optimizing it for a specific role, ResuMate delivers real-time, actionable feedback and beautifully designed templates tailored to your needs.
      </p>

      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-3">✨ Key Features</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>✍️ Build professional resumes step-by-step with smart AI suggestions</li>
          <li>📄 Upload and analyze existing resumes for ATS (Applicant Tracking System) compatibility</li>
          <li>📌 Get personalized improvement tips and keyword insights based on specific job roles</li>
          <li>📂 Save, manage, and revisit your resume history anytime</li>
          <li>🎨 Multiple modern, recruiter-friendly resume templates (template switching coming soon)</li>
        </ul>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-3">🛠️ Tech Stack</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li><strong>Frontend:</strong> React, Vite, Tailwind CSS</li>
          <li><strong>Backend:</strong> Node.js, Express, MongoDB</li>
          
          <li><strong>AI Integration:</strong> Google Gemini API</li>
          <li><strong>PDF Parsing:</strong> PDF.js</li>
        </ul>
      </div>

      <div className="text-gray-600 text-sm mt-6">
        🚀 Built with passion by <strong className="text-emerald-600">Md Aiyaz Ansari</strong> as a full-stack project to empower job seekers with AI and help them land their dream roles with standout, ATS-friendly resumes.
      </div>
    </div>
  );
}
