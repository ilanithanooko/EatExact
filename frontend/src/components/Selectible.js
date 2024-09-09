import React from 'react';

const Selectible = ({ label, onClick, isSelected }) => {
  return (
    <button
      onClick={onClick}
      className={`w-full border-2 text-black text-center rounded-md p-2 text-sm lg:text-lg shadow-md border-green-600 ${isSelected ? 'bg-green-600 text-white font-medium' : 'bg-gray-100'} hover:bg-green-600 hover:text-white`}
    >
      {label}
    </button>
  );
};

export default Selectible;

//bg-gradient-to-bl from-emerald-900 to-green-600
