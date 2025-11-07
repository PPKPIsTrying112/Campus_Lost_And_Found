const express = require('express');
const cors = require('cors');
const Database = require('better-sqlite3');

const app = express();
const db = new Database('posts.db');

// Middleware
app.use(cors());
app.use(express.json());

// Create posts table if it doesn't exist
db.exec(`
  CREATE TABLE IF NOT EXISTS posts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

// GET all posts (newest first)
app.get('/api/posts', (req, res) => {
  const posts = db.prepare('SELECT * FROM posts ORDER BY created_at DESC').all();
  res.json(posts);
});

// POST create a new post
app.post('/api/posts', (req, res) => {
  const { title, content } = req.body;
  
  const insert = db.prepare('INSERT INTO posts (title, content) VALUES (?, ?)');
  const result = insert.run(title, content);
  
  res.json({ id: result.lastInsertRowid, title, content });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});