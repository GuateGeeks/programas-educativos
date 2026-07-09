## Purpose

Defines the typed data model for a program module and its content, ensuring all CiudadBots modules are faithfully migrated into a single reusable schema and renderer, with narrative content authored separately in MDX from structured fields.

## Requirements

### Requirement: Typed module data schema

The system SHALL define a single typed schema for a program module capturing its structured fields: identifier, number, title, short summary, suggested session count, driving question, context, concepts, the four learning phases, CNB curriculum alignment, external standards, evaluation criteria, and downloadable program filename, plus an optional visual build guide reference.

#### Scenario: Module data conforms to the schema
- **WHEN** a module entry is added to the program data file
- **THEN** it type-checks against the module schema, with the four phases and the concepts, CNB, standards, and evaluation lists present

#### Scenario: Optional build guide is represented
- **WHEN** a module has an associated visual build guide
- **THEN** its guide reference (title, page count, image path) is captured, and modules without a guide omit it without error

### Requirement: All twelve CiudadBots modules ported

The program data SHALL contain all twelve CiudadBots modules with content faithfully migrated from the existing `programa-robotica.html` `modules` array, and dead `original` links (local filesystem paths) SHALL be removed.

#### Scenario: Twelve modules present
- **WHEN** the CiudadBots program is rendered
- **THEN** all twelve modules (Trazamapas Chapín through the twelfth) appear with their migrated question, context, concepts, phases, CNB, standards, and evaluation content

#### Scenario: No dead local links remain
- **WHEN** any module page is rendered
- **THEN** no link points to a local filesystem path (e.g. a `~/Downloads` `original` reference)

### Requirement: Reusable Module renderer component

The system SHALL provide a single reusable `<Module>` component that renders a module's structured fields consistently, driven by the module data, so every module shares one layout.

#### Scenario: Structured fields render consistently
- **WHEN** any module is displayed via the `<Module>` component
- **THEN** its concepts, four phases, CNB alignment, standards, evaluation rubric, and program download render in the same consistent layout as every other module

### Requirement: Per-module MDX narrative

Each module SHALL have a per-module MDX page holding its narrative content (driving question, context, and any teacher notes) that embeds the `<Module>` renderer for structured fields.

#### Scenario: Module page combines prose and structure
- **WHEN** a visitor opens a module's page
- **THEN** the narrative prose is authored in MDX and the structured fields are rendered by the embedded `<Module>` component

#### Scenario: Content editable without touching component code
- **WHEN** an author edits a module's narrative prose
- **THEN** the change is made in the module's MDX file without modifying the `<Module>` component or the shared data schema

### Requirement: Missing build guides are explicit

For modules that do not yet have a visual build guide (all except module 1), the module page SHALL display an explicit placeholder rather than a broken viewer or dead link.

#### Scenario: Placeholder shown for guide-less module
- **WHEN** a visitor opens a module that has no visual build guide
- **THEN** an explicit "guide pending" placeholder is shown and no broken image or dead download link appears
