import React, { useState } from 'react';
import HuntForm from '../components/HuntForm';

function Premium() {
  
  const [isPremium, setIsPremium] = useState(false);

  // Function to handle payment demo
  const handlePayment = () => {
    
    alert("Payment Demo - Razorpay Integration Here");
    // After payment is successful
    setIsPremium(true);
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 py-10">
      
      <h1 className="text-4xl font-bold text-blue-600 mb-8">Create Your Scavenger Hunt</h1>
      
    
      {!isPremium ? (
        <>
        <div className=" max-w-lg bg-white rounded-lg shadow-lg p-6 space-y-4">
          <h2 className="text-xl font-semibold text-yellow-600">Upgrade to Premium</h2>
          <p className="text-gray-600 mb-4">
            Unlock exclusive features like creating hunts, enhanced visibility, and more.
          </p>
          <button 
            className="w-full py-3 bg-yellow-500 text-white font-semibold rounded-md hover:bg-yellow-600 transition duration-300"
            onClick={handlePayment}
          >
            Pay Now - ₹499
          </button>
          <p className="text-sm text-gray-500 mt-2">One-time payment. No hidden fees.</p>
        </div>
          
        </>
        
      ) : (
        // Render the form only if user is premium
        <div className="w-full max-w-2xl bg-white rounded-lg shadow-lg p-6 mt-6">
          <HuntForm />
        </div>
      )}
    </div>
  );
}

export default Premium;
