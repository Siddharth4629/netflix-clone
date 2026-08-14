/**
 * Netflix Clone - Main Application Orchestrator
 */

const App = {
  currentView: 'browse', // 'browse' or 'landing'
  selectedAvatarIndex: 0,
  selectedPlan: 'Premium 4K',

  init() {
    console.log("Initializing Netflix Clone App...");

    // Initialize Submodules
    NavbarController.init();
    BannerController.init();
    RowsController.init();
    ModalController.init();
    PlayerController.init();

    // Landing Page Setup
    this.bindLandingEvents();
    this.renderFAQs();

    // Auth & Profile Modals
    this.bindAuthModal();
    this.bindProfileManagerModal();

    // Initial View Mode check
    const savedMode = StorageManager.getViewMode();
    this.switchToView(savedMode);
  },

  switchToView(viewName) {
    this.currentView = viewName;
    StorageManager.setViewMode(viewName);

    const landingSection = document.getElementById('landing-view');
    const browseSection = document.getElementById('browse-view');
    const mainHeader = document.getElementById('main-header');

    if (viewName === 'landing') {
      landingSection?.classList.add('active');
      browseSection?.classList.remove('active');
      if (mainHeader) mainHeader.style.display = 'none';
      window.scrollTo(0, 0);
    } else {
      landingSection?.classList.remove('active');
      browseSection?.classList.add('active');
      if (mainHeader) mainHeader.style.display = 'flex';
      window.scrollTo(0, 0);
      NavbarController.renderCurrentProfile();
      RowsController.renderAllRows();
    }
  },

  bindLandingEvents() {
    // Landing sign-in button
    const landingSignInBtn = document.getElementById('landing-signin-btn');
    landingSignInBtn?.addEventListener('click', (e) => {
      e.preventDefault();
      this.openAuthModal('signin');
    });

    // Landing CTA email forms (Get Started buttons)
    const ctaForms = document.querySelectorAll('.cta-form');
    ctaForms.forEach(form => {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const input = form.querySelector('.cta-input');
        const email = input?.value.trim() || '';
        this.openAuthModal('signup', email);
      });
    });

    // Logo click in landing returns to top
    const landingLogo = document.getElementById('landing-brand-logo');
    landingLogo?.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  },

  renderFAQs() {
    const faqListContainer = document.getElementById('faq-list');
    if (!faqListContainer) return;

    faqListContainer.innerHTML = '';
    NETFLIX_DATA.faqs.forEach(faq => {
      const item = document.createElement('div');
      item.className = 'faq-item';
      item.innerHTML = `
        <button class="faq-question">
          <span>${faq.question}</span>
          <span class="faq-icon">+</span>
        </button>
        <div class="faq-answer">
          <p>${faq.answer}</p>
        </div>
      `;

      const questionBtn = item.querySelector('.faq-question');
      questionBtn.addEventListener('click', () => {
        const isOpen = item.classList.contains('open');
        // Close others
        document.querySelectorAll('.faq-item').forEach(el => el.classList.remove('open'));
        if (!isOpen) {
          item.classList.add('open');
        }
      });

      faqListContainer.appendChild(item);
    });
  },

  // Real-time Instant Search
  handleSearch(query) {
    const searchView = document.getElementById('search-view-container');
    const heroBanner = document.getElementById('hero-billboard');
    const contentRows = document.getElementById('content-rows-container');

    if (!query) {
      if (searchView) searchView.style.display = 'none';
      if (heroBanner) heroBanner.style.display = 'flex';
      if (contentRows) contentRows.style.display = 'flex';
      return;
    }

    // Hide hero & default rows, show search results grid
    if (heroBanner) heroBanner.style.display = 'none';
    if (contentRows) contentRows.style.display = 'none';
    if (searchView) searchView.style.display = 'block';

    const q = query.toLowerCase();
    const results = NETFLIX_DATA.catalog.filter(m => 
      m.title.toLowerCase().includes(q) ||
      m.genres.some(g => g.toLowerCase().includes(q)) ||
      (m.cast && m.cast.some(c => c.toLowerCase().includes(q))) ||
      (m.creator && m.creator.toLowerCase().includes(q))
    );

    this.renderSearchResults(results, query);
  },

  renderSearchResults(results, query) {
    const titleEl = document.getElementById('search-results-query-title');
    const gridEl = document.getElementById('search-results-grid');
    if (!gridEl) return;

    if (titleEl) {
      titleEl.textContent = `Search results for "${query}" (${results.length} titles)`;
    }

    gridEl.innerHTML = '';
    if (results.length === 0) {
      gridEl.innerHTML = `
        <div class="search-no-results" style="grid-column: 1 / -1;">
          <h3>No matches found for "${query}"</h3>
          <p>Suggestions: Try different keywords, actors, directors, or genre names.</p>
        </div>
      `;
      return;
    }

    results.forEach(item => {
      const card = RowsController.createMovieCard(item, false);
      gridEl.appendChild(card);
    });
  },

  // Category navigation (TV Shows, Movies, New & Popular, My List)
  handleCategoryNavigation(category) {
    const searchView = document.getElementById('search-view-container');
    const heroBanner = document.getElementById('hero-billboard');
    const contentRows = document.getElementById('content-rows-container');

    if (category === 'home') {
      if (searchView) searchView.style.display = 'none';
      if (heroBanner) heroBanner.style.display = 'flex';
      if (contentRows) contentRows.style.display = 'flex';
      RowsController.renderAllRows();
      return;
    }

    let filtered = [];
    let title = '';

    if (category === 'tv') {
      filtered = NETFLIX_DATA.catalog.filter(m => m.type === 'tv');
      title = 'TV Shows';
    } else if (category === 'movies') {
      filtered = NETFLIX_DATA.catalog.filter(m => m.type === 'movies' || m.type === 'movie');
      title = 'Movies';
    } else if (category === 'popular') {
      filtered = NETFLIX_DATA.catalog.filter(m => m.categories.includes('trending') || m.categories.includes('top10'));
      title = 'New & Popular';
    } else if (category === 'mylist') {
      const ids = StorageManager.getMyList();
      filtered = ids.map(id => getItemById(id)).filter(Boolean);
      title = 'My List';
    }

    if (heroBanner) heroBanner.style.display = 'none';
    if (contentRows) contentRows.style.display = 'none';
    if (searchView) searchView.style.display = 'block';

    const titleEl = document.getElementById('search-results-query-title');
    if (titleEl) titleEl.textContent = `${title} (${filtered.length} titles)`;

    const gridEl = document.getElementById('search-results-grid');
    if (!gridEl) return;

    gridEl.innerHTML = '';
    if (filtered.length === 0) {
      gridEl.innerHTML = `
        <div class="search-no-results" style="grid-column: 1 / -1;">
          <h3>Your ${title} is empty</h3>
          <p>Explore titles on the Home screen and click "+" to add them to your watchlist.</p>
        </div>
      `;
      return;
    }

    filtered.forEach(item => {
      const card = RowsController.createMovieCard(item, false);
      gridEl.appendChild(card);
    });
  },

  // =========================================================================
  // AUTH MODAL (SIGN IN & SIGN UP / NEW ACCOUNT)
  // =========================================================================
  bindAuthModal() {
    const authModalOverlay = document.getElementById('auth-modal-overlay');
    const authCloseBtn = document.getElementById('auth-modal-close');
    const tabSignInBtn = document.getElementById('tab-btn-signin');
    const tabSignUpBtn = document.getElementById('tab-btn-signup');
    const panelSignIn = document.getElementById('panel-signin');
    const panelSignUp = document.getElementById('panel-signup');

    const formSignIn = document.getElementById('auth-login-form');
    const formSignUp = document.getElementById('auth-register-form');
    const demoFillBtn = document.getElementById('btn-demo-signin');

    // Close button
    authCloseBtn?.addEventListener('click', () => {
      authModalOverlay?.classList.remove('active');
    });

    authModalOverlay?.addEventListener('click', (e) => {
      if (e.target === authModalOverlay) {
        authModalOverlay.classList.remove('active');
      }
    });

    // Tab switching
    const switchTab = (tab) => {
      if (tab === 'signin') {
        tabSignInBtn?.classList.add('active');
        tabSignUpBtn?.classList.remove('active');
        panelSignIn?.classList.add('active');
        panelSignUp?.classList.remove('active');
      } else {
        tabSignUpBtn?.classList.add('active');
        tabSignInBtn?.classList.remove('active');
        panelSignUp?.classList.add('active');
        panelSignIn?.classList.remove('active');
      }
    };

    tabSignInBtn?.addEventListener('click', () => switchTab('signin'));
    tabSignUpBtn?.addEventListener('click', () => switchTab('signup'));

    // Switch links inside forms
    document.getElementById('switch-to-signup')?.addEventListener('click', (e) => {
      e.preventDefault();
      switchTab('signup');
    });
    document.getElementById('switch-to-signin')?.addEventListener('click', (e) => {
      e.preventDefault();
      switchTab('signin');
    });

    // Demo Fill button
    demoFillBtn?.addEventListener('click', () => {
      const emailInput = document.getElementById('auth-email-input');
      const passInput = document.getElementById('auth-password-input');
      if (emailInput) emailInput.value = 'siddharth@example.com';
      if (passInput) passInput.value = 'password123';
      this.showToast('Demo credentials filled!');
    });

    // Plan Selection Pills
    const planPills = document.querySelectorAll('.plan-pill');
    planPills.forEach(pill => {
      pill.addEventListener('click', () => {
        planPills.forEach(p => p.classList.remove('selected'));
        pill.classList.add('selected');
        this.selectedPlan = pill.dataset.plan || 'Standard HD';
      });
    });

    // Handle Sign In Submit
    formSignIn?.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('auth-email-input')?.value.trim();
      const password = document.getElementById('auth-password-input')?.value;

      const result = StorageManager.loginUser(email, password);
      if (result.success) {
        this.showToast(`Welcome back, ${result.user.name}!`);
        authModalOverlay?.classList.remove('active');
        this.switchToView('browse');
      } else {
        this.showToast(result.message || 'Login failed. Please check your details.');
      }
    });

    // Handle Sign Up Submit (Create New Account)
    formSignUp?.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('signup-name-input')?.value.trim();
      const email = document.getElementById('signup-email-input')?.value.trim();
      const password = document.getElementById('signup-password-input')?.value;

      if (!name || !email || !password) {
        this.showToast('Please fill out all fields.');
        return;
      }

      const result = StorageManager.registerUser(name, email, password, this.selectedPlan);
      if (result.success) {
        this.showToast(`Account created for ${result.user.name}! Starting your ${this.selectedPlan} plan...`);
        authModalOverlay?.classList.remove('active');
        this.switchToView('browse');
      } else {
        this.showToast(result.message || 'Could not create account.');
      }
    });
  },

  openAuthModal(initialTab = 'signin', prefillEmail = '') {
    const authModalOverlay = document.getElementById('auth-modal-overlay');
    const tabSignInBtn = document.getElementById('tab-btn-signin');
    const tabSignUpBtn = document.getElementById('tab-btn-signup');
    const panelSignIn = document.getElementById('panel-signin');
    const panelSignUp = document.getElementById('panel-signup');

    if (initialTab === 'signup') {
      tabSignUpBtn?.classList.add('active');
      tabSignInBtn?.classList.remove('active');
      panelSignUp?.classList.add('active');
      panelSignIn?.classList.remove('active');
      if (prefillEmail) {
        const signupEmail = document.getElementById('signup-email-input');
        if (signupEmail) signupEmail.value = prefillEmail;
      }
    } else {
      tabSignInBtn?.classList.add('active');
      tabSignUpBtn?.classList.remove('active');
      panelSignIn?.classList.add('active');
      panelSignUp?.classList.remove('active');
      if (prefillEmail) {
        const signinEmail = document.getElementById('auth-email-input');
        if (signinEmail) signinEmail.value = prefillEmail;
      }
    }

    authModalOverlay?.classList.add('active');
  },

  // =========================================================================
  // PROFILE MANAGER & ADD PROFILE MODAL
  // =========================================================================
  bindProfileManagerModal() {
    const modalOverlay = document.getElementById('profile-manager-modal-overlay');
    const closeBtn = document.getElementById('profile-manager-close');
    const addProfileForm = document.getElementById('add-profile-form');

    closeBtn?.addEventListener('click', () => {
      modalOverlay?.classList.remove('active');
    });

    modalOverlay?.addEventListener('click', (e) => {
      if (e.target === modalOverlay) {
        modalOverlay.classList.remove('active');
      }
    });

    // Avatar Selection
    const avatarOpts = document.querySelectorAll('.avatar-opt');
    avatarOpts.forEach((opt, idx) => {
      opt.addEventListener('click', () => {
        avatarOpts.forEach(o => o.classList.remove('selected'));
        opt.classList.add('selected');
        this.selectedAvatarIndex = idx;
      });
    });

    // Add Profile Form Submit
    addProfileForm?.addEventListener('submit', (e) => {
      e.preventDefault();
      const nameInput = document.getElementById('new-profile-name-input');
      const kidsCheckbox = document.getElementById('new-profile-kids-checkbox');
      const name = nameInput?.value.trim();

      if (!name) {
        this.showToast('Please enter a profile name.');
        return;
      }

      const newProf = StorageManager.addProfile(name, this.selectedAvatarIndex, kidsCheckbox?.checked);
      if (newProf) {
        this.showToast(`Profile "${newProf.name}" created!`);
        if (nameInput) nameInput.value = '';
        if (kidsCheckbox) kidsCheckbox.checked = false;
        this.renderProfileManagerList();
        NavbarController.renderProfileList();
      }
    });
  },

  openProfileManagerModal() {
    const modalOverlay = document.getElementById('profile-manager-modal-overlay');
    this.renderProfileManagerList();
    modalOverlay?.classList.add('active');
  },

  renderProfileManagerList() {
    const listContainer = document.getElementById('profiles-manage-grid');
    if (!listContainer) return;

    const profiles = StorageManager.getProfilesForUser();
    listContainer.innerHTML = '';

    profiles.forEach(profile => {
      const card = document.createElement('div');
      card.className = 'profile-card-edit';
      card.innerHTML = `
        <img src="${profile.avatar}" alt="${profile.name}" />
        <span>${profile.name} ${profile.isKid ? '(Kids)' : ''}</span>
        ${profiles.length > 1 ? `<button class="profile-delete-btn" title="Delete Profile" data-id="${profile.id}">✕</button>` : ''}
      `;

      const delBtn = card.querySelector('.profile-delete-btn');
      delBtn?.addEventListener('click', (e) => {
        e.stopPropagation();
        if (confirm(`Are you sure you want to delete profile "${profile.name}"?`)) {
          StorageManager.deleteProfile(profile.id);
          this.showToast(`Deleted profile "${profile.name}"`);
          this.renderProfileManagerList();
          NavbarController.renderProfileList();
          NavbarController.renderCurrentProfile();
          RowsController.renderAllRows();
        }
      });

      listContainer.appendChild(card);
    });
  },

  // Toast Notification
  showToast(message) {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#E50914" stroke-width="2.5"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
      <span>${message}</span>
    `;

    container.appendChild(toast);
    setTimeout(() => {
      toast.remove();
    }, 3800);
  }
};

// Bootstrap application on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  App.init();
});
