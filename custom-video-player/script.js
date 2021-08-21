const muteAudio = () => {
  muteBtn.classList.toggle('muted');
  video.muted ? video.muted = false : video.muted = true;
};

const handleVolSlider = () => vol.value = video.volume * 100;

const progressBarApperance = (value) =>`
  linear-gradient(to right, #710707 0%, #710707 ${value}%, #c4c4c4 ${value}%, #c4c4c4 100%)`;

document.addEventListener('click', (e) => {
  switch (e.target.id) {
    case 'playBtnBig':
    case 'playBtn':
      playBtn.classList.toggle('pause');
      playBtnBig.classList.toggle('hidden');
      video.paused ? video.play() : video.pause();
      break;
    case 'muteBtn': muteAudio(); break;
    case 'fullscreenBtn': return video.requestFullscreen();
    default: break;
  };
});

document.addEventListener('keyup', (e) => {
  switch (e.code) {
    case 'KeyK':
    case 'Space': return video.paused ? video.play() : video.pause();
    case 'KeyM': muteAudio(); break;
    case 'Period':
      if (video.paused) video.currentTime += 0.17;
      break;
    case 'Comma': 
      if (video.paused) video.currentTime -= 0.17;
      break;
    case 'ArrowUp': return video.volume > 0.95 ? video.volume = 1 : video.volume += 0.05;
    case 'ArrowDown': return video.volume < 0.05 ? video.volume = 0 : video.volume -= 0.05;
    case 'ArrowLeft': return video.currentTime > 5 ? 
                                                    video.currentTime -= 5 : 
                                                    video.currentTime = 0;
    case 'ArrowRight': return video.currentTime < video.duration - 5 ? 
                                                                      video.currentTime += 5 : 
                                                                      video.currentTime = video.duration;
    case 'KeyF': 
      document.fullscreenElement ? document.exitFullscreen() : video.requestFullscreen();
    case 'KeyJ': return video.currentTime > 10 ? 
                                                video.currentTime -= 10 : 
                                                video.currentTime = 0;
    case 'KeyL': return video.currentTime < video.duration - 10 ? 
                                                                video.currentTime += 10 : 
                                                                video.currentTime = video.duration;
    default: break;
  };
  if (!isNaN(+e.key)) video.currentTime = +e.key * video.duration / 10; 
  if (e.shiftKey && e.code === 'Period') video.playbackRate === 2 ? 
                                                                  video.playbackRate = 2 : 
                                                                  video.playbackRate += 0.25;
  if (e.shiftKey && e.code === 'Comma') video.playbackRate === 0.25 ? 
                                                                    video.playbackRate = 0.25 : 
                                                                    video.playbackRate -= 0.25;
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
  video.volume = vol.value / 100;
});

document.addEventListener('wheel', (e) => {
  let volume = video.volume * 100;
  e.deltaY < 0 ? volume += 5 : volume -= 5;
  if (volume < 0) video.volume = 0;
  else if (volume > 100) video.volume = 1;
  else video.volume = volume / 100;
});

video.addEventListener('volumechange', () => {
  vol.style.background = progressBarApperance(video.volume * 100);
  handleVolSlider();
});