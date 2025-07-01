// components/SavedResumes.jsx
import React from 'react'; // Import React
import { AiOutlineEye, AiOutlineDelete } from 'react-icons/ai';

// Removed: import "./styles.css"; // Import the consolidated CSS

export default function SavedResumes({ savedResumes = [], onLoadResume, onDeleteResume }) { // Default prop value

  const handleDelete = async (resumeId) => {
    if (window.confirm("Are you sure you want to delete this resume?")) {
      onDeleteResume(resumeId); // Call the onDeleteResume prop from App.js
    }
  };

  return (
    <div className="mt-6 rounded-xl bg-white p-6 shadow max-lg:p-4">
     
      {savedResumes.length === 0 ? (
        <p className="text-gray-500">No resumes saved yet.</p>
      ) : (
        // Use <ul> for semantic list, remove default list styles
        <ul className="list-none p-0 text-gray-800">
          {savedResumes.map((resume) => (
            <li
              key={resume._id}
              className="flex flex-wrap items-center justify-between border-b border-gray-200 py-3 last:border-b-0 max-lg:py-2.5" // Added flex-wrap for smaller screens
            >
              <div className="mb-2 flex-grow pr-4 max-lg:mb-2 max-lg:w-full"> {/* Allow info to take space, add padding */}
                <strong className="font-bold text-gray-800 max-lg:text-[0.95rem]">{resume.name || 'Untitled Resume'}</strong> – {resume.email}
                <small className="mt-1 block text-xs text-gray-500"> {/* Adjusted size */}
                  Created on {new Date(resume.createdAt).toLocaleDateString()}
                </small>
              </div>
              <div className="flex flex-shrink-0 gap-2 max-lg:w-full max-lg:justify-start"> {/* Smaller gap, ensure buttons don't shrink */}
                <button
                  className="inline-flex items-center rounded-md border border-gray-300 bg-sky-50 px-3 py-2 text-sm text-blue-500 transition duration-150 ease-in-out hover:bg-blue-100 max-lg:px-2.5 max-lg:py-1.5 max-lg:text-[0.8rem]"
                  onClick={() => onLoadResume(resume._id)}
                >
                  <AiOutlineEye className="mr-1 inline-block align-middle" size={16} /> View
                </button>
                <button
                  className="inline-flex items-center rounded-md border border-gray-300 bg-red-50 px-3 py-2 text-sm text-red-500 transition duration-150 ease-in-out hover:bg-red-100 max-lg:px-2.5 max-lg:py-1.5 max-lg:text-[0.8rem]"
                  onClick={() => handleDelete(resume._id)}
                >
                  <AiOutlineDelete className="mr-1 inline-block align-middle" size={16} /> Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}