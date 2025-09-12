document.querySelectorAll('.gallery-item img').forEach(img => {
  img.addEventListener('click', () => {
    const sound = document.getElementById('clickSound');
    if (sound) {
      const clone = sound.cloneNode();
      clone.play().catch(err => {
        console.warn("Your browser doesn't support sounds... so sorry..:", err);
      });
    }
  });
});

document.addEventListener('click', () => {
  const sound = document.getElementById('clickSound');
  if (sound) sound.play().catch(() => {});
}, { once: false });