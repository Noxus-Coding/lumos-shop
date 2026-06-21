const express = require("express");

const dashboardController = require("../controllers/dashboardController.js");
const authMiddleware = require("../middlewares/authMiddleware.js");
const adminMiddleware = require("../middlewares/adminMiddleware.js");

const router = express.Router();

router.get("/", authMiddleware, adminMiddleware, dashboardController.show);

module.exports = router;