import React from 'react';
import {Link} from 'react-router-dom'

function About() {
  return (
    <div className="flex flex-col items-center bg-gray-50 py-10 px-5">
      {/* Header Section */}
      <div className="text-4xl font-bold text-gray-800 mb-6">About Our Scavenger Hunt App</div>
      
      {/* Introduction Section */}
      <div className="max-w-3xl text-center text-gray-700 mb-10">
        <p>
          Welcome to our innovative Scavenger Hunt App! Whether you're looking for a fun adventure, team-building activity, or just want to explore your city, we've got you covered. 
          Our platform allows users to participate in exciting, pre-designed hunts or create their own customized hunts.
        </p>
      </div>
      
      {/* Features Section */}
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-md p-8 mb-2">
        <h2 className="text-2xl  font-semibold text-gray-800 mb-4 text-center">Features of Our App</h2>
        <ul className="list-disc list-inside text-gray-600">
          <li className="mb-2">
            <strong>Join Pre-Defined Hunts:</strong> Dive into various themed scavenger hunts designed by our team for different locations.
          </li>
          <li className="mb-2">
            <strong>Create Your Own Hunt:</strong> Unlock your creativity by designing your own scavenger hunts with customized clues and locations.
          </li>
          <li className="mb-2">
            <strong>Premium Membership:</strong> Enjoy exclusive features by subscribing to our premium plan for just <span className="text-green-600 font-bold">₹499</span>. 
            Create unlimited hunts, access exclusive content, and more!
          </li>
          <li className="mb-2">
            <strong>Claim Rewards:</strong> Participate in hunts to win exciting offers from our partner cafes and stores.
          </li>
        </ul>
      </div>

      {/* Premium Section */}
      <div className="max-w-3xl bg-indigo-100 rounded-lg shadow p-6 mb-10 text-center">
        <h3 className="text-xl font-bold text-indigo-800 mb-3">Go Premium for Only ₹499</h3>
        <p className="text-gray-700 mb-5">
          Upgrade to our premium plan to get the best experience. Create unlimited custom hunts, access special offers, and enjoy ad-free gameplay.
        </p>
        <Link to='/premium'
        className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition duration-300">
          Get Premium
        </Link>
      </div>
      
      {/* Sponsors Section */}
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-md p-8 mb-10">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Our Sponsors</h2>
        <div className="flex flex-wrap justify-center gap-8">
          {/* Sponsor 1 */}
          <div className="flex flex-col items-center">
            <img src="https://via.placeholder.com/150" alt="Yamuna Cafe" className="h-24 w-24 mb-4 rounded-full object-cover" />
            <h4 className="text-lg font-semibold">Yamuna Café</h4>
            <p className="text-gray-500">Delicious coffee & snacks.</p>
          </div>
          
          {/* Sponsor 2 */}
          <div className="flex flex-col items-center">
            <img src="https://via.placeholder.com/150" alt="Dewsis" className="h-24 w-24 mb-4 rounded-full object-cover" />
            <h4 className="text-lg font-semibold">Dewsis</h4>
            <p className="text-gray-500">Exclusive offers for hunt winners.</p>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-center mt-10">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">Ready to Start Your Adventure?</h3>
        <p className="text-gray-600 mb-6">
          Join our community of explorers today and dive into the fun-filled world of scavenger hunts!
        </p>
        <Link 
        to="/hunts"
        className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition duration-300">
          Start a Hunt Now
        </Link>
      </div>
    </div>
  );
}

export default About;
