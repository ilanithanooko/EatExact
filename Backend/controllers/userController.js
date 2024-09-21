const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

// Create a JWT token
const createToken = (_id) => {
  return jwt.sign({_id}, process.env.SECRET, {expiresIn: '3d'});
}

// Get user by email
const getUser = async (req, res) => {
  const { email } = req.params;

  // Find user by email
  const user = await User.findOne({ email });

  // If user not found, return error
  if(!user){
      return res.status(404).json({error: 'No such user'});
  }
  
  // Return the user data if found
  res.status(200).json(user);
}

// Login user
const loginUser = async (req, res) => {
  const {email, password} = req.body;

  try {
    // Find matching user using login function on userModel
    const user = await User.login(email, password);

    // Create a JWT token
    const token = createToken(user._id);

    // Return user data and generated token
    res.status(200).json({email, firstName: user.firstName, lastName: user.lastName, token});
  } catch (error) {
    res.status(400).json({error: error.message});
  }
}

// Signup user
const signupUser = async (req, res) => {
  const {firstName, lastName, email, password} = req.body;

  try {
    // Create a new user using signup function on userModel
    const user = await User.signup(firstName, lastName, email, password);
    
    // Create a JWT token
    const token = createToken(user._id);

    // Return user data and token
    res.status(200).json({email, firstName: user.firstName, lastName: user.lastName, token});
  } catch (error) {
    res.status(400).json({error: error.message});
  }
}

// Set role for a user
const setRole = async (req, res) => {
  const { email, role } = req.body;

  try {
    // Find the user by email and update its role
    const user = await User.findOneAndUpdate({ email: email }, {...req.body});
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    user.role = role; // Update the role in the user document
    await user.save();

    // Respond with a success message
    res.status(200).json({ message: 'Role updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}
  
// Set user information
const setInfo = async (req, res) => {
  const { email, role, age, dietaryRestrictions, favoriteIngredients, unlikedIngredients} = req.body;

  try {
    // Find the user by email and update its information
    const user = await User.findOneAndUpdate({ email: email }, {...req.body});

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Update relevant fields in the user document
    user.role = role;
    user.age = age;
    user.dietaryRestrictions = dietaryRestrictions;
    user.favoriteIngredients = favoriteIngredients;
    user.unlikedIngredients = unlikedIngredients;

    await user.save();

    // Respond with a success message
    res.status(200).json({ message: 'Information updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = {
    loginUser,
    signupUser,
    getUser,
    setRole,
    setInfo,
}