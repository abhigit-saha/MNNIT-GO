import { asyncHandler } from "../utils/asyncHandler";
import * as Redis from "redis";
import { Server } from "socket.io";

let io: Server;

const redisClient = Redis.createClient();
import { ApiResponse } from "../utils/APIResponse";

const initializeSocket = (server: any) => {
  io = new Server(server, {
    cors: {
      origin: "*", //for now allow all
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
// const displayLeaderboard = asyncHandler(async (req, res) => {
//   const data = redisClient.zRange("leaderboard", 0, 9);
//   return res.json(
//     new ApiResponse(200, data, "Leaderboard fetched successfully")
//   );
// });

const updateLeaderboard = asyncHandler(async (req, res) => {
  const { username, score } = req.body;
  await redisClient.zAdd("leaderboard", score, username);

  await emitLeaderboard();
  return res.json(
    new ApiResponse(200, null, "Leaderboard updated successfully")
  );
});

export { emitLeaderboard, updateLeaderboard, initializeSocket };
