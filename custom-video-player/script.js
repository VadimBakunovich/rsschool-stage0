let timerOverlay;
let timerCursor;

// mute control
const muteAudio = () => {
  muteBtn.classList.toggle('muted');
  video.muted ? video.muted = false : video.muted = true;
};

// control of the progress bar display
const progressBarApperance = (value) =>`
  linear-gradient(to right, #710707 0%, #710707 ${value}%, #c4c4c4 ${value}%, #c4c4c4 100%)`;

// overlay display control
const overlayApperance = (inner) => {
  currSec = new Date().getSeconds();
  overlay.innerHTML = inner;
  overlay.classList.remove('hidden');
  clearTimeout(timerOverlay);
  timerOverlay = setTimeout(() => overlay.classList.add('hidden'), 1000);
};

// add control of the video player using the mouse
document.addEventListener('click', (e) => {
  switch (e.target.id) {
    case 'video':
    case 'playBtnBig':
    case 'playBtn':
      playBtn.classList.toggle('pause');
      playBtnBig.classList.toggle('hidden');
      video.paused ? video.play() : video.pause();
      break;
    case 'muteBtn': muteAudio(); break;
    case 'fullscreenBtn': return document.fullscreenElement ? document.exitFullscreen() : player.requestFullscreen();
    default: break;
  };
});

// add control of the video player using the keyboard (first group)
document.addEventListener('keyup', (e) => {
  switch (e.code) {
    case 'Space':
    case 'KeyK': return video.paused ? video.play() : video.pause();
    case 'KeyM': muteAudio(); break;
    case 'KeyF': return document.fullscreenElement ? document.exitFullscreen() : player.requestFullscreen();
    default: break;
  };
  if (!isNaN(+e.key) && +e.key >= 0) video.currentTime = +e.key * video.duration / 10;
  if (e.shiftKey && e.code === 'Period') {
    video.playbackRate === 2 ? video.playbackRate = 2 : video.playbackRate += 0.25;
    overlayApperance(`${video.playbackRate}x`);
  };
  if (e.shiftKey && e.code === 'Comma') {
    video.playbackRate === 0.25 ? video.playbackRate = 0.25 : video.playbackRate -= 0.25;
    overlayApperance(`${video.playbackRate}x`);
  };
});

// add control of the video player using the keyboard (second group)
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
      overlayApperance('<< 5 sec');
      break;
    case 'ArrowRight':
      video.currentTime < video.duration - 5 ? video.currentTime += 5 : video.currentTime = video.duration;
      overlayApperance('>> 5 sec');
      break;
    case 'KeyJ':
      video.currentTime > 10 ? video.currentTime -= 10 : video.currentTime = 0;
      overlayApperance('<< 10 sec');
      break;
    case 'KeyL':
      video.currentTime < video.duration - 10 ? video.currentTime += 10 : video.currentTime = video.duration;
      overlayApperance('>> 10 sec');
      break;
    case 'Period':
      if (video.paused && !e.shiftKey) {
        video.currentTime += 0.17;
        overlayApperance('>>');
      }; break;
    case 'Comma': 
      if (video.paused && !e.shiftKey) {
        video.currentTime -= 0.17;
        overlayApperance('<<');
      }; break;
    default: break;
  };
});

// control the display of the video progress bar
video.addEventListener('timeupdate', () => {
  progress.value = video.currentTime * 100 / video.duration;
  progress.style.background = progressBarApperance(progress.value);
});

// control video rewind
progress.addEventListener('input', () => {
  video.currentTime = progress.value * video.duration / 100;
});

// control video volume
vol.addEventListener('input', () => {
  if (!video.muted) video.volume = vol.value / 100;
  else {
    video.muted = false;
    video.volume = 0.05;
  };
});

// control the video volume with the mouse wheel
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

// control the display of video volume
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

// control the disappearance of the cursor and control panel
document.addEventListener('mousemove', () => {
  if (document.fullscreenElement) {
    player.style.cursor = 'default';
    controls.style.opacity = 1;
    clearTimeout(timerCursor);
    timerCursor = setTimeout(() => {
      player.style.cursor = 'none';
      controls.style.opacity = 0;
      }, 3000);
  };
});

document.addEventListener('fullscreenchange', () => {
  if (!document.fullscreenElement) {
    clearTimeout(timerCursor);
    player.style.cursor = 'default';
    controls.style.opacity = 1;
  };
});

console.log(`
Результаты самопроверки:
  1. Разобраться в коде чужого проекта, понять его, воспроизвести исходное приложение.
      Правки приветствуются, если они не ухудшают внешний вид и функционал исходного проекта - (+10 баллов);
  2. Дополнить проект обязательным функционалом, указанным в описании задания.
      Реализовано управление плеером с клавиатуры (+10 баллов):
      - клавиша Пробел — пауза;
      - клавиша M (англ) — отключение/включение звука;
      - клавиша > (SHIFT+,) — ускорение воспроизведения ролика;
      - клавиша < (SHIFT+.) — замедление воспроизведения ролика;
      - клавиша F — включение/выключение полноэкранного режима.
  3. Дополнить проект дополнительным функционалом на выбор из тех, которые перечислены в описании задания.
      Добавить поддержку других горячих клавиш из YouTube - 2 балла за каждую дополнительную горячую клавишу.
      Добавлена поддержка следующих грячих клавиш из YouTube:
      'k' - приостановить или продолжить воспроизведение (+2 балла);
      'j' - перемотать ролик на 10 секунд назад (+2 балла);
      'l' - перемотать ролик на 10 секунд вперед (+2 балла);
      ',' - перейти к предыдущему кадру (когда воспроизведение приостановлено) (+2 балла);
      '.' - перейти к следующему кадру (когда воспроизведение приостановлено) (+2 балла);
      '0..9' - перейти к определенному моменту видео (например, при нажатии на цифру '7' ролик будет перемотан
                до временной отметки, которая соответствует 70% от длительности видео) (+2 балла);
      '↑' - увеличить громкость (+2 балла);
      '↓' - уменьшить громкость (+2 балла);
      '←' - перемотать видео на 5 сек. назад (+2 балла);
      '→' - перемотать видео на 5 сек. вперед (+2 балла);
  4. Также реализован следующий дополнительный функционал:
      - отображение текущей громкости, скорости воспроизведения и пр., при их изменении;
      - 'умное' управление громкостью как в YouTube;
      - кастомная панель управления в режиме fullscreen;
      - 'умное' исчезновение курсора и панели управления в режиме fullscreen;
  Итого: не менее 40 баллов за выполненную работу.
  Т.к. за задание максимум 30 баллов, то и результат выполнения задания 30 баллов.
`);