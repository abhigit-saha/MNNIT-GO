// app.js
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import http from "http";
import userroute from "./routes/user.routes.js";
import locationrouter from "./routes/location.routes.js";
import huntrouter from "./routes/hunt.routes.js";
import { initializeHuntSocket } from "./controllers/unofficialHunts.js";
import couponrouter from "./routes/coupon.routes.js";
import leaderboardrouter from "./routes/leaderboard.routes.js";
import { Server } from "socket.io";
import EventEmitter from "events";
import { emitLeaderboard } from "./controllers/leaderboard.js";
import credentialRouter from "./routes/credential.routes.js";
const app = express();
const server = http.createServer(app);

// Initialize Socket.io for hunts
initializeHuntSocket(server);

// Socket.io for leaderboard
export const connections = [];
export let io;
const myEmitter = new EventEmitter();
myEmitter.on(
  "emitLeaderboard",
  async (huntId) => await emitLeaderboard(huntId)
);

io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", //for now allow all
    methods: ["GET", "POST"],
    credentials: true,
  },
});

io.sockets.on("connection", (socket) => {
  connections.push(socket);
  console.log(" %s sockets is connected", connections.length);
  socket.on("leaderboardUpdate", (huntId) => {
    myEmitter.emit("emitLeaderboard", huntId);
  });
  socket.on("disconnect", () => {
    connections.splice(connections.indexOf(socket), 1);
  });
});

// Middleware
app.use(
  cors({
    origin: "http://localhost:5173", // your frontend URL
    credentials: true,
  })
);
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

// Routes
app.use("/user", userroute);
app.use("/locations", locationrouter);
app.use("/hunts", huntrouter);
app.use("/coupon", couponrouter);
app.use("/leaderboard", leaderboardrouter);
app.use("/credential", credentialRouter);

// Export the server for use in index.js
export { app, server };
