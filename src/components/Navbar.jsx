// src/components/Navbar.jsx
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaCalculator, FaUser, FaSignOutAlt, FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const dropdown = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const user = localStorage.getItem('taxUser');
    setIsLoggedIn(!!user);
  }, [location]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      if (scrollTop > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('taxUser');
    setIsLoggedIn(false);
    navigate('/');
    setMobileMenuOpen(false);
    setIsOpen(false);
  };

  // Navbar classes based on scroll state
  const navbarClasses = `fixed top-0 w-full z-50 transition-all duration-300 ${
    isScrolled 
      ? 'bg-gradient-to-r from-teal-600 to-teal-800 shadow-lg' 
      : 'bg-transparent'
  }`;

  // Text color classes based on scroll state
  const textColorClass = isScrolled ? 'text-white' : 'text-teal-700';
  const hoverTextColorClass = isScrolled ? 'hover:text-teal-200' : 'hover:text-teal-900';
  const iconColorClass = isScrolled ? 'text-white' : 'text-teal-700';

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={navbarClasses}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-3">
              <FaCalculator className={`h-8 w-8 transition-colors duration-300 ${iconColorClass}`} />
              <span className={`text-2xl font-bold transition-colors duration-300 ${textColorClass}`}>
                NaijaTax
              </span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={`px-3 py-2 rounded-md text-lg font-medium transition duration-300 ${textColorClass} ${hoverTextColorClass}`}
            >
              Home
            </Link>

            {isLoggedIn ? (
              <div className="flex relative">
                <button
                  onClick={dropdown}
                  className={`w-10 h-10 cursor-pointer flex rotate-45 items-center justify-center rounded-sm transition duration-300 ${
                    isScrolled 
                      ? 'bg-white hover:bg-teal-100' 
                      : 'bg-teal-700 hover:bg-teal-800'
                  }`}
                >
                  <FaUser className={`p-1 absolute rotate-[-45deg] text-2xl font-bold transition-colors duration-300 ${
                    isScrolled ? 'text-teal-800' : 'text-white'
                  }`} />
                </button>

                {/* Dropdown Menu */}
                {isOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="origin-top-right absolute top-14 right-0 mt-2 w-48 border border-gray-200 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
                  >
                    <div className='p-2 grid grid-cols-1 gap-1'>
                      <Link
                        to="/dashboard"
                        className="text-teal-800 w-full hover:bg-teal-500 hover:text-white px-3 py-2 rounded-md text-lg font-medium transition duration-300 flex items-center space-x-2"
                        onClick={() => setIsOpen(false)}
                      >
                        Dashboard
                      </Link>
                      
                      <Link
                        to="/application"
                        className="text-teal-800 w-full hover:bg-teal-500 hover:text-white px-3 py-2 rounded-md text-lg font-medium transition duration-300 flex items-center space-x-2"
                        onClick={() => setIsOpen(false)}
                      >
                        Start Tax Filing
                      </Link>
                      
                      <button
                        onClick={handleLogout}
                        className="text-teal-800 cursor-pointer w-full hover:bg-teal-500 hover:text-white px-3 py-2 rounded-md text-lg font-medium transition duration-300 flex items-center space-x-2 text-left"
                      >
                        <FaSignOutAlt className="w-4 h-4" />
                        <span>Logout</span>
                      </button>
                    </div>
                  </motion.div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className={`px-3 py-2 rounded-md text-lg font-medium transition duration-300 ${textColorClass} ${hoverTextColorClass}`}
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className={`px-6 py-2 rounded-lg font-semibold transition duration-300 ${
                    isScrolled
                      ? 'bg-white text-teal-600 hover:bg-teal-50'
                      : 'bg-teal-700 text-white hover:bg-teal-800'
                  }`}
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`hover:opacity-70 transition duration-300 ${textColorClass}`}
            >
              {mobileMenuOpen ? (
                <FaTimes className="h-6 w-6" />
              ) : (
                <FaBars className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`md:hidden border-t ${
              isScrolled 
                ? 'bg-teal-700 border-teal-500' 
                : 'bg-white/95 backdrop-blur-sm border-teal-200'
            }`}
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link
                to="/"
                className={`block px-3 py-2 rounded-md text-base font-medium transition duration-300 ${
                  isScrolled ? 'text-white' : 'text-teal-700 hover:bg-teal-50'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>

              {isLoggedIn ? (
                <>
                  <Link
                    to="/dashboard"
                    className={`block px-3 py-2 rounded-md text-base font-medium transition duration-300 ${
                      isScrolled ? 'text-white' : 'text-teal-700 hover:bg-teal-50'
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/application"
                    className={`block px-3 py-2 rounded-md text-base font-medium transition duration-300 ${
                      isScrolled ? 'text-white' : 'text-teal-700 hover:bg-teal-50'
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Start Tax Filing
                  </Link>
                  <button
                    onClick={handleLogout}
                    className={`block px-3 py-2 rounded-md text-base font-medium w-full text-left transition duration-300 ${
                      isScrolled ? 'text-white' : 'text-teal-700 hover:bg-teal-50'
                    }`}
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className={`block px-3 py-2 rounded-md text-base font-medium transition duration-300 ${
                      isScrolled ? 'text-white' : 'text-teal-700 hover:bg-teal-50'
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className={`block px-3 py-2 rounded-md text-base font-medium transition duration-300 ${
                      isScrolled ? 'text-white' : 'text-teal-700 hover:bg-teal-50'
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
};

export default Navbar;