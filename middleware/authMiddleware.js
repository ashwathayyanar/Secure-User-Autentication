const { dbHelpers } = require('../database/db');

// Middleware to check if user is authenticated
const requireAuth = async (req, res, next) => {
  if (req.session && req.session.userId) {
    try {
      // Verify user still exists in database
      const user = await dbHelpers.getUserById(req.session.userId);
      if (user) {
        req.user = user;
        return next();
      }
    } catch (error) {
      console.error('Error checking user:', error);
    }
  }
  
  // Not authenticated - redirect to login
  if (req.path.startsWith('/api/')) {
    // API routes return JSON
    return res.status(401).json({ error: 'Authentication required' });
  } else {
    // Web routes redirect to login
    return res.redirect('/login.html');
  }
};

module.exports = { requireAuth };

