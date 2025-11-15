const express = require("express");
const bcrypt = require("bcrypt");
const db = require("../database");

const router = express.Router();

// SIGNUP
router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Hash the password
    const hashed = await bcrypt.hash(password, 10);

    // Insert into DB
    const stmt = db.prepare(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)"
    );
    stmt.run(name, email, hashed);

    res.json({ success: true, message: "Signup successful" });
  } catch (err) {
    res.status(400).json({ success: false, message: "Email already exists" });
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = db.prepare("SELECT * FROM users WHERE email = ?").get(email);
  if (!user) return res.status(400).json({ success: false, message: "User not found" });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(400).json({ success: false, message: "Incorrect password" });

  res.json({ success: true, message: "Login successful", user: { id: user.id, name: user.name, email: user.email } });
});

module.exports = router;
