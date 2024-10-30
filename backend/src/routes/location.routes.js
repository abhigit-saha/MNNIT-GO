import express from "express";
import { getlocation, getlocationById } from "../controllers/locations.controller.js";

const router = express.Router();


router.get("/", getlocation);


router.get("/:id", getlocationById);

export default router;
