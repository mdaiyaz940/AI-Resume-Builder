// In App.js
import { useEffect, useRef, useState } from "react";
import ResumeForm from "./components/ResumeForm";
import ResumePreview from "./components/ResumePreview";
import SignupForm from "./components/SignupForm";
import LoginForm from "./components/LoginForm";
import SavedResumes from "./components/SavedResumes";
import DownloadButton from "./components/DownloadButton";
import LandingPage from "./components/LandingPage";
import { MdExitToApp } from 'react-icons/md'; // Material Design Icons
import { FaListAlt, FaMagic, FaHammer } from 'react-icons/fa'; // Font Awesome Icons

// Removed custom CSS imports
// import './components/AuthLinks.css';
// import './styles.css';

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

export default function App() {
  const [user, setUser] = useState(null);
  const [authMode, setAuthMode] = useState("login");
  const [showLanding, setShowLanding] = useState(true); // NEW
  const [resumeData, setResumeData] = useState({
    name: "",
    email: "",
    phone: "",
    summary: "",
    experience: [], // Changed to an array of objects - CORRECTED INITIAL STATE
    education: [],   // Changed to an array of objects - CORRECTED INITIAL STATE
    projects: [],    // Changed to an array of objects - CORRECTED INITIAL STATE
    skills: "",
    achievements: "",
  });
  const [errors, setErrors] = useState({});
  const [selectedTemplate, setSelectedTemplate] = useState("simple");
  const [prompt, setPrompt] = useState(""); // Prompt for AI generation
  const [generatedText, setGeneratedText] = useState(""); // AI result
  const [loading, setLoading] = useState(false); // Loading state for AI generation
  const resumeRef = useRef();
  const [savedResumes, setSavedResumes] = useState([]); // State to hold the list of saved resumes

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .get("http://localhost:5000/api/auth/profile", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => setUser(res.data.user))
        .catch(() => localStorage.removeItem("token"));
    }
  }, []);

  useEffect(() => {
    const fetchResumes = async () => {
      const token = localStorage.getItem("token");
      if (token && user) {
        try {
          const res = await axios.get("http://localhost:5000/api/resume/user/all", {
            headers: { Authorization: `Bearer ${token}` },
          });
          setSavedResumes(res.data); // Update the savedResumes state
        } catch (error) {
          console.error("Error fetching saved resumes:", error);
          toast.error("❌ Failed to load saved resumes list");
        }
      }
    };

    // Only fetch resumes if the user is logged in initially
    if (user) {
      fetchResumes();
    }
  }, [user]); // Re-fetch when user changes (e.g., login/logout)


  const handleAuthSuccess = (loggedInUser) => {
    setUser(loggedInUser);
    // Assuming the parent component handling state passes the correct structure
    // when a user logs in or signs up and wants to start with a blank form.
    // If loading an existing resume on login, update this logic.
    setResumeData({ // Reset form on successful login/signup
      name: "",
      email: "",
      phone: "",
      summary: "",
      experience: [],
      education: [],
      projects: [],
      skills: "",
      achievements: "",
    });
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setSavedResumes([]); // Clear saved resumes on logout
    setResumeData({ // Clear current form data on logout
      name: "",
      email: "",
      phone: "",
      summary: "",
      experience: [],
      education: [],
      projects: [],
      skills: "",
      achievements: "",
    });
  };




  const handleChange = (e) => {
    const { name, value } = e.target;
    // Check if the name corresponds to a nested array update (handled in ResumeForm)
    // Or a top-level field update (handled here)
    // ResumeForm's handleSectionItemChange calls this handleChange with the full array value,
    // so the simple spread logic works for both cases.
    setResumeData({ ...resumeData, [name]: value });
  };

  const handlePromptChange = (e) => {
    setPrompt(e.target.value);
  };

  const validateForm = () => {
    // Basic validation for core fields before download
    const requiredFields = ["name", "email"]; // Phone might be optional
    const newErrors = {};
    let isValid = true;

    requiredFields.forEach((field) => {
      if (!resumeData[field] || !resumeData[field].trim()) {
        newErrors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
        isValid = false;
      }
    });

    // Add checks for nested sections if they exist and have content
    const sectionsToCheck = ['experience', 'education', 'projects'];
    sectionsToCheck.forEach(sectionName => {
      const sectionArray = resumeData[sectionName];
      if (Array.isArray(sectionArray) && sectionArray.length > 0) {
        sectionArray.forEach((item, index) => {
          // Example: Check if key fields in nested items are present
          let keyField = '';
          if (sectionName === 'experience') keyField = 'jobTitle';
          else if (sectionName === 'education') keyField = 'institution';
          else if (sectionName === 'projects') keyField = 'title';

          if (keyField && (!item[keyField] || !item[keyField].trim())) {
            if (!newErrors[sectionName]) newErrors[sectionName] = [];
            newErrors[sectionName][index] = `${keyField} is required for ${sectionName} item ${index + 1}`;
            isValid = false;
          }
        });
      }
    });


    setErrors(newErrors);
    return isValid;
  };

  const handleGenerateAI = async () => {
    if (!prompt || loading) {
      if (!prompt) toast.info("Please enter a prompt for AI generation.");
      return;
    }

    setLoading(true);
    setGeneratedText("");
    try {
      const res = await axios.post("http://localhost:5000/api/ai/generate", {
        prompt: prompt, // Send the raw user prompt
        model: "gemini-1.5-flash", // Or your preferred model
      });
      // Assuming the AI response is text that the user might copy into fields
      setGeneratedText(res.data.output.trim());
    } catch (error) {
      console.error("Error generating AI content:", error.response?.data || error.message);
      toast.error("❌ Failed to generate AI content.");
    } finally {
      setLoading(false);
    }
  };


  const loadResume = async (resumeId) => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const res = await axios.get(`http://localhost:5000/api/resume/${resumeId}`, { // Corrected endpoint based on your routes
          headers: { Authorization: `Bearer ${token}` },
        });
        // Ensure arrays are actually arrays when loading
        const loadedData = {
          ...res.data,
          experience: Array.isArray(res.data.experience) ? res.data.experience : [],
          education: Array.isArray(res.data.education) ? res.data.education : [],
          projects: Array.isArray(res.data.projects) ? res.data.projects : [],
          // Ensure string fields are not null/undefined if backend sends them that way
          name: res.data.name || "",
          email: res.data.email || "",
          phone: res.data.phone || "",
          summary: res.data.summary || "",
          skills: res.data.skills || "",
          achievements: res.data.achievements || "",
        };
        console.log("Loaded resume data:", loadedData);
        setResumeData(loadedData);
        toast.success("✅ Resume loaded successfully!");
        // Optionally, scroll to the form
        window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to top of the page
      } catch (error) {
        console.error("Error loading resume:", error.response?.data || error.message);
        toast.error("❌ Failed to load resume");
      }
    }
  };

  const deleteResume = async (resumeId) => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        await axios.delete(`http://localhost:5000/api/resume/${resumeId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success("✅ Resume deleted successfully!");
        // Update the local state in App.js by filtering out the deleted resume
        setSavedResumes(savedResumes.filter((resume) => resume._id !== resumeId));
      } catch (error) {
        console.error("Error deleting resume:", error.response?.data || error.message);
        toast.error("❌ Failed to delete resume");
      }
    }
  };
  // Function to re-fetch resumes - used as onSave prop for ResumeForm
  const fetchResumes = async () => {
    const token = localStorage.getItem("token");
    if (token && user) {
      try {
        const res = await axios.get("http://localhost:5000/api/resume/user/all", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSavedResumes(res.data); // Update the savedResumes state
      } catch (error) {
        console.error("Error fetching saved resumes:", error.response?.data || error.message);
        toast.error("❌ Failed to load saved resumes list");
      }
    }
  };



  return (
    // Main container styles
    <div className="w-[90vw] max-w-[1200px] mx-auto p-5 md:p-8"> {/* Applied .container styles */}
      <ToastContainer position="top-center" autoClose={3000} />

      {showLanding ? (
        <LandingPage
          onStart={() => {
            setShowLanding(false);
            setAuthMode("signup"); // default to signup on Get Started
          }}
          onLogin={() => {
            setShowLanding(false);
            setAuthMode("login");
          }}
        />
      ) : !user ? (
        authMode === "signup" ? (
          <>
            <SignupForm onSignupSuccess={handleAuthSuccess} />
            {/* Applied .link-to-login-container styles */}
            <p className="text-center mt-5 text-sm text-gray-600">
              Already have an account?{" "}
              {/* Applied .link-to-login-button styles */}
              <button
                onClick={() => setAuthMode("login")}
                className="text-green-600 border border-gray-300 rounded-lg px-3 py-1.5 font-medium transition-colors duration-200 cursor-pointer bg-transparent hover:bg-green-50 hover:border-green-400 hover:text-green-700"
              >
                Log in
              </button>
            </p>
          </>
        ) : (
          <>
            <LoginForm onLoginSuccess={handleAuthSuccess} />
            {/* Applied .signup-link-container styles */}
            <p className="text-center mt-5 text-sm text-gray-600">
              Don’t have an account?{" "}
              {/* Applied .signup-button-link styles */}
              <button
                onClick={() => setAuthMode("signup")}
                className="text-green-600 border border-gray-300 rounded-lg px-3 py-1.5 font-medium transition-colors duration-200 cursor-pointer bg-transparent hover:bg-green-50 hover:border-green-400 hover:text-green-700"
              >
                Sign up
              </button>
            </p>
          </>
        )
      ) : (
        <>
          {/* Applied .welcome-logout-container styles */}
          <div className="flex justify-between items-center mb-4">
            {/* Applied .welcome-heading styles */}
            <h2 className="text-[1.55rem] font-bold text-green-700">
              Welcome, {user.name}!
            </h2>
            {/* Applied .logout-button styles */}
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-500 text-white rounded cursor-pointer transition-colors duration-200 hover:bg-red-600 flex items-center" // Added flex for centering icon
            >
               <MdExitToApp className="inline-block mr-1 align-middle" size={20} /> Logout
            </button>
          </div>

          {/* Resume Template Selection - Applied .template-selection styles (spacing) */}
          <div className="mb-6">
            {/* Applied .template-selection-label styles */}
            <label className="block mb-2 text-gray-700 font-medium flex items-center">
            <FaListAlt className="inline-block mr-2 align-middle" size={18} />Select Resume Template:</label>
            {/* Applied .template-selection-select styles */}
            <select
              className="w-full rounded-md border border-gray-300 p-2 text-base text-gray-800 focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-300/50"
              value={selectedTemplate}
              onChange={(e) => setSelectedTemplate(e.target.value)}
            >
              <option value="simple">Simple</option>
              <option value="modern">Modern</option>
              <option value="classic">Classic</option>
            </select>
          </div>

          {/* AI Model Prompt - Applied .ai-prompt styles (spacing) */}
          <div className="mb-5">
            {/* Applied .ai-prompt-label styles */}
            <label className="block mb-2 text-gray-700 font-medium flex items-center">
            <FaMagic className="inline-block mr-2 align-middle" size={18} /> Enter AI Prompt:</label>
            {/* Applied .ai-prompt-textarea styles */}
            <textarea
              className="w-full rounded-md border border-gray-300 p-3 text-sm md:text-base text-gray-800 transition duration-200 ease-in-out focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-300/50 placeholder-gray-400"
              value={prompt}
              onChange={handlePromptChange}
              placeholder="Enter details for your resume or ask the AI for help..."
              rows={4} // Added rows attribute back
            ></textarea>
          </div>

          {/* Generate Button - Applied .generate-button-container styles */}
          <div className="mt-6 text-center">
            {/* Applied .generate-button styles */}
            <button
              onClick={handleGenerateAI}
              className="px-6 py-3 text-base bg-blue-500 text-white rounded cursor-pointer transition-colors duration-200 hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center"
              disabled={loading}
            >
              <FaMagic className="inline-block mr-2 align-middle" size={18} />
              {loading ? "Generating..." : "Generate AI Content"}
            </button>
          </div>

          {/* Generated AI Text - Applied .generated-text-container styles */}
          {generatedText && (
            <div className="p-5 mt-6 border border-dashed border-gray-300 bg-gray-50 rounded">
              {/* Applied .generated-text-title styles */}
              <h3 className="text-lg font-bold text-gray-800 mb-2">AI Resume Suggestions:</h3>
              {/* Applied .generated-text-output styles */}
              <p className="text-sm text-gray-700 whitespace-pre-wrap break-words">{generatedText}</p>
            </div>
          )}

          {/* Section containing the form and preview - Renamed from .2-container */}
          <div className="mt-8"> {/* Applied .2-container style */}
            {/* Applied .form-info-container styles */}
            <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded">
              {/* Applied .form-section-title styles */}
              <h2 className="text-xl font-bold text-blue-700 mb-2 flex items-center">
                <FaHammer className="inline-block mr-2 align-middle" size={20} /> Let's Build Your Resume
              </h2>
              {/* Applied .form-section-description styles */}
              <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                Create a professional resume that highlights your strengths and gets you noticed!
              </p>
            </div>
            <ResumeForm
              resumeData={resumeData}
              handleChange={handleChange}
              errors={errors}
              onSave={fetchResumes} // Pass the fetchResumes function as a prop
            />
            {/* Applied .form-preview-info-separator styles */}
            <div className="flex flex-col items-center gap-2 py-6 border-t border-b border-gray-300 my-8 bg-gray-50 rounded">
              {/* Applied .preview-section-title styles */}
              <h3 className="text-xl font-bold text-teal-700 mb-0">Resume Preview</h3>
              {/* Applied .preview-section-description styles */}
              <p className="text-base text-teal-800 text-center">See how your information will appear.</p>
            </div>
            <div> {/* Wrapper around preview and download - add spacing? mb-8 */}
              <ResumePreview
                resumeData={resumeData}
                resumeRef={resumeRef}
                selectedTemplate={selectedTemplate}
              />
              <DownloadButton
                resumeRef={resumeRef}
                resumeData={resumeData}
                validateForm={validateForm}
              />
            </div>
          </div>
          {/* Note: SavedResumes component also uses custom CSS classes like .saved-resumes-container, .saved-resumes-title, etc. */}
          {/* You will need to similarly convert the styles within SavedResumes.jsx */}
          <SavedResumes savedResumes={savedResumes}  onLoadResume={loadResume} onDeleteResume={deleteResume} />
        </>
      )}
    </div>
  );
}