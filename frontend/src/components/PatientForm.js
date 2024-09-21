import React from "react";
import { FaTrash, FaPlus } from "react-icons/fa";

// PatientForm component handles the form for each patient's data
const PatientForm = ({ member, onChange, onRemove, onAdd }) => {

  // Handle input changes and update the corresponding patient data
  const handleChange = (e) => {
    const { name, value } = e.target;
    onChange({ [name]: value }); // Pass the updated field back to the parent component
  };

  return (
    <div>
      {/* Form to capture patient details */}
      <form className="space-y-4">
        <div className="grid grid-cols-2 gap-x-4 mt-2">
          <div>
            <label className="block text-lg">First Name</label>
            <input
              type="text"
              name="firstName"
              value={member.firstName} // Current value of the first name
              onChange={handleChange} // Update first name on change
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div>
            <label className="block text-lg">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={member.lastName} // Current value of the last name
              onChange={handleChange} // Update last name on change
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
        </div>
        <div>
          <label className="block text-lg">ID</label>
          <input
            type="text"
            name="id"
            value={member.id} // Current value of the ID
            onChange={handleChange} // Update ID on change
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <label className="block font-montserrat text-lg mb-2">Age</label>
          <input
            type="number"
            name="age"
            className="w-full p-2 border border-gray-300 rounded"
            value={member.age} // Current value of the age
            onChange={handleChange} // Update age on change
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
            value={member.dietaryRestrictions} // Current value of dietary restrictions
            onChange={handleChange} // Update dietary restrictions on change
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
            value={member.favoriteIngredients} // Current value of favorite ingredients
            onChange={handleChange} // Update favorite ingredients on change
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
            value={member.unlikedIngredients} // Current value of ingredients to avoid
            onChange={handleChange} // Update unliked ingredients on change
          />
        </div>

        {/* Buttons to add a new patient and remove the current one */}
        <div className="flex justify-center my-4 gap-4">
          {/* Add patient button */}
          <button
            type="button"
            onClick={onAdd} // Call onAdd to add a new patient form
            className="w-12 h-12 bg-green-600 text-white flex items-center justify-center rounded-full"
          >
            <FaPlus className="text-2xl" />
          </button>

          {/* Remove patient button */}
          <button
            type="button"
            onClick={onRemove} // Call onRemove to remove the current patient form
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