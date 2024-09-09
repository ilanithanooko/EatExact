import React from 'react';


const RoleButton = ({ role, description, onClick }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-4">
      <h3 className="text-xl font-bold text-green-800 mb-2">{role}</h3>
      <p className="text-gray-700 text-lg md:text-xl mb-4">{description}</p>
      <button
        onClick={onClick}
        className="flex justify-center rounded-md bg-green-600 p-4 text-xl font-semibold leading-6 text-white shadow-sm hover:bg-green-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-wood-green"
      >
        Select {role}
      </button>
    </div>
  );
};

export default RoleButton;
