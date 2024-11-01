import express from "express";
import { Signup, login, getUserDashboard, authenticateToken } from "../controllers/user.controller.js";
import { createHunt } from '../controllers/hunt.creation.js';
import { getUserHunts } from '../controllers/getUserHunts.js';

const router = express.Router();

router.post("/signup", Signup);
router.post("/login", login);
router.get("/dashboard", authenticateToken, getUserDashboard);

router.post('/hunts', authenticateToken, createHunt);

router.get('/hunts/user', authenticateToken, getUserHunts);

export default router;

