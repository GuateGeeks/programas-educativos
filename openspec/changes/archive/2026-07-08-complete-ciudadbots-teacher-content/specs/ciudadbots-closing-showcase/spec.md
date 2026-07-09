## ADDED Requirements

### Requirement: Showcase session is reachable from site navigation
The system SHALL provide a "Showcase" closing session as a page in the CiudadBots docs sidebar, positioned immediately after module 12 ("Rueda de Feria Chapina"), matching the original HTML's session order (`showSes('showcase')` followed the 12 modules).

#### Scenario: Teacher navigates to the closing session
- **WHEN** a teacher opens the CiudadBots sidebar
- **THEN** a "Showcase" entry SHALL appear after the 12 numbered modules and SHALL open a page titled "Presentación final: diseñamos una ciudad con robots"

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
