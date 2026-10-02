/* ==========================================================
   main.js — navegación entre diapositivas (teclado y clic).
   Aquí se cambian las teclas si quieren otras.
   ========================================================== */
const Presentation = (() => {
  const KEYS = {
    next: ['ArrowRight', 'ArrowDown', ' ', 'PageDown', 'Enter'],
    prev: ['ArrowLeft', 'ArrowUp', 'PageUp', 'Backspace'],
  };

  const stage = document.getElementById('stage');
  const progress = document.getElementById('progress');
  let slides = [];
  let index = 0;

  function show(n) {
    Countdown.stop(); // al cambiar de pantalla se corta cualquier cuenta anterior
    index = Math.max(0, Math.min(slides.length - 1, n));
    const current = slides[index];
    stage.className = 'theme-' + current.theme;
    stage.innerHTML = current.html;
    progress.style.width = ((index + 1) / slides.length * 100) + '%';
    if (current.onEnter) current.onEnter();
  }

  const next = () => show(index + 1);
  const prev = () => show(index - 1);

  function toggleFullscreen() {
    if (document.fullscreenElement) document.exitFullscreen();
    else document.documentElement.requestFullscreen();
  }

  function onKey(e) {
    if (KEYS.next.includes(e.key)) { e.preventDefault(); next(); }
    else if (KEYS.prev.includes(e.key)) { e.preventDefault(); prev(); }
    else if (e.key === 'Home') show(0);
    else if (e.key.toLowerCase() === 'f') toggleFullscreen();
  }

  function init() {
    slides = Slides.build();
    document.addEventListener('keydown', onKey);
    stage.addEventListener('click', next);
    show(0);
  }

  return { init };
})();

Presentation.init();
