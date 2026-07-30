## ADDED Requirements

### Requirement: Upstream Firmware Adoption
The program SHALL adopt the five reference Arduino sketches shipped in `smars_aula_autonomo_v2_fuentes_publicas/code/arduino/` rather than authoring replacement firmware. GuateGeeks authors the pedagogical wrapper (session content, retos, evidence templates); it does not author the drive, sensing, or state-machine logic.

#### Scenario: Sketch set matches upstream
- **WHEN** the GuateGeeks Arduino directory is inspected
- **THEN** it contains exactly the five upstream sketches in upstream order: `01_botones_y_buzzer`, `02_prueba_motores`, `03_prueba_ultrasonido`, `04_smars_autonomo`, `05_asistente_calibracion`

#### Scenario: No invented substitute firmware
- **WHEN** the GuateGeeks Arduino directory is inspected
- **THEN** no sketch exists that targets hardware absent from the canonical pin table, and no sketch reimplements drive, distance, or evasion logic already provided upstream

#### Scenario: Behaviour preserved under adaptation
- **WHEN** an upstream sketch is reformatted or re-commented for student readability
- **THEN** pin constants, calibration values, control logic, and observable behaviour are unchanged, and the change is limited to formatting, comments, and Spanish-language explanation

#### Scenario: Correcting an upstream sketch that does not compile
- **WHEN** an adopted sketch fails to compile for `arduino:avr:uno` in its upstream form
- **THEN** the minimal correction needed to compile MAY be applied, it MUST preserve observable behaviour, it MUST prefer a construct already used elsewhere in the same upstream sketch set, and the deviation MUST be recorded in the file's adoption note stating the compiler error, the change made, and why behaviour is unaffected

#### Scenario: Deviation is visible to the reader
- **WHEN** a sketch carries a correction beyond formatting
- **THEN** its adoption note distinguishes that correction from the formatting-only changes, so a reader comparing against upstream knows exactly what differs and why

### Requirement: Canonical Hardware Contract
All sketches and all documentation SHALL target the canonical SMARS v2 hardware and pin assignment, with no deviation.

#### Scenario: Driver identification
- **WHEN** any sketch or document references the motor driver
- **THEN** it identifies the canonical driver as an **L293D Motor Shield v1-compatible shield**, and does not present TB6612FNG as the default driver for this variant

#### Scenario: Canonical pin table
- **WHEN** pins are assigned in code or documented
- **THEN** they match exactly: shield M1 motor izquierdo, shield M2 motor derecho, A0 buzzer, A1 botón MODO (`INPUT_PULLUP`), A2 botón INICIO (`INPUT_PULLUP`), A3 TRIG, A4 ECHO, A5 sin conectar para entropía

#### Scenario: Two-motor tracked drive
- **WHEN** motion is commanded
- **THEN** both tracks are driven independently through M1 and M2, and turning is achieved by driving the tracks at differing or opposing signed speeds

#### Scenario: Shield motor dependency is documented
- **WHEN** any sketch that moves motors initialises
- **THEN** it uses the documented shield motor API, such as `AFMotor` for a Motor Shield v1-compatible board, instead of writing TB6612FNG control pins directly

#### Scenario: No LED indicator in the hardware contract
- **WHEN** operator feedback is required
- **THEN** the buzzer on A0 is used via `tone()`, and no sketch or document instructs the student to wire an indicator LED

### Requirement: Correct Ultrasonic Distance Conversion
Distance conversion SHALL use the upstream round-trip divisor and SHALL NOT apply an additional halving.

#### Scenario: Conversion formula
- **WHEN** an echo duration in microseconds is converted to centimetres
- **THEN** the result is `duracion / 58`, with no further division by two

#### Scenario: Timeout sentinel
- **WHEN** `pulseIn` returns 0 because no echo arrived within the timeout
- **THEN** the function returns the out-of-range sentinel 400 cm rather than 0 cm

#### Scenario: Reading stability
- **WHEN** the autonomous firmware samples distance for a movement decision
- **THEN** it takes three readings and keeps the median, as upstream does

### Requirement: Corner-Escape Evasion
Obstacle evasion SHALL retain the upstream randomised manoeuvre so the robot cannot deterministically re-enter the same trap.

#### Scenario: Randomised turn selection
- **WHEN** an obstacle is detected within the threshold
- **THEN** the robot brakes, signals with the buzzer, reverses, selects turn direction at random, and turns for a randomised duration before re-measuring

#### Scenario: No fixed turn direction
- **WHEN** evasion logic is reviewed
- **THEN** it does not always turn to the same side, because a fixed direction traps the robot in a corner and violates the final challenge's stuck-time limit

### Requirement: Local Operator Interface
The program SHALL preserve the phone-free, Bluetooth-free operator interface: two buttons and a buzzer.

#### Scenario: Mode and start control
- **WHEN** the autonomous firmware is running
- **THEN** the MODO button cycles operating mode and the INICIO button starts or pauses, with no external device required

#### Scenario: Audible confirmation
- **WHEN** a mode changes or an obstacle is detected
- **THEN** the buzzer emits a distinguishable tone, so the robot is operable without a screen

### Requirement: Licence and Attribution Notices
Every adopted or derived artefact SHALL carry the licence and attribution required by its upstream source.

#### Scenario: Code licence header retained
- **WHEN** an upstream sketch is copied into the GuateGeeks directory
- **THEN** its MIT licence header is retained verbatim, including under reformatting

#### Scenario: Project attribution
- **WHEN** the Arduino directory or the program page is published
- **THEN** it attributes SMARS to Kevin Thomas and the maker community, and states that GuateGeeks is not officially affiliated

#### Scenario: Per-source licence separation
- **WHEN** licences are documented
- **THEN** the three distinct terms are stated separately: sketch code MIT (commercial course use permitted with notice), SMARS documentation CC BY-SA 4.0, SMARS 3D models CC BY-NC-SA (non-commercial only)

#### Scenario: CNB attribution
- **WHEN** curriculum alignment material derived from CNB Guatemala is published
- **THEN** it attributes Mineduc/DIGECUR and states the CC BY-SA 4.0 terms and the non-commercial note carried by the official PDFs

#### Scenario: No placeholder source URLs
- **WHEN** a document links to an upstream source
- **THEN** the link resolves to a real address, and no truncated placeholder such as `https://github.com/...` remains

### Requirement: Single Source of Truth for Sketch Code
Sketch source SHALL exist in exactly one editable location. Both the code shown on the site and the downloadable file SHALL derive from it, so they cannot diverge.

#### Scenario: Canonical location
- **WHEN** a sketch is edited
- **THEN** the only hand-edited copy is under `arduino/guategeeks/<sketch>/`, which is also the folder a student opens in the Arduino IDE

#### Scenario: Code shown on the page is read from the file
- **WHEN** a session page displays sketch code
- **THEN** the code is imported from the canonical `.ino` at build time rather than pasted into the page, so editing the sketch updates the page automatically

#### Scenario: The download is the same string as the listing
- **WHEN** a student downloads a sketch from a session page
- **THEN** the downloaded bytes come from the same build-time import that produced the code listing, with no separate servable copy of the file

#### Scenario: No second copy exists
- **WHEN** the repository is inspected
- **THEN** each sketch exists exactly once, under `arduino/guategeeks/<sketch>/`, so there is no generated duplicate to keep in sync, verify, or exclude from version control

#### Scenario: Synchronisation does not depend on optional tooling
- **WHEN** the site is built in any environment
- **THEN** the listing and the download stay identical without relying on npm lifecycle hooks, which `ignore-scripts=true` disables, or on any step a contributor could forget to run

### Requirement: Per-Sketch Teaching Wrapper
Each adopted sketch SHALL be accompanied by GuateGeeks-authored teaching material, kept separate from the upstream code file.

#### Scenario: Wrapper contents
- **WHEN** a student opens a sketch directory
- **THEN** it contains the upstream `.ino` plus a README that states what the sketch does, which pins it uses, how to load and verify it, the adopted source path and date, and the level of the reto with a link to the session page

#### Scenario: Pedagogy is not duplicated
- **WHEN** a reto or an evidence list exists on a session page
- **THEN** the sketch README links to that page rather than restating it, so the pedagogical text has a single source and cannot drift

#### Scenario: Wrapper does not restate wrong hardware
- **WHEN** wrapper material describes wiring
- **THEN** it reproduces the canonical pin table and references the upstream wiring diagram, rather than an independently drawn circuit

#### Scenario: Reto level assignment
- **WHEN** a reto is authored for a sketch
- **THEN** its level matches the session it belongs to per the program's reto distribution, and its expected measurable outcome is stated

### Requirement: Toolchain Compatibility
All sketches SHALL compile for Arduino Uno with the Arduino core and any documented motor-shield dependency required by the canonical L293D shield.

#### Scenario: Documented dependency is installed
- **WHEN** any sketch is compiled
- **THEN** it compiles without missing-library errors after installing the documented shield library, such as AFMotor for a Motor Shield v1-compatible board

#### Scenario: Language level
- **WHEN** a sketch uses C++11 constructs such as range-for over an initializer list
- **THEN** it compiles under the default Arduino toolchain setting of `-std=gnu++11`

#### Scenario: No case-label scope violations
- **WHEN** a `switch` statement declares a variable with an initialiser inside a case
- **THEN** that case is enclosed in braces, because crossing a case label past an initialisation is a compile error in C++

### Requirement: Human-Gated Verification
Verification steps that require physical hardware, a browser, or another person SHALL be marked as human-gated and SHALL NOT be recorded as complete on the basis of authoring alone.

#### Scenario: Hardware test gating
- **WHEN** a task requires loading a sketch onto an Arduino Uno and observing motors, buzzer, or sensor behaviour
- **THEN** it is labelled as requiring a human operator, and remains open until a named person records the observed result

#### Scenario: Compile verification is evidenced
- **WHEN** a sketch is claimed to compile
- **THEN** the claim is backed by recorded compiler output from `arduino-cli compile` or the Arduino IDE, naming the core version used

#### Scenario: Review and outreach gating
- **WHEN** a task requires peer review, announcement, or collecting feedback from users
- **THEN** it is excluded from the implementation checklist and tracked separately as a post-handoff activity
