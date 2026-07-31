## Context

El hub sirve dos programas y deja un hueco: CiudadBots (LEGO SPIKE, 1.º-3.º) y GuateGeeks SMARS (Arduino, tercero). **Segundo básico** no tiene ruta propia hacia electrónica y código. Este diseño describe cómo se construye el tercer programa, `Tiempo Circular`, sobre la infraestructura que ya existe.

Tres condiciones del entorno mandan sobre casi todas las decisiones:

1. **El hub es aditivo.** `routeBasePath: '/'` con un subdirectorio de `docs/` por programa significa que agregar un programa es agregar una carpeta, un sidebar y un ítem de navbar. No hay que mover nada.
2. **El material fuente está roto.** El HTML guardado en `watch/` perdió el cuerpo de todos los sketches: `TFT_display.<método>` aparece **cero veces** en 81 KB. Sobreviven comentarios, llaves, el pinout, el diagrama de cableado, la identificación de la librería y 14 fotografías. Es una referencia de hardware, no una fuente de código.
3. **No hay hardware.** Nada de lo que se escriba puede declararse verificado en físico durante este cambio.

El marco pedagógico no se rediseña: la sesión de SMARS —`SessionModule` con cuatro fases, retos 0-4, cuatro roles rotativos— se adopta tal cual, por decisión explícita del solicitante.

## Goals / Non-Goals

**Goals:**

- Un programa de 12 sesiones para segundo básico bajo `/tiempo-circular/*`, sin tocar ninguna ruta ni página existente.
- Alineación honesta y verificable a la malla de **Segundo Básico**, con código de indicador y página fuente en cada cita.
- Seis sketches ESP32 propios, por capas, comentados en español, con el `.ino` como fuente única de lo que se muestra y de lo que se descarga.
- Un arco `millis()` → medir la deriva → NTP que convierta el error del reloj en contenido, no en defecto.
- Una carátula Cholq'ij que entregue MAT 5.1/5.2/5.3 con su aritmética explícita, con límites declarados y compuerta de revisión cultural.
- Reutilización de los componentes existentes sin modificar su contrato público.

**Non-Goals:**

- No se verifica nada en hardware físico. No se afirmará lo contrario.
- No se traduce el programa al inglés más allá de un stub que declara la limitación.
- No se rediseña `SessionModule` ni se crea un modelo de contenido paralelo.
- No hay RTC, no hay tarjeta SD, no hay Bluetooth, no hay app externa.
- No se enseña práctica ceremonial maya ni lectura espiritual de nawales.
- No se redistribuyen las imágenes de esp32io.com.

## Decisions

### D1 — Segundo básico, y la malla lo sostiene sin forzar

**Decisión:** el programa se declara para segundo básico y cita únicamente competencias de ese grado.

La malla de segundo pide literalmente lo que una carátula redonda obliga a calcular. No es analogía:

| Lo que el proyecto obliga a hacer | Competencia CNB Segundo Básico | p. |
|---|---|:-:|
| Colocar una manecilla en un ángulo dado | **MAT 1.3.1** razones trigonométricas del triángulo rectángulo (seno, coseno, tangente) | 13 |
| Marcar la carátula cada 30° | **MAT 1.2.2** ángulos notables en la circunferencia | 13 |
| Repetir una marca doce veces por rotación | **MAT 1.2.3** simetría y transformaciones | 13 |
| Trazar círculo y polígonos en 240×240 | **MAT 1.2.1** polígonos y círculos | 13 |
| Componer un color RGB565 desde sus bits | **MAT 5.1** sistemas posicionales, valor absoluto y relativo, potencias | 15 |
| Anillo de 20 nawales, ciclo de 13 | **MAT 5.2**, **MAT 5.3** ciclos Cholq'ij y Hab', el 13 y el 20 | 15 |
| Mapear un valor a un ángulo | **MAT 2.2 / 2.3** función lineal, pendiente, variación directa | 13-14 |
| Condiciones compuestas en el código | **MAT 2.1** conectivos lógicos y tablas de verdad | 13 |
| Medir la deriva y reportarla | **CN 1.3** medición, error experimental, cifras significativas | 16 |
| El segundero a 6°/s | **CN 4.3.1** movimiento circular uniforme | 21 |
| Display como periférico, SPI como comunicación | **TAC 1.1** periféricos de entrada, salida y comunicación | 15 |
| Bitmap: bytes, resolución, formatos | **TAC 1.3.3** formatos de imagen, dpi, tamaño en bytes | 15-16 |

**Alternativas descartadas:** ofrecerlo como electiva de tercero (duplicaría a SMARS y dejaría el hueco abierto); ofrecerlo transversal 1.º-3.º (la trigonometría de MAT 1.3 no existe en primero, así que la mitad del programa quedaría sin anclaje).

**Consecuencia operativa:** MAT 1.3 llega a mitad de año en segundo. La guía docente debe decir en qué momento del calendario escolar conviene arrancar, o los estudiantes encuentran `sin()` antes que la clase de matemática.

### D2 — `watch/` es referencia de hardware; todo el código se escribe de cero

**Decisión:** ningún sketch deriva del tutorial guardado.

No es una preferencia de estilo: **no hay código que derivar.** Lo que el guardado dejó:

```
Lo que quedó en <pre><code>:        Lo que debería decir:
  void                                void setup() {
    Serial                              Serial.begin(9600);
    TFT_display                         TFT_display.begin();
    // Set the rotation (0 to 3)        // Set the rotation (0 to 3)
    TFT_display                         TFT_display.setRotation(2);
    float                               float temperature = 25.5;
```

Se conserva y se usa: pinout de 7 pines, mapa de cableado a GPIO, identificación de `DIYables_TFT_Round` + Adafruit GFX, las capacidades a cubrir (texto, fuentes, formas, bitmap, reloj) y 14 fotografías como referencia visual **de consulta, no de publicación**.

**Alternativa descartada:** reconstruir los sketches del tutorial por inferencia. Produciría código no verificable atribuido a una fuente que no lo dice, con el peor resultado posible: parecer autoritativo sin serlo. Además los ejemplos de esp32io son demostraciones, no lecciones por capas.

### D3 — Seis sketches en capas, un subsistema nuevo por capa

| Sketch | Sesiones | Qué prueba en aislamiento |
|---|:--:|---|
| `01_pantalla_viva` | 3 | SPI, alimentación, `begin()`, rotación, un relleno y un texto. Verifica cableado. |
| `02_color_y_bits` | 4 | RGB565 construido desde bits; mismo color en binario, hex y decimal. |
| `03_geometria_circular` | 5-7 | Centro y radio, marcas en ángulos notables, manecilla por seno y coseno. |
| `04_reloj_millis` | 8-9 | Reloj analógico + digital sobre `millis()`, redibujo parcial. Sin red. |
| `05_reloj_ntp` | 10 | WiFi, NTP, UTC-6, y el mismo reloj ya corregido. |
| `06_cholqij` | 11 | Anillo de 20 a 18°, ciclo de 13 a 360/13, conteo desde un ancla configurada. |

Si el reloj falla, se vuelve a la capa anterior para localizar el problema — el mismo principio de depuración que SMARS.

### D4 — El sistema de coordenadas se enseña, no se esconde

La pantalla crece hacia abajo en Y; la matemática de clase crece hacia arriba. El 0° del display no es las 12. Esconder esa fricción con una función mágica desperdicia la mejor oportunidad del programa.

```
        pantalla 240×240              θ medido en sentido horario desde las 12
        centro (120,120)  r=120
                                            x = cx + r · sin(θ)
              0,0 ────────► x               y = cy − r · cos(θ)      ← el signo
               │      12                                                 negativo
               │   ╭───┼───╮                θ_rad = θ_grados · π / 180     es la
               │   │   ●   │  9 ── 270°                                  lección
               ▼   ╰───┼───╯                segundero  6°/s   ← MCU (CN 4.3.1)
               y       6                    minutero   6°/min
                                            horario   30°/h + 0.5°/min
```

`sin` y `cos` de Arduino toman **radianes**. La conversión explícita es contenido, no ruido.

### D5 — RGB565 como valor posicional, no como constante mágica

```
   bit  15 14 13 12 11 │ 10  9  8  7  6  5 │  4  3  2  1  0
        R  R  R  R  R  │  G  G  G  G  G  G │  B  B  B  B  B
         5 bits (32)   │    6 bits (64)    │   5 bits (32)

   color = (r >> 3) << 11 | (g >> 2) << 5 | (b >> 3)

   ROJO  0xF800 = 1111 1000 0000 0000      ¿por qué el verde tiene 6 bits?
   VERDE 0x07E0 = 0000 0111 1110 0000      → el ojo humano distingue más verdes
   AZUL  0x001F = 0000 0000 0001 1111      → 2^16 = 65 536 colores, no 16.7 M
```

Esto **es** MAT 5.1: valor absoluto y relativo, potencias en sistemas posicionales. Se trabaja base 2 y base 16 aquí, y base 20 en la sesión 11 — la malla pide explícitamente base 20.

### D6 — `millis()` → medir la deriva → NTP

**Decisión:** el reloj se construye mal a propósito, su error se mide, y después se corrige.

```
  s8  reloj sobre millis()          funciona, y se ve correcto
  s9  medirlo contra un patrón      deriva de segundos por hora → tabla, cifras
                                     significativas, error relativo  (CN 1.3)
  s10 configTime(-6*3600, 0, ...)   NTP, huso horario, y por qué UTC existe
```

`millis()` viene del oscilador del ESP32 y deriva de forma medible; además se reinicia al apagar. Ambos hechos son observables en una clase. La secuencia "constrúyelo → descubre que está mal → mide cuánto → arréglalo" es el ciclo de indagación de CN 1.2/1.3, no una concesión.

**Alternativas descartadas:** DS3231 (≈Q25/equipo extra y un módulo más que conseguir y quebrar, a cambio de I²C que el programa no necesita todavía); NTP desde el inicio (regala la lección de error y hace el programa dependiente de red desde la sesión 8).

**Mitigación obligatoria:** el WiFi escolar guatemalteco no es confiable. La sesión 10 lleva **ruta alterna sin red** —ajuste manual de hora con los botones o por Monitor Serie, y la discusión de husos horarios sostenida con datos, no con la conexión— de modo que el programa se completa sin NTP.

**Credenciales:** van en un `credenciales.h` propio, separado del sketch y documentado como no versionable, para que un aula no publique el SSID de su escuela al compartir código.

### D7 — Redibujo parcial, sin framebuffer completo

Un framebuffer de 240×240×2 B = **115 KB**. El ESP32 tiene margen, pero no junto con el stack de WiFi. Se borra la manecilla anterior redibujándola en color de fondo y se repinta en la nueva posición.

Efecto secundario aprovechable: si un equipo borra la pantalla entera cada cuadro, **ve el parpadeo**. Esa es la sesión donde el costo de una decisión de implementación se vuelve visible.

### D8 — Cholq'ij: la aritmética se enseña, el ancla se declara, la revisión se exige

```
   Cholq'ij = 13 números × 20 nawales = 260 días

   anillo de 20   →  360 / 20 = 18°           exacto
   ciclo de 13    →  360 / 13 = 27.6923…°     NO exacto  ← aquí vive la lección

   redondear a 27.7° y dar 13 pasos = 360.1°  → error acumulado de 0.1°
   ¿se ve en pantalla a r = 100 px?  → 0.1° ≈ 0.17 px  → no se ve, pero existe
```

Ese divisor no entero entrega redondeo, error acumulado y cifras significativas sin inventar un pretexto, y el anillo de 20 vuelve tangible la base 20 que la malla pide: **la posición en pantalla es el valor posicional.**

**Decisión sobre la correlación con el calendario gregoriano:** el programa **no** codifica una constante de correlación propia. El ancla —qué día del Cholq'ij corresponde a una fecha dada— se configura como una constante que el docente toma de una fuente publicada y verificable, y el dispositivo cuenta hacia adelante desde ahí. Es honesto (el programa no afirma una correlación que no puede verificar) y es contenido: el modelo necesita un dato que la máquina no puede deducir sola.

**Límites declarados:** el programa trabaja la estructura del ciclo, su aritmética y su representación circular. No enseña práctica ceremonial ni lectura de nawales, y no habla en nombre de comunidades mayas ni de ajq'ijab'.

**Compuerta:** el contenido no se publica sin revisión de una persona con conocimiento del calendario maya. Queda como tarea *human-gated* pendiente.

**Salida alterna:** un equipo que solo construya la carátula de 12 horas completa el programa; la guía docente dice qué evidencia sustituye a la sesión 11.

### D9 — Estándares internacionales en la banda de octavo grado

Segundo básico ≈ 8.º grado. Se cita **CSTA Nivel 2 (grados 6-8)**, **NGSS MS-ETS1** e **ISTE** con sub-indicador. SMARS usa 3A y HS-ETS1 porque tercero ≈ 9.º; la diferencia es deliberada y debe mantenerse. Todo código citado se verifica contra la fuente antes de publicar.

### D10 — Secuencia de 12 sesiones

| # | Fase | Sesión | Sketch | Reto | Entregable |
|--:|---|---|:--:|:--:|---|
| 1 | Activar | Sistemas de una pantalla | — | 0 | Diagrama de bloques anotado |
| 2 | Activar | Energía, 3.3 V y conexiones seguras | — | 0 | Checklist de seguridad firmado |
| 3 | Explorar | El primer píxel | `01` | 1 | Pantalla encendida + bitácora de cableado |
| 4 | Explorar | El color es un número | `02` | 1 | Tabla de colores en binario, hex y decimal |
| 5 | Crear | La pantalla es un plano | `03` | 1 | Carátula trazada con centro y radio medidos |
| 6 | Crear | Ángulos notables en la circunferencia | `03` | 2 | 12 marcas a 30° y justificación de la simetría |
| 7 | Crear | Seno y coseno colocan la manecilla | `03` | 2 | Manecilla que apunta a un ángulo pedido |
| 8 | Crear | El reloj que deriva | `04` | 2 | Reloj analógico y digital funcionando |
| 9 | Crear | Medir la deriva | `04` | 3 | Tabla de error con cifras significativas |
| 10 | Crear | La hora que viene de la red | `05` | 3 | Reloj sincronizado (o evidencia de la ruta alterna) |
| 11 | Crear | Cholq'ij: el 13 y el 20 en la carátula | `06` | 3 | Carátula Cholq'ij + cálculo de los pasos angulares |
| 12 | Reflexionar | Reto integrador: carátula propia | — | 4 | Carátula diseñada y presentación técnica |

Fases por bloque: Activar 1-2, Explorar 3-4, Crear 5-11, Reflexionar 12 — idéntico a SMARS. Retos: 0,0,1,1,1,2,2,2,3,3,3,4, monótonos no decrecientes.

### D11 — Reutilización de componentes sin modificarlos

`SessionModule`, `SketchBlock`, `CnbBlock`, `FlagNote`, `PhaseTimeline`, `RubricTable`, `AchievementIndicators`, `HorizontalStepReader` y `VisualStepGuide` se usan tal cual. El plugin `arduinoSketchRawImport` ya resuelve el import crudo de `.ino` por extensión, así que **no requiere cambios en `docusaurus.config.ts`** más allá del navbar y el footer. Si algún componente resulta acoplado a GuateGeeks SMARS, se generaliza sin alterar su salida actual.

`HorizontalStepReader` y `VisualStepGuide` acaban de aterrizar y todavía están sin versionar en git; conviene confirmar que estén comprometidos antes de construir contenido encima.

**Corregido por D13:** `SessionModule` resultó no ser reutilizable. Ver esa decisión.

### D12 — Las imágenes de `watch/` se usan, con atribución

**Decisión del solicitante**, tomada tras plantearle el reparo: las 14 imágenes de
`watch/esp32-round-circular-tft-lcd-display-assets/` **se copian** a
`static/assets/tiempo-circular/` y se usan en el programa.

El reparo planteado fue que son material de marketing de terceros: el diagrama de cableado lleva la
marca de agua `https://diyables.io` repetida tres veces, y varias imágenes muestran el producto con
la marca DIYables. La alternativa ofrecida era generar mockups SVG propios de 240×240 —las salidas
de pantalla son determinísticas y calculables desde nuestros propios sketches— más diagramas
propios de pinout y cableado. El solicitante confirmó el uso de las imágenes originales dos veces.
Queda registrado y se procede.

**Obligaciones que esto impone**, y que son parte del trabajo, no un anexo:

1. Cada imagen reproducida lleva **crédito visible** a esp32io.com / DIYables donde se muestra.
2. `licencias.mdx` incluye una tabla que nombra las 14 imágenes y su origen, separadas del material
   propio de GuateGeeks.
3. Los nombres de archivo se preservan, de modo que cualquiera pueda rastrear cada imagen hasta la
   página original.
4. Los dos escenarios de spec que prohibían la redistribución quedaron modificados; el cambio no
   puede contener a la vez la prohibición y la práctica.

**Riesgo residual, declarado una vez:** la marca de agua es de un competidor comercial y no hay
licencia expresa de reproducción. Si más adelante se quiere retirar esa dependencia, la ruta de
mockups SVG propios sigue disponible y no requiere hardware.

**Qué siguen sin cubrir estas imágenes:** el módulo GC9A01 mostrado no corre nuestro código. Ninguna
de las 14 imágenes muestra la salida de nuestros sketches —ni la carátula del Cholq'ij, ni los
anillos, ni las marcas de 30°—, porque ese código no existía cuando se hizo el tutorial. Para esas
pantallas no hay foto posible sin hardware, así que las sesiones 5, 6, 7 y 11 se apoyan en diagramas
y en la descripción de lo que debe verse.

### D13 — `SessionModule` se parametriza, con `guategeeks` por defecto

**Problema descubierto durante la implementación.** El diseño original (D11) asumió que
`SessionModule` era reutilizable tal cual. No lo es. Está acoplado a GuateGeeks SMARS en cinco
puntos, y tres de ellos producirían texto **falso** en una página de Tiempo Circular:

| Punto | Acoplamiento | Efecto en este programa |
|---|---|---|
| `index.tsx:6` | importa `getSession` de `@site/src/data/guategeeks` | `getSession` **lanza** con un id desconocido, y `s1`–`s12` ya pertenecen a SMARS |
| `index.tsx:282` | título del bloque CNB fijo en `«Ciclo Básico · Tercero Básico»` | Grado equivocado |
| `index.tsx:396` | «adoptado del proyecto SMARS… Arduino Uno sin librerías externas» | Las tres afirmaciones son falsas aquí |
| `index.tsx:406` | «STBY debe quedar en HIGH para que el driver habilite los motores» | No hay STBY ni driver de motores |
| `data/guategeeks` | `SKETCHES_BASE`, `WIRING_REFERENCE` apuntan a `/guategeeks/` | Descargas y enlaces al otro programa |

**Decisión:** parametrizar. `SessionModule` acepta un prop `program` cuyo **valor por defecto es
`'guategeeks'`**, de modo que las doce páginas de SMARS no se tocan y su salida queda idéntica.

```
   src/data/
     guategeeks/          ← intacto
     tiempo-circular/     ← nuevo, mismo contrato: types, sessions, titles, index
       sessions.ts          ids tc1…tc12, slugs propios, SKETCHES_BASE
                            '/arduino/tiempo-circular/', WIRING_REFERENCE
                            '/tiempo-circular/materiales'

   src/components/SessionModule/
     index.tsx            ← program?: 'guategeeks' | 'tiempo-circular' = 'guategeeks'
                            resuelve registro, grado del bloque CNB, y los dos
                            textos de la pestaña Código desde la config del programa
```

**Alternativas descartadas:** duplicar el componente (≈480 líneas repetidas, y viola el escenario
«no parallel session component is created» que este mismo cambio declara); componer las sesiones en
MDX con piezas sueltas (pierde el lector por pestañas, la validación de orden de fases y la escalera
de retos, y obligaría a reescribir el requisito de estructura de sesión).

**Cuidado operativo:** `SessionModule/index.tsx` ya está modificado en el árbol de trabajo por dos
cambios en curso (`guategeeks-smars-ciclo-basico`, `guategeeks-smars-l293d-visual-build`). El prop
con valor por defecto mantiene la salida de SMARS byte a byte, pero conviene revisar el diff.

### D14 — El defecto del reloj está documentado en la fuente, y se enseña

La revisión completa del tutorial —la primera pasada solo cubrió un tercio— encontró que la fuente
**documenta los defectos de su propio reloj**:

> *«The clock hands may flicker or leave traces because the drawHand function tries to erase them by
> drawing over in background color. Overlapping hands may not clear correctly.»*
> *«The digital time may look slightly off-center. This is due to variable text widths.»*

**Corrección:** una primera lectura de este diseño afirmó que nuestro `04_reloj_millis` heredaba el
defecto de manecillas superpuestas. **No lo hereda.** El sketch borra las tres manecillas y las
redibuja las tres, incondicionalmente, cada segundo:

```
   Tutorial (falla)                   Nuestro sketch (no falla)
   ───────────────────                ─────────────────────────
   si cambió el segundero:            si cambió el segundo:
     borrar segundero                   borrar segundero
     dibujar segundero                  borrar minutero
   si cambió el minutero:               borrar horario
     borrar minutero                    redibujar carátula
     dibujar minutero                   dibujar horario
                                        dibujar minutero
   ↑ el borrado del segundero           dibujar segundero
     corta el minutero, que no
     se redibuja porque su            ↑ nada es condicional por manecilla,
     ángulo no cambió                   así que el hueco no puede quedar
```

Como ningún borrado ni dibujo está condicionado al ángulo de una manecilla individual, el hueco que
describe el tutorial no puede quedar. El costo es repintar la carátula una vez por segundo, que a
1 Hz sobre SPI no es perceptible.

**Decisión (pregunta abierta 7, resuelta):** no se introduce el defecto para luego arreglarlo. El
sketch queda correcto, y el defecto del tutorial se enseña **como caso de estudio** en
`misconcepciones.mdx`: por qué la versión "eficiente" que solo toca lo que cambió produce un error
que la versión "derrochadora" no tiene. Es una lección sobre optimización prematura que se sostiene
sin entregar código roto a un aula.

Otros dos hallazgos de la misma revisión, incorporados:

- **Las fuentes externas de Adafruit GFX no renderizan el símbolo `°`.** Va a
  `misconcepciones.mdx`: una fuente no es solo una forma de las letras, es también un repertorio de
  caracteres, y puede no traer el que se necesita.
- **La carátula del tutorial lleva 12 números y 60 marcas de minuto.** 360/60 = 6° exactos. Contrasta
  con el 360/13 ≈ 27.69° del Cholq'ij: dos divisores, uno entero y otro no, sobre la misma
  circunferencia. Se usa en la sesión 6 para anticipar la sesión 11.

### D15 — Bitmap y formatos de imagen entran como extensión de la sesión 12

El tutorial trae el flujo completo del conversor imagen→bitmap, que es la actividad de **TAC 1.3.3**
(formatos de imagen, resolución, tamaño en bytes) ya diseñada: subir una imagen, elegir ancho ≤240
px, escoger color de fondo para las zonas transparentes, convertir, pegar el arreglo en un
`bitmap.h` creado como pestaña nueva del IDE.

**Decisión:** entra como **extensión de la sesión 12**, no como sesión nueva —el programa se mantiene
en doce— y **sin tarjeta SD**: la imagen se carga desde memoria de programa. Un equipo que diseñe su
carátula puede incluir un logo propio y calcular cuánta memoria ocupa.

Aporta además la conversión de unidades que CN 1.3 pide: una imagen de 240×240 en RGB565 ocupa
240 × 240 × 2 = **115 200 bytes**, que no caben cómodamente junto al stack de WiFi. El límite deja de
ser una regla arbitraria y pasa a ser una cuenta.

**Gotcha que se documenta:** si se modifica `bitmap.h` sin tocar el `.ino`, el Arduino IDE no
recompila. Hay que introducir un cambio mínimo en el `.ino` para que note la actualización.

## Risks / Trade-offs

- **[Nada se puede probar en hardware]** → Todo sketch se marca explícitamente como no verificado en físico; la verificación queda como tarea *human-gated*. Como máximo se ejecuta un chequeo de compilación con `arduino-cli` contra el core ESP32, y si no está disponible se reporta que no se hizo. No se declarará "funciona".
- **[El WiFi escolar no responde y la sesión 10 se cae]** → La ruta alterna sin red es requisito, no cortesía: el programa se completa sin NTP.
- **[Cadena de herramientas ESP32 distinta a la del Uno]** → Gestor de tarjetas, driver USB-serie y sus fallas típicas se documentan en `TROUBLESHOOTING.md` propio; no se asume nada del flujo de SMARS.
- **[Contenido Cholq'ij mal tratado]** → Anclaje en la malla, límites declarados, fuentes citadas, sin constante de correlación inventada, y compuerta de revisión cultural antes de publicar. Si la revisión no ocurre, el contenido no sale.
- **[Costo por equipo desconocido]** → El hardware es hipotético. La página de materiales lo dice y presenta los costos como estimados, sin fingir un presupuesto validado.
- **[MAT 1.3 aún no vista en clase de matemática]** → La guía docente indica el momento del calendario escolar en que conviene arrancar y qué preparar si la trigonometría todavía no se ha trabajado.
- **[Citas CNB o de estándares mal transcritas]** → Cada cita se verifica contra `CNB_Guatemala_Mallas_Curriculares_Basico/` y contra la fuente del estándar antes de publicar; el número de página es parte obligatoria del formato.
- **[Imágenes de esp32io.com reproducidas sin licencia expresa]** → Decisión del solicitante (D12), tomada tras plantearle el reparo. Mitigación: crédito visible en cada uso, tabla de procedencia en `licencias.mdx` y nombres de archivo preservados. La ruta de mockups SVG propios queda disponible si se quiere retirar la dependencia.
- **[Ninguna imagen muestra la salida de nuestros sketches]** → Las 14 fotografías son del tutorial original, no de nuestro código. Las sesiones 5, 6, 7 y 11 se apoyan en diagramas propios y en la descripción de lo que debe verse, no en fotos.
- **[Parametrizar `SessionModule` toca un archivo que dos cambios en curso están editando]** → El prop `program` con valor por defecto `'guategeeks'` deja la salida de SMARS idéntica; se revisa el diff antes de dar por cerrado.
- **[Un tercer programa recarga el navbar]** → Aceptado. Tres ítems más el selector de idioma siguen siendo manejables; si crece a un cuarto, tocará un menú desplegable de programas.

## Migration Plan

No hay migración: el cambio es puramente aditivo. Ninguna ruta, página, componente ni sketch existente se modifica, salvo el navbar, el footer y la portada, que ganan una entrada.

**Reversión:** eliminar `docs/tiempo-circular/`, `arduino/tiempo-circular/`, `static/assets/tiempo-circular/`, el stub de i18n, la entrada de `sidebars.ts` y las tres entradas de navegación. El sitio vuelve al estado previo sin residuo.

**Orden de construcción:** andamiaje y navegación → alineación CNB (define qué enseña cada sesión) → sketches → páginas de sesión → recursos docentes → verificación de build. La alineación va antes que el contenido a propósito: si las citas no se sostienen, es mejor descubrirlo antes de escribir doce sesiones sobre ellas.

## Open Questions

1. **Ancla del Cholq'ij** — **resuelto en cuanto al mecanismo:** el ancla queda como constante que el docente configura, y el material trae el procedimiento de verificación —contrastar una fecha conocida contra **dos** fuentes publicadas independientes antes de darla por buena—. Qué fuente concreta se recomienda sigue siendo compuerta humana (tarea 6.2).
2. **Revisión cultural** — ¿quién la hace? Es compuerta de publicación, no una mejora opcional. Sigue abierta por diseño: no es algo que se pueda resolver desde el código.
3. ~~**Fotografías**~~ — **resuelto en D12:** se usan las 14 imágenes de `watch/` con atribución. Queda abierto solo si más adelante se decide sustituirlas por mockups propios.
4. **Costo real por equipo en Guatemala** — dato externo que no se puede resolver desde aquí. Se entrega como rango estimado explícitamente marcado como tal, más una ruta de escala reducida (un dispositivo por aula) para que el programa no dependa de que el presupuesto alcance.
5. ~~**Bitmap y formatos de imagen (TAC 1.3.3)**~~ — **resuelto en D15:** entra como extensión de la sesión 12, sin tarjeta SD.
6. **Ventana del calendario escolar** — **resuelto sin fijar un bimestre.** Afirmar en qué bimestre cae MAT 1.3 sería inventar un dato que varía por establecimiento. En su lugar, la guía docente trae una **verificación de prerrequisito**: si la clase de matemática todavía no vio razones trigonométricas, la sesión 7 incluye un anexo de 20 minutos que introduce seno y coseno desde el triángulo rectángulo. El programa queda robusto ante cualquier calendario en vez de depender de uno supuesto.
7. ~~**Manecillas superpuestas**~~ — **resuelto en D14:** el sketch no tiene el defecto. El del tutorial se enseña como caso de estudio.
