const express = require('express');
const router = express.Router();

// GET single user by ID
router.get('/:id', (req, res) => {
  const user = req.db.prepare(`
    SELECT id, name, email 
    FROM users 
    WHERE id = ?
  `).get(req.params.id);

  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  res.json(user);
});

module.exports = router;
