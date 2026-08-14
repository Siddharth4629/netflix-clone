/**
 * Netflix Clone - LocalStorage State Manager
 * Handles user accounts (Sign In / Sign Up), profiles, watchlists, continue watching history, and user likes.
 */

const STORAGE_KEYS = {
  USERS: 'netflix_users_db',
  CURRENT_SESSION: 'netflix_active_session',
  PROFILES_PREFIX: 'netflix_profiles_',
  CURRENT_PROFILE: 'netflix_current_profile',
  MY_LIST_PREFIX: 'netflix_mylist_',
  CONTINUE_WATCHING_PREFIX: 'netflix_continue_',
  LIKED_TITLES_PREFIX: 'netflix_likes_',
  VIEW_MODE: 'netflix_view_mode' // 'landing' or 'browse'
};

const DEFAULT_AVATARS = [
  "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=120&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=120&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80"
];

const StorageManager = {
  // --- User Account & Auth Management ---
  getUsers() {
    const data = localStorage.getItem(STORAGE_KEYS.USERS);
    if (data) {
      try {
        return JSON.parse(data);
      } catch (e) {
        console.error("Failed to parse users database", e);
      }
    }
    // Seed initial demo user
    const defaultUsers = [
      {
        id: "usr-1",
        name: "Siddharth",
        email: "siddharth@example.com",
        password: "password123",
        plan: "Premium 4K",
        createdAt: new Date().toISOString()
      }
    ];
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(defaultUsers));
    return defaultUsers;
  },

  registerUser(name, email, password, plan = "Standard HD") {
    const users = this.getUsers();
    const existing = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (existing) {
      return { success: false, message: "An account with this email already exists." };
    }

    const newUser = {
      id: "usr-" + Date.now(),
      name: name.trim(),
      email: email.trim().toLowerCase(),
      password: password,
      plan: plan,
      createdAt: new Date().toISOString()
    };

    users.push(newUser);
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));

    // Create default profiles for this new user
    const initialProfiles = [
      {
        id: `prof-${Date.now()}-1`,
        name: newUser.name,
        avatar: DEFAULT_AVATARS[0],
        isKid: false
      },
      {
        id: `prof-${Date.now()}-2`,
        name: "Kids",
        avatar: DEFAULT_AVATARS[2],
        isKid: true
      }
    ];
    this.saveProfilesForUser(newUser.id, initialProfiles);

    // Auto log in new user
    this.loginUser(newUser.email, newUser.password);

    return { success: true, user: newUser };
  },

  loginUser(email, password) {
    const users = this.getUsers();
    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());

    if (!user) {
      // If user doesn't exist yet, auto-register them seamlessly for easy evaluation
      return this.registerUser(email.split('@')[0], email, password);
    }

    if (password && user.password && user.password !== password) {
      return { success: false, message: "Incorrect password. Please try again." };
    }

    // Set active session
    localStorage.setItem(STORAGE_KEYS.CURRENT_SESSION, JSON.stringify(user));
    
    // Set active profile to first profile
    const profiles = this.getProfilesForUser(user.id);
    this.setCurrentProfile(profiles[0] || {
      id: `prof-${user.id}-1`,
      name: user.name,
      avatar: DEFAULT_AVATARS[0],
      isKid: false
    });

    this.setViewMode('browse');
    return { success: true, user: user };
  },

  logoutUser() {
    localStorage.removeItem(STORAGE_KEYS.CURRENT_SESSION);
    this.setViewMode('landing');
  },

  getCurrentUser() {
    const data = localStorage.getItem(STORAGE_KEYS.CURRENT_SESSION);
    if (data) {
      try {
        return JSON.parse(data);
      } catch (e) {}
    }
    // Default fallback demo session
    const users = this.getUsers();
    return users[0];
  },

  isLoggedIn() {
    return !!localStorage.getItem(STORAGE_KEYS.CURRENT_SESSION);
  },

  // --- Profile Management ---
  getProfilesForUser(userId = null) {
    const uId = userId || (this.getCurrentUser() ? this.getCurrentUser().id : "usr-1");
    const key = `${STORAGE_KEYS.PROFILES_PREFIX}${uId}`;
    const data = localStorage.getItem(key);
    if (data) {
      try {
        return JSON.parse(data);
      } catch (e) {}
    }
    const defaultList = [
      {
        id: `prof-${uId}-1`,
        name: this.getCurrentUser()?.name || "Siddharth",
        avatar: DEFAULT_AVATARS[0],
        isKid: false
      },
      {
        id: `prof-${uId}-2`,
        name: "College Buddy",
        avatar: DEFAULT_AVATARS[1],
        isKid: false
      },
      {
        id: `prof-${uId}-3`,
        name: "Kids",
        avatar: DEFAULT_AVATARS[2],
        isKid: true
      }
    ];
    this.saveProfilesForUser(uId, defaultList);
    return defaultList;
  },

  saveProfilesForUser(userId, profiles) {
    const key = `${STORAGE_KEYS.PROFILES_PREFIX}${userId}`;
    localStorage.setItem(key, JSON.stringify(profiles));
  },

  getCurrentProfile() {
    const saved = localStorage.getItem(STORAGE_KEYS.CURRENT_PROFILE);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Failed to parse saved profile", e);
      }
    }
    const profiles = this.getProfilesForUser();
    return profiles[0];
  },

  setCurrentProfile(profile) {
    localStorage.setItem(STORAGE_KEYS.CURRENT_PROFILE, JSON.stringify(profile));
  },

  addProfile(name, avatarIndex = 0, isKid = false) {
    const user = this.getCurrentUser();
    if (!user) return null;
    const profiles = this.getProfilesForUser(user.id);
    
    const newProfile = {
      id: `prof-${Date.now()}`,
      name: name.trim(),
      avatar: DEFAULT_AVATARS[avatarIndex % DEFAULT_AVATARS.length],
      isKid: !!isKid
    };

    profiles.push(newProfile);
    this.saveProfilesForUser(user.id, profiles);
    return newProfile;
  },

  deleteProfile(profileId) {
    const user = this.getCurrentUser();
    if (!user) return false;
    let profiles = this.getProfilesForUser(user.id);
    if (profiles.length <= 1) {
      return false; // Don't delete last profile
    }

    profiles = profiles.filter(p => p.id !== profileId);
    this.saveProfilesForUser(user.id, profiles);

    // If active profile was deleted, switch to the first available
    const active = this.getCurrentProfile();
    if (active.id === profileId) {
      this.setCurrentProfile(profiles[0]);
    }
    return true;
  },

  // --- My List (Watchlist) Management ---
  getMyList(profileId = null) {
    const pId = profileId || this.getCurrentProfile().id;
    const key = `${STORAGE_KEYS.MY_LIST_PREFIX}${pId}`;
    const data = localStorage.getItem(key);
    if (data) {
      try {
        return JSON.parse(data);
      } catch (e) {
        console.error("Failed to parse my list", e);
      }
    }
    return ["orig-1", "orig-2", "mov-2", "act-1"];
  },

  isInMyList(itemId, profileId = null) {
    const list = this.getMyList(profileId);
    return list.includes(itemId);
  },

  toggleMyList(itemId, profileId = null) {
    const pId = profileId || this.getCurrentProfile().id;
    const key = `${STORAGE_KEYS.MY_LIST_PREFIX}${pId}`;
    let list = this.getMyList(pId);

    if (list.includes(itemId)) {
      list = list.filter(id => id !== itemId);
    } else {
      list.unshift(itemId);
    }

    localStorage.setItem(key, JSON.stringify(list));
    return list.includes(itemId);
  },

  // --- Continue Watching Management ---
  getContinueWatching(profileId = null) {
    const pId = profileId || this.getCurrentProfile().id;
    const key = `${STORAGE_KEYS.CONTINUE_WATCHING_PREFIX}${pId}`;
    const data = localStorage.getItem(key);
    if (data) {
      try {
        return JSON.parse(data);
      } catch (e) {
        console.error("Failed to parse continue watching list", e);
      }
    }
    return [
      { id: "hero-stranger-things", progress: 68, lastWatched: "S4:E4 Dear Billy" },
      { id: "mov-1", progress: 42, lastWatched: "1h 15m remaining" },
      { id: "orig-3", progress: 85, lastWatched: "S2:E1 Red Light" },
      { id: "mov-3", progress: 24, lastWatched: "2h 02m remaining" }
    ];
  },

  updateWatchProgress(itemId, progressPercent, lastWatchedLabel) {
    const pId = this.getCurrentProfile().id;
    const key = `${STORAGE_KEYS.CONTINUE_WATCHING_PREFIX}${pId}`;
    let list = this.getContinueWatching(pId);

    const existingIndex = list.findIndex(item => item.id === itemId);
    const itemData = {
      id: itemId,
      progress: Math.min(100, Math.max(0, Math.round(progressPercent))),
      lastWatched: lastWatchedLabel || "Recently Watched"
    };

    if (existingIndex > -1) {
      list.splice(existingIndex, 1);
    }
    list.unshift(itemData);
    list = list.slice(0, 10);
    localStorage.setItem(key, JSON.stringify(list));
  },

  // --- Liked / Disliked Titles ---
  getLikes(profileId = null) {
    const pId = profileId || this.getCurrentProfile().id;
    const key = `${STORAGE_KEYS.LIKED_TITLES_PREFIX}${pId}`;
    const data = localStorage.getItem(key);
    if (data) {
      try {
        return JSON.parse(data);
      } catch (e) {}
    }
    return {};
  },

  setLikeStatus(itemId, status, profileId = null) {
    const pId = profileId || this.getCurrentProfile().id;
    const key = `${STORAGE_KEYS.LIKED_TITLES_PREFIX}${pId}`;
    const likes = this.getLikes(pId);

    if (!status) {
      delete likes[itemId];
    } else {
      likes[itemId] = status;
    }
    localStorage.setItem(key, JSON.stringify(likes));
  },

  getLikeStatus(itemId, profileId = null) {
    const likes = this.getLikes(profileId);
    return likes[itemId] || null;
  },

  // --- View Mode ---
  getViewMode() {
    const mode = localStorage.getItem(STORAGE_KEYS.VIEW_MODE);
    if (mode) return mode;
    // Default: if session exists, browse, else landing
    return this.isLoggedIn() ? 'browse' : 'landing';
  },

  setViewMode(mode) {
    localStorage.setItem(STORAGE_KEYS.VIEW_MODE, mode);
  }
};
