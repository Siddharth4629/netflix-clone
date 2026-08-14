/**
 * Netflix Clone - Navbar & Navigation Controller
 */

const NavbarController = {
  headerElement: null,
  searchInput: null,
  searchContainer: null,
  profileMenuContainer: null,

  init() {
    this.headerElement = document.getElementById('main-header');
    this.searchContainer = document.getElementById('nav-search-container');
    this.searchInput = document.getElementById('nav-search-input');
    this.profileMenuContainer = document.getElementById('profile-menu-container');

    this.bindScrollEffect();
    this.bindSearchEvents();
    this.bindProfileMenuEvents();
    this.bindNavLinks();
    this.renderCurrentProfile();
  },

  // Navbar transparent to black background on scroll
  bindScrollEffect() {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 40) {
        this.headerElement?.classList.add('scrolled');
      } else {
        this.headerElement?.classList.remove('scrolled');
      }
    });
  },

  // Expandable search bar
  bindSearchEvents() {
    const searchBtn = document.getElementById('nav-search-btn');
    const clearBtn = document.getElementById('nav-search-clear');

    searchBtn?.addEventListener('click', (e) => {
      e.stopPropagation();
      this.searchContainer?.classList.toggle('active');
      if (this.searchContainer?.classList.contains('active')) {
        this.searchInput?.focus();
      }
    });

    clearBtn?.addEventListener('click', (e) => {
      e.stopPropagation();
      if (this.searchInput) {
        this.searchInput.value = '';
        this.searchInput.focus();
        App.handleSearch('');
      }
    });

    this.searchInput?.addEventListener('input', (e) => {
      App.handleSearch(e.target.value.trim());
    });

    // Close search on click outside if empty
    document.addEventListener('click', (e) => {
      if (!this.searchContainer?.contains(e.target) && !this.searchInput?.value.trim()) {
        this.searchContainer?.classList.remove('active');
      }
    });
  },

  // Profile switcher & dropdown menu
  bindProfileMenuEvents() {
    const trigger = document.getElementById('profile-avatar-trigger');
    const dropdown = document.getElementById('profile-dropdown');

    // Toggle menu on click
    trigger?.addEventListener('click', (e) => {
      e.stopPropagation();
      this.profileMenuContainer?.classList.toggle('open');
      this.renderProfileList();
    });

    // Hover also ensures updated list
    this.profileMenuContainer?.addEventListener('mouseenter', () => {
      this.renderProfileList();
    });

    // Close profile dropdown on outside click
    document.addEventListener('click', (e) => {
      if (!this.profileMenuContainer?.contains(e.target)) {
        this.profileMenuContainer?.classList.remove('open');
      }
    });

    // Manage Profiles Button
    const manageProfilesBtn = document.getElementById('nav-manage-profiles-btn');
    manageProfilesBtn?.addEventListener('click', (e) => {
      e.preventDefault();
      this.profileMenuContainer?.classList.remove('open');
      App.openProfileManagerModal();
    });

    // Add Profile Button
    const addProfileBtn = document.getElementById('nav-add-profile-btn');
    addProfileBtn?.addEventListener('click', (e) => {
      e.preventDefault();
      this.profileMenuContainer?.classList.remove('open');
      App.openProfileManagerModal();
    });

    // Sign Out Button
    const signoutBtn = document.getElementById('nav-signout-btn');
    signoutBtn?.addEventListener('click', (e) => {
      e.preventDefault();
      this.profileMenuContainer?.classList.remove('open');
      StorageManager.logoutUser();
      App.switchToView('landing');
      App.showToast('You have signed out of Netflix.');
    });
  },

  renderProfileList() {
    const profileListEl = document.getElementById('navbar-profile-list');
    if (!profileListEl) return;

    const profiles = StorageManager.getProfilesForUser();
    const current = StorageManager.getCurrentProfile();

    profileListEl.innerHTML = '';
    profiles.forEach(profile => {
      const isCurrent = current && current.id === profile.id;
      const li = document.createElement('li');
      li.className = `profile-list-item ${isCurrent ? 'active' : ''}`;
      li.dataset.profileId = profile.id;

      li.innerHTML = `
        <div class="profile-item-left">
          <img src="${profile.avatar}" alt="${profile.name}" />
          <span class="profile-name">${profile.name} ${profile.isKid ? '(Kids)' : ''}</span>
        </div>
        ${isCurrent ? '<span class="profile-active-check">✓</span>' : ''}
      `;

      li.addEventListener('click', () => {
        StorageManager.setCurrentProfile(profile);
        this.renderCurrentProfile();
        this.profileMenuContainer?.classList.remove('open');
        App.showToast(`Switched profile to ${profile.name}`);
        // Re-render rows with profile's specific watchlist & continue watching
        RowsController.renderAllRows();
      });

      profileListEl.appendChild(li);
    });
  },

  renderCurrentProfile() {
    const current = StorageManager.getCurrentProfile();
    const avatarImg = document.getElementById('current-user-avatar');
    if (avatarImg && current) {
      avatarImg.src = current.avatar;
      avatarImg.alt = current.name;
    }
  },

  // Navigation menu category filters (Home, TV Shows, Movies, New & Popular, My List)
  bindNavLinks() {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');

        const category = link.dataset.category;
        App.handleCategoryNavigation(category);
      });
    });
  }
};
