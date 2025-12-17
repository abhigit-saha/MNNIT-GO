import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import Cards from "./Cards";
import { MapContainer, TileLayer, Polygon } from "react-leaflet";
import "leaflet/dist/leaflet.css";

function LocationsPage() {
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);

  // Sample location data for 4 Indian cities
  useEffect(() => {
    const sampleLocations = [
      {
        _id: "1",
        name: "Mp Hall",
        title: "Capital of India",
        image: "https://via.placeholder.com/150",
        coordinates: [28.6139, 77.209], // Latitude, Longitude for New Delhi
        boundary: [
          [28.6, 77.2],
          [28.7, 77.2],
          [28.7, 77.3],
          [28.6, 77.3],
        ],
      },
      {
        _id: "2",
        name: "Mumbai",
        title: "Financial Capital",
        image: "https://via.placeholder.com/150",
        coordinates: [19.076, 72.8777], // Latitude, Longitude for Mumbai
        boundary: [
          [19.07, 72.87],
          [19.08, 72.87],
          [19.08, 72.88],
          [19.07, 72.88],
        ],
      },
      {
        _id: "3",
        name: "Admin Building",
        title: "Cultural Capital",
        image: "https://via.placeholder.com/150",
        coordinates: [22.5726, 88.3639], // Latitude, Longitude for Kolkata
        boundary: [
          [22.57, 88.36],
          [22.58, 88.36],
          [22.58, 88.37],
          [22.57, 88.37],
        ],
      },
      {
        _id: "4",
        name: "workshop",
        title: "Silicon Valley of India",
        image: "https://via.placeholder.com/150",
        coordinates: [12.9716, 77.5946], // Latitude, Longitude for Bangalore
        boundary: [
          [12.97, 77.59],
          [12.98, 77.59],
          [12.98, 77.6],
          [12.97, 77.6],
        ],
      },
    ];
    setLocations(sampleLocations);
  }, []);

  const handleShowMap = (location) => {
    setSelectedLocation(location);
  };

  return (
    <div className="bg-gradient-to-r from-blue-900 to-purple-900 min-h-screen text-white">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mt-8 mb-4">
          <h1 className="text-4xl sm:text-5xl font-bold text-cyan-400 neonGlow">
            Solve The Mystery
          </h1>
        </div>

        {/* Cards Grid */}
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {locations.map((location) => (
            <motion.div
              key={location._id}
              className="flex justify-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Cards item={location} onShowMap={handleShowMap} />
            </motion.div>
          ))}
        </div>

        {selectedLocation && (
          <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-75 flex justify-center items-center z-50">
            <div className="relative w-3/4 h-3/4 bg-white p-4 rounded-lg shadow-lg neonGlow">
              <button
                className="absolute top-2 right-2 text-white bg-red-500 hover:bg-red-700 px-3 py-1 rounded"
                onClick={() => setSelectedLocation(null)}
              >
                Close Map
              </button>
              <MapContainer
                center={selectedLocation.coordinates}
                zoom={13}
                scrollWheelZoom={false}
                className="w-full h-full rounded-lg"
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
                />
                <Polygon
                  positions={selectedLocation.boundary}
                  pathOptions={{
                    color: "cyan",
                    fillColor: "cyan",
                    fillOpacity: 0.3,
                  }}
                />
              </MapContainer>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default LocationsPage;
