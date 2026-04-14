/**
 * Auth Page — Sign Up / Login with Google Sign-In
 */
const AuthPage = {
  mode: 'signup', // 'signup' or 'login'

  async render(initialMode) {
    this.mode = initialMode || 'signup';

    return `
      <div class="page-enter">
        <section class="auth-page">
          <div class="auth-container">
            <!-- Left Panel: Branding -->
            <div class="auth-branding">
              <div class="auth-branding-content">
                <div class="logo" style="margin-bottom:24px;">
                  <span class="logo-icon" style="font-size:2rem;">◆</span>
                  <span class="logo-text" style="font-size:1.6rem;">Nexus<span class="logo-accent">Digital</span></span>
                </div>
                <h2>Elevate Your Digital Presence</h2>
                <p>Join thousands of businesses growing with data-driven digital marketing strategies.</p>
                <div class="auth-features">
                  <div class="auth-feature">
                    <span class="auth-feature-icon">🚀</span>
                    <div>
                      <strong>Tailored Strategies</strong>
                      <p>Custom marketing plans built for your goals</p>
                    </div>
                  </div>
                  <div class="auth-feature">
                    <span class="auth-feature-icon">📊</span>
                    <div>
                      <strong>Real-Time Analytics</strong>
                      <p>Track performance with live dashboards</p>
                    </div>
                  </div>
                  <div class="auth-feature">
                    <span class="auth-feature-icon">🎯</span>
                    <div>
                      <strong>Proven Results</strong>
                      <p>3.2x average ROI across all campaigns</p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="auth-branding-glow"></div>
            </div>

            <!-- Right Panel: Form -->
            <div class="auth-form-panel">
              <div class="auth-form-wrapper" id="auth-form-wrapper">
                ${this.renderForm()}
              </div>
            </div>
          </div>
        </section>
      </div>
    `;
  },

  renderForm() {
    const isSignup = this.mode === 'signup';

    return `
      <div class="auth-form-header">
        <h1>${isSignup ? 'Create Your Account' : 'Welcome Back'}</h1>
        <p>${isSignup ? 'Start your digital marketing journey today' : 'Sign in to your NexusDigital account'}</p>
      </div>

      <!-- Google Sign-In Button -->
      <button class="google-signin-btn" onclick="AuthPage.googleSignIn()" id="google-signin-btn">
        <svg class="google-icon" viewBox="0 0 24 24" width="20" height="20">
          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/>
          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
        </svg>
        Continue with Google
      </button>

      <div class="auth-divider">
        <span>or</span>
      </div>

      <!-- Email/Password Form -->
      <form id="auth-form" onsubmit="AuthPage.handleSubmit(event)">
        ${isSignup ? `
          <div class="form-group">
            <label for="auth-name">Full Name <span class="required">*</span></label>
            <input type="text" class="form-input" id="auth-name" placeholder="John Doe" required>
          </div>
        ` : ''}
        <div class="form-group">
          <label for="auth-email">Email Address <span class="required">*</span></label>
          <input type="email" class="form-input" id="auth-email" placeholder="you@example.com" required>
        </div>
        <div class="form-group">
          <label for="auth-password">Password <span class="required">*</span></label>
          <div class="password-input-wrapper">
            <input type="password" class="form-input" id="auth-password" 
                   placeholder="${isSignup ? 'Min. 6 characters' : 'Enter your password'}" 
                   minlength="6" required>
            <button type="button" class="password-toggle" onclick="AuthPage.togglePassword()" id="password-toggle">
              👁
            </button>
          </div>
        </div>
        ${isSignup ? `
          <div class="form-group">
            <label for="auth-confirm-password">Confirm Password <span class="required">*</span></label>
            <input type="password" class="form-input" id="auth-confirm-password" placeholder="Re-enter password" minlength="6" required>
          </div>
        ` : ''}
        
        <div id="auth-error" class="auth-error" style="display:none;"></div>

        <button type="submit" class="btn btn-primary btn-lg btn-full" id="auth-submit-btn">
          ${isSignup ? 'Create Account' : 'Sign In'}
        </button>
      </form>

      <div class="auth-switch">
        ${isSignup
          ? `Already have an account? <a href="#" onclick="AuthPage.switchMode('login'); return false;" id="switch-to-login">Sign in</a>`
          : `Don't have an account? <a href="#" onclick="AuthPage.switchMode('signup'); return false;" id="switch-to-signup">Create one</a>`
        }
      </div>
    `;
  },

  switchMode(mode) {
    this.mode = mode;
    const wrapper = document.getElementById('auth-form-wrapper');
    if (wrapper) {
      wrapper.style.opacity = '0';
      wrapper.style.transform = 'translateY(10px)';
      setTimeout(() => {
        wrapper.innerHTML = this.renderForm();
        requestAnimationFrame(() => {
          wrapper.style.transition = 'all 0.3s ease';
          wrapper.style.opacity = '1';
          wrapper.style.transform = 'translateY(0)';
        });
      }, 200);
    }
  },

  togglePassword() {
    const input = document.getElementById('auth-password');
    const btn = document.getElementById('password-toggle');
    if (input.type === 'password') {
      input.type = 'text';
      btn.textContent = '🙈';
    } else {
      input.type = 'password';
      btn.textContent = '👁';
    }
  },

  showError(msg) {
    const el = document.getElementById('auth-error');
    if (el) {
      el.textContent = msg;
      el.style.display = 'block';
    }
  },

  async handleSubmit(e) {
    e.preventDefault();
    const btn = document.getElementById('auth-submit-btn');
    const errorEl = document.getElementById('auth-error');
    if (errorEl) errorEl.style.display = 'none';

    const email = document.getElementById('auth-email').value;
    const password = document.getElementById('auth-password').value;

    btn.disabled = true;
    btn.textContent = this.mode === 'signup' ? 'Creating account...' : 'Signing in...';

    try {
      if (this.mode === 'signup') {
        const name = document.getElementById('auth-name').value;
        const confirm = document.getElementById('auth-confirm-password').value;

        if (password !== confirm) {
          this.showError('Passwords do not match');
          btn.disabled = false;
          btn.textContent = 'Create Account';
          return;
        }

        const result = await API.register(name, email, password);
        localStorage.setItem('auth_token', result.data.token);
        localStorage.setItem('auth_user', JSON.stringify(result.data.user));
        App.showToast('Account created! Welcome! 🎉', 'success');
      } else {
        const result = await API.login(email, password);
        localStorage.setItem('auth_token', result.data.token);
        localStorage.setItem('auth_user', JSON.stringify(result.data.user));
        App.showToast('Welcome back! 👋', 'success');
      }

      App.updateAuthUI();
      App.navigate('/');
    } catch (err) {
      this.showError(err.message || 'Something went wrong. Please try again.');
      btn.disabled = false;
      btn.textContent = this.mode === 'signup' ? 'Create Account' : 'Sign In';
    }
  },

  async googleSignIn() {
    const btn = document.getElementById('google-signin-btn');
    btn.disabled = true;
    btn.innerHTML = '<div class="spinner" style="width:20px;height:20px;border-width:2px;"></div> Connecting...';

    // Simulate Google OAuth popup delay
    await new Promise(resolve => setTimeout(resolve, 1200));

    // Generate a simulated Google user
    const googleNames = ['Anis Akhtar', 'Alex Johnson', 'Sarah Chen', 'Marcus Williams', 'Priya Sharma'];
    const randomName = googleNames[Math.floor(Math.random() * googleNames.length)];
    const email = randomName.toLowerCase().replace(' ', '.') + '@gmail.com';

    try {
      const result = await API.googleSignIn(randomName, email);
      localStorage.setItem('auth_token', result.data.token);
      localStorage.setItem('auth_user', JSON.stringify(result.data.user));
      App.showToast(`Welcome, ${result.data.user.name}! 🎉`, 'success');
      App.updateAuthUI();
      App.navigate('/');
    } catch (err) {
      App.showToast('Google sign-in failed. Please try again.', 'error');
      btn.disabled = false;
      btn.innerHTML = `<svg class="google-icon" viewBox="0 0 24 24" width="20" height="20"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg> Continue with Google`;
    }
  }
};
