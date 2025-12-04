const reviewService = require("../services/reviewService");

const getReviews = async (req, res) => {
    try {
        const { productId } = req.params;
        const reviews = await reviewService.getProductReviews(productId);
        res.json(reviews);
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
};

const createReview = async (req, res) => {
    try {
        const userId = req.user.id;
        const { productId, rating, comment } = req.body;

        const id = await reviewService.addReview(
            userId,
            productId,
            rating,
            comment
        );

        res.status(201).json({ message: "review created", reviewId: id });
    } catch (e) {
        const status =
            e.message === "User has not purchased this product" ? 403 : 400;
        res.status(status).json({ error: e.message });
    }
};

module.exports = { getReviews, createReview };
