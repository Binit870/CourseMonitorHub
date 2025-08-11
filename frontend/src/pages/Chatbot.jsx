// src/pages/Chatbot.js

import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "../context/AuthContext";

function Chatbot() {
  const { user } = useAuth();
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hello! How can I help you today?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  if (!user) {
    return (
      <div className="p-4 text-center text-gray-500 dark:text-gray-400">
        Please log in to use the chatbot.
      </div>
    );
  }

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { sender: "user", text: input }];
    setMessages(newMessages);
    const userMessage = input;
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: userMessage }),
      });

      if (!response.ok) throw new Error("Network response was not ok");

      const data = await response.json();
      setMessages((prev) => [...prev, { sender: "bot", text: data.reply }]);
    } catch (error) {
      console.error("Backend API Error:", error);
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "Sorry, I'm having trouble connecting. Please try again later.",
        },
      ]);
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col h-full bg-white dark:bg-slate-900">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-4">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`p-3 rounded-lg break-words max-w-[85%] sm:max-w-[80%] w-fit ${
              msg.sender === "user"
                ? "bg-cyan-500 text-white ml-auto dark:bg-cyan-600"
                : "bg-gray-200 text-black dark:bg-gray-700 dark:text-gray-100"
            }`}
          >
            {msg.text}
          </div>
        ))}
        {loading && (
          <p className="text-gray-500 dark:text-gray-400 text-center text-sm">
            Thinking...
          </p>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-2 sm:p-3 border-t border-gray-200 dark:border-gray-700 flex gap-2 bg-white dark:bg-slate-900">
        <input
          type="text"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && !loading && sendMessage()}
          className="flex-1 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm sm:text-base
                     focus:ring-2 focus:ring-cyan-400 dark:focus:ring-cyan-500 focus:outline-none
                     bg-white dark:bg-slate-800 text-gray-900 dark:text-gray-100"
          disabled={loading}
        />
        <button
          onClick={sendMessage}
          className="bg-cyan-500 hover:bg-cyan-600 text-white 
                     dark:bg-cyan-600 dark:hover:bg-cyan-700 
                     px-3 sm:px-4 py-2 rounded-lg 
                     disabled:bg-cyan-300 dark:disabled:bg-cyan-800 disabled:cursor-not-allowed"
          disabled={loading}
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default Chatbot;
