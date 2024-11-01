<<<<<<< HEAD:backend/src/controllers/leaderboard.js
import Redis from "redis";
=======
import { asyncHandler } from "../utils/asyncHandler";
import { Redis } from "ioredis";
>>>>>>> c6fa7f7b4d85a03964d88be4d21500b56d3bef3d:backend/src/controllers/leaderboard.ts
import { Server } from "socket.io";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/APIResponse.js";

let io;

const redisClient = Redis.createClient();

<<<<<<< HEAD:backend/src/controllers/leaderboard.js
const initializeSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: "*", 
=======
import { ApiResponse } from "../utils/APIResponse";
// let isRedisConnected = true;
const initializeSocket = (server: any) => {
  io = new Server(server, {
    cors: {
      origin: "*", //for now allow all
      methods: ["GET", "POST"],
>>>>>>> c6fa7f7b4d85a03964d88be4d21500b56d3bef3d:backend/src/controllers/leaderboard.ts
    },
  });

  io.on("connection", async (socket) => {
    console.log("Client connected");

    emitLeaderboard();

    socket.on("disconnect", () => {
      console.log("Client disconnected");
    });
    // await redisClient.disconnect();
  });
};

const emitLeaderboard = async () => {
  const leaderboardData = await redisClient.zrange(
    "leaderboard",
    0,
    9,
    "REV",
    "WITHSCORES"
  );
  const formattedData = [];

  for (let i = 0; i < leaderboardData.length; i += 2) {
    formattedData.push({
      username: leaderboardData[i],
      score: leaderboardData[i + 1]!,
    });
  }
  console.log("Leaderboard data", leaderboardData);
  console.log("Formatted data", formattedData);
  io.emit("leaderboardUpdate", formattedData);
  console.log("leaderboard updated!!!");
};

const updateLeaderboard = asyncHandler(async (req, res) => {
  const { username, score } = req.body;
  await redisClient.zadd("leaderboard", score, username);

  await emitLeaderboard();
  return res.json(
    new ApiResponse(200, null, "Leaderboard updated successfully")
  );
});

export { emitLeaderboard, updateLeaderboard, initializeSocket };
