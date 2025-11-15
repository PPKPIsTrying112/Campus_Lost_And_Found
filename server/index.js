const express = require('express');
const cors = require('cors');

const postsRouter = require('./routes/posts');
const authRouter = require('./routes/auth'); 

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/posts', postsRouter);
app.use('/api/auth', authRouter);        

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
