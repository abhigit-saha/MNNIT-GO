import { asyncHandler } from "../utils/asyncHandler.js";
import { Redis } from "ioredis";
import { ApiResponse } from "../utils/APIResponse.js";
import { connections, io } from "../app.js";

const redisClient = Redis.createClient();

const getLeaderboard = asyncHandler(async (req, res) => {
  const { huntId } = req.params;
  const leaderboardData = await redisClient.zrange(
    `leaderboard:${huntId}`,
    0,
    9,
    "WITHSCORES"
  );

  const formattedData = [];
  for (let i = 0; i < leaderboardData.length; i += 2) {
    formattedData.push({
      username: leaderboardData[i],
      score: leaderboardData[i + 1],
    });
  }

  console.log(`Leaderboard data for hunt ${huntId}`, leaderboardData);
  console.log(`Formatted data for hunt ${huntId}`, formattedData);
  return res.json(
    new ApiResponse(
      200,
      formattedData,
      `Leaderboard fetched successfully for hunt ${huntId}`
    )
  );
});

const updateLeaderboard = asyncHandler(async (req, res) => {
  const { huntId } = req.params;
  console.log("req body", req.body);
  const { username, score } = req.body;
  console.log("Updating leaderboard for hunt", huntId);
  console.log("Username:", username);
  console.log("Score:", score);
  await redisClient.zadd(`leaderboard:${huntId}`, score, username);
  await emitLeaderboard(huntId);
  return res.json(
    new ApiResponse(
      200,
      null,
      `Leaderboard updated successfully for hunt ${huntId}`
    )
  );
});

const emitLeaderboard = async (huntId) => {
  const leaderboardData = await redisClient.zrange(
    `leaderboard:${huntId}`,
    0,
    9,
    "WITHSCORES"
  );

  const formattedData = [];
  for (let i = 0; i < leaderboardData.length; i += 2) {
    formattedData.push({
      username: leaderboardData[i],
      score: leaderboardData[i + 1],
    });
  }

  console.log(`Leaderboard data for hunt ${huntId}`, leaderboardData);
  console.log(`Formatted data for hunt ${huntId}`, formattedData);
  console.log("io", io);
  io.emit(`leaderboardUpdate:${huntId}`, formattedData);
  console.log(`Leaderboard updated for hunt ${huntId}!`);
};

export { getLeaderboard, updateLeaderboard, emitLeaderboard };
