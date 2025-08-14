import React, { useState } from "react";
import Editor from "react-simple-code-editor";
import Prism from "prismjs";
import { Play } from "lucide-react";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-python";
import "prismjs/components/prism-java";
import "prismjs/components/prism-c";
import "prismjs/components/prism-cpp";
import "prismjs/themes/prism.css";

const judge0ApiKey = import.meta.env.VITE_JUDGE0_API_KEY; // ✅ Load from .env

// Judge0 language IDs (https://ce.judge0.com/ for list)
const languageIdMap = {
  javascript: 63,
  python: 71,
  java: 62,
  c: 50,
  cpp: 54,
};

const codeStubs = {
  javascript: 'console.log("Hello from JavaScript!");',
  python: 'print("Hello from Python!")',
  java: `public class Main {
  public static void main(String[] args) {
    System.out.println("Hello from Java!");
  }
}`,
  c: `#include <stdio.h>

int main() {
  printf("Hello from C!");
  return 0;
}`,
  cpp: `#include <iostream>

int main() {
  std::cout << "Hello from C++!";
  return 0;
}`,
};

export default function Practice() {
  const [language, setLanguage] = useState("javascript");
  const [code, setCode] = useState(codeStubs.javascript);
  const [output, setOutput] = useState("");
  const [isRunning, setIsRunning] = useState(false);

  const highlightCode = (code) =>
    Prism.highlight(code, Prism.languages[language], language);

  const handleRunCode = async () => {
    setIsRunning(true);
    setOutput("Running code...");

    try {
      const response = await fetch("https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=false&wait=true", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-rapidapi-host": "judge0-ce.p.rapidapi.com",
          "x-rapidapi-key": judge0ApiKey,
        },
        body: JSON.stringify({
          source_code: code,
          language_id: languageIdMap[language],
          stdin: "", // you can add input here if needed
        }),
      });

      const data = await response.json();
      if (data.stdout) {
        setOutput(data.stdout);
      } else if (data.stderr) {
        setOutput(data.stderr);
      } else if (data.compile_output) {
        setOutput(data.compile_output);
      } else {
        setOutput("No output returned.");
      }
    } catch (error) {
      setOutput("Error running code: " + error.message);
    }

    setIsRunning(false);
  };

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
      <div className="p-4 pb-4 sm:p-6 max-w-4xl mx-auto dark:bg-gray-900">
        <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">
          Practice Programming Languages
        </h2>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-4">
          <select
            value={language}
            onChange={(e) => {
              const newLang = e.target.value;
              setLanguage(newLang);
              setCode(codeStubs[newLang]);
              setOutput("");
            }}
            className="border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 rounded-lg px-3 py-2 text-sm focus:outline-none"
          >
            {Object.keys(languageIdMap).map((lang) => (
              <option key={lang} value={lang}>
                {lang.charAt(0).toUpperCase() + lang.slice(1)}
              </option>
            ))}
          </select>

          <button
            onClick={handleRunCode}
            disabled={isRunning}
            className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-white text-sm font-medium shadow-md transition ${
              isRunning
                ? "bg-gray-400 dark:bg-gray-600 cursor-not-allowed"
                : "bg-cyan-600 hover:bg-cyan-700 dark:bg-cyan-500 dark:hover:bg-cyan-600"
            }`}
          >
            <Play size={16} />
            {isRunning ? "Running..." : "Run"}
          </button>
        </div>

        {/* Code Editor */}
        <div className="rounded-lg border border-gray-300 dark:border-gray-700 overflow-hidden">
          <Editor
            value={code}
            onValueChange={setCode}
            highlight={highlightCode}
            padding={15}
            className="bg-gray-100 dark:bg-gray-900 text-sm text-gray-800 dark:text-gray-100 overflow-auto"
            style={{
              fontFamily: '"Fira code", "Fira Mono", monospace',
              minHeight: "300px",
            }}
          />
        </div>

        {/* Output */}
        <h3 className="mt-6 mb-2 text-lg font-semibold text-gray-800 dark:text-gray-100">
          Console Output
        </h3>
        <pre className="bg-gray-900 text-gray-100 dark:bg-gray-800 dark:text-green-300 p-4 rounded-lg text-sm min-h-[100px] whitespace-pre-wrap break-words overflow-auto">
          <code>{output || 'Click "Run" to see the output here.'}</code>
        </pre>
      </div>
    </div>
  );
}
