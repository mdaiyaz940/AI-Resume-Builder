import React from "react";
import { Briefcase, GraduationCap, Mail, MapPin, Phone, Star } from "lucide-react"; // Using Lucide Icons, similar style to Feather
import { FiUserPlus } from 'react-icons/fi'; // For potential use elsewhere if needed

export default function LandingPage({ onStart, onLogin }) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center py-16 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl w-full flex flex-col md:flex-row items-center justify-around gap-12 lg:gap-20">
        {/* Left Section - Hero */}
        <div className="md:w-1/2 text-center md:text-left">
        <h1 className="text-3xl lg:text-4xl font-semibold text-gray-800 mb-6 leading-tight">
            AI-Powered Resume Builder: Craft Your <span className="text-emerald-600">Perfect Resume</span>
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Build a standout resume fast with our intelligent AI tool.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <button
              onClick={onStart}
              className="w-full sm:w-auto bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-3 px-6 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-1 transition duration-300 ease-in-out flex items-center justify-center"
            >
              Get Started Now <FiUserPlus className="inline-block ml-2 align-middle" size={18} />
            </button>
            <button
              onClick={onLogin}
              className="w-full sm:w-auto bg-white hover:bg-gray-100 text-gray-700 font-semibold py-3 px-6 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-1 transition duration-300 ease-in-out"
            >
              Log In
            </button>
          </div>
        </div>

        {/* Right Section - Simple Resume Preview */}
        <div className="md:w-1/2 bg-white rounded-md shadow-md p-8 md:p-10 lg:p-12 border border-gray-200">
          <div className="mb-6 border-b pb-4">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">John Doe</h2>
            <h3 className="text-lg font-medium text-emerald-600 mb-3">Product Designer</h3>
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-center">
                <Mail className="w-4 h-4 mr-2 text-gray-500" />
                <span>john.doe@example.com</span>
              </div>
              <div className="flex items-center">
                <Phone className="w-4 h-4 mr-2 text-gray-500" />
                <span>(555) 123-4567</span>
              </div>
              <div className="flex items-center">
                <MapPin className="w-4 h-4 mr-2 text-gray-500" />
                <span>San Francisco, CA</span>
              </div>
            </div>
          </div>

          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-800 flex items-center mb-2">
              <Briefcase className="w-4 h-4 mr-2 text-gray-500" />
              <span className="ml-1">Experience</span>
            </h3>
            <ul className="list-disc pl-5 text-gray-600 text-sm leading-relaxed space-y-1">
              <li>
                <span className="font-semibold text-emerald-700">Senior UX Designer</span> at Design Co.
              </li>
              <li>
                <span className="font-semibold text-emerald-700">Product Designer</span> at Tech Startup.
              </li>
            </ul>
          </div>

          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-800 flex items-center mb-2">
              <GraduationCap className="w-4 h-4 mr-2 text-gray-500" />
              <span className="ml-1">Education</span>
            </h3>
            <ul className="list-disc pl-5 text-gray-600 text-sm leading-relaxed space-y-1">
              <li>
                <span className="font-semibold text-emerald-700">Bachelor of Design (B.Des)</span> - University of Design.
              </li>
            </ul>
          </div>

          <div className="skills-section">
            <h3 className="text-lg font-semibold text-gray-800 flex items-center mb-2">
              <Star className="w-4 h-4 mr-2 text-gray-500" />
              <span className="ml-1">Skills</span>
            </h3>
            <div className="flex flex-wrap gap-2 text-sm text-gray-600">
              <span className="inline-block bg-emerald-100 text-emerald-700 rounded-full px-3 py-1 font-medium mr-1 mb-1">UI/UX</span>
              <span className="inline-block bg-emerald-100 text-emerald-700 rounded-full px-3 py-1 font-medium mr-1 mb-1">Figma</span>
              <span className="inline-block bg-emerald-100 text-emerald-700 rounded-full px-3 py-1 font-medium mr-1 mb-1">Research</span>
              <span className="inline-block bg-emerald-100 text-emerald-700 rounded-full px-3 py-1 font-medium mr-1 mb-1">Prototyping</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}