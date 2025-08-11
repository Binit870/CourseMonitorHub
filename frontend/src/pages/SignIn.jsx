import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import bgImage from '../assets/cmh_bg.png';
import logo from '../assets/logo.png';
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signin } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await signin({ email, password });
    } catch (err) {
      setError(err.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="flex justify-center items-center min-h-screen bg-cover bg-center p-4"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="w-full max-w-4xl flex flex-col md:flex-row bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200">
        
        {/* Left Panel */}
        <div className="w-full md:w-1/2 p-8 flex flex-col justify-center items-center text-center bg-gradient-to-br from-cyan-500 via-cyan-600 to-cyan-700">
          <img src={logo} alt="CMH Logo" className="w-20 h-20 md:w-24 md:h-24 mb-6" />
          <h1 className="text-3xl md:text-4xl font-bold text-white tracking-wide">
            Welcome to CMH
          </h1>
          <p className="text-white/80 mt-2 max-w-xs">
            Your centralized hub for learning and growth.
          </p>
        </div>

        {/* Right Form */}
        <div className="w-full md:w-1/2 p-6 md:p-10 lg:p-12">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2 text-center md:text-left">
            Sign In
          </h2>
          <p className="text-gray-500 mb-6 text-center md:text-left">
            Enter your credentials to access your account.
          </p>

          {error && (
            <div className="text-center text-cyan-700 bg-red-100 p-3 rounded-lg border border-red-200 mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div className="relative">
              <div className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-400">
                <FaEnvelope />
              </div>
              <input
                id="email"
                type="email"
                className="w-full bg-gray-100 text-gray-800 placeholder-gray-500 p-3 pl-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all duration-300"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Password */}
            <div className="relative">
              <div className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-400">
                <FaLock />
              </div>
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                className="w-full bg-gray-100 text-gray-800 placeholder-gray-500 p-3 pl-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all duration-300"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <div
                className="absolute top-1/2 right-4 -translate-y-1/2 text-gray-400 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full font-semibold bg-cyan-600 text-white py-3 rounded-lg hover:bg-cyan-700 shadow-lg hover:shadow-cyan-500/40 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>

          {/* Sign Up Link */}
          <div className="text-center text-gray-500 pt-6">
            Don't have an account?{' '}
            <Link to="/signup" className="font-semibold text-cyan-600 hover:underline">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
