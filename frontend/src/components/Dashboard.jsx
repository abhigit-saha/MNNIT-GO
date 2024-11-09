// components/Dashboard.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import HuntForm from "./HuntForm";
import Layout from "./DashboardComp/layout";
import axios from "axios";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [location, setLocation] = useState({ lat: null, lng: null });
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const mapContainerStyle = {
    width: "100%",
    height: "400px",
    borderRadius: "8px",
  };

  async function logouthandler() {
    // localStorage.clear();
    try {
      await axios.post("http://localhost:8000/user/logout", user, {
        withCredentials: true,
      });
      navigate("/");
    } catch (e) {
      toast.error("Error logging out");
    }
  }

  useEffect(() => {
    
    const storedUser = localStorage.getItem("User");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      
      toast.error("Please log in to access the dashboard");
      navigate("/login");
    }
  }, [navigate]);

  
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => setError(error.message),
        { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  }, []);

  if (!user) {
    return <p className="text-center text-gray-600">Loading...</p>;
  }

  return (
    <Layout>
    <div className="dashboard min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="text-3xl font-bold text-blue-600 mb-4">
        Welcome to Your Dashboard, {user.fullname}!
      </h1>
      <p className="text-gray-800 text-lg mb-6">Email: {user.email}</p>
      
      
      {error && (
        <p className="text-red-500 font-semibold mb-4">{error}</p>
      )}
      
      
      <div className="w-full max-w-2xl shadow-lg rounded-lg overflow-hidden mb-8 bg-white">
        <LoadScript googleMapsApiKey="AIzaSyALRTDijcgY92aVyLW8or9KQP0WTNyW2ho">
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={location.lat && location.lng ? location : { lat: 20.5937, lng: 78.9629 }} // Default center
            zoom={15}
          >
            {location.lat && location.lng && (
              <Marker position={location} />
            )}
          </GoogleMap>
        </LoadScript>
      </div>
      
      
      <p className="text-gray-700 text-center">Your current location is displayed on the map above.</p>
      <HuntForm></HuntForm>
      <button onClick={logouthandler} className="bg-red-800">Logout</button>
    </div>
    </Layout>
  );
};

export default Dashboard;
