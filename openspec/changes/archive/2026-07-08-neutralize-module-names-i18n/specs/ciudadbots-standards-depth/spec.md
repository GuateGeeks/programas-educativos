## MODIFIED Requirements

### Requirement: Per-module CNB tab explains depth-by-grade reading

Each module's "CNB y estándares" tab SHALL include the note explaining that the same module can be taught at 1º, 2º, or 3º básico, with a different expected depth at each level (1º: guided comprehension/execution; 2º: analysis, measurement, improvement; 3º: autonomous design, technical documentation, transfer to real problems), authored in both `es` and `en` with consistent wording across all 12 modules within each locale.

#### Scenario: Teacher checks how to adapt a module to their grade
- **WHEN** a teacher opens any module's "CNB y estándares" tab in either locale
- **THEN** the 1º/2º/3º básico depth-reading note SHALL be present in that locale's language, worded consistently across all 12 modules

### Requirement: Per-module CNB tab includes grade-specific achievement indicators

Each module's "CNB y estándares" tab SHALL include a table of suggested achievement indicators broken down by grade (1º, 2º, 3º básico), each row naming the CNB-aligned competency, the indicator specific to that module, and the expected evidence — parameterized by that module's own title in the current locale.

#### Scenario: Teacher looks up expected evidence for a specific module and grade
- **WHEN** a teacher opens a module's "CNB y estándares" tab in either locale
- **THEN** a 3-row table (one row per grade) SHALL show that module's name in the current locale, the grade-specific indicator, and the expected evidence for that grade, all in that locale's language

### Requirement: Per-module CNB tab includes ISTE/CSTA/NGSS progression content

Each module's "CNB y estándares" tab SHALL include the international standards progression content: ISTE Students, CSTA K-12 CS (Level 2), NGSS MS-ETS1, and global STEAM-competency summaries, plus the grade-by-grade progression tables (ISTE / CSTA / NGSS columns; and technical/engineering/communication-evidence rows) across 1º, 2º, and 3º básico, authored in both `es` and `en`.

#### Scenario: Teacher reports progress against international standards
- **WHEN** a teacher opens a module's "CNB y estándares" tab in either locale
- **THEN** the ISTE/CSTA/NGSS descriptive cards and both grade-progression tables SHALL be present with full text in that locale's language

### Requirement: Shared standards content is stored once per locale, not duplicated per module

The grade-level básico breakdown and the ISTE/CSTA/NGSS progression content SHALL be defined in a single shared data/component source per locale and reused across all 12 modules and the overview page, rather than being copy-pasted per module or per locale.

#### Scenario: The básico/international-standards wording is updated
- **WHEN** the shared básico or international-standards content is edited once for a given locale
- **THEN** the update SHALL be reflected consistently everywhere it is rendered in that locale (every module's CNB tab and the overview page) without per-module edits

## ADDED Requirements

### Requirement: English-locale CNB tab leads with international standards

In the `en` locale, each module's "CNB y estándares" tab SHALL present the ISTE/CSTA/NGSS international standards content before the Guatemala CNB curriculum mapping, with the CNB mapping shown in a secondary or collapsed position. In the `es` locale, the CNB mapping SHALL remain in the primary position, unchanged in order.

#### Scenario: English-locale teacher opens a module's standards tab
- **WHEN** a teacher opens any module's "CNB y estándares" tab with the `en` locale selected
- **THEN** the international standards (ISTE/CSTA/NGSS) content SHALL appear before the Guatemala CNB mapping, which SHALL be present but visually secondary

#### Scenario: Spanish-locale ordering is unchanged
- **WHEN** a teacher opens any module's "CNB y estándares" tab with the `es` locale selected
- **THEN** the Guatemala CNB mapping SHALL appear in the primary position, as before this change
