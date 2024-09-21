import React from 'react';
import { FaTrash, FaPlus } from 'react-icons/fa';

// FamilyMemberForm component handles the form for each family member's data
const FamilyMemberForm = ({ member, onChange, onRemove, onAdd }) => {

  // Handle input changes and update the corresponding member data
  const handleChange = (e) => {
    const { name, value } = e.target;
    onChange({ [name]: value }); // Pass the updated field back to the parent component
  };

  return (
    <div>
      {/* Form for editing family member details */}
      <form className="space-y-4">
        <div>
          <label className="block font-montserrat text-lg mb-2">Name</label>
          <input
            type="text"
            name="name"
            className="w-full p-2 border border-gray-300 rounded"
            value={member.name.charAt(0).toUpperCase() + member.name.slice(1)} // Capitalize the first letter of the name
            onChange={handleChange} // Call handleChange when the input changes
          />
        </div>
        <div>
          <label className="block font-montserrat text-lg mb-2">Age</label>
          <input
            type="number"
            name="age"
            className="w-full p-2 border border-gray-300 rounded"
            value={member.age} // Show the current age value
            onChange={handleChange} // Update the age when it changes
          />
        </div>
        <div>
          <label className="block font-montserrat text-lg mb-2">Dietary Restrictions</label>
          <input
            type="text"
            name="dietaryRestrictions"
            className="w-full p-2 border border-gray-300 rounded"
            value={member.dietaryRestrictions} // Show the dietary restrictions
            onChange={handleChange} // Update dietary restrictions when it changes
          />
        </div>
        <div>
          <label className="block font-montserrat text-lg mb-2">Preferred Ingredients</label>
          <input
            type="text"
            name="favoriteIngredients"
            className="w-full p-2 border border-gray-300 rounded"
            value={member.favoriteIngredients} // Show favorite ingredients
            onChange={handleChange} // Update favorite ingredients when it changes
          />
        </div>
        <div>
          <label className="block font-montserrat text-lg mb-2">Avoid These Ingredients</label>
          <input
            type="text"
            name="unlikedIngredients"
            className="w-full p-2 border border-gray-300 rounded"
            value={member.unlikedIngredients} // Show unliked ingredients
            onChange={handleChange} // Update unliked ingredients when it changes
          />
        </div>

        {/* Buttons to add a new family member and remove the current one */}
        <div className="flex justify-center my-4 gap-4">
          {/* Add family member button */}
          <button
            type="button"
            onClick={onAdd} // Call onAdd to add a new family member
            className="w-12 h-12 bg-green-600 text-white flex items-center justify-center rounded-full"
          >
            <FaPlus className="text-2xl"/>
          </button>

          {/* Remove family member button */}
          <button
            type="button"
            onClick={onRemove} // Call onRemove to remove the current family member
            className="w-12 h-12 bg-red-500 text-white flex items-center justify-center rounded-full"
          >
            <FaTrash className="text-2xl"/>
          </button>
        </div>
      </form>
    </div>
  );
};

export default FamilyMemberForm;