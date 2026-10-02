/* ==========================================================
   config.js — TODO el contenido editable está aquí.
   No hace falta tocar los demás archivos para cambiar textos.
   ========================================================== */
const CONFIG = {
  titulo: 'El compañerismo',
  expositores: ['Miguel', 'Aleska'],
  bienvenida: 'Gracias por elegirnos los mejores amigos del salón. Hoy les toca jugar.',

  /* ---------- Exposición ---------- */
  exposicion: {
    queEs: {
      titulo: '¿Qué es el compañerismo?',
      texto: 'Es la unión entre personas que comparten un lugar y un objetivo. Se nota en cómo nos tratamos cuando nadie nos mira.',
    },
    // tema: pink | cyan | green | yel | indigo | dark
    valores: [
      { tema: 'pink',  emoji: '🫶', nombre: 'Respeto', texto: 'Escuchar aunque pensemos distinto.' },
      { tema: 'cyan',  emoji: '🙌', nombre: 'Ayuda',   texto: 'Dar una mano sin que la pidan.' },
      { tema: 'green', emoji: '🛡️', nombre: 'Lealtad', texto: 'Estar en las buenas y en las malas.' },
      { tema: 'yel',   emoji: '👟', nombre: 'Empatía', texto: 'Ponerte en el lugar del otro.' },
    ],
    cierre: {
      titulo: 'Sin compañerismo no se gana',
      texto: 'Si uno se queda atrás, nadie pasa. Ahora vamos a comprobarlo.',
    },
  },

  /* ---------- Quiz ---------- */
  quiz: {
    segundos: 15, // tiempo por pregunta
    // correcta: número de la opción correcta (0 = A, 1 = B, 2 = C, 3 = D)
    preguntas: [
      { pregunta: '¿Qué es el compañerismo?', opciones: ['Competir contra todos', 'Apoyo y respeto entre compañeros', 'Copiar la tarea', 'Ignorar al resto'], correcta: 1 },
      { pregunta: 'Un compañero se cae en el recreo. ¿Qué haces?', opciones: ['Me río', 'Sigo jugando', 'Lo ayudo a levantarse', 'Lo grabo'], correcta: 2 },
      { pregunta: 'Ponerte en el lugar del otro se llama…', opciones: ['Empatía', 'Suerte', 'Chisme', 'Orgullo'], correcta: 0 },
      { pregunta: '¿Cuál es un acto de lealtad?', opciones: ['Hablar mal a sus espaldas', 'No dejarlo solo cuando te necesita', 'Contar sus secretos', 'Cambiar de grupo'], correcta: 1 },
      { pregunta: 'Alguien piensa distinto a ti. Lo respetas si…', opciones: ['Lo escuchas', 'Lo callas', 'Te burlas', 'Lo ignoras'], correcta: 0 },
      { pregunta: 'En un trabajo en equipo, uno se queda atrás. Lo mejor es…', opciones: ['Que se arregle solo', 'Ayudarlo a llegar', 'Dejarlo', 'Culparlo'], correcta: 1 },
      { pregunta: '¿Qué valor es dar una mano sin que te la pidan?', opciones: ['Ayuda', 'Orgullo', 'Pereza', 'Envidia'], correcta: 0 },
      { pregunta: 'Un buen compañero también es el que…', opciones: ['Se burla del error', 'Guarda secretos y no humilla', 'Se queda con todo', 'Habla más fuerte'], correcta: 1 },
    ],
  },

  /* ---------- ¿Quién es quién? ---------- */
  // Para agregar una frase, copia una línea y cámbiala.
  quienEsQuien: {
    frases: [
      { frase: 'Ya perdí, ya perdí', quien: 'Yamir Arteaga' },
      // { frase: 'Escribe aquí la frase', quien: 'Nombre y apellido' },
    ],
  },

  /* ---------- Pico Park (se activa en el paso 3) ---------- */
  picoPark: { activo: false },

  /* ---------- Cierre ---------- */
  final: {
    titulo: 'Gracias',
    texto: 'Antes de salir, les tenemos un regalo...',
  },
  patio: {
    minutos: 5,
    mensaje: 'Salgan sin correr.',
  },
};
