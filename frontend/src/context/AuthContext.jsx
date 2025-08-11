/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

const API_URL = "http://localhost:5000/api/auth"; // ✅ Set your backend auth URL

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const isAuthenticated = !!user;

  // Load user from localStorage on app start
  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");

    if (token && userData) {
      try {
        const parsedUser = JSON.parse(userData);
        if (parsedUser) {
          setUser(parsedUser);
        }
      } catch (error) {
        console.error("Invalid user data in localStorage", error);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
      }
    }

    setLoading(false);
  }, []);

  // ✅ Sign In
  // ✅ Updated Signin in AuthContext.jsx
const signin = async ({ email, password }) => {
  try {
    const res = await fetch(`${API_URL}/signin`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    console.log("Signin API response:", data);

    // ✅ Adjusted for your backend's response shape
    if (!res.ok || !data.token || !data.email) {
      throw new Error('Invalid login response');
    }

    const userData = {
      _id: data._id,
      name: data.name,
      email: data.email
    };

    // Save token + user
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(userData));

    setUser(userData);
    navigate('/');
  } catch (err) {
    console.error('Signin error:', err);
    throw err;
  }
};


  // ✅ Sign Up
  const signup = async (credentials) => {
    try {
      const res = await fetch(`${API_URL}/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Signup failed");
      }

      const data = await res.json();
const userData = {
  _id: data._id,
  name: data.name,
  email: data.email
};
const token = data.token;

if (!userData || !token) {
  throw new Error("Invalid signup response");
}

localStorage.setItem("token", token);
localStorage.setItem("user", JSON.stringify(userData));
setUser(userData);

navigate("/signin");
    } catch (err) {
      console.error("Signup error:", err.message);
      throw err;
    }
  };

  // ✅ Logout
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/signin");
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, loading, signin, signup, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
