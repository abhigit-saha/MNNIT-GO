import React from 'react';
import { Link } from "react-router-dom";

function Cards({ item }) {
  return (
    <div className="card bg-base-100 w-full shadow-md hover:scale-105 transition-transform duration-200 ease-in-out transform hover:shadow-lg border border-gray-300 rounded-lg mx-auto">
      <figure className="w-full h-48 flex justify-center">
        <img
          src={item.image}
          alt={item.location}
          className="w-full h-full object-cover rounded-t-lg"
        />
      </figure>
      <div className="card-body text-center flex flex-col items-center p-4">
        <h2 className="card-title text-lg font-semibold mb-2 border-b border-gray-300 w-fit px-3 pb-1">
          {item.location}
        </h2>
        <p className="text-gray-500 text-sm mb-4">{item.title}</p>
        <h3 className='text-lg font-semibold mb-2 border-b border-gray-300 w-fit px-3 pb-1'>FACT!!</h3>
        <p className="text-gray-500 text-sm mb-4">{item.Fact}</p>
       
      </div>
    </div>
  );
}

export default Cards;
