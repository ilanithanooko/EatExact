const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Define the schema for a Family Member
// This schema represents the structure of each family member's document on MongoDB.
const familyMemberSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  age : {
    type: Number,
  },
  dietaryRestrictions : {
    type: String,
  },
  favoriteIngredients : {
    type: String,
  },
  unlikedIngredients : {
    type: String,
  },
  user_id: {
    type: String,
    required: true
  }
} , { timestamps: true });

// Export the FamilyMember model for use in other parts of the application
module.exports = mongoose.model("FamilyMember", familyMemberSchema);