# Web — Server Agosto 2026

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
