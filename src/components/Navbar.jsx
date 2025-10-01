import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { 
  FaHome, 
  FaUsers, 
  FaPlus, 
  FaUser, 
  FaSignOutAlt, 
  FaComments, 
  FaSearch, 
  FaTimes,
  FaBars,
  FaTimesCircle
} from 'react-icons/fa';

export default function Navbar() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const mobileMenuRef = useRef(null);
  const hamburgerButtonRef = useRef(null);

  const navItems = [
    { path: '/', label: 'Home', icon: <FaHome className="text-lg" /> },
    { path: '/create-post', label: 'Create Post', icon: <FaPlus className="text-lg" /> },
    { path: '/profile', label: 'Profile', icon: <FaUser className="text-lg" /> },
  ];

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMobileMenuOpen && 
          mobileMenuRef.current && 
          !mobileMenuRef.current.contains(event.target) &&
          hamburgerButtonRef.current &&
          !hamburgerButtonRef.current.contains(event.target)) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMobileMenuOpen]);

  // Search functionality
  useEffect(() => {
    if (searchQuery.trim().length > 0) {
      setIsSearching(true);
      const timeoutId = setTimeout(() => {
        performSearch(searchQuery.trim());
        setIsSearching(false);
      }, 300);

      return () => clearTimeout(timeoutId);
    } else {
      setSearchResults([]);
      setShowResults(false);
      setIsSearching(false);
    }
  }, [searchQuery]);

  const performSearch = (query) => {
    const allPosts = JSON.parse(localStorage.getItem('socialMediaPosts') || '[]');
    const allUsers = JSON.parse(localStorage.getItem('socialMediaUsers') || '[]');
    
    const lowerQuery = query.toLowerCase();

    // Search in posts
    const postResults = allPosts
      .filter(post => 
        post.title.toLowerCase().includes(lowerQuery) ||
        post.content.toLowerCase().includes(lowerQuery)
      )
      .map(post => ({
        type: 'post',
        id: post.id,
        title: post.title,
        content: post.content.substring(0, 100) + '...',
        user: allUsers.find(u => u.id === post.userId)?.name || 'Unknown User',
        image: post.image
      }));

    // Search in users
    const userResults = allUsers
      .filter(user => 
        user.name.toLowerCase().includes(lowerQuery) ||
        user.email.toLowerCase().includes(lowerQuery)
      )
      .map(user => ({
        type: 'user',
        id: user.id,
        name: user.name,
        email: user.email,
        bio: user.bio ? user.bio.substring(0, 80) + '...' : 'No bio available'
      }));

    const results = [...postResults, ...userResults].slice(0, 8);
    setSearchResults(results);
    setShowResults(results.length > 0);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setShowResults(false);
      setSearchQuery('');
      setIsMobileMenuOpen(false);
    }
  };

  const handleResultClick = (result) => {
    if (result.type === 'post') {
      navigate(`/post/${result.id}`);
    } else if (result.type === 'user') {
      navigate(`/profile`);
    }
    setShowResults(false);
    setSearchQuery('');
    setIsMobileMenuOpen(false);
  };

  const clearSearch = () => {
    setSearchQuery('');
    setShowResults(false);
    setSearchResults([]);
  };

  const toggleMobileMenu = () => {
    console.log('Toggle mobile menu clicked'); // Debug log
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const getNavItemClass = (path) => {
    const isActive = location.pathname === path;
    return `flex items-center space-x-3 px-6 py-3 rounded-2xl text-sm font-semibold transition-all duration-300 transform hover:scale-105 ${
      isActive
        ? 'bg-gradient-to-r from-blue-500 to-cyan-400 text-white shadow-lg shadow-blue-500/25'
        : 'text-slate-300 hover:text-white hover:bg-white/10'
    }`;
  };

  const getMobileNavItemClass = (path) => {
    const isActive = location.pathname === path;
    return `flex items-center space-x-4 px-6 py-4 rounded-2xl text-base font-semibold transition-all duration-300 ${
      isActive
        ? 'bg-gradient-to-r from-blue-500 to-cyan-400 text-white shadow-lg shadow-blue-500/25'
        : 'text-slate-300 hover:text-white hover:bg-white/10'
    }`;
  };

  return (
    <nav className="bg-slate-900/80 backdrop-blur-2xl border-b border-white/10 fixed top-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
              <FaUsers className="text-white text-lg" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                Gather
              </span>
              <span className="text-xs text-slate-400 -mt-1">Community Platform</span>
            </div>
          </Link>

          {/* Desktop Navigation Items */}
          <div className="hidden md:flex items-center space-x-2 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={getNavItemClass(item.path)}
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            ))}
          </div>

          {/* Desktop User Menu */}
          <div className="hidden md:flex lg:flex items-center space-x-4">
            {/* Search Bar */}
            <div className="relative">
              <form onSubmit={handleSearchSubmit} className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaSearch className="text-slate-400 text-sm" />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search posts..."
                  className="w-64 pl-10 pr-10 py-2 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={clearSearch}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-white transition-colors"
                  >
                    <FaTimes className="text-sm" />
                  </button>
                )}
              </form>

              {/* Search Results Dropdown */}
              {showResults && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-slate-800/95 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-50">
                  <div className="p-2 max-h-96 overflow-y-auto">
                    {isSearching ? (
                      <div className="flex items-center justify-center py-8">
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-cyan-400"></div>
                        <span className="ml-3 text-slate-300">Searching...</span>
                      </div>
                    ) : (
                      <>
                        <div className="px-3 py-2">
                          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                            Results for "{searchQuery}"
                          </div>
                        </div>
                        
                        {searchResults.map((result, index) => (
                          <button
                            key={`${result.type}-${result.id}-${index}`}
                            onClick={() => handleResultClick(result)}
                            className="w-full text-left p-3 hover:bg-white/10 rounded-xl transition-all duration-200 group"
                          >
                            <div className="flex items-start space-x-3">
                              <div className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 ${
                                result.type === 'post' 
                                  ? 'bg-blue-500/20 text-blue-400' 
                                  : 'bg-cyan-500/20 text-cyan-400'
                              }`}>
                                {result.type === 'post' ? <FaComments /> : <FaUser />}
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between">
                                  <h4 className="font-semibold text-white group-hover:text-cyan-300 transition-colors truncate">
                                    {result.type === 'post' ? result.title : result.name}
                                  </h4>
                                  <span className={`text-xs px-2 py-1 rounded-full ${
                                    result.type === 'post' 
                                      ? 'bg-blue-500/20 text-blue-400' 
                                      : 'bg-cyan-500/20 text-cyan-400'
                                  }`}>
                                    {result.type}
                                  </span>
                                </div>
                                <p className="text-slate-400 text-sm mt-1 line-clamp-2">
                                  {result.type === 'post' ? result.content : result.bio}
                                </p>
                                <div className="flex items-center space-x-2 mt-2">
                                  <span className="text-xs text-slate-500">
                                    {result.type === 'post' ? `by ${result.user}` : result.email}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </button>
                        ))}
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* User Info */}
            <div className="flex items-center space-x-3 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 px-4 py-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-2xl flex items-center justify-center">
                <span className="text-white font-bold text-sm">
                  {user?.name?.charAt(0).toUpperCase()}
                </span>
              </div>
              <div>
                <div className="text-sm font-semibold text-white">{user?.name}</div>
                <div className="text-xs text-slate-400">Online</div>
              </div>
            </div>

            {/* Logout Button */}
            <button
              onClick={logout}
              className="flex items-center space-x-2 bg-white/10 hover:bg-red-500/20 text-slate-300 hover:text-red-400 border border-white/10 hover:border-red-400/30 px-4 py-2 rounded-xl transition-all duration-300 transform hover:scale-105 group"
            >
              <FaSignOutAlt className="text-sm group-hover:rotate-180 transition-transform duration-500" />
              <span className="font-semibold">Logout</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center space-x-3">
            {/* Mobile Search Button */}
            <button
              onClick={() => setShowResults(!showResults)}
              className="w-10 h-10 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-slate-300 hover:text-white transition-all duration-300"
            >
              <FaSearch className="text-lg" />
            </button>

            {/* Hamburger Menu Button */}
            <button
              ref={hamburgerButtonRef}
              onClick={toggleMobileMenu}
              className="w-10 h-10 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-slate-300 hover:text-white transition-all duration-300"
            >
              {isMobileMenuOpen ? (
                <FaTimes className="text-lg" />
              ) : (
                <FaBars className="text-lg" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className={`md:hidden pb-4 transition-all duration-300 ${showResults ? 'block' : 'hidden'}`}>
          <form onSubmit={handleSearchSubmit} className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-slate-400 text-sm" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search posts, users, topics..."
              className="w-full pl-10 pr-10 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={clearSearch}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-white transition-colors"
              >
                <FaTimes className="text-sm" />
              </button>
            )}
          </form>

          {/* Mobile Search Results */}
          {showResults && searchQuery && (
            <div className="absolute left-4 right-4 mt-2 bg-slate-800/95 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-40">
              <div className="p-2 max-h-80 overflow-y-auto">
                {isSearching ? (
                  <div className="flex items-center justify-center py-6">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-cyan-400"></div>
                    <span className="ml-3 text-slate-300">Searching...</span>
                  </div>
                ) : (
                  <>
                    {searchResults.map((result, index) => (
                      <button
                        key={`${result.type}-${result.id}-${index}`}
                        onClick={() => handleResultClick(result)}
                        className="w-full text-left p-3 hover:bg-white/10 rounded-xl transition-all duration-200 group border-b border-white/5 last:border-b-0"
                      >
                        <div className="flex items-center space-x-3">
                          <div className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 ${
                            result.type === 'post' 
                              ? 'bg-blue-500/20 text-blue-400' 
                              : 'bg-cyan-500/20 text-cyan-400'
                          }`}>
                            {result.type === 'post' ? <FaComments /> : <FaUser />}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-white group-hover:text-cyan-300 transition-colors truncate text-sm">
                              {result.type === 'post' ? result.title : result.name}
                            </h4>
                            <p className="text-slate-400 text-xs mt-1 line-clamp-1">
                              {result.type === 'post' ? result.content : result.bio}
                            </p>
                          </div>
                        </div>
                      </button>
                    ))}
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 z-40 md:hidden transition-all duration-300 ${
        isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
      }`}>
        {/* Backdrop */}
        <div 
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
        />
        
        {/* Menu Panel */}
        <div 
          ref={mobileMenuRef}
          className={`absolute top-0 right-0 h-full w-full bg-slate-900 backdrop-blur-2xl border-l border-white/10 transform transition-transform duration-300 ${
            isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          {/* Menu Header */}
          <div className="p-6 border-b bg-slate-900 border-white/10">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-2xl flex items-center justify-center">
                  <span className="text-white font-bold text-lg">
                    {user?.name?.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div>
                  <div className="text-lg font-bold text-white">{user?.name}</div>
                  <div className="text-sm text-slate-400">Online</div>
                </div>
              </div>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-10 h-10 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-slate-300 hover:text-white transition-all duration-300"
              >
                <FaTimes className="text-lg" />
              </button>
            </div>
          </div>

          {/* Navigation Items */}
          <div className="p-6 bg-slate-900 space-y-3">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={getMobileNavItemClass(item.path)}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            ))}
          </div>



          {/* Logout Button */}
          <div className="bottom-6 rounded-b-md flex items-center justify-center bg-slate-900 left-6 right-6">
            <button
              onClick={() => {
                logout();
                setIsMobileMenuOpen(false);
              }}
              className="w-[80%] my-2 flex items-center justify-center space-x-3 bg-white/10  text-slate-300  border border-white/10 px-6 py-4 cursor-pointer rounded-xl transition-all duration-300 transform  group"
            >
              <FaSignOutAlt className="text-lg group-hover:rotate-180 transition-transform duration-500" />
              <span className="font-semibold text-lg">Logout</span>
            </button>
          </div>
        </div>
      </div>

      {/* Active Page Indicator */}
      <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-500 to-cyan-400 opacity-50" />
    </nav>
  );
}