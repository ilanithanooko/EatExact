const Recipe = require("../models/recipeModel");
const mongoose = require('mongoose')

// Get all recipe
const getRecipes = async (req, res) => {
    const recipes = await Recipe.find({}).sort({createdAt: -1})

    res.status(200).json(recipes)
}

// Get a single recipe
const getRecipe = async (req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such recipe'})
    }

    const recipe = await Recipe.findById(id)

    if(!recipe){
        return res.status(404).json({error: 'No such recipe'})
    }

    res.status(200).json(recipe)
}

const getAllRecipesByUserId = async (req, res) => {
    const { user_id } = req.params;

    // Check if the user_id is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(user_id)) {
        return res.status(404).json({ error: 'Invalid user ID' });
    }

    try {
        // Retrieve all recipes by user_id
        const recipes = await Recipe.find({ user_id });

        // If no recipes are found, return a 404
        if (!recipes.length) {
            return res.status(404).json({ error: 'No recipes found for this user' });
        }

        // Return the found recipes
        res.status(200).json(recipes);
    } catch (error) {
        // If an error occurs, return a 500 status with the error message
        res.status(500).json({ error: error.message });
    }
};

// Create new recipe
const createRecipe = async (req, res) => {
  const { title, category, description, user_id } = req.body;

  try {
    const recipe = await Recipe.create({ title, category, description, user_id });
    res.status(200).json(recipe);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

// Delete a recipe
const deleteRecipe = async (req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such recipe'})
    }

    const recipe = await Recipe.findOneAndDelete({_id : id})

    if(!recipe){
        return res.status(400).json({error: 'No such recipe'})
    }

    res.status(200).json(recipe)
}

// Update a recipe
const updateRecipe = async (req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such recipe'})
    }

    const recipe = await Recipe.findOneAndUpdate({_id : id}, {
        ...req.body
    })

    if(!recipe){
        return res.status(400).json({error: 'No such recipe'})
    }

    res.status(200).json(recipe)
}

module.exports = {
    createRecipe,
    getRecipes,
    getRecipe,
    getAllRecipesByUserId,
    deleteRecipe,
    updateRecipe
}
