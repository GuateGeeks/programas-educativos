## MODIFIED Requirements

### Requirement: Resource Download Package
The program SHALL make its downloadable artefacts available directly from the site, without depending on third-party catalogues or on packaging teacher prose into files.

#### Scenario: Teacher prose is browsable, not downloadable
- **WHEN** a docent looks for the guide, rubric, checklists, socratic questions or templates
- **THEN** they are pages with search and navigation rather than PDFs or archives, and they print from the browser when a paper copy is needed

#### Scenario: The genuinely downloadable artefacts
- **WHEN** a docent or student needs a file rather than a page
- **THEN** the site offers the five Arduino sketches and the seven STL models, which are the artefacts that only make sense as files because a tool consumes them

#### Scenario: Models no longer depend on external catalogues
- **WHEN** the materials page presents the printable parts
- **THEN** each model is downloadable from this site, so sessions 3 and 4 do not depend on Thingiverse or SMARSFan remaining reachable or unchanged

#### Scenario: Canonical sources still cited
- **WHEN** a model is offered for download
- **THEN** its canonical upstream source is still linked, for attribution and so a docent can check for newer versions

### Requirement: Teacher Guide with 12-Session Sequencing
The program SHALL provide a comprehensive teacher guide documenting the complete 12-session sequence with session goals, phase descriptions, timing, materials, and outcomes.

#### Scenario: Guide Structure
- **WHEN** a docent opens the teacher guide
- **THEN** it contains a table of contents with 12 sessions, each entry showing: session number, title, central question, phase breakdown (Activar/Explorar/Crear/Reflexionar times), and key deliverables

#### Scenario: Session Detail Level
- **WHEN** a docent reviews a specific session
- **THEN** it includes: learning objectives aligned to CNB, materials/equipment list, setup instructions, minute-by-minute activity flow, facilitation tips, common student misconceptions, and how to address them

#### Scenario: Printable parts are identified per session
- **WHEN** a session requires printed parts
- **THEN** the guide names which models that session works with, so preparation can start before the class

## ADDED Requirements

### Requirement: Materials Page Hosts the Model Catalogue
The materials page SHALL act as the canonical catalogue of printable parts, not merely as a list of links.

#### Scenario: Catalogue contents
- **WHEN** a docent opens the materials page
- **THEN** each of the seven models is presented with its name, its function in the robot, how many units the build needs, a viewer and a download

#### Scenario: Quantities match the build
- **WHEN** the catalogue states how many of each part are needed
- **THEN** the quantities match the upstream bill of materials, including the 32 track links and the 2 units each of the powered and unpowered wheels

#### Scenario: Print preparation guidance stays with the catalogue
- **WHEN** a docent prepares a print run
- **THEN** the recommended slicer parameters and the canonical pin table remain on this page, so preparation is one place rather than several
