## ADDED Requirements

### Requirement: Teacher Guide with 12-Session Sequencing
The program SHALL provide a comprehensive teacher guide documenting the complete 12-session sequence with session goals, phase descriptions, timing, materials, and outcomes.

#### Scenario: Guide Structure
- **WHEN** a docent opens the teacher guide
- **THEN** it contains a table of contents with 12 sessions, each entry showing: session number, title, central question, phase breakdown (Activar/Explorar/Crear/Reflexionar times), and key deliverables

#### Scenario: Session Detail Level
- **WHEN** a docent reviews a specific session
- **THEN** it includes: learning objectives aligned to CNB, materials/equipment list, setup instructions, minute-by-minute activity flow, facilitation tips, common student misconceptions, and how to address them

### Requirement: Rubric for 100-Point Evaluation
The program SHALL provide a standardized 100-point rubric with 7 criteria for assessing student performance across the 12-session program.

#### Scenario: Rubric Criteria Distribution
- **WHEN** the rubric is applied
- **THEN** points are allocated as: Safety and Work Order (15 pts), Mechanical Quality (15 pts), Electrical Cabling and Documentation (20 pts), Programming and Comprehension (20 pts), Testing and Use of Evidence (15 pts), Autonomous Challenge (10 pts), Project Communication (5 pts)

#### Scenario: Criterion-Level Descriptors
- **WHEN** a docent evaluates a student on any criterion
- **THEN** the rubric provides clear descriptors for each point level (e.g., 15/15 = "Consistent safety practices, organized workspace"; 10/15 = "Generally safe, occasional lapses"; 5/15 = "Safety concerns present") to reduce subjectivity

#### Scenario: Rubric Editability
- **WHEN** a docent wants to adapt the rubric
- **THEN** the rubric is provided in an editable format (Google Sheets, Excel, downloadable markdown) allowing customization while maintaining structure

### Requirement: Socratic Questions for Debugging and Reflection
The program SHALL provide a list of socratic questions that guide students toward independent problem-solving and deeper understanding.

#### Scenario: Question Variety
- **WHEN** a docent facilitates a session
- **THEN** provided socratic questions address multiple contexts: "What evidence shows this is a mechanical problem vs. an electrical one?", "What happens if you increase the PWM value and why?", "How would you prove this solution is repeatable?", "What surprised you about the sensor's behavior?"

#### Scenario: Question Timing Guidance
- **WHEN** a docent reviews the questions
- **THEN** they are organized by session and phase, indicating when (during Reflexionar phase) to pose each question for maximum impact

### Requirement: Safety Checklist
The program SHALL provide a comprehensive safety checklist for both docent and students, covering electrical safety, tool safety, and lab procedures.

#### Scenario: Pre-Session Verification
- **WHEN** a docent prepares for Session 1
- **THEN** the safety checklist includes: battery voltage verification, motor driver heat sink check, correct wire gauges, no shorts visible, work area cleared of hazards, first aid kit available, and documentation of checks

#### Scenario: Student Safety Orientation
- **WHEN** students begin the program
- **THEN** a student-friendly safety checklist is provided in Session 1 and reviewed: proper handling of powered components, recognizing shorts, when to ask for help, emergency stop procedures

#### Scenario: Session-Specific Hazard Documentation
- **WHEN** preparing for sessions involving specific components
- **THEN** hazard-specific guidance is provided, drawn from the canonical wiring documentation: never power the motors from the Arduino 5V pin; observe polarity on the 470 µF capacitor between VM and GND; verify common ground before energising; lift the robot off the bench before running the motor test so it cannot drive off the edge; disconnect the battery before changing any wiring

### Requirement: Competency Progression by Session
The program SHALL document which CNB competencies (Ciencias Naturales, TAC, Emprendimiento, Comunicación, Matemática) and international standards (CSTA, ISTE, NGSS) are addressed in each session.

#### Scenario: Competency Mapping Table
- **WHEN** a docent views the competency matrix
- **THEN** a table shows Sessions (rows) × Competencies (columns) with clear indicators of which competencies are addressed in each session and at what depth (e.g., "introduced", "reinforced", "applied")

#### Scenario: Curriculum Alignment Evidence
- **WHEN** documenting student progress for Mineduc reporting
- **THEN** each session lists specific CNB indicators of achievement covered, enabling direct alignment with official curriculum requirements

### Requirement: Rúbrica-to-Evidence Mapping
The program SHALL explain how to collect and document evidence for each rubric criterion during the 12 sessions.

#### Scenario: Evidence Examples per Criterion
- **WHEN** a docent reviews the 20-point "Programación y Comprensión" criterion
- **THEN** guidance specifies evidence types: "commented code snapshot, student explanation video (1-2 min), debugging log showing problem-solving process, test results with annotations"

#### Scenario: Digital Evidence Collection Format
- **WHEN** students submit evidence
- **THEN** a template specifies format (photo of work, pdf of code, spreadsheet of measurements) and storage location (shared folder, LMS) to streamline docent review

### Requirement: Common Misconceptions and Corrections
The program SHALL document likely student misconceptions and pedagogical strategies to address them.

#### Scenario: Misconception Documentation
- **WHEN** facilitating a session
- **THEN** the guide identifies misconceptions students commonly hold (e.g., "PWM directly sets motor speed, not voltage"; "The sensor always gives exact distances"; "Code has only one correct solution") and provides evidence-based correction strategies

#### Scenario: Correction Timing
- **WHEN** a misconception emerges
- **THEN** guidance recommends whether to address it immediately (critical) or during Reflexionar phase (for deeper learning)

### Requirement: Resource Download Package
The program SHALL provide downloadable, editable versions of all teacher resources in standard formats.

#### Scenario: Format Availability
- **WHEN** a docent wants to download materials
- **THEN** resources are available as: PDFs (for printing), editable Google Docs/Sheets (for customization), Markdown files (for version control), and Excel workbooks (for rubric tracking)

#### Scenario: File Organization
- **WHEN** materials are downloaded
- **THEN** they are organized in a zip archive with folder structure: `/guides`, `/rubrics`, `/checklists`, `/templates`, `/socratic-questions`

### Requirement: Facilitation Tips and Strategies
The program SHALL provide guidance on classroom management, groupwork facilitation, and differentiation strategies for diverse learners.

#### Scenario: Role Rotation Facilitation
- **WHEN** a docent prepares to rotate roles
- **THEN** guidance explains how to ensure each student gains experience, what to do if a student struggles with their assigned role, and how to transition roles without losing momentum

#### Scenario: Differentiation Strategies
- **WHEN** students have varying levels of prior experience
- **THEN** the guide suggests: "extension challenges" for advanced students (optimize code, reduce mass, add new sensor), "scaffolding" for struggling students (provide partial code, step-by-step debugging checklist), and "peer teaching" opportunities

### Requirement: Assessment Rubric Integration with Docusaurus
The program's rubric and assessment resources SHALL be accessible both as standalone downloadable documents and embedded in the web-based program documentation.

#### Scenario: Web-Based Rubric Display
- **WHEN** a docent views GuateGeeks in Docusaurus
- **THEN** the rubric is displayed as an interactive table (sortable, filterable by criterion) with descriptions and examples

#### Scenario: Export-Ready Rubric
- **WHEN** a docent needs to grade a student
- **THEN** a "Print/Export to PDF" button generates a clean, formatted rubric page suitable for printing or sharing
