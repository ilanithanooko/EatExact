const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const patientSchema = new Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
  },
  dietaryRestrictions: {
    type: String,
  },
  favoriteIngredients: {
    type: String,
  },
  unlikedIngredients: {
    type: String,
  },
  dietitian_id: {
    type: String,
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model("Patient", patientSchema);
