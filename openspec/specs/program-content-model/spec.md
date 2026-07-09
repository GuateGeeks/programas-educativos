## Purpose

Defines the typed data model for a program module and its content, ensuring all CiudadBots modules are faithfully migrated into a single reusable schema and renderer, with narrative content authored separately in MDX from structured fields.

## Requirements

### Requirement: Typed module data schema

The system SHALL define a single typed schema for a program module capturing only structural, locale-independent fields: identifier, number, slug, suggested session count, downloadable program filename, the ordered sequence of the four learning-phase kinds (act/exp/cre/ref), and an optional visual build guide reference (page count and image base path). Title, driving question, context, concepts, phase labels/titles/bodies, CNB curriculum alignment, external standards, and evaluation criteria SHALL NOT be part of this shared schema — they are authored per locale (see "Per-module MDX narrative").

#### Scenario: Module data conforms to the narrowed schema
- **WHEN** a module entry is added to the program data file
- **THEN** it type-checks against the module schema using only structural fields, with no title, question, context, concepts, CNB, standards, or evaluation text present

#### Scenario: Optional build guide is represented
- **WHEN** a module has an associated visual build guide
- **THEN** its guide reference (page count and image path) is captured, and modules without a guide omit it without error

### Requirement: All twelve CiudadBots modules use neutral, engineering-oriented, bilingual names

The program data SHALL contain all twelve CiudadBots modules identified by neutral, engineering/city-oriented names — not Guatemala-specific place names, slang, or national symbols — derived from each module's underlying LEGO program identity, with a Spanish title and an English title that are direct translations of the same concept, and a single shared slug used by both locales.

#### Scenario: Twelve modules present with neutral names
- **WHEN** the CiudadBots program is rendered
- **THEN** all twelve modules appear, each with a neutral engineering-oriented title in both `es` and `en`, and no module title contains a Guatemala-specific place name, demonym, or slang term

#### Scenario: Spanish and English titles refer to the same module
- **WHEN** a visitor switches locale on a module page
- **THEN** the module's slug SHALL remain unchanged and its title SHALL be the translated equivalent, not a different name

#### Scenario: No dead local links remain
- **WHEN** any module page is rendered
- **THEN** no link points to a local filesystem path (e.g. a `~/Downloads` `original` reference)

### Requirement: Reusable Module renderer component

The system SHALL provide a single reusable `<Module>` compound component (with sub-components for question, context, concepts, phases, CNB, standards, and evaluation) that renders a module's content consistently regardless of locale, so every module shares one layout in both `es` and `en`.

#### Scenario: Structured fields render consistently across locales
- **WHEN** any module is displayed via the `<Module>` component in either locale
- **THEN** its concepts, four phases, CNB alignment, standards, evaluation rubric, and program download render in the same consistent layout, populated with that locale's content

### Requirement: Per-module MDX narrative

Each module SHALL have one MDX page per locale (`docs/` for Spanish, `i18n/en/docusaurus-plugin-content-docs/current/` for English) holding its complete content — driving question, context, concepts, the four phases, CNB alignment, standards, and evaluation criteria — authored as children of the `<Module>` compound component, with structural fields (id, slug, program filename, phase kind sequence, guide metadata) supplied by the shared schema.

#### Scenario: Module page combines locale-specific prose and shared structure
- **WHEN** a visitor opens a module's page in either locale
- **THEN** all narrative and structured text is authored in that locale's MDX file, and only non-textual structure (phase kind/color, program filename, guide page count) comes from the shared data schema

#### Scenario: Content editable without touching component code
- **WHEN** an author edits a module's content in one locale
- **THEN** the change is made entirely within that locale's MDX file without modifying the `<Module>` component, the shared data schema, or the other locale's file

### Requirement: Missing build guides are explicit

For modules that do not yet have a visual build guide (all except module 1), the module page SHALL display an explicit placeholder rather than a broken viewer or dead link, and any module that does have a build guide SHALL resolve its PDF/image asset paths from that module's own `guide` metadata rather than a hardcoded reference to another module.

#### Scenario: Placeholder shown for guide-less module
- **WHEN** a visitor opens a module that has no visual build guide
- **THEN** an explicit "guide pending" placeholder is shown and no broken image or dead download link appears

#### Scenario: Guide asset links resolve to the correct module
- **WHEN** a visitor opens the module that has a visual build guide
- **THEN** the guide's PDF and page-image links resolve using that module's own `guide` metadata, not a hardcoded reference to a different module's filename
