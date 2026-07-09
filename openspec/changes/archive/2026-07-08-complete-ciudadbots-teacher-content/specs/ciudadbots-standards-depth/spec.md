## ADDED Requirements

### Requirement: Per-module CNB tab explains depth-by-grade reading
Each module's "CNB y estándares" tab SHALL include the note explaining that the same module can be taught at 1º, 2º, or 3º básico, with a different expected depth at each level (1º: guided comprehension/execution; 2º: analysis, measurement, improvement; 3º: autonomous design, technical documentation, transfer to real problems).

#### Scenario: Teacher checks how to adapt a module to their grade
- **WHEN** a teacher opens any module's "CNB y estándares" tab
- **THEN** the 1º/2º/3º básico depth-reading note SHALL be present, worded consistently across all 12 modules

### Requirement: Per-module CNB tab includes grade-specific achievement indicators
Each module's "CNB y estándares" tab SHALL include a table of suggested achievement indicators broken down by grade (1º, 2º, 3º básico), each row naming the CNB-aligned competency, the indicator specific to that module, and the expected evidence — parameterized by the module's own title, matching the content pattern of the original HTML's `cnbAchievementIndicators(m)`.

#### Scenario: Teacher looks up expected evidence for a specific module and grade
- **WHEN** a teacher opens a module's "CNB y estándares" tab
- **THEN** a 3-row table (one row per grade) SHALL show that module's name, the grade-specific indicator, and the expected evidence for that grade

### Requirement: Per-module CNB tab includes ISTE/CSTA/NGSS progression content
Each module's "CNB y estándares" tab SHALL include the international standards progression content: ISTE Students, CSTA K-12 CS (Level 2), NGSS MS-ETS1, and global STEAM-competency summaries, plus the grade-by-grade progression tables (ISTE / CSTA / NGSS columns; and technical/engineering/communication-evidence rows) across 1º, 2º, and 3º básico, identical in content to the original HTML's `internationalAlignment()` output.

#### Scenario: Teacher reports progress against international standards
- **WHEN** a teacher opens a module's "CNB y estándares" tab
- **THEN** the ISTE/CSTA/NGSS descriptive cards and both grade-progression tables SHALL be present with their full original text

### Requirement: Per-module CNB tab links to official CNB sources
Each module's "CNB y estándares" tab SHALL include outbound links to the official CNB Guatemala Ciclo Básico wiki page and its competencies-by-area-and-grade page, matching the original HTML's `cnbSourceLinks()`.

#### Scenario: Teacher wants to verify against the official curriculum
- **WHEN** a teacher opens a module's "CNB y estándares" tab
- **THEN** links to `cnbguatemala.org`'s Ciclo Básico page and its competencies-by-area-and-grade page SHALL both be present and open in a new tab

### Requirement: Shared standards content is stored once, not duplicated per module
The grade-level básico breakdown and the ISTE/CSTA/NGSS progression content SHALL be defined in a single shared data/component source and reused across all 12 modules and the overview page, rather than being copy-pasted per module.

#### Scenario: The básico/international-standards wording is updated
- **WHEN** the shared básico or international-standards content is edited once
- **THEN** the update SHALL be reflected consistently everywhere it is rendered (every module's CNB tab and the overview page) without per-module edits
