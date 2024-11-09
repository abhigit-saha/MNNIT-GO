import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import axios from "axios";

const Leaderboard = ({ huntId }) => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io("http://localhost:8000", {
      withCredentials: true,
    });
    setSocket(newSocket);

    const fetchLeaderboard = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/leaderboard/${huntId}`
        );
        setLeaderboard(response.data.data);
      } catch (error) {
        console.error("Error fetching leaderboard:", error);
      }
    };

    fetchLeaderboard();

    return () => {
      if (newSocket) newSocket.disconnect();
    };
  }, [huntId]);

  useEffect(() => {
    if (socket) {
      socket.on(`leaderboardUpdate:${huntId}`, (data) => {
        setLeaderboard(data);
      });

      return () => {
        socket.off(`leaderboardUpdate:${huntId}`);
      };
    }
  }, [socket, huntId]);

  return (
    <div className="w-full max-w-lg mx-auto mt-8 p-6 bg-white shadow-lg rounded-lg border border-blue-100">
      <h2 className="text-3xl font-bold text-blue-600 text-center mb-4">
        Leaderboard for Hunt {huntId}
      </h2>
      <div className="space-y-2">
        {leaderboard.map((entry, index) => (
          <div
            key={entry.username}
            className="flex items-center justify-between p-4 bg-blue-50 rounded-lg shadow-sm"
          >
            <div className="flex items-center gap-3">
              <span className="text-lg font-semibold text-blue-500">
                {index + 1}
              </span>
              <span className="font-medium text-gray-800">
                {entry.username}
              </span>
            </div>
            <span className="text-lg font-bold text-blue-600">
              {entry.score}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Leaderboard;
