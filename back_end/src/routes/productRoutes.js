const express = require("express");
const router = express.Router();
const controller = require("../controllers/productController");

router.get("/", controller.getAllProducts);      // GET /products
router.get("/:id", controller.getProductDetail); // GET /products/:id

module.exports = router;
