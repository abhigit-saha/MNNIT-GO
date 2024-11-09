import express from "express";
import {
  getAllHunts,
  getHuntById,
  verifyAnswer,
  submitHunt,
} from "../controllers/hunt.controller.js";
import {
  verifyCredential,
  createCredential,
} from "../controllers/credential.controller.js";
const router = express.Router();

router.post("/create-credential", createCredential);
router.post("/verify-credential", verifyCredential);

export default router;
