## MODIFIED Requirements

### Requirement: Showcase session is reachable from site navigation

The system SHALL provide a "Showcase" closing session as a page in the CiudadBots docs sidebar, positioned immediately after module 12 (the final neutral-named module), matching the original session order, with the page title translated per locale.

#### Scenario: Teacher navigates to the closing session
- **WHEN** a teacher opens the CiudadBots sidebar in either locale
- **THEN** a "Showcase" entry SHALL appear after the 12 numbered modules and SHALL open a page titled with that locale's translation of "Presentación final: diseñamos una ciudad con robots"

## ADDED Requirements

### Requirement: Showcase page content is authored per locale

The Showcase page's three closing phases, grade-differentiated evaluation guidance, and final program-level rubric SHALL be authored in both `es` and `en`, so an English-locale visitor reads fully translated content rather than a Spanish fallback.

#### Scenario: English-locale visitor opens the Showcase page
- **WHEN** a visitor opens the Showcase page with the `en` locale selected
- **THEN** the three closing phases, evaluation guidance, and final rubric SHALL all be rendered in English
