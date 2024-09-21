const mongoose = require('mongoose')

// Define the schema for a Recipe
// This schema represents the structure of each Recipe's document on MongoDB 
const recipeSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    user_id: {
        type: String,
        required: true
      }
}, {timestamps: true})

// Export the Recipe model for use in other parts of the application
module.exports = mongoose.model('Recipe', recipeSchema)