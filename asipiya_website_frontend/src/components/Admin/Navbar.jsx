import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logoWhite from '../../assets/logoWhite.png'; // Replace with white or dark logo as needed

const Navbar = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    navigate('/');
  };

  const navItems = [
    { label: 'Client Logo', to: '/admin/client-logo' },
    { label: 'Client Review', to: '/admin/client-review' },
    { label: 'Blogs', to: '/admin/blog' },
    { label: 'Comments', to: '/admin/comments' },
    { label: 'Career', to: '/admin/careers' },
    { label: 'Job Applications', to: '/admin/applications' },
  ];

  return (
    <nav className="bg-gray-900 text-white fixed top-0 left-0 w-full z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-[70px] flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center flex-shrink-0">
          <Link to="/admin/home" className="flex items-center">
            <img src={logoWhite} alt="Logo" className="h-[48px] sm:h-[60px]" />
          </Link>
        </div>

        {/* Nav Center */}
        <div className="hidden md:flex flex-1 justify-center space-x-6">
          {navItems.map((item) => (
            <Link
              key={item.label}
              to={item.to}
              className="text-white hover:text-purple-600 font-bold text-lg transition-colors duration-200"
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Logout Button */}
        <div className="hidden md:flex justify-end">
          <button
            onClick={handleLogout}
            className="bg-purple-600 hover:bg-purple-700 text-white font-medium px-4 py-2 rounded-full transition duration-200"
          >
            Logout
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="focus:outline-none"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2"
              viewBox="0 0 24 24">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-gray-800 px-4 py-3 space-y-2 shadow">
          {navItems.map((item) => (
            <Link
              key={item.label}
              to={item.to}
              onClick={() => setMenuOpen(false)}
              className="block text-white hover:text-purple-600 font-medium py-1"
            >
              {item.label}
            </Link>
          ))}
          <button
            onClick={() => {
              setMenuOpen(false);
              handleLogout();
            }}
            className="w-full text-left bg-purple-600 hover:bg-purple-700 text-white font-medium px-4 py-2 rounded-full transition duration-200"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
