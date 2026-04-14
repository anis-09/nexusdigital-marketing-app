/**
 * Services Listing Page — Filterable grid of all services
 */
const ServicesPage = {
  currentFilter: 'all',

  async render() {
    const { data: services } = await API.getServices();

    const categories = [
      { id: 'all', label: 'All Services' },
      { id: 'search', label: 'Search' },
      { id: 'social', label: 'Social' },
      { id: 'content', label: 'Content' },
      { id: 'email', label: 'Email' },
      { id: 'advertising', label: 'Advertising' },
      { id: 'branding', label: 'Branding' }
    ];

    return `
      <div class="page-enter">
        <div class="page-header">
          <div class="container">
            <div class="section-label">Our Services</div>
            <h1 class="section-title">Digital Marketing Services</h1>
            <p class="section-subtitle" style="margin:0 auto;">
              Explore our full range of marketing solutions. Each service is available in multiple tiers to match your needs and budget.
            </p>
            <div class="filter-bar" id="filter-bar">
              ${categories.map(cat => `
                <button class="filter-btn ${cat.id === this.currentFilter ? 'active' : ''}" 
                        data-filter="${cat.id}"
                        onclick="ServicesPage.filter('${cat.id}')"
                        id="filter-${cat.id}">
                  ${cat.label}
                </button>
              `).join('')}
            </div>
          </div>
        </div>
        <section class="services-listing">
          <div class="container">
            <div class="services-grid" id="services-grid">
              ${services.map(service => this.renderCard(service)).join('')}
            </div>
          </div>
        </section>
      </div>
    `;
  },

  renderCard(service) {
    return `
      <div class="service-card" onclick="App.navigate('/service/${service.id}')"
           style="--card-accent: ${service.color}; --icon-bg: ${service.color}22;"
           data-category="${service.category}"
           id="listing-card-${service.id}">
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
            From <strong>$${service.startingPrice}</strong>
          </div>
          <div class="service-card-arrow">→</div>
        </div>
      </div>
    `;
  },

  async filter(category) {
    this.currentFilter = category;

    // Update active filter button
    document.querySelectorAll('.filter-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.filter === category);
    });

    // Fetch filtered services
    const { data: services } = await API.getServices(category);
    const grid = document.getElementById('services-grid');
    if (grid) {
      grid.innerHTML = services.map(s => this.renderCard(s)).join('');
      // Add animation
      grid.style.opacity = '0';
      grid.style.transform = 'translateY(10px)';
      requestAnimationFrame(() => {
        grid.style.transition = 'all 0.3s ease';
        grid.style.opacity = '1';
        grid.style.transform = 'translateY(0)';
      });
    }
  }
};
