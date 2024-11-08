import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

function Hero() {
  const navigate = useNavigate(); // Initialize the navigate function

  const handleGetStarted = () => {
    navigate('/login'); // Redirect to the login page
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row items-center justify-between p-8 md:p-16">
      {/* Left Side - Text Content */}
      <div className="text-left w-full md:w-1/2 lg:w-2/5 space-y-6">
        <span className="text-xs font-semibold text-green-600 uppercase tracking-wide">NEW</span>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
          College <span className="text-black font-extrabold">Hunting</span> for <span className="text-black font-extrabold">everyone</span>.
        </h1>
        <p className="text-lg text-gray-700">
          Meet <span className="font-bold text-black">scAvengers</span>, the hunting platform for everyone. Have fun in College and
         <span className="font-bold text-white bg-gradient-to-r from-yellow-400 to-red-500 px-2 py-1 rounded-md shadow-lg animate-pulse">
            Claim Offers
           </span>
             too!
             </p>
        <button 
          onClick={handleGetStarted} // Add onClick handler
          className="mt-4 px-6 py-3 bg-black text-white font-semibold rounded-lg shadow-lg hover:bg-gray-800 transition"
        >
          Get Started
        </button>
        {/* Additional badges if needed */}
        <div className="flex space-x-2 mt-4">
          <span className="text-xs font-medium text-gray-500">Powered by top universities</span>
          {/* Example icons can be added here */}
        </div>
      </div>

      {/* Right Side - Events Container */}
      <div className="bg-white w-full md:w-1/2 lg:w-2/5 mt-10 md:mt-0 p-8 rounded-lg shadow-lg text-gray-800 border-2 border-black">
        <h2 className="text-xl font-semibold mb-4">Upcoming Events</h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-lg">Join us for:</h3>
            <p className="text-sm text-gray-600">Explore various college resources and events.</p>
          </div>
          <div className="border-t pt-4">
            <h3 className="font-semibold text-lg">Available Events</h3>
            <div className="grid grid-cols-1 gap-2 mt-2 text-center">
              <Link
              to='/hunts/6725d24bca4da6131cffda4c'
              >
              <div className="p-2 rounded-lg bg-gray-100">Central Library</div>
              </Link>
              <Link
              to='/hunts/6725d24bca4da6131cffda4a'>
              <div className="p-2 rounded-lg bg-gray-100">Admin Building</div>
              </Link>
              <Link
              to='/hunts/6725d24bca4da6131cffda4b'>
              <div className="p-2 rounded-lg bg-gray-100">Cafe 96</div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
