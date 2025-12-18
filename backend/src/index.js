// index.js
import dotenv from "dotenv";
import connectDB from "./db/index.js";
import { app, server } from "./app.js"; // Import the app and server
// import { app, server } from "./controllers/leaderboard.js";

dotenv.config({
  path: "./.env",
});

// Debug: Check if environment variables are loaded
console.log("Environment variables check:");
console.log("ACCESS_TOKEN_SECRET:", process.env.ACCESS_TOKEN_SECRET);
console.log(
  "REFRESH_TOKEN_SECRET:",
  process.env.REFRESH_TOKEN_SECRET ? "✓ Loaded" : "✗ Not found"
);

connectDB()
  .then(() => {
    server.listen(process.env.PORT || 8000, () => {
      console.log(`⚙️ Server is running at port: ${process.env.PORT || 8000}`);
    });
  })
  .catch((err) => {
    console.log("MONGO db connection failed!!! ", err);
  });
