

  const popup = document.getElementById('popup');
  const music = document.getElementById('bg-music');

  if (!popup) {
    console.error("gay alert");
    return;
  }

  popup.addEventListener('click', () => {
    console.log("gay detected");

    popup.style.opacity = '0';
    popup.style.pointerEvents = 'none';

    setTimeout(() => {
      console.log("pe causa");
      popup.remove();
    }, 500);

    if (music) {
      music.volume = 0.5;
      music.play().then(() => {
        console.log("audio reproducido");
      }).catch(err => {
        console.warn("cha, entero fome:", err);
      });
    } else {
      console.warn("mensaje malo muy malo");
    }
  });

  let audioUnlocked = false;

  function unlockAudio() {
    if (audioUnlocked) return;

    const playPromise = music.play();
    if (playPromise !== undefined) {
      playPromise.then(() => {
        audioUnlocked = true;
        console.log("ta elao juan");
        removeUnlockListeners();
      }).catch(() => {
        console.warn("ta elao juan 2 la pelicula");
      });
    }
  }

  function removeUnlockListeners() {
    ['click', 'keydown', 'scroll', 'touchstart', 'pointerdown'].forEach(event =>
      window.removeEventListener(event, unlockAudio)
    );
  }

  ['click', 'keydown', 'scroll', 'touchstart', 'pointerdown'].forEach(event =>
    window.addEventListener(event, unlockAudio)
  );

});
