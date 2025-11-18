// server/routes/posts.js
const express = require('express');
const router = express.Router();
const db = require('../database');

// GET all posts
router.get('/', (req, res) => {
  const posts = db.prepare('SELECT * FROM posts ORDER BY created_at DESC').all();
  res.json(posts);
});

// POST create a new post
router.post('/', (req, res) => {
  const { title, content } = req.body;
  const insert = db.prepare('INSERT INTO posts (title, content) VALUES (?, ?)');
  const result = insert.run(title, content);

  res.json({ id: result.lastInsertRowid, title, content });
});

module.exports = router;
