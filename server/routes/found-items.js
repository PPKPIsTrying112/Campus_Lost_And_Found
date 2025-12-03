const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const router = express.Router();

const uploadDir = path.join(__dirname, '../uploads/found-items');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

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
  const foundItems = req.db.prepare(`
    SELECT found_items.*, users.name as userName 
    FROM found_items 
    LEFT JOIN users ON found_items.user_id = users.id 
    WHERE found_items.status = 'available'
    ORDER BY created_at DESC
  `).all();
  res.json(foundItems);
});

// GET items by user_id (for profile pages)
router.get('/user/:user_id', (req, res) => {
  const { user_id } = req.params;

  const userItems = req.db.prepare(`
    SELECT found_items.*, users.name AS userName
    FROM found_items
    LEFT JOIN users ON found_items.user_id = users.id
    WHERE found_items.user_id = ?
    ORDER BY created_at DESC
  `).all(user_id);

  res.json(userItems);
});

// GET all claimed items (for archive page)
router.get('/archive', (req, res) => {
  const claimedItems = req.db.prepare(`
    SELECT found_items.*, users.name as userName 
    FROM found_items 
    LEFT JOIN users ON found_items.user_id = users.id 
    WHERE found_items.status = 'claimed'
    ORDER BY created_at DESC
  `).all();
  res.json(claimedItems);
});

// GET single item by ID 
router.get('/:id', (req, res) => {
  const { id } = req.params;
  
  const item = req.db.prepare(`
    SELECT found_items.*, 
          users.name AS userName,
          users.profileImage AS userProfilePic
    FROM found_items 
    LEFT JOIN users ON found_items.user_id = users.id 
    WHERE found_items.id = ?
  `).get(id);
  
  if (!item) {
    return res.status(404).json({ error: 'Item not found' });
  }
  
  res.json(item);
});

// POST with file upload 
router.post('/', upload.single('photo'), (req, res) => {
  const { itemTitle, description, category, locationFound, dateFound, timeFound, securityQuestion1, securityQuestion2, securityQuestion3, user_id } = req.body;
  
  const photoFileName = req.file ? req.file.filename : null;
  
  const insert = req.db.prepare(`
    INSERT INTO found_items (user_id, itemTitle, description, category, locationFound, dateFound, timeFound, photo, securityQuestion1, securityQuestion2, securityQuestion3) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);
  
  const result = insert.run(user_id, itemTitle, description, category, locationFound, dateFound, timeFound, photoFileName, securityQuestion1, securityQuestion2, securityQuestion3);
  
  res.json({ id: result.lastInsertRowid, itemTitle, description });
});

module.exports = router;