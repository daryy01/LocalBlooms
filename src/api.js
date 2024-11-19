const express = require("express");
const app = express();
const bodyParser = require("body-parser");

// Middleware to parse JSON body
app.use(bodyParser.json());

// Login route
app.post("/api/login", (req, res) => {
  const { email, password } = req.body;
  // Perform login logic (authentication, validation, etc.)
  if (email === "user@example.com" && password === "password123") {
    res.status(200).json({ message: "Login successful" });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
});

// Register route
app.post("/api/register", (req, res) => {
  const { name, email, password } = req.body;
  // Perform registration logic (save user to DB, etc.)
  res.status(201).json({ message: "User registered successfully" });
});

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
