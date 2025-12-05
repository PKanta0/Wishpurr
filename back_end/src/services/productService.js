const productModel = require("../models/productModel");

exports.getAllProducts = async () => {
    const products = await productModel.getAllProducts();
    return products;
};

exports.getProductDetail = async (id) => {
    const product = await productModel.getProductById(id);
    if (!product) throw new Error("Product not found");

    const images = await productModel.getImagesByProductId(id);
    return { ...product, images };
};

exports.createProduct = (body) => productModel.createProduct(body);
exports.updateProduct = (id, body) => productModel.updateProduct(id, body);
exports.deleteProduct = (id) => productModel.deleteProduct(id);
