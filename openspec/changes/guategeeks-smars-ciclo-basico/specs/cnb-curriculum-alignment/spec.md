## ADDED Requirements

### Requirement: CNB Competency Mapping for All 12 Sessions
The program SHALL explicitly map each of the 12 sessions to specific CNB Basic Cycle competencies across 5 subject areas: Ciencias Naturales, Tecnologías del Aprendizaje y Comunicación (TAC), Emprendimiento para la Productividad, Comunicación y Lenguaje, and Matemática.

#### Scenario: Session-to-Competency Matrix
- **WHEN** a docent views the curriculum alignment
- **THEN** a matrix displays Sessions (rows) × CNB Competencies (columns) with explicit indicators showing which competencies are addressed in each session

#### Scenario: Natural Sciences Domination
- **WHEN** reviewing the competency distribution
- **THEN** Ciencias Naturales competencies appear in all 12 sessions (machines, movement, energy, scientific method), particularly: CN 1.1 (technology and scientific knowledge), CN 1.3 (simple/compound machines), CN 4.2 (mechanics: movement, forces)

#### Scenario: TAC Competency Integration
- **WHEN** examining technology competencies
- **THEN** Tecnologías del Aprendizaje y Comunicación appear in all sessions with emphasis on: TAC 1.1 (technology components, documentation), TAC 1.3 (digital documents, code documentation)

#### Scenario: Entrepreneurship Competency Presence
- **WHEN** reviewing Emprendimiento competencies
- **THEN** they are present in Sessions 1, 2, 9-12 with focus on: EP 1.1 (entrepreneurial characteristics), EP 1.2 (problem-solving, life project)

#### Scenario: Communication Competency Presence
- **WHEN** examining Communication competencies
- **THEN** they are present throughout Sessions 1-12 with emphasis on: COM 2.1 (expressing results through documents), presentations in Session 12

#### Scenario: Mathematics Integration
- **WHEN** reviewing Math competencies
- **THEN** they appear in Sessions 3, 4, 7, 8, 11 with focus on: measurements (Session 3-4), proportionality (Session 7, PWM-to-speed), distance calculations (Session 8)

### Requirement: Session-Specific CNB Indicators of Achievement
Each session SHALL list the specific CNB indicators of achievement (indicadores de logro) it addresses, tied to official CNB documentation.

#### Scenario: Indicator Traceability
- **WHEN** a docent reviews Session 6 (Energy and Motor Driver)
- **THEN** specific CNB indicators are listed such as: "CN 1.3.1: Identifica máquinas simples y compuestas en recursos del medio. Su importancia", enabling direct mapping to Mineduc requirements

#### Scenario: Multiple Indicators Per Session
- **WHEN** examining any session's indicators
- **THEN** 4-5 specific CNB indicators are listed (not generic competencies), allowing precise curriculum alignment reporting

### Requirement: CSTA Alignment (Computer Science Standards)
The program SHALL map sessions to relevant CSTA (Computer Science Teachers Association) standards for algorithm, data representation, and computing practice.

#### Scenario: Algorithm Standards Coverage
- **WHEN** reviewing Sessions 9-12 (Crear and Reflexionar phases)
- **THEN** CSTA algorithm standards are mapped: "Level 1A: Sequences, loops, conditionals" (Sessions 6-8), "Level 2: State machines, modularity" (Sessions 9-12)

#### Scenario: Computing Practice Standards
- **WHEN** examining all 12 sessions
- **THEN** CSTA computing practices are addressed: "Problem-solving" (all sessions), "Persistence in problem-solving" (especially Sessions 11-12), "Algorithmic thinking" (Sessions 9-10)

### Requirement: ISTE Standards Integration
The program SHALL align with ISTE (International Society for Technology in Education) standards for creative, innovative student use of technology.

#### Scenario: ISTE Empowered Learner
- **WHEN** students complete the program
- **THEN** they demonstrate ISTE "Empowered Learner" standard: "Leverage technology to take an active role in choosing, achieving and demonstrating competency in their learning goals" through design iteration and debugging

#### Scenario: ISTE Designer
- **WHEN** students tackle Sessions 5-12 (Crear and Reflexionar)
- **THEN** they work toward ISTE "Designer" standard: "Students design and build ideas into tangible products or processes" through robot assembly and firmware integration

#### Scenario: ISTE Computational Thinker
- **WHEN** students complete Sessions 9-12
- **THEN** they demonstrate ISTE "Computational Thinker" standard: "formulate problems, identify solutions, and implement them" through state machine design and sensor integration

### Requirement: NGSS Engineering and Technology Standards Alignment
The program SHALL map to NGSS (Next Generation Science Standards) Engineering & Technology standards for design process and systems thinking.

#### Scenario: NGSS ETS1 Design Process
- **WHEN** students work through Sessions 5-12
- **THEN** NGSS ETS1 standards are addressed: "Define problems" (Sessions 1-2), "Develop solutions" (Sessions 5-10), "Optimize and test" (Sessions 11-12)

#### Scenario: NGSS Physical Science Standards
- **WHEN** students build and test mechanical/electrical systems
- **THEN** NGSS physical science standards are met: "Motion and forces" (Sessions 5, 7, 10), "Energy" (Session 6)

### Requirement: Competency Progression Document
The program SHALL provide a visualization or document showing how competencies build and deepen across the 12 sessions.

#### Scenario: Progression Visualization
- **WHEN** a docent views competency progression
- **THEN** a chart or diagram shows competencies introduced (Sessions 1-2), developed (Sessions 3-10), and mastered/demonstrated (Sessions 11-12)

#### Scenario: Competency Spiral Model
- **WHEN** examining specific competencies like "CN 1.3: Máquinas"
- **THEN** the progression is documented: "Session 1-2 (identify components), Session 4 (assemble), Session 5-10 (design modifications), Session 12 (optimize)"

### Requirement: Evidence-to-Competency Mapping for Assessment
The program SHALL specify what evidence (student work samples, test results, demonstrations) counts as proof of competency achievement for each CNB indicator.

#### Scenario: Competency Evidence Type
- **WHEN** assessing whether a student meets "CN 1.2: Aplica el método científico"
- **THEN** acceptable evidence is specified: "written hypothesis before testing (Sessions 7-8), measurement table with at least 3 trials (Sessions 11), reflection documenting error analysis (Session 11)"

#### Scenario: Evidence Documentation Guidance
- **WHEN** a docent is collecting evidence
- **THEN** guidance specifies: format (photo, video, document), timing (during which session), and how to store for portfolio/Mineduc reporting

### Requirement: CNB Document Cross-References
The program SHALL cite exact CNB document sources (page numbers, competency codes) for full traceability to official curriculum.

#### Scenario: Citation Format
- **WHEN** a session lists CNB competencies
- **THEN** citations are formatted as: "CN 1.3.2 (p. 10)" enabling docents to verify in official CNB Ciclo Básico documents

#### Scenario: Link to Online Resources
- **WHEN** GuateGeeks is published on web
- **THEN** competency citations include links to CNB Guatemala wiki pages for quick reference

### Requirement: Interdisciplinary Learning Connections
The program SHALL explicitly document how sessions connect learning across subject areas (e.g., mechanics + programming + measurement).

#### Scenario: Interdisciplinary Example - Session 8
- **WHEN** reviewing Session 8 (Ultrasonic Sensor)
- **THEN** the connection is documented: "Physics (sound travel distance = velocity × time) → Mathematics (proportional relationships) → Programming (reading sensor input) → Ciencias Naturales (scientific measurement)"

#### Scenario: Real-World Application Connection
- **WHEN** students understand interdisciplinary links
- **THEN** session documentation explains: "This integration mirrors real robotics jobs (mechanical engineers design, electrical engineers wire, software engineers program, scientists verify)"
