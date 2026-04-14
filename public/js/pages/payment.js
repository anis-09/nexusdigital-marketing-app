/**
 * Payment Page — Payment gateway with multiple payment methods
 * Supports Credit/Debit Card, UPI, and Net Banking
 */
const PaymentPage = {
  selectedMethod: 'card',
  briefData: null,

  async render() {
    try {
      const { data: cart } = await API.getCart();

      if (cart.items.length === 0) {
        return `
          <div class="page-enter">
            <section class="payment-page">
              <div class="container" style="text-align:center; padding:80px 24px;">
                <h2>No items to pay for</h2>
                <p style="color:var(--text-secondary); margin:16px 0 32px;">Add some services to your cart first.</p>
                <a href="#/services" class="btn btn-primary">Browse Services</a>
              </div>
            </section>
          </div>
        `;
      }

      // Retrieve brief data from sessionStorage
      this.briefData = JSON.parse(sessionStorage.getItem('checkout_brief') || '{}');

      return `
        <div class="page-enter">
          <section class="payment-page">
            <div class="container">
              <a href="#/checkout" class="back-link" id="back-to-checkout">← Back to Checkout</a>

              <div class="payment-header">
                <div class="payment-lock-icon">🔒</div>
                <h1 class="section-title" style="margin-bottom:4px;">Secure Payment</h1>
                <p style="color:var(--text-secondary); font-size:0.95rem;">Your payment information is encrypted and secure</p>
              </div>
              
              <div class="checkout-layout">
                <div>
                  <!-- Payment Method Selection -->
                  <div class="form-section">
                    <h3>💳 Payment Method</h3>
                    <div class="payment-methods" id="payment-methods">
                      <button class="payment-method-btn active" data-method="card" onclick="PaymentPage.selectMethod('card')" id="method-card">
                        <span class="pm-icon">💳</span>
                        <span class="pm-label">Credit / Debit Card</span>
                        <span class="pm-check">✓</span>
                      </button>
                      <button class="payment-method-btn" data-method="upi" onclick="PaymentPage.selectMethod('upi')" id="method-upi">
                        <span class="pm-icon">📲</span>
                        <span class="pm-label">UPI</span>
                        <span class="pm-check">✓</span>
                      </button>
                      <button class="payment-method-btn" data-method="netbanking" onclick="PaymentPage.selectMethod('netbanking')" id="method-netbanking">
                        <span class="pm-icon">🏦</span>
                        <span class="pm-label">Net Banking</span>
                        <span class="pm-check">✓</span>
                      </button>
                      <button class="payment-method-btn" data-method="wallet" onclick="PaymentPage.selectMethod('wallet')" id="method-wallet">
                        <span class="pm-icon">👛</span>
                        <span class="pm-label">Digital Wallet</span>
                        <span class="pm-check">✓</span>
                      </button>
                    </div>
                  </div>

                  <!-- Payment Forms -->
                  <div class="form-section" id="payment-form-section">
                    ${this.renderPaymentForm('card')}
                  </div>

                  <!-- Security Badges -->
                  <div class="security-badges">
                    <div class="security-badge">
                      <span>🔐</span> SSL Encrypted
                    </div>
                    <div class="security-badge">
                      <span>🛡️</span> PCI DSS Compliant
                    </div>
                    <div class="security-badge">
                      <span>✅</span> 100% Secure
                    </div>
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
                  <div class="summary-row" style="padding-top:12px; margin-top:8px; border-top: 1px solid var(--border-glass);">
                    <span class="label">Subtotal</span>
                    <span>$${cart.total.toLocaleString()}</span>
                  </div>
                  <div class="summary-row">
                    <span class="label">Processing Fee</span>
                    <span style="color:var(--accent-green);">Free</span>
                  </div>
                  <div class="summary-row">
                    <span class="label">Tax</span>
                    <span>$${Math.round(cart.total * 0.0).toLocaleString()}</span>
                  </div>
                  <div class="confirmation-total" style="margin-top:12px;">
                    <span>Total</span>
                    <span>$${cart.total.toLocaleString()}</span>
                  </div>

                  <div class="payment-guarantee" style="margin-top:20px;">
                    <p style="font-size:0.8rem; color:var(--text-muted); text-align:center; line-height:1.5;">
                      🔒 Your payment is protected by 256-bit SSL encryption. We never store your card details.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      `;
    } catch (err) {
      return `<div class="container" style="padding:80px 24px;text-align:center;"><p>Error loading payment page.</p></div>`;
    }
  },

  renderPaymentForm(method) {
    switch (method) {
      case 'card':
        return `
          <h3>Card Details</h3>
          <form id="payment-form" onsubmit="PaymentPage.processPayment(event)">
            <div class="form-group">
              <label for="card-name">Cardholder Name <span class="required">*</span></label>
              <input type="text" class="form-input" id="card-name" placeholder="Name on card" required>
            </div>
            <div class="form-group">
              <label for="card-number">Card Number <span class="required">*</span></label>
              <div class="card-input-wrapper">
                <input type="text" class="form-input card-number-input" id="card-number" 
                       placeholder="1234  5678  9012  3456" maxlength="19" 
                       oninput="PaymentPage.formatCardNumber(this)" required>
                <div class="card-brands">
                  <span class="card-brand" id="brand-visa">VISA</span>
                  <span class="card-brand" id="brand-mc">MC</span>
                  <span class="card-brand" id="brand-amex">AMEX</span>
                </div>
              </div>
            </div>
            <div class="form-row">
              <div class="form-group">
                <label for="card-expiry">Expiry Date <span class="required">*</span></label>
                <input type="text" class="form-input" id="card-expiry" placeholder="MM / YY" maxlength="7"
                       oninput="PaymentPage.formatExpiry(this)" required>
              </div>
              <div class="form-group">
                <label for="card-cvv">CVV <span class="required">*</span></label>
                <div class="cvv-input-wrapper">
                  <input type="password" class="form-input" id="card-cvv" placeholder="•••" maxlength="4" required>
                  <span class="cvv-help" title="3 or 4 digit security code on the back of your card">?</span>
                </div>
              </div>
            </div>
            <div class="form-group" style="margin-top:8px;">
              <label class="checkbox-label">
                <input type="checkbox" id="save-card">
                <span class="checkmark"></span>
                Save this card for future payments
              </label>
            </div>
            <button type="submit" class="btn btn-primary btn-lg btn-full pay-btn" id="pay-btn">
              🔒 Pay Now
            </button>
          </form>
        `;
      case 'upi':
        return `
          <h3>UPI Payment</h3>
          <form id="payment-form" onsubmit="PaymentPage.processPayment(event)">
            <div class="form-group">
              <label for="upi-id">UPI ID <span class="required">*</span></label>
              <input type="text" class="form-input" id="upi-id" placeholder="yourname@upi" required>
            </div>
            <div class="upi-apps">
              <p style="font-size:0.85rem; color:var(--text-muted); margin-bottom:12px;">Or pay using:</p>
              <div class="upi-app-grid">
                <button type="button" class="upi-app-btn" onclick="document.getElementById('upi-id').value='user@paytm'">
                  <span style="font-size:1.5rem;">💜</span>
                  <span>Paytm</span>
                </button>
                <button type="button" class="upi-app-btn" onclick="document.getElementById('upi-id').value='user@gpay'">
                  <span style="font-size:1.5rem;">🟢</span>
                  <span>GPay</span>
                </button>
                <button type="button" class="upi-app-btn" onclick="document.getElementById('upi-id').value='user@phonepe'">
                  <span style="font-size:1.5rem;">🟣</span>
                  <span>PhonePe</span>
                </button>
                <button type="button" class="upi-app-btn" onclick="document.getElementById('upi-id').value='user@amazpay'">
                  <span style="font-size:1.5rem;">🟡</span>
                  <span>Amazon Pay</span>
                </button>
              </div>
            </div>
            <button type="submit" class="btn btn-primary btn-lg btn-full pay-btn" id="pay-btn">
              🔒 Pay via UPI
            </button>
          </form>
        `;
      case 'netbanking':
        return `
          <h3>Net Banking</h3>
          <form id="payment-form" onsubmit="PaymentPage.processPayment(event)">
            <div class="form-group">
              <label for="bank-select">Select Your Bank <span class="required">*</span></label>
              <select class="form-select" id="bank-select" required>
                <option value="">Choose a bank</option>
                <option value="sbi">State Bank of India</option>
                <option value="hdfc">HDFC Bank</option>
                <option value="icici">ICICI Bank</option>
                <option value="axis">Axis Bank</option>
                <option value="kotak">Kotak Mahindra Bank</option>
                <option value="pnb">Punjab National Bank</option>
                <option value="bob">Bank of Baroda</option>
                <option value="yes">Yes Bank</option>
                <option value="idbi">IDBI Bank</option>
                <option value="other">Other Bank</option>
              </select>
            </div>
            <div class="netbanking-note">
              <p>⚡ You will be redirected to your bank's secure payment page to complete the transaction.</p>
            </div>
            <button type="submit" class="btn btn-primary btn-lg btn-full pay-btn" id="pay-btn">
              🔒 Pay via Net Banking
            </button>
          </form>
        `;
      case 'wallet':
        return `
          <h3>Digital Wallet</h3>
          <form id="payment-form" onsubmit="PaymentPage.processPayment(event)">
            <div class="form-group">
              <label for="wallet-select">Select Wallet <span class="required">*</span></label>
              <select class="form-select" id="wallet-select" required>
                <option value="">Choose a wallet</option>
                <option value="paypal">PayPal</option>
                <option value="apple">Apple Pay</option>
                <option value="google">Google Pay</option>
                <option value="stripe">Stripe</option>
                <option value="razorpay">Razorpay</option>
              </select>
            </div>
            <div class="form-group">
              <label for="wallet-email">Wallet Email <span class="required">*</span></label>
              <input type="email" class="form-input" id="wallet-email" placeholder="your@email.com" required>
            </div>
            <button type="submit" class="btn btn-primary btn-lg btn-full pay-btn" id="pay-btn">
              🔒 Pay via Wallet
            </button>
          </form>
        `;
      default:
        return '';
    }
  },

  selectMethod(method) {
    this.selectedMethod = method;

    // Update active button
    document.querySelectorAll('.payment-method-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.method === method);
    });

    // Update form with animation
    const formSection = document.getElementById('payment-form-section');
    if (formSection) {
      formSection.style.opacity = '0';
      formSection.style.transform = 'translateY(10px)';
      setTimeout(() => {
        formSection.innerHTML = this.renderPaymentForm(method);
        requestAnimationFrame(() => {
          formSection.style.transition = 'all 0.3s ease';
          formSection.style.opacity = '1';
          formSection.style.transform = 'translateY(0)';
        });
      }, 200);
    }
  },

  formatCardNumber(input) {
    let value = input.value.replace(/\D/g, '');
    value = value.replace(/(.{4})/g, '$1  ').trim();
    input.value = value.substring(0, 23);

    // Highlight card brand
    const first = value.charAt(0);
    document.querySelectorAll('.card-brand').forEach(b => b.classList.remove('active'));
    if (first === '4') {
      document.getElementById('brand-visa')?.classList.add('active');
    } else if (first === '5') {
      document.getElementById('brand-mc')?.classList.add('active');
    } else if (first === '3') {
      document.getElementById('brand-amex')?.classList.add('active');
    }
  },

  formatExpiry(input) {
    let value = input.value.replace(/\D/g, '');
    if (value.length >= 2) {
      value = value.substring(0, 2) + ' / ' + value.substring(2, 4);
    }
    input.value = value;
  },

  async processPayment(e) {
    e.preventDefault();

    const btn = document.getElementById('pay-btn');
    const app = document.getElementById('app');

    btn.disabled = true;
    btn.innerHTML = '<div class="spinner" style="width:20px;height:20px;border-width:2px;display:inline-block;vertical-align:middle;margin-right:8px;"></div> Processing payment...';

    // Show processing overlay
    const overlay = document.createElement('div');
    overlay.className = 'payment-processing-overlay';
    overlay.innerHTML = `
      <div class="payment-processing-content">
        <div class="payment-processing-spinner"></div>
        <h2>Processing Your Payment</h2>
        <p>Please wait while we securely process your transaction...</p>
        <div class="processing-steps" id="processing-steps">
          <div class="processing-step active" id="step-1">
            <span class="step-icon">🔐</span> Encrypting payment data...
          </div>
          <div class="processing-step" id="step-2">
            <span class="step-icon">🏦</span> Contacting payment gateway...
          </div>
          <div class="processing-step" id="step-3">
            <span class="step-icon">✅</span> Confirming transaction...
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(overlay);

    // Simulate processing steps
    await new Promise(r => setTimeout(r, 1200));
    document.getElementById('step-1')?.classList.add('done');
    document.getElementById('step-2')?.classList.add('active');

    await new Promise(r => setTimeout(r, 1500));
    document.getElementById('step-2')?.classList.add('done');
    document.getElementById('step-3')?.classList.add('active');

    await new Promise(r => setTimeout(r, 1000));
    document.getElementById('step-3')?.classList.add('done');

    try {
      // Place the actual order
      const brief = this.briefData || {};
      const { data: order } = await API.placeOrder(brief);
      App.updateCartBadge();
      sessionStorage.removeItem('checkout_brief');

      await new Promise(r => setTimeout(r, 500));
      overlay.remove();
      App.navigate(`/confirmation/${order.id}`);
    } catch (err) {
      overlay.remove();
      App.showToast('Payment failed. Please try again.', 'error');
      btn.disabled = false;
      btn.innerHTML = '🔒 Pay Now';
    }
  }
};
