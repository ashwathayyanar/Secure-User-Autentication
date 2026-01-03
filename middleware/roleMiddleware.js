// Middleware to check if user has admin role
const requireAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    return next();
  }
  
  // Not admin - return 403 Forbidden
  if (req.path.startsWith('/api/')) {
    return res.status(403).json({ error: 'Admin access required' });
  } else {
    return res.status(403).send('Access denied. Admin privileges required.');
  }
};

module.exports = { requireAdmin };

