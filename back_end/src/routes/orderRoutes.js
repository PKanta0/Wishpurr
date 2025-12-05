const express = require("express");
const router = express.Router();
const controller = require("../controllers/orderController");
const { auth, adminOnly } = require("../middleware/authMiddleware");


router.post("/", auth, controller.createOrder);
router.get("/me", auth, controller.getMyOrders);
router.get("/admin/all", auth, adminOnly, controller.getAllOrders);

module.exports = router;
