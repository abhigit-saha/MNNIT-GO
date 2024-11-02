import { asyncHandler } from "../utils/asyncHandler.js"; // Ensure correct import for asyncHandler
import Redis from "ioredis"; // Use default import for ioredis
import { Server } from "socket.io"; // Import Server from socket.io
import { ApiResponse } from "../utils/APIResponse.js"; // Correct import for ApiResponse

let io;

// Create a Redis client
const redisClient = new Redis(); // Initialize the Redis client properly

const initializeSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: "*", // Allow all origins for now
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", async (socket) => {
    console.log("Client connected");

    // Emit the leaderboard data when a client connects
    await emitLeaderboard();

    socket.on("disconnect", () => {
      console.log("Client disconnected");
    });
  });
};

// Emit leaderboard data to all connected clients
const emitLeaderboard = async () => {
  try {
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
        score: leaderboardData[i + 1],
      });
    }
    
    console.log("Leaderboard data", leaderboardData);
    console.log("Formatted data", formattedData);
    io.emit("leaderboardUpdate", formattedData);
    console.log("Leaderboard updated!!!");
  } catch (error) {
    console.error("Error emitting leaderboard:", error);
  }
};

// Update the leaderboard with a new score
const updateLeaderboard = asyncHandler(async (req, res) => {
  const { username, score } = req.body;

  // Validate the incoming data
  if (!username || typeof score !== "number") {
    return res.status(400).json(new ApiResponse(400, null, "Invalid data"));
  }

  await redisClient.zadd("leaderboard", score, username);
  
  // Emit the updated leaderboard
  await emitLeaderboard();
  return res.json(
    new ApiResponse(200, null, "Leaderboard updated successfully")
  );
});

// Export functions for use in other parts of the application
export { emitLeaderboard, updateLeaderboard, initializeSocket };
