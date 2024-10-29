import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './home/Home';
import Login from './components/Login';
import Signup from './components/Signup';


function App() {
  return (
    <Routes>
     <Route path="/" element={<Home/>}/>
     <Route path="/login" element={<Login />}/>
     <Route path="/Sign Up" element={<Signup />}/>
    </Routes>
  );
}

export default App;
