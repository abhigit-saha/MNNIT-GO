import React from "react";
import { Link } from "react-router-dom";

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col items-center bg-darkPurple text-textLight font-orbitron">
      {/* Cyberpunk Banner Message */}
      <div className="w-full bg-gradient-to-r from-neonPink via-neonPurple to-cyberBlue text-center py-4 shadow-cyber border-b border-neonPink">
        <Link
          to="/unoffhunts"
          className="text-lg font-bold uppercase tracking-wider neon-text-effect hover:underline"
        >
          Join the Winter Hunt
        </Link>
      </div>

      {/* Main Content with Cyberpunk Styling */}
      <div className="w-full max-w-4xl mt-8 p-8 bg-backgroundDark rounded-xl shadow-xl border border-neonPink relative overflow-hidden neon-border">
        {/* Glitch Effect Background */}
        <div className="absolute inset-0 bg-glitch opacity-10 pointer-events-none" />

        {/* Decorative Neon Glow Borders */}
        <div className="absolute top-0 left-0 h-full w-full pointer-events-none">
          <div className="w-full h-full border-t border-l border-neonPink animate-pulse" />
        </div>
        <div className="absolute bottom-0 right-0 h-full w-full pointer-events-none">
          <div className="w-full h-full border-b border-r border-cyberBlue animate-pulse" />
        </div>

        {/* Children Content */}
        <div className="relative z-10">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
