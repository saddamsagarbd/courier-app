const checkRole = (roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Access forbidden' });
    }
    next();
  };
};

// Usage in routes:
router.get('/admin/dashboard', 
  authMiddleware, 
  checkRole(['admin']), 
  (req, res) => { 

    }
);