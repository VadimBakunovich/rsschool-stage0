const muteAudio = () => {
  muteBtn.classList.toggle('muted');
  video.muted ? video.muted = false : video.muted = true;
};

const progressBarApperance = (value) =>`
  linear-gradient(to right, #710707 0%, #710707 ${value}%, #c4c4c4 ${value}%, #c4c4c4 100%)`;

const overlayApperance = (overlayInner) => {
  overlay.innerHTML = overlayInner;
  overlay.classList.remove('hidden');
  setTimeout(() => overlay.classList.add('hidden'), 1000);
};

document.addEventListener('click', (e) => {
  switch (e.target.id) {
    case 'playBtnBig':
    case 'playBtn':
      playBtn.classList.toggle('pause');
      playBtnBig.classList.toggle('hidden');
      video.paused ? video.play() : video.pause();
      break;
    case 'muteBtn': return muteAudio();
    case 'fullscreenBtn': return video.requestFullscreen();
    default: break;
  };
});

document.addEventListener('keyup', (e) => {
  switch (e.code) {
    case 'KeyK': return video.paused ? video.play() : video.pause();
    case 'KeyM': 
      muteAudio();
      break;
    case 'KeyF': return document.fullscreenElement ? document.exitFullscreen() : video.requestFullscreen();
    default: break;
  };
  if (!isNaN(+e.key) && +e.key > 0) video.currentTime = +e.key * video.duration / 10; 
  if (e.shiftKey && e.code === 'Period') {
    video.playbackRate === 2 ? video.playbackRate = 2 : video.playbackRate += 0.25;
    overlayApperance(`${video.playbackRate}x`);
  };
  if (e.shiftKey && e.code === 'Comma') {
    video.playbackRate === 0.25 ? video.playbackRate = 0.25 : video.playbackRate -= 0.25;
    overlayApperance(`${video.playbackRate}x`);
  };
});

document.addEventListener('keydown', (e) => {
  switch (e.code) {
    case 'ArrowUp':
      if (!video.muted) video.volume > 0.95 ? video.volume = 1 : video.volume += 0.05;
      else {
        video.muted = false;
        video.volume = 0.05;
      };
      break;
    case 'ArrowDown':
      if (!video.muted) video.volume < 0.05 ? video.volume = 0 : video.volume -= 0.05;
      break;
    case 'ArrowLeft':
      video.currentTime > 5 ? video.currentTime -= 5 : video.currentTime = 0;
      overlayApperance('⏪ 5 sec');
      break;
    case 'ArrowRight':
      video.currentTime < video.duration - 5 ? video.currentTime += 5 : video.currentTime = video.duration;
      overlayApperance('⏩ 5 sec');
      break;
    case 'KeyJ':
      video.currentTime > 10 ? video.currentTime -= 10 : video.currentTime = 0;
      overlayApperance('⏪ 10 sec');
      break;
    case 'KeyL':
      video.currentTime < video.duration - 10 ? video.currentTime += 10 : video.currentTime = video.duration;
      overlayApperance('⏩ 10 sec');
      break;
    case 'Period':
      if (video.paused) {
        video.currentTime += 0.17;
        overlayApperance('⏩');
      }; break;
    case 'Comma': 
      if (video.paused) {
        video.currentTime -= 0.17;
        overlayApperance('⏪');
      }; break;
    default: break;
  };
});

video.addEventListener('play', () => {
  if (playBtn.className !== 'play pause') playBtn.className = 'play pause';
  if (playBtnBig.className !== 'big-play hidden') playBtnBig.className = 'big-play hidden';
});

video.addEventListener('pause', () => {
  if (playBtn.className !== 'play') playBtn.className = 'play';
  if (playBtnBig.className !== 'big-play') playBtnBig.className = 'big-play';
});

video.addEventListener('timeupdate', () => {
  progress.value = video.currentTime * 100 / video.duration;
  progress.style.background = progressBarApperance(progress.value);
});

progress.addEventListener('input', () => {
  video.currentTime = progress.value * video.duration / 100;
});

vol.addEventListener('input', () => {
  if (!video.muted) video.volume = vol.value / 100;
  else {
    video.muted = false;
    video.volume = 0.05;
  };
});

player.addEventListener('wheel', (e) => {
  let volume = video.volume * 100;
  if (e.deltaY < 0 && !video.muted) volume += 5;
  else if (e.deltaY < 0 && video.muted) {
    video.muted = false;
    volume = 5;
  } else if (e.deltaY > 0 && !video.muted) volume -= 5;
  if (volume < 0) video.volume = 0;
  else if (volume > 100) video.volume = 1;
  else video.volume = volume / 100;
});

video.addEventListener('volumechange', () => {
  if (video.muted) {
    overlayApperance('muted');
    vol.style.background = progressBarApperance(0);
    vol.value = 0;
  } else {
    overlayApperance(`🔊 ${Math.floor(video.volume * 100)}%`);
    vol.style.background = progressBarApperance(video.volume * 100);
    vol.value = video.volume * 100;
    if (video.volume < 0.5 && !muteBtn.classList.contains('vol50')) muteBtn.classList.add('vol50');
    else if (video.volume >= 0.5 && muteBtn.classList.contains('vol50')) muteBtn.classList.remove('vol50');
  };
  video.volume === 0 || video.muted ? muteBtn.classList.add('muted') : muteBtn.classList.remove('muted');
});