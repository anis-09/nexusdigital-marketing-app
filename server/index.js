/**
 * Digital Marketing App — Express Server Entry Point
 * Serves API routes and static frontend files
 */
const express = require('express');
const cors = require('cors');
const path = require('path');

const servicesRouter = require('./routes/services');
const cartRouter = require('./routes/cart');
const ordersRouter = require('./routes/orders');
const authRouter = require('./routes/auth');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve static frontend files
app.use(express.static(path.join(__dirname, '..', 'public')));

// API Routes
app.use('/api/auth', authRouter);
app.use('/api/services', servicesRouter);
app.use('/api/cart', cartRouter);
app.use('/api/orders', ordersRouter);

// SPA fallback — serve index.html for non-API, non-static routes
app.get('*', (req, res) => {
  // Skip API routes and static file requests (files with extensions)
  if (req.path.startsWith('/api') || /\.\w+$/.test(req.path)) {
    return res.status(404).json({ error: 'Not found' });
  }
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`\n🚀 Digital Marketing App is running!`);
  console.log(`📍 Local:   http://localhost:${PORT}`);
  console.log(`📍 API:     http://localhost:${PORT}/api/services`);
  console.log(`\nPress Ctrl+C to stop the server.\n`);
});
