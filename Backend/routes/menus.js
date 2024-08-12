const express = require("express");
const {
  getMenus,
  getMenu,
  createMenu,
  deleteMenu,
  updateMenu,
} = require("../controllers/menuController");
const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

// require auth for all menu routes
router.use(requireAuth);

// GET all menus
router.get("/", getMenus);

//GET a single menu
router.get("/:id", getMenu);

// POST a new menu
router.post("/", createMenu);

// DELETE a menu
router.delete("/:id", deleteMenu);

// UPDATE a menu
router.patch("/:id", updateMenu);

module.exports = router;
