const pool = require("../config/db");

exports.getReviewsByProduct = async (productId) => {
    const [rows] = await pool.query(
        `SELECT r.review_id, r.rating, r.comment, r.created_at,
            u.user_name
     FROM reviews r
     JOIN users u ON r.user_id = u.user_id
     WHERE r.product_id = ?
     ORDER BY r.created_at DESC`,
        [productId]
    );
    return rows;
};

exports.hasPurchasedProduct = async (userId, productId) => {
    const [rows] = await pool.query(
        `SELECT 1
     FROM orders o
     JOIN order_items oi ON o.order_id = oi.order_id
     WHERE o.user_id = ? AND oi.product_id = ?
     LIMIT 1`,
        [userId, productId]
    );
    return rows.length > 0;
};

exports.createReview = async (userId, productId, rating, comment) => {
    const [result] = await pool.query(
        `INSERT INTO reviews (user_id, product_id, rating, comment)
     VALUES (?, ?, ?, ?)`,
        [userId, productId, rating, comment]
    );
    return result.insertId;
};

exports.getAllReviews = async () => {
    const [rows] = await pool.query(
        `SELECT 
       r.review_id,
       r.rating,
       r.comment,
       r.created_at,
       u.user_name,
       p.name AS product_name
     FROM reviews r
     JOIN users u ON r.user_id = u.user_id
     JOIN products p ON r.product_id = p.product_id
     ORDER BY r.created_at DESC`
    );
    return rows;
};