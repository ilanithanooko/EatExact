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

// Create new recipe
const createRecipe = async (req, res) => {
  const { title, description } = req.body;

  try {
    const recipe = await Recipe.create({ title, description });
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
    deleteRecipe,
    updateRecipe
}
