import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./home/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { Toaster } from "react-hot-toast";
import Locations from "./locations/Locations.jsx"

function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/Sign Up" element={<Signup />} />
      <Route path="/locations" element={<Locations />} />
    </Routes>
    <Toaster />
    </>
  );
}

export default App;
