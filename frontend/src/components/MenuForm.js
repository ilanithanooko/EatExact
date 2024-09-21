import React from "react";
import { FaTrash, FaPlus } from "react-icons/fa";

// MenuForm component handles the form for each Menu's data
const MenuForm = ({ menu, onChange, onRemove, onAdd }) => {
  // Handle input changes and update the corresponding menu data
  const handleChange = (e) => {
    const { name, value } = e.target;
    onChange({ [name]: value }); // Pass the updated field back to the parent component
  };

  return (
    <div>
      {/* Form for editing menu details */}
      <form className="space-y-4">
        <div>
          <label className="block font-montserrat text-lg mb-2">
            Menu Name
          </label>
          <input
            type="text"
            name="name"
            className="w-full p-2 border border-gray-300 rounded"
            value={menu.name.charAt(0).toUpperCase() + menu.name.slice(1)} // Capitalize the first letter of the menu name
            onChange={handleChange} // Call handleChange when the input changes
          />
        </div>

        {/* Buttons to add a new menu and remove the current one */}
        <div className="flex justify-center my-4 gap-4">
          {/* Add menu button */}
          <button
            type="button"
            onClick={onAdd} // Call onAdd to add a new menu
            className="w-12 h-12 bg-green-600 text-white flex items-center justify-center rounded-full"
          >
            <FaPlus className="text-2xl" />
          </button>

          {/* Remove menu button */}
          <button
            type="button"
            onClick={onRemove} // Call onRemove to remove the current menu
            className="w-12 h-12 bg-red-500 text-white flex items-center justify-center rounded-full"
          >
            <FaTrash className="text-2xl" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default MenuForm;
