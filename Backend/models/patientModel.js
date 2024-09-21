const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// Define the schema for a Patient
// This schema represents the structure of each Patient's document on MongoDB 
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

// Export the Patient model for use in other parts of the application
module.exports = mongoose.model("Patient", patientSchema);
