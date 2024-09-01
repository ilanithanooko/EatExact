const express = require('express')
const {
    createRecipe,
    getRecipes,
    getRecipe,
    deleteRecipe,
    updateRecipe,
    getAllRecipesByUserId
} = require('../controllers/recipeController')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

// require auth for all recipe routes
router.use(requireAuth)

// GET all recipes
router.get('/', getRecipes)

// GET all recipes by userId
router.get('/:user_id', getAllRecipesByUserId)

// GET a single recipe
router.get('/:id', getRecipe)

// POST a new recipe
router.post('/', createRecipe)

// DELETE a single recipe
router.delete('/:id', deleteRecipe)

// UPDATE a recipe
router.patch('/:id', updateRecipe)

module.exports = router