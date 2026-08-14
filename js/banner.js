/**
 * Netflix Clone - Billboard Hero Banner Controller
 */

const BannerController = {
  heroData: null,
  videoElement: null,
  isMuted: true,

  init() {
    this.heroData = NETFLIX_DATA.heroMovie;
    this.videoElement = document.getElementById('hero-bg-video');
    this.renderHero();
    this.bindEvents();
  },

  renderHero() {
    const movie = this.heroData;
    if (!movie) return;

    const titleEl = document.getElementById('hero-title');
    const synopsisEl = document.getElementById('hero-synopsis');
    const badgeEl = document.getElementById('hero-top-badge');
    const maturityEl = document.getElementById('hero-maturity');
    const backdropFallback = document.getElementById('hero-backdrop-img');

    if (titleEl) titleEl.textContent = movie.title;
    if (synopsisEl) synopsisEl.textContent = movie.synopsis;
    if (badgeEl) badgeEl.textContent = movie.badge || 'TOP 10 • #1 IN TV SHOWS TODAY';
    if (maturityEl) maturityEl.textContent = movie.rating || '16+';

    if (backdropFallback) {
      backdropFallback.style.backgroundImage = `url('${movie.backdrop}')`;
    }

    if (this.videoElement && movie.videoUrl) {
      this.videoElement.src = movie.videoUrl;
      this.videoElement.muted = true;
      this.videoElement.play().catch(e => {
        console.log("Autoplay was prevented by browser:", e);
      });
    }
  },

  bindEvents() {
    const playBtn = document.getElementById('hero-play-btn');
    const infoBtn = document.getElementById('hero-info-btn');
    const soundBtn = document.getElementById('hero-sound-btn');

    playBtn?.addEventListener('click', () => {
      PlayerController.openPlayer(this.heroData);
    });

    infoBtn?.addEventListener('click', () => {
      ModalController.openModal(this.heroData.id);
    });

    soundBtn?.addEventListener('click', () => {
      this.toggleSound();
    });
  },

  toggleSound() {
    if (!this.videoElement) return;
    this.isMuted = !this.isMuted;
    this.videoElement.muted = this.isMuted;

    const soundIcon = document.getElementById('hero-sound-icon');
    if (soundIcon) {
      soundIcon.innerHTML = this.isMuted
        ? `<svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none"><path d="M11 5L6 9H2v6h4l5 4V5z"></path><line x1="23" y1="9" x2="17" y2="15"></line><line x1="17" y1="9" x2="23" y2="15"></line></svg>`
        : `<svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>`;
    }
    App.showToast(this.isMuted ? 'Muted hero audio' : 'Unmuted hero audio');
  }
};
