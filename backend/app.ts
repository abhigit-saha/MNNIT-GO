import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { initializeSocket } from "./src/controllers/leaderboard";
import { createServer } from "http";

const app = express();
const httpServer = createServer(app);
initializeSocket(httpServer);

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

// import userRouter from "./routes/user.routes.js";
// app.use("/api/v1/users", userRouter);

export { app };
