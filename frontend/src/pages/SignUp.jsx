import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import bgImage from '../assets/cmh_bg.png';
import logo from '../assets/logo.png';
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa';

const SignUp = () => {
  const { signup } = useAuth();
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }
    
    setLoading(true);
    try {
      await signup(formData);
    } catch (err) {
      setError(err.message || 'Signup failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="flex justify-center items-center min-h-screen bg-cover bg-center p-4"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="w-full max-w-4xl flex flex-col md:flex-row bg-white rounded-2xl shadow-2xl overflow-hidden">
        
        {/* Left Panel */}
        <div className="w-full md:w-1/2 p-8 flex flex-col justify-center items-center text-center bg-gradient-to-br from-cyan-400 via-cyan-500 to-cyan-700">
          <img src={logo} alt="CMH Logo" className="w-20 h-20 md:w-24 md:h-24 mb-6" />
          <h1 className="text-3xl md:text-4xl font-bold text-white tracking-wide">Join CMH Today</h1>
          <p className="text-white/80 mt-2 max-w-xs">
            Start your journey with us and unlock your potential.
          </p>
        </div>

        {/* Right Panel */}
        <div className="w-full md:w-1/2 p-6 md:p-10 lg:p-12">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2 text-center md:text-left">Create Account</h2>
          <p className="text-gray-500 mb-6 text-center md:text-left">Get started by filling out the form below.</p>

          {error && (
            <div className="text-center text-red-700 bg-red-100 p-3 rounded-lg border border-red-200 mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name Input */}
            <div className="relative">
              <div className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-400">
                <FaUser />
              </div>
              <input
                id="name"
                name="name"
                type="text"
                onChange={handleChange}
                className="w-full bg-gray-100 text-gray-800 placeholder-gray-500 p-3 pl-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all duration-300"
                placeholder="Your Name"
                required
              />
            </div>

            {/* Email Input */}
            <div className="relative">
              <div className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-400">
                <FaEnvelope />
              </div>
              <input
                id="email"
                name="email"
                type="email"
                onChange={handleChange}
                className="w-full bg-gray-100 text-gray-800 placeholder-gray-500 p-3 pl-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all duration-300"
                placeholder="you@example.com"
                required
              />
            </div>

            {/* Password Input */}
            <div className="relative">
              <div className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-400">
                <FaLock />
              </div>
              <input
                id="password"
                name="password"
                type="password"
                onChange={handleChange}
                className="w-full bg-gray-100 text-gray-800 placeholder-gray-500 p-3 pl-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all duration-300"
                placeholder="•••••••• (min. 6 characters)"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full font-semibold bg-cyan-600 text-white py-3 rounded-lg hover:bg-cyan-700 shadow-lg hover:shadow-cyan-500/40 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? 'Creating Account...' : 'Sign Up'}
            </button>
          </form>
          
          <div className="text-center text-gray-500 pt-6">
            Already have an account?{' '}
            <Link to="/signin" className="font-semibold text-cyan-600 hover:underline">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
