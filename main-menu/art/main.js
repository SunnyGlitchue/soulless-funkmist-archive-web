window.addEventListener('DOMContentLoaded', () => {
  if (localStorage.getItem('musicActivated') === 'true') {
    const music = new Audio('https://sunnyglitchue.github.io/soulless-funkmist-archive-web/cdn/predator/Inst%20(4).ogg');
    music.loop = true;
    music.play();
  }
});