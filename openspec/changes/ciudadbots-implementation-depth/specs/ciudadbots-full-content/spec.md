## MODIFIED Requirements

### Requirement: Complete module definitions with all original fields
The system SHALL include complete module definitions for all 12 CiudadBots modules with every field from the original HTML source: id, number, slug, title, short description, sessions count, program file, driving question, context, concepts, phases with full implementation guidance and time allocations, CNB curriculum mappings, standards references, and evaluation criteria. The implementation guidance for each module SHALL be authored per locale and SHALL include classroom-ready procedure, teacher and student actions, checkpoints or evidence prompts, debugging guidance, safety or handling cues where relevant, and grade-differentiated adaptation.

#### Scenario: Module has all required fields
- **WHEN** accessing a CiudadBots module in the data structure
- **THEN** all required fields are present and populated with non-empty values

#### Scenario: Four learning phases are complete
- **WHEN** viewing a module's phases (Activate, Explore, Create, Reflect)
- **THEN** each phase includes: kind (act/exp/cre/ref), label with time allocation, title, and full descriptive body text

#### Scenario: Implementation phases provide classroom procedure
- **WHEN** a teacher opens the `Implementación` tab for any CiudadBots module
- **THEN** the four phases provide concrete teacher moves, expected team actions, and a clear classroom flow from activation through reflection

#### Scenario: Implementation phases include checkpoints and evidence
- **WHEN** a teacher reads the implementation guidance for any CiudadBots module
- **THEN** the guidance identifies observable checkpoints or collectable evidence such as sketches, measurements, test data, program changes, photos, diagrams, pseudocode, or reflection notes

#### Scenario: Implementation phases support debugging and safe handling
- **WHEN** a module involves sensors, motors, arms, loads, elevators, robot traffic, strings, or public demonstrations
- **THEN** the implementation guidance includes module-appropriate debugging questions and safety or handling cues

#### Scenario: Implementation phases support grade differentiation
- **WHEN** a teacher adapts a CiudadBots module for 1.º, 2.º, or 3.º básico
- **THEN** the implementation guidance includes grade-differentiated cues that scale from guided construction and observation to measurement, debugging, redesign, documentation, or transfer

#### Scenario: Implementation guidance is available in both locales
- **WHEN** a visitor opens any CiudadBots module in Spanish or English
- **THEN** the implementation phases provide equivalent classroom guidance in that locale, with the same four-phase structure and module-specific intent
