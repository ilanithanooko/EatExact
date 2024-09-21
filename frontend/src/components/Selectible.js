import React from 'react';

// Selectible component to display selectable options with styling based on selection status
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