import React from "react";
import { FaTrash } from "react-icons/fa";
import { FaPenToSquare } from "react-icons/fa6";

const RecipeSection = ({
  recipe,
  onRecipeClick,
  onDelete,
  onConfirm,
  onCancel,
  onEdit,
  recipeToDelete,
}) => {
  return (
    <div className="grid grid-rows-1 border-2 bg-white text-black text-center rounded-md p-2 text-sm lg:text-lg shadow-md border-green-600">
      <div
        className="cursor-pointer text-black text-center rounded-md p-5 text-sm lg:text-lg border-green-600 bg-gray-100 hover:bg-green-600 hover:text-white"
        onClick={onRecipeClick} // Handle recipe click
      >
        {recipe.title}
      </div>

      <div className="flex gap-x-2 mt-2">
        <button
          type="button"
          onClick={onEdit}
          className="w-8 h-8 bg-blue-500 hover:bg-blue-600 text-white flex items-center justify-center rounded-full"
        >
          <FaPenToSquare className="text-lg" />
        </button>
        <button
          type="button"
          onClick={onDelete} // Handle delete click
          className="w-8 h-8 bg-red-500 hover:bg-red-600 text-white flex items-center justify-center rounded-full"
        >
          <FaTrash className="text-lg" />
        </button>

        {/* Confirmation for deletion */}
        {recipeToDelete === recipe._id && (
          <div className="flex justify-center items-center text-center text-xl gap-2">
            <p className="text-sm lg:text-lg">Are you sure?</p>
            <button
              className="w-8 h-8 bg-red-500 hover:bg-red-600 text-white text-sm flex items-center justify-center rounded-full"
              onClick={onConfirm}
            >
              Yes
            </button>
            <button
              className="w-8 h-8 bg-gray-500 hover:bg-gray-600 text-white text-sm flex items-center justify-center rounded-full"
              onClick={onCancel}
            >
              No
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecipeSection;

