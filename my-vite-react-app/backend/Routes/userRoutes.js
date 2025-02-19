const express = require("express");
const userController = require("../Controllers/userController");

const router = express.Router();

// Get user profile
/*router.get("/user/me", userController.getMe);*/
router.get("/:id", (req, res) => {
  userController.getUserProfile(req, res);
});

module.exports = router;
