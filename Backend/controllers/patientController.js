const Patient = require("../models/patientModel");
const mongoose = require("mongoose");

// get all patients by dietitian id
const getPatients = async (req, res) => {
  const dietitian_id = req.user._id;

  const patients = await Patient.find({ dietitian_id }).sort({ createdAt: -1 });

  res.status(200).json(patients);
};

// get a single patient
const getPatient = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such patient" });
  }

  const patient = await Patient.findById(id);

  if (!patient) {
    return res.status(404).json({ error: "No such patient" });
  }

  res.status(200).json(patient);
};

// create new patient
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

  // Validate required fields
  if (!firstName || !lastName) {
    return res.status(400).json({ error: "Full name is required" });
  }

  try {
    const dietitian_id = req.user._id;
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
    res.status(201).json(patient);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete a patient
const deletePatient = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such patient" });
  }

  const patient = await Patient.findOneAndDelete({ _id: id });

  if (!patient) {
    return res.status(400).json({ error: "No such patient" });
  }

  res.status(200).json(patient);
};

// update a patient
const updatePatient = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such patient" });
  }

  const patient = await Patient.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!patient) {
    return res.status(400).json({ error: "No such patient" });
  }

  res.status(200).json(patient);
};

module.exports = {
  getPatients,
  getPatient,
  createPatient,
  deletePatient,
  updatePatient,
};
