// ResumePreview.jsx
import React from "react";

// Removed: import "./styles.css"; // Import the consolidated CSS

export default function ResumePreview({ resumeData = {}, resumeRef, selectedTemplate }) {
  // Ensure data arrays exist and are arrays before processing
  const experienceArray = Array.isArray(resumeData.experience) ? resumeData.experience : [];
  const educationArray = Array.isArray(resumeData.education) ? resumeData.education : [];
  const projectsArray = Array.isArray(resumeData.projects) ? resumeData.projects : [];

  // Process skills and achievements safely
  const skillsArray = typeof resumeData.skills === 'string'
    ? resumeData.skills.split(",").map((s) => s.trim()).filter(Boolean)
    : [];
  const achievementsArray = typeof resumeData.achievements === 'string'
    ? resumeData.achievements.split("\n").map((a) => a.trim()).filter(Boolean)
    : [];

  // --- Template Styles ---
  // Base styles applied regardless of template
  const base = {
    // Added overflow-hidden to container to ensure nothing spills out visually
    container: "mx-auto rounded-xl shadow-md transition-all duration-300 ease-in-out w-full max-w-[816px] p-10 max-lg:w-[95%] max-lg:max-w-none max-lg:px-6 max-lg:py-8 overflow-hidden",
    heading: "mb-4 text-2xl font-bold",
    label: "mb-3 block border-b pb-1 text-lg font-semibold",
    // Keep ml-5 for indentation, text breaking handled on li/p
    list: "mb-3 ml-5 list-disc",
    // Added break-words and overflow-hidden for summary text
    text: "mb-3 text-[0.9rem] leading-relaxed break-words overflow-hidden",
    contact: "mb-2 text-sm text-gray-500",
    contactStrong: "font-semibold text-gray-600",
    // Added break-words and overflow-hidden for list items
    listItem: "mb-3 break-words overflow-hidden",
    itemTitle: "mb-1 block font-bold break-words overflow-hidden", // Added break-words, overflow-hidden
    itemSubtitle: "block text-sm text-gray-500 break-words overflow-hidden", // Added break-words, overflow-hidden
    // break-words already here, ensure it's effective with parent styles
    itemDesc: "mt-2 whitespace-normal break-words leading-relaxed text-[0.9rem]",
    // Added break-words and overflow-hidden for tech text
    itemTech: "text-xs text-gray-500 break-words overflow-hidden",
  };

  // Template specific styles
  const templates = {
    simple: {
      container: "bg-white text-gray-600",
      heading: "text-gray-800",
      label: "border-blue-400 text-blue-500",
      list: "text-gray-600",
    },
    modern: {
      container: "bg-gradient-to-r from-gray-100 to-white border border-blue-200 text-gray-600",
      heading: "text-indigo-600",
      label: "border-purple-300 text-indigo-500",
      list: "text-indigo-700",
    },
    classic: {
      container: "border-2 border-gray-400 bg-white font-serif text-gray-800",
      heading: "text-gray-800 underline",
      label: "border-gray-500 text-gray-700",
      list: "text-gray-800",
    }
  };

  // Get current template styles, default to simple
  const currentTemplate = templates[selectedTemplate] || templates.simple;

  // Combine base and template styles
  const style = {
    container: `${base.container} ${currentTemplate.container}`,
    heading: `${base.heading} ${currentTemplate.heading}`,
    label: `${base.label} ${currentTemplate.label}`,
    list: `${base.list} ${currentTemplate.list}`,
    text: `${base.text}`,
    contact: `${base.contact}`,
    contactStrong: `${base.contactStrong}`,
    listItem: `${base.listItem}`,
    itemTitle: `${base.itemTitle}`,
    itemSubtitle: `${base.itemSubtitle}`,
    itemDesc: `${base.itemDesc}`,
    itemTech: `${base.itemTech}`,
  };


  // Helper to check if any object in the array has at least one truthy value for the given keys
  const sectionHasContent = (arr, keys) => {
    if (!Array.isArray(arr) || arr.length === 0) return false;
    return arr.some(item => keys.some(key => !!item[key]));
  };

  return (
    <div ref={resumeRef} className={style.container}>
      <h2 className={style.heading}>{resumeData.name || "Your Name"}</h2>
      {/* Added break-words and overflow-hidden to contact lines */}
      {(resumeData.email || resumeData.phone) && (
          <div className="mb-4 break-words overflow-hidden">
            <p className={style.contact}>
              <strong className={style.contactStrong}>Email:</strong> {resumeData.email || 'your.email@example.com'}
            </p>
            <p className={style.contact}>
              <strong className={style.contactStrong}>Phone:</strong> {resumeData.phone || 'N/A'}
            </p>
          </div>
      )}


      {/* Summary */}
      {resumeData.summary && (
        <div>
          <h3 className={style.label}>Summary</h3>
          {/* style.text now includes break-words and overflow-hidden */}
          <p className={style.text}>{resumeData.summary}</p>
        </div>
      )}

      {/* Skills */}
      {skillsArray.length > 0 && (
        <div>
          <h3 className={style.label}>Skills</h3>
          <ul className={style.list}>
            {/* style.listItem now includes break-words and overflow-hidden */}
            {skillsArray.map((s, i) => <li key={`skill-${i}`} className={style.listItem}>{s}</li>)}
          </ul>
        </div>
      )}

      {/* Experience */}
      {sectionHasContent(experienceArray, ['jobTitle', 'company', 'description']) && (
          <div>
            <h3 className={style.label}>Experience</h3>
            {/* Removed list-disc/ml-5 override here, relying on itemDesc/listItem for break */}
            <ul className="mb-3 list-none ml-0"> {/* Override list style type and margin for custom layout */}
              {experienceArray.map((exp, i) => (
                 /* style.listItem includes break-words and overflow-hidden */
                <li key={`exp-${i}`} className={style.listItem}>
                  {/* itemTitle includes break-words and overflow-hidden */}
                  <strong className={style.itemTitle}>{exp.jobTitle}</strong>
                  {/* itemSubtitle includes break-words and overflow-hidden */}
                  <span className={style.itemSubtitle}>{exp.company} | {exp.startDate} - {exp.endDate}</span>
                  {/* itemDesc includes break-words */}
                  <p className={style.itemDesc}>{exp.description}</p>
                </li>
              ))}
            </ul>
          </div>
      )}

      {/* Education */}
        {sectionHasContent(educationArray, ['institution', 'degree', 'description']) && (
           <div>
             <h3 className={style.label}>Education</h3>
             {/* Removed list-disc/ml-5 override here, relying on itemDesc/listItem for break */}
             <ul className="mb-3 list-none ml-0"> {/* Override list style type and margin */}
               {educationArray.map((edu, i) => (
                  /* style.listItem includes break-words and overflow-hidden */
                  <li key={`edu-${i}`} className={style.listItem}>
                    {/* itemTitle includes break-words and overflow-hidden */}
                    <strong className={style.itemTitle}>{edu.degree}</strong>
                    {/* itemSubtitle includes break-words and overflow-hidden */}
                    <span className={style.itemSubtitle}>{edu.institution} | {edu.startDate} - {edu.endDate}</span>
                    {/* itemDesc includes break-words */}
                    <p className={style.itemDesc}>{edu.description}</p>
                  </li>
                ))}
              </ul>
            </div>
        )}

      {/* Projects */}
      {sectionHasContent(projectsArray, ['title', 'description', 'technologies']) && (
        <div>
          <h3 className={style.label}>Projects</h3>
          {/* Removed list-disc/ml-5 override here, relying on itemDesc/listItem for break */}
          <ul className="mb-3 list-none ml-0"> {/* Override list style type and margin */}
            {projectsArray.map((project, i) => (
               /* style.listItem includes break-words and overflow-hidden */
              <li key={`proj-${i}`} className={style.listItem}>
                {/* itemTitle includes break-words and overflow-hidden */}
                <strong className={style.itemTitle}>{project.title}</strong>
                {/* itemDesc includes break-words */}
                <p className={style.itemDesc}>{project.description}</p>
                 {/* itemTech includes break-words and overflow-hidden */}
                {project.technologies && <p className={style.itemTech}>Technologies: {project.technologies}</p>}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Achievements */}
      {achievementsArray.length > 0 && (
        <div>
          <h3 className={style.label}>Achievements / Certifications</h3>
          <ul className={style.list}>
            {/* style.listItem now includes break-words and overflow-hidden */}
            {achievementsArray.map((a, i) => <li key={`ach-${i}`} className={style.listItem}>{a}</li>)}
          </ul>
        </div>
      )}
    </div>
  );
}