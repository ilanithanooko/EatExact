const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Define the schema for a Menu
// This schema represents the structure of each Menu's document on MongoDB .
const menuSchema = new Schema({

  name: {
    type: String,
    required: true,
  },
  user_id: {
    type: String,
    required: true
  }
} , { timestamps: true });

// Export the Menu model for use in other parts of the application
module.exports = mongoose.model("Menu", menuSchema);