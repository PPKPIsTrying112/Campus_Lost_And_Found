const express = require("express");
const bcrypt = require("bcrypt");
const db = require("../database");

const router = express.Router();

// SIGNUP
router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const hashed = await bcrypt.hash(password, 10);

    // Insert into DB with profileImage default NULL
    const stmt = db.prepare(
      "INSERT INTO users (name, email, password, profileImage) VALUES (?, ?, ?, ?)"
    );

    const result = stmt.run(name, email, hashed, null);

    // Return user info including profileImage
    res.json({
      success: true,
      message: "Signup successful",
      user: { id: result.lastInsertRowid, name, email, profileImage: null } 
    });
  } catch (err) {
    res.status(400).json({ success: false, message: "Email already exists" });
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = db.prepare("SELECT * FROM users WHERE email = ?").get(email);
  if (!user)
    return res.status(400).json({ success: false, message: "User not found" });

  const match = await bcrypt.compare(password, user.password);
  if (!match)
    return res.status(400).json({ success: false, message: "Incorrect password" });

  res.json({
    success: true,
    message: "Login successful",
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      profileImage: user.profileImage || null,
    },
  });
});

module.exports = router;