import React, { useState } from "react";
import { Editor } from "@monaco-editor/react"; // ✅ Import Monaco Editor
import { Play } from "lucide-react";

const judge0ApiKey = import.meta.env.VITE_JUDGE0_API_KEY;

// Judge0 language IDs (https://ce.judge0.com/ for list)
const languageIdMap = {
  javascript: 63,
  python: 71,
  java: 62,
  c: 50,
  cpp: 54,
  typescript: 74,
  csharp: 51,
  go: 60,
  swift: 83,
  kotlin: 78,
  ruby: 72,
  php: 68,
  rust: 73,
};

const codeStubs = {
  javascript: 'const x = 10;\nconsole.log(`Hello from JavaScript! x = ${x}`);',
  python: 'x = 10\nprint(f"Hello from Python! x = {x}")',
  java: `public class Main {
  public static void main(String[] args) {
    int x = 10;
    System.out.println("Hello from Java! x = " + x);
  }
}`,
  c: `#include <stdio.h>

int main() {
  int x = 10;
  printf("Hello from C! x = %d\\n", x);
  return 0;
}`,
  cpp: `#include <iostream>

int main() {
  int x = 10;
  std::cout << "Hello from C++! x = " << x;
  return 0;
}`,
  typescript: 'const x: number = 10;\nconsole.log(`Hello from TypeScript! x = ${x}`);',
  csharp: `using System;

class Program {
  static void Main(string[] args) {
    int x = 10;
    Console.WriteLine($"Hello from C#! x = {x}");
  }
}`,
  go: `package main

import "fmt"

func main() {
  x := 10
  fmt.Printf("Hello from Go! x = %d", x)
}`,
  swift: `var x = 10
print("Hello from Swift! x = \\(x)")`,
  kotlin: `fun main() {
  val x = 10
  println("Hello from Kotlin! x = $x")
}`,
  ruby: 'x = 10\nputs "Hello from Ruby! x = #{x}"',
  php: '<?php\\n$x = 10;\\necho "Hello from PHP! x = " . $x;\\n?>',
  rust: `fn main() {
    let x = 10;
    println!("Hello from Rust! x = {}", x);
}`,
};

export default function Practice() {
  const [language, setLanguage] = useState("javascript");
  const [code, setCode] = useState(codeStubs.javascript);
  const [output, setOutput] = useState("");
  const [isRunning, setIsRunning] = useState(false);

  // The 'highlight' function is no longer needed; Monaco handles it automatically.

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
          stdin: "",
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

  const handleEditorChange = (value) => {
    setCode(value);
  };

  const handleLanguageChange = (e) => {
    const newLang = e.target.value;
    setLanguage(newLang);
    setCode(codeStubs[newLang]);
    setOutput("");
  };

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
      <div className="p-4 pb-4 sm:p-6 w-full max-w-6xl mx-auto dark:bg-gray-900">
        <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">
          Practice Programming Languages
        </h2>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-4">
          <select
            value={language}
            onChange={handleLanguageChange}
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

        {/* ✅ Code Editor (Now Monaco) */}
        <div className="rounded-lg border border-gray-300 dark:border-gray-700 overflow-hidden">
          <Editor
            height="50vh" // Set a height for the editor
            language={language}
            theme="vs-dark" // Use a built-in theme
            value={code}
            onChange={handleEditorChange}
            options={{
              fontSize: 14,
              minimap: { enabled: false }, // Optionally disable the minimap
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