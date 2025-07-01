import React from "react";
import axios from "axios";
import { toast } from "react-toastify";
import LiveSuggestionInput from "./LiveSuggestionInput";
import { 
  Save, 
  Plus, 
  Trash2, 
  ChevronDown,
  ChevronUp,
  Briefcase,
  GraduationCap,
  Code2,
  Award,
  Phone,
  Mail,
  User
} from "lucide-react";

export default function ResumeForm({ resumeData = {}, handleChange, errors = {}, onSave, validateForm  }) {
  const saveResume = async () => {
    const isValid = validateForm ? validateForm() : true;
  if (!isValid) {
    toast.error("❌ Please fix form errors before saving.");
    return;
  }
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/resume`,
        resumeData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("✅ Resume saved! ID: " + response.data.id);
      onSave?.();
    } catch (err) {
      toast.error("❌ Failed to save resume");
    }
  };

  const handleAddSectionItem = (sectionName, newItem) => {
    handleChange({
      target: {
        name: sectionName,
        value: [...(resumeData[sectionName] || []), newItem],
      },
    });
  };

  const handleRemoveSectionItem = (sectionName, index) => {
    const newSection = [...(resumeData[sectionName] || [])];
    newSection.splice(index, 1);
    handleChange({ target: { name: sectionName, value: newSection } });
  };

  const handleSectionItemChange = (sectionName, index, field) => (e) => {
    const { value } = e.target;
    const newSection = [...(resumeData[sectionName] || [])];
    if (newSection[index]) {
      newSection[index] = { ...newSection[index], [field]: value };
      handleChange({ target: { name: sectionName, value: newSection } });
    }
  };

  // Section handlers
  const handleAddExperience = () => handleAddSectionItem('experience', { jobTitle: "", company: "", startDate: "", endDate: "", description: "" });
  const handleAddEducation = () => handleAddSectionItem('education', { institution: "", degree: "", startDate: "", endDate: "", description: "" });
  const handleAddProject = () => handleAddSectionItem('projects', { title: "", description: "", technologies: "" });

  const handleRemoveExperience = (index) => handleRemoveSectionItem('experience', index);
  const handleRemoveEducation = (index) => handleRemoveSectionItem('education', index);
  const handleRemoveProject = (index) => handleRemoveSectionItem('projects', index);

  const handleExperienceChange = (index, field) => handleSectionItemChange('experience', index, field);
  const handleEducationChange = (index, field) => handleSectionItemChange('education', index, field);
  const handleProjectChange = (index, field) => handleSectionItemChange('projects', index, field);

  // State for collapsible sections
  const [expandedSections, setExpandedSections] = React.useState({
    personal: true,
    summary: true,
    skills: true,
    experience: true,
    education: true,
    projects: true,
    achievements: true
  });

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  return (
    <div className="mx-auto w-full max-w-4xl rounded-lg bg-white p-4 shadow-md md:p-6">
      <h2 className="mb-6 text-center text-2xl font-bold text-blue-600 md:text-3xl">
        Resume Builder
      </h2>

      {/* Personal Information */}
      <div className="mb-6 rounded-lg border border-gray-200 bg-gray-50 p-4">
        <div 
          className="flex cursor-pointer items-center justify-between"
          onClick={() => toggleSection('personal')}
        >
          <h3 className="flex items-center text-lg font-semibold text-gray-700">
            <User className="mr-2 h-5 w-5" />
            Personal Information
          </h3>
          {expandedSections.personal ? <ChevronUp /> : <ChevronDown />}
        </div>
        
        {expandedSections.personal && (
          <div className="mt-4 space-y-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-600">Full Name</label>
              <input
                type="text"
                name="name"
                value={resumeData.name || ""}
                onChange={handleChange}
                className="w-full rounded-md border border-gray-300 p-2.5 text-sm text-gray-800 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-300/50 md:text-base"
              />
              {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-600">Email</label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  name="email"
                  value={resumeData.email || ""}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-300 py-2.5 pl-10 pr-3 text-sm text-gray-800 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-300/50 md:text-base"
                />
              </div>
              {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-600">Phone</label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <Phone className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="tel"
                  name="phone"
                  value={resumeData.phone || ""}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-300 py-2.5 pl-10 pr-3 text-sm text-gray-800 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-300/50 md:text-base"
                />
              </div>
              {errors.phone && <p className="mt-1 text-xs text-red-500">{errors.phone}</p>}
            </div>
          </div>
        )}
      </div>

      {/* Summary */}
      <div className="mb-6 rounded-lg border border-gray-200 bg-gray-50 p-4">
        <div 
          className="flex cursor-pointer items-center justify-between"
          onClick={() => toggleSection('summary')}
        >
          <h3 className="flex items-center text-lg font-semibold text-gray-700">
            Summary
          </h3>
          {expandedSections.summary ? <ChevronUp /> : <ChevronDown />}
        </div>
        
        {expandedSections.summary && (
          <div className="mt-4">
            <LiveSuggestionInput
              name="summary"
              value={resumeData.summary || ""}
              onChange={handleChange}
              model="gemini-1.5-flash"
              textareaClassName="w-full rounded-md border border-gray-300 p-3 text-sm text-gray-800 transition duration-200 ease-in-out focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-300/50 placeholder-gray-400 md:text-base"
              rows={4}
            />
            {errors.summary && <p className="mt-1 text-xs text-red-500">{errors.summary}</p>}
          </div>
        )}
      </div>

      {/* Skills */}
      <div className="mb-6 rounded-lg border border-gray-200 bg-gray-50 p-4">
        <div 
          className="flex cursor-pointer items-center justify-between"
          onClick={() => toggleSection('skills')}
        >
          <h3 className="flex items-center text-lg font-semibold text-gray-700">
            Skills
          </h3>
          {expandedSections.skills ? <ChevronUp /> : <ChevronDown />}
        </div>
        
        {expandedSections.skills && (
          <div className="mt-4">
            <LiveSuggestionInput
              name="skills"
              value={resumeData.skills || ""}
              onChange={handleChange}
              model="gemini-1.5-flash"
              textareaClassName="w-full rounded-md border border-gray-300 p-3 text-sm text-gray-800 transition duration-200 ease-in-out focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-300/50 placeholder-gray-400 md:text-base"
              rows={4}
            />
            {errors.skills && <p className="mt-1 text-xs text-red-500">{errors.skills}</p>}
          </div>
        )}
      </div>

      {/* Experience */}
      <div className="mb-6 rounded-lg border border-gray-200 bg-gray-50 p-4">
        <div 
          className="flex cursor-pointer items-center justify-between"
          onClick={() => toggleSection('experience')}
        >
          <h3 className="flex items-center text-lg font-semibold text-gray-700">
            <Briefcase className="mr-2 h-5 w-5" />
            Experience
          </h3>
          {expandedSections.experience ? <ChevronUp /> : <ChevronDown />}
        </div>
        
        {expandedSections.experience && (
          <div className="mt-4 space-y-4">
            {(resumeData.experience || []).map((exp, index) => (
              <div key={`exp-${index}`} className="rounded-lg border border-gray-200 bg-white p-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-md font-medium text-gray-700">Experience #{index + 1}</h4>
                  <button
                    type="button"
                    onClick={() => handleRemoveExperience(index)}
                    className="flex items-center rounded-md bg-red-50 px-3 py-1.5 text-sm text-red-600 hover:bg-red-100"
                  >
                    <Trash2 className="mr-1 h-4 w-4" /> Remove
                  </button>
                </div>

                <div className="mt-3 grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-600">Job Title</label>
                    <input
                      type="text"
                      value={exp.jobTitle || ""}
                      onChange={handleExperienceChange(index, 'jobTitle')}
                      className="w-full rounded-md border border-gray-300 p-2 text-sm text-gray-800 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-300/50"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-600">Company</label>
                    <input
                      type="text"
                      value={exp.company || ""}
                      onChange={handleExperienceChange(index, 'company')}
                      className="w-full rounded-md border border-gray-300 p-2 text-sm text-gray-800 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-300/50"
                    />
                  </div>
                </div>

                <div className="mt-3 grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-600">Start Date</label>
                    <input
                      type="text"
                      value={exp.startDate || ""}
                      onChange={handleExperienceChange(index, 'startDate')}
                      className="w-full rounded-md border border-gray-300 p-2 text-sm text-gray-800 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-300/50"
                      placeholder="MM/YYYY"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-600">End Date</label>
                    <input
                      type="text"
                      value={exp.endDate || ""}
                      onChange={handleExperienceChange(index, 'endDate')}
                      className="w-full rounded-md border border-gray-300 p-2 text-sm text-gray-800 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-300/50"
                      placeholder="MM/YYYY or Present"
                    />
                  </div>
                </div>

                <div className="mt-3">
                  <label className="mb-1 block text-sm font-medium text-gray-600">Description</label>
                  <LiveSuggestionInput
                    name={`experience[${index}].description`}
                    value={exp.description || ""}
                    onChange={handleExperienceChange(index, 'description')}
                    model="gemini-1.5-flash"
                    textareaClassName="w-full rounded-md border border-gray-300 p-2 text-sm text-gray-800 transition duration-200 ease-in-out focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-300/50 placeholder-gray-400"
                    rows={3}
                  />
                </div>
              </div>
            ))}

            <button
              type="button"
              onClick={handleAddExperience}
              className="flex w-full items-center justify-center rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            >
              <Plus className="mr-2 h-4 w-4" /> Add Experience
            </button>
          </div>
        )}
      </div>

      {/* Education */}
      <div className="mb-6 rounded-lg border border-gray-200 bg-gray-50 p-4">
        <div 
          className="flex cursor-pointer items-center justify-between"
          onClick={() => toggleSection('education')}
        >
          <h3 className="flex items-center text-lg font-semibold text-gray-700">
            <GraduationCap className="mr-2 h-5 w-5" />
            Education
          </h3>
          {expandedSections.education ? <ChevronUp /> : <ChevronDown />}
        </div>
        
        {expandedSections.education && (
          <div className="mt-4 space-y-4">
            {(resumeData.education || []).map((edu, index) => (
              <div key={`edu-${index}`} className="rounded-lg border border-gray-200 bg-white p-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-md font-medium text-gray-700">Education #{index + 1}</h4>
                  <button
                    type="button"
                    onClick={() => handleRemoveEducation(index)}
                    className="flex items-center rounded-md bg-red-50 px-3 py-1.5 text-sm text-red-600 hover:bg-red-100"
                  >
                    <Trash2 className="mr-1 h-4 w-4" /> Remove
                  </button>
                </div>

                <div className="mt-3 grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-600">Institution</label>
                    <input
                      type="text"
                      value={edu.institution || ""}
                      onChange={handleEducationChange(index, 'institution')}
                      className="w-full rounded-md border border-gray-300 p-2 text-sm text-gray-800 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-300/50"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-600">Degree</label>
                    <input
                      type="text"
                      value={edu.degree || ""}
                      onChange={handleEducationChange(index, 'degree')}
                      className="w-full rounded-md border border-gray-300 p-2 text-sm text-gray-800 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-300/50"
                    />
                  </div>
                </div>

                <div className="mt-3 grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-600">Start Date</label>
                    <input
                      type="text"
                      value={edu.startDate || ""}
                      onChange={handleEducationChange(index, 'startDate')}
                      className="w-full rounded-md border border-gray-300 p-2 text-sm text-gray-800 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-300/50"
                      placeholder="MM/YYYY"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-600">End Date</label>
                    <input
                      type="text"
                      value={edu.endDate || ""}
                      onChange={handleEducationChange(index, 'endDate')}
                      className="w-full rounded-md border border-gray-300 p-2 text-sm text-gray-800 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-300/50"
                      placeholder="MM/YYYY"
                    />
                  </div>
                </div>

                <div className="mt-3">
                  <label className="mb-1 block text-sm font-medium text-gray-600">Description</label>
                  <LiveSuggestionInput
                    name={`education[${index}].description`}
                    value={edu.description || ""}
                    onChange={handleEducationChange(index, 'description')}
                    model="gemini-1.5-flash"
                    textareaClassName="w-full rounded-md border border-gray-300 p-2 text-sm text-gray-800 transition duration-200 ease-in-out focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-300/50 placeholder-gray-400"
                    rows={3}
                  />
                </div>
              </div>
            ))}

            <button
              type="button"
              onClick={handleAddEducation}
              className="flex w-full items-center justify-center rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            >
              <Plus className="mr-2 h-4 w-4" /> Add Education
            </button>
          </div>
        )}
      </div>

      {/* Projects */}
      <div className="mb-6 rounded-lg border border-gray-200 bg-gray-50 p-4">
        <div 
          className="flex cursor-pointer items-center justify-between"
          onClick={() => toggleSection('projects')}
        >
          <h3 className="flex items-center text-lg font-semibold text-gray-700">
            <Code2 className="mr-2 h-5 w-5" />
            Projects
          </h3>
          {expandedSections.projects ? <ChevronUp /> : <ChevronDown />}
        </div>
        
        {expandedSections.projects && (
          <div className="mt-4 space-y-4">
            {(resumeData.projects || []).map((project, index) => (
              <div key={`proj-${index}`} className="rounded-lg border border-gray-200 bg-white p-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-md font-medium text-gray-700">Project #{index + 1}</h4>
                  <button
                    type="button"
                    onClick={() => handleRemoveProject(index)}
                    className="flex items-center rounded-md bg-red-50 px-3 py-1.5 text-sm text-red-600 hover:bg-red-100"
                  >
                    <Trash2 className="mr-1 h-4 w-4" /> Remove
                  </button>
                </div>

                <div className="mt-3">
                  <label className="mb-1 block text-sm font-medium text-gray-600">Title</label>
                  <input
                    type="text"
                    value={project.title || ""}
                    onChange={handleProjectChange(index, 'title')}
                    className="w-full rounded-md border border-gray-300 p-2 text-sm text-gray-800 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-300/50"
                  />
                </div>

                <div className="mt-3">
                  <label className="mb-1 block text-sm font-medium text-gray-600">Description</label>
                  <LiveSuggestionInput
                    name={`projects[${index}].description`}
                    value={project.description || ""}
                    onChange={handleProjectChange(index, 'description')}
                    model="gemini-1.5-flash"
                    textareaClassName="w-full rounded-md border border-gray-300 p-2 text-sm text-gray-800 transition duration-200 ease-in-out focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-300/50 placeholder-gray-400"
                    rows={3}
                  />
                </div>

                <div className="mt-3">
                  <label className="mb-1 block text-sm font-medium text-gray-600">Technologies Used</label>
                  <input
                    type="text"
                    value={project.technologies || ""}
                    onChange={handleProjectChange(index, 'technologies')}
                    className="w-full rounded-md border border-gray-300 p-2 text-sm text-gray-800 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-300/50"
                  />
                </div>
              </div>
            ))}

            <button
              type="button"
              onClick={handleAddProject}
              className="flex w-full items-center justify-center rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            >
              <Plus className="mr-2 h-4 w-4" /> Add Project
            </button>
          </div>
        )}
      </div>

      {/* Achievements */}
      <div className="mb-6 rounded-lg border border-gray-200 bg-gray-50 p-4">
        <div 
          className="flex cursor-pointer items-center justify-between"
          onClick={() => toggleSection('achievements')}
        >
          <h3 className="flex items-center text-lg font-semibold text-gray-700">
            <Award className="mr-2 h-5 w-5" />
            Achievements
          </h3>
          {expandedSections.achievements ? <ChevronUp /> : <ChevronDown />}
        </div>
        
        {expandedSections.achievements && (
          <div className="mt-4">
            <LiveSuggestionInput
              name="achievements"
              value={resumeData.achievements || ""}
              onChange={handleChange}
              model="gemini-1.5-flash"
              textareaClassName="w-full rounded-md border border-gray-300 p-3 text-sm text-gray-800 transition duration-200 ease-in-out focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-300/50 placeholder-gray-400 md:text-base"
              rows={4}
            />
            {errors.achievements && <p className="mt-1 text-xs text-red-500">{errors.achievements}</p>}
          </div>
        )}
      </div>

      {/* Save Button */}
      <div className="mt-6 text-center">
        <button
          onClick={saveResume}
          className="inline-flex items-center rounded-md bg-blue-600 px-6 py-3 text-base font-medium text-white shadow-sm transition duration-200 ease-in-out hover:bg-blue-700 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          <Save className="mr-2 h-5 w-5" /> Save Resume
        </button>
      </div>
    </div>
  );
}