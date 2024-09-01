import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import Recipe from "../components/Recipe"; // Import the Recipe component

const EntityRecipes = () => {
  const { user } = useAuthContext();
  const { entityId } = useParams();
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedRecipe, setSelectedRecipe] = useState(null); // Track the selected recipe
  const [isPopupVisible, setIsPopupVisible] = useState(false); // Track the pop-up visibility
  const [isConfirmPopupVisible, setIsConfirmPopupVisible] = useState(false); // Track confirmation pop-up visibility
  const [title, setTitle] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState('');
  const [tips, setTips] = useState('');

  useEffect(() => {
    const fetchRecipes = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/recipes/${entityId}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      const json = await response.json();
      if (response.ok) {
        setRecipes(json);
        setFilteredRecipes(json); // Initially show all recipes
        updateCategories(json); // Update categories
      }
    };

    if (user) {
      fetchRecipes();
    }
  }, [user, entityId]);

  const updateCategories = (recipesList) => {
    const uniqueCategories = [
      "All",
      ...new Set(recipesList.map((recipe) => recipe.category)),
    ];
    setCategories(uniqueCategories);
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    if (category === "All") {
      setFilteredRecipes(recipes);
    } else {
      setFilteredRecipes(
        recipes.filter((recipe) => recipe.category === category)
      );
    }
  };

  const handleRecipeClick = (recipe) => {
    setSelectedRecipe(recipe); // Set the selected recipe
    setIsPopupVisible(true); // Show the pop-up

    // Parse the HTML response into structured data
    const parser = new DOMParser();
    const doc = parser.parseFromString(recipe.description, "text/html");
    setTitle(doc.querySelector("h1")?.textContent || "No Title");
    setIngredients(Array.from(doc.querySelectorAll("ul li")).map(
      (li) => li.textContent
    ));
    setInstructions(Array.from(doc.querySelectorAll("ol li")).map(
      (li) => li.textContent
    ));
    setTips(Array.from(doc.querySelectorAll("ul:nth-of-type(2) li")).map(
      (li) => li.textContent
    ));
  };

  const closePopup = () => {
    setIsPopupVisible(false); // Hide the pop-up
    setIsConfirmPopupVisible(false); // Hide the confirmation pop-up
  };

  const handleDeleteClick = () => {
    setIsConfirmPopupVisible(true); // Show confirmation pop-up
  };

  const confirmDelete = async () => {
    if (selectedRecipe) {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/recipes/${selectedRecipe._id}`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });

        if (response.ok) {
          // Update the recipe list after deletion
          const updatedRecipes = recipes.filter(recipe => recipe._id !== selectedRecipe._id);
          setRecipes(updatedRecipes);
          setFilteredRecipes(updatedRecipes);

          // Update categories after deletion
          updateCategories(updatedRecipes);

          // Close both pop-ups
          closePopup();
        }
      } catch (error) {
        console.error("Error deleting recipe:", error);
      }
    }
  };

  const cancelDelete = () => {
    setIsConfirmPopupVisible(false); // Hide the confirmation pop-up
  };

  return (
    <div className="bg-gray-100 h-screen px-4 sm:px-10 lg:px-32 pt-4">
      <div className="bg-white rounded-3xl mx-auto p-8 shadow-lg">
        <div className="text-center font-montserrat text-3xl mb-5 text-green-900 font-bold">
          Recipes
        </div>
        {/* Category Carousel */}
        <div className="flex overflow-x-auto space-x-4 mb-5">
          {categories.map((category) => (
            <button
              key={category}
              className={`py-2 px-4 rounded-full ${
                selectedCategory === category
                  ? "bg-green-900 text-white"
                  : "bg-lightest-gray text-green-900"
              } font-bold`}
              onClick={() => handleCategoryClick(category)}
            >
              {category}
            </button>
          ))}
        </div>
        {/* Display Recipes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRecipes.map((recipe) => (
            <div
              key={recipe._id}
              className="bg-lightest-gray rounded-lg p-4 shadow-md text-xl font-bold cursor-pointer"
              onClick={() => handleRecipeClick(recipe)} // Handle recipe click
            >
              {recipe.title}
            </div>
          ))}
        </div>
      </div>

      {/* Pop-up for Recipe Details */}
      {isPopupVisible && selectedRecipe && (
        <div className="fixed inset-0 bg-white bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg p-8 shadow-lg w-11/12 sm:w-3/4 lg:w-1/2 relative max-h-[80vh] overflow-y-auto">
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
              onClick={closePopup}
            >
              Close
            </button>
            <Recipe title={title} ingredients={ingredients} instructions={instructions} tips={tips} />
            <div className="flex justify-end mt-4">
              <i className="fa-solid fa-trash cursor-pointer" onClick={handleDeleteClick}></i>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Pop-up */}
      {isConfirmPopupVisible && (
        <div className="fixed inset-0 bg-white bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg p-8 shadow-lg w-11/12 sm:w-3/4 lg:w-1/2 relative">
            <div className="text-center text-xl mb-4">Are you sure you want to delete this recipe?</div>
            <div className="flex justify-center space-x-4">
              <button className="bg-red-600 text-white px-4 py-2 rounded-full" onClick={confirmDelete}>Yes</button>
              <button className="bg-gray-600 text-white px-4 py-2 rounded-full" onClick={cancelDelete}>No</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EntityRecipes;
