import React from 'react';
import { FaTrash, FaPlus } from 'react-icons/fa';

const MenuForm = ({ menu, onChange, onRemove, onAdd }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onChange({ [name]: value });
  };

  return (
    <div>
      <form className="space-y-4">
        <div>
          <label className="block font-montserrat text-lg mb-2">Menu Name</label>
          <input
            type="text"
            name="name"
            className="w-full p-2 border border-gray-300 rounded"
            value={menu.name.charAt(0).toUpperCase() + menu.name.slice(1)}
            onChange={handleChange}
          />
        </div>

        <div className="flex justify-center my-4 gap-4">
          <button
            type="button"
            onClick={onAdd}
            className="w-12 h-12 bg-green-600 text-white flex items-center justify-center rounded-full"
          >
            <FaPlus className="text-2xl"/>
          </button>
          <button
            type="button"
            onClick={onRemove}
            className="w-12 h-12 bg-red-500 text-white flex items-center justify-center rounded-full"
          >
            <FaTrash className="text-2xl"/>
          </button>
        </div>
      </form>
    </div>
  );
};

export default MenuForm;
