import React, { useState } from "react";
import { Bot } from "lucide-react";
import Chatbot from "../pages/Chatbot";
import { useAuth } from "../context/AuthContext";

export default function ChatbotWidget() {
  const [open, setOpen] = useState(false);
  const { user } = useAuth();

  if (!user) {
    return null;
  }

  return (
    <>
      {/* Floating button with light & dark cyan theme */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 
                   bg-cyan-400 hover:bg-cyan-500 text-white 
                   dark:bg-cyan-700 dark:hover:bg-cyan-800 
                   p-4 rounded-full shadow-lg z-[999] flex items-center justify-center 
                   transition-transform hover:scale-110"
        aria-label="Open chat"
      >
        <Bot size={28} />
      </button>

      {/* Chatbot modal/popup */}
      {open && (
        <div 
          className="fixed bottom-24 z-[998] bg-white rounded-xl shadow-2xl flex flex-col
                     left-4 right-4 h-[70vh]  
                     md:left-auto md:right-6 md:w-96 md:h-[600px]
                     dark:bg-slate-800 dark:border dark:border-slate-700"
        >
          {/* Header */}
          <div className="flex justify-between items-center p-4 border-b border-slate-200 dark:border-slate-700">
            <h3 className="font-semibold text-lg text-slate-800 dark:text-slate-100">
              AI Assistant
            </h3>
            <button
              onClick={() => setOpen(false)}
              className="text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-100"
              aria-label="Close chat"
            >
              ✕
            </button>
          </div>

          {/* Chatbot Component */}
          <div className="flex-grow overflow-hidden">
            <Chatbot />
          </div>
        </div>
      )}
    </>
  );
}
