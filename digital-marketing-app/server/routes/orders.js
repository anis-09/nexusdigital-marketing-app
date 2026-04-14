/**
 * Orders API Routes
 * Handles order placement and retrieval
 */
const express = require('express');
const router = express.Router();
const services = require('../data/services');
const cartRouter = require('./cart');

// In-memory orders storage
const orders = [];

// Generate unique order ID
function generateOrderId() {
  const num = String(orders.length + 1).padStart(5, '0');
  return `ORD-${num}`;
}

// POST /api/orders — Place a new order from cart contents
router.post('/', (req, res) => {
  const { brief = {} } = req.body;
  const cart = cartRouter.getCart();

  if (cart.length === 0) {
    return res.status(400).json({ success: false, error: 'Cart is empty. Add items before placing an order.' });
  }

  // Build enriched order items with full details
  const orderItems = cart.map(item => {
    const service = services.find(s => s.id === item.serviceId);
    const tier = service ? service.tiers.find(t => t.id === item.tierId) : null;
    return {
      serviceId: item.serviceId,
      serviceName: service ? service.name : 'Unknown',
      serviceIcon: service ? service.icon : '',
      tierId: item.tierId,
      tierName: tier ? tier.name : 'Unknown',
      price: tier ? tier.price : 0,
      period: tier ? tier.period : '',
      quantity: item.quantity,
      subtotal: tier ? tier.price * item.quantity : 0
    };
  });

  const total = orderItems.reduce((sum, item) => sum + item.subtotal, 0);

  const order = {
    id: generateOrderId(),
    items: orderItems,
    brief: {
      companyName: brief.companyName || '',
      website: brief.website || '',
      industry: brief.industry || '',
      goals: brief.goals || '',
      targetAudience: brief.targetAudience || '',
      budget: brief.budget || '',
      timeline: brief.timeline || '',
      notes: brief.notes || ''
    },
    total,
    status: 'confirmed',
    createdAt: new Date().toISOString()
  };

  orders.push(order);

  // Clear the cart after successful order
  cartRouter.clearCart();

  res.status(201).json({ success: true, data: order, message: 'Order placed successfully!' });
});

// GET /api/orders — List all orders
router.get('/', (req, res) => {
  res.json({ success: true, data: orders });
});

// GET /api/orders/:id — Get specific order details
router.get('/:id', (req, res) => {
  const order = orders.find(o => o.id === req.params.id);
  
  if (!order) {
    return res.status(404).json({ success: false, error: 'Order not found' });
  }

  res.json({ success: true, data: order });
});

module.exports = router;
