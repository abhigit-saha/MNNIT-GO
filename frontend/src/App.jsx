// App.js
import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Home from "./home/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Dashboard from "./components/Dashboard"; // Import the Dashboard component
import Locations from "./locations/Locations";
import Hunts from "./components/Hunts";
import Huntdetails from "./components/Huntdetails";
import { Toaster } from "react-hot-toast";

// Protected Route Component
function ProtectedRoute({ children }) {
  const user = localStorage.getItem("User"); // Check if the user is logged in

  if (!user) {
    return <Navigate to="/login" replace />; // Redirect to login if not authenticated
  }

  return children;
}

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Sign Up" element={<Signup />} />
        <Route path="/locations" element={<Locations />} />
        <Route path="/hunts" element={<Hunts />} />
        <Route path="/hunts/:id" element={<Huntdetails />} />
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <Dashboard /> {/* Dashboard protected by ProtectedRoute */}
            </ProtectedRoute>
          } 
        />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
