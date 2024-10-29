import { Router } from "express";
import { registerUser } from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { loginUser } from "../controllers/user.controller.js";
import { logoutUser } from "../controllers/user.controller.js";
import { refreshAccessToken } from "../controllers/user.controller.js";
import { resetPassword } from "../controllers/user.controller.js";
const router = Router();

// router.route("/register").post(registerUser);

// router.route("/login").post(loginUser);
// router.route("/reset-password").post(resetPassword);
// router.route("/logout").post(verifyJWT, logoutUser);
// router.route("/verify").post(verifyJWT, (req, res) => {
//   res.status(200).json({ message: "Valid Token" });
// });
// router.route("/refresh").post(refreshAccessToken);

// router.route("/logout").post(logoutUser);
export default router;
