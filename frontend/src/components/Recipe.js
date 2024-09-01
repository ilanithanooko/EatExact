import React from 'react';

const Recipe = ({ title, ingredients, instructions, tips }) => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">{title}</h1> {/* Tailwind styling */}
      <h2 className="text-xl font-semibold mb-2">Ingredients</h2>
      <ul className="list-disc list-inside mb-4">
        {ingredients.map((ingredient, index) => (
          <li key={index} className="mb-1">{ingredient}</li>
        ))}
      </ul>
      <h2 className="text-xl font-semibold mb-2">Instructions</h2>
      <ol className="list-decimal list-inside mb-4">
        {instructions.map((instruction, index) => (
          <li key={index} className="mb-1">{instruction}</li>
        ))}
      </ol>
      <h2 className="text-xl font-semibold mb-2">Variations and Tips</h2>
      <ul className="list-disc list-inside">
        {tips.map((tip, index) => (
          <li key={index} className="mb-1">{tip}</li>
        ))}
      </ul>
    </div>
  );
};

export default Recipe;
