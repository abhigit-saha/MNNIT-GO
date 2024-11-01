import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { initializeSocket } from "./src/controllers/leaderboard";
import { createServer } from "http";
import leaderboardRouter from "./src/routes/leaderboard.routes";
const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

// import userRouter from "./routes/user.routes.js";
// app.use("/api/v1/users", userRouter);
app.use("/leaderboard", leaderboardRouter);
const httpServer = createServer(app);
initializeSocket(httpServer);

export { httpServer };
