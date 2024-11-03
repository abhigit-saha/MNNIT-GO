// components/Dashboard.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Retrieve user data from local storage
    const storedUser = localStorage.getItem("User");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      // Redirect to login if not authenticated
      toast.error("Please log in to access the dashboard");
      navigate("/login");
    }
  }, [navigate]);

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div className="dashboard min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">
        Welcome to Your Dashboard, {user.fullname}!
      </h1>
      <p>Email: {user.email}</p>
      {/* Add more user-specific content here */}
    </div>
  );
};

export default Dashboard;
