const express = require("express");
const router = express.Router();
const {
  addShop,
  getShopDetails,
  getAllShops,
} = require("../controllers/shopController");
const authMiddleware = require("../middleware/authMiddleware");

// Route to add a new shop
router.post("/add", authMiddleware, addShop);

// Route to get the details of a single shop
router.get("/:shopId", getShopDetails);

// Route to get all shops (public access)
router.get("/", getAllShops);

module.exports = router;
