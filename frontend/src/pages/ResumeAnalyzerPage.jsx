import React, { useState } from "react";
import { toast } from "react-toastify";
import { Loader2, Sparkles, CheckCircle, AlertCircle, Upload, Target, FileText } from "lucide-react";
import axios from "axios";
// Set PDF worker
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf";

pdfjsLib.GlobalWorkerOptions.workerPort = new Worker(
  new URL("pdfjs-dist/legacy/build/pdf.worker.js", import.meta.url),
  { type: "module" }
);


export default function ResumeAnalyzerPage() {
  const [file, setFile] = useState(null);
  const [jobRole, setJobRole] = useState("");
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState(null);
  const [parsedOutput, setParsedOutput] = useState({ score: 0, tips: [], keywords: [] });

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setAnalysis(null);
    setParsedOutput({ score: 0, tips: [], keywords: [] });
  };

  const handleRoleChange = (e) => setJobRole(e.target.value);

  const extractTextFromPDF = async (file) => {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    let text = "";

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();
      const pageText = content.items.map((item) => item.str).join(" ");
      text += pageText + "\n";
    }

    return text;

  };

  const parseAIResponse = (text) => {
    if (!text || typeof text !== "string") return { score: 0, tips: [], keywords: [] };

    // console.log("Parsing AI Response:", text); // Debug log

    // 1. Parse ATS Score - Updated regex to match your format
    const scoreMatch = text.match(/\*\*ATS Score:\*\*\s*(\d{1,3})\/100/i) || 
                      text.match(/ATS Score:\s*(\d{1,3})\/100/i);
    const score = scoreMatch ? parseInt(scoreMatch[1], 10) : 0;

    // 2. Parse Improvement Suggestions - Updated to handle your format
    const tipsSection = text.match(/\*\*Improvement Suggestions:\*\*\s*([\s\S]*?)(?=\*\*Essential Keywords:\*\*|$)/i);
    let tips = [];
    
    if (tipsSection && tipsSection[1]) {
      const tipsText = tipsSection[1].trim();
      // Split by lines and filter out empty lines
      tips = tipsText.split('\n')
        .map(line => line.trim())
        .filter(line => line.length > 0)
        .map(line => line.replace(/^[-*•]\s*/, '')) // Remove bullet points
        .filter(tip => tip.length > 5);
    }

    // 3. Parse Essential Keywords - Updated to handle your format
    const keywordsSection = text.match(/\*\*Essential Keywords:\*\*\s*([\s\S]*?)(?=\n\s*---|\n\s*\*\*|$)/i);
    let keywords = [];
    
    if (keywordsSection && keywordsSection[1]) {
      const keywordsText = keywordsSection[1].trim();
      // Extract numbered list items
      const keywordMatches = keywordsText.match(/\d+\.\s+(.+?)(?=\n\d+\.|$)/g);
      if (keywordMatches) {
        keywords = keywordMatches.map(match => {
          const keyword = match.replace(/^\d+\.\s+/, '').trim();
          return keyword;
        }).filter(kw => kw.length > 0);
      }
    }

    // console.log("Parsed result:", { score, tips, keywords }); // Debug log
    return { score, tips, keywords };
  };

  const saveAnalysisToBackend = async ({ score, tips, keywords }) => {
  try {
    const token = localStorage.getItem("token");
    await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/api/resume/save-analysis`,
      { atsScore: score, improvements: tips, keywords, jobRole },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("✅ Saved analysis to DB");
  } catch (err) {
    console.error("❌ Failed to save analysis:", err.response?.data || err.message);
    toast.error("Failed to save analysis");
  }
};


  
  const handleAnalyze = async () => {
  if (!file || !jobRole.trim()) {
    toast.error("Please provide a resume and job role.");
    return;
  }

  try {
    setLoading(true);
    const resumeText = await extractTextFromPDF(file);
    const token = localStorage.getItem("token");

    const res = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/api/analyze/resume`,
      { resumeText, jobRole },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    const rawText = res.data?.output || "";
    if (!rawText) {
      toast.error("⚠️ No analysis found in response.");
      return;
    }

    setAnalysis(rawText);
    const parsed = parseAIResponse(rawText);
setParsedOutput(parsed);
await saveAnalysisToBackend(parsed);
    toast.success("✅ Resume analyzed successfully!");
  } catch (err) {
    console.error("Analysis failed:", err);
    toast.error("❌ Failed to analyze resume");
  } finally {
    setLoading(false);
  }
};

  const getScoreColor = (score) => {
    if (score >= 80) return "text-green-600 bg-green-50 border-green-200";
    if (score >= 60) return "text-yellow-600 bg-yellow-50 border-yellow-200";
    return "text-red-600 bg-red-50 border-red-200";
  };

  const getScoreIcon = (score) => {
    if (score >= 80) return "🎉";
    if (score >= 60) return "⚠️";
    return "🔴";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-4">
            <FileText className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Resume Analyzer</h1>
          <p className="text-gray-600">Get AI-powered insights to optimize your resume for better job prospects</p>
        </div>

        {/* Upload Section */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
          <div className="space-y-6">
            {/* File Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Upload Resume (PDF)
              </label>
              <div className="relative">
                <input
                  type="file"
                  accept=".pdf"
                  onChange={handleFileChange}
                  className="hidden"
                  id="resume-upload"
                />
                <label
                  htmlFor="resume-upload"
                  className="flex items-center justify-center w-full p-6 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-colors cursor-pointer"
                >
                  <div className="text-center">
                    <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">
                      {file ? file.name : "Click to upload your resume"}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">PDF files only</p>
                  </div>
                </label>
              </div>
            </div>

            {/* Job Role Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Target Job Role
              </label>
              <div className="relative">
                <Target className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="e.g., Frontend Developer, Product Manager, Data Scientist"
                  value={jobRole}
                  onChange={handleRoleChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Analyze Button */}
            <button
              onClick={handleAnalyze}
              disabled={loading || !file || !jobRole.trim()}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-300 disabled:to-gray-400 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin w-5 h-5" />
                  <span>Analyzing Resume...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  <span>Analyze Resume</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Results Section */}
        {parsedOutput.score > 0 && (
          <div className="space-y-6">
            {/* ATS Score */}
            <div className={`bg-white rounded-2xl shadow-xl p-6 border-l-4 ${getScoreColor(parsedOutput.score).replace('text-', 'border-').replace(' bg-', ' ').replace(' border-', ' border-l-')}`}>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-1 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-blue-600" />
                    ATS Compatibility Score
                  </h3>
                  <p className="text-sm text-gray-600">How well your resume matches the job requirements</p>
                </div>
                <div className="text-right">
                  <div className={`text-4xl font-bold ${getScoreColor(parsedOutput.score).split(' ')[0]}`}>
                    {parsedOutput.score}
                    <span className="text-lg text-gray-500">/100</span>
                  </div>
                  <div className="text-2xl">{getScoreIcon(parsedOutput.score)}</div>
                </div>
              </div>
              <div className="mt-4">
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className={`h-3 rounded-full transition-all duration-1000 ${getScoreColor(parsedOutput.score).includes('green') ? 'bg-green-500' : getScoreColor(parsedOutput.score).includes('yellow') ? 'bg-yellow-500' : 'bg-red-500'}`}
                    style={{ width: `${parsedOutput.score}%` }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Improvement Suggestions */}
            {parsedOutput.tips.length > 0 && (
              <div className="bg-white rounded-2xl shadow-xl p-6 border-l-4 border-emerald-500">
                <h3 className="text-lg font-semibold text-emerald-700 mb-4 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5" />
                  Improvement Suggestions
                </h3>
                <div className="space-y-3">
                  {parsedOutput.tips.map((tip, idx) => (
                    <div key={idx} className="flex items-start space-x-3 p-3 bg-emerald-50 rounded-lg">
                      <div className="w-6 h-6 bg-emerald-200 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-emerald-700 text-sm font-bold">{idx + 1}</span>
                      </div>
                      <p className="text-gray-700 text-sm leading-relaxed">{tip}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Essential Keywords */}
            {parsedOutput.keywords.length > 0 && (
              <div className="bg-white rounded-2xl shadow-xl p-6 border-l-4 border-purple-500">
                <h3 className="text-lg font-semibold text-purple-700 mb-4 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5" />
                  Essential Keywords for This Role
                </h3>
                <div className="flex flex-wrap gap-3">
                  {parsedOutput.keywords.map((keyword, i) => (
                    <span 
                      key={i} 
                      className="bg-gradient-to-r from-purple-100 to-blue-100 text-purple-700 px-4 py-2 rounded-full text-sm font-medium border border-purple-200 hover:shadow-md transition-shadow"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
                <p className="text-sm text-gray-600 mt-4">
                  💡 Make sure these keywords appear naturally in your resume to improve ATS compatibility
                </p>
              </div>
            )}
          </div>
        )}

        {/* Raw Output (Debug) */}
        {analysis && (
          <details className="mt-6 bg-gray-50 rounded-lg p-4">
            <summary className="cursor-pointer font-medium text-gray-700 hover:text-gray-900">
              🔍 View Raw AI Response (Debug)
            </summary>
            <pre className="mt-3 text-xs text-gray-600 whitespace-pre-wrap bg-white p-4 rounded border overflow-x-auto">
              {analysis}
            </pre>
          </details>
        )}
      </div>
    </div>
  );
}