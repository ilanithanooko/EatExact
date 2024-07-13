import React from 'react';
import { FaUser, FaUsers, FaChild, FaArrowLeft } from 'react-icons/fa';

const OptionSelection = ({ onSelect, onBack }) => {
  return (
    <div>
      <button onClick={onBack} className="mb-4 flex items-center text-green-900">
        <FaArrowLeft className="mr-2" /> Back
      </button>
      <h3 className="text-center font-montserrat text-3xl mb-5 text-green-900 font-bold">
        Choose Your Setup
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div
          className="bg-lightest-gray shadow-md rounded-lg p-6 text-center cursor-pointer"
          onClick={() => onSelect('justMe')}
        >
          <FaUser className="text-6xl text-green-900 mx-auto mb-4" />
          <p className="text-xl font-bold text-gray-700">It's just me</p>
        </div>
        <div
          className="bg-lightest-gray shadow-md rounded-lg p-6 text-center cursor-pointer"
          onClick={() => onSelect('familyJoin')}
        >
          <FaUsers className="text-6xl text-green-900 mx-auto mb-4" />
          <p className="text-xl font-bold text-gray-700">I want my family to join!</p>
        </div>
        <div
          className="bg-lightest-gray shadow-md rounded-lg p-6 text-center cursor-pointer"
          onClick={() => onSelect('justKids')}
        >
          <FaChild className="text-6xl text-green-900 mx-auto mb-4" />
          <p className="text-xl font-bold text-gray-700">It's just my kids</p>
        </div>
      </div>
    </div>
  );
};

export default OptionSelection;
