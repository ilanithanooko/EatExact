import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import Recipe from "../components/Recipe"; // Import the Recipe component
import { useLocation, useNavigate } from "react-router-dom";
import { GrClose } from "react-icons/gr";
import RecipeSection from "../components/RecipeSection";
import EditRecipe from "../components/EditRecipe";

const EntityRecipes = () => {
  const { user } = useAuthContext();
  const { entityId } = useParams();
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedRecipe, setSelectedRecipe] = useState(null); // Track the selected recipe
  const [isRecipePopupVisible, setIsRecipePopupVisible] = useState(false); // Track the pop-up visibility
  const [isEditPopupVisible, setIsEditPopupVisible] = useState(false); // Track the pop-up visibility
  const [recipeToDelete, setRecipeToDelete] = useState(null); // Track the specific recipe to delete
  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");
  const [tips, setTips] = useState("");
  const [noRecipes, setNoRecipes] = useState(false);
  const [isEdited, setIsEdited] = useState(false)

  const [recipeData, setRecipeData] = useState({
    title: title,
    ingredients: ingredients,
    instructions: instructions,
    tips: tips
  });

  const handleRecipeChange = (e) => {
    const { name, value } = e.target;
    setRecipeData((prevData) => ({ ...prevData, [name]: value }));
  };

  const location = useLocation();
  const navigate = useNavigate();
  const { userData } = location.state || {};

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

  useEffect(() => {


    if (user && entityId) {
      fetchRecipes();
      console.log("Entity Id is:", entityId);
    }
  }, [user, entityId]);

  useEffect(() => {
    if (isEdited) {
      fetchRecipes();
      setIsEdited(false)
    }


  }, [isEdited])

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

  const parser = (recipe) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(recipe.description, "text/html");

    return {
      title: doc.querySelector("h1")?.textContent || "No Title",
      ingredients: Array.from(doc.querySelectorAll("ul:nth-of-type(1) li")).map((li) => li.textContent),
      instructions: Array.from(doc.querySelectorAll("ol li")).map((li) => li.textContent),
      tips: Array.from(doc.querySelectorAll("ul:nth-of-type(2) li")).map((li) => li.textContent)
    };
  }

  const handleRecipeClick = (recipe) => {
    const parsedData = parser(recipe);
    setTitle(parsedData.title);
    setIngredients(parsedData.ingredients);
    setInstructions(parsedData.instructions);
    setTips(parsedData.tips);
    setSelectedRecipe(recipe);
    setIsRecipePopupVisible(true);
  };

  const handleRecipeEdit = (recipe) => {
    const parsedData = parser(recipe);
    setRecipeData({
      title: parsedData.title,
      ingredients: parsedData.ingredients.join("\n"),
      instructions: parsedData.instructions.join("\n"),
      tips: parsedData.tips.join("\n")
    });
    setSelectedRecipe(recipe);
    setIsEditPopupVisible(true);
  };
  const closePopup = () => {
    setIsRecipePopupVisible(false); // Hide the pop-up
    setRecipeToDelete(null); // Hide the confirmation pop-up
  };

  const closeEditPopup = () => {
    setIsEditPopupVisible(false); // Hide the pop-up
  };

  const handleDeleteClick = (recipeId) => {
    setRecipeToDelete(recipeId); // Track the recipe ID for which confirmation is needed
  };

  const confirmDelete = async () => {
    if (recipeToDelete) {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/api/recipes/${recipeToDelete}`,
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
            (recipe) => recipe._id !== recipeToDelete
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
    setRecipeToDelete(null); // Hide the confirmation pop-up
  };

  const handleSave = async () => {
    const recipeHTML = `
      <h1>${recipeData.title}</h1>
      <h2>Ingredients</h2>
      <ul>
        ${recipeData.ingredients.split("\n").map((ingredient) => `<li>${ingredient}</li>`).join('')}
      </ul>
      <h2>Instructions</h2>
      <ol>
        ${recipeData.instructions.split("\n").map((step) => `<li>${step}</li>`).join('')}
      </ol>
      <h2>Notes</h2>
      <ul>
        ${recipeData.tips.split("\n").map((tip) => `<li>${tip}</li>`).join('')}
      </ul>
    `;
  
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/recipes/${selectedRecipe._id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify({ title:recipeData.title, description: recipeHTML }),
    });
  
    if (response.ok) {
      const updatedRecipe = await response.json();
      const updatedRecipes = recipes.map((recipe) =>
        recipe._id === selectedRecipe._id ? updatedRecipe : recipe
      );
      setRecipes(updatedRecipes);
      setFilteredRecipes(updatedRecipes);
      closeEditPopup();
      setSelectedRecipe(null);
      setIsEdited(true)
    } else {
      console.error('Failed to update recipe');
    }
  };

  return (
    <div className="px-5 xl:px-8">
      <div className="md:px-8 lg:px-24 xl:px-36 2xl:px-80">
        <div>
          <h3 className="text-center text-xl md:text-2xl mb-4 text-green-800 font-semibold">
            Recipe Collection
          </h3>
          {noRecipes && (
            <>
              <div className="text-center text-lg mb-5 text-gray-700">
                <div>
                  It looks like you haven’t saved any recipes yet!
                  <br />
                  Explore new recipes tailored to your preferences and save your
                  favorites for easy access later.
                  <br />
                  Start discovering delicious meals and build your personalized
                  collection of go-to recipes today!
                </div>
                <div>
                  <button
                    onClick={() => {
                      navigate("/");
                    }}
                    className="rounded-md bg-green-600 mt-5 p-4 text-xl leading-6 text-white shadow-sm hover:bg-green-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-wood-green"
                  >
                    Discover Delicious Recipes Now!
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
        {/* Category Carousel */}
        <div className="flex overflow-x-auto space-x-4 mb-5">
          {categories.map((category) => (
            <button
              key={category}
              className={`text-center rounded-full p-2 px-4 text-sm lg:text-lg shadow-md bg-green-600 hover:bg-green-800 text-white
                ${
                  selectedCategory === category
                    ? "bg-green-800 font-medium"
                    : ""
                }`}
              onClick={() => handleCategoryClick(category)}
            >
              {category}
            </button>
          ))}
        </div>
        {/* Display Recipes */}
        <div className={`grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6`}>
          {filteredRecipes.map((recipe) => (
            <RecipeSection
            key={recipe._id}
            recipe={recipe}
            onRecipeClick={() => {handleRecipeClick(recipe)}}
            onDelete={() => {handleDeleteClick(recipe._id)}}
            onConfirm={confirmDelete}
            onCancel={cancelDelete}
            onEdit={() => {handleRecipeEdit(recipe)}}
            recipeToDelete={recipeToDelete}
            />

          ))}
        </div>
      </div>

      {/* Pop-up for Recipe Details */}
      {isRecipePopupVisible && selectedRecipe && (
        <div className="fixed inset-0 mt-16 flex justify-center items-center">
          <div className="flex flex-col bg-white rounded-lg shadow-lg p-5 mx-4 overflow-y-auto max-h-[80vh]">
            <div className="place-items-end">
              <button
                className="w-7 h-7 mb-2 bg-gray-500 hover:bg-gray-600 text-white flex items-center justify-center rounded-full"
                onClick={closePopup}
              >
                <GrClose className="text-lg" />
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

      {/* Pop-up for Recipe Edit */}
    {isEditPopupVisible && (
        <div className="fixed inset-0 mt-16 flex justify-center items-center">
        <div className="flex flex-col bg-white rounded-lg shadow-lg p-5 mx-4 overflow-y-auto w-auto max-w-full max-h-[80vh]">
          <div className="text-right">
            <button
              className="w-8 h-8 bg-gray-500 hover:bg-gray-600 text-white flex items-center justify-center rounded-full"
              onClick={closeEditPopup}
            >
              <GrClose className="text-lg" />
            </button>
          </div>
          <div className="">
          <EditRecipe
            title={recipeData.title}
            ingredients={recipeData.ingredients}
            instructions={recipeData.instructions}
            tips={recipeData.tips}
            handleRecipeChange={(e)=>{handleRecipeChange(e)}}
            handleSave={()=>{handleSave()}}
            
          />
          </div>
        </div>
      </div>
)}

    </div>
  );
};

export default EntityRecipes;