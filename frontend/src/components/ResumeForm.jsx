// ResumeForm.jsx
import React from "react";
import axios from "axios";
import { AiOutlineSave } from 'react-icons/ai'; // Import the save icon
import { toast } from "react-toastify";
import LiveSuggestionInput from "./LiveSuggestionInput"; // Assuming this is already Tailwind-compatible or doesn't need conversion here

// Removed: import "./styles.css"; // Import the consolidated CSS

export default function ResumeForm({ resumeData, handleChange, errors, onSave }) {
  const saveResume = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:5000/api/resume",
        resumeData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("✅ Resume saved! ID: " + response.data.id);
      if (onSave) {
        onSave(); // Call the onSave function (which is fetchResumes from App.js)
      }
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
    const { value } = e.target; // Use value from event directly
    const newSection = [...(resumeData[sectionName] || [])];
    // Ensure the item exists before updating
    if (newSection[index]) {
        newSection[index] = { ...newSection[index], [field]: value };
        handleChange({ target: { name: sectionName, value: newSection } });
    }
  };

  // Specific add handlers
  const handleAddExperience = () => handleAddSectionItem('experience', { jobTitle: "", company: "", startDate: "", endDate: "", description: "" });
  const handleAddEducation = () => handleAddSectionItem('education', { institution: "", degree: "", startDate: "", endDate: "", description: "" });
  const handleAddProject = () => handleAddSectionItem('projects', { title: "", description: "", technologies: "" });

  // Specific remove handlers
  const handleRemoveExperience = (index) => handleRemoveSectionItem('experience', index);
  const handleRemoveEducation = (index) => handleRemoveSectionItem('education', index);
  const handleRemoveProject = (index) => handleRemoveSectionItem('projects', index);

  // Specific change handlers (simplified)
  const handleExperienceChange = (index, field) => handleSectionItemChange('experience', index, field);
  const handleEducationChange = (index, field) => handleSectionItemChange('education', index, field);
  const handleProjectChange = (index, field) => handleSectionItemChange('projects', index, field);


  return (
    <div className="mx-auto my-8 w-[95%] max-w-3xl rounded-xl bg-white p-8 shadow-md max-lg:w-full max-lg:p-6 max-lg:my-6">
      <h2 className="mb-6 text-center text-3xl font-bold text-blue-500 max-lg:text-2xl">Resume Input</h2>

      {/* Name */}
      <div className="mb-5">
        <label className="mb-2 block text-base font-medium text-gray-600">Full Name</label>
        <input
          type="text"
          name="name"
          value={resumeData.name || ""} // Controlled component should have value
          onChange={handleChange}
          className="w-full rounded-md border border-gray-300 p-3 text-base text-gray-800 transition duration-200 ease-in-out focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-300/50"
        />
        {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
      </div>

      {/* Email */}
      <div className="mb-5">
        <label className="mb-2 block text-base font-medium text-gray-600">Email</label>
        <input
          type="email"
          name="email"
          value={resumeData.email || ""}
          onChange={handleChange}
           className="w-full rounded-md border border-gray-300 p-3 text-base text-gray-800 transition duration-200 ease-in-out focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-300/50"
        />
        {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
      </div>

      {/* Phone */}
      <div className="mb-5">
        <label className="mb-2 block text-base font-medium text-gray-600">Phone</label>
        <input
          type="tel"
          name="phone"
          value={resumeData.phone || ""}
          onChange={handleChange}
          className="w-full rounded-md border border-gray-300 p-3 text-base text-gray-800 transition duration-200 ease-in-out focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-300/50"
        />
        {errors.phone && <p className="mt-1 text-sm text-red-500">{errors.phone}</p>}
      </div>

      {/* Summary */}
       <div className="mb-5">
         <label className="mb-2 block text-base font-medium text-gray-600">Professional Summary</label>
         <LiveSuggestionInput
           name="summary"
           value={resumeData.summary || ""}
           onChange={handleChange} // Pass the parent handler directly
           model="gemini-1.5-flash" // Example model
           textareaClassName="w-full rounded-md border border-gray-300 p-3 text-base text-gray-800 transition duration-200 ease-in-out focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-300/50 placeholder-gray-400 max-lg:text-[0.95rem]" // Pass Tailwind classes for textarea
           rows={4} // Standard attribute
         />
         {errors.summary && <p className="mt-1 text-sm text-red-500">{errors.summary}</p>}
       </div>


       {/* Skills */}
        <div className="mb-5">
          <label className="mb-2 block text-base font-medium text-gray-600">Skills (comma-separated)</label>
           <LiveSuggestionInput
             name="skills"
             value={resumeData.skills || ""}
             onChange={handleChange} // Pass the parent handler directly
             model="gemini-1.5-flash" // Example model
             textareaClassName="w-full rounded-md border border-gray-300 p-3 text-base text-gray-800 transition duration-200 ease-in-out focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-300/50 placeholder-gray-400 max-lg:text-[0.95rem]"
             rows={4}
           />
          {errors.skills && <p className="mt-1 text-sm text-red-500">{errors.skills}</p>}
        </div>

      {/* --- Experience Section --- */}
      <div className="mb-5">
        <label className="mb-2 block text-base font-medium text-gray-600">Experience</label>
        {(resumeData.experience || []).map((exp, index) => (
          <div key={`exp-${index}`} className="mb-4 rounded-lg border border-gray-200 bg-gray-50 p-4 max-lg:p-3">
            <h3 className="mb-3 text-xl font-semibold text-gray-600 max-lg:text-lg">Experience {index + 1}</h3>
            {/* Job Title */}
            <div className="mb-5">
              <label className="mb-2 block text-base font-medium text-gray-600">Job Title</label>
              <input
                type="text"
                name={`experience[${index}].jobTitle`} // Keep name for potential direct handling if needed elsewhere
                value={exp.jobTitle || ""}
                onChange={handleExperienceChange(index, 'jobTitle')} // Use specific handler
                className="w-full rounded-md border border-gray-300 p-3 text-base text-gray-800 transition duration-200 ease-in-out focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-300/50 max-lg:text-[0.95rem]"
              />
            </div>
            {/* Company */}
            <div className="mb-5">
                <label className="mb-2 block text-base font-medium text-gray-600">Company</label>
                <input
                    type="text"
                    name={`experience[${index}].company`}
                    value={exp.company || ""}
                    onChange={handleExperienceChange(index, 'company')}
                     className="w-full rounded-md border border-gray-300 p-3 text-base text-gray-800 transition duration-200 ease-in-out focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-300/50 max-lg:text-[0.95rem]"
                />
            </div>
            {/* Dates */}
            <div className="mb-5 flex flex-wrap gap-4">
              <div className="flex-1 min-w-[150px]"> {/* Ensure inputs don't get too small */}
                <label className="mb-2 block text-base font-medium text-gray-600">Start Date</label>
                <input
                  type="text"
                  name={`experience[${index}].startDate`}
                  value={exp.startDate || ""}
                  onChange={handleExperienceChange(index, 'startDate')}
                  className="w-full rounded-md border border-gray-300 p-3 text-base text-gray-800 transition duration-200 ease-in-out focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-300/50 max-lg:text-[0.95rem]"
                  placeholder="e.g., Jan 2022"
                />
              </div>
              <div className="flex-1 min-w-[150px]">
                <label className="mb-2 block text-base font-medium text-gray-600">End Date</label>
                <input
                  type="text"
                  name={`experience[${index}].endDate`}
                  value={exp.endDate || ""}
                  onChange={handleExperienceChange(index, 'endDate')}
                  className="w-full rounded-md border border-gray-300 p-3 text-base text-gray-800 transition duration-200 ease-in-out focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-300/50 max-lg:text-[0.95rem]"
                  placeholder="e.g., Present or Dec 2023"
                />
              </div>
            </div>
            {/* Description */}
             <div className="mb-5">
               <label className="mb-2 block text-base font-medium text-gray-600">Description</label>
               <LiveSuggestionInput
                 name={`experience[${index}].description`} // Keep unique name
                 value={exp.description || ""}
                 onChange={handleExperienceChange(index, 'description')} // Use specific handler
                 model="gemini-1.5-flash"
                 textareaClassName="w-full rounded-md border border-gray-300 p-3 text-base text-gray-800 transition duration-200 ease-in-out focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-300/50 placeholder-gray-400 max-lg:text-[0.95rem]"
                 rows={4}
               />
             </div>
            {/* Remove Button */}
            <button
              type="button"
              onClick={() => handleRemoveExperience(index)}
              className="rounded-md border-none bg-red-500 px-4 py-2.5 text-sm text-white transition duration-200 ease-in-out hover:scale-105 hover:bg-red-600 max-lg:px-3 max-lg:py-2 max-lg:text-[0.8rem]"
            >
              Remove
            </button>
          </div>
        ))}
        {/* Add Button */}
        <button
          type="button"
          onClick={handleAddExperience}
          className="mt-4 rounded-md border-none bg-green-500 px-5 py-3 text-base text-white transition duration-200 ease-in-out hover:scale-105 hover:bg-green-700 max-lg:px-4 max-lg:py-2 max-lg:text-[0.9rem]"
        >
          Add Experience
        </button>
      </div>

      {/* --- Education Section --- (Similar structure as Experience) --- */}
      <div className="mb-5">
          <label className="mb-2 block text-base font-medium text-gray-600">Education</label>
          {(resumeData.education || []).map((edu, index) => (
              <div key={`edu-${index}`} className="mb-4 rounded-lg border border-gray-200 bg-gray-50 p-4 max-lg:p-3">
                  <h3 className="mb-3 text-xl font-semibold text-gray-600 max-lg:text-lg">Education {index + 1}</h3>
                  {/* Institution */}
                  <div className="mb-5">
                      <label className="mb-2 block text-base font-medium text-gray-600">Institution</label>
                      <input
                          type="text"
                          name={`education[${index}].institution`}
                          value={edu.institution || ""}
                          onChange={handleEducationChange(index, 'institution')}
                          className="w-full rounded-md border border-gray-300 p-3 text-base text-gray-800 transition duration-200 ease-in-out focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-300/50 max-lg:text-[0.95rem]"
                      />
                  </div>
                  {/* Degree */}
                  <div className="mb-5">
                      <label className="mb-2 block text-base font-medium text-gray-600">Degree</label>
                      <input
                          type="text"
                          name={`education[${index}].degree`}
                          value={edu.degree || ""}
                          onChange={handleEducationChange(index, 'degree')}
                           className="w-full rounded-md border border-gray-300 p-3 text-base text-gray-800 transition duration-200 ease-in-out focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-300/50 max-lg:text-[0.95rem]"
                      />
                  </div>
                  {/* Dates */}
                  <div className="mb-5 flex flex-wrap gap-4">
                      <div className="flex-1 min-w-[150px]">
                          <label className="mb-2 block text-base font-medium text-gray-600">Start Date</label>
                          <input
                              type="text"
                              name={`education[${index}].startDate`}
                              value={edu.startDate || ""}
                              onChange={handleEducationChange(index, 'startDate')}
                              className="w-full rounded-md border border-gray-300 p-3 text-base text-gray-800 transition duration-200 ease-in-out focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-300/50 max-lg:text-[0.95rem]"
                              placeholder="e.g., Sep 2018"
                          />
                      </div>
                      <div className="flex-1 min-w-[150px]">
                          <label className="mb-2 block text-base font-medium text-gray-600">End Date</label>
                          <input
                              type="text"
                              name={`education[${index}].endDate`}
                              value={edu.endDate || ""}
                              onChange={handleEducationChange(index, 'endDate')}
                               className="w-full rounded-md border border-gray-300 p-3 text-base text-gray-800 transition duration-200 ease-in-out focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-300/50 max-lg:text-[0.95rem]"
                              placeholder="e.g., May 2022"
                          />
                      </div>
                  </div>
                   {/* Description */}
                    <div className="mb-5">
                      <label className="mb-2 block text-base font-medium text-gray-600">Description</label>
                      <LiveSuggestionInput
                        name={`education[${index}].description`}
                        value={edu.description || ""}
                        onChange={handleEducationChange(index, 'description')}
                        model="gemini-1.5-flash"
                         textareaClassName="w-full rounded-md border border-gray-300 p-3 text-base text-gray-800 transition duration-200 ease-in-out focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-300/50 placeholder-gray-400 max-lg:text-[0.95rem]"
                        rows={4}
                      />
                    </div>
                  {/* Remove Button */}
                  <button
                      type="button"
                      onClick={() => handleRemoveEducation(index)}
                      className="rounded-md border-none bg-red-500 px-4 py-2.5 text-sm text-white transition duration-200 ease-in-out hover:scale-105 hover:bg-red-600 max-lg:px-3 max-lg:py-2 max-lg:text-[0.8rem]"
                  >
                      Remove
                  </button>
              </div>
          ))}
          {/* Add Button */}
          <button
              type="button"
              onClick={handleAddEducation}
               className="mt-4 rounded-md border-none bg-green-500 px-5 py-3 text-base text-white transition duration-200 ease-in-out hover:scale-105 hover:bg-green-700 max-lg:px-4 max-lg:py-2 max-lg:text-[0.9rem]"
          >
              Add Education
          </button>
      </div>

      {/* --- Projects Section --- (Similar structure) --- */}
       <div className="mb-5">
           <label className="mb-2 block text-base font-medium text-gray-600">Projects</label>
           {(resumeData.projects || []).map((project, index) => (
               <div key={`proj-${index}`} className="mb-4 rounded-lg border border-gray-200 bg-gray-50 p-4 max-lg:p-3">
                   <h3 className="mb-3 text-xl font-semibold text-gray-600 max-lg:text-lg">Project {index + 1}</h3>
                   {/* Title */}
                   <div className="mb-5">
                       <label className="mb-2 block text-base font-medium text-gray-600">Title</label>
                       <input
                           type="text"
                           name={`projects[${index}].title`}
                           value={project.title || ""}
                           onChange={handleProjectChange(index, 'title')}
                            className="w-full rounded-md border border-gray-300 p-3 text-base text-gray-800 transition duration-200 ease-in-out focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-300/50 max-lg:text-[0.95rem]"
                       />
                   </div>
                   {/* Description */}
                   <div className="mb-5">
                       <label className="mb-2 block text-base font-medium text-gray-600">Description</label>
                        <LiveSuggestionInput
                          name={`projects[${index}].description`}
                          value={project.description || ""}
                          onChange={handleProjectChange(index, 'description')}
                          model="gemini-1.5-flash"
                          textareaClassName="w-full rounded-md border border-gray-300 p-3 text-base text-gray-800 transition duration-200 ease-in-out focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-300/50 placeholder-gray-400 max-lg:text-[0.95rem]"
                          rows={4}
                        />
                   </div>
                    {/* Technologies */}
                   <div className="mb-5">
                        <label className="mb-2 block text-base font-medium text-gray-600">Technologies Used</label>
                        <input
                           type="text"
                           name={`projects[${index}].technologies`}
                           value={project.technologies || ""}
                           onChange={handleProjectChange(index, 'technologies')}
                           className="w-full rounded-md border border-gray-300 p-3 text-base text-gray-800 transition duration-200 ease-in-out focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-300/50 max-lg:text-[0.95rem]"
                        />
                   </div>
                   {/* Remove Button */}
                   <button
                       type="button"
                       onClick={() => handleRemoveProject(index)}
                       className="rounded-md border-none bg-red-500 px-4 py-2.5 text-sm text-white transition duration-200 ease-in-out hover:scale-105 hover:bg-red-600 max-lg:px-3 max-lg:py-2 max-lg:text-[0.8rem]"
                   >
                       Remove
                   </button>
               </div>
           ))}
           {/* Add Button */}
           <button
               type="button"
               onClick={handleAddProject}
                className="mt-4 rounded-md border-none bg-green-500 px-5 py-3 text-base text-white transition duration-200 ease-in-out hover:scale-105 hover:bg-green-700 max-lg:px-4 max-lg:py-2 max-lg:text-[0.9rem]"
           >
               Add Project
           </button>
       </div>

      {/* Achievements */}
       <div className="mb-5">
         <label className="mb-2 block text-base font-medium text-gray-600">Achievements / Certifications (each on a new line)</label>
         <LiveSuggestionInput
           name="achievements"
           value={resumeData.achievements || ""}
           onChange={handleChange}
           model="gemini-1.5-flash"
            textareaClassName="w-full rounded-md border border-gray-300 p-3 text-base text-gray-800 transition duration-200 ease-in-out focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-300/50 placeholder-gray-400 max-lg:text-[0.95rem]"
           rows={4}
         />
         {errors.achievements && <p className="mt-1 text-sm text-red-500">{errors.achievements}</p>}
       </div>

      {/* Save Button */}
      <div className="mt-8 text-center max-lg:mt-6">
        <button
          onClick={saveResume}
          className="inline-flex items-center rounded-md border-none bg-blue-500 px-6 py-4 text-lg font-medium text-white shadow-sm transition duration-200 ease-in-out hover:-translate-y-0.5 hover:bg-blue-600 hover:shadow-md max-lg:px-5 max-lg:py-3 max-lg:text-base"
        >
          <AiOutlineSave className="mr-2 inline-block align-middle" size={18} /> Save Resume to DB
        </button>
      </div>
    </div>
  );
}