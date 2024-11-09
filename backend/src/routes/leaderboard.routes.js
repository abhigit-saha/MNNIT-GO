import { Router } from "express";
import {
  getLeaderboard,
  updateLeaderboard,
} from "../controllers/leaderboard.js";

const router = Router();

router.route("/:huntId").get(getLeaderboard);
router.route("/:huntId/update").post(updateLeaderboard);

export default router;
