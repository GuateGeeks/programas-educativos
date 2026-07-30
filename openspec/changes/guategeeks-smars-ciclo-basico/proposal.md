## Why

GuateGeeks necesita un programa de robótica integrada que alinee con el CNB de Ciclo Básico y prepare estudiantes en Tecnologías del Aprendizaje, pensamiento computacional y pensamiento de ingeniería. Actualmente existe CiudadBots (para 1.º-3.º básico con LEGO SPIKE), pero no hay una alternativa que use Arduino, que enseñe electrónica y programación low-level de forma progresiva, ni que integre máquinas de estados y sensor de distancia. GuateGeeks - SMARS Aula Autónomo cierra esa brecha, adaptando el contenido maduro de SMARS v2 (proyecto único, 12 sesiones) al estilo pedagógico de CiudadBots (fases de aprendizaje, roles rotativos, alineación curricular clara).

## What Changes

- **Nuevo programa educativo**: Creación de GuateGeeks - SMARS Aula Autónomo, un módulo completo de 12 sesiones para **tercero básico**.
- **Estructura de fases**: Cada sesión incluye mini-ciclo Activar → Explorar → Crear → Reflexionar, con retos distribuidos en 4 niveles (Observación, Modificación, Algoritmos, Ingeniería).
- **Código Arduino adaptado al shield L293D**: Los cinco sketches MIT de SMARS v2 (`01_botones_y_buzzer` → `02_prueba_motores` → `03_prueba_ultrasonido` → `04_smars_autonomo` → `05_asistente_calibracion`) conservan su aviso de licencia y se envuelven en material didáctico propio. Hardware canónico reconciliado: Arduino Uno, shield L293D compatible con Motor Shield v1/AFMotor, dos motores con orugas, HC-SR04, dos botones y buzzer.
- **Alineación CNB interdisciplinaria**: Mapeo explícito de cada sesión a competencias de tercero básico en Ciencias Naturales, TAC, Emprendimiento, Comunicación y Lenguaje, y Matemática. Corregido por `guategeeks-enfoque-tercero-basico`, que reemplazó el mapeo inicial —derivado por error de Primero Básico— por las competencias reales del grado.
- **Roles rotativos y alineación CSTA/ISTE/NGSS**: 4 roles que rotan cada sesión (Responsable Seguridad, Mecánico, Electrónico, Código), más alineación con estándares internacionales.
- **Recursos docentes**: Guías de sesión, rúbricas de 100 puntos, preguntas socráticas, checklists de seguridad y evaluación.

## Capabilities

### New Capabilities

- `guategeeks-smars-educational-program`: Módulo educativo completo con 12 sesiones, fases de aprendizaje, roles rotativos, preguntas centrales y alineación curricular detallada. Incluye descripción de cada sesión con sus mini-ciclos, conceptos clave, retos progresivos y salidas observables.
- `smars-arduino-sketches`: Adopción y adaptación de los cinco sketches Arduino MIT de SMARS v2 sobre el contrato de hardware canónico reconciliado (shield L293D, dos motores, botones, buzzer), más el envoltorio didáctico propio por sketch: README, referencia de pines, reto con nivel asignado y plantilla de evidencia. Incluye los avisos de licencia y atribución por fuente, y marca como human-gated toda verificación que requiera hardware físico.
- `smars-teacher-resources`: Guía docente con secuencia de 12 sesiones, rúbrica de 100 puntos (seguridad, calidad mecánica, cableado, programación, pruebas, reto autónomo, comunicación), preguntas socráticas para depuración, checklists de seguridad y evolución de competencias por sesión.
- `cnb-curriculum-alignment`: Mapeo detallado sesión × competencia del CNB Básico (Ciencias Naturales, TAC, Emprendimiento, Comunicación, Matemática) más alineación con CSTA, ISTE y NGSS ETS.

### Modified Capabilities

- (No hay modificaciones a capabilidades existentes; GuateGeeks es un nuevo programa complementario a CiudadBots)

## Impact

- **Reestructuración del sitio (BREAKING a nivel de rutas de archivo, no de URLs)**: `docs/` deja de ser el namespace de un solo programa. Los 14 `.mdx` de CiudadBots se mueven a `docs/ciudadbots/`, sus espejos de i18n a `i18n/en/.../current/ciudadbots/`, `routeBasePath` pasa a `/`, y se declara un sidebar autogenerado por programa. **Todas las URLs de CiudadBots se preservan** — el segmento `/ciudadbots/` pasa de venir de `routeBasePath` a venir del nombre de la carpeta. Requiere cambiar `slug: /` por `slug: /ciudadbots` en `overview.mdx` para no colisionar con la página de inicio.
- **Componentes nuevos**: `src/data/guategeeks/` (tipos, registro de 12 sesiones, títulos) y componente `SessionModule`. El `Module` de CiudadBots no es reutilizable: `getModule()` lanza si el `id` no está en `m1…m12` y su contrato de fases es una tupla de exactamente cuatro.
- **Contenido en `docs/guategeeks/`**: índice del programa, 12 páginas de sesión con una instancia de `SessionModule` cada una, y los recursos docentes como páginas navegables. Reutiliza `PhaseTimeline`, `RubricTable`, `CnbBlock`, `FlagNote` y `AchievementIndicators` sin modificarlos.
- **Recursos docentes migrados**: `recursos/guategeeks/*.md` se convierte en páginas de Docusaurus (guía docente, alineación CNB, preguntas socráticas, misconcepciones, seguridad, materiales) y el directorio desaparece. Al ser páginas con búsqueda y navegación, no requieren distribuirse como descargables.
- **Código Arduino**: `/arduino/guategeeks/` con los cinco sketches adoptados y su envoltorio. Requiere eliminar el firmware inventado en la primera pasada (driver equivocado, un solo motor, pines en conflicto, sin compilar).
- **Idiomas**: GuateGeeks solo en español, más un stub en inglés que declare esa limitación. Sin él, Docusaurus sirve español dentro del sitio en inglés sin avisar.
- **Sistema de navegación**: Un ítem de navbar por programa, entrada en el footer, y tarjeta de GuateGeeks en la página de inicio.
- **Dependencias**: Core de Arduino y AFMotor / Adafruit Motor Shield V1 para los sketches que mueven motores. Hardware: Arduino Uno, shield L293D compatible, dos motores DC con orugas, HC-SR04, dos botones, buzzer, batería 6×AAA NiMH, capacitor 470 µF.
- **Licencias**: Avisos por fuente — código MIT, documentación SMARS CC BY-SA 4.0, modelos 3D CC BY-NC-SA (no comercial), mallas CNB CC BY-SA 4.0 con atribución a Mineduc/DIGECUR, y atribución de SMARS a Kevin Thomas y la comunidad maker.
