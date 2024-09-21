import React, { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

// PersonalForm component for getting user information
const PersonalForm = ({ onBack, user, onUserDataChange }) => {
  const [age, setAge] = useState("");
  const [dietaryRestrictions, setDietaryRestrictions] = useState("");
  const [favoriteIngredients, setFavoriteIngredients] = useState("");
  const [unlikedIngredients, setUnlikedIngredients] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/user/updateInfo`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          // Send updated user information
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

      // Handle failed response
      if (!response.ok) {
        throw new Error("Failed to update information");
      } else if (response.ok) {
        if (onUserDataChange) {
          onUserDataChange(); // Trigger user data update in parent component if necessary
        }
        navigate("/"); // Navigate to home page on success
      }
    } catch (error) {
      setError(error.message); // Display error message if API call fails
    }
  };

  return (
    <div>
      {/* Back button to return to the previous page */}
      <button
        onClick={onBack} // Trigger back navigation
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
          provide us with a few key details. These will be saved in your profile,
          so you won’t need to re-enter them every time you generate new recipes:
        </div>

        {/* Display error message if any */}
        {error && <p className="text-red-600 text-center">{error}</p>}

        {/* Form to input user details */}
        <form className="space-y-3" onSubmit={handleSubmit}>
          <div>
            <label className="block text-lg">Age</label>
            <input
              type="number"
              value={age} // Bind age state to input
              onChange={(e) => setAge(e.target.value)} // Update age state on input change
              className="w-full p-2 border border-gray-300 rounded"
              required // Make field required
            />
          </div>
          <div>
            <label className="block text-lg">Dietary Restrictions</label>
            <input
              type="text"
              value={dietaryRestrictions} // Bind dietaryRestrictions state to input
              onChange={(e) => setDietaryRestrictions(e.target.value)} // Update dietaryRestrictions state on input change
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div>
            <label className="block text-lg">Preferred Ingredients</label>
            <input
              type="text"
              value={favoriteIngredients} // Bind favoriteIngredients state to input
              onChange={(e) => setFavoriteIngredients(e.target.value)} // Update favoriteIngredients state on input change
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div>
            <label className="block text-lg">Avoid These Ingredients</label>
            <input
              type="text"
              value={unlikedIngredients} // Bind unlikedIngredients state to input
              onChange={(e) => setUnlikedIngredients(e.target.value)} // Update unlikedIngredients state on input change
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>

          {/* Submit button */}
          <div className="flex justify-center pt-2">
            <button
              type="submit" // Trigger form submission
              className="text-center rounded-md py-3 px-12 text-sm lg:text-lg text-white shadow-md bg-green-600 hover:bg-green-700"
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