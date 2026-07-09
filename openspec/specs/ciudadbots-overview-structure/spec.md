## Purpose

Defines the content and structure of the CiudadBots overview page: pacing/scope options, the full básico-by-básico alignment breakdown, the transversal CNB block, teacher-expectation guidance, and the session index linking to every module and the Showcase closing session.

## Requirements

### Requirement: Overview page presents pacing/scope options
The overview page SHALL present the four pacing options from the original HTML's scope-list: Ruta compacta (12 sessions), Ruta estándar (24 sessions), Ruta extendida (36+ sessions), and Ruta por proyectos, each with its original description.

#### Scenario: Teacher chooses a pacing plan before starting the program
- **WHEN** a teacher opens the overview page
- **THEN** all four pacing options SHALL be visible with their session counts and descriptions

### Requirement: Overview page presents the full 1º/2º/3º básico alignment breakdown
The overview page SHALL present the complete básico-by-básico breakdown: three level descriptions (1º Exploración guiada, 2º Análisis y mejora, 3º Diseño e impacto) each with their goal statement and checklist items, plus the 4-row comparison table (Pensamiento computacional, Matemática aplicada, Ciencia e ingeniería, Comunicación) across the three grades — matching the original HTML's `basicoAlignment()` in full, not summarized.

#### Scenario: Teacher plans differentiated instruction across grades
- **WHEN** a teacher opens the overview page
- **THEN** the three level cards and the 4-row comparison table SHALL both be present with their complete original text

### Requirement: Overview page presents the transversal CNB block
The overview page SHALL present the transversal CNB alignment block covering Matemáticas, Ciencias Naturales, Comunicación y Lenguaje, and Emprendimiento/Productividad at the program level (not module-specific), matching the original HTML's transversal `cnb-block` on the overview.

#### Scenario: Teacher needs a program-level CNB summary for reporting
- **WHEN** a teacher opens the overview page
- **THEN** the four transversal CNB areas SHALL be present with their full descriptive text

### Requirement: Overview page presents teacher-expectation guidance
The overview page SHALL include the "Qué se espera del docente" and "Cómo acceder al contenido" guidance notes from the original HTML, explaining the teacher's role in pacing, organizing roles, collecting evidence, and how to navigate the material.

#### Scenario: A first-time teacher orients themselves to the program
- **WHEN** a teacher opens the overview page for the first time
- **THEN** both guidance notes SHALL be present and legible

### Requirement: Overview page links to every session including Showcase
The overview page SHALL include a full session index listing all 12 modules and the Showcase closing session, each linking directly to its page, matching the original HTML's `ses-map`.

#### Scenario: Teacher jumps directly to a specific session from the overview
- **WHEN** a teacher opens the overview page and clicks a session in the index
- **THEN** they SHALL land on that session's page, and the Showcase session SHALL be listed and linked alongside the 12 modules
