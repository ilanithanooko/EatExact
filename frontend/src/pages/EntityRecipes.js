import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import Recipe from "../components/Recipe"; // Import the Recipe component
import { useLocation, useNavigate } from "react-router-dom";
import { GrClose } from "react-icons/gr";
import { FaTrash } from "react-icons/fa";
import { FaPenToSquare } from "react-icons/fa6";


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
  const [isEditPopupVisible, setIsEditPopupVisible] = useState(false); // Track the edit pop-up visibility
  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");
  const [tips, setTips] = useState("");
  const [noRecipes, setNoRecipes] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const { userData } = location.state || {};

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
      } else {
        setNoRecipes(true);
        console.log("No recipes in DB");
      }
    };

    if (user && entityId) {
      fetchRecipes();
      console.log("Entity Id is:", entityId);
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
    setIngredients(
      Array.from(doc.querySelectorAll("ul li")).map((li) => li.textContent)
    );
    setInstructions(
      Array.from(doc.querySelectorAll("ol li")).map((li) => li.textContent)
    );
    setTips(
      Array.from(doc.querySelectorAll("ul:nth-of-type(2) li")).map(
        (li) => li.textContent
      )
    );
  };

  const handleEditClick = (recipe) => {
    setSelectedRecipe(recipe); // Set the selected recipe for editing
    setIsEditPopupVisible(true); // Show the edit pop-up

    // Populate the edit fields with the current recipe values
    setTitle(recipe.title);
    setIngredients(recipe.ingredients.join("\n")); // Convert array to text
    setInstructions(recipe.instructions.join("\n")); // Convert array to text
    setTips(recipe.tips.join("\n")); // Convert array to text
  };

  const handleSaveRecipe = async () => {
    if (selectedRecipe) {
      const updatedRecipe = {
        title,
        ingredients: ingredients.split("\n"), // Convert text to array
        instructions: instructions.split("\n"), // Convert text to array
        tips: tips.split("\n"), // Convert text to array
      };

      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/api/recipes/${selectedRecipe._id}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${user.token}`,
            },
            body: JSON.stringify(updatedRecipe),
          }
        );

        if (response.ok) {
          // Update the recipe list after saving
          const updatedRecipes = recipes.map((recipe) =>
            recipe._id === selectedRecipe._id ? { ...recipe, ...updatedRecipe } : recipe
          );
          setRecipes(updatedRecipes);
          setFilteredRecipes(updatedRecipes);

          // Close the edit pop-up
          setIsEditPopupVisible(false);
        }
      } catch (error) {
        console.error("Error saving recipe:", error);
      }
    }
  };

  const closePopup = () => {
    setIsPopupVisible(false); // Hide the pop-up
    setIsEditPopupVisible(false); // Hide the edit pop-up
    setIsConfirmPopupVisible(false); // Hide the confirmation pop-up
  };

  const handleDeleteClick = (recipeId) => {
    setIsConfirmPopupVisible(true); // Show confirmation pop-up
  };

  const confirmDelete = async () => {
    if (selectedRecipe) {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/api/recipes/${selectedRecipe._id}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );

        if (response.ok) {
          // Update the recipe list after deletion
          const updatedRecipes = recipes.filter(
            (recipe) => recipe._id !== selectedRecipe._id
          );
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
    <div className="px-5 xl:px-8">
      <div className="md:px-8 lg:px-24 xl:px-36 2xl:px-80">
        <div>
          <h3 className="text-center text-xl md:text-2xl mb-4 text-green-800 font-semibold">
            Recipe Collection
          </h3>
          {noRecipes && (
            <div className="text-center text-lg mb-5 text-gray-700">
              It looks like you haven’t saved any recipes yet!
              <br />
              Start discovering delicious meals and build your personalized
              collection of go-to recipes today!
              <button
                onClick={() => navigate("/")}
                className="rounded-md bg-green-600 mt-5 p-4 text-xl leading-6 text-white shadow-sm hover:bg-green-700"
              >
                Discover Delicious Recipes Now!
              </button>
            </div>
          )}
        </div>

        {/* Display Recipes */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredRecipes.map((recipe) => (
            <div className="border-2 bg-white text-black text-center rounded-md p-2 text-sm lg:text-lg shadow-md border-green-600">
              <div
                key={recipe._id}
                className="cursor-pointer text-black text-center rounded-md p-5 text-sm lg:text-lg border-green-600 bg-gray-100 hover:bg-green-600 hover:text-white"
                onClick={() => handleRecipeClick(recipe)} // Handle recipe click
              >
                {recipe.title}
              </div>

              <div className="flex gap-x-2 mt-2">
                <button
                  key={recipe._id}
                  type="button"
                  onClick={() => handleEditClick(recipe)} // Handle edit click
                  className="w-8 h-8 bg-blue-500 hover:bg-blue-600 text-white flex items-center justify-center rounded-full"
                >
                  <FaPenToSquare className="text-lg" />
                </button>
                <button
                  key={recipe._id}
                  type="button"
                  onClick={handleDeleteClick}
                  className="w-8 h-8 bg-red-500 hover:bg-red-600 text-white flex items-center justify-center rounded-full"
                >
                  <FaTrash className="text-lg" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Edit Recipe Pop-up */}
      {isEditPopupVisible && (
        <div className="fixed inset-0 mt-16 flex justify-center items-center">
          <div className="flex flex-col bg-white rounded-lg shadow-lg p-5 mx-4 overflow-y-auto max-h-[80vh]">
            <div className="text-right">
              <button
                className="w-12 h-12 bg-gray-500 hover:bg-gray-600 text-white flex items-center justify-center rounded-full"
                onClick={closePopup}
              >
                <GrClose className="text-2xl" />
              </button>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Edit Recipe</h3>

              <div>
                <label className="block text-lg">Title</label>
                <textarea
                  className="w-full p-2 border border-gray-300 rounded"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-lg">Ingredients</label>
                <textarea
                  className="w-full p-2 border border-gray-300 rounded"
                  value={ingredients}
                  onChange={(e) => setIngredients(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-lg">Instructions</label>
                <textarea
                  className="w-full p-2 border border-gray-300 rounded"
                  value={instructions}
                  onChange={(e) => setInstructions(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-lg">Tips</label>
                <textarea
                  className="w-full p-2 border border-gray-300 rounded"
                  value={tips}
                  onChange={(e) => setTips(e.target.value)}
                />
              </div>

              <div className="flex justify-end">
                <button
                  onClick={handleSaveRecipe}
                  className="bg-green-600 text-white p-2 rounded-md"
                >
                  Save Recipe
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Pop-up for Recipe Details */}
      {isPopupVisible && selectedRecipe && (
        <div className="fixed inset-0 mt-16 flex justify-center items-center">
          <div className="flex flex-col bg-white rounded-lg shadow-lg p-5 mx-4 overflow-y-auto max-h-[80vh]">
            <div className="text-right">
              <button
                className="w-12 h-12 bg-gray-500 hover:bg-gray-600 text-white flex items-center justify-center rounded-full"
                onClick={closePopup}
              >
                <GrClose className="text-2xl" />
              </button>
            </div>
            <Recipe
              title={title}
              ingredients={ingredients}
              instructions={instructions}
              tips={tips}
              userData={userData}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default EntityRecipes;
