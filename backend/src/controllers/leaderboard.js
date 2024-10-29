import Redis from "redis";
import { Server } from "socket.io";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/APIResponse.js";

let io;

const redisClient = Redis.createClient();

const initializeSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: "*", 
    },
  });

  io.on("connection", (socket) => {
    console.log("Client connected");

    emitLeaderboard();

    socket.on("disconnect", () => {
      console.log("Client disconnected");
    });
  });
};

const emitLeaderboard = async () => {
  const leaderboardData = await redisClient.zRange("leaderboard", 0, 9);
  const formattedData = [];
  for (let i = 0; i < leaderboardData.length; i += 2) {
    formattedData.push({
      username: leaderboardData[i],
      score: parseInt(leaderboardData[i + 1]),
    });
  }

  io.emit("leaderboardUpdate", formattedData);
};

const updateLeaderboard = asyncHandler(async (req, res) => {
  const { username, score } = req.body;
  await redisClient.zAdd("leaderboard", score, username);

  await emitLeaderboard();
  return res.json(
    new ApiResponse(200, null, "Leaderboard updated successfully")
  );
});

export { emitLeaderboard, updateLeaderboard, initializeSocket };
