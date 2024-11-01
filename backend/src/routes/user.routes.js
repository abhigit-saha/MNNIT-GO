import express from "express";
import { Signup, login, getUserDashboard, authenticateToken } from "../controllers/user.controller.js";

const router = express.Router();

router.post("/signup", Signup);
router.post("/login", login);
router.get("/dashboard", authenticateToken, getUserDashboard); // Secure dashboard with token verification

export default router;
