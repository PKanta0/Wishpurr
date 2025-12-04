const productService = require("../services/productService");

exports.getAllProducts = async (req, res) => {
    try {
        const products = await productService.getAllProducts();
        res.json(products);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
};

exports.getProductDetail = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await productService.getProductDetail(id);
        res.json(product);
    } catch (e) {
        if (e.message === "Product not found") {
            return res.status(404).json({ error: e.message });
        }
        res.status(500).json({ error: e.message });
    }
};
