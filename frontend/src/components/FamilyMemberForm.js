import React from 'react';
import { FaTrash } from 'react-icons/fa';

const FamilyMemberForm = ({ member, onChange, onRemove }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onChange({ [name]: value });
  };

  return (
    <div>
      <form className="space-y-4">
        <div>
          <label className="block font-montserrat text-lg mb-2">Name</label>
          <input
            type="text"
            name="name"
            className="w-full p-2 border border-gray-300 rounded"
            value={member.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="block font-montserrat text-lg mb-2">Age</label>
          <input
            type="number"
            name="age"
            className="w-full p-2 border border-gray-300 rounded"
            value={member.age}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="block font-montserrat text-lg mb-2">Dietary Restrictions</label>
          <input
            type="text"
            name="dietaryRestrictions"
            className="w-full p-2 border border-gray-300 rounded"
            value={member.dietaryRestrictions}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="block font-montserrat text-lg mb-2">Favorite Ingredients</label>
          <input
            type="text"
            name="favoriteIngredients"
            className="w-full p-2 border border-gray-300 rounded"
            value={member.favoriteIngredients}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="block font-montserrat text-lg mb-2">Un-liked Ingredients</label>
          <input
            type="text"
            name="unlikedIngredients"
            className="w-full p-2 border border-gray-300 rounded"
            value={member.unlikedIngredients}
            onChange={handleChange}
          />
        </div>
        <button type="button" onClick={onRemove} className="flex items-center justify-center w-full mt-4 bg-red-500 p-3 text-white font-bold rounded-full">
          <FaTrash className="mr-2" /> Remove Family Member
        </button>
      </form>
    </div>
  );
};

export default FamilyMemberForm;
