// src/pages/Interview.jsx
import React, { useState } from "react";

const companies = [
  {
    name: "Google",
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
  },
  {
    name: "Amazon",
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
  },
  {
    name: "Microsoft",
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
  },
];

const Interview = () => {
  const [selectedCompany, setSelectedCompany] = useState(companies[0]);

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-cyan-700 dark:text-cyan-400 mb-6">
        Company Interview Processes
      </h1>

      {/* Company Selector */}
      <div className="flex flex-wrap gap-3 mb-6">
        {companies.map((company) => (
          <button
            key={company.name}
            onClick={() => setSelectedCompany(company)}
            className={`px-4 py-2 rounded-lg border text-sm font-medium transition
              ${
                selectedCompany.name === company.name
                  ? "bg-cyan-600 text-white border-cyan-600"
                  : "bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-700 hover:bg-cyan-50 dark:hover:bg-gray-700"
              }`}
          >
            {company.name}
          </button>
        ))}
      </div>

      {/* Selected Company Process */}
      <div className="bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg p-5 shadow">
        <h2 className="text-2xl font-semibold text-cyan-700 dark:text-cyan-400 mb-4">
          {selectedCompany.name} Interview Process
        </h2>
        <ol className="space-y-4 list-decimal list-inside">
          {selectedCompany.process.map((step, index) => (
            <li key={index} className="text-gray-900 dark:text-gray-100">
              <p className="font-semibold">{step.round}</p>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                {step.description}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default Interview;
