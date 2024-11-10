import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";

function Navbar() {
  const [sticky, setSticky] = useState(false);
  const logoRef = useRef(null);

  // Handle scroll for sticky navbar
  useEffect(() => {
    const handleScroll = () => {
      setSticky(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Use GSAP for blinking effect on "Scavenger Hunt"
  useEffect(() => {
    if (logoRef.current) {
      gsap.to(logoRef.current, {
        opacity: 0,
        duration: 0.6,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
      });
    }
  }, []);

  return (
    <div
      className={`top-0 w-full transition-all duration-300 ease-in-out ${
        sticky ? "bg-backgroundDark shadow-md" : "bg-transparent"
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo Section */}
          <div className="flex-1 flex justify-start">
            <Link
              to="/"
              className="text-2xl font-semibold tracking-wider text-neonPink transition duration-300"
              ref={logoRef} // Reference for GSAP
            >
              Scavenger Hunt
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="flex items-center space-x-6">
            {["Home", "Locations", "Hunts", "About Us", "Premium"].map(
              (item, index) => (
                <Link
                  key={index}
                  to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                  className="text-textLight hover:text-neonPink transition duration-300 hover:bg-yellow-300 rounded-full px-2 py-1"
                >
                  {item}
                </Link>
              )
            )}
          </div>

          {/* Right Section (Search and Login) */}
          <div className="flex-1 flex justify-end items-center space-x-4">
            {/* Search Button */}
            <button className="p-2 rounded-full hover:bg-gray-200 transition-all duration-300 border border-transparent hover:border-yellow-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-neonPink"
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

            {/* Login Button */}
            <Link
              to="/login"
              className="px-4 py-2 rounded-full text-white border border-neonPink bg-neonPink hover:bg-transparent hover:text-neonPink transition-all duration-300"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
