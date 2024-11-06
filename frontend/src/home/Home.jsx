import React from 'react';

import Hero from '../components/Hero';


function Home() {
  return (
    <>
      <div className="relative bg-gray-50 min-h-screen"> {/* Ensure background color is consistent */}
         {/* Move Navbar above Hero for better layering */}
        <Hero />
      </div>
      
    </>
  );
}

export default Home;
