import React, { useState } from "react";

// --- COMPANY DATA (Static Information) ---
const companies = [
  {
    name: "Google",
    eligibility:
      "Bachelor's degree in Computer Science or related technical field, or equivalent practical experience. Strong knowledge of data structures, algorithms, and software design.",
    process: [
      {
        round: "Online Assessment",
        description: "Coding test with algorithm and data structure questions on platforms like HackerRank.",
      },
      {
        round: "Technical Round 1",
        description: "Problem-solving and coding interview. Expect medium to hard difficulty LeetCode-style questions.",
      },
      {
        round: "Technical Round 2",
        description: "System design and in-depth problem-solving. May include domain-specific questions.",
      },
      {
        round: "HR Round",
        description: "Behavioral questions, past project discussions, and cultural fit assessment.",
      },
    ],
    questions: [
        { q: "How does Google search work?", a: "It involves crawling the web, indexing content, and serving results based on a complex ranking algorithm (like PageRank)." },
        { q: "Design a system like Google Docs.", a: "Focus on real-time collaboration, data storage, conflict resolution (CRDTs or Operational Transforms), and scalability." },
        { q: "Find the k-th largest element in an array.", a: "Explain solutions using sorting (O(n log n)) and a min-heap or Quickselect algorithm (average O(n))." },
    ],
  },
  {
    name: "Amazon",
    eligibility: "Currently enrolled in or recently graduated from a Bachelor's or Master's degree program in Computer Science, Engineering, or a related field. Customer-obsessed mindset.",
    process: [
      {
        round: "Online Assessment",
        description: "Coding problems + work simulation + logical reasoning test.",
      },
      {
        round: "Technical Round",
        description: "Coding + problem solving based on Amazon Leadership Principles.",
      },
      {
        round: "Managerial Round",
        description: "Scenario-based questions, system design, and team fit discussion.",
      },
      {
        round: "HR Round",
        description: "Offer negotiation and final fit assessment.",
      },
    ],
    questions: [
        { q: "Tell me about a time you had to deal with a difficult customer.", a: "Frame your answer using the STAR method (Situation, Task, Action, Result) and tie it to the 'Customer Obsession' leadership principle." },
        { q: "Design the recommendation system for Amazon.com.", a: "Discuss collaborative filtering, content-based filtering, and hybrid models. Mention scalability and cold-start problems." },
        { q: "Given a binary tree, check if it is a valid Binary Search Tree (BST).", a: "Explain the recursive approach with a min/max range or an in-order traversal method." },
    ],
  },
  {
    name: "Microsoft",
    eligibility: "Pursuing a degree (BS, MS, or PhD) in a relevant technical discipline. Strong coding and problem-solving skills are essential.",
    process: [
      {
        round: "Online Test",
        description: "MCQs + coding problems on DS/Algo, time complexity questions.",
      },
      {
        round: "Technical Rounds",
        description: "One or two coding interviews focusing on problem-solving and design.",
      },
      {
        round: "Final HR",
        description: "Behavioral questions and offer discussion.",
      },
    ],
    questions: [
        { q: "Why do you want to work for Microsoft?", a: "Align your personal goals with Microsoft's mission, products (like Azure, Office 365), and company culture." },
        { q: "Reverse a linked list.", a: "Provide both iterative (using three pointers: prev, current, next) and recursive solutions." },
        { q: "Explain the difference between a process and a thread.", a: "A process is an instance of a program with its own memory space, while threads are components of a process that share memory." },
    ],
  },
];

// API call function remains the same, but now it will receive an array
const fetchAIQuestionsAndAnswers = async (topic) => {
    try {
        const response = await fetch(`http://localhost:5000/api/interview/generate`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ topic }),
        });
        if (!response.ok) {
            console.error("Failed to fetch Q&A. Status:", response.status);
            return []; // Return empty array on failure
        }
        return await response.json(); // Expects an array of objects
    } catch (error) {
        console.error("An error occurred while fetching Q&A:", error);
        return [];
    }
};

const Interview = () => {
    const [selectedCompany, setSelectedCompany] = useState(companies[0]);
    const [searchQuery, setSearchQuery] = useState("");
    
    // --- STATE UPDATED to handle an array of results ---
    const [aiResults, setAiResults] = useState([]); 
    const [isLoading, setIsLoading] = useState(false);
    const [searchPerformed, setSearchPerformed] = useState(false);
    const [error, setError] = useState("");
    const [activeAccordion, setActiveAccordion] = useState(null); // To control the accordion

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!searchQuery) return;
        setIsLoading(true);
        setSearchPerformed(true);
        setError("");
        setAiResults([]);
        setActiveAccordion(null); // Reset accordion on new search

        const results = await fetchAIQuestionsAndAnswers(searchQuery);
        
        if (!results || results.length === 0) {
            setError(`Could not generate questions for "${searchQuery}". Please try another topic.`);
        } else {
            setAiResults(results);
        }
        
        setIsLoading(false);
    };

    const toggleAccordion = (index) => {
        setActiveAccordion(activeAccordion === index ? null : index);
    };

    return (
        <main className="bg-slate-50 text-slate-800 dark:bg-slate-900 dark:text-slate-100 transition-colors duration-300">
            <div className="max-w-5xl mx-auto p-6">
                <h1 className="text-3xl font-bold text-cyan-700 dark:text-cyan-400 mb-6">
                    Company Interview Hub
                </h1>
                
                {/* AI Search Section */}
                <div className="mb-8 p-5 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg shadow">
                    <h2 className="text-xl font-semibold mb-3 text-cyan-700 dark:text-cyan-400">AI Interview Question Generator</h2>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                        Enter any topic to generate a practice question with a detailed answer.
                    </p>
                    <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-2">
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="e.g., React Hooks"
                            className="flex-grow p-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                        />
                    _   <button
                            type="submit"
                            disabled={isLoading}
                            className="px-5 py-2 rounded-md bg-cyan-600 text-white font-semibold hover:bg-cyan-700 disabled:bg-cyan-400"
                        >
                            {isLoading ? "🧠 Generating..." : "Generate Q&A"}
                        </button>
                    </form>

                    {/* --- UI UPDATED to display a list of questions in an accordion --- */}
                    {searchPerformed && (
                        <div className="mt-6">
                            {isLoading ? (
                                <p className="text-cyan-600 dark:text-cyan-400">Generating questions from AI...</p>
                            ) : aiResults.length > 0 ? (
                                <div className="space-y-2">
                                    <h3 className="text-lg font-bold mb-2">Generated Questions for "{searchQuery}"</h3>
                                    {aiResults.map((item, index) => (
                                        <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-md">
                                            <button
          _                                     onClick={() => toggleAccordion(index)}
                                                className="w-full flex justify-between items-center p-4 text-left font-semibold text-gray-800 dark:text-gray-200 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700"
                                            >
                                                <span>{item.question}</span>
                                                <span className={`transform transition-transform duration-300 ${activeAccordion === index ? 'rotate-180' : ''}`}>
                                                    ▼
                                                </span>
                                            </button>
                                            {activeAccordion === index && (
                                                <div className="p-4 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
                                                    <p className="whitespace-pre-wrap text-gray-700 dark:text-gray-300">{item.answer}</p>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-red-500">{error}</p>
                            )}
                        </div>
                    )}
                </div>

                {/* --- COMPANY DETAILS SECTION (remains the same) --- */}
                <h2 className="text-2xl font-semibold mb-3">Company-Specific Information</h2>
                {/* ... rest of your JSX is the same ... */}
                 <div className="flex flex-wrap gap-3 mb-6">
                    {companies.map((company) => (
                        <button
                            key={company.name}
                            onClick={() => setSelectedCompany(company)}
                            className={`px-4 py-2 rounded-lg border text-sm font-medium transition
                                ${selectedCompany.name === company.name
                                    ? "bg-cyan-600 text-white border-cyan-600"
                                    : "bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-700 hover:bg-cyan-50 dark:hover:bg-gray-700"
                                }`}
                        >
                            {company.name}
                        </button>
                    ))}
                </div>

                {/* Selected Company Details */}
                <div className="bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg p-5 shadow space-y-6">
                    <h2 className="text-2xl font-semibold text-cyan-700 dark:text-cyan-400">
                        {selectedCompany.name}
                    </h2>

                    {/* Eligibility */}
                    <div>
                        <h3 className="text-xl font-bold mb-2">Eligibility Criteria</h3>
                        <p className="text-gray-700 dark:text-gray-300">{selectedCompany.eligibility}</p>
                    </div>

                    {/* Interview Process */}
                    <div>
                        <h3 className="text-xl font-bold mb-2">Interview Process</h3>
                        <ol className="space-y-4 list-decimal list-inside">
                            {selectedCompany.process.map((step, index) => (
                                <li key={index} className="text-gray-900 dark:text-gray-100">
                                    <p className="font-semibold inline">{step.round}</p>
                                    <p className="text-sm text-gray-700 dark:text-gray-300 ml-2">
                                        {step.description}
                                    </p>
                                </li>
                          ))}
                        </ol>
                    </div>

                    {/* Common Questions */}
                    <div>
                        <h3 className="text-xl font-bold mb-2">Commonly Asked Questions</h3>
                        <ul className="space-y-3">
                            {selectedCompany.questions.map((item, index) => (
                                <li key={index} className="p-3 bg-slate-50 dark:bg-slate-800 rounded-md border border-slate-200 dark:border-slate-700">
                                    <p className="font-semibold text-gray-900 dark:text-gray-100">{item.q}</p>
                                    <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">{item.a}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Interview;
