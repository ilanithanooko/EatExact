const Recipe = require("../models/recipeModel");
const mongoose = require('mongoose');

// Get all recipes
const getRecipes = async (req, res) => {
    const recipes = await Recipe.find({}).sort({createdAt: -1});

    // Return the list of recipes
    res.status(200).json(recipes);
};

// Get a single recipe by ID
const getRecipe = async (req, res) => {
    const { id } = req.params;

    // Validate if the provided ID is a valid MongoDB ObjectID
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such recipe'});
    }

    // Find the recipe by its ID
    const recipe = await Recipe.findById(id);

    // If the recipe doesn't exist, return an error
    if(!recipe){
        return res.status(404).json({error: 'No such recipe'});
    }

    // If found, return the recipe data
    res.status(200).json(recipe);
};

// Get all recipes by user ID
const getAllRecipesByUserId = async (req, res) => {
    const { user_id } = req.params;

    // Check if the provided user ID is a valid MongoDB ObjectID
    if (!mongoose.Types.ObjectId.isValid(user_id)) {
        return res.status(404).json({ error: 'Invalid user ID' });
    }

    try {
        // Find all recipes associated with the given user ID
        const recipes = await Recipe.find({ user_id });

        // If no recipes are found, return an error
        if (!recipes.length) {
            return res.status(404).json({ error: 'No recipes found for this user' });
        }

        // Return the found recipes
        res.status(200).json(recipes);
    } catch (error) {
        // Return a server error in case of issues
        res.status(500).json({ error: error.message });
    }
};

// Create a new recipe
const createRecipe = async (req, res) => {
  const { title, category, description, user_id } = req.body;

  try {
    // Create a new recipe document in the database
    const recipe = await Recipe.create({ title, category, description, user_id });

    // Return the newly created recipe
    res.status(200).json(recipe);
  } catch (error) {
    // Return an error if creation fails
    res.status(400).json({ error: error.message });
  }
};

// Delete a recipe by ID
const deleteRecipe = async (req, res) => {
    const { id } = req.params;

    // Validate if the provided ID is a valid MongoDB ObjectID
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such recipe'});
    }

    // Find and delete the recipe by ID
    const recipe = await Recipe.findOneAndDelete({_id : id});

    // If the recipe doesn't exist, return an error
    if(!recipe){
        return res.status(400).json({error: 'No such recipe'});
    }

    // Return the deleted recipe data
    res.status(200).json(recipe);
};

// Update a recipe by ID
const updateRecipe = async (req, res) => {
    const { id } = req.params;

    // Validate if the provided ID is a valid MongoDB ObjectID
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such recipe'});
    }

    // Find and update the recipe with new data provided in the request body
    const recipe = await Recipe.findOneAndUpdate({_id : id}, {
        ...req.body
    });

    // If the recipe doesn't exist, return an error
    if(!recipe){
        return res.status(400).json({error: 'No such recipe'});
    }

    // Return the updated recipe data
    res.status(200).json(recipe);
};

module.exports = {
    createRecipe,
    getRecipes,
    getRecipe,
    getAllRecipesByUserId,
    deleteRecipe,
    updateRecipe
};