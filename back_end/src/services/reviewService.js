const reviewModel = require("../models/reviewModel");

exports.getProductReviews = async (productId) => {
    return reviewModel.getReviewsByProduct(productId);
};

exports.addReview = async (userId, productId, rating, comment) => {
    const purchased = await reviewModel.hasPurchasedProduct(userId, productId);
    if (!purchased) {
        throw new Error("User has not purchased this product");
    }

    const id = await reviewModel.createReview(
        userId,
        productId,
        rating,
        comment || ""
    );
    return id;
};
