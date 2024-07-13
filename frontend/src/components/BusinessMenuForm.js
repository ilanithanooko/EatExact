import React from 'react';

const BusinessMenuForm = ({ onBack }) => {
  return (
    <div>
      <h3 className="text-center font-montserrat text-2xl mb-4 text-green-900 font-bold">
        Add Business Menus
      </h3>
      <p className="text-center font-montserrat text-lg mb-4 text-gray-700">
        You can add menus later as well.
      </p>
      <form className="space-y-4">
        <div>
          <label className="block font-montserrat text-lg mb-2">Menu Name</label>
          <input type="text" className="w-full p-2 border border-gray-300 rounded" />
        </div>
        <button type="submit" className="w-full bg-wood-green p-3 text-white font-bold rounded">
          Add Menu
        </button>
        <button
          type="button"
          onClick={onBack}
          className="w-full mt-4 bg-gray-300 p-3 text-gray-900 font-bold rounded"
        >
          Back
        </button>
      </form>
    </div>
  );
};

export default BusinessMenuForm;
