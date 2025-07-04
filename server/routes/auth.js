const express = require('express');
const router = express.Router();

// Simple in-memory user (for demo only)
const USER = { username: 'raju', password: 'raju@123' };

router.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (username === USER.username && password === USER.password) {
    // For demo: return a simple token (not secure, just for demo)
    return res.json({ success: true, token: 'secret-demo-token' });
  }
  res.status(401).json({ success: false, message: 'Invalid credentials' });
});

module.exports = router;
