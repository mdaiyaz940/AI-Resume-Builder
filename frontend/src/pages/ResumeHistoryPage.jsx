import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import SavedResumes from "../components/SavedResumes";

export default function ResumeHistoryPage() {
  const [builtResumes, setBuiltResumes] = useState([]);
  const [analyzedResumes, setAnalyzedResumes] = useState([]);
  const [selectedResume, setSelectedResume] = useState(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchResumes = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/resume/user/all`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        // Split into built and analyzed
        const built = res.data.filter((r) => r.analyzed === false);
        const analyzed = res.data.filter((r) => r.analyzed === true);

        setBuiltResumes(built);
        setAnalyzedResumes(analyzed);
      } catch (err) {
        toast.error("Failed to fetch resume history");
      }
    };
    fetchResumes();
  }, []);

  const handleLoadResume = async (id) => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/resume/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSelectedResume(res.data);
    } catch (err) {
      toast.error("Failed to load resume");
    }
  };

  const handleDeleteResume = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/resume/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setBuiltResumes((prev) => prev.filter((r) => r._id !== id));
      setAnalyzedResumes((prev) => prev.filter((r) => r._id !== id));
      if (selectedResume?._id === id) setSelectedResume(null);
      toast.success("Resume deleted");
    } catch (err) {
      toast.error("Failed to delete resume");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-purple-700 mb-4">Your Resume History</h2>

      {/* BUILT Resumes */}
      <section className="mb-10">
        <h3 className="text-xl font-semibold text-emerald-700 mb-2">📄 Built Resumes (from Resume Builder)</h3>
        {builtResumes.length > 0 ? (
          <SavedResumes
            savedResumes={builtResumes}
            onLoadResume={handleLoadResume}
            onDeleteResume={handleDeleteResume}
          />
        ) : (
          <p className="text-gray-500">No resumes built yet.</p>
        )}
      </section>

      {/* ANALYZED Resumes */}
      <section>
        <h3 className="text-xl font-semibold text-blue-700 mb-2">🧠 Analyzed Resumes (from Resume Analyzer)</h3>
        {analyzedResumes.length > 0 ? (
          <SavedResumes
            savedResumes={analyzedResumes}
            onLoadResume={handleLoadResume}
            onDeleteResume={handleDeleteResume}
          />
        ) : (
          <p className="text-gray-500">No resumes analyzed yet.</p>
        )}
      </section>

      {/* Resume Preview */}
      {selectedResume && (
        <div className="mt-8 bg-white p-6 rounded-lg shadow-lg border">
          <h3 className="text-xl font-bold mb-2 text-emerald-700">
            {selectedResume.name}'s Resume
          </h3>
          <p className="text-gray-600 mb-1"><strong>Email:</strong> {selectedResume.email}</p>
          <p className="text-gray-600 mb-1"><strong>Phone:</strong> {selectedResume.phone}</p>
          <p className="text-gray-600 mb-4"><strong>Summary:</strong> {selectedResume.summary}</p>

          {selectedResume.skills && (
            <>
              <p className="text-gray-800 font-semibold">Skills:</p>
              <ul className="list-disc list-inside mb-4 text-gray-600">
                {selectedResume.skills.split(",").map((skill, i) => (
                  <li key={i}>{skill.trim()}</li>
                ))}
              </ul>
            </>
          )}

          {selectedResume.experience?.length > 0 && (
            <>
              <p className="text-gray-800 font-semibold">Experience:</p>
              {selectedResume.experience.map((exp, i) => (
                <div key={i} className="mb-2 text-sm text-gray-700">
                  <p><strong>{exp.jobTitle}</strong> at {exp.company}</p>
                  <p>{exp.startDate} – {exp.endDate}</p>
                  <p>{exp.description}</p>
                </div>
              ))}
            </>
          )}

          {selectedResume.education?.length > 0 && (
            <>
              <p className="text-gray-800 font-semibold mt-4">Education:</p>
              {selectedResume.education.map((edu, i) => (
                <div key={i} className="mb-2 text-sm text-gray-700">
                  <p><strong>{edu.degree}</strong> at {edu.institution}</p>
                  <p>{edu.startDate} – {edu.endDate}</p>
                  <p>{edu.description}</p>
                </div>
              ))}
            </>
          )}

          {selectedResume.projects?.length > 0 && (
            <>
              <p className="text-gray-800 font-semibold mt-4">Projects:</p>
              {selectedResume.projects.map((proj, i) => (
                <div key={i} className="mb-2 text-sm text-gray-700">
                  <p><strong>{proj.title}</strong></p>
                  <p>{proj.description}</p>
                  <p><em>Technologies: {proj.technologies}</em></p>
                </div>
              ))}
            </>
          )}

          {selectedResume.achievements && (
            <>
              <p className="text-gray-800 font-semibold mt-4">Achievements:</p>
              <p className="text-gray-600 text-sm">{selectedResume.achievements}</p>
            </>
          )}
        </div>
      )}
    </div>
  );
}
