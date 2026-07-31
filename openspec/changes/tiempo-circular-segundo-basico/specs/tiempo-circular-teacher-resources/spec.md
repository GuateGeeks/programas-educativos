## ADDED Requirements

### Requirement: Teacher guide with the full sequence

The program SHALL publish a teacher guide that presents the twelve sessions in one view, with the sketch, challenge level and deliverable for each.

#### Scenario: Sequence table is complete

- **WHEN** a teacher loads `/tiempo-circular/guia-docente`
- **THEN** a table lists all twelve sessions with their phase block, linked title, sketch identifier, challenge level and expected deliverable

#### Scenario: Materials are grouped by block

- **WHEN** the teacher guide is read
- **THEN** it states what to prepare for each block of sessions, and links to the materials page for full specifications

#### Scenario: Session-length adaptation is stated

- **WHEN** a teacher runs the school route with shorter periods
- **THEN** the guide explains how to split the Crear phase across two blocks

### Requirement: Materials and pin reference page

The program SHALL publish a materials page listing the per-team bill of materials and the canonical pin map.

#### Scenario: Bill of materials is per team

- **WHEN** a teacher loads the materials page
- **THEN** each item is listed with the quantity needed per team and a note on whether it is required or optional

#### Scenario: Hardware is declared as not yet sourced

- **WHEN** the materials page is read
- **THEN** it states that the hardware configuration is specified but has not been purchased or validated in the field, so costs and availability are estimates

### Requirement: Electrical safety checklist for a 3.3 V board

The program SHALL publish a safety page appropriate to an ESP32 and a 3.3 V display module, and require it before any board is powered.

#### Scenario: Checklist exists and is signable

- **WHEN** a teacher loads the safety page
- **THEN** it presents a checklist covering at minimum correct VCC/GND orientation, 3.3 V versus 5 V on the display's power pin, verifying connections before applying power, disconnecting USB before rewiring, and handling boards by the edges

#### Scenario: Safety precedes energising

- **WHEN** the program index or teacher guide is read
- **THEN** it instructs teachers to complete the safety checklist before the first session that powers a board

### Requirement: 100-point rubric

The program SHALL publish an assessment rubric totalling 100 points across named criteria appropriate to a display-and-code project.

#### Scenario: Rubric sums to 100

- **WHEN** the rubric page is rendered
- **THEN** its criteria weights sum to exactly 100 points

#### Scenario: Criteria match this program's work

- **WHEN** the rubric is read
- **THEN** its criteria cover at minimum safety and correct wiring, geometric and trigonometric reasoning, code quality and parameter work, measurement and data handling, the final face design, and technical communication

### Requirement: Socratic questions for debugging

The program SHALL publish debugging questions that lead a student to locate a fault without being told the answer.

#### Scenario: Questions map to observable symptoms

- **WHEN** a teacher loads the socratic questions page
- **THEN** questions are organised by observable symptom, including a blank screen, wrong colours, a hand pointing the wrong way, and a clock that runs fast or slow

### Requirement: Misconceptions page covering this program's specific traps

The program SHALL document the misconceptions this content reliably produces.

#### Scenario: Program-specific misconceptions are addressed

- **WHEN** the misconceptions page is read
- **THEN** it addresses at minimum: that screen Y grows downward while mathematical Y grows upward; that 0° on the display is not 12 o'clock; that RGB565 green has six bits rather than five; that a hexadecimal colour is not a decimal number; and that `millis()` drift is a property of the oscillator, not a bug in the code

### Requirement: Recording templates and licences pages

The program SHALL publish reusable recording templates and a licences page.

#### Scenario: Templates support the evidence the sessions demand

- **WHEN** the templates page is loaded
- **THEN** it provides at minimum a drift-measurement table, an angle-and-coordinate worksheet, and a face-design planning sheet

#### Scenario: Licences and attribution are complete

- **WHEN** the licences page is loaded
- **THEN** it states the MIT licence of the program's own sketches, the CC BY-SA 4.0 licence and Mineduc/DIGECUR attribution of the CNB mallas, the licence of the `DIYables_TFT_Round` library as cited rather than vendored, and that esp32io.com material is referenced by link and not redistributed

### Requirement: Resource pages match the GuateGeeks SMARS page roster

The program SHALL publish the same set of supporting pages already established by GuateGeeks SMARS, so teachers moving between programs find the same structure.

#### Scenario: Page roster is present

- **WHEN** the `tiempo-circular` sidebar is rendered
- **THEN** it contains an index page plus teacher-guide, CNB alignment, materials, safety, roles, rubric, templates, misconceptions, socratic-questions and licences pages
