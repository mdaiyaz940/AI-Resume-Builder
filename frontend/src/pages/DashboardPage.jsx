// src/pages/DashboardPage.jsx
import React from "react";
import { FileEdit, FileSearch, History, User, Info } from "lucide-react";
import { Link } from "react-router-dom";



export default function DashboardPage() {
  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-emerald-700 mb-3">👋 Welcome Back!</h1>
      <p className="text-gray-600 text-lg mb-8">
        Manage your resumes, analyze them, and track your improvements — all in one place.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Card 1: Build Resume */}
        <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition">
          <FileEdit className="text-emerald-600 mb-3" size={32} />
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Build Your Resume</h2>
          <p className="text-gray-600 text-sm mb-4">
            Use our smart editor to craft a professional resume with AI suggestions.
          </p>
          <Link to="/resume-builder" className="text-emerald-600 hover:underline font-medium">Start Building →</Link>
        </div>

        {/* Card 2: Analyze Resume */}
        <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition">
          <FileSearch className="text-blue-600 mb-3" size={32} />
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Analyze for ATS</h2>
          <p className="text-gray-600 text-sm mb-4">
            Upload your resume and see how it scores against job roles with AI-powered analysis.
          </p>
          <Link to="/resume-analyzer" className="text-blue-600 hover:underline font-medium">Analyze Now →</Link>
        </div>

        {/* Card 3: Resume History */}
        <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition">
          <History className="text-purple-600 mb-3" size={32} />
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Resume History</h2>
          <p className="text-gray-600 text-sm mb-4">
            View and manage your previously built and analyzed resumes.
          </p>
          <Link to="/resume-history" className="text-purple-600 hover:underline font-medium">View History →</Link>
        </div>

 {/* Card 5: About Page */}
        <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition">
          <Info className="text-teal-500 mb-3" size={32} />
          <h2 className="text-xl font-semibold text-gray-800 mb-2">About This App</h2>
          <p className="text-gray-600 text-sm mb-4">
            Learn about how this tool works and the technologies behind the scenes.
          </p>
          <Link to="/about" className="text-teal-500 hover:underline font-medium">Learn More →</Link>
        </div>
        {/* Card 4: Profile */}
        <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition">
          <User className="text-orange-500 mb-3" size={32} />
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Your Profile</h2>
          <p className="text-gray-600 text-sm mb-4">
            Update your personal info and see your usage stats.
          </p>
          <Link to="/profile" className="text-orange-500 hover:underline font-medium">Go to Profile →</Link>
        </div>

       
      </div>

      <div className="mt-12 text-center text-sm text-gray-400">
        Tip: Keep your resume up to date for better ATS results and improved opportunities.
      </div>
    </div>
  );
}
