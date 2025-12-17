import Coupon from "../models/coupon.model.js";

function generateCouponCode() {
  return `COUPON-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
}

export const generatecoupon = async (req, res) => {
  const { User } = req.body;
  console.log(User);

  const couponCode = generateCouponCode();
  const expirationDate = new Date();

  expirationDate.setDate(expirationDate.getDate() + 30);

  const coupon = new Coupon({ User, couponCode, expirationDate });

  try {
    await coupon.save();
    res.json({ message: "Coupon generated successfully", couponCode });
  } catch (error) {
    console.error("Error saving coupon:", error);
    res.status(500).json({ message: "Error generating coupon" });
  }
};

export const redeemcoupon = async (req, res) => {
  const { couponCode } = req.body;
  try {
    const coupon = await Coupon.findOne({ couponCode });
    if (!coupon) {
      return res.status(404).json({ message: "Coupon not found" });
    }
    if (coupon.redeemed) {
      return res.status(400).json({ message: "Coupon already redeemed" });
    }
    if (coupon.expirationDate && coupon.expirationDate < new Date()) {
      return res.status(400).json({ message: "Coupon is expired" });
    }

    coupon.redeemed = true;
    await coupon.save();

    res.json({ message: "Coupon redeemed successfully" });
  } catch (error) {
    console.error("Error redeeming coupon:", error);
    res.status(500).json({ message: "Error redeeming coupon" });
  }
};
