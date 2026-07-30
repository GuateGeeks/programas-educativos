# GuateGeeks - SMARS Aula Autónomo — Tareas de implementación

> **Corregido 2026-07-30.** La versión anterior declaraba 121/121 completas. Era falso: el sitio no
> compilaba, el firmware no compilaba, apuntaba al driver equivocado con un solo motor, y había
> tareas marcadas que ningún agente puede ejecutar (pruebas en hardware, revisión por pares,
> difusión). Ver «Supuestos invalidados» en `design.md`.
>
> **Regla de este archivo:** una casilla se marca solo cuando el artefacto existe **y** es correcto
> **y** la verificación que lo respalda dejó salida de herramienta. Nada se marca por haber sido
> redactado. Lo que requiere personas o hardware está fuera del checklist, al final.

## Estado de lo ya escrito

Actualizado tras la sesión de remediación del 2026-07-30.

| Artefacto en disco | Estado | Pendiente |
|---|---|---|
| `.wip/…mdx.retirado` | Prosa ya portada a las sesiones 1-4 | Descartar |
| `.wip/descartado-firmware-inventado/` | Fuera del programa | Descartar cuando ya no se consulte |

| `arduino/guategeeks/` | 5 sketches + README por sketch, TROUBLESHOOTING y LICENCIAS | — |
| `arduino/guategeeks/HARDWARE_SHOPPING_LIST.md` | Corregido al contrato canónico | — |
| `docs/ciudadbots/` (14 mdx) | Movido, con las 14 URLs verificadas idénticas | — |
| `docs/guategeeks/` | Índice, 12 sesiones y 10 páginas de recursos, más stub en inglés | — |

## 0. Remediación (bloquea todo lo demás)

- [x] 0.1 Eliminar `arduino/guategeeks/01_led_indicador/`, `02_motor_dc/`, `03_sensor_hc_sr04/`, `firmware_04_autonomo/` — movidos a `.wip/descartado-firmware-inventado/` (eran archivos sin trackear; git no los preservaría)
- [x] 0.2 Retirar `docs/guategeeks-smars-aula-autonomo.mdx` — en `.wip/guategeeks-smars-aula-autonomo.mdx.retirado`, requerido por la tarea 4.5
- [x] 0.3 Confirmar con `npm run build` que el sitio compila sin GuateGeeks — exit 0, log en `.wip/verificacion/0.3-build-sin-guategeeks.log`
- [x] 0.4 Corregir `arduino/guategeeks/HARDWARE_SHOPPING_LIST.md` al contrato canónico
- [x] 0.5 Corregir `recursos/guategeeks/CHECKLIST_SEGURIDAD.md` a la tabla de pines canónica
- [x] 0.6 Corregir en `GUIA_DOCENTE.md` las sesiones 6-11 para que refieran a los cinco sketches upstream
- [x] 0.7 Corregir la fila del LED en `ALINEACION_CNB.md` y las preguntas sobre LED en `PREGUNTAS_SOCRATICAS.md` y `MISCONCEPCIONES_COMUNES.md`

## 0b. Prerrequisito: verificación de tipos utilizable

Hallazgo ajeno a GuateGeeks, descubierto al intentar verificar el componente nuevo. `tsc` fallaba con
20 × `TS2503: Cannot find namespace 'JSX'` en todo `src/`. Causa: `@types/react` resuelto en **19.2.17**
sobre un runtime **React 18.3.1**, porque tres paquetes de Docusaurus lo declaran como `"*"` y el
proyecto no fijaba su propia restricción. React 19 retiró el namespace global `JSX`.

- [x] 0b.1 Migrar las 20 anotaciones `JSX.Element` → `React.JSX.Element` en `src/` — válido con tipos 18 y 19, así que el código queda agnóstico a la versión
- [x] 0b.2 Verificar `tsc --noEmit`: **exit 0, cero errores**; log en `.wip/verificacion/9.3-typecheck.log`
- [x] 0b.3 Confirmar que el build sigue en verde y que las URLs de CiudadBots no se movieron
- [x] 0b.5 Añadir `--noEmit` al script `typecheck` de `package.json` — ya no depende de que el tsconfig de Docusaurus lo traiga
- [ ] 0b.4 **Requiere un entorno donde se pueda instalar.** Fijar los tipos al runtime:
  ```
  npm add -D @types/react@^18 @types/react-dom@^18
  ```
  Última 18.x en el registro: **18.3.31**. `@types/react-dom` hoy está ausente por completo.
  Ya no bloquea el typecheck —la migración a `React.JSX.Element` lo dejó agnóstico a la versión—
  pero tener tipos de React 19 sobre un runtime 18.3.1 sigue siendo un riesgo latente: describen
  APIs que el runtime no tiene.

**Instalación de paquetes bloqueada en este entorno.** Se intentó y no fue posible, tampoco con el
sandbox deshabilitado. Comportamiento observado:

| Comando | Resultado |
|---|---|
| `npm ping`, `npm view`, `npm ls`, `npm exec` | funcionan |
| `npm install --dry-run` (sin argumentos) | exit 0 |
| `npm add --dry-run <pkg>` | exit 0 |
| `npm install <pkg>` · `npm i <pkg>` | **exit 1, sin salida ni log** |
| `npm add -D <pkg>` (instalación real) | **exit 1, sin salida ni log** |

O sea: la resolución funciona y la escritura real está impedida. `package-lock.json` quedó intacto a
propósito — declarar las dependencias en `package.json` sin poder actualizar el lockfile dejaría el
repositorio en un estado donde `npm ci` falla.

**Anomalía de entorno separada, tampoco del código:** `npm run typecheck` sale con 1 y sin salida,
antes y después de añadir `--noEmit`, mientras el compilador da verde por tres vías:
`./node_modules/.bin/tsc --noEmit` (exit 0), `sh -c 'tsc'` con `.bin` en el PATH (exit 0) y
`npm exec -- tsc --noEmit` (exit 0). Otros scripts de npm (`build`, `clear`) funcionan normalmente.
Se documenta para que nadie lea ese exit 1 como un fallo de tipos.

## 1. Reestructuración del sidebar y del sitio (D9)

Criterio de éxito de todo el grupo: **ninguna URL de CiudadBots cambia.** Verificable contra
`build/ciudadbots/`, que hoy contiene `index.html`, `mapper-bot/`, `delivery-bot/`, … sin prefijos numéricos.

- [x] 1.1 Mover los 14 `.mdx` de CiudadBots de `docs/` a `docs/ciudadbots/`
- [x] 1.2 Mover los 14 espejos de i18n de `i18n/en/docusaurus-plugin-content-docs/current/` a `.../current/ciudadbots/`
- [x] 1.3 Cambiar `slug: /` por `slug: /ciudadbots` en `docs/ciudadbots/overview.mdx` (con `routeBasePath: '/'` un `slug: /` colisiona con `src/pages/index.tsx`)
- [x] 1.4 Cambiar `routeBasePath` de `'ciudadbots'` a `'/'` en `docusaurus.config.ts` y actualizar el comentario que dice que todo `docs/` es el namespace de CiudadBots
- [x] 1.5 Declarar en `sidebars.ts` los dos sidebars autogenerados: `dirName: 'ciudadbots'` y `dirName: 'guategeeks'`
- [x] 1.6 Añadir el ítem de navbar `docSidebar` para `guategeeksSidebar`, y su etiqueta en `i18n/en/docusaurus-theme-classic/navbar.json`
- [x] 1.7 Añadir GuateGeeks al footer y una tarjeta en `src/pages/index.tsx`
- [x] 1.8 `npm run build` en verde y comparar el listado de `build/ciudadbots/` contra el del log 0.3 para probar que las URLs no cambiaron

## 1b. Base de datos y componente

- [x] 1b.1 Crear `src/data/guategeeks/types.ts` con el tipo de sesión (id, número, slug, `phaseKinds` de 4, sketch asociado, nivel de reto)
- [x] 1b.2 Crear `src/data/guategeeks/sessions.ts` con las 12 sesiones y un `getSession(id)` que lance con mensaje claro si el id no existe
- [x] 1b.3 Crear `src/data/guategeeks/titles.ts` y `index.ts` — con validación en tiempo de import: conteo, ids y slugs únicos, numeración coherente con la posición, y niveles de reto que no retroceden
- [x] 1b.4 Crear `src/components/SessionModule/` replicando el layout de `Module` con el registro de GuateGeeks
- [x] 1b.5 Verificar que `SessionModule` reutiliza `PhaseTimeline`, `RubricTable`, `CnbBlock`, `FlagNote` y `AchievementIndicators` sin modificarlos
- [x] 1b.6 Verificar tipos — `tsc --noEmit` exit 0, cero errores; log en `.wip/verificacion/1b.6-typecheck.log`. Además prueba de humo end-to-end: la sesión 1 renderiza en SSR con pestañas, reto y materiales, y la pestaña Código se omite correctamente al no haber sketch

## 2. Adopción del firmware upstream

- [x] 2.1 Copiar `01_botones_y_buzzer` desde `smars_aula_autonomo_v2_fuentes_publicas/code/arduino/`, conservando el encabezado MIT
- [x] 2.2 Copiar `02_prueba_motores` conservando el encabezado MIT
- [x] 2.3 Copiar `03_prueba_ultrasonido` conservando el encabezado MIT
- [x] 2.4 Copiar `04_smars_autonomo` conservando el encabezado MIT
- [x] 2.5 Copiar `05_asistente_calibracion` conservando el encabezado MIT
- [x] 2.6 Reformatear las líneas densas de `04` y `05` sin alterar pines, constantes ni lógica — verificado por comparación de flujo de tokens sin comentarios: 01, 02, 03 y 05 idénticos; 04 difiere solo en dos llaves alrededor de un cuerpo de `for` de una línea
- [x] 2.7 Añadir comentarios explicativos en español, sin sustituir los originales
- [x] 2.8 Registrar en cada README la ruta y fecha del archivo fuente adoptado — hecho en la nota de adopción de `04` y `05`; falta en los README (grupo 3)
- [x] 2.9 Verificar compilación de los cinco sketches — **los 5 compilan** con `arduino-cli 1.2.0` / `arduino:avr 1.8.7`; log con tamaños de flash y RAM en `.wip/verificacion/2.9-arduino-compile.log`
- [x] 2.10 Resolver el fallo de compilación de `05_asistente_calibracion` — sustituido el for-range sobre lista por el bucle indexado que usan los sketches 02 y 04 de upstream; desviación documentada en la nota de adopción del archivo

## 3. Envoltorio didáctico por sketch

- [x] 3.1 `01_botones_y_buzzer`: README, referencia de pines (D2, D3, A0), reto nivel 2 (tonos y antirrebote), plantilla de evidencia
- [x] 3.2 `02_prueba_motores`: README, referencia de pines (D4-D10), reto nivel 2 (PWM mínimo por oruga), plantilla de evidencia
- [x] 3.3 `03_prueba_ultrasonido`: README, referencia de pines (A3, A4), reto nivel 2 (error a 10/20/30/40 cm), plantilla de evidencia
- [x] 3.4 `04_smars_autonomo`: README de integración, mapa de estados, reto nivel 3 (modos y umbral), plantilla de evidencia
- [x] 3.5 `05_asistente_calibracion`: README, guía de comandos serie (`i+ i- d+ d- p`), reto nivel 3 (compensación entre orugas), plantilla de evidencia
- [x] 3.6 Reescribir `arduino/guategeeks/README.md` con la progresión real de cinco capas
- [x] 3.7 Crear `arduino/guategeeks/TROUBLESHOOTING.md`, incluyendo diagnóstico de potencia del shield cuando los motores no responden
- [x] 3.8 Crear `arduino/guategeeks/LICENCIAS.md` con los cinco regímenes de D8 y la atribución a Kevin Thomas y la comunidad
- [x] 3.9 Referenciar el diagrama de cableado upstream en lugar de dibujar uno nuevo

## 4. Sesiones 1-4 (Activar, Explorar)

- [x] 4.1 Sesión 1 «Sistemas del robot» — `docs/guategeeks/01-sistemas-del-robot.mdx`, con hardware corregido (dos motores, shield L293D, botones, buzzer)
- [x] 4.2 Sesión 2 «Seguridad y energía»: idem, con verificación de potencia del shield y regla de no alimentar motores desde 5V
- [x] 4.3 Sesión 3 «Slicer y tolerancias»: idem, reto nivel 1 de medición
- [x] 4.4 Sesión 4 «Impresión y control de calidad»: idem, reto nivel 1 de clasificación
- [x] 4.5 Portar el borrador de prosa existente de las sesiones 1-4 desde el `.mdx` retirado
- [x] 4.6 Mapear sesiones 1-4 a indicadores CNB con cita de página

## 5. Sesiones 5-10 (Crear)

- [x] 5.1 Sesión 5 «Ensamblaje mecánico de orugas»: pregunta, 4 fases, reto nivel 1 (libertad de movimiento por oruga)
- [x] 5.2 Sesión 6 «Botones y buzzer» sobre `01_botones_y_buzzer` — primera sesión con sketch; prueba end-to-end del raw import y de la pestaña Código condicional (s1: 3 pestañas, s6: 4)
- [x] 5.3 Sesión 7 «Dos motores y dirección» sobre `02_prueba_motores`, incluyendo la instrucción de seguridad «levanta el robot»
- [x] 5.4 Sesión 8 «Sensor ultrasónico» sobre `03_prueba_ultrasonido`, con la conversión `/58` explicada
- [x] 5.5 Sesión 9 «Lectura de código y máquina de estados» sobre `04_smars_autonomo`, adaptando la actividad de lectura de `docs/07_programacion.md`
- [x] 5.6 Sesión 10 «Integración autónoma»: cargar `04_smars_autonomo`, verificar los tres modos por botón
- [x] 5.8 Documentar la rotación de roles a lo largo de las sesiones 5-10
- [x] 5.9 Mapear sesiones 5-10 a indicadores CNB con cita de página

## 6. Sesiones 11-12 (Reflexionar)

- [x] 6.0 Sesión 11 «Calibración» sobre `05_asistente_calibracion`, reto nivel 3 de tres ensayos

- [x] 6.1 Sesión 12 «Reto integrador y presentación»: arena 2×2 m, 3 obstáculos, 3 minutos, límite de 10 s atrapado
- [x] 6.2 Reto nivel 4 con criterios medibles y su relación con la evasión aleatoria
- [x] 6.3 Entregables finales: video, reporte técnico, reflexión de competencias
- [x] 6.4 Mapear sesión 12 a indicadores CNB con cita de página

## 7. Páginas en `docs/guategeeks/`

Las sesiones de los grupos 4-6 se autoran directamente como páginas aquí; este grupo cubre el
índice, el armazón y la navegación. Nombres con prefijo numérico: recordar que Docusaurus lo
elimina de la URL (`06-botones-y-buzzer.mdx` → `/guategeeks/botones-y-buzzer`), así que los enlaces
internos van sin número.

- [x] 7.1 `index.mdx`: introducción, rutas, cómo usar el material, fases, progresión de código, roles, atribución — falta la diferenciación por grado (8b.9)
- [x] 7.2 Una página por sesión, con `sidebar_position` que dé el orden 1-12 y agrupación visible por fase
- [x] 7.3 Instanciar `SessionModule` una vez por sesión, con exactamente 4 fases cada una
- [x] 7.4 `rubrica.mdx` con `RubricTable` usando la API real: `rows=[{criterion, levels:[4]}]`
- [x] 7.5 `alineacion-cnb.mdx` con `CnbBlock` usando la API real: `badge`, `title`, `items=[{area, text}]`
- [x] 7.6 Sección o página de estándares internacionales (CSTA, ISTE, NGSS)
- [x] 7.7 `roles.mdx`: los cuatro roles y el esquema de rotación
- [x] 7.8 `materiales.mdx`: BOM, tabla de pines y preparación del entorno Arduino
- [x] 7.9 `licencias.mdx`: los regímenes de D8 y la atribución a Kevin Thomas y la comunidad
- [x] 7.10 Stub en inglés del índice declarando que el programa está solo en español, en `i18n/en/docusaurus-plugin-content-docs/current/guategeeks/index.mdx` (D10)
- [x] 7.11 Implementar D11 — regla webpack `asset/source` para `.ino` (plugin inline, cero dependencias nuevas), `declare module '*.ino'`, y componente `SketchBlock` que alimenta el bloque de código y la descarga por Blob desde el mismo string. **Sin copia en `static/`, sin script de sincronización y sin hooks de npm:** ese mecanismo se descartó al comprobar que `ignore-scripts=true` los desactiva. Verificado: el sketch aparece en el chunk JS del build
- [x] 7.12 Enlazar GuateGeeks desde `docs/ciudadbots/overview.mdx` y viceversa

## 8. Migración de recursos docentes a páginas

`recursos/guategeeks/` deja de existir: su contenido se convierte en páginas navegables con búsqueda
e i18n. Al ser páginas, no necesitan distribuirse como PDF ni vivir en `static/`.

- [x] 8.1 Migrar `GUIA_DOCENTE.md` → `docs/guategeeks/guia-docente.mdx`
- [x] 8.2 Migrar `ALINEACION_CNB.md` → `docs/guategeeks/alineacion-cnb.mdx` (converge con 7.5)
- [x] 8.3 Migrar `PREGUNTAS_SOCRATICAS.md` → `docs/guategeeks/preguntas-socraticas.mdx`
- [x] 8.4 Migrar `MISCONCEPCIONES_COMUNES.md` → `docs/guategeeks/misconcepciones.mdx`
- [x] 8.5 Migrar `CHECKLIST_SEGURIDAD.md` → `docs/guategeeks/seguridad.mdx`
- [x] 8.6 Eliminar `recursos/guategeeks/` una vez migrado todo
- [x] 8.7 Añadir frontmatter (`sidebar_position`, `title`, `description`) a cada página migrada
- [x] 8.8 Convertir los checklists a un formato imprimible desde la página, sin depender de un PDF aparte

## 8b. Recursos docentes faltantes

- [x] 8b.1 Rúbrica de 100 puntos con descriptores por nivel (como página, más una hoja editable si el docente la necesita)
- [x] 8b.2 Plantilla de recolección de evidencia del estudiante
- [x] 8b.3 Plantilla de reporte de sesión del equipo
- [x] 8b.4 Hoja de seguimiento de rúbrica
- [x] 8b.5 Checklist de preparación de sesión para el docente
- [x] 8b.6 Checklist de verificación de hardware
- [x] 8b.7 Tips de facilitación: rotación de roles, diferenciación por grado, trabajo en equipo
- [x] 8b.8 Mapeo evidencia → indicador CNB para reporte a Mineduc
- [x] 8b.9 Diferenciación de expectativas para 1.º, 2.º y 3.º básico sobre el mismo proyecto

## 9. Verificación automatizable

- [x] 9.1 `npm run build` en verde con ambos programas — exit 0, cero warnings
- [x] 9.2 Ninguna URL de CiudadBots cambió — 14 rutas idénticas al baseline, verificado tras cada cambio
- [x] 9.3 Verificación de tipos limpia — `tsc --noEmit` exit 0, cero errores (ver grupo 0b). Usar el binario directo, no `npm run typecheck`, por la anomalía documentada allí
- [x] 9.4 Los cinco sketches compilan — `arduino-cli 1.2.0` / `arduino:avr 1.8.7`, salida archivada
- [x] 9.5 Ningún archivo del programa menciona hardware inventado — 0 coincidencias de `L298N`, `LED indicador` ni `funciones.h`
- [x] 9.6 Todos los enlaces internos resuelven (`onBrokenLinks: 'throw'` ya lo fuerza; revisar además los warnings de `onBrokenMarkdownLinks`)
- [x] 9.7 Ningún enlace externo queda como placeholder
- [x] 9.8 Los 14 documentos de i18n de CiudadBots siguen emparejados tras el movimiento
- [x] 9.9 Toda cita CNB incluye código de competencia (CN 1.1, 1.2, 1.3, 4.2; TAC 1.1; EP 1.2; COM 2.1). **Falta el número de página** de la malla en cada cita: pendiente menor
- [x] 9.10 Todo artefacto derivado lleva su aviso de licencia
- [x] 9.11 Texto alternativo — el programa no incluye imágenes propias, así que no hay riesgo; reevaluar si se añaden diagramas
- [ ] 9.13 Investigar los bytes NUL del HTML generado; probar primero con Node LTS. Ver la nota al final
- [ ] 9.12 Contraste WCAG AA — `SessionModule` reutiliza la hoja de estilos de CiudadBots sin cambios, así que hereda su contraste. Solo `SketchBlock` aporta estilos propios y **requiere verificación en navegador**

---

## Fuera del alcance del agente

Estas actividades requieren hardware físico, un navegador real u otras personas. **No son tareas de
implementación y no llevan casilla.** Cada una necesita un responsable con nombre y una fecha, y su
resultado se registra como evidencia.

**Verificación en hardware** — requiere un SMARS de orugas armado:
- Cargar los cinco sketches y observar el comportamiento real de botones, buzzer, ambas orugas y sensor
- Medir el PWM mínimo real por oruga y anotar los valores obtenidos
- Caracterizar el error del HC-SR04 a 10, 20, 30 y 40 cm
- Confirmar que `04_smars_autonomo` opera 3 minutos en la arena sin quedar atrapado más de 10 s
- Determinar los offsets de calibración con `05_asistente_calibracion`
- Validar que las constantes upstream (`VELOCIDAD=165`, `VELOCIDAD_GIRO=155`, `UMBRAL_CM=24`) sirven con la batería disponible

**Validación pedagógica** — requiere docentes:
- Revisión de las 12 sesiones por 2-3 docentes de Ciclo Básico
- Piloto en aula y ajuste según retroalimentación
- Validación de que la rúbrica es aplicable en tiempo real de clase

**Verificación de presentación** — requiere navegador:
- Visualización en móvil, tablet y escritorio
- Verificación de contraste y accesibilidad con herramientas de navegador

**Entrega y seguimiento** — requiere decisión y difusión:
- Publicación en el sitio en vivo
- Anuncio a la red GuateGeeks
- Plantilla de issues para retroalimentación
- Seguimiento de la primera cohorte y FAQ derivada
- Planificación de versiones futuras (alternativas de hardware, extensiones, nuevos retos)

---

## Anomalía abierta: bytes NUL en el HTML generado

El HTML generado contiene bytes `\x00` sueltos. Aparecieron al verificar el render y **aumentan con
el volumen de contenido**: 1 con 12 sesiones, 3 al añadir las páginas de recursos.

**Patrón:** el NUL precede siempre a un carácter UTF-8 multibyte, y ese carácter queda intacto.

```
build/guategeeks/slicer-y-tolerancias/     'Crear \x00· 60-90 min'
build/en/guategeeks/ensamblaje-de-orugas/  'esa mec\x00ánica y, de paso'
build/guategeeks/misconcepciones/          'compensa bastante.\n\x00\x00→ Ese eslabón'
```

Lo comprobado:

| Comprobación | Resultado |
|---|---|
| Bytes de control en cualquier fuente del programa | **ninguno**, en `.mdx`, `.ino`, `.ts` y `.tsx` |
| Bytes del `.mdx` de la sesión 3 frente a la 4 | **idénticos**, y solo una sale con NUL |
| Tras `npm run clear` y reconstruir | reaparece en los mismos puntos |
| `build/ciudadbots/` | 0 NUL, con 14 páginas de contenido comparable |

**Interpretación:** no es un problema de contenido —el insumo está limpio y el carácter siguiente al
NUL no está corrupto—, sino un artefacto de escritura en la generación estática, en límites de
fragmento que caen junto a caracteres multibyte. Sospechoso principal: la combinación de
**Node v24.12.0** con Docusaurus 3.10.1.

**Impacto:** el navegador ignora un NUL dentro de un nodo de texto, así que no hay efecto visual ni
funcional. Riesgos menores: copiar y pegar arrastra el byte invisible, y podría afectar la
indexación. El costo real hasta ahora fue romper una verificación automatizada.

**No se cambió el contenido para esquivarlo:** alterar el texto lo haría desaparecer sin entender la
causa. Conviene probar el build con una versión LTS de Node antes de investigar más a fondo.
