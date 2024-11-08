// app.js
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import http from "http";
import userroute from "./routes/user.routes.js";
import locationrouter from "./routes/location.routes.js";
import huntrouter from "./routes/hunt.routes.js";
import { initializeHuntSocket } from "./controllers/unofficialHunts.js"; // Import the room logic
import couponrouter from "./routes/coupon.routes.js"

const app = express();
const server = http.createServer(app);

// Initialize Socket.io for hunts
initializeHuntSocket(server);

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



// Export the server for use in index.js
export { app, server };
