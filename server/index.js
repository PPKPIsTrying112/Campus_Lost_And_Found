const express = require('express');
const cors = require('cors');
const db = require('./database');

const postsRouter = require('./routes/posts');
const authRouter = require('./routes/auth');
const foundItemsRouter = require('./routes/found-items');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Make db available to routes
app.use((req, res, next) => {
  req.db = db;
  next();
});

// Routes
app.use('/api/posts', postsRouter);
app.use('/api/auth', authRouter);
app.use('/api/found-items', foundItemsRouter);

app.use('/uploads', express.static('uploads'));

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});