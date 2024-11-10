import React from "react";
import { motion } from "framer-motion";

function Cards({ item, onShowMap }) {
  return (
    <motion.div
      className="card w-full max-w-sm mx-auto transform transition-transform duration-200 ease-in-out hover:scale-105 border-2 border-cyan-400 rounded-lg bg-black shadow-neon"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Card Image */}
      <figure className="w-full h-48 flex justify-center overflow-hidden rounded-t-lg border-b-2 border-cyan-400">
        <img
          src={item.image}
          alt={item.location}
          className="w-full h-full object-cover"
        />
      </figure>

      {/* Card Content */}
      <div className="card-body text-center flex flex-col items-center p-4">
        {/* Title with Neon Border */}
        <h2 className="text-lg font-semibold mb-2 text-cyan-400 border-b-2 border-cyan-400 pb-1 w-fit px-3 neonGlow">
          {item.name}
        </h2>

        {/* Subtitle Text */}
        <p className="text-pink-400 text-sm mb-4 neonGlow">{item.title}</p>

        {/* Button */}
        <button
          onClick={() => onShowMap(item)}
          className="px-6 py-2 text-sm rounded-full border-2 border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black transition-colors duration-200 ease-in-out shadow-neon hover:shadow-glow"
        >
          Show
        </button>
      </div>
    </motion.div>
  );
}

export default Cards;
