import React, { useState } from "react";
import axios from "axios";

function Awards({ userId }) {
    const [couponCode, setCouponCode] = useState(null);
    const [status, setStatus] = useState(null);

    // Function to handle "Claim Offer"
    const handleClaimOffer = async () => {
        try {
            const response = await axios.post("http://localhost:8000/generatecoupon", {userId});
            setCouponCode(response.data.couponCode);
            setStatus("Generated");
        } catch (error) {
            console.error("Error generating coupon:", error);
            setStatus("Error generating coupon");
        }
    };

    // Function to redeem the coupon
    const handleRedeemCoupon = async () => {
        try {
            const response = await axios.post("http://localhost:8000/redeemcoupon", {
                couponCode
            });
            setStatus("Redeemed");
        } catch (error) {
            console.error("Error redeeming coupon:", error);
            setStatus("Error redeeming coupon");
        }
    };

    return (
        <div className="awards-container">
            <h2>🎉 Congratulations on Completing the Hunt! 🎉</h2>
            <button onClick={handleClaimOffer} disabled={!!couponCode}>
                {couponCode ? "Offer Claimed!" : "Claim Offer"}
            </button>
            {couponCode && (
                <div className="coupon-container">
                    <h3>Your Unique Coupon Code:</h3>
                    <p className="coupon-code">{couponCode}</p>
                    <button onClick={handleRedeemCoupon} disabled={status === "Redeemed"}>
                        {status === "Redeemed" ? "Coupon Redeemed!" : "Redeem Now"}
                    </button>
                </div>
            )}
            <p>{status && `Status: ${status}`}</p>

            <style>{`
                .awards-container {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    padding: 20px;
                    background: #f5f7fa;
                    border-radius: 10px;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                    max-width: 500px;
                    margin: 0 auto;
                }

                h2 {
                    color: #2d3748;
                }

                .coupon-container {
                    margin-top: 20px;
                    text-align: center;
                    padding: 20px;
                    background: #edf2f7;
                    border-radius: 10px;
                }

                .coupon-code {
                    font-size: 1.5em;
                    color: #4299e1;
                    font-weight: bold;
                    margin-bottom: 10px;
                }

                button {
                    margin-top: 10px;
                    padding: 10px 20px;
                    color: white;
                    background-color: #48bb78;
                    border: none;
                    border-radius: 5px;
                    font-size: 1em;
                }

                button:disabled {
                    background-color: #c6f6d5;
                    color: #2f855a;
                }
            `}</style>
        </div>
    );
}

export default Awards;
