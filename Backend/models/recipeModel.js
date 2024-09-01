const mongoose = require('mongoose')

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

module.exports = mongoose.model('Recipe', recipeSchema)