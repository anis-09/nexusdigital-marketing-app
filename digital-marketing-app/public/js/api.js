/**
 * API Client — Handles all communication with the backend
 */
const API = {
  BASE: '/api',

  async request(path, options = {}) {
    try {
      const res = await fetch(`${this.BASE}${path}`, {
        headers: { 'Content-Type': 'application/json' },
        ...options,
        body: options.body ? JSON.stringify(options.body) : undefined
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Request failed');
      return data;
    } catch (err) {
      console.error(`API Error [${path}]:`, err);
      throw err;
    }
  },

  // Auth
  register(name, email, password) {
    return this.request('/auth/register', {
      method: 'POST',
      body: { name, email, password }
    });
  },

  login(email, password) {
    return this.request('/auth/login', {
      method: 'POST',
      body: { email, password }
    });
  },

  googleSignIn(name, email, avatar) {
    return this.request('/auth/google', {
      method: 'POST',
      body: { name, email, avatar }
    });
  },

  getMe() {
    const token = localStorage.getItem('auth_token');
    return this.request('/auth/me', {
      headers: { 'Authorization': `Bearer ${token}` }
    });
  },

  logout() {
    const token = localStorage.getItem('auth_token');
    return this.request('/auth/logout', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${token}` }
    });
  },

  // Services
  getServices(category) {
    const query = category && category !== 'all' ? `?category=${category}` : '';
    return this.request(`/services${query}`);
  },

  getService(id) {
    return this.request(`/services/${id}`);
  },

  // Cart
  getCart() {
    return this.request('/cart');
  },

  addToCart(serviceId, tierId, quantity = 1) {
    return this.request('/cart', {
      method: 'POST',
      body: { serviceId, tierId, quantity }
    });
  },

  removeFromCart(itemId) {
    return this.request(`/cart/${itemId}`, { method: 'DELETE' });
  },

  clearCart() {
    return this.request('/cart', { method: 'DELETE' });
  },

  // Orders
  placeOrder(brief) {
    return this.request('/orders', {
      method: 'POST',
      body: { brief }
    });
  },

  getOrders() {
    return this.request('/orders');
  },

  getOrder(id) {
    return this.request(`/orders/${id}`);
  }
};
