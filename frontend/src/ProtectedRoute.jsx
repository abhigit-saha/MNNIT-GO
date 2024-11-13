import { Navigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

function ProtectedRoute({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

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
          { user },
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (response.status === 200) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
          localStorage.removeItem("User");
        }
      } catch (error) {
        console.error("Authentication error:", error);
        setIsAuthenticated(false);
        localStorage.removeItem("User");
      } finally {
        setIsLoading(false);
      }
    };
    verifyUser();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>; // Replace this with a loading spinner if needed
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

export default ProtectedRoute;
