import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Button from "./utils/Button";

const UnofficialHuntsList = ({ roomId }) => {
  const [unofficialHunts, setUnofficialHunts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUnofficialHunts();
  }, [roomId]);

  const fetchUnofficialHunts = async () => {
    try {
      if (roomId) {
        const response = await axios.get(
          `http://localhost:8000/unoffHunts/room/${roomId}`
        );

        // Ensure we always set an array, even if response.data is null or a single object
        const hunts = response.data
          ? (Array.isArray(response.data)
              ? response.data
              : [response.data]
            ).filter((hunt) => hunt !== null)
          : [];

        setUnofficialHunts(hunts);
      } else {
        setUnofficialHunts([]);
      }
    } catch (error) {
      console.error("Error fetching unofficial hunts:", error);
      setError("Failed to load unofficial hunts. Please try again later.");
      setUnofficialHunts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleHuntClick = (huntId) => {
    navigate(`/unoffHunts/${roomId}/${huntId}`);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-neonPink"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-neonRed text-2xl font-semibold">{error}</div>
      </div>
    );
  }

  if (unofficialHunts.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-3xl font-bold text-neonPink mb-8">
          {roomId ? "Hunt Not Found" : "Community-Created Scavenger Hunts"}
        </h1>
        <p className="text-gray-400">
          {roomId
            ? "The requested hunt could not be found."
            : "No unofficial hunts available at the moment."}
        </p>
        {!roomId && (
          <button
            onClick={() => navigate("/create-hunt")}
            className="mt-4 bg-neonPink text-darkPanel px-6 py-3 rounded-lg font-bold 
                     transition-colors duration-200 hover:bg-neonPurple hover:shadow-neonGlow"
          >
            Create Your Own Hunt
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-neonPink">
          {roomId ? "Hunt Room" : "Community-Created Scavenger Hunts"}
        </h1>
        {!roomId && (
          <button
            onClick={() => navigate("/create-hunt")}
            className="bg-neonPink text-darkPanel px-6 py-3 rounded-lg font-bold 
                     transition-colors duration-200 hover:bg-neonPurple hover:shadow-neonGlow"
          >
            Create Your Own Hunt
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {unofficialHunts.map((hunt) => (
          <div
            key={hunt._id}
            onClick={() => handleHuntClick(hunt._id)}
            className="bg-darkPanel rounded-lg shadow-neon cursor-pointer transform 
                     transition-transform duration-300 hover:scale-105 border border-neonPink"
          >
            {/* Image with Difficulty Tag and Owner Badge */}
            <div className="relative h-48">
              <img
                src={hunt.image || "/default-hunt-image.jpg"} // Add a default image fallback
                alt={hunt.name}
                className="w-full h-full object-cover rounded-t-lg"
              />
              <div className="absolute top-2 right-2">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-bold text-white shadow-neonGlow ${
                    hunt.difficulty === "Easy"
                      ? "bg-neonGreen"
                      : hunt.difficulty === "Medium"
                      ? "bg-neonYellow"
                      : "bg-neonRed"
                  }`}
                >
                  {hunt.difficulty}
                </span>
              </div>
              <div className="absolute top-2 left-2">
                <span className="px-3 py-1 bg-opacity-75 bg-darkPanel rounded-full text-sm text-neonPink">
                  Created by {hunt.owner}
                </span>
              </div>
            </div>

            {/* Card Content */}
            <div className="p-4">
              <h2 className="text-xl font-semibold text-neonPink mb-2">
                {hunt.title}
              </h2>
              <p className="text-gray-400 mb-4 line-clamp-2">
                {hunt.description}
              </p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">
                  {hunt.locations?.length || 0} Clues
                </span>
                <div className="flex gap-2">
                  <button
                    className="bg-neonPink text-darkPanel px-4 py-2 rounded-lg font-bold 
                             transition-colors duration-200 hover:bg-neonPurple hover:shadow-neonGlow"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleHuntClick(hunt._id);
                    }}
                  >
                    Start Hunt
                  </button>
                  <a
                    href={`/leaderboard/${hunt._id}`}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Button text="Leaderboard" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UnofficialHuntsList;
