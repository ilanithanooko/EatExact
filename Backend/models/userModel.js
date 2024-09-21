const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');
const validator = require('validator');

// Define the schema for a User
// This schema represents the structure of each User's document on MongoDB 
const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
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
});

// Utility function to validate username (first and last name)
const onValidUsername = (val) => {
  const usernameRegex = /^[a-z ,.'-]+$/i
  return usernameRegex.test(val)
}

// Static method to sign up a new user
userSchema.statics.signup = async function (firstName, lastName, email, password) {

  // Validate first and last name format using a regex
  if( !onValidUsername(firstName) || !onValidUsername(lastName) ) {
    throw Error('Invalid name or last-name')
  }
  
  // Ensure all fields are filled and check email format
  if(!email || ! password ){
    throw Error('All fields must be filled')
  }
  if(!validator.isEmail(email)){
    throw Error('Email is not valid')
  }

    // Validate password strength, if not strong enough throw error with instructions with strong password
  if(!validator.isStrongPassword(password)){
    throw Error(`Password not strong enough. please choose a password with at least 8 characters, a number, an uppercase, a lowercase and a special character.`)
  }

  // Check if the email is already in use
  const exists = await this.findOne({ email });
  if (exists) {
    throw Error("Email already in use");
  }

  // Hash the password before storing it in the database
  const salt = await bcryptjs.genSalt(10);
  const hash = await bcryptjs.hash(password, salt)

  // Create a new user document in the database
  const user = await this.create({ firstName, lastName, email, password: hash, role: null, age: null, dietaryRestrictions: null, favoriteIngredients: null, unlikedIngredients: null});

  return user;
};

// Static method to log in a user
userSchema.statics.login = async function (email, password) {
  // Ensure all fields are filled
  if (!email || !password) {
    throw Error('All fields must be filled')
  }

  // Check if the user exists in the database
  const user = await this.findOne({ email })

  if(!user) {
    throw Error('Incorrect email')
  }

  // Compare entered password with the hashed password in the database
  const match = await bcryptjs.compare(password, user.password)
  if(!match){
    throw Error('Incorrect password')
  }

  return user
}

// Export the User model for use in other parts of the application
module.exports = mongoose.model("User", userSchema);