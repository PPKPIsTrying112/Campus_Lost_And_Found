const express = require('express');
const cors = require('cors');
const db = require('./database');

const postsRouter = require('./routes/posts');
const authRouter = require('./routes/auth');
const foundItemsRouter = require('./routes/found-items');
const profilePictureRouter = require("./routes/profile-picture");
const usersRouter = require('./routes/users');
const claimsRoutes = require('./routes/claims'); 

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
app.use("/api/profile-picture", profilePictureRouter);
app.use('/api/users', usersRouter);

app.use('/api/claims', claimsRoutes); 

app.use('/uploads', express.static('uploads'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// export for supertest validation cucumber tests
module.exports = app;