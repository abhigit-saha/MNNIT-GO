import React, { useState } from "react";
import HuntForm from "../components/HuntForm";

function Premium() {
  const [isPremium, setIsPremium] = useState(false);

  // Function to handle payment demo
  const handlePayment = () => {
    alert("Payment Demo - Razorpay Integration Here");
    // After payment is successful
    setIsPremium(true);
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-darkPurple py-10 text-textLight">
      {/* Page Header */}
      <h1 className="text-5xl font-bold text-neonPink mb-12 text-center glitch-effect">
        Create Your Scavenger Hunt
      </h1>

      {/* Conditional Rendering for Premium Upgrade */}
      {!isPremium ? (
        <div className="w-full max-w-lg bg-backgroundDark rounded-xl shadow-neon border border-neonPink p-8 space-y-6 neon-border">
          <h2 className="text-2xl font-semibold text-neonPurple text-center">
            Upgrade to Premium
          </h2>
          <p className="text-lg text-gray-300 mb-6">
            Unlock exclusive features like creating hunts, enhanced visibility,
            and more.
          </p>
          <button
            className="w-full py-4 bg-neonPink text-backgroundDark font-bold rounded-lg shadow-cyber hover:bg-neonPurple transition duration-300"
            onClick={handlePayment}
          >
            Pay Now - ₹499
          </button>
          <p className="text-sm text-gray-400 mt-3 text-center">
            One-time payment. No hidden fees.
          </p>
        </div>
      ) : (
        // Render the Hunt Form only if the user is premium
        <div className="w-full max-w-2xl bg-backgroundDark rounded-xl shadow-neon border border-cyberBlue p-8 mt-10 neon-border">
          <HuntForm isUnoff={false} roomId={null} />
        </div>
      )}
    </div>
  );
}

export default Premium;
