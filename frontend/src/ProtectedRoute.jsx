import { Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

function ProtectedRoute({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("User"));

        if (!user) {
          setIsAuthenticated(false);
          setIsLoading(false);
          return;
        }

        // Make API call to verify endpoint
        const response = await axios.post(
          "http://localhost:8000/user/verify",
          { user }, // Send user data if needed by your API
          {
            withCredentials: true, // Important for sending cookies
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.status === 200) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
          localStorage.removeItem("User"); // Clear invalid user data
        }
      } catch (error) {
        console.error("Authentication error:", error);
        setIsAuthenticated(false);
        localStorage.removeItem("User"); // Clear invalid user data
      } finally {
        setIsLoading(false);
      }
    };

    verifyUser();
  }, []); // Empty dependency array means this runs once when component mounts

  if (isLoading) {
    // You can replace this with a loading spinner component
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;
