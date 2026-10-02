# FriendsForReal — Anfitrión

Presentación lineal para proyector. Se maneja con el teclado:
`→` / `Espacio` avanzar, `←` volver, `F` pantalla completa.

## Estructura

| Archivo | Para qué sirve |
|---|---|
| `index.html` | Página principal, solo carga los demás archivos |
| `css/styles.css` | Colores (arriba, en `:root`) y estilos por sección |
| `js/config.js` | **Todos los textos**: preguntas, frases, valores, tiempos |
| `js/utils.js` | Sonido, confeti y cuenta regresiva |
| `js/slides.js` | Cómo se ve cada tipo de pantalla y el orden del show |
| `js/main.js` | Navegación con teclado |

## Cómo cambiar cosas

- **Agregar una pregunta o frase:** copia una línea en `config.js`.
- **Cambiar el orden del show:** edita `Slides.build()` al final de `slides.js`.
- **Agregar una pantalla nueva:** crea una función en `slides.js` (usa `info()` como ejemplo) y añádela en `build()`.
- **Cambiar colores:** variables al inicio de `styles.css`.

## Subir a GitHub Pages

Sube todo el contenido (no la carpeta) al repositorio → Settings → Pages → Branch `main`.
