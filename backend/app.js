const express = require("express");
const mysql = require("mysql2");
const dotenv = require("dotenv");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");

// Import authMiddleware
const authMiddleware = require("./middleware/authMiddleware");

dotenv.config();

const app = express();

// CORS configuration
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5175"], // Frontend URL
    methods: "GET, POST, PUT, DELETE",
    allowedHeaders: "Content-Type, Authorization",
  })
);

// Middleware to parse JSON requests
app.use(express.json());

// MySQL database connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
  } else {
    console.log("Connected to the database");
  }
});

// Register route
app.post("/api/register", async (req, res) => {
  const { name, email, password } = req.body;

  db.query(
    "SELECT * FROM users WHERE email = ?",
    [email],
    async (err, result) => {
      if (err) {
        return res.status(500).json({ error: "Database error" });
      }

      if (result.length > 0) {
        return res.status(400).json({ error: "Email already exists" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      db.query(
        "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
        [name, email, hashedPassword],
        (err, result) => {
          if (err) {
            return res.status(500).json({ error: "Error saving user" });
          }
          return res
            .status(201)
            .json({ message: "User registered successfully" });
        }
      );
    }
  );
});

// Login route (use controller for modularity)
const { loginUser } = require("./controllers/authController");
app.post("/api/login", loginUser);

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Set destination folder for file uploads
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Use current timestamp for file name
  },
});

const upload = multer({ storage });

// Add Shop route (protected by authMiddleware)
app.post(
  "/api/add-shop",
  authMiddleware, // Ensure the user is authenticated
  upload.single("shopImage"), // Single shop image upload
  async (req, res) => {
    const { shopName, shopDescription, shopLocation } = req.body;
    const shopImage = req.file ? req.file.filename : null; // Get the uploaded shop image filename

    try {
      // Insert shop into database
      const [result] = await db.execute(
        `INSERT INTO shops (user_id, shop_name, shop_image, shop_location, shop_description) 
        VALUES (?, ?, ?, ?, ?)`,
        [req.user.id, shopName, shopImage, shopLocation, shopDescription]
      );

      // Handle product insertions
      const products = [];
      Object.keys(req.body).forEach((key) => {
        if (key.startsWith("productName")) {
          const index = key.match(/\d+/)[0];
          const productName = req.body[`productName[${index}]`];
          const productImage = req.files[`productImage[${index}]`]
            ? req.files[`productImage[${index}]`][0].filename
            : null;

          products.push({ productName, productImage });
        }
      });

      const productQuery = `INSERT INTO products (shop_id, product_name, product_image) 
                            VALUES (?, ?, ?)`;

      products.forEach((product) => {
        db.query(
          productQuery,
          [result.insertId, product.productName, product.productImage],
          (err) => {
            if (err) {
              console.error(err);
              return res.status(500).send("Error saving product data");
            }
          }
        );
      });

      // Respond with shop id after successfully adding products
      res.status(201).json({
        message: "Shop and products added successfully",
        shopId: result.insertId,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Error adding shop and products" });
    }
  }
);

// Start the server and listen on port 5000
app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
