## ADDED Requirements

### Requirement: Twelve-session program targeted at Segundo Básico

The system SHALL provide an educational program named "Tiempo Circular" consisting of exactly twelve sessions, served under the `/tiempo-circular/*` route namespace, explicitly declared as designed for **segundo básico** of the Guatemalan Ciclo Básico.

#### Scenario: Program index declares its grade

- **WHEN** a teacher loads `/tiempo-circular/`
- **THEN** the page states that the program is designed for segundo básico and explains why that grade was chosen, and directs teachers working with 1.º or 3.º básico to CiudadBots or GuateGeeks SMARS respectively

#### Scenario: Twelve session pages exist

- **WHEN** the `tiempo-circular` sidebar is rendered
- **THEN** exactly twelve numbered session pages are listed in order, each with a `sidebar_position` matching its session number

#### Scenario: Existing programs are unaffected

- **WHEN** the site is built after this program is added
- **THEN** every existing `/ciudadbots/*` and `/guategeeks/*` URL resolves exactly as before, with no page content changed

### Requirement: Sessions reuse the GuateGeeks SMARS pedagogical frame verbatim

Each session page SHALL be authored as a single `SessionModule` instance using the same structure already used by GuateGeeks SMARS, with no new content model introduced.

#### Scenario: Session page uses the established component contract

- **WHEN** a session page is authored
- **THEN** it renders one `<SessionModule id="sN">` containing `Question`, `Context`, `Concepts`, exactly four `Phase` children, `Materials`, `Reto`, `Evidence`, `Cnb`, `Standards`, and `Evaluation`, plus `Code` on sessions that carry a sketch

#### Scenario: Four phases appear in the fixed order

- **WHEN** a session's phases are rendered
- **THEN** their `kind` values are `act`, `exp`, `cre`, `ref` in that order, labelled Activar 15 min, Explorar 25 min, Crear 60-90 min, and Reflexionar 15 min, and the `SessionModule` phase-order validation emits no warning

#### Scenario: No new content model is introduced

- **WHEN** the program's session pages are implemented
- **THEN** `src/components/SessionModule` is reused without modification to its public contract, and no parallel session component is created for this program

### Requirement: Session sequence builds a circular display clock

The twelve sessions SHALL follow a sequence that moves from display fundamentals through circular geometry and trigonometry to a working clock and a Cholq'ij calendar face, with each session declaring a central question, its key concepts, its reto, and its expected evidence.

#### Scenario: Sequence covers the declared arc

- **WHEN** the teacher guide's session table is read
- **THEN** it lists, in order: (1) systems of a display, (2) energy and safe 3.3 V connections, (3) first pixel and wiring verification, (4) colour as a positional number, (5) the screen as a coordinate plane, (6) notable angles on the circumference, (7) sine and cosine placing a hand, (8) the clock that drifts, (9) measuring the drift, (10) time from the network, (11) the Cholq'ij face, and (12) the integrating challenge

#### Scenario: Every session declares evidence

- **WHEN** any session page is loaded
- **THEN** it states at least one concrete deliverable a team must produce in that session

### Requirement: Challenge levels rise monotonically from 0 to 4

The program SHALL assign each session a challenge level between 0 and 4 using the same ladder as GuateGeeks SMARS, and the assigned level SHALL never decrease as session numbers increase.

#### Scenario: Challenge ladder is documented

- **WHEN** a teacher reads the teacher guide
- **THEN** a table maps each challenge level to what it demands and to the sessions that carry it

#### Scenario: Levels never regress

- **WHEN** session challenge levels are read in session order
- **THEN** each session's level is greater than or equal to the previous session's level

### Requirement: Four rotating team roles

The program SHALL define four team responsibilities that rotate between sessions, adapted to a display-and-code project rather than a mechanical one.

#### Scenario: Roles are defined and rotate

- **WHEN** a teacher loads the roles page
- **THEN** four distinct roles are described with their responsibilities, and the page states the rotation cadence and that every student passes through every role

### Requirement: Calendar routes for different school formats

The program SHALL publish at least three delivery routes so it can be run under different schedules.

#### Scenario: Routes are published

- **WHEN** a teacher loads the program index
- **THEN** a table presents an intensive route, a school route, and a maker-club route, each with its session length and calendar span
