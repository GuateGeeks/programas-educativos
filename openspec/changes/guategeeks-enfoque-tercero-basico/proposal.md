## Why

El material de GuateGeeks declara estar dirigido a «Ciclo Básico · 1.º, 2.º y 3.º básico», pero **todas sus citas curriculares corresponden a Primero Básico**. No es una imprecisión de etiqueta: en tercero los mismos códigos designan contenidos distintos, y varias citas quedarían apuntando a temas ajenos al programa.

| Código citado | Significa en 1.º | Significa en 3.º |
|---|---|---|
| CN 1.3 | Máquinas simples y compuestas | Comunica resultados de la indagación, aciertos y errores |
| CN 4.2 | Mecánica de Newton, MRU | Distingue sustancias químicas del medio |
| TAC 1.1 | Componentes de una computadora | Elige herramienta y plataforma apropiadas |
| EP 1.2 | Proyecto de vida | Procesos de mercadotecnia y publicidad |

Enfocar el programa en **tercero básico** corrige eso y, además, mejora el encaje: las competencias de tercero piden investigación científica y tecnológica, comunicación de resultados con gráficos, vectores por componentes rectangulares, análisis de datos en hoja de cálculo y gestión de calidad con mejora continua. Todo eso ya ocurre en el programa; hasta ahora estaba mal nombrado.

## What Changes

- **Público objetivo**: el programa pasa de «Ciclo Básico (1.º-3.º)» a **tercero básico** exclusivamente. Se eliminan las tablas y notas de diferenciación por grado.
- **Alineación CNB rehecha** contra `tercero-basico.md` de cada área, con los códigos y criterios reales. Reemplaza por completo el mapeo actual, que provenía de Primero Básico.
- **Áreas y competencias nuevas que ahora aplican**: Ciencias Naturales 1.2, 1.3, 4.3 y 4.4; TAC 1.2, 2.1 y 2.2; Emprendimiento 1.3 y 2.2; Matemática 2.3, 4.1 y 5.1; Comunicación y Lenguaje 1.2 y 3.1.
- **Banda de estándares internacionales elevada**: de CSTA Nivel 2 y NGSS MS-ETS1 —correctos para 1.º-3.º— a **CSTA Nivel 3A (grados 9-10)** y **NGSS HS-ETS1**, que corresponden a tercero básico. ISTE pasa de mención genérica a sub-indicadores.
- **El contenido pedagógico no cambia.** Preguntas motoras, fases, conceptos, materiales, retos y evidencia quedan como están. Este cambio corrige y enriquece la alineación, no las actividades.
- **Cadena de texto en el componente**: `SessionModule` rotula «Ciclo Básico · 1.º, 2.º y 3.º básico» en su bloque CNB y debe reflejar el nuevo alcance.

## Capabilities

### New Capabilities

- (ninguna; este cambio corrige capacidades existentes)

### Modified Capabilities

- `cnb-curriculum-alignment`: el mapeo deja de derivarse de Primero Básico y pasa a Tercero Básico, con códigos verificables contra las mallas locales. Cambia también la banda de estándares internacionales.
- `guategeeks-smars-educational-program`: el público objetivo se estrecha a tercero básico; desaparece el requisito de diferenciación por grado dentro del Ciclo Básico.

> **Acoplamiento a registrar:** ambas capacidades existen hoy únicamente como specs delta del cambio `guategeeks-smars-ciclo-basico`, que sigue abierto (103/106). No están en `openspec/specs/`. Si aquel se archiva primero, entrarían a specs principales citas de Primero Básico que este cambio corrige acto seguido. Alternativa preferible: aplicar este cambio antes de archivar el otro, o plegar esta corrección dentro de aquel. Ver `design.md`.

## Impact

- **12 páginas de sesión** en `docs/guategeeks/`: bloques `Cnb` y `Standards` de cada una. Los bloques `Question`, `Context`, `Concepts`, `Phase`, `Materials`, `Reto` y `Evidence` no se tocan.
- **`docs/guategeeks/alineacion-cnb.mdx`**: matriz sesión × competencia, leyenda, progresión y tabla de evidencia, rehechas.
- **`docs/guategeeks/roles.mdx`**: la tabla de diferenciación 1.º/2.º/3.º se sustituye por la expectativa única de tercero.
- **`docs/guategeeks/rubrica.mdx`**: la nota de diferenciación por grado desaparece.
- **`docs/guategeeks/index.mdx`, `guia-docente.mdx`**: encabezados y descripciones de público.
- **`src/components/SessionModule/index.tsx`**: la cadena traducible del título del bloque CNB.
- **Stub en inglés**: la descripción de público.
- **Artefactos del cambio anterior**: `proposal.md`, `design.md` y los specs de `guategeeks-smars-ciclo-basico` describen el programa como Ciclo Básico completo.
- **Sin impacto** en los sketches Arduino, el modelo de datos, `SketchBlock`, ni la estructura del sitio.
