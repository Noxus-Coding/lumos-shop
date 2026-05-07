const express = require("express");
const authController = require("../controllers/authController.js");
const authMiddleware = require("../middlewares/authMiddleware.js");

const router = express.Router();

router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/me", authMiddleware, authController.me);

module.exports = router;