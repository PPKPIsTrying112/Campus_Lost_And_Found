const express = require('express');
const cors = require('cors');
const Database = require('better-sqlite3');


// COnfigure Multer for Image upload 
const multer = require('multer');
const path = require('path');
const fs = require('fs'); 

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

db.exec(`
  CREATE TABLE IF NOT EXISTS found_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
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
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);


// Create uploads folder if it doesn't exist
const uploadDir = path.join(__dirname, 'uploads/found-items');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);  // Save to uploads/found-items/
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);  // Unique filename
  }
});

const upload = multer({ storage: storage });

// GET all found items
app.get('/api/found-items', (req, res) => {
  console.log('GET /api/found-items was called!'); 
  const foundItems = db.prepare('SELECT * FROM found_items ORDER BY created_at DESC').all();
  res.json(foundItems);
});

// POST with file upload
app.post('/api/found-items', upload.single('photo'), (req, res) => {
  const { itemTitle, description, category, locationFound, dateFound, timeFound, securityQuestion1, securityQuestion2, securityQuestion3 } = req.body;
  
  // Get filename from uploaded file
  const photoFileName = req.file ? req.file.filename : null;
  
  const insert = db.prepare(`
    INSERT INTO found_items (itemTitle, description, category, locationFound, dateFound, timeFound, photo, securityQuestion1, securityQuestion2, securityQuestion3) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);
  
  const result = insert.run(itemTitle, description, category, locationFound, dateFound, timeFound, photoFileName, securityQuestion1, securityQuestion2, securityQuestion3);
  
  res.json({ id: result.lastInsertRowid, itemTitle, description });
});

app.use('/uploads', express.static('uploads'));

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