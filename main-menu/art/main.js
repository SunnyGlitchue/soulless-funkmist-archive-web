window.addEventListener('DOMContentLoaded', () => {
  if (localStorage.getItem('musicActivated') === 'true') {
    const music = new Audio('menuSong.mp3');
    music.loop = true;
    music.play();
  }
});