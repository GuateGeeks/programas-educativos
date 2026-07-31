## 1. Andamiaje y navegación

- [ ] 1.1 Confirmar que `src/components/HorizontalStepReader/` y `src/components/VisualStepGuide/` estén comprometidos en git antes de construir contenido encima de ellos
- [ ] 1.2 Crear `docs/tiempo-circular/` y registrar `tiempoCircularSidebar` como sidebar autogenerado en `sidebars.ts`
- [ ] 1.3 Agregar el ítem de navbar `Tiempo Circular` y la entrada de footer en `docusaurus.config.ts`, sin alterar las entradas existentes
- [ ] 1.4 Agregar la tarjeta del programa en `src/pages/index.tsx` indicando el grado que atiende, y ajustar el texto de la portada para que declare qué grado cubre cada uno de los tres programas
- [ ] 1.5 Crear `static/assets/tiempo-circular/` y `arduino/tiempo-circular/`
- [ ] 1.6 Crear el stub en inglés en `i18n/en/docusaurus-plugin-content-docs/current/tiempo-circular/` que declare que el programa está solo en español y enlace a la versión en español
- [ ] 1.7 Verificar que `npm run build` pasa con el andamiaje vacío y que todas las rutas `/ciudadbots/*` y `/guategeeks/*` siguen resolviendo sin cambios

## 2. Alineación curricular (antes del contenido)

- [ ] 2.1 Extraer de `CNB_Guatemala_Mallas_Curriculares_Basico/` los indicadores de Segundo Básico que el programa reclamará, con código, texto y página fuente declarada por la malla
- [ ] 2.2 Verificar una por una las citas de MAT 1.2, MAT 1.3, MAT 2.1, MAT 2.2, MAT 2.3, MAT 5.1, MAT 5.2, MAT 5.3, CN 1.1, CN 1.2, CN 1.3, CN 4.3, TAC 1.1, TAC 1.3 y las de Comunicación y Lenguaje contra los archivos de `areas/`
- [ ] 2.3 Construir la matriz sesión × competencia para las 12 sesiones, asegurando que ninguna sesión quede sin al menos una competencia y que ninguna cita provenga de otro grado
- [ ] 2.4 Redactar la nota de alcance parcial para cada competencia que el programa reclame sin cubrir todos sus contenidos de malla
- [ ] 2.5 Verificar los códigos CSTA Nivel 2 (grados 6-8), NGSS MS-ETS1 e ISTE contra sus fuentes, y descartar cualquier código que no se pueda confirmar
- [ ] 2.6 Escribir `docs/tiempo-circular/alineacion-cnb.mdx` con áreas cubiertas, matriz, leyenda con páginas y las notas de alcance

## 3. Sketches ESP32

- [ ] 3.1 Escribir `arduino/tiempo-circular/README.md` con el contrato de hardware canónico y el mapa de pines único (VCC→3.3 V, GND, SCL→GPIO18, SDA→GPIO23, DC→GPIO25, CS→GPIO26, RST→GPIO27)
- [ ] 3.2 Escribir `01_pantalla_viva` — SPI, `begin()`, rotación, relleno y texto; verifica cableado
- [ ] 3.3 Escribir `02_color_y_bits` — construir RGB565 desde componentes, mostrar el mismo color en binario, hexadecimal y decimal
- [ ] 3.4 Escribir `03_geometria_circular` — centro y radio, marcas en ángulos notables cada 30°, y manecilla colocada con `sin`/`cos` incluyendo la conversión a radianes y el signo negativo en Y
- [ ] 3.5 Escribir `04_reloj_millis` — reloj analógico y digital sobre `millis()`, con redibujo parcial de manecillas y sin ninguna llamada de red
- [ ] 3.6 Escribir `05_reloj_ntp` — WiFi, `configTime` con offset UTC-6 y sin horario de verano, y el mismo reloj ya corregido
- [ ] 3.7 Crear el patrón `credenciales.h` separado, documentado como no versionable, y añadirlo a `.gitignore`
- [ ] 3.8 Escribir `06_cholqij` — anillo de 20 nawales a 18° exactos, ciclo de 13 a 360/13, y conteo desde una constante de ancla configurable; sin constante de correlación inventada
- [ ] 3.9 Escribir un `README.md` por sketch con subsistema bajo prueba, referencia de pines, nivel de reto, qué debe observarse en pantalla y plantilla de evidencia
- [ ] 3.10 Verificar que los `#define` de pines de los seis sketches coinciden exactamente con el mapa publicado
- [ ] 3.11 Escribir `HARDWARE_SHOPPING_LIST.md` sin RTC y sin módulo SD, con cantidades por equipo y costos marcados como estimados
- [ ] 3.12 Escribir `TROUBLESHOOTING.md` propio del ESP32: gestor de tarjetas, driver USB-serie, selección de placa y puerto, instalación de `DIYables_TFT_Round` con dependencias
- [ ] 3.13 Escribir `LICENCIAS.md` declarando MIT para el código propio, la licencia de `DIYables_TFT_Round` como citada y no vendorizada, y que `watch/` aportó solo pinout, cableado, identificación de librería y fotografías de referencia
- [ ] 3.14 Marcar en cada README y en `TROUBLESHOOTING.md` que el sketch **no** ha sido validado en hardware físico
- [ ] 3.15 Intentar un chequeo de compilación con `arduino-cli` contra el core ESP32; si la herramienta o el core no están disponibles, registrar explícitamente que no se ejecutó

## 4. Páginas de sesión

- [ ] 4.1 `01-sistemas-de-una-pantalla.mdx` — reto 0, periféricos de entrada/salida/comunicación, SPI; entregable: diagrama de bloques anotado
- [ ] 4.2 `02-energia-y-conexiones-seguras.mdx` — reto 0, 3.3 V vs 5 V, orientación VCC/GND; entregable: checklist firmado
- [ ] 4.3 `03-el-primer-pixel.mdx` — reto 1, sketch `01`; entregable: pantalla encendida y bitácora de cableado
- [ ] 4.4 `04-el-color-es-un-numero.mdx` — reto 1, sketch `02`, valor posicional en base 2 y 16; entregable: tabla de colores en binario, hex y decimal
- [ ] 4.5 `05-la-pantalla-es-un-plano.mdx` — reto 1, sketch `03`, Y crece hacia abajo; entregable: carátula con centro y radio medidos
- [ ] 4.6 `06-angulos-notables.mdx` — reto 2, sketch `03`; entregable: 12 marcas a 30° y justificación de la simetría
- [ ] 4.7 `07-seno-y-coseno.mdx` — reto 2, sketch `03`, conversión a radianes; entregable: manecilla que apunta a un ángulo pedido
- [ ] 4.8 `08-el-reloj-que-deriva.mdx` — reto 2, sketch `04`, el segundero como MCU a 6°/s; entregable: reloj analógico y digital funcionando
- [ ] 4.9 `09-medir-la-deriva.mdx` — reto 3, sketch `04`, procedimiento de comparación contra un patrón; entregable: tabla de error con cifras significativas
- [ ] 4.10 `10-la-hora-de-la-red.mdx` — reto 3, sketch `05`, husos horarios y UTC-6; entregable: reloj sincronizado
- [ ] 4.11 Escribir dentro de la sesión 10 la ruta alterna sin red, con su propia evidencia, de modo que el programa se complete sin NTP
- [ ] 4.12 `11-cholqij.mdx` — reto 3, sketch `06`, 13×20, 18° exactos y 360/13 no exacto, redondeo y error acumulado; entregable: carátula Cholq'ij y cálculo de pasos angulares
- [ ] 4.13 Escribir en la sesión 11 los límites declarados: el programa trabaja ciclo y aritmética, no práctica ceremonial ni lectura de nawales, y no habla en nombre de comunidades mayas ni de ajq'ijab'
- [ ] 4.14 `12-reto-integrador.mdx` — reto 4; entregable: carátula propia diseñada y presentación técnica
- [ ] 4.15 Verificar que las doce páginas usan una sola instancia de `SessionModule` con las cuatro fases en orden `act`, `exp`, `cre`, `ref` y sin advertencias de validación de orden
- [ ] 4.16 Verificar que los niveles de reto asignados son 0,0,1,1,1,2,2,2,3,3,3,4 y no decrecen en ningún punto
- [ ] 4.17 Verificar que cada `SessionModule.Cnb` cita código de indicador, qué exige y página en formato `(p. NN)`

## 5. Recursos docentes

- [ ] 5.1 `index.mdx` — declara segundo básico y por qué, redirige a CiudadBots para 1.º y a GuateGeeks SMARS para 3.º, y publica las tres rutas de calendario
- [ ] 5.2 `guia-docente.mdx` — tabla de las 12 sesiones con fase, sketch, nivel de reto y entregable; materiales por bloque; cómo partir la fase Crear en la ruta escolar
- [ ] 5.3 Añadir a la guía docente la recomendación de en qué momento del calendario escolar arrancar, dado que MAT 1.3 llega a mitad de año
- [ ] 5.4 Añadir a la guía docente qué evidencia sustituye a la sesión 11 para un equipo que solo construya la carátula de 12 horas
- [ ] 5.5 `materiales.mdx` — lista por equipo con cantidades, el mapa de pines, y la declaración de que el hardware está especificado pero no adquirido ni validado en campo
- [ ] 5.6 `seguridad.mdx` — checklist de 3.3 V: orientación VCC/GND, 3.3 V vs 5 V en el pin de alimentación del display, verificar antes de energizar, desconectar USB antes de recablear, manipular placas por los bordes
- [ ] 5.7 `roles.mdx` — cuatro roles adaptados a un proyecto de pantalla y código, con cadencia de rotación
- [ ] 5.8 `rubrica.mdx` — rúbrica de 100 puntos cuyos pesos sumen exactamente 100, cubriendo seguridad y cableado, razonamiento geométrico y trigonométrico, calidad de código, manejo de datos, diseño de la carátula y comunicación técnica
- [ ] 5.9 `preguntas-socraticas.mdx` — organizadas por síntoma observable: pantalla en blanco, colores equivocados, manecilla apuntando mal, reloj adelantado o atrasado
- [ ] 5.10 `misconcepciones.mdx` — Y de pantalla vs Y matemática, 0° no son las 12, el verde de RGB565 tiene 6 bits, un color hexadecimal no es un decimal, la deriva de `millis()` es del oscilador y no un error de código
- [ ] 5.11 `plantillas.mdx` — tabla de medición de deriva, hoja de ángulos y coordenadas, y hoja de planificación de carátula
- [ ] 5.12 `licencias.mdx` — MIT del código propio, CC BY-SA 4.0 y atribución Mineduc/DIGECUR de las mallas, licencia de `DIYables_TFT_Round` citada, y que el material de esp32io.com se enlaza y no se redistribuye
- [ ] 5.13 Publicar en `licencias.mdx` o en la página Cholq'ij la lista de fuentes del contenido del calendario, empezando por la malla del Mineduc, y la variante lingüística y fuente de cualquier nombre de nawal usado

## 6. Compuertas humanas y verificación

- [ ] 6.1 **Human-gated:** obtener revisión del contenido Cholq'ij por una persona con conocimiento del calendario maya, y registrar quién revisó y qué cambió como resultado. El contenido no se publica sin esto
- [ ] 6.2 **Human-gated:** resolver la fuente publicada y verificable para el ancla de correlación Cholq'ij–gregoriana, o confirmar que se entrega como constante configurada por el docente
- [ ] 6.3 **Human-gated:** validar los seis sketches en hardware físico cuando exista el equipo, y solo entonces retirar la marca de no verificado
- [ ] 6.4 Confirmar que ningún archivo de `watch/esp32-round-circular-tft-lcd-display-assets/` fue copiado a `static/`, y que las referencias a ese material son enlaces atribuidos
- [ ] 6.5 Decidir y ejecutar la sustitución de imágenes: diagramas propios de cableado y de pantalla en lugar de las fotografías de esp32io.com
- [ ] 6.6 Ejecutar `npm run build` y confirmar cero enlaces internos rotos, con `onBrokenLinks: 'throw'` activo
- [ ] 6.7 Ejecutar `npm run typecheck` y confirmar que pasa
- [ ] 6.8 Revisar el sitio construido en la locale inglesa y confirmar que el namespace `/tiempo-circular/*` sirve el stub y no cae en español sin aviso
- [ ] 6.9 Verificar en el sitio construido que la portada, el navbar y el footer listan los tres programas y que cada uno declara el grado que atiende
- [ ] 6.10 Revisar el programa completo contra los cinco archivos de `openspec/changes/tiempo-circular-segundo-basico/specs/` y confirmar que cada requisito tiene su escenario cumplido o su brecha declarada
