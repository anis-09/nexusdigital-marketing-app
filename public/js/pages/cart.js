/**
 * Cart Page — View cart items, totals, and proceed to checkout
 */
const CartPage = {
  async render() {
    try {
      const { data: cart } = await API.getCart();

      if (cart.items.length === 0) {
        return `
          <div class="page-enter">
            <section class="cart-page">
              <div class="container">
                <h1 class="section-title" style="margin-bottom:8px;">Your Cart</h1>
                <div class="cart-empty">
                  <div class="cart-empty-icon">🛒</div>
                  <h2>Your cart is empty</h2>
                  <p>Browse our services and add the ones you need to get started.</p>
                  <a href="#/services" class="btn btn-primary" id="cart-browse-services">Browse Services</a>
                </div>
              </div>
            </section>
          </div>
        `;
      }

      return `
        <div class="page-enter">
          <section class="cart-page">
            <div class="container">
              <h1 class="section-title" style="margin-bottom:32px;">Your Cart</h1>
              <div class="cart-layout">
                <div class="cart-items" id="cart-items">
                  ${cart.items.map(item => this.renderCartItem(item)).join('')}
                </div>
                <div class="cart-summary">
                  <h3>Order Summary</h3>
                  ${cart.items.map(item => `
                    <div class="summary-row">
                      <span class="label">${item.service?.name || 'Service'} — ${item.tier?.name || 'Tier'}</span>
                      <span>$${(item.tier?.price || 0).toLocaleString()}</span>
                    </div>
                  `).join('')}
                  <div class="summary-row total">
                    <span>Total</span>
                    <span>$${cart.total.toLocaleString()}</span>
                  </div>
                  <div class="summary-actions">
                    <a href="#/checkout" class="btn btn-primary btn-full" id="cart-checkout-btn">
                      Proceed to Checkout →
                    </a>
                    <button class="btn btn-danger btn-sm btn-full" onclick="CartPage.clearCart()" id="cart-clear-btn">
                      Clear Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      `;
    } catch (err) {
      return `<div class="container" style="padding:80px 24px;text-align:center;"><p>Error loading cart.</p></div>`;
    }
  },

  renderCartItem(item) {
    const iconBg = item.service?.color ? `${item.service.color}15` : 'rgba(124,58,237,0.1)';
    return `
      <div class="cart-item" id="cart-item-${item.id}">
        <div class="cart-item-icon" style="background: ${iconBg};">
          ${item.service?.icon || '📦'}
        </div>
        <div class="cart-item-info">
          <h3>${item.service?.name || 'Service'}</h3>
          <div class="cart-item-tier">${item.tier?.name || 'Tier'} Plan</div>
        </div>
        <div class="cart-item-price">
          <div class="price">$${(item.tier?.price || 0).toLocaleString()}</div>
          <div class="period">per ${item.tier?.period || 'month'}</div>
        </div>
        <button class="cart-item-remove" onclick="CartPage.removeItem('${item.id}')" 
                aria-label="Remove item" id="remove-${item.id}">✕</button>
      </div>
    `;
  },

  async removeItem(itemId) {
    try {
      await API.removeFromCart(itemId);
      App.showToast('Item removed from cart', 'success');
      App.updateCartBadge();
      // Re-render the page
      const app = document.getElementById('app');
      app.innerHTML = await this.render();
    } catch (err) {
      App.showToast('Failed to remove item', 'error');
    }
  },

  async clearCart() {
    try {
      await API.clearCart();
      App.showToast('Cart cleared', 'success');
      App.updateCartBadge();
      const app = document.getElementById('app');
      app.innerHTML = await this.render();
    } catch (err) {
      App.showToast('Failed to clear cart', 'error');
    }
  }
};
