import React from "react";
import { Link } from "react-router-dom";

function About() {
  return (
    <div className="flex flex-col items-center bg-darkPurple py-10 px-5 text-textLight">
      {/* Header Section */}
      <div className="text-5xl font-bold text-neonPink mb-10 text-center glitch-effect">
        About Our Scavenger Hunt App
      </div>

      {/* Introduction Section */}
      <div className="max-w-3xl text-center mb-12">
        <p className="text-lg text-neonPurple">
          Welcome to our innovative Scavenger Hunt App! Whether you're looking
          for a thrilling adventure, a team-building experience, or simply want
          to explore your city, we've got you covered. Dive into exciting,
          pre-designed hunts or create your own customized scavenger hunts.
        </p>
      </div>

      {/* Features Section */}
      <div className="w-full max-w-4xl bg-backgroundDark rounded-xl shadow-neon border border-neonPink p-8 mb-12 neon-border">
        <h2 className="text-3xl font-semibold text-neonPink mb-6 text-center">
          Features of Our App
        </h2>
        <ul className="list-disc list-inside space-y-4 text-neonPurple">
          <li>
            <strong>Join Pre-Defined Hunts:</strong> Participate in various
            themed scavenger hunts curated by our team for different locations.
          </li>
          <li>
            <strong>Create Your Own Hunt:</strong> Unleash your creativity by
            designing personalized scavenger hunts with unique clues and
            locations.
          </li>
          <li>
            <strong>Premium Membership:</strong> Unlock exclusive features by
            subscribing to our premium plan for just{" "}
            <span className="text-green-500 font-bold">₹499</span>. Create
            unlimited hunts, access premium content, and more!
          </li>
          <li>
            <strong>Claim Rewards:</strong> Win exciting offers from our partner
            cafes and stores by participating in hunts.
          </li>
        </ul>
      </div>

      {/* Premium Section */}
      <div className="max-w-3xl bg-gradient-to-r from-cyberBlue via-neonPurple to-neonPink rounded-xl shadow-lg p-8 mb-12 text-center neon-border">
        <h3 className="text-2xl font-bold text-textLight mb-4">
          Go Premium for Only ₹499
        </h3>
        <p className="text-lg mb-6 text-gray-300">
          Upgrade to our premium plan to unlock the best experience. Create
          unlimited hunts, access exclusive offers, and enjoy an ad-free
          journey.
        </p>
        <Link
          to="/premium"
          className="bg-neonPink text-backgroundDark px-8 py-3 rounded-full shadow-cyber hover:bg-neonPurple transition duration-300"
        >
          Get Premium
        </Link>
      </div>

      {/* Sponsors Section */}
      <div className="w-full max-w-4xl bg-backgroundDark rounded-xl shadow-neon border border-neonPink p-8 mb-12 neon-border">
        <h2 className="text-3xl font-semibold text-neonPurple mb-8 text-center">
          Our Sponsors
        </h2>
        <div className="flex flex-wrap justify-center gap-10">
          {/* Sponsor 1 */}
          <div className="flex flex-col items-center">
            <img
              src="https://via.placeholder.com/150"
              alt="Yamuna Cafe"
              className="h-32 w-32 mb-4 rounded-full object-cover shadow-lg border-4 border-neonPink"
            />
            <h4 className="text-xl font-bold">Yamuna Café</h4>
            <p className="text-gray-400">Delicious coffee & snacks.</p>
          </div>

          {/* Sponsor 2 */}
          <div className="flex flex-col items-center">
            <img
              src="https://via.placeholder.com/150"
              alt="Dewsis"
              className="h-32 w-32 mb-4 rounded-full object-cover shadow-lg border-4 border-neonPurple"
            />
            <h4 className="text-xl font-bold">Dewsis</h4>
            <p className="text-gray-400">Exclusive offers for hunt winners.</p>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-center mt-16">
        <h3 className="text-3xl font-bold text-neonPink mb-6">
          Ready to Start Your Adventure?
        </h3>
        <p className="text-lg text-gray-400 mb-8">
          Join our community of explorers today and dive into the fun-filled
          world of scavenger hunts!
        </p>
        <Link
          to="/hunts"
          className="bg-cyberBlue text-backgroundDark px-8 py-3 rounded-full shadow-cyber hover:bg-neonPurple transition duration-300"
        >
          Start a Hunt Now
        </Link>
      </div>
    </div>
  );
}

export default About;
