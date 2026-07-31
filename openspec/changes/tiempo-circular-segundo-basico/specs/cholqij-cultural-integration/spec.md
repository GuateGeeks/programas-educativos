## ADDED Requirements

### Requirement: Cholq'ij content is anchored in the CNB malla

The Cholq'ij material SHALL be presented as the delivery of contents that the Segundo Básico Matemática malla already prescribes, and SHALL cite them.

#### Scenario: Malla anchoring is explicit

- **WHEN** the Cholq'ij session is loaded
- **THEN** it cites MAT 5.2 (`Relaciona la cosmovisión maya en el contexto del tiempo y la persona`, contents: ciclos en el calendario Cholq'ij y Hab', los cuadrantes y los puntos cardinales) and MAT 5.3 (el 13 y el 20 en el pensamiento maya) with their source page

#### Scenario: Mathematics of the cycle is taught explicitly

- **WHEN** a student works the Cholq'ij session
- **THEN** the material derives the 13 × 20 = 260-day cycle, the exact 18° step of the twenty-position ring, and the non-integer 360/13 ≈ 27.69° step of the thirteen-number cycle, and uses that non-integer divisor to work rounding and accumulated error

### Requirement: Declared scope boundary

The program SHALL state plainly what the Cholq'ij material does and does not teach.

#### Scenario: Boundary is published on the session page

- **WHEN** the Cholq'ij session or the program index is read
- **THEN** it states that the program works the calendar's cycle structure and arithmetic and its representation on a circular display, and that it does not teach ceremonial practice, divination, or the spiritual reading of nawales

#### Scenario: No claim of authority is made

- **WHEN** the material is read
- **THEN** it makes no claim that the program, its authors, or GuateGeeks speak for or on behalf of Maya communities or ajq'ijab'

### Requirement: Sources and attribution are published

The Cholq'ij material SHALL name the sources it relies on, so a teacher can check it and take it further.

#### Scenario: Source list exists

- **WHEN** the licences or Cholq'ij page is read
- **THEN** it lists the sources used for the calendar content, beginning with the Mineduc malla itself, and attributes them

#### Scenario: Nawal names, if used, are sourced

- **WHEN** the material names nawales or day-names
- **THEN** it states which linguistic variant is used, names the source for the spelling, and notes that names and spellings vary between Maya languages and communities

### Requirement: Cultural review gate before publication

The Cholq'ij content SHALL NOT be published without review by a person with standing knowledge of the Maya calendar, and its review status SHALL be visible in the change's own records.

#### Scenario: Review is pending until performed

- **WHEN** the Cholq'ij content is drafted but not yet reviewed
- **THEN** the change's task list marks the review as an outstanding human-gated step, and the content is not presented as final

#### Scenario: Review outcome is recorded

- **WHEN** the cultural review has been performed
- **THEN** the change records who reviewed it and what was changed as a result

### Requirement: The conventional clock face remains a complete path

A team that does not build the Cholq'ij face SHALL still be able to complete the program.

#### Scenario: Program completes without the Cholq'ij face

- **WHEN** a teacher chooses to run only the 12-hour clock face
- **THEN** the teacher guide states which evidence substitutes for session 11 and the integrating challenge in session 12 remains achievable
