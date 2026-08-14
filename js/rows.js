/**
 * Netflix Clone - Content Rows, Carousel Sliders & Hover Preview Controller
 */

const RowsController = {
  hoverTimeout: null,
  activeHoverCard: null,
  hoverCardElement: null,

  init() {
    this.hoverCardElement = document.getElementById('hover-preview-card');
    this.renderAllRows();
    this.bindHoverCardGlobalEvents();
  },

  renderAllRows() {
    const container = document.getElementById('content-rows-container');
    if (!container) return;
    container.innerHTML = '';

    NETFLIX_DATA.rowSections.forEach(section => {
      const rowEl = this.createRowElement(section);
      if (rowEl) {
        container.appendChild(rowEl);
      }
    });
  },

  createRowElement(section) {
    let items = [];

    if (section.filterType === 'continue') {
      const continueList = StorageManager.getContinueWatching();
      items = continueList.map(entry => {
        const item = getItemById(entry.id);
        return item ? { ...item, progress: entry.progress, lastWatched: entry.lastWatched } : null;
      }).filter(Boolean);
      if (items.length === 0) return null;
    } else if (section.filterType === 'mylist') {
      const mylistIds = StorageManager.getMyList();
      items = mylistIds.map(id => getItemById(id)).filter(Boolean);
      if (items.length === 0) return null;
    } else if (section.filterType === 'top10') {
      items = NETFLIX_DATA.catalog.filter(m => m.categories.includes('top10')).slice(0, 10);
    } else if (section.filterType === 'originals') {
      items = NETFLIX_DATA.catalog.filter(m => m.isOriginal);
    } else {
      items = NETFLIX_DATA.catalog.filter(m => m.categories.includes(section.filterType));
    }

    if (items.length === 0) return null;

    const rowWrapper = document.createElement('div');
    rowWrapper.className = `content-row ${section.isOriginal ? 'originals-row' : ''}`;
    rowWrapper.id = section.id;

    // Header
    const header = document.createElement('div');
    header.className = 'row-header';
    header.innerHTML = `
      <h3 class="row-title">${section.title}</h3>
      <span class="row-explore-all">Explore All <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"></polyline></svg></span>
    `;
    rowWrapper.appendChild(header);

    // Carousel Slider
    const sliderWrapper = document.createElement('div');
    sliderWrapper.className = 'row-slider-wrapper';

    // Left Handle
    const prevHandle = document.createElement('button');
    prevHandle.className = 'slider-handle prev';
    prevHandle.setAttribute('aria-label', 'Previous');
    prevHandle.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"></polyline></svg>`;

    // Right Handle
    const nextHandle = document.createElement('button');
    nextHandle.className = 'slider-handle next';
    nextHandle.setAttribute('aria-label', 'Next');
    nextHandle.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"></polyline></svg>`;

    // Slider Track
    const slider = document.createElement('div');
    slider.className = 'row-slider';

    // Populate Cards
    items.forEach((item, index) => {
      if (section.isTop10) {
        const top10Card = this.createTop10Card(item, index + 1);
        slider.appendChild(top10Card);
      } else {
        const card = this.createMovieCard(item, section.isOriginal);
        slider.appendChild(card);
      }
    });

    // Scroll events
    prevHandle.addEventListener('click', () => {
      slider.scrollBy({ left: -slider.clientWidth * 0.75, behavior: 'smooth' });
    });
    nextHandle.addEventListener('click', () => {
      slider.scrollBy({ left: slider.clientWidth * 0.75, behavior: 'smooth' });
    });

    sliderWrapper.appendChild(prevHandle);
    sliderWrapper.appendChild(slider);
    sliderWrapper.appendChild(nextHandle);

    rowWrapper.appendChild(sliderWrapper);
    return rowWrapper;
  },

  createMovieCard(item, isOriginal) {
    const card = document.createElement('div');
    card.className = 'movie-card';
    card.dataset.id = item.id;

    const imgSrc = isOriginal ? item.poster : (item.backdrop || item.poster);

    card.innerHTML = `
      <div class="card-media-box">
        <img class="card-img" src="${imgSrc}" alt="${item.title}" loading="lazy" />
        ${item.isOriginal ? `
          <svg class="n-original-badge-corner" viewBox="0 0 24 36" fill="none">
            <path d="M0 0H6.5V36L0 34V0Z" fill="#E50914"/>
            <path d="M17.5 0H24V36L17.5 34V0Z" fill="#E50914"/>
            <path d="M0 0L24 36H17.5L0 9V0Z" fill="#B81D24"/>
          </svg>
        ` : ''}
        ${item.progress !== undefined ? `
          <div class="card-progress-bar-container">
            <div class="card-progress-bar-fill" style="width: ${item.progress}%"></div>
          </div>
        ` : ''}
      </div>
    `;

    this.attachCardEvents(card, item);
    return card;
  },

  createTop10Card(item, rank) {
    const wrapper = document.createElement('div');
    wrapper.className = 'top10-card-wrapper';

    const rankNum = document.createElement('div');
    rankNum.className = 'top10-rank-num';
    rankNum.textContent = rank;

    const card = document.createElement('div');
    card.className = 'movie-card';
    card.dataset.id = item.id;

    card.innerHTML = `
      <div class="card-media-box">
        <img class="card-img" src="${item.poster || item.backdrop}" alt="${item.title}" loading="lazy" />
        ${item.isOriginal ? `
          <svg class="n-original-badge-corner" viewBox="0 0 24 36" fill="none">
            <path d="M0 0H6.5V36L0 34V0Z" fill="#E50914"/>
            <path d="M17.5 0H24V36L17.5 34V0Z" fill="#E50914"/>
            <path d="M0 0L24 36H17.5L0 9V0Z" fill="#B81D24"/>
          </svg>
        ` : ''}
      </div>
    `;

    this.attachCardEvents(card, item);

    wrapper.appendChild(rankNum);
    wrapper.appendChild(card);
    return wrapper;
  },

  attachCardEvents(card, item) {
    // Click opens detail modal
    card.addEventListener('click', (e) => {
      this.hideHoverPreview();
      ModalController.openModal(item.id);
    });

    // Hover Preview Popup Trigger
    card.addEventListener('mouseenter', (e) => {
      clearTimeout(this.hoverTimeout);
      this.hoverTimeout = setTimeout(() => {
        this.showHoverPreview(card, item);
      }, 400);
    });

    card.addEventListener('mouseleave', (e) => {
      clearTimeout(this.hoverTimeout);
    });
  },

  // Floating hover preview logic
  showHoverPreview(cardElement, item) {
    const rect = cardElement.getBoundingClientRect();
    const previewEl = this.hoverCardElement;
    if (!previewEl) return;

    this.activeHoverCard = item;

    // Position preview card centered over triggering card
    const cardWidth = 320;
    let left = rect.left + rect.width / 2 - cardWidth / 2;
    let top = rect.top - 20;

    // Viewport bounds checking
    if (left < 20) left = 20;
    if (left + cardWidth > window.innerWidth - 20) {
      left = window.innerWidth - cardWidth - 20;
    }
    if (top < 70) top = rect.bottom - 40;

    previewEl.style.left = `${left}px`;
    previewEl.style.top = `${top}px`;

    const isInList = StorageManager.isInMyList(item.id);
    const likeStatus = StorageManager.getLikeStatus(item.id);

    previewEl.innerHTML = `
      <div class="preview-media-container">
        <video class="preview-video" src="${item.videoUrl}" autoplay muted loop playsinline></video>
        <img class="preview-img-fallback" src="${item.backdrop || item.poster}" alt="${item.title}" style="display:none;" />
      </div>
      <div class="preview-body">
        <div class="preview-actions">
          <div class="preview-actions-left">
            <button class="btn-circle play-btn" id="preview-play-btn" title="Play">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
            </button>
            <button class="btn-circle ${isInList ? 'in-list' : ''}" id="preview-list-btn" title="${isInList ? 'Remove from My List' : 'Add to My List'}">
              ${isInList ? '✓' : '+'}
            </button>
            <button class="btn-circle ${likeStatus === 'like' ? 'liked' : ''}" id="preview-like-btn" title="I like this">
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path></svg>
            </button>
          </div>
          <button class="btn-circle" id="preview-more-btn" title="More Info">
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
          </button>
        </div>
        <div class="preview-title">${item.title}</div>
        <div class="preview-meta">
          <span class="badge-match">${item.matchScore}% Match</span>
          <span class="badge-age">${item.rating}</span>
          <span>${item.duration}</span>
          <span class="badge-quality">${item.quality || 'HD'}</span>
        </div>
        <div class="preview-genres">
          ${item.genres.map((g, i) => `${g} ${i < item.genres.length - 1 ? '<span class="genre-dot"></span>' : ''}`).join('')}
        </div>
      </div>
    `;

    // Bind preview card button actions
    const playBtn = previewEl.querySelector('#preview-play-btn');
    const listBtn = previewEl.querySelector('#preview-list-btn');
    const likeBtn = previewEl.querySelector('#preview-like-btn');
    const moreBtn = previewEl.querySelector('#preview-more-btn');

    playBtn?.addEventListener('click', (e) => {
      e.stopPropagation();
      this.hideHoverPreview();
      PlayerController.openPlayer(item);
    });

    listBtn?.addEventListener('click', (e) => {
      e.stopPropagation();
      const added = StorageManager.toggleMyList(item.id);
      listBtn.textContent = added ? '✓' : '+';
      listBtn.classList.toggle('in-list', added);
      App.showToast(added ? `Added "${item.title}" to My List` : `Removed "${item.title}" from My List`);
      this.renderAllRows();
    });

    likeBtn?.addEventListener('click', (e) => {
      e.stopPropagation();
      const curr = StorageManager.getLikeStatus(item.id);
      const next = curr === 'like' ? null : 'like';
      StorageManager.setLikeStatus(item.id, next);
      likeBtn.classList.toggle('liked', next === 'like');
      App.showToast(next === 'like' ? `Rated "${item.title}" Thumbs Up` : `Removed Rating`);
    });

    moreBtn?.addEventListener('click', (e) => {
      e.stopPropagation();
      this.hideHoverPreview();
      ModalController.openModal(item.id);
    });

    previewEl.classList.add('visible');
  },

  hideHoverPreview() {
    clearTimeout(this.hoverTimeout);
    if (this.hoverCardElement) {
      this.hoverCardElement.classList.remove('visible');
      const video = this.hoverCardElement.querySelector('.preview-video');
      if (video) video.pause();
    }
  },

  bindHoverCardGlobalEvents() {
    if (!this.hoverCardElement) return;

    this.hoverCardElement.addEventListener('mouseenter', () => {
      clearTimeout(this.hoverTimeout);
    });

    this.hoverCardElement.addEventListener('mouseleave', () => {
      this.hideHoverPreview();
    });

    window.addEventListener('scroll', () => {
      this.hideHoverPreview();
    });
  }
};
