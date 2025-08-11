// src/App.jsx

import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";

// Import Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ChatbotWidget from "./components/ChatbotWidget"; // The widget itself
import ProtectedRoute from "./components/ProtectedRoute"; // Your route guard

// Import Pages
import Home from "./pages/Home";
import Courses from "./pages/Courses";
import Practice from "./pages/Practice";
import Problem from "./pages/Problem";
import Quiz from "./pages/Quiz";
import Dashboard from "./pages/Dashboard";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";

const App = () => {
  const location = useLocation();

  // This logic is good, let's keep it.
  const noNavAndFooterRoutes = ["/signin", "/signup"];
  const showNavAndFooter = !noNavAndFooterRoutes.includes(location.pathname);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {showNavAndFooter && <Navbar />}

      <main className="flex-grow">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/courses" element={<Courses />} />

          {/* Protected Routes: Wrap pages that require a user to be logged in */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/practice"
            element={
              <ProtectedRoute>
                <Practice />
              </ProtectedRoute>
            }
          />
          <Route
            path="/problem"
            element={
              <ProtectedRoute>
                <Problem />
              </ProtectedRoute>
            }
          />
          <Route
            path="/quiz"
            element={
              <ProtectedRoute>
                <Quiz />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>

      {/* The ChatbotWidget is now outside of <Routes> so it can appear on every page.
          It will internally check for a logged-in user and render nothing if not logged in. */}
      <ChatbotWidget />

      {showNavAndFooter && <Footer />}
    </div>
  );
};

export default App;