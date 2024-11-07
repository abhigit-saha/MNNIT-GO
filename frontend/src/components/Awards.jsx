import React, { useState } from "react";
import axios from "axios";

function Awards({ User }) {
    const [couponCode, setCouponCode] = useState(null);
    const [status, setStatus] = useState(null);

    const handleClaimOffer = async () => {
        try {
            const response = await axios.post("http://localhost:8000/coupon/generatecoupon", { User });
            setCouponCode(response.data.couponCode);
            setStatus("Generated");
        } catch (error) {
            console.error("Error generating coupon:", error);
            setStatus("Error generating coupon");
        }
    };

    const handleRedeemCoupon = async () => {
        try {
            const response = await axios.post("http://localhost:8000/coupon/redeemcoupon", {
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
            <div className="celebration-banner">
                <img src="https://example.com/trophy.png" alt="Trophy" className="trophy-icon" />
                <h2>🎉 Congratulations on Completing the Hunt! 🎉</h2>
            </div>
            <button onClick={handleClaimOffer} disabled={!!couponCode} className="claim-button">
                {couponCode ? "Offer Claimed!" : "Claim Offer"}
            </button>
            {couponCode && (
                <div className="coupon-container">
                    <h3>Your Unique Coupon Code:</h3>
                    <p className="coupon-code">{couponCode}</p>
                    <button onClick={handleRedeemCoupon} disabled={status === "Redeemed"} className="redeem-button">
                        {status === "Redeemed" ? "Coupon Redeemed!" : "Redeem Now"}
                    </button>
                </div>
            )}
            <p className="status-text">{status && `Status: ${status}`}</p>

            <style>{`
                .awards-container {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    padding: 30px;
                    background: url("https://example.com/background.jpg") no-repeat center center / cover;
                    border-radius: 15px;
                    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
                    max-width: 600px;
                    margin: 0 auto;
                    text-align: center;
                    color: #2d3748;
                }

                .celebration-banner {
                    display: flex;
                    align-items: center;
                    flex-direction: column;
                    margin-bottom: 20px;
                    color: #2d3748;
                }

                .trophy-icon {
                    width: 50px;
                    margin-bottom: 10px;
                }

                h2 {
                    font-size: 1.8em;
                    color: #1a202c;
                }

                .claim-button {
                    margin-top: 15px;
                    padding: 12px 24px;
                    color: white;
                    background-color: #38a169;
                    border: none;
                    border-radius: 5px;
                    font-size: 1.1em;
                    font-weight: bold;
                    transition: background-color 0.3s ease;
                }

                .claim-button:hover {
                    background-color: #2f855a;
                }

                .coupon-container {
                    margin-top: 25px;
                    padding: 15px;
                    background: #f7fafc;
                    border-radius: 10px;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                    width: 100%;
                }

                .coupon-code {
                    font-size: 1.8em;
                    color: #e53e3e;
                    font-weight: bold;
                    margin: 10px 0;
                    font-family: 'Courier New', monospace;
                }

                .redeem-button {
                    margin-top: 10px;
                    padding: 10px 20px;
                    color: white;
                    background-color: #3182ce;
                    border: none;
                    border-radius: 5px;
                    font-size: 1em;
                    font-weight: bold;
                    transition: background-color 0.3s ease;
                }

                .redeem-button:hover {
                    background-color: #2b6cb0;
                }

                .status-text {
                    margin-top: 20px;
                    font-size: 1.1em;
                    color: #718096;
                }
            `}</style>
        </div>
    );
}

export default Awards;
