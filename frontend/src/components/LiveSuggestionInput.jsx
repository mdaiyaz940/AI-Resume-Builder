// LiveSuggestionInput.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaMagic } from 'react-icons/fa'; // Font Awesome icons

const LiveSuggestionInput = ({ name, value, onChange, model }) => {
  const [input, setInput] = useState(value || "");
  const [suggestion, setSuggestion] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setInput(value || "");
  }, [value]);

  const handleInputChange = (e) => {
    setInput(e.target.value);
    onChange({ target: { name: name, value: e.target.value } });
  };

  const fetchSuggestion = async () => {
    if (!input.trim()) {
      setSuggestion("❌ Please enter something to improve.");
      return;
    }

    setLoading(true);
    try {
      const formattedSuggestionPrompt = `Improve this ${name} professionally:\n"${input}"`;

      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/ai/generate`, {
        prompt: formattedSuggestionPrompt,
        model: "gemini-1.5-flash",
      });
      setSuggestion(res.data.output.trim());
    } catch (err) {
      console.error("Error fetching suggestion:", err);
      setSuggestion("❌ Couldn't fetch suggestion.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mb-4"> {/* Tailwind for .suggestion-input-container (using margin-bottom for spacing) */}
      <textarea
        className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md py-2 px-3 mb-2" // Tailwind for .suggestion-textarea
        placeholder={`Enter your ${name}...`}
        rows={4}
        value={input}
        onChange={handleInputChange}
        name={name}
      />

      <button
        className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400" // Tailwind for .suggestion-button
        onClick={fetchSuggestion}
        disabled={loading}
      >
        {loading ? (
          "⏳ Generating..."
        ) : (
          <>
            <FaMagic className="mr-2 align-middle" size={16} />
            Suggest Improvement
          </>
        )}
      </button>

      {suggestion && !loading && (
        <div className="mt-2 p-3 bg-gray-100 rounded-md"> {/* Tailwind for .suggestion-output */}
          <p className="font-semibold text-gray-700 mb-1">Suggestion:</p> {/* Tailwind for .suggestion-output-title */}
          <p className="text-gray-600">{suggestion}</p> {/* Tailwind for .suggestion-output-text */}
        </div>
      )}
    </div>
  );
};

export default LiveSuggestionInput;