(function () {
  // ===== PLAYLIST CONFIGURATION =====
  // Add your audio files to the audio/ folder, then update this array with your tracks
  const playlist = [
    { src: 'audio/Carefree.mp3', title: 'Rini - Carefree' },
    { src: 'audio/EDEN - Under the Skin (Official Visualizer).mp3', title: 'EDEN - Under the Skin' },
    { src: 'audio/Eternity_spotdown.org.mp3', title: 'Eternity' },
    { src: 'audio/First Day on Set_spotdown.org.mp3', title: 'First Day on Set' },
    { src: 'audio/Intangible_spotdown.org.mp3', title: 'Intangible' },
    { src: 'audio/Lady in the Blue Dress_spotdown.org.mp3', title: 'Lady in the Blue Dress' },
    { src: 'audio/Love by the Shore_spotdown.org.mp3', title: 'Love by the Shore' },
    { src: 'audio/Mirror Images_spotdown.org.mp3', title: 'Mirror Images' },
    { src: 'audio/My Reverie_spotdown.org.mp3', title: 'My Reverie' },
    { src: 'audio/Song of The Sirens_spotdown.org.mp3', title: 'Song of The Sirens' },
    { src: 'audio/Spring (It\'s a Big World Outside)_spotdown.org.mp3', title: 'Spring (It\'s a Big World Outside)' },
    { src: 'audio/Stardew Valley Overture_spotdown.org.mp3', title: 'Stardew Valley Overture' },
    { src: 'audio/Summer (The Sun Can Bend an Orange Sky)_spotdown.org.mp3', title: 'Summer (The Sun Can Bend an Orange Sky)' },
    { src: 'audio/Swedish House Mafia - Save The World (Official Video).mp3', title: 'Swedish House Mafia - Save The World' },
    { src: 'audio/Swedish House Mafia ft. John Martin - Don\'t You Worry Child (Official Video).mp3', title: 'Swedish House Mafia - Don\'t You Worry Child' },
    { src: 'audio/These Foolish Things_spotdown.org.mp3', title: 'These Foolish Things' },
    { src: 'audio/What\'s Life Without You_spotdown.org.mp3', title: 'What\'s Life Without You' },
  ];

  // ===== INITIALIZATION =====
  const audio = document.getElementById('audio-player');
  const player = document.getElementById('music-player');
  const toggle = document.getElementById('music-toggle');
  const playBtn = document.getElementById('music-play');
  const prevBtn = document.getElementById('music-prev');
  const nextBtn = document.getElementById('music-next');
  const shuffleBtn = document.getElementById('music-shuffle');
  const trackName = document.getElementById('music-track-name');
  const timeDisplay = document.getElementById('music-time');

  if (!audio || !player) return;

  let currentIndex = 0;
  let isShuffled = false;
  let shuffledPlaylist = [];
  let isPlaying = false;
  let lastUpdateTime = 0;
  let cachedDuration = 0;

  // ===== HELPER FUNCTIONS =====
  function formatTime(seconds) {
    if (!isFinite(seconds) || isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }

  function getCurrentPlaylist() {
    return isShuffled ? shuffledPlaylist : playlist;
  }

  function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  function loadTrack(index) {
    const currentPlaylist = getCurrentPlaylist();
    if (currentPlaylist.length === 0) return;
    
    const actualIndex = index % currentPlaylist.length;
    const track = currentPlaylist[actualIndex];
    
    audio.src = track.src;
    trackName.textContent = track.title;
    timeDisplay.textContent = '0:00 / 0:00';
    cachedDuration = 0;
    
    audio.load();
  }

  function playTrack() {
    if (playlist.length === 0) return;
    audio.play().catch(() => {
      // Autoplay blocked - user needs to interact first
    });
  }

  function pauseTrack() {
    audio.pause();
  }

  function togglePlayPause() {
    if (playlist.length === 0) return;
    
    if (isPlaying) {
      pauseTrack();
    } else {
      playTrack();
    }
  }

  function playNext() {
    if (playlist.length === 0) return;
    currentIndex = (currentIndex + 1) % getCurrentPlaylist().length;
    loadTrack(currentIndex);
    if (isPlaying) {
      playTrack();
    }
  }

  function playPrev() {
    if (playlist.length === 0) return;
    currentIndex = (currentIndex - 1 + getCurrentPlaylist().length) % getCurrentPlaylist().length;
    loadTrack(currentIndex);
    if (isPlaying) {
      playTrack();
    }
  }

  function toggleShuffle() {
    isShuffled = !isShuffled;
    shuffleBtn.classList.toggle('active', isShuffled);
    
    if (isShuffled) {
      shuffledPlaylist = shuffleArray(playlist);
      // Find current track in shuffled list
      const currentTrack = getCurrentPlaylist()[currentIndex];
      const newIndex = shuffledPlaylist.findIndex(t => t.src === currentTrack.src);
      currentIndex = newIndex >= 0 ? newIndex : 0;
    } else {
      // Find current track in original list
      const currentTrack = shuffledPlaylist[currentIndex];
      const newIndex = playlist.findIndex(t => t.src === currentTrack.src);
      currentIndex = newIndex >= 0 ? newIndex : 0;
    }
  }

  // ===== EVENT LISTENERS =====
  toggle.addEventListener('click', () => {
    player.classList.toggle('expanded');
  });

  playBtn.addEventListener('click', togglePlayPause);
  prevBtn.addEventListener('click', playPrev);
  nextBtn.addEventListener('click', playNext);
  shuffleBtn.addEventListener('click', toggleShuffle);

  audio.addEventListener('play', () => {
    isPlaying = true;
    playBtn.classList.add('playing');
    playBtn.querySelector('.play-icon').style.display = 'none';
    playBtn.querySelector('.pause-icon').style.display = 'block';
  });

  audio.addEventListener('pause', () => {
    isPlaying = false;
    playBtn.classList.remove('playing');
    playBtn.querySelector('.play-icon').style.display = 'block';
    playBtn.querySelector('.pause-icon').style.display = 'none';
  });

  audio.addEventListener('loadedmetadata', () => {
    cachedDuration = audio.duration;
    timeDisplay.textContent = `0:00 / ${formatTime(cachedDuration)}`;
  });

  audio.addEventListener('timeupdate', () => {
    // Throttle updates to reduce DOM manipulation (update max once per 0.5 seconds)
    const now = Date.now();
    if (now - lastUpdateTime < 500) return;
    lastUpdateTime = now;
    
    const currentTime = audio.currentTime;
    const duration = cachedDuration || audio.duration || 0;
    timeDisplay.textContent = `${formatTime(currentTime)} / ${formatTime(duration)}`;
  });

  audio.addEventListener('ended', () => {
    playNext();
  });

  audio.addEventListener('error', () => {
    console.warn('Error loading audio track');
    // Try to skip to next track if current one fails
    if (playlist.length > 1) {
      playNext();
    }
  });

  // ===== INITIALIZE =====
  if (playlist.length > 0) {
    loadTrack(0);
  } else {
    trackName.textContent = 'Add songs to playlist';
    player.classList.add('no-tracks');
  }
})();
