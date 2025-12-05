const express = require("express");
const router = express.Router();
const controller = require("../controllers/productController");
const { auth, adminOnly } = require("../middleware/authMiddleware");



router.get("/", controller.getAllProducts);  
router.get("/:id", controller.getProductDetail); 

router.post("/", auth, adminOnly, controller.createProduct);
router.put("/:id", auth, adminOnly, controller.updateProduct);
router.delete("/:id", auth, adminOnly, controller.deleteProduct);

module.exports = router;
