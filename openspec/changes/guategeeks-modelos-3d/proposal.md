## Why

Las sesiones 3 y 4 piden preparar, imprimir e inspeccionar las piezas del SMARS, pero el programa no distribuye los modelos: `materiales.mdx` enlaza a Thingiverse y SMARSFan. Eso deja la actividad dependiendo de catálogos externos que pueden cambiar de versión o caer, y obliga a un estudiante a salir del material para conseguir el insumo de su propia sesión.

Además, hoy no hay forma de **ver** las piezas antes de imprimirlas. En la sesión 1 el equipo identifica subsistemas sin tener aún el robot físico, y en la 4 debe comparar una pieza impresa contra su diseño teniéndolo solo en la cabeza.

El paquete fuente ya trae los siete modelos descargados. Incorporarlos, con visor y descarga, cierra ambas brechas y devuelve al programa la autosuficiencia que su propio nombre —SMARS **Aula Autónomo**— promete.

## What Changes

- **Adopción de los 7 modelos STL** de `smars_aula_autonomo_v2_fuentes_publicas/assets/3d/public_sources/models/` a `static/models/guategeeks/`, con atribución a Kevin Thomas. Copia única: el mismo archivo se descarga y se renderiza.
- **Componente `StlViewer`**: visor 3D que carga `three` y `STLLoader` desde CDN con versión fijada, dentro de `BrowserOnly`, e inicializa al entrar en viewport. Sin dependencias nuevas en `package.json`.
- **Visores en cinco páginas**: `materiales` (catálogo de los 7) y las sesiones 1, 3, 4 y 5, donde el modelo es el objeto de la actividad. La sesión 8 queda fuera pese a tener dos modelos del sensor: esa sesión trata de tiempo de vuelo y dispersión, no de la carcasa.
- **Descarga por modelo** desde el visor, sirviendo el STL original sin conversión ni decimación.
- **BREAKING para la documentación de licencias**: dos afirmaciones vigentes se vuelven falsas y deben corregirse — `index.mdx` dice que los modelos «no se redistribuyen aquí» y `licencias.mdx` instruye «Enlácelos».
- **La condición No Comercial pasa a vincular el paquete completo.** Deja de ser una pregunta abierta y se convierte en una restricción declarada del material.

## Capabilities

### New Capabilities

- `guategeeks-3d-models`: adopción, atribución y distribución de los siete modelos STL del SMARS, y su visualización en el navegador. Cubre la copia única servible, el visor con carga diferida y versión de biblioteca fijada, la descarga del archivo original, y en qué páginas aparece cada modelo con su justificación pedagógica.

### Modified Capabilities

- `smars-teacher-resources`: la página de materiales pasa de enlazar catálogos externos a alojar el catálogo de modelos con visor y descarga, quedando utilizable sin depender de sitios de terceros.

> **Acoplamiento:** `smars-teacher-resources` existe hoy solo como spec delta del cambio `guategeeks-smars-ciclo-basico`, aún sin archivar. Este cambio debe aplicarse y archivarse después de aquel, en la misma cadena que ya definió `guategeeks-enfoque-tercero-basico`.

## Impact

- **`static/models/guategeeks/`**: 7 archivos STL, 5.7 MB en disco, 2.0 MB transferidos con gzip. `static/` pasa de 5.3 MB a 11 MB.
- **`src/components/StlViewer/`**: componente nuevo más su hoja de estilos.
- **`docs/guategeeks/materiales.mdx`**: catálogo de modelos con visor y descarga, reemplazando la sección que solo enlazaba.
- **`docs/guategeeks/01`, `03`, `04`, `05`**: un bloque de visor por sesión. **No se toca ningún bloque pedagógico** (`Question`, `Context`, `Concepts`, `Phase`, `Materials`, `Reto`, `Evidence`).
- **`docs/guategeeks/licencias.mdx`** y **`index.mdx`**: corrección de las dos afirmaciones que quedan falsas, más el detalle de qué se redistribuye y bajo qué condiciones.
- **Red externa**: el sitio pasa a depender de un CDN para el visor. Hoy todo se sirve desde el propio dominio.
- **Se pierde el funcionamiento sin conexión** del visor en intranets aisladas. Decisión explícita del responsable, registrada en `design.md`.
- **Sin impacto** en los sketches Arduino, el modelo de datos de sesiones, `SessionModule`, `SketchBlock`, las rutas del sitio ni la alineación curricular.
