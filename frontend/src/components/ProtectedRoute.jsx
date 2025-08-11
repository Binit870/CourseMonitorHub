import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";  // Adjust this path if your context is elsewhere

export default function ProtectedRoute({ children }) {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/signin" replace />;
  }
  return children;
}
