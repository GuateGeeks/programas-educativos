## Context

El paquete SMARS v2 incluye siete modelos STL descargados de la colección pública de Kevin Thomas, bajo **CC BY-NC-SA**. Hoy el programa no los distribuye: los enlaza. Eso deja las sesiones 3 y 4 dependiendo de catálogos externos.

Medidas tomadas sobre los archivos reales:

| Modelo | Triángulos | Disco | gzip |
|---|---:|---:|---:|
| `powered_wheel` | 38 880 | 1 898K | 743K |
| `chassis_sl` | 36 996 | 1 806K | 621K |
| `unpowered_wheel_sl` | 22 694 | 1 108K | 422K |
| `ultrasonic_1` | 14 284 | 697K | 220K |
| `holding_board_9v` | 3 618 | 176K | 33K |
| `mechanical_track` | 2 924 | 142K | 25K |
| `ultrasonic_2b_v2` | 632 | 30K | 6K |
| **Total** | | **5.7M** | **2.0M** |

Los siete son STL **binario**, así que no hay ganancia por reconvertir formato. La compresión aporta 2.8×.

**Restricciones:**
- El programa no es comercial, así que la cláusula NC de CC BY-NC-SA se satisface
- El contenido pedagógico de las sesiones no se modifica
- El sitio debe seguir compilando y las URLs de CiudadBots no deben moverse

## Goals / Non-Goals

**Goals:**
- Distribuir los siete modelos desde el propio sitio, con atribución
- Permitir ver cada pieza en 3D sin instalar nada, y descargarla para el slicer
- Colocar los visores donde el modelo es el objeto de la actividad, no donde el componente simplemente se menciona
- Corregir las afirmaciones de licencia que este cambio vuelve falsas

**Non-Goals:**
- No convertir, decimar ni optimizar los modelos
- No modificar bloques pedagógicos de las sesiones
- No añadir dependencias a `package.json`
- No crear modelos propios ni derivados

## Decisions

### D1: Copia única servible, sin derivados

**Decisión:** Los siete STL se copian una vez a `static/models/guategeeks/`. El mismo archivo alimenta el visor y el botón de descarga. No se genera GLB, ni versión decimada, ni miniatura.

**Rationale:**
- **ShareAlike.** Alojar el archivo no crea un derivado, pero una malla decimada o convertida **sí lo sería** y heredaría CC BY-NC-SA. Servir el original evita esa cadena por completo.
- El estudiante necesita el STL exacto: es lo que come el slicer, y es la versión con la que el programa fue probado.
- Una sola copia no puede divergir de sí misma.

**Asimetría deliberada con D11 del cambio anterior:** para los `.ino` se evitó la copia en `static/` importando el archivo como string y generando un Blob en el navegador. **Aquí eso sería un error**: 1.9 MB de geometría como cadena en el bundle es peor que el problema que resuelve. El mismo principio de fuente única tiene implementación distinta según la escala del artefacto.

### D2: `three` desde CDN con versión fijada

**Decisión:** El visor carga `three` y `STLLoader` desde `https://esm.sh/three@0.160.1`, con `await import()` dentro de `BrowserOnly`.

```js
const THREE = await import('https://esm.sh/three@0.160.1');
const {STLLoader} = await import('https://esm.sh/three@0.160.1/examples/jsm/loaders/STLLoader.js');
```

**Por qué esm.sh y no unpkg o jsdelivr crudo:** `STLLoader.js` importa con specifier bare (`from 'three'`), que el navegador no resuelve sin import map. Verificado que esm.sh lo reescribe:

```js
/* esm.sh - three@0.160.1/examples/jsm/loaders/STLLoader */
import "/three@0.160.1/es2022/three.mjs";
export * from "/three@0.160.1/es2022/examples/jsm/loaders/STLLoader.mjs";
```

**La versión va fijada, nunca `@latest`.** Con `latest`, el visor se rompería el día que three publique un cambio incompatible, sin que nadie tocara el repositorio.

**Consecuencia aceptada — se pierde el modo sin conexión.** El proyecto fuente se llama «Aula Autónomo» y su premisa es publicar en una intranet escolar; con el visor dependiendo de un host externo, en una red aislada queda en blanco. Se advirtió y el responsable eligió CDN. `three` sigue en `package.json` porque `CityBotsHero` lo usa desde el bundle, así que conviven las dos vías.

**Alternativa descartada:** importar el `three` local, como hace `CityBotsHero`. Conserva el modo sin conexión y no añade dependencia externa, pero fue decisión explícita usar CDN.

### D3: Visible siempre, inicializado al entrar en viewport

**Decisión:** El visor no requiere clic: se muestra e inicializa solo. Pero la carga de `three` y del STL se dispara cuando el bloque entra en viewport, mediante `IntersectionObserver`.

**Rationale:** Cumple «siempre visible» —no hay interacción previa— sin que cinco visores compitan por la red al abrir la página. En `materiales`, con los siete, la diferencia es entre 2.0 MB de golpe y lo que el lector realmente alcanza.

**Degradación:** si WebGL no está disponible o el CDN falla, el bloque muestra el nombre del modelo, su tamaño y el enlace de descarga. La página nunca queda rota por el visor, igual que `CityBotsHero` declara para su escena.

### D4: Dónde va cada visor

**Criterio:** el visor entra donde el modelo **es el objeto de la actividad**, no donde el componente simplemente aparece mencionado.

| Página | Modelos | gzip | Justificación |
|---|---|---:|---|
| `materiales` | los 7 | 2.0M | Catálogo canónico. Es la página que se visita a propósito |
| Sesión 1 · Sistemas | `chassis_sl` | 621K | Se identifican subsistemas antes de tener el robot físico |
| Sesión 3 · Slicer | `chassis_sl`, `powered_wheel` | 1.4M | Es lo que se carga al slicer y lo que se mide |
| Sesión 4 · QC | `mechanical_track`, `holding_board_9v` | 58K | Comparar la pieza impresa contra el modelo *es* la actividad, y son las dos piezas más livianas |
| Sesión 5 · Ensamblaje | `mechanical_track`, `unpowered_wheel_sl` | 447K | El eslabón que se imprime 32 veces y la rueda que se monta |

**Fuera: sesión 8.** Existen `ultrasonic_1` y `ultrasonic_2b_v2`, pero esa sesión trata de tiempo de vuelo, error y dispersión. La carcasa del sensor no es pedagógicamente central y costaría 226K sin aportar. Se enlaza desde `materiales`.

**Nota de peso:** `mechanical_track` pesa 25K gzip y es la pieza que se imprime 32 veces; las dos ruedas y el chasis concentran el 90 % del total. Por eso las sesiones 4 y 5 salen baratas y la 3 es la cara.

### D5: Las afirmaciones de licencia se corrigen, no se matizan

**Decisión:** Reescribir los dos textos que este cambio vuelve falsos, y declarar la condición NC como restricción vigente del paquete.

| Ubicación | Dice hoy | Estado |
|---|---|---|
| `index.mdx` | «los modelos 3D … no se redistribuyen aquí» | **Falso** tras este cambio |
| `licencias.mdx` | «No incluya los modelos 3D … Enlácelos» | **Falso** tras este cambio |

**Rationale:** Un docente que detecte una afirmación falsa en la página de licencias deja de confiar en el resto del documento, incluidas las partes que sí importan legalmente. La corrección debe ser explícita, no un matiz añadido.

**Lo que pasa a declararse:**
- Los modelos se redistribuyen bajo CC BY-NC-SA, con la atribución textual que la fuente exige
- **El paquete completo queda sujeto a la condición No Comercial.** Si GuateGeeks se ofreciera alguna vez como programa pagado, los modelos tendrían que retirarse. Esto deja de ser la pregunta abierta 7 del cambio original y pasa a ser una condición del material
- Se mantiene la nota sobre el conflicto entre catálogos: la fuente advierte que un espejo declara metadatos distintos, por lo que no se afirma permiso comercial

## Risks / Trade-offs

| Riesgo | Mitigación |
|---|---|
| **El CDN cae o cambia** → el visor deja de funcionar | Versión fijada; degradación a nombre, tamaño y enlace de descarga, de modo que la página sigue siendo útil |
| **Peso en la sesión 3** → 1.4 MB gzip en una sola página | Carga al entrar en viewport, no al abrir. Si resulta excesivo en aula, la alternativa es dejar solo el chasis ahí y mover la rueda a `materiales` |
| **Se asume que el host comprime `.stl`** → si no lo hace, el costo es el de disco, casi 3× | Verificar las cabeceras de respuesta tras el despliegue; es una tarea concreta, no una suposición que se deja correr |
| **Dos copias de three en runtime** → la del bundle para `CityBotsHero` y la del CDN para el visor | No coinciden en la misma página: `CityBotsHero` vive en CiudadBots y el visor en GuateGeeks. Registrado por si algún día se juntan |
| **Repositorio 5.7 MB más pesado** → binarios que git no delta-comprime | Son archivos estables que no cambian; se adoptan una vez |
| **NC vincula el paquete** → bloquea un modelo de negocio futuro | Declarado explícitamente en la página de licencias, para que la restricción sea visible antes de tomar esa decisión |

## Migration Plan

**Fase 1: Adopción de los modelos**
1. Copiar los siete STL a `static/models/guategeeks/`
2. Registrar en un manifiesto el origen, la fecha de adopción y la licencia de cada uno
3. Verificar que los archivos servidos son idénticos byte a byte a los del paquete fuente

**Fase 2: Componente**
1. Crear `StlViewer` con `BrowserOnly`, carga diferida por viewport y degradación sin WebGL
2. Verificar tipos y que el bundle no crece por importar three

**Fase 3: Colocación**
1. Catálogo de los siete en `materiales`
2. Visores en las sesiones 1, 3, 4 y 5
3. Comprobar que ningún bloque pedagógico cambió

**Fase 4: Licencias**
1. Corregir `index.mdx` y `licencias.mdx`
2. Declarar la condición NC como restricción del paquete
3. Añadir la atribución textual junto a cada descarga

**Fase 5: Verificación**
1. `npm run build` y `tsc --noEmit` en verde
2. URLs de CiudadBots sin cambios
3. Los siete modelos resuelven en las rutas publicadas
4. Ninguna afirmación de licencia contradice lo que el sitio realmente distribuye

**Rollback:** Retirar los visores y los archivos de `static/` devuelve el sitio al estado anterior; solo habría que restaurar los dos textos de licencia.

## Open Questions

1. **Compresión del host:** ¿el servidor comprime `.stl`? De ello depende que el costo real sea 2.0 MB o 5.7 MB. Verificable con las cabeceras tras el despliegue.
2. **Peso de la sesión 3:** ¿1.4 MB es aceptable en las conexiones de las escuelas destinatarias? Si no, mover `powered_wheel` a `materiales`.
3. **Modo sin conexión:** si más adelante se prioriza la intranet escolar, revertir D2 al `three` local es un cambio pequeño y aislado.
4. **Resto del paquete fuente:** hay diagramas y checklists en `smars_aula_autonomo_v2_fuentes_publicas/assets/` que tampoco se están aprovechando. ¿Se revisan en un cambio aparte?
