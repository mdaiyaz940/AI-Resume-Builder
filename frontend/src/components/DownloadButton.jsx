// DownloadButton.jsx
import React from "react";
import html2pdf from "html2pdf.js";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Keep toastify CSS
import { FaDownload } from 'react-icons/fa';

// Removed: import "./styles.css"; // Import the consolidated CSS

export default function DownloadButton({ resumeRef, resumeData, validateForm }) {
  const handleDownload = () => {
    // Validate Form - Ensure required fields are filled (example)
    const isValid = validateForm ? validateForm() : true; // Allow skipping validation if prop not passed
    if (!isValid) {
      toast.error("Please fill in all required fields before downloading.");
      return;
    }

    // Ensure resumeRef is available
    if (!resumeRef || !resumeRef.current) {
        toast.error("Preview element not found.");
        return;
    }


    const opt = {
      margin: 0.5,
      filename: `${(resumeData && resumeData.name) || "resume"}.pdf`, // Safe access to resumeData.name
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };

    toast.info("Generating PDF..."); // Give user feedback

    html2pdf()
        .set(opt)
        .from(resumeRef.current)
        .save()
        .then(() => {
             toast.success("Resume downloaded successfully!");
        }).catch(err => {
            toast.error("Failed to generate PDF.");
            console.error("PDF generation error:", err);
        });
  };

  return (
    <div className="mt-8 text-center max-lg:mt-6">
      <button
        onClick={handleDownload}
        className="inline-flex items-center rounded-lg border-none bg-green-700 px-8 py-4 text-lg text-white shadow-md transition duration-200 ease-in-out hover:-translate-y-0.5 hover:bg-green-800 hover:shadow-lg max-lg:px-6 max-lg:py-3 max-lg:text-base"
      >
        <FaDownload className="mr-2 inline-block align-middle" size={18} /> Download Resume as PDF
      </button>
    </div>
  );
}