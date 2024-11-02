import express from "express";
import { Signup, login, googleSignIn } from "../controllers/user.controller.js";
const router = express.Router();

router.post("/Signup", Signup);
router.post("/login", login);
router.post("/google-signin", googleSignIn); 

export default router;
