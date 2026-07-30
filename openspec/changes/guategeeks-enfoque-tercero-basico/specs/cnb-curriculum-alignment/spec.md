## MODIFIED Requirements

### Requirement: CNB Competency Mapping for All 12 Sessions
The program SHALL map each of the 12 sessions to competencies of the **Tercero Básico** curriculum, drawn from `CNB_Guatemala_Mallas_Curriculares_Basico/areas/<area>/tercero-basico.md`, across five areas: Ciencias Naturales, Tecnologías del Aprendizaje y la Comunicación, Emprendimiento para la Productividad, Matemática, and Comunicación y Lenguaje.

#### Scenario: Grade of origin
- **WHEN** any competency code is cited anywhere in the program
- **THEN** its wording matches the corresponding entry in that area's `tercero-basico.md`, and no citation derives from `primero-basico.md` or `segundo-basico.md`

#### Scenario: Session-to-competency matrix
- **WHEN** a docent views the curriculum alignment
- **THEN** a matrix displays the 12 sessions against the Tercero Básico competencies, with a legend giving each code's full wording

#### Scenario: Natural Sciences coverage
- **WHEN** reviewing Ciencias Naturales
- **THEN** the cited competencies are CN 1.2 (scientific and technological research procedures), CN 1.3 (communicating results, successes and errors, with graphs and scientific reports), CN 4.3 (vector resultants by rectangular components, solving for variables) and CN 4.4 (contextualised movement problems)

#### Scenario: Technology coverage
- **WHEN** reviewing Tecnologías del Aprendizaje y la Comunicación
- **THEN** the cited competencies are TAC 1.1 (choosing the appropriate tool and platform), TAC 1.2 (designing digital material such as infographics and graphs) and TAC 2.1/2.2 (spreadsheet data analysis and identifying patterns for decisions)

#### Scenario: Entrepreneurship coverage
- **WHEN** reviewing Emprendimiento para la Productividad
- **THEN** the cited competencies are EP 1.3 (organising functions in project administration) and EP 2.2 (quality management and continuous improvement of productive processes)

#### Scenario: Mathematics coverage
- **WHEN** reviewing Matemática
- **THEN** the cited competencies are MAT 2.3 (using functions, including the graph of a linear function), MAT 4.1 (measures of dispersion: range and interquartile range) and MAT 5.1 (the decimal system and its relation to other bases)

#### Scenario: Dispersion is cited precisely
- **WHEN** the sensor characterisation work is mapped to MAT 4.1
- **THEN** it refers to **range and interquartile range**, which is what the Tercero Básico syllabus specifies, and not to standard deviation

### Requirement: Session-Specific CNB Indicators of Achievement
Each session SHALL list the specific Tercero Básico evaluation criteria or contents it addresses, worded as the syllabus words them.

#### Scenario: Indicator traceability
- **WHEN** a docent reviews any session
- **THEN** the listed criteria can be located verbatim, or in close paraphrase, in the corresponding `tercero-basico.md`

#### Scenario: Only what the program exercises
- **WHEN** a competency is cited for a session
- **THEN** a concrete activity in that session works it, and topics that merely share a heading are excluded

#### Scenario: Bounded citation of CN 4.4
- **WHEN** CN 4.4 is cited
- **THEN** only uniformly accelerated linear motion, uniform circular motion and free-body diagrams are claimed, because the program does not work free fall, projectile motion or elastic collisions

### Requirement: CSTA Alignment (Computer Science Standards)
The program SHALL map sessions to **CSTA Level 3A** standards, the band covering grades 9-10, which corresponds to tercero básico.

#### Scenario: Band matches the target grade
- **WHEN** CSTA standards are cited
- **THEN** they are Level 3A, not the Level 2 band that CiudadBots uses for its wider 1.º-3.º audience

#### Scenario: Provenance is stated
- **WHEN** CSTA, ISTE or NGSS codes appear
- **THEN** the program records that no local copy of those frameworks exists in the repository, so unlike the CNB citations they were not verified against a source file, and links to the official sources are provided

### Requirement: ISTE Standards Integration
The program SHALL cite ISTE Standards for Students at sub-indicator level rather than as generic strand names.

#### Scenario: Sub-indicator specificity
- **WHEN** ISTE is cited for a session
- **THEN** the citation identifies the specific sub-indicator exercised, such as the Computational Thinker indicators for formulating problems, collecting data and decomposing a problem

### Requirement: NGSS Engineering and Technology Standards Alignment
The program SHALL map to **NGSS HS-ETS1**, the high-school engineering design band, and to HS-PS2 where sessions work forces and motion.

#### Scenario: Band matches the target grade
- **WHEN** NGSS standards are cited
- **THEN** they are the HS band, not MS-ETS1

### Requirement: Competency Progression Document
The program SHALL document how competencies build across the 12 sessions **within tercero básico**, without reference to expectations for other grades.

#### Scenario: No cross-grade differentiation
- **WHEN** the progression is presented
- **THEN** it describes introduction, development and demonstration across the program's own sessions, and contains no table comparing what 1.º, 2.º and 3.º básico would be expected to do

### Requirement: Evidence-to-Competency Mapping for Assessment
The program SHALL specify which evidence proves each Tercero Básico competency.

#### Scenario: Evidence maps to third-grade competencies
- **WHEN** evidence is listed for reporting
- **THEN** each row cites a Tercero Básico code, and the evidence named is something the program actually produces

### Requirement: CNB Document Cross-References
The program SHALL cite exact CNB document sources for full traceability, using the competency code and the page number that the **Tercero Básico** syllabus itself declares as its source.

#### Scenario: Citation format
- **WHEN** a session lists CNB competencies
- **THEN** citations carry the code and the page declared by that area's `tercero-basico.md`, such as «CN 4.3 (p. 26)», so a docent can locate them in the official document

#### Scenario: Page numbers come from the third-year syllabus
- **WHEN** a page number is cited
- **THEN** it is the one declared in the Tercero Básico malla, not a page from another grade's document

#### Scenario: Link to online resources
- **WHEN** GuateGeeks is published on the web
- **THEN** the alignment page links to the CNB Guatemala sources for verification

### Requirement: Interdisciplinary Learning Connections
The program SHALL document how sessions connect learning across subject areas, using the Tercero Básico framing of each area.

#### Scenario: Interdisciplinary example, session 8
- **WHEN** reviewing session 8
- **THEN** the connection is documented as physics (solving for a variable in a linear-motion equation, CN 4.3) → mathematics (dispersion of a data set, MAT 4.1) → technology (spreadsheet analysis and statistical graphs, TAC 2.2) → scientific communication (expressing results in graphs, CN 1.3)

#### Scenario: Real-world application connection
- **WHEN** students understand the interdisciplinary links
- **THEN** the material relates the role rotation to how functions are distributed in project administration, which is what EP 1.3 describes

## ADDED Requirements

### Requirement: Third-Grade Connections Made Explicit
The alignment SHALL make visible the three places where Tercero Básico competencies fit the program with unusual precision, so a docent can see the mapping is substantive rather than nominal.

#### Scenario: The robot as a constructed instrument
- **WHEN** CN 1.3 is presented
- **THEN** the material notes that content 1.3.6 asks students to build laboratory instruments from available materials, and that the robot with its ultrasonic sensor is such an instrument, built and characterised by the students

#### Scenario: Differential drive as vector composition
- **WHEN** CN 4.3 is presented for session 7
- **THEN** the material states that each track contributes a velocity vector and the resultant determines translation and rotation, connecting the activity to rectangular components

#### Scenario: Sensor error as dispersion
- **WHEN** MAT 4.1 is presented for session 8
- **THEN** the material states that the repeated readings per distance form a data set whose range and interquartile range are exactly the dispersion measures the syllabus asks for
