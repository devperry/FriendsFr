/* ==========================================================
   utils.js — herramientas reutilizables (sonido, efectos, tiempo).
   Cada una es un objeto con nombre; no dependen de las diapositivas.
   ========================================================== */

/* ---------- Sonido (Web Audio, sin archivos) ---------- */
const Sound = (() => {
  let ctx = null;

  function beep(freq, duration = 0.15, type = 'square', volume = 0.07) {
    try {
      // El audio solo arranca tras la primera tecla del usuario.
      ctx = ctx || new (window.AudioContext || window.webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = type;
      osc.frequency.value = freq;
      gain.gain.value = volume;
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch (err) {
      /* sin audio disponible: el show sigue igual */
    }
  }

  return {
    good: () => { beep(660, 0.1); setTimeout(() => beep(990, 0.22), 110); },
    bad:  () => beep(150, 0.4, 'sawtooth'),
    tick: () => beep(440, 0.08),
    pop:  () => beep(520 + Math.random() * 200, 0.12),
  };
})();

/* ---------- Efectos visuales ---------- */
const Effects = (() => {
  const ICONS = ['🎉', '🤝', '⭐', '🔥', '💛', '✨'];

  function confetti(amount = 28) {
    for (let i = 0; i < amount; i++) {
      const piece = document.createElement('div');
      piece.className = 'confetti';
      piece.textContent = ICONS[i % ICONS.length];
      piece.style.left = Math.random() * 100 + 'vw';
      piece.style.animationDelay = Math.random() * 0.7 + 's';
      document.body.appendChild(piece);
      setTimeout(() => piece.remove(), 3500);
    }
  }

  return { confetti };
})();

/* ---------- Cuenta regresiva (una sola activa a la vez) ---------- */
const Countdown = (() => {
  let timerId = null;

  function stop() {
    clearInterval(timerId);
    timerId = null;
  }

  // onTick(segundosRestantes) se llama al iniciar y cada segundo.
  function start(seconds, { onTick, onEnd } = {}) {
    stop();
    let left = seconds;
    if (onTick) onTick(left);
    timerId = setInterval(() => {
      left--;
      if (onTick) onTick(left);
      if (left <= 0) {
        stop();
        if (onEnd) onEnd();
      }
    }, 1000);
  }

  const format = s => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;

  return { start, stop, format };
})();
