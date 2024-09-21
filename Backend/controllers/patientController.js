const Patient = require("../models/patientModel");
const mongoose = require("mongoose");

// Get all patients by dietitian ID
const getPatients = async (req, res) => {
  const dietitian_id = req.user._id; // Get the dietitian ID from the authenticated request

  // Find all patients linked to this dietitian
  const patients = await Patient.find({ dietitian_id }).sort({ createdAt: -1 });

  // Return the list of patients
  res.status(200).json(patients);
};

// Get a single patient by ID
const getPatient = async (req, res) => {
  const { id } = req.params; // Get the patient ID from the URL

  // Validate if the provided ID is a valid MongoDB ObjectID
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such patient" });
  }

  // Find the patient by its ID
  const patient = await Patient.findById(id);

  // If the patient doesn't exist, return an error
  if (!patient) {
    return res.status(404).json({ error: "No such patient" });
  }

  // If found, return the patient data
  res.status(200).json(patient);
};

// Create a new patient
const createPatient = async (req, res) => {
  const {
    id,
    firstName,
    lastName,
    age,
    dietaryRestrictions,
    favoriteIngredients,
    unlikedIngredients,
  } = req.body;

  // Validate that the full name is provided (first and last name)
  if (!firstName || !lastName) {
    return res.status(400).json({ error: "Full name is required" });
  }

  try {
    const dietitian_id = req.user._id; // Get the logged-in dietitian's ID
    // Create a new patient document in the database, linked to the dietitian
    const patient = await Patient.create({
      id,
      firstName,
      lastName,
      age,
      dietaryRestrictions,
      favoriteIngredients,
      unlikedIngredients,
      dietitian_id,
    });
    // Send back the newly created patient data
    res.status(201).json(patient);
  } catch (error) {
    // If there's an error during creation, return it
    res.status(400).json({ error: error.message });
  }
};

// Delete a patient by ID
const deletePatient = async (req, res) => {
  const { id } = req.params; // Get the patient ID from the URL

  // Validate if the ID is a valid MongoDB ObjectID
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such patient" });
  }

  // Find and delete the patient by ID
  const patient = await Patient.findOneAndDelete({ _id: id });

  // If the patient doesn't exist, return an error
  if (!patient) {
    return res.status(400).json({ error: "No such patient" });
  }

  // Return the deleted patient data
  res.status(200).json(patient);
};

// Update a patient by ID
const updatePatient = async (req, res) => {
  const { id } = req.params; // Get the patient ID from the URL

  // Validate if the ID is a valid MongoDB ObjectID
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such patient" });
  }

  // Find and update the patient with the new data provided in the request body
  const patient = await Patient.findOneAndUpdate(
    { _id: id },
    {
      ...req.body, // Spread the updated data
    }
  );

  // If the patient doesn't exist, return an error
  if (!patient) {
    return res.status(400).json({ error: "No such patient" });
  }

  // Send back the updated patient data
  res.status(200).json(patient);
};

module.exports = {
  getPatients,
  getPatient,
  createPatient,
  deletePatient,
  updatePatient,
};