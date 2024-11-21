const db = require("../models/db");

// Controller to add a new product to a shop
const addProduct = async (req, res) => {
  const { shopId } = req.params;
  const { productName, productDescription, price } = req.body;
  const productImage = req.file ? req.file.filename : null; // Assuming multer handles image uploads

  try {
    // Insert product data into the database
    const [result] = await db.execute(
      `INSERT INTO products (shop_id, product_name, product_description, product_image, price) 
      VALUES (?, ?, ?, ?, ?)`,
      [shopId, productName, productDescription, productImage, price]
    );

    res
      .status(201)
      .json({
        message: "Product added successfully",
        productId: result.insertId,
      });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error adding product" });
  }
};

// Controller to get the details of a specific product
const getProductDetails = async (req, res) => {
  const { shopId, productId } = req.params;

  try {
    const [rows] = await db.execute(
      "SELECT * FROM products WHERE shop_id = ? AND id = ?",
      [shopId, productId]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json({ product: rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error fetching product details" });
  }
};

// Controller to get all products in a specific shop
const getAllProductsInShop = async (req, res) => {
  const { shopId } = req.params;

  try {
    const [rows] = await db.execute(
      "SELECT * FROM products WHERE shop_id = ?",
      [shopId]
    );

    res.json({ products: rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error fetching products" });
  }
};

module.exports = { addProduct, getProductDetails, getAllProductsInShop };
