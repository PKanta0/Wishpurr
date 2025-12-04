const express = require("express");
const router = express.Router();
const controller = require("../controllers/reviewController");
const { auth } = require("../middleware/authMiddleware");


router.get("/:productId", controller.getReviews);
router.post("/", auth, controller.createReview);
module.exports = router;

