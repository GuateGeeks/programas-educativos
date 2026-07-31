## 1. Andamiaje y navegación

- [x] 1.1 Confirmar que `src/components/HorizontalStepReader/` y `src/components/VisualStepGuide/` estén comprometidos en git antes de construir contenido encima de ellos
- [x] 1.2 Crear `docs/tiempo-circular/` y registrar `tiempoCircularSidebar` como sidebar autogenerado en `sidebars.ts`
- [x] 1.3 Agregar el ítem de navbar `Tiempo Circular` y la entrada de footer en `docusaurus.config.ts`, sin alterar las entradas existentes
- [x] 1.4 Agregar la tarjeta del programa en `src/pages/index.tsx` indicando el grado que atiende, y ajustar el texto de la portada para que declare qué grado cubre cada uno de los tres programas
- [x] 1.5 Crear `static/assets/tiempo-circular/` y `arduino/tiempo-circular/`
- [x] 1.6 Crear el stub en inglés en `i18n/en/docusaurus-plugin-content-docs/current/tiempo-circular/` que declare que el programa está solo en español y enlace a la versión en español
- [x] 1.7 Verificar que `npm run build` pasa con el andamiaje vacío y que todas las rutas `/ciudadbots/*` y `/guategeeks/*` siguen resolviendo sin cambios

## 2. Alineación curricular (antes del contenido)

- [x] 2.1 Extraer de `CNB_Guatemala_Mallas_Curriculares_Basico/` los indicadores de Segundo Básico que el programa reclamará, con código, texto y página fuente declarada por la malla
- [x] 2.2 Verificar una por una las citas de MAT 1.2, MAT 1.3, MAT 2.1, MAT 2.2, MAT 2.3, MAT 5.1, MAT 5.2, MAT 5.3, CN 1.1, CN 1.2, CN 1.3, CN 4.3, TAC 1.1, TAC 1.3 y las de Comunicación y Lenguaje contra los archivos de `areas/`
- [x] 2.3 Construir la matriz sesión × competencia para las 12 sesiones, asegurando que ninguna sesión quede sin al menos una competencia y que ninguna cita provenga de otro grado
- [x] 2.4 Redactar la nota de alcance parcial para cada competencia que el programa reclame sin cubrir todos sus contenidos de malla
- [x] 2.5 Verificar los códigos CSTA Nivel 2 (grados 6-8), NGSS MS-ETS1 e ISTE contra sus fuentes, y descartar cualquier código que no se pueda confirmar
- [x] 2.6 Escribir `docs/tiempo-circular/alineacion-cnb.mdx` con áreas cubiertas, matriz, leyenda con páginas y las notas de alcance

## 3. Sketches ESP32

- [x] 3.1 Escribir `arduino/tiempo-circular/README.md` con el contrato de hardware canónico y el mapa de pines único (VCC→3.3 V, GND, SCL→GPIO18, SDA→GPIO23, DC→GPIO25, CS→GPIO26, RST→GPIO27)
- [x] 3.2 Escribir `01_pantalla_viva` — SPI, `begin()`, rotación, relleno y texto; verifica cableado
- [x] 3.3 Escribir `02_color_y_bits` — construir RGB565 desde componentes, mostrar el mismo color en binario, hexadecimal y decimal
- [x] 3.4 Escribir `03_geometria_circular` — centro y radio, marcas en ángulos notables cada 30°, y manecilla colocada con `sin`/`cos` incluyendo la conversión a radianes y el signo negativo en Y
- [x] 3.5 Escribir `04_reloj_millis` — reloj analógico y digital sobre `millis()`, con redibujo parcial de manecillas y sin ninguna llamada de red
- [x] 3.6 Escribir `05_reloj_ntp` — WiFi, `configTime` con offset UTC-6 y sin horario de verano, y el mismo reloj ya corregido
- [x] 3.7 Crear el patrón `credenciales.h` separado, documentado como no versionable, y añadirlo a `.gitignore`
- [x] 3.8 Escribir `06_cholqij` — anillo de 20 nawales a 18° exactos, ciclo de 13 a 360/13, y conteo desde una constante de ancla configurable; sin constante de correlación inventada
- [x] 3.9 Escribir un `README.md` por sketch con subsistema bajo prueba, referencia de pines, nivel de reto, qué debe observarse en pantalla y plantilla de evidencia
- [x] 3.10 Verificar que los `#define` de pines de los seis sketches coinciden exactamente con el mapa publicado
- [x] 3.11 Escribir `HARDWARE_SHOPPING_LIST.md` sin RTC y sin módulo SD, con cantidades por equipo y costos marcados como estimados
- [x] 3.12 Escribir `TROUBLESHOOTING.md` propio del ESP32: gestor de tarjetas, driver USB-serie, selección de placa y puerto, instalación de `DIYables_TFT_Round` con dependencias
- [x] 3.13 Escribir `LICENCIAS.md` declarando MIT para el código propio, la licencia de `DIYables_TFT_Round` como citada y no vendorizada, y que `watch/` aportó solo pinout, cableado, identificación de librería y fotografías de referencia
- [x] 3.14 Marcar en cada README y en `TROUBLESHOOTING.md` que el sketch **no** ha sido validado en hardware físico
- [x] 3.15 Intentar un chequeo de compilación con `arduino-cli` contra el core ESP32; si la herramienta o el core no están disponibles, registrar explícitamente que no se ejecutó

## 4. Páginas de sesión

- [x] 4.1 `01-sistemas-de-una-pantalla.mdx` — reto 0, periféricos de entrada/salida/comunicación, SPI; entregable: diagrama de bloques anotado
- [x] 4.2 `02-energia-y-conexiones-seguras.mdx` — reto 0, 3.3 V vs 5 V, orientación VCC/GND; entregable: checklist firmado
- [x] 4.3 `03-el-primer-pixel.mdx` — reto 1, sketch `01`; entregable: pantalla encendida y bitácora de cableado
- [x] 4.4 `04-el-color-es-un-numero.mdx` — reto 1, sketch `02`, valor posicional en base 2 y 16; entregable: tabla de colores en binario, hex y decimal
- [x] 4.5 `05-la-pantalla-es-un-plano.mdx` — reto 1, sketch `03`, Y crece hacia abajo; entregable: carátula con centro y radio medidos
- [x] 4.6 `06-angulos-notables.mdx` — reto 2, sketch `03`; entregable: 12 marcas a 30° y justificación de la simetría
- [x] 4.7 `07-seno-y-coseno.mdx` — reto 2, sketch `03`, conversión a radianes; entregable: manecilla que apunta a un ángulo pedido
- [x] 4.8 `08-el-reloj-que-deriva.mdx` — reto 2, sketch `04`, el segundero como MCU a 6°/s; entregable: reloj analógico y digital funcionando
- [x] 4.9 `09-medir-la-deriva.mdx` — reto 3, sketch `04`, procedimiento de comparación contra un patrón; entregable: tabla de error con cifras significativas
- [x] 4.10 `10-la-hora-de-la-red.mdx` — reto 3, sketch `05`, husos horarios y UTC-6; entregable: reloj sincronizado
- [x] 4.11 Escribir dentro de la sesión 10 la ruta alterna sin red, con su propia evidencia, de modo que el programa se complete sin NTP
- [x] 4.12 `11-cholqij.mdx` — reto 3, sketch `06`, 13×20, 18° exactos y 360/13 no exacto, redondeo y error acumulado; entregable: carátula Cholq'ij y cálculo de pasos angulares
- [x] 4.13 Escribir en la sesión 11 los límites declarados: el programa trabaja ciclo y aritmética, no práctica ceremonial ni lectura de nawales, y no habla en nombre de comunidades mayas ni de ajq'ijab'
- [x] 4.14 `12-reto-integrador.mdx` — reto 4; entregable: carátula propia diseñada y presentación técnica
- [x] 4.15 Verificar que las doce páginas usan una sola instancia de `SessionModule` con las cuatro fases en orden `act`, `exp`, `cre`, `ref` y sin advertencias de validación de orden
- [x] 4.16 Verificar que los niveles de reto asignados son 0,0,1,1,1,2,2,2,3,3,3,4 y no decrecen en ningún punto
- [x] 4.17 Verificar que cada `SessionModule.Cnb` cita código de indicador, qué exige y página en formato `(p. NN)`

## 5. Recursos docentes

- [x] 5.1 `index.mdx` — declara segundo básico y por qué, redirige a CiudadBots para 1.º y a GuateGeeks SMARS para 3.º, y publica las tres rutas de calendario
- [x] 5.2 `guia-docente.mdx` — tabla de las 12 sesiones con fase, sketch, nivel de reto y entregable; materiales por bloque; cómo partir la fase Crear en la ruta escolar
- [x] 5.3 Añadir a la guía docente la recomendación de en qué momento del calendario escolar arrancar, dado que MAT 1.3 llega a mitad de año
- [x] 5.4 Añadir a la guía docente qué evidencia sustituye a la sesión 11 para un equipo que solo construya la carátula de 12 horas
- [x] 5.5 `materiales.mdx` — lista por equipo con cantidades, el mapa de pines, y la declaración de que el hardware está especificado pero no adquirido ni validado en campo
- [x] 5.6 `seguridad.mdx` — checklist de 3.3 V: orientación VCC/GND, 3.3 V vs 5 V en el pin de alimentación del display, verificar antes de energizar, desconectar USB antes de recablear, manipular placas por los bordes
- [x] 5.7 `roles.mdx` — cuatro roles adaptados a un proyecto de pantalla y código, con cadencia de rotación
- [x] 5.8 `rubrica.mdx` — rúbrica de 100 puntos cuyos pesos sumen exactamente 100, cubriendo seguridad y cableado, razonamiento geométrico y trigonométrico, calidad de código, manejo de datos, diseño de la carátula y comunicación técnica
- [x] 5.9 `preguntas-socraticas.mdx` — organizadas por síntoma observable: pantalla en blanco, colores equivocados, manecilla apuntando mal, reloj adelantado o atrasado
- [x] 5.10 `misconcepciones.mdx` — Y de pantalla vs Y matemática, 0° no son las 12, el verde de RGB565 tiene 6 bits, un color hexadecimal no es un decimal, la deriva de `millis()` es del oscilador y no un error de código
- [x] 5.11 `plantillas.mdx` — tabla de medición de deriva, hoja de ángulos y coordenadas, y hoja de planificación de carátula
- [x] 5.12 `licencias.mdx` — MIT del código propio, CC BY-SA 4.0 y atribución Mineduc/DIGECUR de las mallas, licencia de `DIYables_TFT_Round` citada, y **tabla de procedencia de las 14 imágenes de esp32io.com / DIYables**, separadas del material propio de GuateGeeks
- [x] 5.13 Publicar en `licencias.mdx` o en la página Cholq'ij la lista de fuentes del contenido del calendario, empezando por la malla del Mineduc, y la variante lingüística y fuente de cualquier nombre de nawal usado

## 6. Compuertas humanas y verificación

- [ ] 6.1 **Human-gated:** obtener revisión del contenido Cholq'ij por una persona con conocimiento del calendario maya, y registrar quién revisó y qué cambió como resultado. El contenido no se publica sin esto
- [ ] 6.2 **Human-gated:** resolver la fuente publicada y verificable para el ancla de correlación Cholq'ij–gregoriana, o confirmar que se entrega como constante configurada por el docente
- [ ] 6.3 **Human-gated:** validar los seis sketches en hardware físico cuando exista el equipo, y solo entonces retirar la marca de no verificado
- [x] 6.4 Confirmar que cada imagen reproducida de `watch/` lleva crédito visible a esp32io.com / DIYables donde se muestra, y que ninguna aparece sin atribución
- [x] 6.5 Confirmar que los nombres de archivo de las imágenes copiadas se preservan, de modo que cada una sea rastreable hasta la página original
- [x] 6.6 Ejecutar `npm run build` y confirmar cero enlaces internos rotos, con `onBrokenLinks: 'throw'` activo
- [x] 6.7 Ejecutar `npm run typecheck` y confirmar que pasa
- [x] 6.8 Revisar el sitio construido en la locale inglesa y confirmar que el namespace `/tiempo-circular/*` sirve el stub y no cae en español sin aviso
- [x] 6.9 Verificar en el sitio construido que la portada, el navbar y el footer listan los tres programas y que cada uno declara el grado que atiende
- [x] 6.10 Revisar el programa completo contra los cinco archivos de `openspec/changes/tiempo-circular-segundo-basico/specs/` y confirmar que cada requisito tiene su escenario cumplido o su brecha declarada

## 7. Parametrizar SessionModule (D13)

Desbloquea el grupo 4. Debe hacerse antes de escribir cualquier página de sesión.

- [x] 7.1 Crear `src/data/tiempo-circular/types.ts` reutilizando el contrato de `src/data/guategeeks/types.ts`, o extrayendo el tipo compartido si conviene
- [x] 7.2 Crear `src/data/tiempo-circular/sessions.ts` con las doce sesiones `tc1`…`tc12`, sus slugs, fase de programa, `phaseKinds` y `retoLevel` 0,0,1,1,1,2,2,2,3,3,3,4, más `SKETCHES_BASE = '/arduino/tiempo-circular/'` y `WIRING_REFERENCE = '/tiempo-circular/materiales'`
- [x] 7.3 Crear `src/data/tiempo-circular/titles.ts` e `index.ts` con la misma validación de integridad en tiempo de import: doce sesiones, ids y slugs únicos, numeración correlativa y retos no decrecientes
- [x] 7.4 Añadir a `SessionModule` el prop `program?: 'guategeeks' | 'tiempo-circular'` con **valor por defecto `'guategeeks'`**, y resolver desde él el registro de sesiones y `WIRING_REFERENCE`
- [x] 7.5 Mover a configuración por programa el título del bloque CNB, hoy fijo en «Ciclo Básico · Tercero Básico» (`index.tsx:282`)
- [x] 7.6 Mover a configuración por programa los dos textos de la pestaña Código, hoy fijos en «adoptado del proyecto SMARS… Arduino Uno sin librerías externas» (`index.tsx:396`) y «STBY debe quedar en HIGH…» (`index.tsx:406`)
- [x] 7.7 Añadir los ids de traducción nuevos que introduzcan esos textos parametrizados a `i18n/en/code.json`
- [x] 7.8 Verificar que las doce páginas de GuateGeeks SMARS renderizan **idénticas** a antes del cambio, comparando la salida construida
- [x] 7.9 Revisar el diff de `src/components/SessionModule/index.tsx` contra los cambios en curso `guategeeks-smars-ciclo-basico` y `guategeeks-smars-l293d-visual-build` para no pisarlos

## 8. Imágenes del tutorial (D12)

- [x] 8.1 Copiar las 14 imágenes de `watch/esp32-round-circular-tft-lcd-display-assets/` a `static/assets/tiempo-circular/`, preservando los nombres de archivo
- [x] 8.2 Usar el pinout (`1.28inch-round-circular-tft-lcd-pinout.jpg`) en la sesión 1 y en `materiales.mdx`
- [x] 8.3 Usar el diagrama de cableado (`esp32-round-circular-tft-lcd-display-wiring-diagram.jpg`) en las sesiones 2 y 3 y en `materiales.mdx`
- [x] 8.4 Usar las capturas de instalación de librería (`esp32-tft-lcd-round-library.jpg`, `esp32-tft-lcd-round-dependency-library.jpg`) en la sesión 3
- [x] 8.5 Usar `esp32-round-circular-tft-lcd-screen-display-text-and-number.jpg` y `…-external-font.jpg` en la sesión 4, y `…-draw-shapes.jpg` en la sesión 5
- [x] 8.6 Usar `esp32-round-circular-tft-lcd-display-screen-clock-watch.jpg` en la sesión 8 como referencia de la carátula analógica
- [x] 8.7 Usar `tft-display-image-to-bitmap-array.jpg`, `arduino-ide-2-adds-file.jpg` y `arduino-ide-adds-file-bitmap.jpg` en la extensión de bitmap de la sesión 12
- [x] 8.8 Componer las guías visuales con `VisualStepGuide`, siguiendo el patrón de `docs/guategeeks/01-sistemas-del-robot.mdx`, con `alt` descriptivo en cada paso
- [x] 8.9 Añadir el crédito visible a esp32io.com / DIYables en cada bloque que muestre estas imágenes
- [x] 8.10 Declarar en las sesiones 5, 6, 7 y 11 que **no existe fotografía** de la salida de nuestros sketches, y describir en texto y diagrama lo que debe verse

## 9. Hallazgos de la revisión completa de `watch/` (D14, D15)

- [x] 9.1 Añadir a `misconcepciones.mdx` el defecto de manecillas superpuestas: borrar repintando en color de fondo no limpia correctamente cuando dos manecillas se cruzan
- [x] 9.2 Añadir a `misconcepciones.mdx` que las fuentes externas de Adafruit GFX pueden no traer el símbolo `°`: una fuente es también un repertorio de caracteres, no solo una forma de letra
- [x] 9.3 Incorporar en la sesión 6 el contraste entre 60 marcas de minuto (360/60 = 6° exactos) y el 360/13 ≈ 27.69° del Cholq'ij, para anticipar la sesión 11
- [x] 9.4 Resolver la pregunta abierta 7: corregir el sketch repintando las tres manecillas en orden, o dejar el defecto visible como reto de la sesión 8. Registrar la decisión
- [x] 9.5 Escribir la extensión de bitmap de la sesión 12: conversor imagen→bitmap, ancho ≤240 px, color de fondo para transparencias, `bitmap.h` como pestaña nueva del IDE, **sin tarjeta SD**
- [x] 9.6 Incluir en esa extensión el cálculo de memoria: 240 × 240 × 2 = 115 200 bytes, y por qué eso compite con el stack de WiFi
- [x] 9.7 Documentar el gotcha del IDE: modificar `bitmap.h` sin tocar el `.ino` no dispara la recompilación
- [x] 9.8 Anotar en `materiales.mdx` o `TROUBLESHOOTING.md` que el tutorial original recomienda un DS3231 para hora real, y por qué este programa eligió `millis()` → NTP en su lugar
