import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState<any>([]);
  const [socket, setSocket] = useState<any | null>(null);

  useEffect(() => {
    const newSocket = io("http://localhost:8000");
    setSocket(newSocket);

    newSocket.on("leaderboardUpdate", (data) => {
      setLeaderboard(data);
    });

    return () => {
      if (newSocket) newSocket.disconnect();
    };
  }, []);

  return (
    <>
      <div className="space-y-2">
        LEADERBOARD
        {leaderboard.map((entry, index) => (
          <div
            key={entry.username}
            className="flex items-center justify-between p-3 bg-gray-100 rounded-lg"
          >
            <div className="flex items-center gap-3">
              <span className="text-lg font-bold">{index + 1}</span>
              <span className="font-medium">{entry.username}</span>
            </div>
            <span className="text-blue-600 font-bold">{entry.score}</span>
          </div>
        ))}
      </div>
    </>
  );
};

export default Leaderboard;
