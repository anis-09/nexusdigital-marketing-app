/**
 * Service Detail Page — Full details with tier comparison and add-to-cart
 */
const ServiceDetailPage = {
  async render(serviceId) {
    try {
      const { data: service } = await API.getService(serviceId);

      return `
        <div class="page-enter">
          <section class="service-detail">
            <div class="container">
              <a href="#/services" class="back-link" id="back-to-services">← Back to Services</a>
              
              <div class="service-detail-header">
                <div class="service-detail-icon" style="background: ${service.color}15;">
                  ${service.icon}
                </div>
                <h1>${service.name}</h1>
              </div>
              
              <p class="service-detail-desc">${service.description}</p>

              <div class="section-label">Choose Your Plan</div>
              <h2 class="section-title" style="font-size:1.5rem;">Select the tier that fits your goals</h2>

              <div class="tiers-grid">
                ${service.tiers.map(tier => this.renderTier(service, tier)).join('')}
              </div>
            </div>
          </section>
        </div>
      `;
    } catch (err) {
      return `
        <div class="page-enter">
          <div class="container" style="padding:80px 24px; text-align:center;">
            <h2>Service Not Found</h2>
            <p style="color:var(--text-secondary); margin: 16px 0 32px;">The service you're looking for doesn't exist.</p>
            <a href="#/services" class="btn btn-primary">Browse Services</a>
          </div>
        </div>
      `;
    }
  },

  renderTier(service, tier) {
    return `
      <div class="tier-card ${tier.popular ? 'popular' : ''}" id="tier-${tier.id}">
        ${tier.popular ? '<div class="tier-popular-badge">Most Popular</div>' : ''}
        <div class="tier-name">${tier.name}</div>
        <div class="tier-price">
          <span class="currency">$</span>${tier.price.toLocaleString()}
        </div>
        <div class="tier-period">per ${tier.period}</div>
        <div class="tier-timeline">⏱ ${tier.timeline}</div>
        
        <ul class="tier-features">
          ${tier.features.map(f => `<li>${f}</li>`).join('')}
        </ul>

        <div class="tier-deliverables">
          <h4>Deliverables</h4>
          <div class="tier-deliverables-list">
            ${tier.deliverables.map(d => `<span class="deliverable-tag">${d}</span>`).join('')}
          </div>
        </div>

        <button class="btn ${tier.popular ? 'btn-primary' : 'btn-secondary'} btn-full"
                onclick="ServiceDetailPage.addToCart('${service.id}', '${tier.id}')"
                id="add-${tier.id}">
          Add to Cart — $${tier.price.toLocaleString()}/${tier.period}
        </button>
      </div>
    `;
  },

  async addToCart(serviceId, tierId) {
    try {
      await API.addToCart(serviceId, tierId);
      App.showToast('Added to cart! 🛒', 'success');
      App.updateCartBadge();
    } catch (err) {
      App.showToast('Failed to add to cart', 'error');
    }
  }
};
