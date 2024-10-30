import Cards from './Cards';
import axios from "axios";
import React, { useEffect, useState } from "react";

function LocationsPage() {
  const [location, setLocation] = useState([]); 

  useEffect(() => {
    const getLocation = async () => {
      try {
        const res = await axios.get("http://localhost:4001/locations");
        console.log(res.data);
        setLocation(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getLocation();
  }, []);

  console.log(location);

  return (
    <>
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mt-8 mb-4">
          <h1 className="text-black text-2xl sm:text-3xl font-bold">
            Solve The Mystery
          </h1>
        </div>
        <div className="mt-8 grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {location.map((item) => (
            <Cards key={item._id} item={item} />
          ))}
        </div>
      </div>
    </>
  );
}

export default LocationsPage;
