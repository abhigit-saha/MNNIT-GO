import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
// import Hotelscard from '../components/Hotelscard';
// import Footer from '../components/Footer';

function Home() {
  return (
    <>
      <div className="relative bg-gray-50 min-h-screen"> {/* Ensure background color is consistent */}
        <Navbar /> {/* Move Navbar above Hero for better layering */}
        <Hero />
      </div>
      {/* <Hotelscard />  */}
      {/* <Footer /> */}
    </>
  );
}

export default Home;
