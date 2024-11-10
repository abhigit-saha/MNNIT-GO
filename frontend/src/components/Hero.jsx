import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import pandaImage from "../assets/cute_panda_preview_rev_1.png";

function Hero() {
  const navigate = useNavigate();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hexagons, setHexagons] = useState([]);

  const handleGetStarted = () => {
    navigate("/login");
  };

  // Update mouse position on move
  useEffect(() => {
    const handleMouseMove = (event) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // Handle mouse click to trigger multiple hexagons
  const handleMouseClick = (event) => {
    const newHexagons = Array.from({ length: 5 }).map((_, index) => ({
      id: `${Date.now()}-${index}`,
      x: event.clientX,
      y: event.clientY,
    }));
    setHexagons((prev) => [...prev, ...newHexagons]);

    // Remove hexagons after animation ends
    setTimeout(() => {
      setHexagons((prev) => prev.filter((hex) => !newHexagons.includes(hex)));
    }, 1000); // Adjust timing as needed for animation duration
  };

  return (
    <div
      className="min-h-screen bg-backgroundDark flex flex-col items-center justify-center p-8 md:p-16 relative overflow-hidden"
      onClick={handleMouseClick} // Add click event for hexagons
    >
      {/* Framer Motion Magic Wand Effect */}
      <motion.div
        className="fixed w-8 h-8 bg-neonPink rounded-full pointer-events-none mix-blend-difference"
        animate={{
          x: mousePosition.x,
          y: mousePosition.y + 16, // Adjusted wand position below the cursor
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 30,
        }}
      />

      {/* Hexagon Animation on Click */}
      <AnimatePresence>
        {hexagons.map((hex, index) => (
          <motion.div
            key={hex.id}
            className="fixed w-8 h-8 bg-neonPink opacity-70"
            style={{
              clipPath:
                "polygon(25% 6.7%, 75% 6.7%, 100% 50%, 75% 93.3%, 25% 93.3%, 0% 50%)", // Hexagon shape
              top: hex.y,
              left: hex.x,
            }}
            initial={{
              scale: 0,
              opacity: 1,
              rotate: Math.random() * 360, // Random rotation for crisscross effect
            }}
            animate={{
              scale: [1, 1.5, 0],
              x: [0, (Math.random() - 0.5) * 200],
              y: [0, (Math.random() - 0.5) * 200],
              opacity: 0,
            }}
            transition={{
              duration: 1,
              ease: "easeOut",
            }}
            exit={{ opacity: 0 }}
          />
        ))}
      </AnimatePresence>

      {/* Main Content Wrapper */}
      <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-6xl space-y-8 md:space-y-0">
        {/* Left Description */}
        <div className="text-left w-full md:w-1/3 space-y-4">
          <span className="text-xs font-semibold text-neonPink uppercase tracking-wide">
            NEW
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold text-textLight leading-tight">
            Join the <span className="text-neonPink">scAvengers</span> platform
            for <span className="text-neonPurple">everyone</span>.
          </h1>
          <p className="text-lg text-textLight">
            Explore our college resources, participate in events, and enjoy the
            thrill of the hunt!
          </p>
          <button
            onClick={handleGetStarted}
            className="mt-4 px-6 py-3 bg-neonPink text-backgroundDark font-semibold rounded-lg shadow-lg hover:bg-neonPurple transition"
          >
            Get Started
          </button>
        </div>

        {/* Center Panda Image with Transparent Background */}
        <div className="w-full md:w-1/3 flex justify-center items-center">
          <img
            src={pandaImage}
            alt="Panda Character"
            className="w-full max-w-xs h-auto"
          />
        </div>

        {/* Right Description */}
        <div className="text-left w-full md:w-1/3 space-y-6">
          <h2 className="text-xl font-semibold mb-4 text-neonPink">
            Upcoming Events
          </h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-lg">Join us for:</h3>
              <p className="text-sm text-textLight">
                Explore various college resources and events.
              </p>
            </div>
            <div className="border-t border-neonPurple pt-4">
              <h3 className="font-semibold text-lg text-neonPurple">
                Available Events
              </h3>
              <div className="grid grid-cols-1 gap-2 mt-2 text-center">
                <Link to="/hunts/6725d24bca4da6131cffda4c">
                  <div className="p-2 rounded-lg bg-backgroundDark text-neonPink border border-neonPink">
                    Central Library
                  </div>
                </Link>
                <Link to="/hunts/6725d24bca4da6131cffda4a">
                  <div className="p-2 rounded-lg bg-backgroundDark text-neonPink border border-neonPink">
                    Admin Building
                  </div>
                </Link>
                <Link to="/hunts/6725d24bca4da6131cffda4b">
                  <div className="p-2 rounded-lg bg-backgroundDark text-neonPink border border-neonPink">
                    Cafe 96
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
