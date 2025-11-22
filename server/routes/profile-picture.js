const express = require("express");
const multer = require("multer");
const path = require("path");
const db = require("../database"); // <-- needed to update the user's profileImage

const router = express.Router();

// Where to store uploaded images
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../uploads/profile-images"));
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const uniqueName = Date.now() + "-" + Math.round(Math.random() * 1e9) + ext;
    cb(null, uniqueName);
  },
});

// Filter so only images are allowed
const upload = multer({
  storage,
  fileFilter(req, file, cb) {
    const allowed = ["image/png", "image/jpeg", "image/jpg", "image/webp"];
    if (!allowed.includes(file.mimetype)) {
      return cb(new Error("Only image files allowed"));
    }
    cb(null, true);
  },
});

// POST /api/profile-picture/profile-image
router.post("/profile-image", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.json({ success: false, message: "No file uploaded" });
  }

  const imageUrl = `/uploads/profile-images/${req.file.filename}`;

  // Get userId from request body (sent from frontend)
  const userId = req.body.userId;
  if (!userId) return res.status(400).json({ success: false, message: "User ID missing" });

  try {
    const stmt = db.prepare("UPDATE users SET profileImage = ? WHERE id = ?");
    stmt.run(imageUrl, userId);

    res.json({ success: true, filename: req.file.filename, url: imageUrl });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Database error" });
  }
});

module.exports = router;
