import React, { useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";

const PersonalForm = ({ onBack, user }) => {
  const [age, setAge] = useState('');
  const [dietaryRestrictions, setDietaryRestrictions] = useState('');
  const [favoriteIngredients, setFavoriteIngredients] = useState('');
  const [unlikedIngredients, setUnlikedIngredients] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/user/updateRole`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}` // Assuming token is stored in localStorage
        },
        body: JSON.stringify({ email: user.email, role: 'Individual' }) // Using user.email to identify the user
      });
      if (!response.ok) {
        throw new Error('Failed to update role');
      } else if (response.ok){
        navigate("/")
      }
      // Redirect or show success message
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <button onClick={onBack} className="mb-4 flex items-center text-green-900">
        <FaArrowLeft className="mr-2" /> Back
      </button>
      <h3 className="text-center font-montserrat text-2xl mb-4 text-green-900 font-bold">
        Personal Information
      </h3>
      {error && <p className="text-red-600 text-center">{error}</p>}
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block font-montserrat text-lg mb-2">Age</label>
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div>
          <label className="block font-montserrat text-lg mb-2">Dietary Restrictions</label>
          <input
            type="text"
            value={dietaryRestrictions}
            onChange={(e) => setDietaryRestrictions(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div>
          <label className="block font-montserrat text-lg mb-2">Favorite Ingredients</label>
          <input
            type="text"
            value={favoriteIngredients}
            onChange={(e) => setFavoriteIngredients(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div>
          <label className="block font-montserrat text-lg mb-2">Un-liked Ingredients</label>
          <input
            type="text"
            value={unlikedIngredients}
            onChange={(e) => setUnlikedIngredients(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <button type="submit" className="w-full bg-wood-green p-3 text-white font-bold rounded">
          Let's get started!
        </button>
      </form>
    </div>
  );
};


export default PersonalForm;
