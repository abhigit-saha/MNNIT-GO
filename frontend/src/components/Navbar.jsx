import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  const [sticky, setSticky] = useState(false);
  const [submenuOpen, setSubmenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setSticky(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className={`navbar-container border-0 ${
      sticky 
        ? "sticky-navbar duration-300 transition-all ease-in-out bg-black/70 backdrop-blur-sm border-0" 
        : "bg-gradient-to-r from-black/40 via-black/60 to-black/40 border-0"
    }`}>
      <div className="max-w-[1400px] mx-auto px-4 border-0">
        <div className="flex flex-wrap items-center justify-between h-16 border-0">
          
          <div className="flex-1 flex justify-start">
            <button 
              className="p-2 rounded-full hover:bg-white/10 transition-all duration-300 border border-white/10"
              onClick={() => setSubmenuOpen(!submenuOpen)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h7"
                />
              </svg>
            </button>
          </div>

          <div className="flex-1 flex justify-center">
            <Link
              to="/"
              className="text-2xl font-semibold text-white tracking-wider hover:text-gray-200 transition-colors duration-300 border-b-2 border-transparent hover:border-white/30 px-4 py-1"
            >
              Scavenger Hunt
            </Link>
          </div>

          <div className="flex-1 flex justify-end items-center space-x-4">
            <button className="p-2 rounded-full hover:bg-white/10 transition-all duration-300 border border-white/10">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>

            <Link
              to="/login"
              className="px-6 py-2 rounded-full text-white border border-white/30 hover:bg-white/10 transition-all duration-300 backdrop-blur-sm hover:border-white/50"
            >
              Login
            </Link>
          </div>
        </div>

        {submenuOpen && (
          <div className="absolute left-4 top-20 w-48 border border-white/20 bg-black/80 backdrop-blur-sm rounded-lg shadow-lg py-2 px-3">
            <Link to="/" className="block py-2 text-white hover:text-gray-300">Home</Link>
            <Link to="/locations" className="block py-2 text-white hover:text-gray-300">Locations</Link>
            <Link to="/hunts" className="block py-2 text-white hover:text-gray-300">Hunts</Link>
            <Link to="/portfolio" className="block py-2 text-white hover:text-gray-300">Portfolio</Link>
            <Link to="/about" className="block py-2 text-white hover:text-gray-300">About</Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;