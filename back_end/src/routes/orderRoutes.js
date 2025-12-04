const express = require("express");
const router = express.Router();
const controller = require("../controllers/orderController");
const { auth } = require("../middleware/authMiddleware");


router.post("/", auth, controller.createOrder);
router.get("/me", auth, controller.getMyOrders);

module.exports = router;
