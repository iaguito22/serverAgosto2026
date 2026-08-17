# Léeme antes de tocar nada

Este proyecto ya ha estado roto una vez por hacer cambios "razonables" sin comprobarlos.
Lo que sigue no son manías: cada punto viene de un fallo real que costó horas de encontrar.

Proyecto: modpack de Minecraft **1.21.11 / Fabric Loader 0.19.3**, en cuatro variantes
(calidad, intermedia, rendimiento, potato) más un zip de servidor. **67 mods de cliente,
25 de servidor, 13 resource packs.**

---

## Las tres reglas del dueño del proyecto

1. **Respuestas cortas y al grano.** Tiene TDAH. Nada de resúmenes largos ni cierres
   rituales.
2. **Lo más actualizado de cada mod, *si funciona*.** Actualizar por actualizar no vale.
3. **Todo cambio hay que verlo en una captura o en el log del juego.** Que compile, que
   arranque o que suban los FPS **no es prueba de nada**. Si dices que algo funciona, tiene
   que haber una captura o una línea de log detrás.

---

## Lo que se rompió la última vez (no lo repitas)

| Qué se hizo | Qué pasó |
|---|---|
| Instalar **EMF** y **ETF** creyendo que hacían falta para Fresh Animations | Dos manos en pantalla en Windows y las animaciones de armas y lámparas muertas. **Fresh Animations 1.21.11 no necesita ninguno de los dos.** Están en `modpacks/perf-1.21.11/mods-retirados/`, déjalos ahí |
| Meter `options.txt` entero en los zips | El instalador lo copiaba encima y le pisaba al jugador el FOV, los controles y el sonido |
| Reescribir el `.bat` de Windows con bloques `( ... )` y PowerShell | Moría sin imprimir nada si la carpeta se llamaba `calidad(1)`, y decía "listo" aunque no hubiera hecho nada |
| Borrar la escritura del JSON en `FpsBench.java` | Las mediciones dejaron de dar ningún número |
| Quitar el mod de medida de `mods-full` | El juego se quedaba en el menú, sin abrir el mundo |
| Añadir una espada de diamante al arnés de captura | Salía en primer plano tapando justo la vegetación que había que mirar |
| Aplastar las cuatro variantes con los mismos ajustes | potato tenía `graphicsMode:2` y sombras de entidades |
| Dejar `dropBlocks: true` | Las casas se rompían solas |

---

## Cosas que no se deducen de ningún sitio y cuestan horas

**`options.txt`: gana la última aparición de cada clave.** Comprobado abriendo el juego, no
de oídas. Por eso los instaladores **añaden al final** en vez de buscar y reemplazar: con
comillas y corchetes de por medio (`resourcePacks:[...]`) editar línea a línea es un
suicidio. Al salir, Minecraft reescribe el fichero limpio y las repetidas desaparecen solas.

**Si el `options.txt` del jugador no acaba en salto de línea**, lo primero que añadas se
pega a su última clave y el juego **ignora las dos**. Esto tuvo todas las mediciones
corriendo sin un solo resource pack cargado durante días. Los instaladores cierran la línea
antes de añadir; `bench.py` también.

**Hay resource packs que viven dentro del jar del mod** y hay que listarlos igual que los
de fichero, o no se activan:
`continuity:default` (sin él el cristal no conecta), `continuity:glass_pane_culling_fix`,
`cullleaves:smartleaves`, `controlify:legacy_console`.

**Escribir una lista de resource packs desactiva todo lo que no esté en ella**, incluidos
los packs que un mod registra como `DEFAULT_ENABLED`. Esos el juego los enciende solo **la
primera vez** y los deja escritos en `options.txt`; en una instalación nueva no se nota que
falten, pero al aplicar la lista sobre el `options.txt` de alguien que ya había jugado, se
apagan y no vuelven. Los dos que hay aquí: **`holdmyitems:pack_test`** (el mod HMI, que es
quien hace las animaciones de primera persona: poses de mano, modelos 3D de baldes y cubos,
animaciones de beber) y **`atmosfera:dungeons`**. La lista buena es la que el propio juego
deja escrita en `options.txt` después de aceptarla: cópiala de ahí y no la inventes, que
un id que no existe se ignora en silencio.

**Physics Mod y EMF: usa EMF 3.1.1, no la última.** Physics Mod 3.1.40 trae un mixin
compilado contra la firma vieja de `EMFModelPartVanilla` (4 parámetros). De EMF 3.2 en
adelante el constructor lleva uno más, el mixin no encaja, salta
`InvalidInjectionException` y **EMF revienta a mitad de inicializarse**, dejando los
modelos de entidad a medias. Comprobado leyendo el bytecode de las cinco versiones de EMF y
arrancando el juego con las dos combinaciones.

**Y EMF/ETF hacen falta**: Fresh Animations son ficheros CEM de OptiFine, que en Fabric solo
lee EMF; Bray's Zombie Overhaul necesita además ETF. Quitarlos deja tres packs de adorno.

**No pongas `version:` en `ajustes-video.txt`.** Es la versión del formato de opciones y no
es asunto del instalador.

**El aviso de "mods desactualizados" de Xaero bloquea la pantalla de título** y deja
colgadas las mediciones automáticas. El interruptor de verdad es
`allow_internet_access = false` en `config/xaero/lib/common.cfg`, **no** el
`updateNotification` de `xaerominimap.txt`.

**Los `.bat` necesitan CRLF y ASCII puro.** Nada de tildes ni de caracteres de dibujo. Y
toda ruta va con `!VARIABLE!` (expansión retardada) y las condiciones por subrutina
(`call :etiqueta`), porque un paréntesis en el nombre de la carpeta cierra los bloques
`( ... )` antes de tiempo.

**Cuidado con `if not exist X cmd1 & cmd2`**: el `&` se ejecuta siempre, exista o no. Usa
`goto :etiqueta`.

**wine sirve para probar los `.bat`** (`wine cmd /c script.bat`), incluso los colores ANSI y
una carpeta llamada `calidad(1)`. Pero **no trae PowerShell y no implementa `findstr /v`
ni `/b`**: se los salta, no falla, y te devuelve un fichero vacío mientras parece que ha
ido bien.

**Los mods se bajan de Modrinth.** CurseForge devuelve 403 (probado el 15/08/2026).

---

## Qué hay en cada sitio

| Carpeta | Qué es |
|---|---|
| `DESCARGAS/` | los cinco zips que se publican, y `LEEME.md` |
| `modpacks/empaquetar.sh` | los rehace; usa `hacer-zip.py` porque aquí no hay comando `zip` |
| `modpacks/perfiles/<variante>/` | config, shaderpacks y `ajustes-video.txt` de cada variante |
| `modpacks/instaladores/` | los cuatro scripts (instalar y restaurar, Windows y Linux) |
| `modpacks/perf-1.21.11/mods-full/` | los 67 mods de cliente. **Exactamente lo que se distribuye** |
| `modpacks/perf-1.21.11/mods-servidor/` | los 25 del servidor |
| `modpacks/perf-1.21.11/mods-retirados/` | los que se probaron y se quitaron. No los devuelvas sin motivo |
| `modpacks/perf-1.21.11/bench.py` | el arnés de medida |
| `modpacks/fpsbench/` | el mod que mide, en Java. Se compila con `./gradlew build` |
| `web/` | **el único repositorio git**. Se despliega solo a GitHub Pages al hacer push |
| `PENDIENTE.md` | estado actual y qué falta |

---

## Reglas de trabajo

**El zip no lleva `options.txt`.** Solo `ajustes-video.txt`, con las 10 líneas de vídeo de
la variante y la lista de resource packs. Si vuelves a meter `options.txt`, le pisas al
jugador sus ajustes personales.

**`mods-full` es lo que se distribuye, sin extras.** El mod de medida lo copia `bench.py`
al vuelo. No lo metas ahí.

**Las variantes llevan los mismos mods menos Distant Horizons, que va solo en calidad e
intermedia.** Lo demás es configuración (shader, render distance, qué packs vienen activos).
`empaquetar.sh` quita el jar de DH en potato y rendimiento porque **el mod cobra un fijo por
estar cargado y ese fijo no baja tocando el radio**: en intermedia, radio 200 y 128 miden lo
mismo, y quitarlo entero sube de 80 a 127 FPS. Con horizontes cortos no se amortiza (potato
171 con DH, 285 sin; rendimiento 141 con DH barata, 157 sin). Donde sí se queda, va con la
config barata: 1 hilo, ratio 0.2, `enableSsao=false`, sin textura de ruido, transparencia
`FAST`. Fuera de DH, si te ves quitando mods para aligerar una variante, algo va mal — está
medido que quitar 14 mods de adorno la deja *peor*, no mejor.

**El servidor solo lleva lo que necesita el servidor.** Un mod marcado
`"environment": "client"` en su `fabric.mod.json` ni siquiera se carga ahí: no lo pongas.
Lo que sí tiene que ir es todo lo que genere terreno o sirva *tags* de datapack, porque el
cliente las recibe del servidor.

**Las versiones de los mods de generación tienen que ser idénticas** en `mods-full` y en
`mods-servidor`, o el terreno sale distinto y se nota la costura.

**Después de tocar un zip**, rehazlos con `./modpacks/empaquetar.sh` y súbelos con
`gh release upload v1 <zip> --clobber` desde `web/`. Los cuatro de cliente salen byte a byte
iguales si no has cambiado nada, así que solo hay que subir los que cambien de tamaño.

**Antes de decir que el servidor va**, arráncalo de verdad: bájate el server launcher de
Fabric de `meta.fabricmc.net`, pon `eula=true` y mira que llegue a `Done (Xs)!` sin
excepciones.

---

## Medir sin engañarte

**Mide en frío, y entre pasada y pasada también.** Una tanda entera salió un 10% por debajo
de otra idéntica media hora antes, con Tctl a 97,5 °C y la GPU caída de 1950 a 1762 MHz. Peor
aún: una tanda que empezó a 43 °C y acabó a 98 dio dos conclusiones falsas (que bajar el radio
de DH daba +22%, y que quitar packs de flora *costaba* un 12%). Copia el patrón de
`tandaOBJ2.sh`: cuatro minutos de enfriado ANTES de cada pasada, dos pasadas por
configuración, y la temperatura anotada en cada una. A 46 °C los números son repetibles.

**El mundo de pruebas trae los LODs en un sqlite.** Cambiar la calidad o el radio de DH
invalida ese caché y el mod lo reconstruye durante la medida: la configuración "más barata"
sale peor que la cara. Para comparar calidades de DH hay que recalentar el mundo.

**El campo `ventana` de `results.jsonl` no significa nada** (lee el tamaño mientras la
ventana se mapea). El tamaño real es `ancho`/`alto`.

**Lo que cuesta son los resource packs, y solo sin shader.** Con los ajustes de potato: solo
Fabric API 312 FPS, los 68 mods 295, los 68 mods con los 13 packs 177. Quitando los cuatro de
animación de entidad se pasa de 174/191 a 243/244; los dos de colormaps, a 240/234. Pero en
intermedia y calidad esos mismos recortes dan **exactamente los mismos FPS**: con shader manda
la GPU. Por eso potato y rendimiento traen 7 packs activos de 13 y las otras dos los 13.

**Sildur's Enhanced Default Fast no ilumina los LODs de DH**: horizonte lejano en negro. Es el
shader más rápido de los cinco, pero solo vale en potato y rendimiento, que van sin DH.

---

Última revisión: 18/08/2026. Si algo de aquí ya no es cierto, corrígelo en este fichero.
