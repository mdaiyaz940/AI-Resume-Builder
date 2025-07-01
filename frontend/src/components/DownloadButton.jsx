// DownloadButton.jsx
import React from "react";
import html2pdf from "html2pdf.js";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaDownload } from 'react-icons/fa';

export default function DownloadButton({ resumeRef, resumeData, validateForm }) {
  const handleDownload = async () => {
    // Validate Form
    const isValid = validateForm ? validateForm() : true;
    if (!isValid) {
      toast.error("Please fill in all required fields before downloading.");
      return;
    }

    // Ensure resumeRef is available
    if (!resumeRef || !resumeRef.current) {
      toast.error("Preview element not found.");
      return;
    }

    const element = resumeRef.current;
    
    // Debug: Check if element has content
    console.log("Element content:", element.innerHTML);
    console.log("Element dimensions:", element.offsetWidth, element.offsetHeight);
    
    if (!element.innerHTML.trim()) {
      toast.error("No content found to generate PDF.");
      return;
    }

    toast.info("Generating PDF...");

    try {
      // Wait longer for content to fully render
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Simple configuration - start with basics
      const opt = {
        margin: 0.5,
        filename: `${(resumeData && resumeData.name) || "resume"}.pdf`,
        image: { 
          type: "jpeg", 
          quality: 0.8
        },
        html2canvas: { 
          scale: 1,
          useCORS: true,
          allowTaint: true,
          backgroundColor: '#ffffff',
          logging: true, // Enable logging to debug
          height: element.scrollHeight,
          width: element.scrollWidth
        },
        jsPDF: { 
          unit: "in", 
          format: "letter", 
          orientation: "portrait"
        }
      };

      console.log("Starting PDF generation...");
      
      // Use the element directly without cloning first
      const pdf = await html2pdf().set(opt).from(element).toPdf().get('pdf');
      
      console.log("PDF generated, saving...");
      pdf.save(`${(resumeData && resumeData.name) || "resume"}.pdf`);
      
      toast.success("Resume downloaded successfully!");
      
    } catch (err) {
      console.error("PDF generation error:", err);
      toast.error(`Failed to generate PDF: ${err.message}`);
    }
  };

  // Alternative method using window.print() if html2pdf fails
  const handlePrintDownload = () => {
  const printWindow = window.open('', '_blank');
  const element = resumeRef.current;

  if (!element) {
    toast.error("Preview element not found.");
    return;
  }

  const styles = Array.from(document.styleSheets)
    .map((sheet) => {
      try {
        return Array.from(sheet.cssRules || [])
          .map((rule) => rule.cssText)
          .join('');
      } catch (e) {
        return '';
      }
    })
    .join('\n');

  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Resume</title>
        <meta charset="utf-8">
        <style>
          ${styles}

          @page {
            size: A4;
            margin: 1in;
          }

          body {
            background: white;
            color: black;
            font-family: 'Inter', sans-serif;
            padding: 0;
            margin: 0;
          }

          .container {
            max-width: 794px;
            margin: auto;
            padding: 20px;
          }

          button, .no-print {
            display: none !important;
          }
        </style>
      </head>
      <body>
        <div class="container">
          ${element.innerHTML}
        </div>
      </body>
    </html>
  `;

  printWindow.document.write(htmlContent);
  printWindow.document.close();

  setTimeout(() => {
    printWindow.focus();
    printWindow.print();
    setTimeout(() => printWindow.close(), 1000);
  }, 500);
};


  return (
    <div className="mt-8 text-center max-lg:mt-6">
      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
        {/* Primary download button */}
        <button
          onClick={handleDownload}
          className="inline-flex items-center rounded-lg border-none bg-green-700 px-8 py-4 text-lg text-white shadow-md transition duration-200 ease-in-out hover:-translate-y-0.5 hover:bg-green-800 hover:shadow-lg max-lg:px-6 max-lg:py-3 max-lg:text-base"
        >
          <FaDownload className="mr-2 inline-block align-middle" size={18} />
          Download as PDF
        </button>
        
        {/* Alternative print button */}
        <button
          onClick={handlePrintDownload}
          className="inline-flex items-center rounded-lg border border-green-700 bg-transparent px-8 py-4 text-lg text-green-700 shadow-md transition duration-200 ease-in-out hover:-translate-y-0.5 hover:bg-green-50 hover:shadow-lg max-lg:px-6 max-lg:py-3 max-lg:text-base"
        >
          <FaDownload className="mr-2 inline-block align-middle" size={18} />
          Print/Save as PDF
        </button>
      </div>
      
      <p className="mt-2 text-sm text-gray-600">
        If download doesn't work, try the "Print/Save as PDF" option
      </p>
    </div>
  );
}