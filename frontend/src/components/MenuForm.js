import React from 'react';
import { FaTrash } from 'react-icons/fa';

const MenuForm = ({ menu, onChange, onRemove }) => {
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
            value={menu.name}
            onChange={handleChange}
          />
        </div>
        <button type="button" onClick={onRemove} className="flex items-center justify-center w-full mt-4 bg-red-500 p-3 text-white font-bold rounded-full">
          <FaTrash className="mr-2" /> Remove Menu
        </button>
      </form>
    </div>
  );
};

export default MenuForm;
