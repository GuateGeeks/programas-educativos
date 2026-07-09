## ADDED Requirements

### Requirement: Component UI strings are locale-aware, not hardcoded

Every UI-chrome string rendered by a React component (tab labels, download buttons, rubric scale legend, team-role names/descriptions, hero/homepage copy, form and navigation labels) SHALL be authored via Docusaurus's translation APIs (`<Translate>` / `translate()` backed by `i18n/<locale>/code.json`), not as a literal string in JSX or component source.

#### Scenario: Tab labels render in the current locale
- **WHEN** a visitor opens a module page with the `en` locale selected
- **THEN** the tab labels ("Implementación", "Recursos", "CNB y estándares", "Evaluación") render as their English equivalents, not the Spanish source strings

#### Scenario: No hardcoded Spanish string ships in a component
- **WHEN** the codebase is searched for literal Spanish UI strings inside `src/components/**` and `src/pages/**`
- **THEN** no hardcoded Spanish string remains outside of translation resource files

### Requirement: Student build view is locale-aware

The `/estudiante` student build page — hero copy, team-role names and descriptions, and the active module's title — SHALL render in the visitor's current locale rather than a hardcoded Spanish string.

#### Scenario: Student view renders in English
- **WHEN** a visitor opens `/en/estudiante`
- **THEN** the hero copy, team-role names/descriptions, and the module title are all shown in English

### Requirement: Navbar and footer strings are translated

The site's navbar items and footer link labels SHALL have authored English translations available via Docusaurus's theme i18n extraction, so no navbar or footer label falls back to Spanish when the `en` locale is active.

#### Scenario: Navbar renders in English
- **WHEN** a visitor selects the `en` locale
- **THEN** every navbar item label and footer link label SHALL render in English
