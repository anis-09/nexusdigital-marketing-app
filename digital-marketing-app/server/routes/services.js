/**
 * Services API Routes
 * Handles fetching service listings and individual service details
 */
const express = require('express');
const router = express.Router();
const services = require('../data/services');

// GET /api/services — List all services (with optional category filter)
router.get('/', (req, res) => {
  const { category } = req.query;
  
  let result = services.map(service => ({
    id: service.id,
    name: service.name,
    category: service.category,
    icon: service.icon,
    color: service.color,
    shortDescription: service.shortDescription,
    features: service.features,
    startingPrice: Math.min(...service.tiers.map(t => t.price)),
    tierCount: service.tiers.length
  }));

  if (category && category !== 'all') {
    result = result.filter(s => s.category === category);
  }

  res.json({ success: true, data: result });
});

// GET /api/services/:id — Get full service details including tiers
router.get('/:id', (req, res) => {
  const service = services.find(s => s.id === req.params.id);
  
  if (!service) {
    return res.status(404).json({ success: false, error: 'Service not found' });
  }

  res.json({ success: true, data: service });
});

module.exports = router;
