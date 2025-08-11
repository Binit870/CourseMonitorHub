// src/ProblemGenerator.js
import React, { useState } from "react";

const ProblemDisplay = ({ problem, starterCode, setStarterCode, handleRunCode, runResult }) => {
  if (!problem) return null;

  return (
    <div className="flex flex-col lg:flex-row gap-6 mt-6 border-t border-gray-300 dark:border-gray-700 pt-6">
      {/* Problem Details */}
      <div className="flex-1">
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
            <p>
              <strong>Input:</strong> {example.input}
            </p>
            <p>
              <strong>Output:</strong> {example.output}
            </p>
            {example.explanation && (
              <p>
                <strong>Explanation:</strong> {example.explanation}
              </p>
            )}
          </div>
        ))}

        <p className="mt-4 text-sm">
          <strong>Constraints:</strong> {problem.constraints}
        </p>
      </div>

      {/* Starter Code */}
      <div className="flex-1">
        <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
          Starter Code ({Object.keys(problem.starterCode)[0]})
        </h3>
        <textarea
          value={starterCode}
          onChange={(e) => setStarterCode(e.target.value)}
          className="w-full h-64 lg:h-[400px] font-mono text-sm p-3 border border-gray-300 dark:border-gray-700 rounded-lg 
                     bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          style={{
            color: "inherit",
            backgroundColor: "inherit",
          }}
        />
        <button
          onClick={handleRunCode}
          className="mt-3 px-4 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white text-sm font-medium"
        >
          ▶ Run Code
        </button>

        {runResult && (
          <div className="mt-3 p-3 rounded-lg bg-gray-100 dark:bg-gray-800 text-sm border border-gray-300 dark:border-gray-700">
            <strong className="text-gray-900 dark:text-gray-100">Output:</strong>
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
          headers: {
            "Content-Type": "application/json",
          },
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
    try {
      const response = await fetch("http://localhost:5000/api/run-code", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ language, code: starterCode }),
      });

      if (!response.ok) {
        throw new Error("Error running code");
      }

      const result = await response.json();
      setRunResult(result.output || "No output");
    } catch (err) {
      setRunResult(`Error: ${err.message}`);
    }
  };

  return (
    <div className="p-4 sm:p-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold text-cyan-700 dark:text-cyan-400 mb-4">
        Generate a New Coding Problem
      </h2>

      <div className="flex flex-col sm:flex-row gap-4 sm:items-center">
        <div>
          <label
            htmlFor="language-select"
            className="block text-sm font-medium text-cyan-700 dark:text-cyan-400"
          >
            Language:
          </label>
          <select
            id="language-select"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
          >
            <option value="javascript">JavaScript</option>
            <option value="python">Python</option>
            <option value="java">Java</option>
            <option value="go">Go</option>
            <option value="c++">C++</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="difficulty-select"
            className="block text-sm font-medium text-cyan-700 dark:text-cyan-400"
          >
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
      />
    </div>
  );
};

export default Problem;
