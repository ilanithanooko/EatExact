import React from "react";
import { FaTrash, FaPlus } from "react-icons/fa";

const PatientForm = ({ member, onChange, onRemove, onAdd }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onChange({ [name]: value });
  };

  return (
    <div>
      <form className="space-y-4">
        <div className="grid grid-cols-2 gap-x-4 mt-2">
          <div>
            <label className="block text-lg">First Name</label>
            <input
              type="text"
              name="firstName"
              value={member.firstName}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div>
            <label className="block text-lg">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={member.lastName}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
        </div>
        <div>
          <label className="block text-lg">ID</label>
          <input
            type="text"
            name="id"
            value={member.id}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
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
          <label className="block font-montserrat text-lg mb-2">
            Dietary Restrictions
          </label>
          <input
            type="text"
            name="dietaryRestrictions"
            className="w-full p-2 border border-gray-300 rounded"
            value={member.dietaryRestrictions}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="block font-montserrat text-lg mb-2">
            Preferred Ingredients
          </label>
          <input
            type="text"
            name="favoriteIngredients"
            className="w-full p-2 border border-gray-300 rounded"
            value={member.favoriteIngredients}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="block font-montserrat text-lg mb-2">
            Avoid These Ingredients
          </label>
          <input
            type="text"
            name="unlikedIngredients"
            className="w-full p-2 border border-gray-300 rounded"
            value={member.unlikedIngredients}
            onChange={handleChange}
          />
        </div>

        <div className="flex justify-center my-4 gap-4">
          <button
            type="button"
            onClick={onAdd}
            className="w-12 h-12 bg-green-600 text-white flex items-center justify-center rounded-full"
          >
            <FaPlus className="text-2xl" />
          </button>
          <button
            type="button"
            onClick={onRemove}
            className="w-12 h-12 bg-red-500 text-white flex items-center justify-center rounded-full"
          >
            <FaTrash className="text-2xl" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default PatientForm;
