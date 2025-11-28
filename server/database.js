const Database = require("better-sqlite3");
const db = new Database("posts.db");

// Posts table - No longer needed..need to clean this up
db.exec(`
  CREATE TABLE IF NOT EXISTS posts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

// Users table
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    profileImage TEXT DEFAULT NULL
  )
`);

// Found items table
db.exec(`
  CREATE TABLE IF NOT EXISTS found_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    itemTitle TEXT NOT NULL,
    description TEXT NOT NULL,
    category TEXT NOT NULL,
    locationFound TEXT NOT NULL,
    dateFound DATE NOT NULL,
    timeFound TIME,
    photo TEXT,
    securityQuestion1 TEXT NOT NULL,
    securityQuestion2 TEXT,
    securityQuestion3 TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
  )
`);


module.exports = db;