const express = require("express");
const router = express.Router();
const {
  addProduct,
  getProductDetails,
  getAllProductsInShop,
} = require("../controllers/productController");
const authMiddleware = require("../middleware/authMiddleware");

// Route to add a new product to a shop
router.post("/:shopId/add", authMiddleware, addProduct);

// Route to get the details of a product
router.get("/:shopId/product/:productId", getProductDetails);

// Route to get all products in a specific shop
router.get("/:shopId/products", getAllProductsInShop);

module.exports = router;
