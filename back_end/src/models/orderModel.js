const pool = require("../config/db");

exports.createOrderWithItems = async (userId, items, total) => {
    const conn = await pool.getConnection();
    try {
        await conn.beginTransaction();

        const [orderResult] = await conn.query(
            "INSERT INTO orders (user_id, total) VALUES (?, ?)",
            [userId, total]
        );
        const orderId = orderResult.insertId;

        const values = items.map((it) => [
            orderId,
            it.productId,
            it.qty,
            it.unitPrice,
        ]);

        await conn.query(
            "INSERT INTO order_items (order_id, product_id, qty, unit_price) VALUES ?",
            [values]
        );

        await conn.commit();
        return orderId;
    } catch (err) {
        await conn.rollback();
        throw err;
    } finally {
        conn.release();
    }
};

exports.getOrdersByUser = async (userId) => {
    const [rows] = await pool.query(
        `SELECT 
       o.order_id,
       o.total,
       o.created_at
     FROM orders o
     WHERE o.user_id = ?
     ORDER BY o.created_at DESC`,
        [userId]
    );
    return rows;
};

exports.getOrderItems = async (orderId) => {
    const [rows] = await pool.query(
        `SELECT 
       oi.order_item_id,
       oi.product_id,
       p.name,
       oi.qty,
       oi.unit_price
     FROM order_items oi
     JOIN products p ON oi.product_id = p.product_id
     WHERE oi.order_id = ?`,
        [orderId]
    );
    return rows;
};

exports.getAllOrders = async () => {
    const [rows] = await pool.query(
        `SELECT 
       o.order_id,
       o.user_id,
       o.total,
       o.created_at,
       u.user_name,
       u.email
     FROM orders o
     JOIN users u ON o.user_id = u.user_id
     ORDER BY o.created_at DESC`
    );
    return rows;
};