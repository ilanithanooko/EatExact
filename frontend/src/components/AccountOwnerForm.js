import React from 'react';

const AccountOwnerForm = ({ onSubmit }) => {
  return (
    <div>
      <h3 className="text-center font-montserrat text-2xl mb-4 text-green-900 font-bold">
        Account Owner Information
      </h3>
      <form className="space-y-4" onSubmit={onSubmit}>
        <div>
          <label className="block font-montserrat text-lg mb-2">Name</label>
          <input type="text" className="w-full p-2 border border-gray-300 rounded" />
        </div>
        <div>
          <label className="block font-montserrat text-lg mb-2">Age</label>
          <input type="number" className="w-full p-2 border border-gray-300 rounded" />
        </div>
        <div>
          <label className="block font-montserrat text-lg mb-2">Dietary Restrictions</label>
          <input type="text" className="w-full p-2 border border-gray-300 rounded" />
        </div>
        <div>
          <label className="block font-montserrat text-lg mb-2">Favorite Ingredients</label>
          <input type="text" className="w-full p-2 border border-gray-300 rounded" />
        </div>
        <div>
          <label className="block font-montserrat text-lg mb-2">Un-liked Ingredients</label>
          <input type="text" className="w-full p-2 border border-gray-300 rounded" />
        </div>
        <button type="submit" className="w-full bg-wood-green p-3 text-white font-bold rounded">
          Continue
        </button>
      </form>
    </div>
  );
};

export default AccountOwnerForm;
