## ADDED Requirements

### Requirement: Module CNB mappings use current Ciclo Básico area names
The system SHALL enrich all 12 CiudadBots module CNB mappings using current Guatemala Ciclo Básico area names, including `Matemática`, `Ciencias Naturales`, `Tecnologías del Aprendizaje y la Comunicación`, `Comunicación y Lenguaje, Idioma Español`, and `Emprendimiento para la Productividad` where applicable.

Legacy or non-Ciclo Básico labels such as `Productividad y Desarrollo`, `Expresión Artística`, and `Medio Social y Natural` SHALL NOT be used as primary CNB area labels in the enriched module mappings.

#### Scenario: Teacher reads a module CNB mapping
- **WHEN** a teacher opens the CNB section for any CiudadBots module
- **THEN** the module mapping SHALL use current Ciclo Básico area names and SHALL include TAC when the module evidence involves programming, digital documentation, collaboration, or data handling

### Requirement: Module CNB mappings include traceable classroom evidence
Each CiudadBots module SHALL include CNB-aligned evidence statements that connect curriculum areas to observable classroom artifacts such as measurements, data tables, robot behavior, program changes, debugging notes, diagrams, pseudocode, oral explanation, or written reflection.

#### Scenario: Teacher plans assessment from a module page
- **WHEN** a teacher reviews a module's CNB mapping
- **THEN** the mapping SHALL describe what evidence students produce rather than only naming broad curriculum topics

### Requirement: International standards mappings use current source framing
Each CiudadBots module SHALL include international standards references using current source framing: ISTE Standards for Students identifiers, 2026 CSTA PK-12 middle-school computer science concepts or practices, and NGSS MS-ETS1 engineering design performance expectations where the module includes engineering design evidence.

#### Scenario: Teacher reports against international standards
- **WHEN** a teacher opens a module's standards section
- **THEN** the section SHALL identify ISTE, CSTA 2026 middle-school, and NGSS MS-ETS1 alignment in wording specific enough to support reporting from student evidence

### Requirement: Evaluation criteria require collectible evidence
Each CiudadBots module SHALL include evaluation criteria that require collectible evidence across at least four dimensions: functional robot behavior, program or algorithm reasoning, measurement or test data, and engineering communication or reflection.

#### Scenario: Teacher evaluates a team artifact
- **WHEN** a teacher reads a module's evaluation section
- **THEN** the criteria SHALL describe observable deliverables that can be collected or checked during the class

### Requirement: Program-level alignment remains reusable and localized
Shared CNB and international standards language SHALL remain authored once per locale and reused across module pages and the overview page, while module-specific MDX content SHALL carry only the local evidence and alignment details needed for that module.

#### Scenario: Shared standards copy is updated
- **WHEN** the shared CSTA, ISTE, NGSS, CNB depth, or TAC program-level wording changes in one locale
- **THEN** the update SHALL be visible wherever the shared standards components are rendered for that locale without editing every module page
