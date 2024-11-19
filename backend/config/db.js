const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "localblooms",
});

// Connect to the database
db.connect((err) => {
  if (err) {
    console.error("Error connecting: " + err.stack);
    return;
  }
  console.log("Connected to MySQL as id " + db.threadId);

  // Check if the 'localblooms' database exists
  db.query("CREATE DATABASE IF NOT EXISTS localblooms", (err, result) => {
    if (err) {
      console.error("Error creating database: " + err.stack);
      return;
    }
    console.log("Database 'localblooms' exists or was created.");
  });

  // Use the 'localblooms' database
  db.query("USE localblooms", (err) => {
    if (err) {
      console.error("Error using database: " + err.stack);
      return;
    }
    console.log("Using 'localblooms' database.");
  });
});

module.exports = db;
