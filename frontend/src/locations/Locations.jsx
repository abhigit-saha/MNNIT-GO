import React from 'react';
import Navbar from '../components/Navbar';
import LocationsPage from '../components/locationspage';

function Locations() {
  return (
    <div className="bg-white min-h-screen">
      <Navbar />
      <div className="max-w-screen-2xl mx-auto px-4 mt-4">
        <LocationsPage />
      </div>
    </div>
  );
}

export default Locations;
