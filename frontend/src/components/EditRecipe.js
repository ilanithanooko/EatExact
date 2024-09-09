import React from 'react';

const EditRecipe = ({ title, ingredients, instructions, tips, handleRecipeChange }) => {
  return (
    <div className='max-w-2xl'>
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
            rows={10}
            />
        </div>

        <button
            className='mt-4'
        >
            Save
        </button>
    </div>
  );
};

export default EditRecipe;
