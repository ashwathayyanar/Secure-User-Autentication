const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
const authRoutes = require('../routes/authRoutes');
const { requireAuth } = require('../middleware/authMiddleware');
const { requireAdmin } = require('../middleware/roleMiddleware');
const { closePool } = require('../database/db');

const app = express();

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Session configuration for Vercel
// Note: For production, consider using Redis or database-backed sessions
app.use(session({
  secret: process.env.SESSION_SECRET || 'your-secret-key-change-in-production-vercel',
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
    sameSite: 'lax'
  }
}));

// Serve static files from public directory
app.use(express.static(path.join(__dirname, '../public')));

// Serve HTML files from views directory
app.use(express.static(path.join(__dirname, '../views')));

// API routes
app.use('/api', authRoutes);

// Home route - redirect to login
app.get('/', (req, res) => {
  res.redirect('/login.html');
});

// Protected route: User Dashboard
app.get('/dashboard', requireAuth, (req, res) => {
  res.sendFile(path.join(__dirname, '../views', 'dashboard.html'));
});

// Protected route: Admin Panel
app.get('/admin', requireAuth, requireAdmin, (req, res) => {
  res.sendFile(path.join(__dirname, '../views', 'admin.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).send('Page not found');
});

// Export the Express app for Vercel
module.exports = app;

