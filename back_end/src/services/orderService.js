const orderModel = require("../models/orderModel");

exports.createOrder = async (userId, items) => {
    if (!items || items.length === 0) {
        throw new Error("No items");
    }

    const total = items.reduce(
        (sum, it) => sum + it.qty * it.unitPrice,
        0
    );

    const orderId = await orderModel.createOrderWithItems(userId, items, total);
    return { orderId, total };
};

exports.getOrdersWithItemsByUser = async (userId) => {
    const orders = await orderModel.getOrdersByUser(userId);
    const result = [];

    for (const o of orders) {
        const items = await orderModel.getOrderItems(o.order_id);
        result.push({ ...o, items });
    }

    return result;
};
