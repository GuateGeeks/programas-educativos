## Context

GuateGeeks actualmente ofrece CiudadBots (robótica LEGO SPIKE para Ciclo Básico). Se necesita un programa complementario que enseñe Arduino, electrónica de bajo nivel, máquinas de estados y sensores. SMARS Aula Autónomo v2 es un proyecto maduro con 17 capítulos, 12 sesiones de implementación, retos progresivos de 4 niveles y guía docente. Sin embargo, su presentación es más técnica que pedagógica (estructura lineal de "lectura y construcción").

**Restricciones:**
- Estudiantes de tercero básico (≈14-15 años): requieren estructura clara de fases y alineación curricular explícita
- Arduino puro: sin bloques visuales (diferencia clara de LEGO SPIKE)
- Alineación CNB: debe mapear a Ciencias Naturales, TAC, Emprendimiento, Comunicación, Matemática
- Compatibilidad con infraestructura existente: sitio Docusaurus, estructura de módulos de CiudadBots

## Goals / Non-Goals

**Goals:**
- Crear módulo GuateGeeks con 12 sesiones que integren fases de aprendizaje (Activar → Explorar → Crear → Reflexionar), cada sesión con mini-ciclo completo
- **Adoptar** los cinco sketches de referencia MIT de SMARS v2 (`01_botones_y_buzzer`, `02_prueba_motores`, `03_prueba_ultrasonido`, `04_smars_autonomo`, `05_asistente_calibracion`) y envolverlos en material didáctico propio, sin reescribir la lógica de tracción, sensado ni evasión
- Distribuir retos en 4 niveles (Observación, Modificación, Algoritmos, Ingeniería) a lo largo de 12 sesiones, con nivel 4 en sesión 12
- Mapear cada sesión a competencias específicas del CNB Básico (Ciencias Naturales, TAC, Emprendimiento, Comunicación, Matemática) más estándares internacionales (CSTA, ISTE, NGSS)
- Crear guía docente con rúbrica de 100 puntos, preguntas socráticas, roles rotativos (Seguridad, Mecánico, Electrónico, Código)
- Presentar en sitio Docusaurus con estructura visual idéntica a CiudadBots (componente Module con fases, conceptos, alineación, evaluación)

**Non-Goals:**
- No reemplazar CiudadBots; es un programa complementario
- No incluir adaptaciones para educación primaria ni para 1.º y 2.º básico (ver `guategeeks-enfoque-tercero-basico`)
- No modificar SMARS v2 del repositorio público; usar su contenido como fuente de referencia
- No crear nueva plataforma de código; usar Arduino IDE estándar
- No agregar hardware fuera del contrato canónico reconciliado de SMARS v2: Arduino Uno, shield **L293D** compatible con Motor Shield v1/AFMotor, **dos** motores DC con orugas, HC-SR04, dos botones (`INPUT_PULLUP`), buzzer en A0
- No reescribir firmware que ya existe upstream bajo licencia MIT
- No incluir tareas que un agente no puede verificar (pruebas en hardware físico, revisión por pares, difusión, seguimiento de cohorte) dentro del checklist de implementación

## Decisions

### D1: Estructura de sesiones con mini-ciclos de fase

**Decisión:** Cada sesión (12 total) incluye mini-ciclo completo: Activar (15 min) → Explorar (25 min) → Crear (60-90 min) → Reflexionar (15 min).

**Rationale:** 
- Las fases de CiudadBots funcionan bien pedagógicamente; mantener el patrón asegura consistencia con programa existente
- Cada sesión es autónoma pero encadena hacia el proyecto completo
- Mini-ciclos permiten que los estudiantes vean progresión dentro de cada sesión

**Alternativas consideradas:**
- Fases únicas de 2-3 sesiones cada una: menos granularidad, más difícil de seguir el progreso
- Fases por cada fase global (S1-2 Activar, S3-4 Explorar, S5-10 Crear, S11-12 Reflexionar): menos iteración, menos consolidación de aprendizaje

### D2: Adoptar el firmware upstream en lugar de escribir uno propio

**Decisión:** GuateGeeks adopta los cinco sketches de `smars_aula_autonomo_v2_fuentes_publicas/code/arduino/` tal como están (con reformateo y comentarios en español permitidos, sin cambios de comportamiento) y solo autora el envoltorio didáctico: README, referencia de pines, reto y plantilla de evidencia por sketch.

**Rationale:**
- El código upstream ya es correcto, por capas, y está calibrado contra una construcción real (`VELOCIDAD=165`, `VELOCIDAD_GIRO=155`, `UMBRAL_CM=24` para 6×AAA NiMH). Esos números no se pueden derivar sin el robot en la mano.
- La licencia es **MIT** y permite explícitamente uso en cursos, incluidos comerciales, conservando el aviso. No hay razón legal ni técnica para reimplementar.
- Los cinco sketches mapean 1:1 con las sesiones 6-11, y la actividad de lectura de código de la sesión 9 ya está redactada en `docs/07_programacion.md` upstream.
- `05_asistente_calibracion` ya resuelve la compensación entre motores, que es exactamente el reto de calibración de la sesión 11.
- La evasión upstream aleatoriza dirección y duración de giro precisamente para escapar de esquinas, requisito del reto final.

**Alternativas consideradas:**
- Escribir firmware propio: ya se intentó en la primera pasada de implementación y produjo código para el driver equivocado, con pines que chocan con la tabla canónica, distancia a la mitad y un error de compilación. Ver «Supuestos invalidados».
- Adoptar solo `04_smars_autonomo` y escribir las pruebas por capas: pierde la progresión pedagógica que upstream ya diseñó.

### D6: Namespace de datos y componente propios para GuateGeeks

**Decisión:** Crear `src/data/guategeeks/` (registro de sesiones, títulos, tipos) y un componente `SessionModule` que replique el layout de `Module`, reutilizando sin cambios `PhaseTimeline`, `RubricTable`, `CnbBlock`, `FlagNote` y `AchievementIndicators`.

**Rationale:**
- `Module` está soldado a CiudadBots: `getModule(id)` lanza `Error` si el id no está en `m1…m12`, `phaseKinds` es una tupla de exactamente cuatro elementos, y resuelve rutas de PDF y programa por `m.slug`. No admite un programa nuevo.
- Un namespace paralelo permite 12 sesiones × 4 fases sin contaminar el registro de CiudadBots ni inventar módulos `m13…m24` semánticamente falsos.
- Los componentes de presentación puros ya son reutilizables tal cual; solo hace falta el contenedor y el registro.

**Alternativas consideradas:**
- Extender el registro de CiudadBots con ids `m13…m24`: mezcla dos programas distintos en una sola fuente de datos.
- MDX plano con encabezados: pierde la consistencia visual con CiudadBots, que es un requisito explícito.

### D7: Un `Module` por sesión, no por fase

**Decisión:** Cada una de las 12 sesiones es una instancia de `SessionModule` con exactamente cuatro fases (`act`, `exp`, `cre`, `ref`). Las cuatro fases globales del programa son encabezados de agrupación, no componentes.

**Rationale:**
- El contrato de fases es una tupla de cuatro; ocho fases en un solo contenedor viola la validación y no se puede renderizar.
- Coincide con D1: el mini-ciclo vive en la sesión, que es la unidad real de planificación docente.

**Alternativas consideradas:**
- Un contenedor por fase global con 8-24 fases dentro: incompatible con el contrato del componente y con D1.

### D8: Licencias por fuente, con avisos que viajan con el artefacto

**Decisión:** Documentar tres regímenes separados y adjuntar el aviso correspondiente a cada artefacto derivado.

| Fuente | Licencia | Efecto en GuateGeeks |
|---|---|---|
| Sketches Arduino SMARS v2 | **MIT** | Copiar y adaptar libremente, incluso para cursos comerciales, conservando el encabezado de licencia |
| Documentación SMARS v2 | CC BY-SA 4.0 | Derivados con la misma licencia y atribución |
| Modelos 3D SMARS | CC BY-NC-SA | **Solo no comercial**; enlazar, no reempaquetar |
| Mallas CNB Guatemala | CC BY-SA 4.0 + nota de no uso comercial del Mineduc | Atribuir a Mineduc/DIGECUR en el material de alineación |
| SMARS (proyecto) | — | Atribuir a Kevin Thomas y la comunidad maker; declarar que GuateGeeks no está afiliado oficialmente |

**Rationale:** La restricción no comercial aplica a los modelos 3D y a los PDF del Mineduc, no al código. Confundirlas bloquea usos permitidos o incumple los restringidos. La distinción decide si el paquete puede redistribuirse y bajo qué condiciones.

### D9: Un solo plugin de docs con `routeBasePath: '/'` y un subdirectorio por programa

**Decisión:** Reestructurar `docs/` para que cada programa sea un subdirectorio, y servir los docs desde la raíz.

```
docs/
├─ ciudadbots/      → /ciudadbots/*     (14 archivos movidos sin cambios)
└─ guategeeks/      → /guategeeks/*     (contenido nuevo)

docusaurus.config.ts:  docs: { path: 'docs', routeBasePath: '/' }
sidebars.ts:           ciudadbotsSidebar → autogenerated dirName 'ciudadbots'
                       guategeeksSidebar → autogenerated dirName 'guategeeks'
navbar:                un docSidebar por programa
```

**Rationale:**
- **Preserva todas las URLs de CiudadBots.** Hoy el segmento `/ciudadbots/` lo aporta `routeBasePath`; con este cambio lo aporta el nombre de la carpeta. Verificado contra `build/ciudadbots/`: las rutas generadas son `/ciudadbots/`, `/ciudadbots/mapper-bot`, `/ciudadbots/delivery-bot`, etc., y siguen siendo idénticas tras el movimiento.
- Un solo plugin significa un solo namespace de i18n (`docusaurus-plugin-content-docs`), sin instancias múltiples ni un `exclude` load-bearing que se puede olvidar.
- Los enlaces relativos existentes (`./mapper-bot` en `overview.mdx`) siguen resolviendo porque los archivos permanecen hermanos.
- El comentario original de `sidebars.ts` ya anticipaba un segundo programa: «A future program would add its own sidebar (or docs instance) here without touching this one».

**Dos ajustes obligatorios:**
1. `docs/ciudadbots/overview.mdx` debe cambiar `slug: /` por `slug: /ciudadbots`. Con `routeBasePath: '/'`, un `slug: /` colisiona con `src/pages/index.tsx` y Docusaurus falla por ruta duplicada.
2. El espejo de i18n debe moverse en paralelo: `i18n/en/docusaurus-plugin-content-docs/current/*.mdx` → `.../current/ciudadbots/*.mdx`. Si no, los 14 documentos traducidos quedan huérfanos.

**Restricción a recordar al nombrar archivos:** Docusaurus aplica `numberPrefixParser` por defecto. Un archivo `06-botones-y-buzzer.mdx` produce la URL `/guategeeks/botones-y-buzzer`; el prefijo numérico solo ordena el sidebar. Los enlaces internos deben usar el nombre sin número.

**Alternativas consideradas:**
- Subcarpeta con el plugin actual (`docs/guategeeks/` con `routeBasePath: 'ciudadbots'`): daría la URL `/ciudadbots/guategeeks/*` y metería GuateGeeks dentro del sidebar de CiudadBots.
- Segunda instancia del plugin apuntando a `docs/guategeeks`: funciona, pero exige `exclude: ['guategeeks/**']` en la primera instancia —si se olvida, hay rutas duplicadas— y crea un segundo namespace de i18n.
- Dos carpetas hermanas `docs-ciudadbots/` y `docs-guategeeks/`: simétrico, pero el contenido dejaría de estar en `docs/`.

### D11: Una sola fuente para el código, mostrado y descargable

**Decisión:** El `.ino` canónico vive en `arduino/guategeeks/<sketch>/` y es la **única** copia. La página lo importa como string en tiempo de build; el bloque de código y el botón de descarga se alimentan de ese mismo string, y la descarga se construye en el navegador al momento del clic.

```
arduino/guategeeks/01_botones_y_buzzer/01_botones_y_buzzer.ino   ← única copia, editable
        │
        └─→ import (webpack asset/source) ─→ string en el bundle
                                              ├─→ <CodeBlock>   bloque en la página
                                              └─→ Blob al clic  archivo descargado
```

**Rationale:**
- **No hay copia que pueda divergir.** No es que la sincronización esté automatizada: es que no existe un segundo archivo. Editar el `.ino` cambia a la vez lo que se muestra y lo que el estudiante recibe.
- Sin script de sincronización, sin entrada en `.gitignore`, sin hooks de npm y sin verificación de igualdad byte a byte, porque no hay nada que comparar.
- El canónico queda en `arduino/`, que es donde alguien busca código al navegar el repositorio y es la carpeta que el estudiante abre en el Arduino IDE (que exige que el `.ino` se llame igual que su directorio).

**Implementación, sin dependencias nuevas:** webpack 5 —ya presente, 5.108.4— soporta `type: 'asset/source'`, que entrega el contenido del archivo como string. Un plugin inline en `docusaurus.config.ts` registra esa regla para `.ino`, más una declaración `declare module '*.ino'` para TypeScript. El componente `SketchBlock` recibe el string y genera el `Blob` en el manejador del clic, así que nada de esto corre durante el SSR.

**Por qué no el mecanismo que se registró primero:** la versión inicial de esta decisión copiaba el `.ino` a `static/` mediante los scripts `prebuild` y `prestart` de npm. Al implementarlo se descubrió que **`ignore-scripts=true` en el `~/.npmrc` del usuario impide que los hooks corran**: verificado con un hook de prueba, que solo se ejecutó al forzar `--ignore-scripts=false`. Un mecanismo de sincronización que depende de una configuración que el propio entorno desactiva no es un mecanismo. La vía del Blob elimina la dependencia por completo.

**Contrapartida aceptada:** la descarga por Blob no tiene URL estable, así que no se puede enlazar ni compartir el `.ino` desde fuera del sitio. Si más adelante hace falta una URL citable, habrá que añadir la copia en `static/` **además** de este mecanismo, y entonces sí necesitará verificación de igualdad.

**Alternativas consideradas:**
- `raw-loader`: es el patrón que documenta Docusaurus, pero **no está instalado** y añadiría una dependencia que webpack 5 ya reemplazó con `asset/source`.
- Copia en `static/` comprometida en git: dos fuentes que divergen en silencio, exactamente lo que se pidió evitar.
- Sketches únicamente en `static/`: sincronización imposible de romper, pero deja el código en una carpeta de activos web, lejos de donde se busca.
- Pegar el código en el MDX a mano: divergencia garantizada.

**Verificado:** el string del sketch aparece en el chunk JS del build (`PIN_BOTON_MODO`, `INPUT_PULLUP`, `Licencia: MIT`), lo que prueba que la regla de webpack y la resolución de `@site/arduino/…` funcionan.

### D10: Alcance de idiomas — GuateGeeks solo en español

**Decisión:** GuateGeeks se publica únicamente en español. No se crean los 20+ archivos espejo en `i18n/en/`, con **una excepción**: una página stub en inglés para el índice del programa que declare explícitamente que el material está solo en español y enlace a la versión en español.

**Rationale:**
- El sitio tiene dos locales (`es` por defecto, `en`) y CiudadBots mantiene 14 archivos traducidos. Replicar eso para GuateGeeks duplicaría el trabajo de contenido: 12 sesiones más los recursos docentes.
- Docusaurus **no falla** cuando falta una traducción: sirve el contenido en español dentro del sitio en inglés, en silencio. Un visitante en `/en/guategeeks` vería español sin explicación, lo que es peor que una ausencia declarada.
- Un stub de un archivo convierte un fallback silencioso en un mensaje honesto, a costa de ~1 % del trabajo de traducir todo.

**Alternativas consideradas:**
- Traducir todo al inglés desde el inicio: duplica el alcance sin demanda establecida.
- No hacer nada y aceptar el fallback silencioso: el sitio en inglés mostraría español sin avisar.
- Excluir GuateGeeks del locale `en`: Docusaurus no ofrece exclusión de documentos por locale dentro de una sola instancia.

### D3: Distribución de retos a lo largo de 12 sesiones

**Decisión:** 
- S1-2: Nivel 0 (Dibujar/Documentar)
- S3-4: Nivel 1 (Observar)
- S5-8: Nivel 2 (Modificar)
- S9-11: Nivel 3 (Algoritmos)
- S12: Nivel 4 (Ingeniería integrada)

**Rationale:**
- Complejidad cognitiva aumenta gradualmente
- Nivel 4 (reto integrador) es culminación natural, no carga al final
- Estudiantes practican cada nivel antes de pasar al siguiente
- Permite recursión (S11 todavía está en nivel 3 pero refinando)

**Alternativas consideradas:**
- Todos los niveles disponibles desde S1: sobrecarga cognitiva, confusión
- Niveles solo en S11-12: estudiantes no practican incremento de dificultad

### D4: Alineación curricular por sesión (matriz sesión × competencia)

**Decisión:** Cada sesión mapea explícitamente a 4-5 competencias del CNB Básico (Ciencias Naturales domina, TAC fuerte, Emprendimiento presente, Comunicación presente, Matemática integrada).

**Rationale:**
- Docentes ven claramente qué estándar cumplen en cada sesión
- Facilita documentación de evidencia y reportes de progreso curricular
- Demuestra alineación con requisitos del Mineduc

**Alternativas consideradas:**
- Alineación global (una competencia por fase): menos precisión
- Sin alineación explícita: docentes no saben qué estándares cubren

### D5: Presentación en Docusaurus con componente Module reutilizable

**Decisión:** Crear archivo `.mdx` único (guategeeks.mdx) que utiliza componente Module existente de CiudadBots, con una sección por fase (no por sesión individual) que agrupa 2-3 sesiones.

**Rationale:**
- Reutiliza componentes existentes (no reinventar)
- Mantiene consistencia visual con CiudadBots
- Una página por programa es más navegable que 12 sub-páginas

**Alternativas consideradas:**
- 12 páginas separadas (una por sesión): navegación compleja
- Integración directa en CiudadBots: confunde dos programas distintos

## Supuestos invalidados

La primera pasada de implementación (2026-07-29/30) escribió firmware propio y una página `.mdx` sin verificar ni la fuente upstream ni las API de los componentes. Se registra aquí para que no se repita y para explicar por qué D2, D6 y D7 existen.

**Qué se asumió y resultó falso:**

| Supuesto | Realidad verificada |
|---|---|
| No existía firmware de referencia utilizable | Existen 5 sketches MIT, 238 líneas, por capas y calibrados |
| El driver era un L298N | Es un **shield L293D** compatible con Motor Shield v1/AFMotor |
| Un motor bastaba | Son **dos**, orugas, skid-steer; con uno el robot no puede girar |
| Había un LED indicador en D13 | No existe LED en el diseño; la señal es un **buzzer en A0** |
| El sensor iba en D7/D6 | Va en **A3 TRIG / A4 ECHO**; los digitales D3-D12 quedan reservados por el shield |
| `343/20000` era cm por µs | Ya incluye el ÷2; dividir otra vez daba **la mitad** de la distancia |
| Girar siempre a la derecha servía | Upstream aleatoriza dirección y duración justamente para escapar esquinas |
| No hacía falta interfaz local | El premisa del proyecto son dos botones sin teléfono ni Bluetooth; se habían eliminado |
| `Module` se podía reutilizar con cualquier `id` | `getModule()` lanza si el id no está en `m1…m12` |
| `RubricTable` aceptaba `criteria=[{criterion,points,description}]` | Su API es `rows=[{criterion, levels:[4]}]` |
| `CnbBlock` aceptaba solo `items` | Requiere `badge`, `title` e `items=[{area,text}]` |
| Había que registrar la página en `sidebars.ts` | El sidebar es `autogenerated` desde `dirName: '.'`; todo lo que entra a `docs/` aparece solo. El problema real es el opuesto: **separar** los programas (ver D9) |
| `docs/` era una carpeta de contenido neutral | `docs/` está mapeada a `/ciudadbots/*` vía `routeBasePath`; era el namespace de un solo programa |
| El sitio era monolingüe | Tiene locales `es` y `en`, con 14 archivos traducidos para CiudadBots (ver D10) |

**Consecuencia material:** `npm run build` fallaba con `CiudadBots: no module with id "phase1"`, y `firmware_04_autonomo/sketch.ino` no compilaba (`cannot jump from switch statement to this case label`). El contrato reconciliado usa shield L293D con M1/M2 y dependencia `AFMotor`, de modo que los diagnósticos de motor deben centrarse en potencia del shield, bornes y librería.

**Lección de proceso:** ninguna prop se escribe sin leer el componente, ninguna constante física sin comprobar unidades, y ninguna tarea se marca completa sin la salida de la herramienta que la verifica. Ver el requisito «Human-Gated Verification» en `specs/smars-arduino-sketches/spec.md`.

## Risks / Trade-offs

| Risk | Mitigation |
|------|-----------|
| **Divergencia con upstream** → Si SMARS v2 publica correcciones, las copias adaptadas en `arduino/guategeeks/` quedan desactualizadas en silencio. | Registrar en cada README la ruta y fecha del archivo fuente adoptado. Revisar contra upstream antes de cada ciclo escolar. Mantener las adaptaciones limitadas a formato y comentarios para que el diff siga siendo legible. |
| **Arduino es técnico para estudiantes de 13 años** → El nivel de abstracción es alto (PWM, `pulseIn`, máquinas de estado). Algunos estudiantes podrían quedar atrás. | Aprovechar la progresión por capas de upstream (botones → motores → sensor → autónomo → calibración): cada sesión introduce un solo subsistema. Preguntas socráticas de depuración. Roles diferenciados en equipo. |
| **Dependencia de impresora 3D** → No todas las escuelas tienen impresoras. Barrera de acceso. | Documentar alternativas de fabricación y proveedores por encargo. Nota de licencia: los modelos 3D son CC BY-NC-SA, así que no pueden reempaquetarse en un kit comercial. |
| **Mantenimiento de código Arduino** → El IDE, el core y la librería del shield evolucionan. | Registrar versión de core y de AFMotor / Motor Shield V1 con la que se verificó la compilación. Reverificar anualmente. |
| **Conflicto de pines del shield** → El shield L293D ocupa digitales para PWM/latch. | Mantener periféricos en A0-A4 y documentar D3-D12 como reservados por el shield en la ruta canónica. |
| **Desalineación con CiudadBots** → Estudiantes que hacen ambos programas podrían confundir conceptos (LEGO vs. Arduino, bloques vs. código). | Documento explícito de "rutas de aprendizaje" (qué hacer primero). Énfasis en competencias comunes. Énfasis en que son programas complementarios, no competidores. |
| **Evaluación compleja** → Rúbrica de 100 puntos con 7 criterios requiere tiempo docente significativo. | Proporcionar rúbrica como tabla editable (formato Google Sheets/Excel), ejemplos de evidencia para cada nivel, y guía de cómo documentar evidencia digitalmente. |

## Migration Plan

**Fase 0: Remediación (bloquea todo lo demás)**
1. Eliminar `arduino/guategeeks/{01_led_indicador,02_motor_dc,03_sensor_hc_sr04,firmware_04_autonomo}` y los documentos que describen el hardware inventado
2. Corregir `arduino/guategeeks/README.md` y `HARDWARE_SHOPPING_LIST.md` al contrato canónico reconciliado (shield L293D, 2 motores, botones, buzzer)
3. Reducir `docs/guategeeks-smars-aula-autonomo.mdx` a un estado que compile, o retirarlo de `docs/` hasta que exista `SessionModule`

**Fase 1: Reestructuración del sitio (D9)**
1. Mover los 14 `.mdx` de CiudadBots a `docs/ciudadbots/` y sus espejos a `i18n/en/.../current/ciudadbots/`
2. Cambiar `slug: /` por `slug: /ciudadbots` en `overview.mdx`
3. Cambiar `routeBasePath` a `/`, declarar los dos sidebars autogenerados y añadir el ítem de navbar
4. `npm run build` y confirmar contra `build/ciudadbots/` que las URLs no cambiaron

**Fase 2: Base técnica**
1. Crear `src/data/guategeeks/` (tipos, registro de 12 sesiones, títulos)
2. Crear el componente `SessionModule` reutilizando `PhaseTimeline`, `RubricTable`, `CnbBlock`, `FlagNote`, `AchievementIndicators`
3. Adoptar los 5 sketches upstream con su encabezado MIT intacto
4. Verificar compilación con `arduino-cli` y registrar la salida

**Fase 3: Contenido**
1. Redactar las 12 sesiones con mini-ciclo de 4 fases cada una, como páginas en `docs/guategeeks/`
2. Migrar los recursos docentes de `recursos/guategeeks/*.md` a páginas de Docusaurus
3. Autorar el envoltorio por sketch (README, referencia de pines, reto, plantilla de evidencia)
4. Añadir avisos de licencia y atribución en todo artefacto derivado
5. Crear el stub en inglés declarando que el programa está solo en español (D10)

**Fase 4: Verificación**
1. `npm run build` en verde con ambos programas
2. Confirmar que ninguna URL de CiudadBots cambió
3. Revisar enlaces internos y contraste

**Fase 4: Entrega (fuera del alcance del agente)**
Prueba en hardware, piloto docente, revisión por pares, publicación y difusión requieren personas. Se rastrean como actividades post-entrega, no como tareas de implementación.

**Rollback:** El contenido de GuateGeeks vive en `docs/guategeeks/` con su propio namespace de datos y no modifica CiudadBots. Quitar `guategeeksSidebar` y su ítem de navbar lo oculta sin afectar nada más. La reestructuración de la Fase 1 es reversible con un movimiento inverso de archivos y restaurando `routeBasePath`, y su criterio de éxito es que las URLs de CiudadBots queden idénticas.

## Open Questions

1. **Verificación en hardware:** ¿Quién tiene un SMARS de orugas armado para validar los 5 sketches y firmar el resultado? Sin esto, las sesiones 6-11 quedan sin verificar.
2. **Versión de core Arduino:** fijar la mínima soportada. Verificado con `arduino-cli 1.2.0` y `arduino:avr 1.8.7`.
3. **Alineación de `@types/react` con el runtime:** los tipos resuelven en 19.2.17 sobre React 18.3.1. La migración a `React.JSX.Element` dejó el código agnóstico, así que no bloquea, pero conviene fijar `^18`. Requiere un entorno donde `npm add` funcione.
5. **Origen de los sketches para el estudiante:** ¿se entregan pre-escritos, o el estudiante los transcribe? Afecta el tiempo de las sesiones 6-11 y la expectativa por grado.
6. **Diferenciación por grado:** el CNB Básico cubre 1.º a 3.º; falta definir qué se exige distinto en cada grado sobre el mismo proyecto.
7. **Modelos 3D y no-comercialidad:** si GuateGeeks se ofrece como programa pagado, los modelos CC BY-NC-SA no pueden incluirse en el paquete. ¿Se enlazan, o se sustituyen por un chasis de licencia compatible?
8. **Integración con CiudadBots:** ¿ruta recomendada entre ambos programas? Ahora que ambos viven en `docs/`, la página de inicio (`src/pages/index.tsx`) es el lugar natural para plantearla.
