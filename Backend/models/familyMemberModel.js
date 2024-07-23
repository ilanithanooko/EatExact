const mongoose = require('mongoose');

const Schema = mongoose.Schema;

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

module.exports = mongoose.model("FamilyMember", familyMemberSchema);