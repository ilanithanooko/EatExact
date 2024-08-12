const FamilyMember = require('../models/familyMemberModel');
const mongoose = require('mongoose')

// get all family members
const getFamilyMembers = async (req, res) => {
  const user_id = req.user._id

  const familyMembers = await FamilyMember.find({user_id}).sort({createdAt: -1})

  res.status(200).json(familyMembers)
}

// get a single family member
const getFamilyMember = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such family Member'})
  }

  const familyMember = await FamilyMember.findById(id)

  if (!familyMember) {
    return res.status(404).json({error: 'No such family Member'})
  }
  
  res.status(200).json(familyMember)
}


// create new family member
const createFamilyMember = async (req, res) => {
  const { name, age, dietaryRestrictions, favoriteIngredients, unlikedIngredients } = req.body;

  // Validate required fields
  if (!name) {
    return res.status(400).json({ error: 'Name is required' });
  }

  try {
    const user_id = req.user._id;
    const familyMember = await FamilyMember.create({
      name,
      age,
      dietaryRestrictions,
      favoriteIngredients,
      unlikedIngredients,
      user_id
    });
    res.status(201).json(familyMember);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete a family member
const deleteFamilyMember = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such family member'})
  }

  const familyMember = await FamilyMember.findOneAndDelete({_id: id})

  if (!familyMember) {
    return res.status(400).json({error: 'No such family member'})
  }

  res.status(200).json(familyMember)
}

// update a family member
const updateFamilyMember = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such family member'})
  }

  const familyMember = await FamilyMember.findOneAndUpdate({_id: id}, {
    ...req.body
  })

  if (!familyMember) {
    return res.status(400).json({error: 'No such family member'})
  }

  res.status(200).json(familyMember)
}


module.exports = {
    getFamilyMembers,
    getFamilyMember,
    createFamilyMember,
    deleteFamilyMember,
  updateFamilyMember
}