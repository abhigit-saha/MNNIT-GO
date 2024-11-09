import express from "express";

import {
  generatecoupon,
  redeemcoupon,
} from "../controllers/coupon.controller.js";

const router = express.Router();

router.post("/generatecoupon", generatecoupon);
router.post("/redeemcoupon", redeemcoupon);

export default router;
