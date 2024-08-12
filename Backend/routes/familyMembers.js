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

// require auth for all family member routes
router.use(requireAuth);

// GET all family members
router.get("/", getFamilyMembers);

//GET a single family member
router.get("/:id", getFamilyMember);

// POST a new family member
router.post("/", createFamilyMember);

// DELETE a family member
router.delete("/:id", deleteFamilyMember);

// UPDATE a family member
router.patch("/:id", updateFamilyMember);

module.exports = router;
