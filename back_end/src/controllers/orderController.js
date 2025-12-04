const orderService = require("../services/orderService");

exports.createOrder = async (req, res) => {
    try {
        const userId = req.user.id;        
        const { items } = req.body;
        const data = await orderService.createOrder(userId, items);
        res.status(201).json({ message: "order created", ...data });
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
};

exports.getMyOrders = async (req, res) => {
    try {
        const userId = req.user.id;    
        const orders = await orderService.getOrdersWithItemsByUser(userId);
        res.json(orders);
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
};
