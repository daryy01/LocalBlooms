const mysql = require("mysql2");

// Create a MySQL connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "localbloom",
});

// Connect to the database
db.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL: " + err.stack);
    return;
  }
  console.log("Connected to MySQL as id " + db.threadId);

  // Check if the 'localblooms' database exists or create it if not
  db.query("CREATE DATABASE IF NOT EXISTS localbloom", (err, result) => {
    if (err) {
      console.error("Error creating database: " + err.stack);
      return;
    }
    console.log("Database 'localblooms' exists or was created.");

    // After ensuring the database exists, use it
    db.query("USE localbloom", (err) => {
      if (err) {
        console.error("Error selecting 'localbloom' database: " + err.stack);
        return;
      }
      console.log("Using 'localbloom' database.");

      // Optional: Check if necessary tables exist and create them if needed
      // For example, create a 'users' table if it doesn't exist:
      const createUsersTableQuery = `
        CREATE TABLE IF NOT EXISTS users (
          id INT AUTO_INCREMENT PRIMARY KEY,
          email VARCHAR(255) NOT NULL,
          password VARCHAR(255) NOT NULL,
          name VARCHAR(255) NOT NULL
        );
      `;
      db.query(createUsersTableQuery, (err) => {
        if (err) {
          console.error("Error creating users table: " + err.stack);
          return;
        }
        console.log("Users table exists or was created.");
      });
    });
  });
});

// Gracefully handle shutdown by closing the MySQL connection
process.on("SIGINT", () => {
  db.end((err) => {
    if (err) {
      console.error("Error closing the database connection: " + err.stack);
    } else {
      console.log("Database connection closed.");
    }
    process.exit(0);
  });
});

module.exports = db;
