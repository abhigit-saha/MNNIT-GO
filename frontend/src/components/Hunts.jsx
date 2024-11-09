import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Button from "./utils/Button";
const Hunts = () => {
  const [hunts, setHunts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchHunts();
  }, []);

  const fetchHunts = async () => {
    try {
      const response = await axios.get("http://localhost:8000/hunts");
      setHunts(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching hunts:", error);
      setError("Failed to load hunts. Please try again later.");
      setLoading(false);
    }
  };

  const handleHuntClick = (huntId) => {
    navigate(`/hunts/${huntId}`);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-red-500 text-xl">{error}</div>
      </div>
    );
  }

  if (hunts.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8">
          Available Scavenger Hunts
        </h1>
        <p className="text-center text-gray-600">
          No hunts available at the moment.
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">
        Available Scavenger Hunts
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {hunts.map((hunt) => (
          <div
            key={hunt._id}
            className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer transform transition-transform duration-300 hover:scale-105"
          >
            <div className="relative h-48">
              <img
                src={hunt.image}
                alt={hunt.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 right-2">
                <span
                  className={`px-3 py-1 rounded-full text-sm ${
                    hunt.difficulty === "Easy"
                      ? "bg-green-500"
                      : hunt.difficulty === "Medium"
                      ? "bg-yellow-500"
                      : "bg-red-500"
                  } text-white`}
                >
                  {hunt.difficulty}
                </span>
              </div>
            </div>
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{hunt.title}</h2>
              <p className="text-gray-600 mb-4 line-clamp-2">
                {hunt.description}
              </p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">
                  {hunt.locations?.length || 0} Clues
                </span>
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleHuntClick(hunt._id);
                  }}
                >
                  Start Hunt
                </button>
                <a href={`/leaderboard/${hunt._id}`}>
                  <Button
                    text="See leaderboard"
                    handleClick={() => {
                      console.log("lessgo");
                    }}
                  />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Hunts;
