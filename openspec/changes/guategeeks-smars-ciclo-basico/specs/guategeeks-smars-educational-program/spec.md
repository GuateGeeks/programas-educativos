## ADDED Requirements

### Requirement: GuateGeeks - SMARS Educational Program Structure
The program SHALL consist of 12 sequential sessions organized into 4 phases, with each session containing a complete mini-cycle of learning stages (Activar, Explorar, Crear, Reflexionar).

#### Scenario: Session Structure Completeness
- **WHEN** a docent reviews any of the 12 sessions
- **THEN** the session contains: opening question, learning objectives, 4 mini-phases with time allocations (15+25+60-90+15 min), key concepts, materials list, and specific learning outcome

#### Scenario: Phase Distribution
- **WHEN** mapping sessions to phases
- **THEN** Phase 1 (Activar - Sesiones 1-2) covers systems and safety, Phase 2 (Explorar - Sesiones 3-4) covers fabrication, Phase 3 (Crear - Sesiones 5-10) covers technical integration, Phase 4 (Reflexionar - Sesiones 11-12) covers refinement and evaluation

### Requirement: Mini-Cycle Phases in Each Session
Each session SHALL include 4 phases: Activar (activating prior knowledge), Explorar (exploration of concepts), Crear (creation/construction), and Reflexionar (reflection and assessment).

#### Scenario: Activar Phase Execution
- **WHEN** a session begins
- **THEN** Activar phase lasts 15 minutes, presents a central question, provides context, and engages students with relevant prior knowledge

#### Scenario: Crear Phase Duration
- **WHEN** students enter the Crear phase
- **THEN** Crear phase allows 60-90 minutes for hands-on construction, programming, testing, and troubleshooting

#### Scenario: Reflexionar Phase Synthesis
- **WHEN** a session concludes
- **THEN** Reflexionar phase (15 min) includes comparison with peer work, identification of problems, documentation of solutions, and socratic questions for deeper understanding

### Requirement: Progressive Challenge Levels
The program SHALL distribute challenges across 4 levels (Observation, Modification, Algorithms, Engineering) throughout the 12 sessions, building in complexity.

#### Scenario: Level 0 Challenges (Sessions 1-2)
- **WHEN** students complete Sessions 1-2 (Activar phase)
- **THEN** challenges focus on drawing, diagramming, and documentation (Level 0: Observe)

#### Scenario: Level 1 Challenges (Sessions 3-4)
- **WHEN** students complete Sessions 3-4 (Explorar phase)
- **THEN** challenges require measurement, classification, and observation of physical properties

#### Scenario: Level 2 Challenges (Sessions 5-8)
- **WHEN** students complete Sessions 5-8 (Crear phase, first half)
- **THEN** challenges require modification of existing designs (e.g., change buzzer tones and debounce timing, find each track's minimum PWM, characterise sensor error at known distances)

#### Scenario: Level 3 Challenges (Sessions 9-11)
- **WHEN** students complete Sessions 9-11 (Crear phase second half + Reflexionar early)
- **THEN** challenges require implementation of algorithms (e.g., state machines, conditional logic)

#### Scenario: Level 4 Challenge (Session 12)
- **WHEN** students reach Session 12 (Reflexionar, final)
- **THEN** challenge is engineering-level integration: autonomous robot in 2×2m arena with 3 obstacles, 3-minute operation without external control

### Requirement: Role Rotation System
The program SHALL include 4 roles that rotate among team members in each session: Safety/Energy Responsible, Mechanical Responsible, Electronics Responsible, Code/Documentation Responsible.

#### Scenario: Role Assignment Per Session
- **WHEN** a team begins a session
- **THEN** each student is assigned one of the 4 roles, and role assignments change in the next session (e.g., student A: Safety → Mechanical → Electronics → Code → Safety)

#### Scenario: Role Responsibilities Documentation
- **WHEN** a role is assigned to a student
- **THEN** clear documentation specifies what tasks that role performs in the current session

### Requirement: Central Question and Context for Each Session
Each session SHALL have a driving question that frames the learning objective and provides concrete context relevant to robotics and community problem-solving.

#### Scenario: Question Framing
- **WHEN** a session begins
- **THEN** the central question is specific, answerable through the session's activities, and connected to the robot's system or behavior

#### Scenario: Context Connection
- **WHEN** the context is presented
- **THEN** it connects the session's technical work to a real-world robotics or community problem (e.g., "How does a robot decide to move toward or away from an obstacle?")

### Requirement: Materials and Equipment List Per Session
Each session SHALL specify all materials, tools, and equipment required.

#### Scenario: Materials Availability Check
- **WHEN** a docent prepares a session
- **THEN** the materials list allows them to verify availability before the class begins

### Requirement: Observable Learning Outcomes Per Session
Each session SHALL specify a concrete, observable output or demonstration that shows students have achieved the session's learning objectives.

#### Scenario: Outcome Documentation
- **WHEN** a session concludes
- **THEN** students can point to a tangible deliverable (diagram, working circuit, calibration data, code submission) as evidence of learning
