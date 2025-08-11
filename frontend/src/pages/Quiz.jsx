import React, { useState } from "react";

const Quiz = () => {
  const [topic, setTopic] = useState("javascript");
  const [difficulty, setDifficulty] = useState("easy");
  const [quizState, setQuizState] = useState("settings");
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [score, setScore] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const availableTopics = [
    "JavaScript",
    "HTML",
    "CSS",
    "C",
    "CPP",
    "Java",
    "React",
    "Node.js",
    "Python",
    "World History",
    "General Science",
    "SQL",
    "Data Structures",
    "Algorithms",
    "Machine Learning",
    "Artificial Intelligence",
    "Cyber Security",
    "Cloud Computing",
    "Blockchain",
    "Web Development",
    "Mobile Development",
    "Game Development",
    "DevOps",
    "Software Testing",
    "Agile Methodologies",
    "Project Management",
    "Digital Marketing",
    "Graphic Design",
    "UI/UX Design",
    "Data Visualization",
    "Data Analytics",
    "Search Engine Optimization (SEO)",
  ];

  const handleStartQuiz = async () => {
    setIsLoading(true);
    setError(null);
    setQuizState("in-progress");
    try {
      const response = await fetch("http://localhost:5000/api/generate-quiz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic, difficulty }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to fetch questions.");
      }
      const data = await response.json();
      setQuestions(data.questions);
    } catch (err) {
      setError(err.message);
      setQuizState("settings");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectAnswer = (answer) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [currentQuestionIndex]: answer,
    });
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      let finalScore = 0;
      questions.forEach((q, index) => {
        if (selectedAnswers[index] === q.answer) finalScore++;
      });
      setScore(finalScore);
      setQuizState("finished");
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const handlePlayAgain = () => {
    setQuizState("settings");
    setScore(0);
    setCurrentQuestionIndex(0);
    setQuestions([]);
    setSelectedAnswers({});
    setError(null);
  };

  // SETTINGS SCREEN
  if (quizState === "settings") {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg w-full max-w-lg p-6">
          <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-gray-100 mb-6">
            Quiz Setup
          </h2>
          {error && (
            <p className="text-red-500 text-center mb-4 text-sm">{error}</p>
          )}

          <div className="mb-4">
            <label className="block mb-2 text-gray-600 dark:text-gray-300">
              Topic:
            </label>
            <select
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100"
            >
              {availableTopics.map((t) => (
                <option key={t} value={t.toLowerCase()}>
                  {t}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-6">
            <label className="block mb-2 text-gray-600 dark:text-gray-300">
              Difficulty:
            </label>
            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100"
            >
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>

          <button
            onClick={handleStartQuiz}
            className="w-full bg-cyan-500 hover:bg-cyan-600 dark:bg-teal-500 dark:hover:bg-teal-600 text-white p-3 rounded-lg font-semibold transition"
          >
            Start Quiz
          </button>
        </div>
      </div>
    );
  }

  // LOADING SCREEN
  if (quizState === "in-progress" && isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
          <h2 className="text-xl text-gray-800 dark:text-gray-100">
            🧠 Generating your quiz...
          </h2>
        </div>
      </div>
    );
  }

  // IN-PROGRESS SCREEN
  if (quizState === "in-progress") {
    if (!questions.length) {
      return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
            <p className="text-gray-800 dark:text-gray-100 mb-4">
              Sorry, we couldn't generate questions. Please try again.
            </p>
            <button
              onClick={handlePlayAgain}
              className="bg-cyan-500 dark:bg-teal-500 text-white px-4 py-2 rounded-lg"
            >
              Back to Settings
            </button>
          </div>
        </div>
      );
    }

    const currentQuestion = questions[currentQuestionIndex];
    const progressPercentage =
      ((currentQuestionIndex + 1) / questions.length) * 100;
    const selectedAnswer = selectedAnswers[currentQuestionIndex];

    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg w-full max-w-2xl p-6">
          {/* Progress Bar */}
          <div className="h-2 bg-gray-300 dark:bg-gray-700 rounded-full mb-4">
            <div
              className="h-2 bg-cyan-500 dark:bg-teal-500 rounded-full transition-all"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>

          <div className="text-center mb-6">
            <span className="text-gray-500 dark:text-gray-400 text-sm">
              Question {currentQuestionIndex + 1} of {questions.length}
            </span>
            <h2 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white mt-2">
              {currentQuestion.question}
            </h2>
          </div>

          <div className="space-y-3">
            {currentQuestion.options.map((option, index) => {
              const isSelected = selectedAnswer === option;
              return (
                <button
                  key={index}
                  onClick={() => handleSelectAnswer(option)}
                  className={`w-full flex justify-between items-center p-4 rounded-lg border transition ${
                    isSelected
                      ? "border-cyan-500 bg-cyan-50 dark:border-teal-500 dark:bg-teal-900/30"
                      : "border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700"
                  }`}
                >
                  <span className="text-gray-800 dark:text-gray-200">
                    {option}
                  </span>
                  {isSelected && (
                    <span className="text-cyan-500 dark:text-teal-400 font-bold">
                      ✓
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <div className="flex gap-3 mt-6">
            <button
              onClick={handlePreviousQuestion}
              disabled={currentQuestionIndex === 0}
              className="flex-1 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200 px-4 py-2 rounded-lg disabled:opacity-50"
            >
              Previous
            </button>
            <button
              onClick={handleNextQuestion}
              disabled={!selectedAnswer}
              className="flex-1 bg-cyan-500 hover:bg-cyan-600 dark:bg-teal-500 dark:hover:bg-teal-600 text-white px-4 py-2 rounded-lg disabled:opacity-50"
            >
              {currentQuestionIndex < questions.length - 1
                ? "Next"
                : "Finish"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // RESULTS SCREEN
  if (quizState === "finished") {
    const percentage =
      questions.length > 0
        ? ((score / questions.length) * 100).toFixed(0)
        : 0;

    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg w-full max-w-lg p-6 text-center">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">
            🏆 Quiz Completed! 🏆
          </h2>
          <p className="text-gray-600 dark:text-gray-300">Your final score is:</p>
          <p className="text-5xl font-bold text-gray-900 dark:text-white my-2">
            {score} / {questions.length}
          </p>
          <p className="text-2xl font-semibold text-cyan-500 dark:text-teal-400">
            {percentage}%
          </p>
          <button
            onClick={handlePlayAgain}
            className="mt-6 w-full bg-cyan-500 hover:bg-cyan-600 dark:bg-teal-500 dark:hover:bg-teal-600 text-white px-4 py-2 rounded-lg"
          >
            Play Again
          </button>
        </div>
      </div>
    );
  }

  return null;
};

export default Quiz;
