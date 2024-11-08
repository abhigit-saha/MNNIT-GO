// App.js
import React from "react";
import { Route, Router, Routes, Navigate } from "react-router-dom";
import Home from "./home/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Dashboard from "./components/Dashboard"; // Import the Dashboard component
import Locations from "./locations/Locations";
import Hunts from "./components/Hunts";
import UnoffHunts from "./components/unoffhunts";
import Huntdetails from "./components/Huntdetails";
import ReadQr from "./components/ReadQr";
import { Toaster } from "react-hot-toast";
import Premium from './components/Premium.jsx'
import Awards from './components/Awards.jsx'


// Protected Route Component
function ProtectedRoute({ children }) {
  const user = localStorage.getItem("User"); // Check if the user is logged in

  if (!user) {
    return <Navigate to="/login" replace />; // Redirect to login if not authenticated
  }

  return children;
}
import HuntForm from "./components/HuntForm.jsx";
import Navbar from "./components/Navbar.jsx";
function App() {
  const User=localStorage.getItem("User")
  
  
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/locations" element={<Locations />} />
        <Route path="/hunts" element={<Hunts />} />
        <Route path="/unoffhunts" element={<UnoffHunts />} />
        <Route path="/readqr" element={<ReadQr />} />
        <Route path="/premium" element={<Premium />} />
        <Route path="/awards" element={<Awards userI={User} />} />
        <Route
          path="/hunts/:id"
          element={
            <ProtectedRoute>
              <Huntdetails />
            </ProtectedRoute>
          }
        />
        <Route
          path="/create"
          element={
            <ProtectedRoute>
              <HuntForm />
            </ProtectedRoute>
          }
        />
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
