document.addEventListener('click', (e) => {
  console.log(e.target);
  switch (e.target.id) {
    case 'video':
    case 'bigPlay':
    case 'bigBtn':
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
      video.requestFullscreen({ navigationUI: "hide" });
      break;
    default: break;
  };
});