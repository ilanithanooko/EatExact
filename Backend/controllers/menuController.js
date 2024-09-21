const Menu = require('../models/menuModel');
const mongoose = require('mongoose');

// Get all menus for the logged-in user
const getMenus = async (req, res) => {
  const user_id = req.user._id; // Extract the user ID from the authenticated request
  
  // Find all menus created by the user
  const menus = await Menu.find({ user_id }).sort({ createdAt: -1 });

  // Send back the list of menus
  res.status(200).json(menus);
};

// Get a single menu by ID
const getMenu = async (req, res) => {
  const { id } = req.params; // Extract the menu ID from the request parameters

  // Check if the provided ID is a valid MongoDB ObjectID
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such menu' });
  }

  // Find the menu by its ID
  const menu = await Menu.findById(id);

  // If the menu doesn't exist, return an error message
  if (!menu) {
    return res.status(404).json({ error: 'No such menu' });
  }

  // If found, return the menu data
  res.status(200).json(menu);
};

// Create a new menu
const createMenu = async (req, res) => {
  const { name } = req.body;

  // Validate if the menu name is provided
  if (!name) {
    return res.status(400).json({ error: 'Menu name is required' });
  }

  try {
    const user_id = req.user._id; // Get the logged-in user's ID
    // Create a new menu document and associate it with the logged-in user
    const menu = await Menu.create({ name, user_id });
    
    // Send back the newly created menu data
    res.status(201).json(menu);
  } catch (error) {
    // If there's an error, return it
    res.status(400).json({ error: error.message });
  }
};

// Delete a menu by ID
const deleteMenu = async (req, res) => {
  const { id } = req.params; // Extract the menu ID from the request parameters

  // Check if the ID is a valid MongoDB ObjectID
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such menu' });
  }

  // Find and delete the menu by its ID
  const menu = await Menu.findOneAndDelete({ _id: id });

  // If the menu doesn't exist, return an error
  if (!menu) {
    return res.status(400).json({ error: 'No such menu' });
  }

  // Return the deleted menu data
  res.status(200).json(menu);
};

// Update a menu by ID
const updateMenu = async (req, res) => {
  const { id } = req.params; // Get the menu ID from the request parameters

  // Validate if the ID is a valid MongoDB ObjectID
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such menu' });
  }

  // Find and update the menu with new data from the request body
  const menu = await Menu.findOneAndUpdate({ _id: id }, {
    ...req.body // Spread the new data from the request body
  });

  // If the menu doesn't exist, return an error
  if (!menu) {
    return res.status(400).json({ error: 'No such menu' });
  }

  // Send back the updated menu data
  res.status(200).json(menu);
};

module.exports = {
  getMenus,
  getMenu,
  createMenu,
  deleteMenu,
  updateMenu
};