const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');
const validator = require('validator');

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

const onValidUsername = (val) => {
  const usernameRegex = /^[a-z ,.'-]+$/i
  return usernameRegex.test(val)
}

userSchema.statics.signup = async function (firstName, lastName, email, password) {

  //validation
  if( !onValidUsername(firstName) || !onValidUsername(lastName) ) {
    throw Error('Invalid name or last-name')
  }
  
  if(!email || ! password ){
    throw Error('All fields must be filled')
  }
  if(!validator.isEmail(email)){
    throw Error('Email is not valid')
  }

  if(!validator.isStrongPassword(password)){
    throw Error(`Password not strong enough. please choose a password with at least 8 characters, a number, an uppercase, a lowercase and a special character.`)
  }

  const exists = await this.findOne({ email });

  if (exists) {
    throw Error("Email already in use");
  }

  const salt = await bcryptjs.genSalt(10);
  const hash = await bcryptjs.hash(password, salt)

  const user = await this.create({ firstName, lastName, email, password: hash, role: null, age: null, dietaryRestrictions: null, favoriteIngredients: null, unlikedIngredients: null});

  return user;
};

userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error('All fields must be filled')
  }

  const user = await this.findOne({ email })

  if(!user) {
    throw Error('Incorrect email')
  }

  const match = await bcryptjs.compare(password, user.password)
  if(!match){
    throw Error('Incorrect password')
  }

  return user
}

module.exports = mongoose.model("User", userSchema);