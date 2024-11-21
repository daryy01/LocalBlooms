const db = require("../config/db");

// Controller to add a new shop
const addShop = async (req, res) => {
  const { shopName, shopDescription, shopLocation } = req.body;
  const shopImage = req.file ? req.file.filename : null; // Assuming multer handles image uploads

  try {
    // Insert shop data into the database
    const [result] = await db.execute(
      `INSERT INTO shops (user_id, shop_name, shop_image, shop_location, shop_description) 
      VALUES (?, ?, ?, ?, ?)`,
      [req.user.id, shopName, shopImage, shopLocation, shopDescription]
    );

    res
      .status(201)
      .json({ message: "Shop added successfully", shopId: result.insertId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error adding shop" });
  }
};

// Controller to get details of a single shop
const getShopDetails = async (req, res) => {
  const { shopId } = req.params;

  try {
    const [rows] = await db.execute("SELECT * FROM shops WHERE id = ?", [
      shopId,
    ]);

    if (rows.length === 0) {
      return res.status(404).json({ error: "Shop not found" });
    }

    res.json({ shop: rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error fetching shop details" });
  }
};

// Controller to get all shops
const getAllShops = async (req, res) => {
  try {
    const [rows] = await db.execute("SELECT * FROM shops");

    res.json({ shops: rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error fetching shops" });
  }
};

module.exports = { addShop, getShopDetails, getAllShops };
