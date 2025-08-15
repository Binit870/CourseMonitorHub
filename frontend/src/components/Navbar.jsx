import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faMoon, faSun, faBell } from '@fortawesome/free-solid-svg-icons';
import logo from '../assets/logo.png';

const Navbar = () => {
  const { user, logout, loading } = useAuth();
  const [search, setSearch] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') === 'dark';
    }
    return false;
  });
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
    if (typeof window !== 'undefined') {
      localStorage.setItem('theme', darkMode ? 'dark' : 'light');
    }
  }, [darkMode]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    const searchTerm = search.trim().toLowerCase();
    if (!searchTerm) return;
    const routeMap = { 'courses': '/courses', 'practice': '/practice', 'problem': '/problem', 'quiz': '/quiz', 'interview': '/interview', 'home': '/home', 'profile': '/profile', };
    if (routeMap[searchTerm]) {
      navigate(routeMap[searchTerm]);
    } else {
      navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
    }
    setSearch('');
    setMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    setDropdownOpen(false);
    setMenuOpen(false);
  };

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  const navTheme = 'bg-cyan-300 dark:bg-cyan-800';
  const textTheme = 'text-cyan-800 dark:text-cyan-200';
  const borderTheme = 'border-cyan-400 dark:border-cyan-700';

  if (loading) {
    return (
      <nav className={`${navTheme} text-white px-6 py-3 shadow-md`}>
        <div className="flex justify-between items-center container mx-auto">
          <span className="font-bold text-xl">CMH</span>
          <span>Loading...</span>
        </div>
      </nav>
    );
  }

  return (
    <nav className={`${navTheme} ${textTheme} relative px-4 py-3 sticky top-0 z-50 shadow-lg transition-colors duration-300`}>
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-bold text-xl">
          <img src={logo} alt="Logo" className="h-8 w-8" />
          <span>CMH</span>
        </Link>
        <div className="hidden md:flex gap-6 justify-center flex-1">
          <Link to="/home" className="hover:underline">Home</Link>
          <Link to="/courses" className="hover:underline">Courses</Link>
          <Link to="/practice" className="hover:underline">Practice</Link>
          <Link to="/problem" className="hover:underline">Problem</Link>
          <Link to="/quiz" className="hover:underline">Quiz</Link>
          <Link to="/interview" className="hover:underline">Interview</Link>
        </div>
        <div className="hidden md:flex items-center gap-4">
          <form onSubmit={handleSearch} className="relative">
            <input type="text" className="px-3 py-1 rounded bg-white/90 text-slate-800 placeholder-gray-500 w-48 focus:outline-none focus:ring-2 focus:ring-cyan-400 dark:bg-slate-800/50 dark:text-slate-200 dark:placeholder-gray-400 dark:focus:ring-cyan-300" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
          </form>
          <button onClick={() => navigate('/notifications')} className="w-10 h-10 rounded-full flex items-center justify-center transition text-lg bg-slate-200 text-gray-800 hover:bg-slate-300 dark:bg-slate-700 dark:text-cyan-200 dark:hover:bg-slate-600" aria-label="View notifications">
            <FontAwesomeIcon icon={faBell} />
          </button>
          <button onClick={toggleTheme} className="w-10 h-10 rounded-full flex items-center justify-center transition text-lg bg-slate-200 text-gray-800 hover:bg-slate-300 dark:bg-slate-700 dark:text-yellow-400 dark:hover:bg-slate-600" aria-label="Toggle theme">
            <FontAwesomeIcon icon={darkMode ? faSun : faMoon} />
          </button>
          {user ? (
            <div className="relative" ref={dropdownRef}>
              <button onClick={() => setDropdownOpen(!dropdownOpen)} className="w-10 h-10 rounded-full flex items-center justify-center transition text-2xl bg-slate-200 text-gray-800 hover:bg-slate-300 dark:bg-slate-700 dark:text-cyan-200 dark:hover:bg-slate-600" aria-label="Open user menu">
                <FontAwesomeIcon icon={faUserCircle} />
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 text-black dark:text-gray-200 rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5">
                  <Link to="/profile" onClick={() => setDropdownOpen(false)} className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700">My Profile</Link>
                  <Link to="/dashboard" onClick={() => setDropdownOpen(false)} className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700">Dashboard</Link>
                  <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700">
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/signin" className="font-semibold px-4 py-1.5 rounded-md transition bg-slate-200 text-cyan-800 hover:bg-slate-300 dark:bg-cyan-600 dark:text-white dark:hover:bg-cyan-500">
              Sign In
            </Link>
          )}
        </div>
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)} className="text-3xl" aria-label="Open main menu">
            {menuOpen ? '✖' : '☰'}
          </button>
        </div>
      </div>
      {menuOpen && (
        <div className="absolute top-full left-0 w-full md:hidden bg-cyan-300 dark:bg-cyan-800 shadow-lg p-4 flex flex-col gap-3">
          <form onSubmit={handleSearch}>
            <input type="text" className="w-full rounded bg-white/90 px-3 py-2 text-slate-800 placeholder-gray-500 focus:outline-none dark:bg-slate-800/50 dark:text-slate-200 dark:placeholder-gray-400" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
          </form>

          {/* ADDED MISSING LINKS HERE */}
          <Link to="/home" onClick={() => setMenuOpen(false)} className="block text-center rounded py-2 hover:bg-white/20 transition-colors">Home</Link>
          <Link to="/courses" onClick={() => setMenuOpen(false)} className="block text-center rounded py-2 hover:bg-white/20 transition-colors">Courses</Link>
          <Link to="/practice" onClick={() => setMenuOpen(false)} className="block text-center rounded py-2 hover:bg-white/20 transition-colors">Practice</Link>
          <Link to="/problem" onClick={() => setMenuOpen(false)} className="block text-center rounded py-2 hover:bg-white/20 transition-colors">Problem</Link>
          <Link to="/quiz" onClick={() => setMenuOpen(false)} className="block text-center rounded py-2 hover:bg-white/20 transition-colors">Quiz</Link>
          <Link to="/interview" onClick={() => setMenuOpen(false)} className="block text-center rounded py-2 hover:bg-white/20 transition-colors">Interview</Link>

          <hr className={borderTheme} />

          {user ? (
            <>
              <Link to="/notifications" onClick={() => setMenuOpen(false)} className="block text-center rounded py-2 hover:bg-white/20 transition-colors">Notifications</Link>
              <Link to="/profile" onClick={() => setMenuOpen(false)} className="block text-center rounded py-2 hover:bg-white/20 transition-colors">My Profile</Link>
              <Link to="/dashboard" onClick={() => setMenuOpen(false)} className="block text-center rounded py-2 hover:bg-white/20 transition-colors">Dashboard</Link>
              <button onClick={handleLogout} className="w-full text-center rounded py-2 hover:bg-white/20 transition-colors">Logout</button>
            </>
          ) : (
            <Link to="/signin" onClick={() => setMenuOpen(false)} className="block font-semibold px-3 py-2 rounded text-center transition bg-slate-200 text-cyan-800 hover:bg-slate-300 dark:bg-cyan-600 dark:text-white dark:hover:bg-cyan-500">
              Sign In
            </Link>
          )}
          <button onClick={toggleTheme} className="flex items-center justify-center gap-2 w-full rounded py-2 mt-2 hover:bg-white/20 transition-colors">
            <FontAwesomeIcon icon={darkMode ? faSun : faMoon} />
            <span>{darkMode ? 'Light Mode' : 'Dark Mode'}</span>
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;