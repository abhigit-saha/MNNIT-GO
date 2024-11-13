import express from "express";
import {
  getAllHunts,
  getHuntById,
  verifyAnswer,
  submitHunt,
} from "../controllers/unoffHunt.controller.js";

const router = express.Router();

router.get("/room/:roomId", getAllHunts);
router.get("/:id", getHuntById);
router.post("/verify-answer", verifyAnswer);
router.post("/", submitHunt);

export default router;
