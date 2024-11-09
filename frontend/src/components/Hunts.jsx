import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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

    if (hunts.length === 0) {
        return (
            <div className="container mx-auto px-4 py-8 text-center">
                <h1 className="text-3xl font-bold text-neonPink mb-8">Available Scavenger Hunts</h1>
                <p className="text-gray-400">No hunts available at the moment.</p>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-center text-neonPink mb-8">Available Scavenger Hunts</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {hunts.map((hunt) => (
                    <div
                        key={hunt._id}
                        onClick={() => handleHuntClick(hunt._id)}
                        className="bg-darkPanel rounded-lg shadow-neon cursor-pointer transform transition-transform duration-300 hover:scale-105 border border-neonPink"
                    >
                        {/* Image with Difficulty Tag */}
                        <div className="relative h-48">
                            <img
                                src={hunt.image}
                                alt={hunt.name}
                                className="w-full h-full object-cover rounded-t-lg"
                            />
                            <div className="absolute top-2 right-2">
                                <span className={`px-3 py-1 rounded-full text-sm font-bold ${
                                    hunt.difficulty === 'Easy' ? 'bg-neonGreen' :
                                    hunt.difficulty === 'Medium' ? 'bg-neonYellow' :
                                    'bg-neonRed'
                                } text-white shadow-neonGlow`}>
                                    {hunt.difficulty}
                                </span>
                            </div>
                        </div>

                        {/* Card Content */}
                        <div className="p-4">
                            <h2 className="text-xl font-semibold text-neonPink mb-2">{hunt.title}</h2>
                            <p className="text-gray-400 mb-4 line-clamp-2">{hunt.description}</p>
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-500">
                                    {hunt.locations?.length || 0} Clues
                                </span>
                                <button
                                    className="bg-neonPink text-darkPanel px-4 py-2 rounded-lg font-bold transition-colors duration-200 hover:bg-neonPurple hover:shadow-neonGlow"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleHuntClick(hunt._id);
                                    }}
                                >
                                    Start Hunt
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Hunts;
