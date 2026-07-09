## Purpose

Defines the CiudadBots closing "Showcase" session: its place in site navigation, its three closing phases, its grade-differentiated evaluation guidance, and its final program-level rubric.

## Requirements

### Requirement: Showcase session is reachable from site navigation
The system SHALL provide a "Showcase" closing session as a page in the CiudadBots docs sidebar, positioned immediately after module 12 (the final neutral-named module), matching the original session order, with the page title translated per locale.

#### Scenario: Teacher navigates to the closing session
- **WHEN** a teacher opens the CiudadBots sidebar in either locale
- **THEN** a "Showcase" entry SHALL appear after the 12 numbered modules and SHALL open a page titled with that locale's translation of "Presentación final: diseñamos una ciudad con robots"

### Requirement: Showcase page includes the three closing phases
The Showcase page SHALL present three phases with their original labels, titles, and full body text: Preparación ("Ensayo con bitácora"), Presentación ("Demostración pública"), and Reflexión ("De usuario a diseñador").

#### Scenario: Teacher reviews the closing phase sequence
- **WHEN** a teacher opens the Showcase page
- **THEN** the page SHALL display all three phases in order, each with its time allocation, title, and complete descriptive body text from the original HTML

### Requirement: Showcase page includes grade-differentiated evaluation guidance
The Showcase page SHALL include the note explaining that the showcase must be evaluated with different expectations per grade (1º básico: functional comprehension; 2º básico: test analysis and improvement; 3º básico: own design, technical documentation, and connection to a real Guatemalan need).

#### Scenario: Teacher checks grade-specific expectations before evaluating
- **WHEN** a teacher reads the Showcase page's evaluation guidance
- **THEN** the distinct expectation for each of 1º, 2º, and 3º básico SHALL be present and legible

### Requirement: Showcase page includes the final program-level rubric
The Showcase page SHALL render the 4-criterion final rubric — Construcción funcional, Programa y lógica, Proceso de ingeniería, Comunicación — each with all four performance levels (Sobresaliente, Logrado, En proceso, Inicial) and their full descriptive text, unabridged from the original HTML.

#### Scenario: Teacher grades a team's final presentation
- **WHEN** a teacher opens the Showcase page's evaluation section
- **THEN** all 4 criteria SHALL be visible, each showing 4 complete performance-level descriptions

### Requirement: Showcase page content is authored per locale
The Showcase page's three closing phases, grade-differentiated evaluation guidance, and final program-level rubric SHALL be authored in both `es` and `en`, so an English-locale visitor reads fully translated content rather than a Spanish fallback.

#### Scenario: English-locale visitor opens the Showcase page
- **WHEN** a visitor opens the Showcase page with the `en` locale selected
- **THEN** the three closing phases, evaluation guidance, and final rubric SHALL all be rendered in English
