import React, { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const PersonalForm = ({ onBack, user, onUserDataChange}) => {
  const [age, setAge] = useState("");
  const [dietaryRestrictions, setDietaryRestrictions] = useState("");
  const [favoriteIngredients, setFavoriteIngredients] = useState("");
  const [unlikedIngredients, setUnlikedIngredients] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/user/updateInfo`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Assuming token is stored in localStorage
          },
          // Using user.email to identify the user
          body: JSON.stringify({
            email: user.email,
            role: "Individual",
            age: age,
            dietaryRestrictions: dietaryRestrictions,
            favoriteIngredients: favoriteIngredients,
            unlikedIngredients: unlikedIngredients,
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to update information");
      } else if (response.ok) {
        if (onUserDataChange) {
          onUserDataChange();
        }
        navigate("/");
      }
      // Redirect or show success message
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <button
        onClick={onBack}
        className="mb-4 flex items-center text-green-800"
      >
        <FaArrowLeft className="mr-2" />
      </button>
      <div className="md:px-8 lg:px-24 xl:px-36 2xl:px-96">
        <h3 className="text-center text-xl md:text-2xl mb-4 text-green-800 font-semibold">
          Let's Personalize Your Experience!
        </h3>
        <div className="text-center text-lg mb-5 text-gray-700">
          To ensure that every recipe is tailored exactly to your needs, please
          provide us with a few key details.
          These will be saved in your profile, so you won’t need to re-enter
          them every time you generate new recipes:
        </div>
        {error && <p className="text-red-600 text-center">{error}</p>}
        <form className="space-y-3 " onSubmit={handleSubmit}>
          <div>
            <label className="block text-lg">Age</label>
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div>
            <label className="block text-lg">
              Dietary Restrictions
            </label>
            <input
              type="text"
              value={dietaryRestrictions}
              onChange={(e) => setDietaryRestrictions(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div>
            <label className="block text-lg">
              Preferred Ingredients
            </label>
            <input
              type="text"
              value={favoriteIngredients}
              onChange={(e) => setFavoriteIngredients(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div>
            <label className="block text-lg">
              Avoid These Ingredients
            </label>
            <input
              type="text"
              value={unlikedIngredients}
              onChange={(e) => setUnlikedIngredients(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="flex justify-center pt-2">
            <button
              type="submit"
              className={`text-center rounded-md py-3 px-12 text-sm lg:text-lg text-white shadow-md bg-green-600 hover:bg-green-700`}
            >
              Let's get started!
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PersonalForm;
