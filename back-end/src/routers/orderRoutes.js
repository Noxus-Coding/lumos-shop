const express = require("express");

const orderController = require("../controllers/orderController");
const authMiddleware = require("../middlewares/authMiddleware");
const adminMiddleware = require("../middlewares/adminMiddleware");

const router = express.Router();

router.post("/", orderController.create);

router.get("/", authMiddleware, adminMiddleware, orderController.index);

router.get("/:id", authMiddleware, adminMiddleware, orderController.show);

router.patch(
    "/:id/status",
    authMiddleware,
    adminMiddleware,
    orderController.updateStatus
);

router.patch(
    "/:id/payment-status",
    authMiddleware,
    adminMiddleware,
    orderController.updatePaymentStatus
);

module.exports = router;