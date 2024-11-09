import React from "react";
import { Route, Router, Routes, Navigate, useParams } from "react-router-dom";
import Home from "./home/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Dashboard from "./components/Dashboard";
import Locations from "./locations/Locations";
import Hunts from "./components/Hunts";
import UnoffHunts from "./components/unoffhunts";
import Huntdetails from "./components/Huntdetails";
import ReadQr from "./components/ReadQr";
import { Toaster } from "react-hot-toast";
import Premium from "./components/Premium.jsx";
import Awards from "./components/Awards.jsx";
import ProtectedRoute from "./ProtectedRoute";
import HuntForm from "./components/HuntForm.jsx";
import Navbar from "./components/Navbar.jsx";
import Leaderboard from "./components/Leaderboard.jsx";
import Completed from "./components/DummyPage/Completed.jsx";

function App() {
  const User = localStorage.getItem("User");

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
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/leaderboard/:huntId" element={<LeaderboardWrapper />} />
        <Route
          path="/completed/:username/:credential"
          element={<CompletedWrapper />}
        />
      </Routes>
      <Toaster />
    </>
  );
}
const CompletedWrapper = () => {
  const { username, credential } = useParams();

  return <Completed username={username} credential={credential} />;
};
const LeaderboardWrapper = () => {
  const { huntId } = useParams();

  return <Leaderboard huntId={huntId} />;
};

export default App;
