import React from 'react';
import { Link } from 'react-router-dom';
import { FaTwitter, FaLinkedin, FaGithub, FaHeart, FaEnvelope, FaCode, FaUsers } from 'react-icons/fa';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  

  const socialLinks = [
    { icon: <FaTwitter />, name: 'Twitter', url: '#' },
    { icon: <FaLinkedin />, name: 'LinkedIn', url: '#' },
    { icon: <FaGithub />, name: 'GitHub', url: '#' },
    { icon: <FaEnvelope />, name: 'Email', url: '#' }
  ];

  return (
    <footer className="bg-slate-900/80 backdrop-blur-2xl border-t border-white/10">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center space-x-3 mb-6 group">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <FaUsers className="text-white text-xl" />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                  Gather
                </span>
                <span className="text-sm text-slate-400 -mt-1">Community Platform</span>
              </div>
            </Link>
            
            <p className="text-slate-300 leading-relaxed mb-6 text-lg">
              Connect, share, and engage with a vibrant community of creators and thinkers. 
              Your platform for meaningful conversations.
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  className="w-12 h-12 bg-white/5 hover:bg-gradient-to-r hover:from-blue-500 hover:to-cyan-400 border border-white/10 hover:border-transparent rounded-2xl flex items-center justify-center text-slate-400 hover:text-white transition-all duration-300 transform hover:scale-110 group"
                  aria-label={social.name}
                >
                  <span className="text-lg group-hover:scale-110 transition-transform duration-300">
                    {social.icon}
                  </span>
                </a>
              ))}
            </div>
          </div>

          
        <div className=" col-span-2">
          <div className="max-w-md mx-auto text-center">
            <h3 className="text-xl font-bold text-white mb-4">Stay Updated</h3>
            <p className="text-slate-300 mb-6">
              Get the latest updates and community insights delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300"
              />
              <button className="bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </div>
        </div>

        {/* Newsletter Subscription */}
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Copyright */}
            <div className="text-slate-400 text-sm">
              © {currentYear} Gather.
              for the community.
            </div>

          </div>
        </div>
      </div>

      {/* Gradient Accent */}
      <div className="h-1 bg-gradient-to-r from-blue-500 to-cyan-400"></div>
    </footer>
  );
}