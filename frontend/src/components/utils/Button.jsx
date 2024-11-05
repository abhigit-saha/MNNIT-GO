import React from "react";

function Button({ handleClick, text }) {
  return (
    <div>
      <button
        type="button"
        onClick={handleClick}
        className="btn btn-outline px-4 py-2 text-sm rounded-lg border-2 border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white transition-colors duration-200 ease-in-out"
      >
        {text}
      </button>
    </div>
  );
}

export default Button;
