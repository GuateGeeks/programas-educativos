## MODIFIED Requirements

### Requirement: Per-module CNB tab includes grade-specific achievement indicators
Each module's "CNB y estándares" tab SHALL include a table of suggested achievement indicators broken down by grade (1º, 2º, 3º básico), each row naming CNB-aligned competency focus, current Ciclo Básico area language, the indicator specific to that module, and the expected evidence — parameterized by that module's own title in the current locale. TAC SHALL be included in the shared or module-specific CNB alignment when the module uses programming, collaboration tools, digital documentation, or data handling.

#### Scenario: Teacher looks up expected evidence for a specific module and grade
- **WHEN** a teacher opens a module's "CNB y estándares" tab in either locale
- **THEN** a 3-row table (one row per grade) SHALL show that module's name in the current locale, the grade-specific indicator, and the expected evidence for that grade, all in that locale's language

### Requirement: Per-module CNB tab includes ISTE/CSTA/NGSS progression content
Each module's "CNB y estándares" tab SHALL include the international standards progression content: ISTE Standards for Students, 2026 CSTA PK-12 Computer Science Standards with middle-school concepts/practices, NGSS MS-ETS1, and global STEAM-competency summaries, plus the grade-by-grade progression tables (ISTE / CSTA / NGSS columns; and technical/engineering/communication-evidence rows) across 1º, 2º, and 3º básico, authored in both `es` and `en`.

#### Scenario: Teacher reports progress against international standards
- **WHEN** a teacher opens a module's "CNB y estándares" tab in either locale
- **THEN** the ISTE/CSTA/NGSS descriptive cards and both grade-progression tables SHALL be present with full text in that locale's language

### Requirement: Shared standards content is stored once per locale, not duplicated per module
The grade-level básico breakdown, TAC/transversal CNB summary, and ISTE/2026 CSTA PK-12/NGSS progression content SHALL be defined in a single shared data/component source per locale and reused across all 12 modules and the overview page, rather than being copy-pasted per module or per locale.

#### Scenario: The básico/international-standards wording is updated
- **WHEN** the shared básico or international-standards content is edited once for a given locale
- **THEN** the update SHALL be reflected consistently everywhere it is rendered in that locale (every module's CNB tab and the overview page) without per-module edits
