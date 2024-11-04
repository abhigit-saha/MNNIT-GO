// components/Layout.js
import React from "react";
import { Link } from "react-router-dom";

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100">
      {/* Banner Message */}
      <div className="w-full bg-blue-600 text-white text-center py-3">
        <Link to="/unoffhunts" className="text-lg font-semibold hover:underline">
          Join the Winter Hunt
        </Link>
      </div>
      
      {/* Main Content */}
      <div className="w-full max-w-4xl mt-4 p-4 bg-white shadow-lg rounded-lg">
        {children}
      </div>
    </div>
  );
};

export default Layout;
