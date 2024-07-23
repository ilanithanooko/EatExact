const express = require("express");
const {
  getFamilyMembers,
  getFamilyMember,
  createFamilyMember,
  deleteFamilyMember,
  updateFamilyMember,
} = require("../controllers/familyMemberController");
const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

// require auth for all workout routes
router.use(requireAuth);

// GET all family members
router.get("/", getFamilyMembers);

//GET a single family member
router.get("/:id", getFamilyMember);

// POST a new family members
router.post("/", createFamilyMember);

// DELETE a family members
router.delete("/:id", deleteFamilyMember);

// UPDATE a family members
router.patch("/:id", updateFamilyMember);

module.exports = router;
