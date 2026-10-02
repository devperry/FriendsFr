/* ==========================================================
   slides.js — define CÓMO se ve cada tipo de diapositiva y
   arma la secuencia completa leyendo CONFIG.

   Una diapositiva es: { theme, html, onEnter }
   Para agregar una nueva: crea una función "constructora" abajo
   y llámala dentro de Slides.build().
   ========================================================== */
const Slides = (() => {
  /* ---------- Helpers ---------- */
  const esc = text => String(text).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const slide = (theme, html, onEnter) => ({ theme, html: `<div class="inner">${html}</div>`, onEnter });
  const celebrate = () => { Sound.good(); Effects.confetti(); };
  const $ = id => document.getElementById(id);
  const LETTERS = ['A', 'B', 'C', 'D'];

  /* ---------- Tipos básicos ---------- */
  // Pantalla simple: emoji + título + texto
  function info({ theme = 'yel', emoji = '', titulo, texto = '', onEnter }) {
    const html = (emoji ? `<div class="emoji">${emoji}</div>` : '')
      + `<h2 class="title">${esc(titulo)}</h2>`
      + (texto ? `<p>${esc(texto)}</p>` : '');
    return slide(theme, html, onEnter);
  }

  /* ---------- Secciones ---------- */
  function portada() {
    const [a, b] = CONFIG.expositores;
    return slide('indigo',
      `<h1 class="hero"><span class="bob">${esc(CONFIG.titulo)}</span></h1>
       <p><span class="pill pill--a">${esc(a)}</span><span class="pill pill--b">${esc(b)}</span></p>
       <p>${esc(CONFIG.bienvenida)}</p>`,
      celebrate);
  }

  function exposicion() {
    const { queEs, valores, cierre } = CONFIG.exposicion;
    return [
      info({ theme: 'yel', emoji: '🤝', titulo: queEs.titulo, texto: queEs.texto }),
      info({ theme: 'indigo', emoji: '🧱', titulo: `${valores.length} valores que lo sostienen`, texto: 'Uno por uno.' }),
      ...valores.map(v => info({ theme: v.tema, emoji: v.emoji, titulo: v.nombre, texto: v.texto, onEnter: Sound.pop })),
      info({ theme: 'dark', emoji: '🎮', titulo: cierre.titulo, texto: cierre.texto }),
    ];
  }

  /* --- Quiz: cada pregunta = 2 pantallas (pregunta con tiempo, luego respuesta) --- */
  function quiz() {
    const { segundos, preguntas } = CONFIG.quiz;

    const options = (p, revealed) => `<div class="options">${p.opciones.map((text, j) => {
      const state = revealed ? (j === p.correcta ? ' option--correct' : ' option--dim') : '';
      return `<div class="option option--${j}${state}"><b>${LETTERS[j]}</b>${esc(text)}</div>`;
    }).join('')}</div>`;

    const heading = (p, i) => `<small>Pregunta ${i + 1} de ${preguntas.length}</small><h2 class="title">${esc(p.pregunta)}</h2>`;

    const startTimer = () => Countdown.start(segundos, {
      onTick: left => {
        const fill = $('timer-fill');
        fill.style.width = (left / segundos * 100) + '%';
        fill.classList.toggle('timer__fill--low', left <= 5);
        $('timer-num').textContent = left;
        if (left > 0 && left <= 5) Sound.tick();
      },
      onEnd: Sound.bad,
    });

    const intro = info({
      theme: 'indigo', emoji: '⚡', titulo: 'Quiz del compañerismo',
      texto: `${preguntas.length} preguntas, ${segundos} segundos cada una. Levanten la mano para responder.`,
      onEnter: Sound.good,
    });

    const rounds = preguntas.flatMap((p, i) => [
      slide('dark',
        heading(p, i) + options(p, false)
        + `<div class="timer"><div><i id="timer-fill" class="timer__fill"></i></div><span id="timer-num"></span></div>`,
        startTimer),
      slide('dark',
        heading(p, i) + options(p, true)
        + `<div class="answer">✅ ${LETTERS[p.correcta]}: ${esc(p.opciones[p.correcta])}</div>`,
        Sound.good),
    ]);

    return [intro, ...rounds];
  }

  /* --- ¿Quién es quién?: frase, y luego se revela el nombre --- */
  function quienEsQuien() {
    const { frases } = CONFIG.quienEsQuien;
    if (!frases.length) return [];

    const phrase = f => `<small>¿Quién lo diría?</small><div class="phrase">“${esc(f.frase)}”</div>`;

    return [
      info({ theme: 'pink', emoji: '🕵️', titulo: '¿Quién es quién?', texto: 'Leemos una frase. Adivinen quién la diría.', onEnter: Sound.good }),
      ...frases.flatMap(f => [
        slide('indigo', phrase(f), Sound.tick),
        slide('indigo', phrase(f) + `<div class="name">${esc(f.quien)}</div>`, celebrate),
      ]),
    ];
  }

  /* --- Pico Park: apagado hasta tener la conexión lista --- */
  function picoPark() {
    if (!CONFIG.picoPark.activo) return [];
    return [info({ theme: 'dark', emoji: '🧱', titulo: 'Pico Park', texto: 'Pronto.' })];
  }

  function cierre() {
    const { final, patio } = CONFIG;
    return [
      info({ theme: 'yel', emoji: '🍬', titulo: final.titulo, texto: final.texto, onEnter: celebrate }),
      slide('green',
        `<h2 class="title">¡Al patio!</h2><div class="big" id="patio-timer"></div><p>${esc(patio.mensaje)}</p>`,
        () => Countdown.start(patio.minutos * 60, {
          onTick: left => { $('patio-timer').textContent = left > 0 ? Countdown.format(left) : '¡YA!'; },
          onEnd: () => { Sound.bad(); Effects.confetti(); },
        })),
    ];
  }

  /* ---------- Orden final del show ---------- */
  function build() {
    return [
      portada(),
      ...exposicion(),
      ...quiz(),
      ...quienEsQuien(),
      ...picoPark(),
      ...cierre(),
    ];
  }

  return { build };
})();
