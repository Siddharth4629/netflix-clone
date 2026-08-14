/**
 * Netflix Clone - Custom Full-Screen Video Player Controller
 */

const PlayerController = {
  playerModal: null,
  videoStream: null,
  progressBar: null,
  scrubberHandle: null,
  timelineContainer: null,
  timeDisplay: null,
  playPauseBtn: null,
  volumeSlider: null,
  volumeBtn: null,
  speedBtn: null,
  centerFeedback: null,
  spinner: null,

  activeMedia: null,
  controlsTimeout: null,
  playbackSpeeds: [0.75, 1.0, 1.25, 1.5, 2.0],
  currentSpeedIndex: 1,

  init() {
    this.playerModal = document.getElementById('video-player-modal');
    this.videoStream = document.getElementById('main-video-stream');
    this.progressBar = document.getElementById('player-progress-bar');
    this.scrubberHandle = document.getElementById('player-scrubber-handle');
    this.timelineContainer = document.getElementById('player-timeline-container');
    this.timeDisplay = document.getElementById('player-time-display');
    this.playPauseBtn = document.getElementById('player-play-pause-btn');
    this.volumeSlider = document.getElementById('player-volume-slider');
    this.volumeBtn = document.getElementById('player-volume-btn');
    this.speedBtn = document.getElementById('player-speed-btn');
    this.centerFeedback = document.getElementById('player-center-feedback');
    this.spinner = document.getElementById('player-buffering-spinner');

    this.bindPlayerEvents();
    this.bindKeyboardShortcuts();
  },

  openPlayer(mediaItem) {
    if (!mediaItem) return;
    this.activeMedia = mediaItem;

    const titleEl = document.getElementById('player-title-text');
    const subTitleEl = document.getElementById('player-subtitle-text');
    const centerTitleEl = document.getElementById('player-center-title');

    if (titleEl) titleEl.textContent = mediaItem.title;
    if (subTitleEl) subTitleEl.textContent = mediaItem.type === 'tv' ? 'Playing TV Series' : 'Movie';
    if (centerTitleEl) centerTitleEl.textContent = mediaItem.title;

    if (this.videoStream) {
      this.videoStream.src = mediaItem.videoUrl || "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4";
      this.videoStream.currentTime = 0;
      this.videoStream.playbackRate = 1.0;
      this.currentSpeedIndex = 1;
      if (this.speedBtn) this.speedBtn.textContent = '1x';

      this.videoStream.play().catch(e => console.log('Player play prevented:', e));
    }

    this.playerModal?.classList.add('active');
    document.body.style.overflow = 'hidden';
    this.resetControlsTimer();
  },

  closePlayer() {
    if (this.videoStream && this.activeMedia) {
      const progressPercent = (this.videoStream.currentTime / (this.videoStream.duration || 1)) * 100;
      StorageManager.updateWatchProgress(
        this.activeMedia.id,
        progressPercent,
        `${this.formatTime(this.videoStream.currentTime)} watched`
      );
      this.videoStream.pause();
    }

    this.playerModal?.classList.remove('active');
    document.body.style.overflow = '';
    // Refresh continue watching row
    RowsController.renderAllRows();
  },

  bindPlayerEvents() {
    const backBtn = document.getElementById('player-back-btn');
    const skipBackBtn = document.getElementById('player-skip-back-btn');
    const skipFwdBtn = document.getElementById('player-skip-fwd-btn');
    const fullscreenBtn = document.getElementById('player-fullscreen-btn');
    const container = document.getElementById('player-container');

    backBtn?.addEventListener('click', () => this.closePlayer());

    // Play / Pause Button Click
    this.playPauseBtn?.addEventListener('click', () => this.togglePlayPause());

    // Click on Video Screen to Play/Pause
    this.videoStream?.addEventListener('click', () => {
      this.togglePlayPause();
      this.triggerCenterFeedback(this.videoStream.paused ? '❚❚' : '▶');
    });

    // Skip Buttons
    skipBackBtn?.addEventListener('click', () => this.seekBy(-10));
    skipFwdBtn?.addEventListener('click', () => this.seekBy(10));

    // Video Time Updates
    this.videoStream?.addEventListener('timeupdate', () => this.updateProgress());
    this.videoStream?.addEventListener('waiting', () => {
      if (this.spinner) this.spinner.style.display = 'block';
    });
    this.videoStream?.addEventListener('playing', () => {
      if (this.spinner) this.spinner.style.display = 'none';
    });

    // Timeline Scrubbing Click / Drag
    this.timelineContainer?.addEventListener('click', (e) => this.handleScrub(e));

    // Timeline Hover Tooltip
    const tooltip = document.getElementById('player-timeline-tooltip');
    this.timelineContainer?.addEventListener('mousemove', (e) => {
      if (!this.timelineContainer || !this.videoStream || !tooltip) return;
      const rect = this.timelineContainer.getBoundingClientRect();
      const pos = (e.clientX - rect.left) / rect.width;
      const hoverTime = pos * (this.videoStream.duration || 0);

      tooltip.style.left = `${e.clientX - rect.left}px`;
      tooltip.style.display = 'block';
      tooltip.textContent = this.formatTime(hoverTime);
    });

    this.timelineContainer?.addEventListener('mouseleave', () => {
      if (tooltip) tooltip.style.display = 'none';
    });

    // Volume Slider
    this.volumeSlider?.addEventListener('input', (e) => {
      const vol = parseFloat(e.target.value);
      if (this.videoStream) {
        this.videoStream.volume = vol;
        this.videoStream.muted = (vol === 0);
        this.updateVolumeIcon();
      }
    });

    this.volumeBtn?.addEventListener('click', () => this.toggleMute());

    // Playback Speed
    this.speedBtn?.addEventListener('click', () => this.cyclePlaybackSpeed());

    // Fullscreen Toggle
    fullscreenBtn?.addEventListener('click', () => this.toggleFullscreen());

    // Mouse Movement auto-hide controls timer
    container?.addEventListener('mousemove', () => this.resetControlsTimer());
  },

  togglePlayPause() {
    if (!this.videoStream) return;
    if (this.videoStream.paused) {
      this.videoStream.play();
      if (this.playPauseBtn) this.playPauseBtn.innerHTML = `❚❚`;
    } else {
      this.videoStream.pause();
      if (this.playPauseBtn) this.playPauseBtn.innerHTML = `▶`;
    }
  },

  seekBy(seconds) {
    if (!this.videoStream) return;
    this.videoStream.currentTime = Math.max(0, Math.min(this.videoStream.duration, this.videoStream.currentTime + seconds));
    this.triggerCenterFeedback(seconds > 0 ? '+10s' : '-10s');
  },

  handleScrub(e) {
    if (!this.timelineContainer || !this.videoStream) return;
    const rect = this.timelineContainer.getBoundingClientRect();
    const pos = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    this.videoStream.currentTime = pos * (this.videoStream.duration || 0);
  },

  updateProgress() {
    if (!this.videoStream) return;
    const current = this.videoStream.currentTime;
    const duration = this.videoStream.duration || 1;
    const percent = (current / duration) * 100;

    if (this.progressBar) this.progressBar.style.width = `${percent}%`;
    if (this.scrubberHandle) this.scrubberHandle.style.left = `${percent}%`;

    if (this.timeDisplay) {
      this.timeDisplay.textContent = `${this.formatTime(current)} / ${this.formatTime(duration)}`;
    }
  },

  formatTime(seconds) {
    if (isNaN(seconds)) return "00:00";
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);

    if (hrs > 0) {
      return `${hrs}:${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
    }
    return `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
  },

  toggleMute() {
    if (!this.videoStream) return;
    this.videoStream.muted = !this.videoStream.muted;
    if (this.volumeSlider) {
      this.volumeSlider.value = this.videoStream.muted ? 0 : this.videoStream.volume;
    }
    this.updateVolumeIcon();
  },

  updateVolumeIcon() {
    if (!this.volumeBtn || !this.videoStream) return;
    if (this.videoStream.muted || this.videoStream.volume === 0) {
      this.volumeBtn.innerHTML = `🔇`;
    } else if (this.videoStream.volume < 0.5) {
      this.volumeBtn.innerHTML = `🔉`;
    } else {
      this.volumeBtn.innerHTML = `🔊`;
    }
  },

  cyclePlaybackSpeed() {
    if (!this.videoStream) return;
    this.currentSpeedIndex = (this.currentSpeedIndex + 1) % this.playbackSpeeds.length;
    const newSpeed = this.playbackSpeeds[this.currentSpeedIndex];
    this.videoStream.playbackRate = newSpeed;
    if (this.speedBtn) this.speedBtn.textContent = `${newSpeed}x`;
    App.showToast(`Playback speed: ${newSpeed}x`);
  },

  toggleFullscreen() {
    const container = document.getElementById('video-player-modal');
    if (!container) return;

    if (!document.fullscreenElement) {
      container.requestFullscreen?.().catch(e => console.log(e));
    } else {
      document.exitFullscreen?.();
    }
  },

  triggerCenterFeedback(text) {
    if (!this.centerFeedback) return;
    this.centerFeedback.textContent = text;
    this.centerFeedback.classList.remove('animate');
    void this.centerFeedback.offsetWidth; // trigger reflow
    this.centerFeedback.classList.add('animate');
  },

  resetControlsTimer() {
    const container = document.getElementById('player-container');
    container?.classList.remove('controls-hidden');

    clearTimeout(this.controlsTimeout);
    this.controlsTimeout = setTimeout(() => {
      if (this.videoStream && !this.videoStream.paused) {
        container?.classList.add('controls-hidden');
      }
    }, 3500);
  },

  bindKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
      if (!this.playerModal?.classList.contains('active')) return;

      switch (e.key) {
        case ' ':
        case 'k':
        case 'K':
          e.preventDefault();
          this.togglePlayPause();
          break;
        case 'ArrowLeft':
        case 'j':
        case 'J':
          e.preventDefault();
          this.seekBy(-10);
          break;
        case 'ArrowRight':
        case 'l':
        case 'L':
          e.preventDefault();
          this.seekBy(10);
          break;
        case 'm':
        case 'M':
          e.preventDefault();
          this.toggleMute();
          break;
        case 'f':
        case 'F':
          e.preventDefault();
          this.toggleFullscreen();
          break;
        case 'Escape':
          this.closePlayer();
          break;
      }
    });
  }
};
