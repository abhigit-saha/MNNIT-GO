import { asyncHandler } from "../utils/asyncHandler";
import { Redis } from "ioredis";
import { Server } from "socket.io";

let io: Server;

const redisClient = Redis.createClient();

import { ApiResponse } from "../utils/APIResponse";
// let isRedisConnected = true;
const initializeSocket = (server: any) => {
  io = new Server(server, {
    cors: {
      origin: "*", //for now allow all
      methods: ["GET", "POST"],
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
// const displayLeaderboard = asyncHandler(async (req, res) => {
//   const data = redisClient.zRange("leaderboard", 0, 9);
//   return res.json(
//     new ApiResponse(200, data, "Leaderboard fetched successfully")
//   );
// });

const updateLeaderboard = asyncHandler(async (req, res) => {
  const { username, score } = req.body;
  await redisClient.zadd("leaderboard", score, username);

  await emitLeaderboard();
  return res.json(
    new ApiResponse(200, null, "Leaderboard updated successfully")
  );
});

export { emitLeaderboard, updateLeaderboard, initializeSocket };
