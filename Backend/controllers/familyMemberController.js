const FamilyMember = require('../models/familyMemberModel');
const mongoose = require('mongoose');

// Get all family members for the logged-in user
const getFamilyMembers = async (req, res) => {
  const user_id = req.user._id; // Extracting the user ID from the request (provided by the authentication middleware)
  
  // Fetching family members associated with the logged-in user
  const familyMembers = await FamilyMember.find({ user_id }).sort({ createdAt: -1 });

  // Sending back the list of family members
  res.status(200).json(familyMembers);
};

// Get a single family member by ID
const getFamilyMember = async (req, res) => {
  const { id } = req.params; // Getting the family member ID from the URL parameters

  // Check if the provided ID is a valid MongoDB ObjectID
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such family member' });
  }

  // Find the family member by ID
  const familyMember = await FamilyMember.findById(id);

  // If the family member doesn't exist, return an error
  if (!familyMember) {
    return res.status(404).json({ error: 'No such family member' });
  }

  // If it exists, return the family member data
  res.status(200).json(familyMember);
};

// Create a new family member
const createFamilyMember = async (req, res) => {
  const { name, age, dietaryRestrictions, favoriteIngredients, unlikedIngredients } = req.body;

  // Make sure the name is provided as it's a required field
  if (!name) {
    return res.status(400).json({ error: 'Name is required' });
  }

  try {
    const user_id = req.user._id; // Get the logged-in user's ID
    // Create a new family member document in the database
    const familyMember = await FamilyMember.create({
      name,
      age,
      dietaryRestrictions,
      favoriteIngredients,
      unlikedIngredients,
      user_id // Link the family member to the logged-in user
    });
    // Return family member data
    res.status(201).json(familyMember);
  } catch (error) {
    // Catch any error and return it
    res.status(400).json({ error: error.message });
  }
};

// Delete a family member
const deleteFamilyMember = async (req, res) => {
  const { id } = req.params; // Get the family member ID from the URL

  // Validate if the provided ID is a valid MongoDB ObjectID
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such family member' });
  }

  // Find and delete the family member by its ID
  const familyMember = await FamilyMember.findOneAndDelete({ _id: id });

  // If the family member doesn't exist, return an error
  if (!familyMember) {
    return res.status(400).json({ error: 'No such family member' });
  }

  // Return the deleted family member data
  res.status(200).json(familyMember);
};

// Update a family member
const updateFamilyMember = async (req, res) => {
  const { id } = req.params; // Get the family member ID from the URL

  // Validate the ID to make sure it's a valid MongoDB ObjectID
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such family member' });
  }

  // Find and update the family member by its ID
  const familyMember = await FamilyMember.findOneAndUpdate({ _id: id }, {
    ...req.body // updated data is taken from the request body
  });

  // If the family member doesn't exist, return an error
  if (!familyMember) {
    return res.status(400).json({ error: 'No such family member' });
  }

  // Return the updated family member data
  res.status(200).json(familyMember);
};

module.exports = {
  getFamilyMembers,
  getFamilyMember,
  createFamilyMember,
  deleteFamilyMember,
  updateFamilyMember
};