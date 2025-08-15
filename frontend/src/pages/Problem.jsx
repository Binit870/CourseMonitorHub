// src/ProblemGenerator.js
import React, { useState } from "react";
import { Editor } from "@monaco-editor/react";

// ✅ 1. Created a single source of truth for all supported languages
const supportedLanguages = [
  { name: "JavaScript", value: "javascript", id: 63 },
  { name: "Python", value: "python", id: 71 },
  { name: "Java", value: "java", id: 62 },
  { name: "Go", value: "go", id: 95 },
  { name: "C++", value: "cpp", id: 54 },
  { name: "TypeScript", value: "typescript", id: 74 },
  { name: "C#", value: "csharp", id: 51 },
  { name: "Ruby", value: "ruby", id: 72 },
  { name: "Rust", value: "rust", id: 73 },
  { name: "Swift", value: "swift", id: 83 },
];


const ProblemDisplay = ({
  problem,
  starterCode,
  setStarterCode,
  handleRunCode,
  runResult,
  language,
}) => {
  if (!problem) return null;

  return (
    <div className="flex flex-col lg:flex-row gap-6 mt-6 border-t border-gray-300 dark:border-gray-700 pt-6">
      {/* Problem Details */}
      <div className="flex-1 lg:max-w-md">
        <h2 className="text-xl font-bold text-cyan-900 dark:text-cyan-400">
          {problem.title}
        </h2>
        <p className="mt-1 text-sm">
          <strong>Difficulty:</strong>{" "}
          <span className="text-cyan-600 dark:text-cyan-400">
            {problem.difficulty}
          </span>
        </p>
        <div
          className="mt-4 prose dark:prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: problem.description }}
        />
        <h3 className="mt-4 font-semibold text-gray-900 dark:text-gray-100">
          Examples:
        </h3>
        {problem.examples.map((example, index) => (
          <div
            key={index}
            className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg text-sm mt-2 text-gray-900 dark:text-gray-100"
          >
            <p><strong>Input:</strong> {example.input}</p>
            <p><strong>Output:</strong> {example.output}</p>
            {example.explanation && (
              <p><strong>Explanation:</strong> {example.explanation}</p>
            )}
          </div>
        ))}
        <p className="mt-4 text-sm text-gray-900 dark:text-gray-100">
          <strong>Constraints:</strong> {problem.constraints}
        </p>
      </div>

      {/* Code Editor and Output */}
      <div className="flex-1">
        <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
          Your Code
        </h3>
        <div className="border border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden">
          <Editor
            height="400px"
            language={language}
            theme="vs-dark"
            value={starterCode}
            onChange={(value) => setStarterCode(value || "")}
            options={{
              minimap: { enabled: false },
              fontSize: 14,
              wordWrap: "on",
            }}
          />
        </div>
        <button
          onClick={handleRunCode}
          className="mt-3 px-4 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white text-sm font-medium"
        >
          ▶ Run Code
        </button>
        {runResult && (
          <div className="mt-3 p-3 rounded-lg bg-gray-100 dark:bg-gray-800 text-sm border border-gray-300 dark:border-gray-700">
            <strong className="text-gray-900 dark:text-gray-100">
              Output:
            </strong>
            <pre className="mt-1 whitespace-pre-wrap text-gray-900 dark:text-gray-100">
              {runResult}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};

const Problem = () => {
  const [language, setLanguage] = useState("javascript");
  const [difficulty, setDifficulty] = useState("Beginner");
  const [generatedProblem, setGeneratedProblem] = useState(null);
  const [starterCode, setStarterCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [runResult, setRunResult] = useState(null);

  const handleGenerate = async () => {
    setIsLoading(true);
    setError(null);
    setGeneratedProblem(null);
    setRunResult(null);

    try {
      const response = await fetch(
        "http://localhost:5000/api/generate-problem",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ language, difficulty }),
        }
      );
      if (!response.ok) {
        throw new Error("Something went wrong with the request.");
      }
      const data = await response.json();
      setGeneratedProblem(data);
      setStarterCode(Object.values(data.starterCode)[0] || "");
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRunCode = async () => {
    // ✅ 3. Find the correct language ID from the central array
    const selectedLanguage = supportedLanguages.find(l => l.value === language);
    if (!selectedLanguage) {
      setRunResult("Error: Selected language is not supported for execution.");
      return;
    }

    try {
      const response = await fetch(
        "https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=false&wait=true",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-RapidAPI-Key": import.meta.env.VITE_JUDGE0_API_KEY,
            "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
          },
          body: JSON.stringify({
            source_code: starterCode,
            language_id: selectedLanguage.id,
            stdin: "",
          }),
        }
      );
      const data = await response.json();
      setRunResult(data.stdout || data.stderr || "No output");
    } catch (err) {
      setRunResult(`Error: ${err.message}`);
    }
  };

  return (
    <main className="bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 min-h-screen p-4 sm:p-6 transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold text-cyan-700 dark:text-cyan-400 mb-4">
          Generate a New Coding Problem
        </h2>
        <div className="flex flex-col sm:flex-row gap-4 sm:items-end">
          <div>
            <label htmlFor="language-select" className="block text-sm font-medium text-cyan-700 dark:text-cyan-400">
              Language:
            </label>
            <select
              id="language-select"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
            >
              {/* ✅ 2. Generate the dropdown options dynamically */}
              {supportedLanguages.map((lang) => (
                <option key={lang.value} value={lang.value}>
                  {lang.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="difficulty-select" className="block text-sm font-medium text-cyan-700 dark:text-cyan-400">
              Difficulty:
            </label>
            <select
              id="difficulty-select"
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              className="border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
            >
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
              <option value="Expert">Expert</option>
            </select>
          </div>
          <button
            onClick={handleGenerate}
            disabled={isLoading}
            className={`px-4 py-2 rounded-lg text-white text-sm font-medium shadow-md transition ${
              isLoading
                ? "bg-gray-400 dark:bg-gray-600 cursor-not-allowed"
                : "bg-cyan-600 hover:bg-cyan-700 dark:bg-cyan-500 dark:hover:bg-cyan-600"
            }`}
          >
            {isLoading ? "Generating..." : "✨ Generate"}
          </button>
        </div>
        {error && (
          <p className="text-red-500 mt-4 text-sm">Error: {error}</p>
        )}
        <ProblemDisplay
          problem={generatedProblem}
          starterCode={starterCode}
          setStarterCode={setStarterCode}
          handleRunCode={handleRunCode}
          runResult={runResult}
          language={language}
        />
      </div>
    </main>
  );
};

export default Problem;