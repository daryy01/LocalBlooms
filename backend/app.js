const express = require("express");
const mysql = require("mysql2");
const dotenv = require("dotenv");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");

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
  host: process.env.DB_HOST, // The host for your MySQL database (usually localhost)
  user: process.env.DB_USER, // MySQL username
  password: process.env.DB_PASSWORD, // MySQL password
  database: process.env.DB_NAME, // MySQL database name
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

  // Check if the email already exists in the database
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

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Insert new user into the database
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

// Route to add a shop along with products
app.post(
  "/api/add-shop",
  upload.fields([
    { name: "shopImage" }, // Field for shop image
    { name: "productImage[]" }, // Multiple fields for product images
  ]),
  (req, res) => {
    // Extract form data from the request
    const { shopName, shopDescription, shopLocation } = req.body;
    const shopImage = req.files["shopImage"]
      ? req.files["shopImage"][0].filename
      : null;

    // Insert shop data into the shops table
    const query = `INSERT INTO shops (user_id, shop_name, shop_image, shop_location, shop_description) 
                 VALUES (?, ?, ?, ?, ?)`;

    const userId = req.user.id; // Assuming user ID is available in req.user

    db.query(
      query,
      [userId, shop_name, shop_image, shop_location, shop_description],
      (err, result) => {
        if (err) {
          console.error(err);
          return res.status(500).send("Error saving shop data");
        }

        const shopId = result.insertId; // Get the shop ID

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

        // Insert each product into the products table
        const productQuery = `INSERT INTO products (shop_id, product_name, product_image) 
                          VALUES (?, ?, ?)`;

        products.forEach((product) => {
          db.query(
            productQuery,
            [shopId, product.productName, product.productImage],
            (err, result) => {
              if (err) {
                console.error(err);
                return res.status(500).send("Error saving product data");
              }
            }
          );
        });

        // Return the shop ID in response
        res.status(200).json({ shopId });
      }
    );
  }
);

// Start the server and listen on port 5000
app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
