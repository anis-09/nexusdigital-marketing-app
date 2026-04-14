/**
 * Home Page — Hero, featured services, benefits, CTA
 */
const HomePage = {
  async render() {
    const { data: services } = await API.getServices();

    return `
      <div class="page-enter">
        <!-- Hero Section -->
        <section class="hero">
          <div class="container hero-content">
            <div class="hero-badge">
              <span class="hero-badge-dot"></span>
              Digital Marketing Excellence
            </div>
            <h1 class="hero-title">
              Grow Your Brand With<br>
              <span class="gradient-text">Strategic Digital Marketing</span>
            </h1>
            <p class="hero-subtitle">
              We combine data-driven insights with creative excellence to deliver marketing campaigns that drive real business growth. From SEO to social media, we've got you covered.
            </p>
            <div class="hero-actions">
              <a href="#/services" class="btn btn-primary btn-lg" id="hero-cta-explore">
                Explore Services →
              </a>
              <a href="#/services" class="btn btn-secondary btn-lg" id="hero-cta-pricing">
                View Pricing
              </a>
            </div>
            <div class="hero-stats">
              <div class="stat-item">
                <div class="stat-number">500+</div>
                <div class="stat-label">Projects Delivered</div>
              </div>
              <div class="stat-item">
                <div class="stat-number">98%</div>
                <div class="stat-label">Client Satisfaction</div>
              </div>
              <div class="stat-item">
                <div class="stat-number">3.2x</div>
                <div class="stat-label">Average ROI</div>
              </div>
              <div class="stat-item">
                <div class="stat-number">24/7</div>
                <div class="stat-label">Dedicated Support</div>
              </div>
            </div>
          </div>
        </section>

        <!-- Featured Services -->
        <section class="section">
          <div class="container">
            <div class="section-header">
              <div class="section-label">Our Services</div>
              <h2 class="section-title">Everything You Need to Dominate Digital</h2>
              <p class="section-subtitle">
                Choose from our comprehensive suite of digital marketing services designed to accelerate your growth.
              </p>
            </div>
            <div class="services-grid">
              ${services.map(service => this.renderServiceCard(service)).join('')}
            </div>
          </div>
        </section>

        <!-- Benefits -->
        <section class="section">
          <div class="container">
            <div class="section-header">
              <div class="section-label">Why Choose Us</div>
              <h2 class="section-title">Built for Results</h2>
              <p class="section-subtitle">
                We don't just run campaigns — we build growth engines for your business.
              </p>
            </div>
            <div class="benefits-grid">
              <div class="benefit-card">
                <div class="benefit-icon">📊</div>
                <h4>Data-Driven</h4>
                <p>Every decision backed by analytics and real-time data insights for maximum impact.</p>
              </div>
              <div class="benefit-card">
                <div class="benefit-icon">🎯</div>
                <h4>Targeted Strategies</h4>
                <p>Custom approaches tailored to your specific industry, audience, and business goals.</p>
              </div>
              <div class="benefit-card">
                <div class="benefit-icon">⚡</div>
                <h4>Fast Execution</h4>
                <p>Quick turnaround times without compromising quality. Get results from day one.</p>
              </div>
              <div class="benefit-card">
                <div class="benefit-icon">🔄</div>
                <h4>Continuous Optimization</h4>
                <p>Ongoing testing, learning, and refinement to keep improving your results over time.</p>
              </div>
            </div>
          </div>
        </section>

        <!-- CTA -->
        <section class="cta-section">
          <div class="container">
            <div class="cta-box">
              <h2>Ready to Elevate Your Digital Presence?</h2>
              <p>Browse our services, customize your package, and let's start growing your business together.</p>
              <a href="#/services" class="btn btn-primary btn-lg" id="cta-browse">Browse All Services →</a>
            </div>
          </div>
        </section>
      </div>
    `;
  },

  renderServiceCard(service) {
    return `
      <div class="service-card" onclick="App.navigate('/service/${service.id}')" 
           style="--card-accent: ${service.color}; --icon-bg: ${service.color}22;"
           id="service-card-${service.id}">
        <div class="service-card-icon" style="background: ${service.color}15;">
          ${service.icon}
        </div>
        <h3>${service.name}</h3>
        <p>${service.shortDescription}</p>
        <div class="service-card-features">
          ${service.features.slice(0, 3).map(f => `<span class="feature-tag">${f}</span>`).join('')}
        </div>
        <div class="service-card-footer">
          <div class="service-price">
            Starting at <strong>$${service.startingPrice}</strong>
          </div>
          <div class="service-card-arrow">→</div>
        </div>
      </div>
    `;
  }
};
