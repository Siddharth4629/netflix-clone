/**
 * Netflix Clone - Title Details Modal Controller
 */

const ModalController = {
  activeItem: null,
  modalOverlay: null,
  modalVideo: null,
  isMuted: true,

  init() {
    this.modalOverlay = document.getElementById('details-modal-overlay');
    this.modalVideo = document.getElementById('modal-hero-video');
    this.bindEvents();
  },

  bindEvents() {
    const closeBtn = document.getElementById('modal-close-btn');
    closeBtn?.addEventListener('click', () => this.closeModal());

    // Close on backdrop click
    this.modalOverlay?.addEventListener('click', (e) => {
      if (e.target === this.modalOverlay) {
        this.closeModal();
      }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.modalOverlay?.classList.contains('active')) {
        this.closeModal();
      }
    });
  },

  openModal(itemId) {
    const item = getItemById(itemId);
    if (!item) return;

    this.activeItem = item;
    this.renderModalContent(item);

    this.modalOverlay?.classList.add('active');
    document.body.style.overflow = 'hidden';
  },

  closeModal() {
    this.modalOverlay?.classList.remove('active');
    document.body.style.overflow = '';
    if (this.modalVideo) {
      this.modalVideo.pause();
    }
  },

  renderModalContent(item) {
    const titleEl = document.getElementById('modal-title');
    const synopsisEl = document.getElementById('modal-synopsis');
    const matchEl = document.getElementById('modal-match');
    const yearEl = document.getElementById('modal-year');
    const ageEl = document.getElementById('modal-age');
    const durationEl = document.getElementById('modal-duration');
    const qualityEl = document.getElementById('modal-quality');
    const castEl = document.getElementById('modal-cast-list');
    const genresEl = document.getElementById('modal-genres-list');
    const creatorEl = document.getElementById('modal-creator');
    const heroImg = document.getElementById('modal-hero-img');

    if (titleEl) titleEl.textContent = item.title;
    if (synopsisEl) synopsisEl.textContent = item.synopsis;
    if (matchEl) matchEl.textContent = `${item.matchScore}% Match`;
    if (yearEl) yearEl.textContent = item.releaseYear || '2024';
    if (ageEl) ageEl.textContent = item.rating || '16+';
    if (durationEl) durationEl.textContent = item.duration || '2h 15m';
    if (qualityEl) qualityEl.textContent = item.quality || '4K Ultra HD';
    if (creatorEl) creatorEl.textContent = item.creator || 'Netflix Studios';

    if (castEl && item.cast) {
      castEl.textContent = item.cast.join(', ');
    }
    if (genresEl && item.genres) {
      genresEl.textContent = item.genres.join(', ');
    }

    if (heroImg) {
      heroImg.src = item.backdrop || item.poster;
    }

    // Video preview in modal header
    if (this.modalVideo && item.videoUrl) {
      this.modalVideo.src = item.videoUrl;
      this.modalVideo.muted = true;
      this.modalVideo.play().catch(e => console.log('Autoplay prevented:', e));
    }

    // Action buttons (Play, My List, Like)
    this.setupModalButtons(item);

    // Episodes section for TV Series
    this.renderEpisodesSection(item);

    // Recommendations "More Like This"
    this.renderRecommendations(item);
  },

  setupModalButtons(item) {
    const playBtn = document.getElementById('modal-play-btn');
    const listBtn = document.getElementById('modal-list-btn');
    const likeBtn = document.getElementById('modal-like-btn');
    const soundBtn = document.getElementById('modal-sound-btn');

    // Play Button
    if (playBtn) {
      playBtn.onclick = () => {
        this.closeModal();
        PlayerController.openPlayer(item);
      };
    }

    // My List Button
    if (listBtn) {
      const updateListBtn = () => {
        const inList = StorageManager.isInMyList(item.id);
        listBtn.innerHTML = inList ? '✓' : '+';
        listBtn.classList.toggle('in-list', inList);
        listBtn.title = inList ? 'Remove from My List' : 'Add to My List';
      };
      updateListBtn();

      listBtn.onclick = () => {
        const added = StorageManager.toggleMyList(item.id);
        updateListBtn();
        App.showToast(added ? `Added "${item.title}" to My List` : `Removed "${item.title}" from My List`);
        RowsController.renderAllRows();
      };
    }

    // Like Button
    if (likeBtn) {
      const updateLikeBtn = () => {
        const status = StorageManager.getLikeStatus(item.id);
        likeBtn.classList.toggle('liked', status === 'like');
      };
      updateLikeBtn();

      likeBtn.onclick = () => {
        const curr = StorageManager.getLikeStatus(item.id);
        const next = curr === 'like' ? null : 'like';
        StorageManager.setLikeStatus(item.id, next);
        updateLikeBtn();
        App.showToast(next === 'like' ? `Rated "${item.title}" Thumbs Up` : `Removed Rating`);
      };
    }

    // Modal Sound Button
    if (soundBtn) {
      soundBtn.onclick = () => {
        if (!this.modalVideo) return;
        this.isMuted = !this.isMuted;
        this.modalVideo.muted = this.isMuted;
        soundBtn.innerHTML = this.isMuted
          ? `<svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none"><path d="M11 5L6 9H2v6h4l5 4V5z"></path><line x1="23" y1="9" x2="17" y2="15"></line><line x1="17" y1="9" x2="23" y2="15"></line></svg>`
          : `<svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>`;
      };
    }
  },

  renderEpisodesSection(item) {
    const episodesContainer = document.getElementById('modal-episodes-section');
    if (!episodesContainer) return;

    const episodes = item.episodes || (item.type === 'tv' ? NETFLIX_DATA.heroMovie.episodes : null);

    if (!episodes || episodes.length === 0) {
      episodesContainer.style.display = 'none';
      return;
    }

    episodesContainer.style.display = 'block';
    const listEl = document.getElementById('modal-episodes-list');
    if (!listEl) return;

    listEl.innerHTML = '';
    episodes.forEach(ep => {
      const epEl = document.createElement('div');
      epEl.className = 'episode-item';
      epEl.innerHTML = `
        <div class="episode-num">${ep.number}</div>
        <div class="episode-thumb-box">
          <img src="${ep.thumbnail || item.backdrop}" alt="${ep.title}" loading="lazy" />
          <div class="episode-play-icon">▶</div>
        </div>
        <div class="episode-info">
          <div class="episode-info-top">
            <h4>${ep.title}</h4>
            <span class="duration">${ep.duration}</span>
          </div>
          <p>${ep.overview}</p>
        </div>
      `;

      epEl.onclick = () => {
        this.closeModal();
        PlayerController.openPlayer({
          ...item,
          title: `${item.title}: ${ep.title}`,
          videoUrl: ep.videoUrl || item.videoUrl
        });
      };

      listEl.appendChild(epEl);
    });
  },

  renderRecommendations(item) {
    const recsGrid = document.getElementById('modal-recommendations-grid');
    if (!recsGrid) return;
    recsGrid.innerHTML = '';

    // Find items in same genres
    const related = NETFLIX_DATA.catalog
      .filter(m => m.id !== item.id && m.genres.some(g => item.genres?.includes(g)))
      .slice(0, 6);

    const pool = related.length >= 3 ? related : NETFLIX_DATA.catalog.filter(m => m.id !== item.id).slice(0, 6);

    pool.forEach(rec => {
      const card = document.createElement('div');
      card.className = 'rec-card';
      const inList = StorageManager.isInMyList(rec.id);

      card.innerHTML = `
        <div class="rec-card-media">
          <img src="${rec.backdrop || rec.poster}" alt="${rec.title}" loading="lazy" />
        </div>
        <div class="rec-card-body">
          <div class="rec-card-top">
            <div class="preview-meta">
              <span class="badge-match">${rec.matchScore}% Match</span>
              <span class="badge-age">${rec.rating}</span>
            </div>
            <button class="btn-circle rec-list-btn ${inList ? 'in-list' : ''}">
              ${inList ? '✓' : '+'}
            </button>
          </div>
          <h4 style="font-size: 0.95rem; font-weight:700;">${rec.title}</h4>
          <p>${rec.synopsis}</p>
        </div>
      `;

      const listBtn = card.querySelector('.rec-list-btn');
      listBtn?.addEventListener('click', (e) => {
        e.stopPropagation();
        const added = StorageManager.toggleMyList(rec.id);
        listBtn.textContent = added ? '✓' : '+';
        listBtn.classList.toggle('in-list', added);
        App.showToast(added ? `Added "${rec.title}" to My List` : `Removed "${rec.title}" from My List`);
        RowsController.renderAllRows();
      });

      card.addEventListener('click', () => {
        this.openModal(rec.id);
      });

      recsGrid.appendChild(card);
    });
  }
};
