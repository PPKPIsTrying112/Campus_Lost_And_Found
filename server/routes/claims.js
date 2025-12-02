const express = require('express');
const router = express.Router();

// POST: Submit a new claim
router.post('/', (req, res) => {
  const { item_id, claimer_id, answer1, answer2, answer3 } = req.body;

  // Check if user already claimed this item
  const existing = req.db.prepare(
    'SELECT * FROM claims WHERE item_id = ? AND claimer_id = ?'
  ).get(item_id, claimer_id);

  if (existing) {
    return res.status(400).json({ error: 'You already submitted a claim for this item' });
  }

  // If haven't submitted yet, we shall create a new claim 
  const insert = req.db.prepare(`
    INSERT INTO claims (item_id, claimer_id, answer1, answer2, answer3)
    VALUES (?, ?, ?, ?, ?)
  `);

  const result = insert.run(item_id, claimer_id, answer1, answer2, answer3);
  res.json({ id: result.lastInsertRowid, message: 'Claim submitted!' });
});

// GET: For displaying Submitted claims of the claimer 
    //GET /api/claims/my-claims/3   → Get all claims submitted by user #3 which is the claimer 
router.get('/my-claims/:userId', (req, res) => {
  const { userId } = req.params;

  const claims = req.db.prepare(`
    SELECT claims.*, found_items.itemTitle, found_items.photo
    FROM claims
    JOIN found_items ON claims.item_id = found_items.id
    WHERE claims.claimer_id = ?
    ORDER BY claims.created_at DESC
  `).all(userId);

  res.json(claims);
});

// GET: For displaying Incoming claims for the Founder
    //GET /api/claims/incoming/7   → Get all claims on items posted by user #7 which is the founder
router.get('/incoming/:userId', (req, res) => {
  const { userId } = req.params;

  const claims = req.db.prepare(`
    SELECT claims.*, found_items.itemTitle, found_items.photo,
           found_items.securityQuestion1, found_items.securityQuestion2, found_items.securityQuestion3,
           users.name as claimerName, users.email as claimerEmail
    FROM claims
    JOIN found_items ON claims.item_id = found_items.id
    JOIN users ON claims.claimer_id = users.id
    WHERE found_items.user_id = ?
    ORDER BY claims.created_at DESC
  `).all(userId);

  res.json(claims);
});

// PUT: Approve a claim (Founder)
    // PUT /api/claims/5/approve --> Approve claim #5
router.put('/:id/approve', (req, res) => {
  const { id } = req.params;

  // Get the claim to find which item it's for
  const claim = req.db.prepare('SELECT * FROM claims WHERE id = ?').get(id);
  
  if (!claim) {
    return res.status(404).json({ error: 'Claim not found' });
  }

  // Update claim status to approved
  req.db.prepare('UPDATE claims SET status = ? WHERE id = ?').run('approved', id);
  
  // Update item status to claimed
  req.db.prepare('UPDATE found_items SET status = ? WHERE id = ?').run('claimed', claim.item_id);

  res.json({ message: 'Claim approved!' });
});

// PUT: Deny a claim (Founder)
router.put('/:id/deny', (req, res) => {
  const { id } = req.params;

  req.db.prepare('UPDATE claims SET status = ? WHERE id = ?').run('denied', id);
  res.json({ message: 'Claim denied!' });
});

module.exports = router;