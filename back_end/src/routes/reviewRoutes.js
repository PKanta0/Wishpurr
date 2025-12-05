const express = require("express");
const router = express.Router();
const controller = require("../controllers/reviewController");
const { auth, adminOnly } = require("../middleware/authMiddleware");


router.get("/all", controller.getAllReviews);
router.get("/:productId", controller.getReviews);
router.post("/", auth, controller.createReview);
router.delete("/:id", auth, adminOnly, controller.deleteReview);

module.exports = router;

