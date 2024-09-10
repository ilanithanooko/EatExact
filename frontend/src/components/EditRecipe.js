import React from "react";
import { Link } from "react-router-dom";

const EditRecipe = ({
  title,
  ingredients,
  instructions,
  tips,
  handleRecipeChange,
  handleSave,
}) => {
  return (
    <div className="">
        <h3 className="text-center text-xl md:text-2xl mb-4 text-green-800 font-semibold">
            Edit your recipe
        </h3>
        <div className="text-center text-lg mb-5 text-gray-700">
          Update the title, ingredients, instructions, and tips as needed to
          perfect your dish.
          <br />
          Once you're done, click the <span className="font-semibold">'Save Changes'</span> button to keep
          your changes.<br/>
          If you notice an ingredient you don't like, feel free to update your preferences<br/>in the <Link className="font-semibold hover:text-gray-600" to="/settings">Settings</Link> section to ensure future recipes match your taste.
        </div>
      <div>
        <label className="block text-lg font-semibold">Recipe Title</label>
        <textarea
          name="title"
          value={title}
          onChange={handleRecipeChange}
          className="w-full p-2 border border-gray-300 rounded"
          rows={1}
        />
      </div>
      <div>
        <label className="block text-lg font-semibold">Ingredients</label>
        <textarea
          name="ingredients"
          value={ingredients}
          onChange={handleRecipeChange}
          className="w-full p-2 border border-gray-300 rounded"
          rows={10}
        />
      </div>
      <div>
        <label className="block text-lg font-semibold">Instructions</label>
        <textarea
          name="instructions"
          value={instructions}
          onChange={handleRecipeChange}
          className="w-full p-2 border border-gray-300 rounded"
          rows={10}
        />
      </div>
      <div>
        <label className="block text-lg font-semibold">Tips</label>
        <textarea
          name="tips"
          value={tips}
          onChange={handleRecipeChange}
          className="w-full p-2 border border-gray-300 rounded"
          rows={5}
        />
      </div>

      <div className="flex justify-center items-center">
          <button
            className="bg-green-600 text-white flex items-center justify-center py-2 px-4 rounded-md mt-2"
            onClick={handleSave}
          >
            Save Changes
          </button>
      </div>
    </div>
  );
};
export default EditRecipe;
