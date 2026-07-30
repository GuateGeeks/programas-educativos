## Context

GuateGeeks SMARS quedó construido y verificado como programa de Ciclo Básico, pero su alineación curricular se redactó leyendo `primero-basico.md`. Al enfocarlo en tercero, los códigos citados dejan de corresponder: `CN 4.2` pasa de «mecánica de Newton» a «sustancias químicas», y `EP 1.2` de «proyecto de vida» a «mercadotecnia».

Las mallas de tercero están disponibles localmente en `CNB_Guatemala_Mallas_Curriculares_Basico/areas/*/tercero-basico.md`, así que cada cita puede verificarse contra la fuente.

**Restricciones:**
- El contenido pedagógico no se modifica: preguntas, fases, conceptos, materiales, retos y evidencia quedan intactos
- El sitio debe seguir compilando y las URLs de CiudadBots no deben moverse
- CiudadBots sigue cubriendo 1.º-3.º; los dos programas conviven con públicos distintos

## Goals / Non-Goals

**Goals:**
- Reemplazar toda cita curricular por su equivalente real de tercero básico, verificada contra la malla local
- Incorporar las competencias de tercero que el programa ya satisface y no estaban nombradas: investigación tecnológica, gráficos y reportes, vectores, MRUA, hoja de cálculo, dispersión, gestión de calidad
- Elevar la banda de estándares internacionales a la que corresponde a tercero
- Eliminar toda diferenciación por grado dentro del Ciclo Básico

**Non-Goals:**
- No modificar retos, fases, materiales ni evidencia
- No cambiar los sketches, el modelo de datos ni la estructura del sitio
- No tocar CiudadBots, que conserva su público de 1.º a 3.º
- No introducir competencias que el programa no ejercita realmente, aunque encajen en el papel

## Decisions

### D1: Cada cita CNB se verifica contra la malla local antes de escribirse

**Decisión:** Ninguna cita se redacta de memoria. Se extrae de `CNB_Guatemala_Mallas_Curriculares_Basico/areas/<área>/tercero-basico.md`, conservando el enunciado del criterio o del contenido, y se registra la página fuente que declara la propia malla.

**Rationale:** La causa de este cambio fue exactamente citar sin verificar. Repetir el método reproduciría el error. Ya apareció un caso: MAT 4.1 pide **rango y rango intercuartílico**, no desviación estándar, que es lo que se habría escrito por inercia.

### D2: Solo se citan competencias que el programa ejercita

**Decisión:** Una competencia entra al mapeo si hay una actividad concreta del programa que la trabaja, no si el tema es afín.

**Rationale:** Tercero incluye caída libre, tiro parabólico y choques elásticos dentro de CN 4.4. El robot no los trabaja. Citar CN 4.4 completo inflaría la alineación con contenidos que ningún reto exige y volvería el documento inútil para reportar avance real.

**Aplicación:** de CN 4.4 se cita únicamente MRUA, movimiento circular uniforme y diagramas de cuerpo libre.

### D3: Mapeo de tercero por sesión

Verificado contra las mallas locales. Los enunciados abreviados conservan el sentido del criterio original.

| Sesión | Competencias de tercero que ejercita |
|---|---|
| 1 · Sistemas del robot | CN 1.2 investigación tecnológica · TAC 1.1 elección de herramienta · COM 3.1 redacción autónoma |
| 2 · Seguridad y energía | CN 1.3 registro del proceso · EP 1.3 funciones en administración de proyectos |
| 3 · Slicer y tolerancias | CN 1.3 registro y representación de resultados · MAT 4.1 rango · TAC 2.1 hoja de cálculo |
| 4 · Control de calidad | EP 2.2 gestión de calidad y mejora continua · MAT 4.1 rango intercuartílico · CN 1.3 discusión de resultados |
| 5 · Ensamblaje de orugas | CN 4.4 movimiento circular uniforme · CN 4.4 diagramas de cuerpo libre |
| 6 · Botones y buzzer | CN 1.3 aciertos y errores del proceso · TAC 1.1 elección de herramienta |
| 7 · Dos motores | **CN 4.3 vectores por componentes rectangulares** · MAT 2.3 función lineal y su gráfica · MAT 5.1 sistemas de base · CN 4.4 MRUA |
| 8 · Sensor ultrasónico | CN 4.3 despeje de variables · MAT 4.1 medidas de dispersión · TAC 2.2 gráficas estadísticas · CN 1.3 gráficos |
| 9 · Lectura de código | CN 1.2 procedimientos de investigación · CN 1.3 hipótesis previa · COM 1.2 objetividad y coherencia |
| 10 · Integración autónoma | CN 1.3 aciertos y errores · CN 4.4 MRUA · TAC 2.2 patrones para decidir |
| 11 · Calibración | EP 2.2 mejora continua y verificación de avances · MAT 4.1 dispersión entre ensayos · CN 1.3 método científico |
| 12 · Reto integrador | CN 1.3 reportes científicos · TAC 1.2 infografías · COM 3.1 redacción · EP 1.3 administración |

**Tres conexiones que justifican el enfoque:**

**CN 1.3.6 — «construcción de instrumentos a partir de materiales del medio».** La malla de tercero pide explícitamente fabricar instrumentos de laboratorio. El robot con su sensor ultrasónico es un instrumento de medición que el estudiante construye y caracteriza. Deja de ser analogía.

**CN 4.3 — vectores por componentes rectangulares.** La tracción diferencial es composición vectorial: cada oruga aporta un vector de velocidad y la resultante determina traslación y rotación. La sesión 7 ya lo hace; ahora tiene nombre curricular.

**MAT 4.1 — rango y rango intercuartílico.** Las cinco lecturas por distancia de la sesión 8 son un conjunto de datos con dispersión. La actividad no cambia; lo que cambia es que ahora se nombra lo que ya produce.

### D4: Banda de estándares internacionales elevada

**Decisión:** GuateGeeks cita **CSTA Nivel 3A**, **NGSS HS-ETS1** e **ISTE con sub-indicadores**. CiudadBots conserva Nivel 2 y MS-ETS1.

| | CiudadBots (1.º-3.º) | GuateGeeks (3.º) |
|---|---|---|
| CSTA | Nivel 2 · grados 6-8 | **Nivel 3A · grados 9-10** |
| NGSS | MS-ETS1 | **HS-ETS1**, más HS-PS2 en las sesiones de física |
| ISTE | mención genérica | sub-indicadores del Computational Thinker y del Innovative Designer |

**Rationale:** El Ciclo Básico guatemalteco equivale aproximadamente a los grados 7 a 9; tercero básico corresponde al grado 9. CSTA Nivel 3A cubre grados 9-10 y NGSS HS cubre 9-12, así que ambos alcanzan tercero con precisión, mientras Nivel 2 y MS quedan por debajo. La diferencia entre los dos programas queda sostenida por el grado objetivo, no por preferencia.

**Procedencia de estos códigos:** a diferencia del CNB, no hay copia local de CSTA, ISTE ni NGSS en el repositorio. Se citan con la precisión disponible, por decisión explícita del responsable del programa. Conviene contrastarlos contra las fuentes oficiales antes de publicar material impreso; los enlaces ya están en la página de licencias.

### D5: El contenido pedagógico no se toca

**Decisión:** Este cambio modifica exclusivamente los bloques `Cnb` y `Standards` de cada sesión, más las páginas de alineación, roles y rúbrica. `Question`, `Context`, `Concepts`, `Phase`, `Materials`, `Reto` y `Evidence` quedan literalmente iguales.

**Rationale:** Decisión del responsable. Mantiene el cambio acotado y verificable: cualquier diferencia en esos bloques sería un error, lo que da un criterio de revisión objetivo.

**Consecuencia aceptada:** algunos retos se quedan por debajo de lo que la competencia citada permitiría. La sesión 8 pide error promedio y MAT 4.1 admitiría rango intercuartílico; la sesión 7 pide el PWM mínimo y MAT 2.3 admitiría graficar la función. Queda como oportunidad registrada, no como deuda de este cambio.

### D6: Orden respecto al cambio anterior

**Decisión:** Aplicar este cambio **antes** de archivar `guategeeks-smars-ciclo-basico`.

**Rationale:** Las dos capacidades que aquí se modifican existen solo como specs delta de aquel cambio, que sigue abierto. Archivarlo primero introduciría en `openspec/specs/` un mapeo derivado de Primero Básico para corregirlo de inmediato. Aplicar en este orden hace que las specs principales reciban la versión correcta desde el inicio.

**Alternativa:** plegar esta corrección dentro del cambio anterior y archivar una sola vez. Es igual de válido y deja una historia más corta, a costa de perder el registro de por qué cambió el público objetivo.

## Risks / Trade-offs

| Riesgo | Mitigación |
|---|---|
| **Citar de memoria y repetir el error original** → es exactamente la causa de este cambio | D1: cada cita se extrae del archivo de la malla; una tarea de verificación comprueba que todo código citado exista en `tercero-basico.md` |
| **Inflar la alineación** → tercero tiene competencias afines que el programa no trabaja, y citarlas volvería el documento inservible para reportar | D2: solo entra lo que una actividad concreta ejercita |
| **Códigos internacionales sin fuente local** → no se pueden verificar aquí | Registrado en D4; enlaces a las fuentes oficiales en la página de licencias, y recomendación de contraste antes de imprimir |
| **Divergencia con CiudadBots** → dos programas citando bandas distintas puede parecer inconsistente | La diferencia se explica por el grado objetivo y queda documentada en la página de alineación |
| **Pérdida de alcance comercial** → el material deja de ofrecerse para 1.º y 2.º | Es la decisión pedida. CiudadBots sigue cubriendo esos grados |

## Migration Plan

**Fase 1: Alineación por sesión**
1. Reescribir los bloques `Cnb` y `Standards` de las 12 sesiones con los códigos de tercero
2. Verificar que cada código citado exista en la malla correspondiente

**Fase 2: Páginas de alineación y evaluación**
1. Rehacer `alineacion-cnb.mdx`: matriz, leyenda, progresión y tabla de evidencia
2. Sustituir la tabla por grado de `roles.mdx` por la expectativa única de tercero
3. Retirar la nota de diferenciación por grado de `rubrica.mdx`

**Fase 3: Público objetivo**
1. Ajustar `index.mdx`, `guia-docente.mdx` y el stub en inglés
2. Actualizar la cadena traducible de `SessionModule`

**Fase 4: Coherencia de artefactos**
1. Alinear `proposal.md`, `design.md` y los specs de `guategeeks-smars-ciclo-basico` con el nuevo público

**Fase 5: Verificación**
1. `npm run build` y `tsc --noEmit` en verde
2. URLs de CiudadBots sin cambios
3. Ningún archivo cita competencias de Primero Básico
4. Los bloques pedagógicos son idénticos a los previos

**Rollback:** El cambio afecta texto de alineación y una cadena traducible. Revertir es restaurar los bloques anteriores; no hay migración de datos ni de rutas.

## Open Questions

1. **Verificación de CSTA, ISTE y NGSS:** ¿quién contrasta los códigos contra las fuentes oficiales antes de publicar material impreso?
2. **Retos por debajo de la competencia:** ¿se abre después un cambio que suba el nivel de los retos de las sesiones 7, 8 y 11 para aprovechar dispersión, funciones graficadas y vectores?
3. **Número de página en las citas:** la malla declara página fuente por competencia. ¿Se incluye en cada cita para trazabilidad ante Mineduc?
4. **CiudadBots:** ¿conviene revisar si su alineación también deriva del grado equivocado, dado que cubre tres grados con un solo mapeo?
