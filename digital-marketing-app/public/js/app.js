/**
 * App — Main application controller with hash-based routing
 */
const App = {
  init() {
    // Listen for hash changes
    window.addEventListener('hashchange', () => this.route());
    
    // Header scroll effect
    window.addEventListener('scroll', () => {
      const header = document.getElementById('main-header');
      if (header) {
        header.classList.toggle('scrolled', window.scrollY > 20);
      }
    });

    // Mobile menu
    const menuBtn = document.getElementById('mobile-menu-btn');
    const nav = document.getElementById('main-nav');
    if (menuBtn && nav) {
      menuBtn.addEventListener('click', () => {
        menuBtn.classList.toggle('active');
        nav.classList.toggle('open');
      });
      // Close mobile menu when nav link clicked
      nav.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
          menuBtn.classList.remove('active');
          nav.classList.remove('open');
        });
      });
    }

    // Close user dropdown when clicking outside
    document.addEventListener('click', (e) => {
      const dropdown = document.getElementById('user-dropdown');
      const btn = document.getElementById('user-avatar-btn');
      if (dropdown && btn && !btn.contains(e.target) && !dropdown.contains(e.target)) {
        dropdown.style.display = 'none';
      }
    });

    // Toast container
    if (!document.querySelector('.toast-container')) {
      const toastContainer = document.createElement('div');
      toastContainer.className = 'toast-container';
      document.body.appendChild(toastContainer);
    }

    // Initial route & UI
    this.updateAuthUI();
    this.route();
    this.updateCartBadge();
  },

  async route() {
    const hash = window.location.hash || '#/';
    const app = document.getElementById('app');
    
    // Show loading
    app.innerHTML = '<div class="loading"><div class="spinner"></div></div>';

    // Update active nav link
    document.querySelectorAll('.nav-link').forEach(link => {
      const page = link.dataset.page;
      if (page === 'home' && (hash === '#/' || hash === '#')) {
        link.classList.add('active');
      } else if (page === 'services' && hash.startsWith('#/service')) {
        link.classList.add('active');
      } else if (page === 'cart' && (hash.startsWith('#/cart') || hash.startsWith('#/checkout') || hash.startsWith('#/payment'))) {
        link.classList.add('active');
      } else if (page === 'auth' && (hash.startsWith('#/signup') || hash.startsWith('#/login'))) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });

    try {
      let html = '';

      if (hash === '#/' || hash === '#' || hash === '') {
        html = await HomePage.render();
      } else if (hash === '#/services') {
        html = await ServicesPage.render();
      } else if (hash.startsWith('#/service/')) {
        const id = hash.replace('#/service/', '');
        html = await ServiceDetailPage.render(id);
      } else if (hash === '#/cart') {
        html = await CartPage.render();
      } else if (hash === '#/checkout') {
        html = await CheckoutPage.render();
      } else if (hash === '#/payment') {
        html = await PaymentPage.render();
      } else if (hash.startsWith('#/confirmation/')) {
        const orderId = hash.replace('#/confirmation/', '');
        html = await ConfirmationPage.render(orderId);
      } else if (hash === '#/signup') {
        html = await AuthPage.render('signup');
      } else if (hash === '#/login') {
        html = await AuthPage.render('login');
      } else {
        html = `
          <div class="page-enter">
            <div class="container" style="padding:80px 24px; text-align:center;">
              <h2>Page Not Found</h2>
              <p style="color:var(--text-secondary); margin:16px 0 32px;">The page you're looking for doesn't exist.</p>
              <a href="#/" class="btn btn-primary">Go Home</a>
            </div>
          </div>
        `;
      }

      app.innerHTML = html;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      console.error('Routing error:', err);
      app.innerHTML = `
        <div class="container" style="padding:80px 24px; text-align:center;">
          <h2>Something went wrong</h2>
          <p style="color:var(--text-secondary); margin:16px 0 32px;">Please try again.</p>
          <a href="#/" class="btn btn-primary">Go Home</a>
        </div>
      `;
    }
  },

  navigate(path) {
    window.location.hash = path;
  },

  // ---- Auth UI Management ----
  isLoggedIn() {
    return !!localStorage.getItem('auth_token');
  },

  getUser() {
    try {
      return JSON.parse(localStorage.getItem('auth_user') || 'null');
    } catch {
      return null;
    }
  },

  updateAuthUI() {
    const authBtn = document.getElementById('nav-auth-btn');
    const profileNav = document.getElementById('user-profile-nav');
    const user = this.getUser();

    if (user && this.isLoggedIn()) {
      // Show user profile, hide sign-up
      if (authBtn) authBtn.style.display = 'none';
      if (profileNav) {
        profileNav.style.display = 'flex';
        const initial = document.getElementById('user-avatar-initial');
        const nameEl = document.getElementById('user-dropdown-name');
        const emailEl = document.getElementById('user-dropdown-email');
        if (initial) initial.textContent = user.name.charAt(0).toUpperCase();
        if (nameEl) nameEl.textContent = user.name;
        if (emailEl) emailEl.textContent = user.email;
      }
    } else {
      // Show sign-up, hide profile
      if (authBtn) authBtn.style.display = '';
      if (profileNav) profileNav.style.display = 'none';
    }
  },

  toggleUserMenu() {
    const dropdown = document.getElementById('user-dropdown');
    if (dropdown) {
      dropdown.style.display = dropdown.style.display === 'none' ? 'block' : 'none';
    }
  },

  async logout() {
    try {
      await API.logout();
    } catch (_) {}
    localStorage.removeItem('auth_token');
    localStorage.removeItem('auth_user');
    this.updateAuthUI();
    const dropdown = document.getElementById('user-dropdown');
    if (dropdown) dropdown.style.display = 'none';
    this.showToast('Signed out successfully', 'success');
    this.navigate('/');
  },

  // ---- Cart Badge ----
  async updateCartBadge() {
    try {
      const { data: cart } = await API.getCart();
      const badge = document.getElementById('cart-badge');
      if (badge) {
        if (cart.itemCount > 0) {
          badge.textContent = cart.itemCount;
          badge.style.display = 'flex';
        } else {
          badge.style.display = 'none';
        }
      }
    } catch (err) {
      // Silently fail
    }
  },

  // ---- Toast Notifications ----
  showToast(message, type = 'success') {
    const container = document.querySelector('.toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
      <span class="toast-icon">${type === 'success' ? '✅' : '❌'}</span>
      <span class="toast-message">${message}</span>
    `;
    container.appendChild(toast);

    setTimeout(() => {
      toast.classList.add('toast-out');
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }
};

// Initialize the app when DOM is ready
document.addEventListener('DOMContentLoaded', () => App.init());
