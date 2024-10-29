import express from "express"
import {Signup} from "../controllers/user.controller.js"
import { login } from "../controllers/user.controller.js"
const router=express.Router()

router.post("/Signup",Signup)
router.post("/login",login)

export default router;