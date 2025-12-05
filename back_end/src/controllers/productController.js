const productService = require("../services/productService");
const pool = require("../config/db");

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

exports.createProduct = async (req, res) => {
    try {
        const id = await productService.createProduct(req.body);
        res.status(201).json({ product_id: id });
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
};

exports.updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        await productService.updateProduct(id, req.body);
        res.json({ message: "updated" });
    } catch (e) {
        const status = e.message === "Product not found" ? 404 : 400;
        res.status(status).json({ error: e.message });
    }
};

exports.deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        await productService.deleteProduct(id);
        res.json({ message: "deleted" });
    } catch (e) {
        const status = e.message === "Product not found" ? 404 : 400;
        res.status(status).json({ error: e.message });
    }
};

