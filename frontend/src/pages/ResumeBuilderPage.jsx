// src/pages/ResumeBuilderPage.jsx
import React, { useRef, useState } from "react";
import ResumeForm from "../components/ResumeForm";
import ResumePreview from "../components/ResumePreview";
import DownloadButton from "../components/DownloadButton";
import axios from "axios";
import { toast } from "react-toastify";
import {
  FileEdit,
  Eye,
  Palette,
} from "lucide-react"; // Icons from lucide-react

export default function ResumeBuilderPage() {
  const [resumeData, setResumeData] = useState({
    name: "",
    email: "",
    phone: "",
    summary: "",
    skills: "",
    experience: [],
    education: [],
    projects: [],
    achievements: "",
  });

  const [errors, setErrors] = useState({});
  const [selectedTemplate, setSelectedTemplate] = useState("simple");
  const resumeRef = useRef(null);

  // Handle field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setResumeData((prev) => ({ ...prev, [name]: value }));
  };

  // Validate form before saving/downloading
  const validateForm = () => {
    const newErrors = {};
    if (!resumeData.name.trim()) newErrors.name = "Name is required.";
    if (!resumeData.email.trim()) newErrors.email = "Email is required.";
    if (!resumeData.phone.trim()) newErrors.phone = "Phone is required.";
    if (!resumeData.summary.trim()) newErrors.summary = "Summary is required.";
    if (!resumeData.skills.trim()) newErrors.skills = "Skills are required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Save resume to DB
  const saveResumeToDB = async () => {
    if (!validateForm()) {
      toast.error("Please fix form errors before saving.");
      return;
    }
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/resume`,
        resumeData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success(`✅ Resume saved! ID: ${response.data.id}`);
    } catch (err) {
      toast.error("❌ Failed to save resume to database.");
    }
  };

  return (
    <div className="flex flex-col p-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2 text-emerald-700">
          <FileEdit size={24} />
          <h2 className="text-2xl font-bold">Build Your Resume</h2>
        </div>

        {/* Template Selector */}
        <div className="flex items-center gap-2">
          <Palette size={18} className="text-gray-500" />
          <select
            value={selectedTemplate}
            onChange={(e) => setSelectedTemplate(e.target.value)}
            className="rounded border border-gray-300 px-3 py-1 text-sm focus:outline-none focus:ring-emerald-500"
          >
            <option value="simple">Simple</option>
            <option value="modern">Modern</option>
            <option value="classic">Classic</option>
          </select>
        </div>
      </div>

      {/* Resume Form */}
      <ResumeForm
        resumeData={resumeData}
        handleChange={handleChange}
        errors={errors}
        onSave={saveResumeToDB}
        validateForm={validateForm}
      />

      {/* Resume Preview */}
      <div className="mt-10">
        <div className="flex items-center gap-2 mb-3 text-gray-800">
          <Eye size={20} />
          <h3 className="text-xl font-semibold">Live Resume Preview</h3>
        </div>

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
  );
}
