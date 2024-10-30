import express from "express";
// import path from "path"
// import { fileURLToPath } from 'url'
import cors from "cors";
import cookieParser from "cookie-parser";
import { initializeSocket } from "./controllers/leaderboard.js";
import http from 'http'
import userroute from "./routes/user.routes.js"
import locationrouter from "./routes/location.routes.js"
   


// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
const app = express();
const server = http.createServer(app); 
initializeSocket(server); 
app.use(cors())
// app.use(
//   cors({
//     origin: process.env.CORS_ORIGIN,
//     credentials: true,
//   })
// );

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public")); 
app.use(cookieParser());

app.use("/user",userroute)
app.use("/locations",locationrouter)

export { app };