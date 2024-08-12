const mongoose = require('mongoose');

const Schema = mongoose.Schema;

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

module.exports = mongoose.model("Menu", menuSchema);