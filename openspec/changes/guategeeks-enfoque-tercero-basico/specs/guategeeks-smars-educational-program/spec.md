## MODIFIED Requirements

### Requirement: GuateGeeks - SMARS Educational Program Structure
The program SHALL consist of 12 sequential sessions organized into 4 phases, targeted at **tercero básico**, with each session containing a complete mini-cycle of learning stages (Activar, Explorar, Crear, Reflexionar).

#### Scenario: Session Structure Completeness
- **WHEN** a docent reviews any of the 12 sessions
- **THEN** the session contains: opening question, learning objectives, 4 mini-phases with time allocations (15+25+60-90+15 min), key concepts, materials list, and specific learning outcome

#### Scenario: Phase Distribution
- **WHEN** mapping sessions to phases
- **THEN** Phase 1 (Activar - Sesiones 1-2) covers systems and safety, Phase 2 (Explorar - Sesiones 3-4) covers fabrication, Phase 3 (Crear - Sesiones 5-10) covers technical integration, Phase 4 (Reflexionar - Sesiones 11-12) covers refinement and evaluation

#### Scenario: Single target grade
- **WHEN** the program states its audience
- **THEN** it names tercero básico, and does not present itself as covering 1.º or 2.º básico

#### Scenario: Pedagogical content is unchanged by the grade focus
- **WHEN** the program is narrowed to tercero básico
- **THEN** the driving questions, phases, concepts, materials, retos and expected evidence of every session remain exactly as they were, because only the curricular alignment changes

### Requirement: Progressive Challenge Levels
The program SHALL distribute challenges across 5 levels (0 documenting, 1 observing, 2 modifying, 3 algorithms, 4 engineering) throughout the 12 sessions, building in complexity and never regressing.

#### Scenario: Level 0 Challenges (Sessions 1-2)
- **WHEN** students complete Sessions 1-2 (Activar phase)
- **THEN** challenges focus on drawing, diagramming, and documentation

#### Scenario: Level 1 Challenges (Sessions 3-5)
- **WHEN** students complete Sessions 3-5
- **THEN** challenges require measurement, classification, and observation of physical properties

#### Scenario: Level 2 Challenges (Sessions 6-8)
- **WHEN** students complete Sessions 6-8
- **THEN** challenges require modification of existing designs (e.g., change buzzer tones and debounce timing, find each track's minimum PWM, characterise sensor error at known distances)

#### Scenario: Level 3 Challenges (Sessions 9-11)
- **WHEN** students complete Sessions 9-11
- **THEN** challenges require reasoning about algorithms and calibrating with data

#### Scenario: Level 4 Challenge (Session 12)
- **WHEN** students reach Session 12
- **THEN** challenge is engineering-level integration: autonomous robot in 2×2m arena with 3 obstacles, 3-minute operation without external control and no single entrapment beyond ten seconds

### Requirement: Role Rotation System
The program SHALL include 4 roles that rotate among team members: Safety/Energy Responsible, Mechanical Responsible, Electronics Responsible, Code/Documentation Responsible.

#### Scenario: Role Assignment Per Session
- **WHEN** a team begins a session
- **THEN** each student is assigned one of the 4 roles, and role assignments rotate across the program so every student passes through each responsibility

#### Scenario: Role Responsibilities Documentation
- **WHEN** a role is assigned to a student
- **THEN** clear documentation specifies what tasks that role performs

#### Scenario: Roles expressed as project administration
- **WHEN** the role system is presented
- **THEN** it is framed as the distribution of functions in project administration, which is what EP 1.3 of tercero básico asks for, rather than as differentiated expectations by grade

#### Scenario: No differentiation tables by grade
- **WHEN** role expectations are documented
- **THEN** a single expected level for tercero básico is stated, with no table comparing what 1.º, 2.º and 3.º básico would each be expected to do, and institutions working with the earlier years are directed to CiudadBots
