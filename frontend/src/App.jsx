import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./home/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { Toaster } from "react-hot-toast";
import Hunts from "./components/Hunts.jsx";
import Huntdetails from "./components/Huntdetails.jsx";
import Locations from "./components/LocationsPage.jsx";
import HuntForm from "./components/HuntForm.jsx";
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
        <Route path="/create" element={<HuntForm />} />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
