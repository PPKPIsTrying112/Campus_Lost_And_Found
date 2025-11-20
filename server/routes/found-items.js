const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const router = express.Router();

// Create uploads folder if it doesn't exist
const uploadDir = path.join(__dirname, '../uploads/found-items');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

// GET all found items
router.get('/', (req, res) => {
  const foundItems = req.db.prepare('SELECT * FROM found_items ORDER BY created_at DESC').all();
  res.json(foundItems);
});

// POST with file upload
router.post('/', upload.single('photo'), (req, res) => {
  const { itemTitle, description, category, locationFound, dateFound, timeFound, securityQuestion1, securityQuestion2, securityQuestion3 } = req.body;
  
  const photoFileName = req.file ? req.file.filename : null;
  
  const insert = req.db.prepare(`
    INSERT INTO found_items (itemTitle, description, category, locationFound, dateFound, timeFound, photo, securityQuestion1, securityQuestion2, securityQuestion3) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);
  
  const result = insert.run(itemTitle, description, category, locationFound, dateFound, timeFound, photoFileName, securityQuestion1, securityQuestion2, securityQuestion3);
  
  res.json({ id: result.lastInsertRowid, itemTitle, description });
});

module.exports = router;