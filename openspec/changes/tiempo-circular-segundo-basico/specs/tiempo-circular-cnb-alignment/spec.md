## ADDED Requirements

### Requirement: Alignment targets Segundo Básico competencies

The program SHALL map its sessions to the CNB competencies of **Segundo Básico**, not to any other grade.

#### Scenario: Alignment page declares the grade

- **WHEN** a teacher loads `/tiempo-circular/alineacion-cnb`
- **THEN** the page title and body state that the mapping is to Segundo Básico of the Guatemalan Ciclo Básico

#### Scenario: No competency from another grade is claimed

- **WHEN** any CNB citation in the program is checked against `CNB_Guatemala_Mallas_Curriculares_Basico/`
- **THEN** the cited indicator belongs to a Segundo Básico malla

### Requirement: Every CNB citation carries its source page

Each CNB citation SHALL include the indicator code, the indicator text or a faithful summary of it, and the page number that the malla itself declares as its source.

#### Scenario: Session-level citation format

- **WHEN** a session's `SessionModule.Cnb` entries are rendered
- **THEN** each entry names an area code and indicator number, states what the indicator requires, and ends with the source page in the form `(p. NN)`

#### Scenario: Legend lists pages for every code used

- **WHEN** the alignment page's legend table is read
- **THEN** every competency code used anywhere in the program appears with its full indicator text and its source page

#### Scenario: Citations are verifiable against the bundled mallas

- **WHEN** a reviewer cross-checks a citation
- **THEN** the indicator code, text and page match the corresponding file under `CNB_Guatemala_Mallas_Curriculares_Basico/areas/`

### Requirement: Session-by-competency matrix

The alignment page SHALL present a matrix showing which competencies each of the twelve sessions exercises.

#### Scenario: Matrix covers all twelve sessions

- **WHEN** the matrix is rendered
- **THEN** it has one row per session, one column per competency code, and marks every session-competency pair the program claims

#### Scenario: Core mathematics competencies are covered

- **WHEN** the matrix is read
- **THEN** it claims at minimum MAT 1.2 (ángulos notables en la circunferencia, simetría y transformaciones), MAT 1.3 (razones trigonométricas del triángulo rectángulo), MAT 5.1 (sistemas de numeración posicional), MAT 5.2 and MAT 5.3 (ciclos del calendario maya y el 13 y el 20), CN 1.3 (medición y error experimental), CN 4.3 (movimiento circular uniforme) and TAC 1.1 (dispositivos periféricos de entrada, salida y comunicación)

### Requirement: Partial coverage of a competency is declared, not hidden

Where the program exercises only part of a CNB competency, the alignment page SHALL state which contents are covered and which are not.

#### Scenario: Scope caveat is published

- **WHEN** the program claims a competency whose malla contents extend beyond what the sessions actually work
- **THEN** the alignment page carries a visible note naming the contents that are **not** covered, so the alignment can be used for honest progress reporting

### Requirement: International standards are cited in the band matching the grade

The program SHALL cite international standards at the level corresponding to segundo básico, with sub-indicators rather than bare framework names.

#### Scenario: Correct standards bands are used

- **WHEN** a session's `SessionModule.Standards` entries are rendered
- **THEN** CSTA citations are from **Level 2 (grades 6-8)**, NGSS engineering citations are from **MS-ETS1**, and ISTE citations name a specific sub-indicator

#### Scenario: No standard is cited without a sub-indicator

- **WHEN** any standards entry is read
- **THEN** it includes a specific code and a statement of what that code requires, not only the framework name
