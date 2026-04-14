/**
 * Order Confirmation Page — Success message with order details
 */
const ConfirmationPage = {
  async render(orderId) {
    try {
      const { data: order } = await API.getOrder(orderId);

      return `
        <div class="page-enter">
          <section class="confirmation-page">
            <div class="container">
              <div class="confirmation-icon">✓</div>
              <h1>Order Confirmed!</h1>
              <p class="order-id">Order ${order.id}</p>
              <p class="confirmation-msg">
                Thank you for your order! Our team will review your project brief and reach out within 24 hours to get started.
              </p>

              <div class="confirmation-details">
                <h3>📦 Order Details</h3>
                <div class="confirmation-items">
                  ${order.items.map(item => `
                    <div class="confirmation-item">
                      <div>
                        <div style="font-weight:600;">${item.serviceIcon} ${item.serviceName}</div>
                        <div style="font-size:0.8rem; color:var(--accent-purple-light);">${item.tierName} Plan</div>
                      </div>
                      <div style="font-weight:600;">$${item.price.toLocaleString()}/${item.period}</div>
                    </div>
                  `).join('')}
                </div>
                <div class="confirmation-total">
                  <span>Total</span>
                  <span>$${order.total.toLocaleString()}</span>
                </div>
              </div>

              ${order.brief.companyName ? `
                <div class="confirmation-details">
                  <h3>📋 Project Brief</h3>
                  <div style="display:grid; gap:12px; font-size:0.9rem;">
                    ${order.brief.companyName ? `<div><strong style="color:var(--text-muted);">Company:</strong> ${order.brief.companyName}</div>` : ''}
                    ${order.brief.website ? `<div><strong style="color:var(--text-muted);">Website:</strong> ${order.brief.website}</div>` : ''}
                    ${order.brief.industry ? `<div><strong style="color:var(--text-muted);">Industry:</strong> ${order.brief.industry}</div>` : ''}
                    ${order.brief.goals ? `<div><strong style="color:var(--text-muted);">Goals:</strong> ${order.brief.goals}</div>` : ''}
                    ${order.brief.targetAudience ? `<div><strong style="color:var(--text-muted);">Target Audience:</strong> ${order.brief.targetAudience}</div>` : ''}
                    ${order.brief.timeline ? `<div><strong style="color:var(--text-muted);">Timeline:</strong> ${order.brief.timeline}</div>` : ''}
                  </div>
                </div>
              ` : ''}

              <div class="confirmation-actions">
                <a href="#/" class="btn btn-primary" id="conf-go-home">Back to Home</a>
                <a href="#/services" class="btn btn-secondary" id="conf-browse-more">Browse More Services</a>
              </div>
            </div>
          </section>
        </div>
      `;
    } catch (err) {
      return `
        <div class="page-enter">
          <div class="container" style="padding:80px 24px; text-align:center;">
            <h2>Order Not Found</h2>
            <p style="color:var(--text-secondary); margin:16px 0 32px;">We couldn't find this order.</p>
            <a href="#/" class="btn btn-primary">Go Home</a>
          </div>
        </div>
      `;
    }
  }
};
