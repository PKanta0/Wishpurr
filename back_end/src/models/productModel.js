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

exports.createProduct = async ({ name, price, image_cover, category_name }) => {
    let categoryId = null;
    if (category_name) {
        const [catRows] = await pool.query(
            "SELECT category_id FROM categories WHERE name = ? LIMIT 1",
            [category_name]
        );
        if (catRows.length > 0) {
            categoryId = catRows[0].category_id;
        }
    }

    const [result] = await pool.query(
        `INSERT INTO products (name, price, image_cover, category_id)
     VALUES (?, ?, ?, ?)`,
        [name, price, image_cover || null, categoryId]
    );
    return result.insertId;
};

exports.updateProduct = async (
    id,
    { name, price, image_cover, category_name }
) => {
    let categoryId = null;
    if (category_name) {
        const [catRows] = await pool.query(
            "SELECT category_id FROM categories WHERE name = ? LIMIT 1",
            [category_name]
        );
        if (catRows.length > 0) {
            categoryId = catRows[0].category_id;
        }
    }

    const [result] = await pool.query(
        `UPDATE products
       SET name = ?, price = ?, image_cover = ?, category_id = ?
     WHERE product_id = ?`,
        [name, price, image_cover || null, categoryId, id]
    );

    if (result.affectedRows === 0) throw new Error("Product not found");
};


exports.deleteProduct = async (id) => {
    const [result] = await pool.query(
        `DELETE FROM products WHERE product_id = ?`,
        [id]
    );
    if (result.affectedRows === 0) throw new Error("Product not found");
};
