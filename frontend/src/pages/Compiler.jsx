import React, { useState, useEffect } from "react";
import { Editor } from "@monaco-editor/react";
import {
  Play,
  RotateCcw,
  Sun,
  Moon,
  Download,
  Upload,
  Copy,
} from "lucide-react";
import { languageConfig } from "../config/BoilerPlate"; // ✅ unified config

const judge0ApiKey = import.meta.env.VITE_JUDGE0_API_KEY;

export default function OnlineCompiler() {
  const [language, setLanguage] = useState("javascript");
  const [code, setCode] = useState(languageConfig["javascript"].template);
  const [input, setInput] = useState("");
  const [output, setOutput] = useState({ type: "info", message: "" });
  const [status, setStatus] = useState("");
  const [time, setTime] = useState("");
  const [memory, setMemory] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [editorTheme, setEditorTheme] = useState("vs-dark");

  // Load saved code
  useEffect(() => {
    const savedCode = localStorage.getItem(`code-${language}`);
    if (savedCode) {
      setCode(savedCode);
    } else {
      setCode(languageConfig[language].template);
    }
  }, [language]);

  // Save code
  useEffect(() => {
    localStorage.setItem(`code-${language}`, code);
  }, [code, language]);

  const handleRunCode = async () => {
    setIsRunning(true);
    setOutput({ type: "info", message: "Running code..." });
    setStatus("⏳ Running...");
    setTime("");
    setMemory("");

    try {
      const response = await fetch(
        "https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=false&wait=true",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-rapidapi-host": "judge0-ce.p.rapidapi.com",
            "x-rapidapi-key": judge0ApiKey,
          },
          body: JSON.stringify({
            source_code: code,
            language_id: languageConfig[language].id,
            stdin: input,
          }),
        }
      );

      const data = await response.json();

      if (data.stdout) {
        setOutput({ type: "stdout", message: data.stdout });
        setStatus("✅ Success");
      } else if (data.stderr) {
        setOutput({ type: "stderr", message: data.stderr });
        setStatus("❌ Runtime Error");
      } else if (data.compile_output) {
        setOutput({ type: "compile", message: data.compile_output });
        setStatus("⚠️ Compilation Error");
      } else {
        setOutput({ type: "info", message: "No output returned." });
        setStatus("⚠️ No Output");
      }

      setTime(data.time ? `${data.time}s` : "N/A");
      setMemory(data.memory ? `${data.memory} KB` : "N/A");
    } catch (error) {
      setOutput({ type: "stderr", message: "Error running code: " + error.message });
      setStatus("❌ API Error");
    }
    setIsRunning(false);
  };

  const handleEditorChange = (value) => setCode(value);

  const handleLanguageChange = (e) => {
    const newLang = e.target.value;
    setLanguage(newLang);
    setCode(languageConfig[newLang].template || "");
    setOutput({ type: "info", message: "" });
    setStatus("");
    setInput("");
  };

  const handleResetCode = () => {
    setCode(languageConfig[language].template || "");
    setOutput({ type: "info", message: "" });
    setInput("");
    setStatus("");
  };

  const toggleTheme = () => {
    setEditorTheme(editorTheme === "vs-dark" ? "light" : "vs-dark");
  };

  const handleDownload = () => {
    const ext = languageConfig[language].ext || "txt";
    const blob = new Blob([code], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.download = `code.${ext}`;
    link.href = url;
    link.click();
  };

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      file.text().then((content) => setCode(content));

      const ext = file.name.split(".").pop();
      const detectedLang = Object.keys(languageConfig).find(
        (lang) => languageConfig[lang].ext === ext
      );

      if (detectedLang) {
        const monacoLangMap = {
          // ✅ C-family
          c: "c",
          cpp: "cpp",
          cs: "csharp",
          java: "java",
          swift: "swift",
          kotlin: "kotlin",
          objectivec: "objective-c",

          // ✅ Scripting
          js: "javascript",
          ts: "typescript",
          py: "python",
          rb: "ruby",
          php: "php",
          pl: "perl",
          sh: "shell", // or "bash" if extension installed

          // ✅ Modern languages
          go: "go",
          rs: "rust",
          dart: "dart",
          scala: "scala",
          hs: "haskell",

          // ✅ Data-related
          r: "r",
          sql: "sql", // requires SQL language support in Monaco

          // ✅ Misc
          m: "objective-c",
        };

        const monacoLang = monacoLangMap[ext] || detectedLang;
        setLanguage(monacoLang);
      }


    }
    e.target.value = null; // reset file input for re-upload
  };

  const handleCopyOutput = () => {
    if (!output.message) return;

    navigator.clipboard.writeText(output.message)
      .then(() => {
        console.log("Copied!");
        alert("Output copied to clipboard!");
      })
      .catch(err => {
        if (err?.name !== "AbortError" && err?.message !== "Canceled") {
          console.error("Clipboard error:", err);
        }
      });
  };

  const getOutputStyle = () => {
    switch (output.type) {
      case "stdout":
        return "text-green-400";
      case "stderr":
        return "text-red-400";
      case "compile":
        return "text-yellow-400";
      default:
        return "text-gray-300";
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
      <div className="p-4 sm:p-6 w-full max-w-7xl mx-auto flex flex-col gap-6">
        {/* Heading */}
        <h1 className="text-3xl font-bold text-center text-cyan-900 dark:text-cyan-400 mb-4">
          Online Compiler
        </h1>

        {/* Controls */}
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <select
            value={language}
            onChange={handleLanguageChange}
            className="border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 rounded-lg px-3 py-2 text-sm"
          >
            {Object.keys(languageConfig).map((lang) => (
              <option key={lang} value={lang}>
                {lang.charAt(0).toUpperCase() + lang.slice(1)}
              </option>
            ))}
          </select>

          <button
            onClick={handleRunCode}
            disabled={isRunning}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-white text-sm font-medium shadow-md transition ${isRunning
              ? "bg-gray-400 dark:bg-gray-600 cursor-not-allowed"
              : "bg-cyan-600 hover:bg-cyan-700 dark:bg-cyan-500 dark:hover:bg-cyan-600"
              }`}
          >
            <Play size={16} />
            {isRunning ? "Running..." : "Run"}
          </button>

          <button
            onClick={handleResetCode}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-gray-500 hover:bg-gray-600 text-white shadow-md transition"
          >
            <RotateCcw size={16} /> Reset
          </button>

          <button
            onClick={toggleTheme}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-yellow-500 hover:bg-yellow-600 text-white shadow-md transition"
          >
            {editorTheme === "vs-dark" ? <Sun size={16} /> : <Moon size={16} />}
            {editorTheme === "vs-dark" ? "Light Mode" : "Dark Mode"}
          </button>

          <button
            onClick={handleDownload}
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium bg-green-600 hover:bg-green-700 text-white"
          >
            <Download size={16} /> Download
          </button>

          <label className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium bg-purple-600 hover:bg-purple-700 text-white cursor-pointer">
            <Upload size={16} /> Upload
            <input
              type="file"
              accept={Object.values(languageConfig)
                .map((l) => `.${l.ext}`)
                .join(",")}
              onChange={handleUpload}
              hidden
            />
          </label>
        </div>

        {/* Editor + Console */}
        <div className="flex flex-col lg:flex-row gap-6 flex-grow">
          {/* Code Editor */}
          <div className="flex-1 rounded-lg border border-gray-300 dark:border-gray-700 overflow-hidden min-h-[500px]">
            <Editor
              height="100%"
              language={language}
              theme={editorTheme}
              value={code}
              onChange={handleEditorChange}
              options={{ fontSize: 14, minimap: { enabled: false } }}
            />
          </div>

          {/* Console Output */}
          <div className="lg:w-1/3 w-full flex flex-col">
            <h3 className="mb-2 text-lg font-semibold text-gray-800 dark:text-gray-100">
              Console Output
            </h3>
            <pre className="bg-gray-900 dark:bg-gray-800 p-4 rounded-lg text-sm min-h-[350px] whitespace-pre-wrap break-words overflow-auto">
              <code className={getOutputStyle()}>
                {output.message || 'Click "Run" to see the output here.'}
              </code>
            </pre>

            {output.message && (
              <button
                onClick={handleCopyOutput}
                className="mt-2 flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium bg-blue-600 hover:bg-blue-700 text-white"
              >
                <Copy size={16} /> Copy Output
              </button>
            )}

            {/* Input */}
            <h3 className="mt-4 mb-2 text-lg font-semibold text-gray-800 dark:text-gray-100">
              Input (stdin)
            </h3>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 text-sm min-h-[100px]"
              placeholder="Enter input here..."
            ></textarea>

            {/* Status + Time + Memory */}
            {status && (
              <p className="mt-3 text-sm font-medium text-gray-800 dark:text-gray-200">
                {status}
              </p>
            )}
            {(time || memory) && (
              <div className="mt-3 flex gap-3">
                {time && (
                  <span className="px-3 py-1 text-sm rounded-xl bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200">
                    ⏱ {time}
                  </span>
                )}
                {memory && (
                  <span className="px-3 py-1 text-sm rounded-xl bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-200">
                    🧠 {memory}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
