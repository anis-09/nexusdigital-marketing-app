/**
 * Cart API Routes
 * Handles cart CRUD operations — add, remove, get, clear
 */
const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const services = require('../data/services');

// In-memory cart storage
let cart = [];

// GET /api/cart — Get all cart items with full service/tier details
router.get('/', (req, res) => {
  const enrichedCart = cart.map(item => {
    const service = services.find(s => s.id === item.serviceId);
    const tier = service ? service.tiers.find(t => t.id === item.tierId) : null;
    return {
      ...item,
      service: service ? {
        id: service.id,
        name: service.name,
        icon: service.icon,
        color: service.color
      } : null,
      tier: tier ? {
        id: tier.id,
        name: tier.name,
        price: tier.price,
        period: tier.period
      } : null
    };
  });

  const total = enrichedCart.reduce((sum, item) => {
    return sum + (item.tier ? item.tier.price * item.quantity : 0);
  }, 0);

  res.json({
    success: true,
    data: {
      items: enrichedCart,
      itemCount: enrichedCart.length,
      total
    }
  });
});

// POST /api/cart — Add an item to the cart
router.post('/', (req, res) => {
  const { serviceId, tierId, quantity = 1 } = req.body;

  if (!serviceId || !tierId) {
    return res.status(400).json({ success: false, error: 'serviceId and tierId are required' });
  }

  // Validate service and tier exist
  const service = services.find(s => s.id === serviceId);
  if (!service) {
    return res.status(404).json({ success: false, error: 'Service not found' });
  }

  const tier = service.tiers.find(t => t.id === tierId);
  if (!tier) {
    return res.status(404).json({ success: false, error: 'Tier not found' });
  }

  // Check if this exact service+tier combo already exists
  const existingItem = cart.find(item => item.serviceId === serviceId && item.tierId === tierId);
  if (existingItem) {
    existingItem.quantity += quantity;
    return res.json({ success: true, data: existingItem, message: 'Cart item quantity updated' });
  }

  const cartItem = {
    id: uuidv4(),
    serviceId,
    tierId,
    quantity,
    addedAt: new Date().toISOString()
  };

  cart.push(cartItem);
  res.status(201).json({ success: true, data: cartItem, message: 'Item added to cart' });
});

// DELETE /api/cart/:id — Remove a specific item from the cart
router.delete('/:id', (req, res) => {
  const index = cart.findIndex(item => item.id === req.params.id);
  
  if (index === -1) {
    return res.status(404).json({ success: false, error: 'Cart item not found' });
  }

  cart.splice(index, 1);
  res.json({ success: true, message: 'Item removed from cart' });
});

// DELETE /api/cart — Clear the entire cart
router.delete('/', (req, res) => {
  cart = [];
  res.json({ success: true, message: 'Cart cleared' });
});

// Export cart reference for orders module
router.getCart = () => cart;
router.clearCart = () => { cart = []; };

module.exports = router;
