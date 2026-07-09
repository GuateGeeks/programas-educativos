## MODIFIED Requirements

### Requirement: Overview page links to every session including Showcase

The overview page SHALL include a full session index listing all 12 modules — identified by their neutral, engineering-oriented names — and the Showcase closing session, each linking directly to its page in the visitor's current locale.

#### Scenario: Teacher jumps directly to a specific session from the overview
- **WHEN** a teacher opens the overview page and clicks a session in the index
- **THEN** they SHALL land on that session's page in their current locale, and the Showcase session SHALL be listed and linked alongside the 12 modules

#### Scenario: Session index reflects the neutral naming scheme
- **WHEN** a visitor reads the session index in either locale
- **THEN** every listed module name is its neutral engineering-oriented title (Spanish or English, matching the page locale), with no Guatemala-specific place name, demonym, or slang term

## ADDED Requirements

### Requirement: Overview page content is authored per locale

The overview page's pacing options, básico-by-básico alignment breakdown, transversal CNB block, and teacher-expectation guidance SHALL be authored in both `es` and `en`, so an English-locale visitor reads fully translated content rather than a Spanish fallback.

#### Scenario: English-locale visitor reads the overview page
- **WHEN** a visitor opens the overview page with the `en` locale selected
- **THEN** the pacing options, básico alignment breakdown, transversal CNB block, and teacher-expectation guidance SHALL all be rendered in English
