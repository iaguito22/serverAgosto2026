# Server Agosto 2026

### 🌐 **[Ver la web → iaguito22.github.io/serverAgosto2026](https://iaguito22.github.io/serverAgosto2026/)**

Modpack de Minecraft **1.21.11 (Fabric)** en cuatro variantes, con Terralith y Distant
Horizons. Calidad e intermedia llevan los 69 mods; rendimiento y potato son las mismas menos
Distant Horizons, que a esas distancias cuesta más de lo que da.

| Variante | Shader | FPS medidos | Descarga |
|---|---|---:|---|
| **Calidad** | Photon (BSL y Solas incluidos) | 63 | [calidad.zip](https://github.com/iaguito22/serverAgosto2026/releases/download/v1/calidad.zip) |
| **Intermedia** | E-LITE | 116 | [intermedia.zip](https://github.com/iaguito22/serverAgosto2026/releases/download/v1/intermedia.zip) |
| **Rendimiento** | E-LITE ligero | 157 | [rendimiento.zip](https://github.com/iaguito22/serverAgosto2026/releases/download/v1/rendimiento.zip) |
| **Potato** | ninguno | 285 | [potato.zip](https://github.com/iaguito22/serverAgosto2026/releases/download/v1/potato.zip) |
| Servidor | — | — | [servidor.zip](https://github.com/iaguito22/serverAgosto2026/releases/download/v1/servidor.zip) |

Medidos a 1080p en una RTX 3050 Laptop **en modo juego**, con los resource packs cargados de
verdad, en frío (cuatro minutos de enfriado antes de cada pasada) y con dos pasadas por
configuración. Cada zip trae instalador para
Windows y para Linux: lo descomprimes donde quieras, lo ejecutas, y él guarda tus carpetas
actuales en una copia antes de poner las nuevas.

---

## Sobre esta web

Copia de la web del proyecto *selector de mods 1.21.1 create*, con la paleta cambiada
(azul → verde selva con acentos ámbar) y el contenido adaptado a este modpack.

## Arrancarla

```bash
npm install
npm run dev      # desarrollo, http://localhost:5173
npm run build    # genera dist/
```

## Qué se cambió respecto al original

| | Antes | Ahora |
|---|---|---|
| Paleta | azul (`#2563eb`) sobre azul marino | verde esmeralda (`#10b981`) sobre verde oscuro, acento ámbar |
| Variantes | 3 (potato / balance / high) | **4** (calidad / intermedia / rendimiento / potato) |
| Versión | 1.21.1 NeoForge | 1.21.11 Fabric |
| Comparativa | RTX 3050 / integrados, 1080p / 1440p | RTX 3050 en **modo ahorro (medido)** y **modo juego (estimado)** |
| Vídeos | carrusel de previews | capturas fijas (no hay vídeos aún) |
| Mods opcionales | JourneyMap, Jade, JEI, AppleSkin… | Xaero's, Shoulder Surfing, Physics Mod, Auto HUD… |

Dos fallos del original que había que arreglar para que funcionara con estos datos:

- La ficha de detalle hacía `fps.split('(')[1].replace(...)`. Si el texto de FPS no traía
  paréntesis, la página entera se quedaba **en blanco**. Ahora la media va en su propio
  campo (`performance.media`).
- El detalle elegía carrusel o captura con `selectedPack.videos ?`, y un array vacío es
  *truthy* en JavaScript: nunca se veía la captura. Ahora comprueba `videos.length > 0`.

## Los zips de descarga

Los botones apuntan a `DESCARGAS/<variante>.zip`, relativo a la raíz de la web. Tienes dos opciones:

1. **Subirlos a GitHub Releases** (como en el proyecto anterior) y cambiar `downloadUrl`
   en `src/App.jsx` por la URL de cada release.
2. **Copiar la carpeta** `../DESCARGAS/` dentro de `dist/` al desplegar. Ojo: son ~370 MB
   por variante, demasiado para un repositorio normal de GitHub Pages.

La opción 1 es la buena.

## Pendiente

- Vídeos de preview de cada shader (el original los tenía; aquí solo hay capturas).
- La pestaña de servidor sigue apuntando a la IP y al proxy de estado del proyecto
  anterior: `141.253.109.219` y `mc-status-proxy.igl2005.workers.dev`. Cámbialos cuando
  el servidor nuevo esté en pie.
