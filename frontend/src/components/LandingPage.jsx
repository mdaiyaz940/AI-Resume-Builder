import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Briefcase, GraduationCap, Mail, MapPin, Phone, Star,
  FileSearch, Zap, Target
} from "lucide-react";
import { FiUserPlus } from "react-icons/fi";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex flex-col items-center justify-center py-16 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl w-full flex flex-col md:flex-row items-center justify-around gap-12 lg:gap-20">
        {/* Left Section - Hero */}
        <div className="md:w-1/2 text-center md:text-left">
          <div className="mb-6">
            <h1 className="text-5xl lg:text-6xl font-extrabold text-gray-900 mb-4 leading-tight">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                ResuMate
              </span>
            </h1>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-6 leading-tight">
              Build & Analyze Resumes with <span className="text-emerald-600">AI Power</span>
            </h2>
          </div>

          <p className="text-lg text-gray-600 mb-8 leading-relaxed">
            Create stunning resumes and get AI-powered analysis to optimize your chances.
            Stand out from the crowd and land your dream job faster.
          </p>

          {/* Feature highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            {[
              { icon: <Zap className="w-4 h-4 text-blue-600" />, text: "AI Resume Builder", bg: "bg-blue-100" },
              { icon: <FileSearch className="w-4 h-4 text-purple-600" />, text: "Smart Analysis", bg: "bg-purple-100" },
              { icon: <Target className="w-4 h-4 text-emerald-600" />, text: "ATS Optimization", bg: "bg-emerald-100" },
              { icon: <Star className="w-4 h-4 text-orange-600" />, text: "Pro Templates", bg: "bg-orange-100" },
            ].map((item, i) => (
              <div key={i} className="flex items-center space-x-3 p-3 bg-white rounded-lg shadow-sm">
                <div className={`w-8 h-8 ${item.bg} rounded-lg flex items-center justify-center`}>
                  {item.icon}
                </div>
                <span className="text-sm font-medium text-gray-700">{item.text}</span>
              </div>
            ))}
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <button
              onClick={() => navigate("/signup")}
              className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-4 px-8 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300 ease-in-out flex items-center justify-center shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Get Started Free <FiUserPlus className="ml-2" size={18} />
            </button>
            <button
              onClick={() => navigate("/login")}
              className="w-full sm:w-auto bg-white hover:bg-gray-50 text-gray-700 font-semibold py-4 px-8 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300 ease-in-out shadow-md hover:shadow-lg"
            >
              Log In
            </button>
          </div>
        </div>

        {/* Right Section - Resume Preview */}
        <div className="md:w-1/2 relative">
          {/* Floating Badges */}
          <div className="absolute -top-4 -right-4 bg-gradient-to-r from-emerald-500 to-green-600 text-white px-4 py-2 rounded-xl shadow-lg z-10 transform rotate-3">
            <div className="flex items-center space-x-2">
              <FileSearch className="w-4 h-4" />
              <span className="font-semibold text-sm">AI Analyzed ✓</span>
            </div>
          </div>
          <div className="absolute -top-2 -left-4 bg-white border-2 border-blue-200 rounded-xl p-3 shadow-lg z-10">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">95%</div>
              <div className="text-xs text-gray-600 font-medium">ATS Score</div>
            </div>
          </div>

          {/* Preview Card */}
          <div className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 p-8 md:p-10 lg:p-12 border border-gray-100 transform hover:scale-[1.02]">
            <div className="mb-6 border-b pb-4">
              <h2 className="text-2xl font-bold text-gray-800 mb-1">Sarah Johnson</h2>
              <h3 className="text-lg font-medium text-blue-600 mb-3">Senior Product Manager</h3>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center"><Mail className="w-4 h-4 mr-2 text-gray-500" />sarah.johnson@email.com</div>
                <div className="flex items-center"><Phone className="w-4 h-4 mr-2 text-gray-500" />(555) 987-6543</div>
                <div className="flex items-center"><MapPin className="w-4 h-4 mr-2 text-gray-500" />New York, NY</div>
              </div>
            </div>

            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-800 flex items-center mb-2">
                <Briefcase className="w-4 h-4 mr-2 text-gray-500" />
                Experience
              </h3>
              <div className="space-y-2">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <span className="font-semibold text-blue-700">Senior Product Manager</span> at TechCorp
                  <div className="text-xs text-gray-600">Led cross-functional teams of 15+ members</div>
                </div>
                <div className="p-2 bg-purple-50 rounded-lg">
                  <span className="font-semibold text-purple-700">Product Manager</span> at StartupXYZ
                  <div className="text-xs text-gray-600">Increased user engagement by 40%</div>
                </div>
              </div>
            </div>

            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-800 flex items-center mb-2">
                <GraduationCap className="w-4 h-4 mr-2 text-gray-500" />
                Education
              </h3>
              <div className="p-2 bg-emerald-50 rounded-lg">
                <span className="font-semibold text-emerald-700 text-sm">MBA - Business University</span>
                <div className="text-xs text-gray-600">Magna Cum Laude</div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-800 flex items-center mb-2">
                <Star className="w-4 h-4 mr-2 text-gray-500" />
                Skills
              </h3>
              <div className="flex flex-wrap gap-2 text-sm">
                {[
                  { skill: "Product Strategy", color: "bg-blue-100 text-blue-700" },
                  { skill: "Data Analysis", color: "bg-purple-100 text-purple-700" },
                  { skill: "Team Leadership", color: "bg-emerald-100 text-emerald-700" },
                  { skill: "Agile/Scrum", color: "bg-orange-100 text-orange-700" },
                ].map((item, i) => (
                  <span key={i} className={`${item.color} px-3 py-1 rounded-full font-medium`}>
                    {item.skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-4 p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-100">
              <div className="flex items-center space-x-2">
                <Zap className="w-4 h-4 text-blue-600" />
                <span className="text-xs font-medium text-blue-700">
                  AI suggests adding 2 more keywords for better ATS compatibility
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom features section */}
      <div className="max-w-4xl w-full mt-16">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Why Choose ResuMate?</h3>
          <p className="text-gray-600">Your complete solution for resume building and optimization</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: "AI-Powered Builder", icon: <Zap className="w-6 h-6 text-blue-600" />, bg: "bg-blue-100" },
            { title: "Smart Analysis", icon: <FileSearch className="w-6 h-6 text-purple-600" />, bg: "bg-purple-100" },
            { title: "Job-Ready Output", icon: <Target className="w-6 h-6 text-emerald-600" />, bg: "bg-emerald-100" },
          ].map((item, i) => (
            <div key={i} className="text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className={`w-12 h-12 ${item.bg} rounded-lg flex items-center justify-center mx-auto mb-4`}>
                {item.icon}
              </div>
              <h4 className="font-semibold text-gray-800 mb-2">{item.title}</h4>
              <p className="text-sm text-gray-600">{
                item.title === "AI-Powered Builder" ? "Create professional resumes with intelligent suggestions and formatting" :
                item.title === "Smart Analysis" ? "Get detailed feedback and ATS compatibility scores instantly" :
                "Optimized resumes that pass ATS filters and impress recruiters"
              }</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
