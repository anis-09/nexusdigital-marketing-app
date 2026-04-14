/**
 * Checkout Page — Project brief form + order summary + place order
 */
const CheckoutPage = {
  async render() {
    try {
      const { data: cart } = await API.getCart();

      if (cart.items.length === 0) {
        return `
          <div class="page-enter">
            <section class="checkout-page">
              <div class="container" style="text-align:center; padding:80px 24px;">
                <h2>No items to checkout</h2>
                <p style="color:var(--text-secondary); margin:16px 0 32px;">Add some services to your cart first.</p>
                <a href="#/services" class="btn btn-primary">Browse Services</a>
              </div>
            </section>
          </div>
        `;
      }

      return `
        <div class="page-enter">
          <section class="checkout-page">
            <div class="container">
              <a href="#/cart" class="back-link" id="back-to-cart">← Back to Cart</a>
              <h1 class="section-title" style="margin-bottom:32px;">Checkout</h1>
              
              <div class="checkout-layout">
                <div>
                  <!-- Project Brief Form -->
                  <div class="form-section">
                    <h3>📋 Project Brief</h3>
                    <p style="color:var(--text-secondary); font-size:0.9rem; margin-bottom:24px;">
                      Tell us about your project so we can tailor our services to your needs.
                    </p>
                    <form id="checkout-form" onsubmit="CheckoutPage.placeOrder(event)">
                      <div class="form-row">
                        <div class="form-group">
                          <label for="company-name">Company Name <span class="required">*</span></label>
                          <input type="text" class="form-input" id="company-name" placeholder="Your company name" required>
                        </div>
                        <div class="form-group">
                          <label for="website">Website</label>
                          <input type="url" class="form-input" id="website" placeholder="https://example.com">
                        </div>
                      </div>
                      <div class="form-row">
                        <div class="form-group">
                          <label for="industry">Industry <span class="required">*</span></label>
                          <select class="form-select" id="industry" required>
                            <option value="">Select industry</option>
                            <option value="technology">Technology</option>
                            <option value="ecommerce">E-Commerce</option>
                            <option value="healthcare">Healthcare</option>
                            <option value="finance">Finance</option>
                            <option value="education">Education</option>
                            <option value="realestate">Real Estate</option>
                            <option value="food">Food & Beverage</option>
                            <option value="travel">Travel & Hospitality</option>
                            <option value="other">Other</option>
                          </select>
                        </div>
                        <div class="form-group">
                          <label for="budget">Monthly Budget</label>
                          <select class="form-select" id="budget">
                            <option value="">Select range</option>
                            <option value="under-1k">Under $1,000</option>
                            <option value="1k-5k">$1,000 — $5,000</option>
                            <option value="5k-15k">$5,000 — $15,000</option>
                            <option value="15k+">$15,000+</option>
                          </select>
                        </div>
                      </div>
                      <div class="form-group">
                        <label for="goals">Project Goals <span class="required">*</span></label>
                        <textarea class="form-textarea" id="goals" rows="3" 
                                  placeholder="What are you hoping to achieve? e.g., Increase organic traffic by 50% in 6 months..." 
                                  required></textarea>
                      </div>
                      <div class="form-group">
                        <label for="target-audience">Target Audience</label>
                        <input type="text" class="form-input" id="target-audience" 
                               placeholder="e.g., B2B SaaS companies, 25-45 year olds in the US">
                      </div>
                      <div class="form-group">
                        <label for="timeline">Preferred Timeline</label>
                        <select class="form-select" id="timeline">
                          <option value="">Select timeline</option>
                          <option value="asap">ASAP</option>
                          <option value="1-month">Within 1 month</option>
                          <option value="1-3-months">1-3 months</option>
                          <option value="3-6-months">3-6 months</option>
                          <option value="6-12-months">6-12 months</option>
                        </select>
                      </div>
                      <div class="form-group">
                        <label for="notes">Additional Notes</label>
                        <textarea class="form-textarea" id="notes" rows="3" 
                                  placeholder="Any other details, preferences, or special requirements..."></textarea>
                      </div>
                      <button type="submit" class="btn btn-primary btn-lg btn-full" id="place-order-btn">
                        💳 Proceed to Payment — $${cart.total.toLocaleString()}
                      </button>
                    </form>
                  </div>
                </div>

                <!-- Order Summary Sidebar -->
                <div class="order-summary">
                  <h3>Order Summary</h3>
                  ${cart.items.map(item => `
                    <div class="order-item">
                      <div>
                        <div class="order-item-name">${item.service?.icon || ''} ${item.service?.name || 'Service'}</div>
                        <div class="order-item-tier">${item.tier?.name || 'Tier'} Plan</div>
                      </div>
                      <div class="order-item-price">$${(item.tier?.price || 0).toLocaleString()}</div>
                    </div>
                  `).join('')}
                  <div class="confirmation-total" style="margin-top:16px;">
                    <span>Total</span>
                    <span>$${cart.total.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      `;
    } catch (err) {
      return `<div class="container" style="padding:80px 24px;text-align:center;"><p>Error loading checkout.</p></div>`;
    }
  },

  async placeOrder(e) {
    e.preventDefault();
    
    const btn = document.getElementById('place-order-btn');
    btn.disabled = true;
    btn.textContent = 'Saving brief...';

    const brief = {
      companyName: document.getElementById('company-name').value,
      website: document.getElementById('website').value,
      industry: document.getElementById('industry').value,
      goals: document.getElementById('goals').value,
      targetAudience: document.getElementById('target-audience').value,
      budget: document.getElementById('budget').value,
      timeline: document.getElementById('timeline').value,
      notes: document.getElementById('notes').value
    };

    // Save brief to sessionStorage and redirect to payment
    sessionStorage.setItem('checkout_brief', JSON.stringify(brief));
    App.navigate('/payment');
  }
};

