import { Router } from "express";
import { updateLeaderboard } from "../controllers/leaderboard";
const router = Router();

router.route("/update").post(updateLeaderboard);

export default router;
