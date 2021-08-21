document.addEventListener('click', (e) => {
  console.log(e.target);
  switch (e.target.id) {
    case 'bigPlay':
    case 'play':
      play.classList.toggle('pause');
      bigPlay.classList.toggle('hidden');
      play.className === 'play pause' ? video.play() : video.pause();
      break;
    case 'volume':
      volume.classList.toggle('muted');
      volume.className === 'volume muted' ? video.muted = true : video.muted = false;
      break;
    case 'fullscreen':
      video.requestFullscreen();
      break;
    default: break;
  };
});
video.addEventListener('play', () => {
  play.className === 'play pause' ? play.className = 'play pause' : play.className = 'play pause';
  bigPlay.className === 'big-play hidden' ? bigPlay.className = 'big-play hidden' : bigPlay.className = 'big-play hidden';
});
video.addEventListener('pause', () => {
  play.className === 'play' ? play.className = 'play' : play.className = 'play';
  bigPlay.className === 'big-play' ? bigPlay.className = 'big-play' : bigPlay.className = 'big-play';
});