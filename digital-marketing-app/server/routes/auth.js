/**
 * Auth API Routes
 * Handles user registration, login, Google sign-in, and session management
 */
const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');

// In-memory user storage
const users = [];
const sessions = {};

// POST /api/auth/register — Register a new user
router.post('/register', (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ success: false, error: 'Name, email, and password are required' });
  }

  if (password.length < 6) {
    return res.status(400).json({ success: false, error: 'Password must be at least 6 characters' });
  }

  // Check if user already exists
  const existing = users.find(u => u.email.toLowerCase() === email.toLowerCase());
  if (existing) {
    return res.status(409).json({ success: false, error: 'An account with this email already exists' });
  }

  const user = {
    id: uuidv4(),
    name,
    email: email.toLowerCase(),
    password, // In production, hash this!
    provider: 'email',
    avatar: null,
    createdAt: new Date().toISOString()
  };

  users.push(user);

  // Create session
  const token = uuidv4();
  sessions[token] = user.id;

  const { password: _, ...safeUser } = user;
  res.status(201).json({
    success: true,
    data: { user: safeUser, token },
    message: 'Account created successfully!'
  });
});

// POST /api/auth/login — Login with email/password
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, error: 'Email and password are required' });
  }

  const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
  if (!user || user.password !== password) {
    return res.status(401).json({ success: false, error: 'Invalid email or password' });
  }

  // Create session
  const token = uuidv4();
  sessions[token] = user.id;

  const { password: _, ...safeUser } = user;
  res.json({
    success: true,
    data: { user: safeUser, token },
    message: 'Login successful!'
  });
});

// POST /api/auth/google — Google Sign-In (simulated)
router.post('/google', (req, res) => {
  const { name, email, avatar } = req.body;

  if (!name || !email) {
    return res.status(400).json({ success: false, error: 'Name and email are required for Google sign-in' });
  }

  // Check if user already exists
  let user = users.find(u => u.email.toLowerCase() === email.toLowerCase());

  if (!user) {
    // Create new Google user
    user = {
      id: uuidv4(),
      name,
      email: email.toLowerCase(),
      password: null,
      provider: 'google',
      avatar: avatar || null,
      createdAt: new Date().toISOString()
    };
    users.push(user);
  }

  // Create session
  const token = uuidv4();
  sessions[token] = user.id;

  const { password: _, ...safeUser } = user;
  res.json({
    success: true,
    data: { user: safeUser, token },
    message: `Welcome, ${user.name}!`
  });
});

// GET /api/auth/me — Get current user from token
router.get('/me', (req, res) => {
  const token = req.headers.authorization?.replace('Bearer ', '');

  if (!token || !sessions[token]) {
    return res.status(401).json({ success: false, error: 'Not authenticated' });
  }

  const user = users.find(u => u.id === sessions[token]);
  if (!user) {
    return res.status(401).json({ success: false, error: 'User not found' });
  }

  const { password: _, ...safeUser } = user;
  res.json({ success: true, data: safeUser });
});

// POST /api/auth/logout — Invalidate token
router.post('/logout', (req, res) => {
  const token = req.headers.authorization?.replace('Bearer ', '');
  if (token) {
    delete sessions[token];
  }
  res.json({ success: true, message: 'Logged out successfully' });
});

module.exports = router;
