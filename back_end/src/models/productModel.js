const pool = require("../config/db");

exports.getAllProducts = async () => {
    const [rows] = await pool.query(
        `SELECT 
        p.product_id,
        p.name,
        p.description,
        p.price,
        p.stock,
        p.image_cover,
        p.weight,
        c.name AS category_name
     FROM products p
     LEFT JOIN categories c ON p.category_id = c.category_id`
    );
    return rows;
};

exports.getProductById = async (id) => {
    const [rows] = await pool.query(
        `SELECT 
        p.product_id,
        p.name,
        p.description,
        p.price,
        p.stock,
        p.image_cover,
        p.weight,
        c.name AS category_name
     FROM products p
     LEFT JOIN categories c ON p.category_id = c.category_id
     WHERE p.product_id = ?`,
        [id]
    );
    return rows[0];
};

exports.getImagesByProductId = async (id) => {
    const [rows] = await pool.query(
        "SELECT image FROM product_images WHERE product_id = ?",
        [id]
    );
    return rows;
};
