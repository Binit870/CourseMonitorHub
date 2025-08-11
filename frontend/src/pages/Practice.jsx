import React, { useState } from "react";
import Editor from "react-simple-code-editor";
import Prism from "prismjs";
import { Play } from "lucide-react"; // Lucide icon
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-python";
import "prismjs/components/prism-java";
import "prismjs/components/prism-c";
import "prismjs/components/prism-cpp";
import "prismjs/themes/prism.css";

const languageMap = {
  javascript: "javascript",
  python: "python",
  java: "java",
  c: "c",
  cpp: "cpp",
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
    setOutput("");

    if (language === "javascript") {
      const capturedLogs = [];
      const originalConsoleLog = console.log;
      console.log = (...args) => {
        capturedLogs.push(
          args
            .map((arg) =>
              typeof arg === "object" ? JSON.stringify(arg, null, 2) : arg
            )
            .join(" ")
        );
      };

      try {
        new Function(code)();
        setOutput(capturedLogs.join("\n"));
      } catch (error) {
        setOutput(error.toString());
      } finally {
        console.log = originalConsoleLog;
        setIsRunning(false);
      }
    } else {
      setOutput(`Simulated output for ${language.toUpperCase()}:\n\n${code}`);
      setIsRunning(false);
    }
  };

  return (
    <div className="p-4 sm:p-6 max-w-4xl mx-auto">
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
          {Object.keys(languageMap).map((lang) => (
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
  );
}
