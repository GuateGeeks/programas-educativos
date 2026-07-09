## Purpose

Defines the completeness bar for CiudadBots module content synchronized into the Docusaurus site's data structure (`src/data/ciudadbots/modules.ts`): every field from the original HTML source (`guategeeks-citybuilders-programa-robotica.html` and related files) — descriptions, learning phases, CNB curriculum mappings, standards references, evaluation criteria, and build-guide metadata — must be present, complete, and matching the original content across all 12 modules.

## Requirements

### Requirement: Complete module definitions with all original fields
The system SHALL include complete module definitions for all 12 CiudadBots modules with every field from the original HTML source: id, number, slug, title, short description, sessions count, program file, driving question, context, concepts, phases (with full descriptions and time allocations), CNB curriculum mappings, standards references, and evaluation criteria.

#### Scenario: Module has all required fields
- **WHEN** accessing a CiudadBots module in the data structure
- **THEN** all required fields are present and populated with non-empty values

#### Scenario: Four learning phases are complete
- **WHEN** viewing a module's phases (Activate, Explore, Create, Reflect)
- **THEN** each phase includes: kind (act/exp/cre/ref), label with time allocation, title, and full descriptive body text

### Requirement: CNB curriculum alignment is fully documented
The system SHALL include complete CNB (Curriculum Nacional Base) mappings for each module, showing connections to Matemáticas, Ciencias Naturales, Comunicación y Lenguaje, Productividad y Desarrollo, Formación Ciudadana, and Expresión Artística where applicable.

#### Scenario: CNB mappings are complete
- **WHEN** viewing a module's curriculum mappings
- **THEN** at least 3-4 CNB areas are mapped with specific curriculum connections

### Requirement: Standards references are comprehensive
The system SHALL include standards references for CSTA (Computer Science Teachers Association), ISTE (International Society for Technology in Education), and NGSS ETS (Next Generation Science Standards Engineering & Technology).

#### Scenario: Standards are listed for a module
- **WHEN** viewing a module's standards section
- **THEN** references include CSTA, ISTE, and NGSS ETS where applicable

### Requirement: Evaluation criteria are specific and measurable
The system SHALL include evaluation criteria (rubric items) for each module that are specific, measurable, and actionable for teachers assessing student work.

#### Scenario: Evaluation criteria are provided
- **WHEN** viewing a module's evaluation section
- **THEN** at least 3 criteria are listed, each describing observable student behaviors or deliverables

### Requirement: Build guide metadata is present for modules with visual guides
The system SHALL include guide metadata (title, page count, and image base path) for modules that have step-by-step visual construction guides (e.g., Trazamapas Chapín).

#### Scenario: Module with build guide includes guide metadata
- **WHEN** accessing a module that has a visual build guide
- **THEN** the module includes a `guide` object with `title`, `pages` count, and `imageBase` path

### Requirement: All 12 modules are present and distinct
The system SHALL contain exactly 12 distinct CiudadBots modules, each with unique IDs (m1–m12), numbers (01–12), and slugs.

#### Scenario: All modules are accessible
- **WHEN** iterating through the modules collection
- **THEN** exactly 12 modules are returned, each with a unique ID and sequential numbering
