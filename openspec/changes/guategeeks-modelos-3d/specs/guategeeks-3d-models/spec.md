## ADDED Requirements

### Requirement: Adoption of the Seven SMARS Models
The program SHALL distribute the seven SMARS STL models from its own site, adopted from the upstream package with attribution.

#### Scenario: Model set
- **WHEN** the models directory is inspected
- **THEN** it contains exactly `chassis_sl`, `powered_wheel`, `unpowered_wheel_sl`, `mechanical_track`, `holding_board_9v`, `ultrasonic_1` and `ultrasonic_2b_v2` as `.stl` files

#### Scenario: Byte-identical to upstream
- **WHEN** an adopted model is compared against its counterpart in `smars_aula_autonomo_v2_fuentes_publicas/assets/3d/public_sources/models/`
- **THEN** the files are byte-identical, because the models are adopted rather than regenerated or edited

#### Scenario: Provenance recorded
- **WHEN** the models are published
- **THEN** a manifest records, for each file, its upstream path, the adoption date, the author and the declared licence

### Requirement: Single Servable Copy Without Derivatives
Each model SHALL exist as exactly one servable file that feeds both the viewer and the download.

#### Scenario: One file, two uses
- **WHEN** a student views a model in the browser and then downloads it
- **THEN** both operations read the same file, so what was seen is what was downloaded

#### Scenario: No converted or simplified variants
- **WHEN** the published assets are inspected
- **THEN** no GLB, decimated mesh, or thumbnail generated from the models exists, because such a file would be a derivative work inheriting the CC BY-NC-SA ShareAlike condition

#### Scenario: The download is the printable original
- **WHEN** a student downloads a model
- **THEN** they receive the original binary STL, which is the format a slicer consumes and the exact version the program was tested with

### Requirement: Browser 3D Viewer
The program SHALL render each published model in the browser without requiring the student to install anything.

#### Scenario: Rendering library is loaded at runtime from a pinned version
- **WHEN** the viewer initialises
- **THEN** it imports `three` and `STLLoader` from a CDN at an explicitly pinned version, never a floating tag such as `latest`

#### Scenario: Bare specifier resolution
- **WHEN** `STLLoader` is imported
- **THEN** the CDN used resolves its bare `three` import, because a browser cannot resolve it without an import map

#### Scenario: No new package dependency
- **WHEN** `package.json` is inspected after this change
- **THEN** no dependency was added for the viewer

#### Scenario: No server-side rendering
- **WHEN** the site is built
- **THEN** the viewer's WebGL and browser APIs never execute during SSR, and the build completes without browser-API errors

### Requirement: Always-Visible Viewer With Deferred Loading
The viewer SHALL be visible without any user interaction, while deferring its network cost until the block is actually reached.

#### Scenario: No click required
- **WHEN** a page containing a viewer is opened
- **THEN** the viewer is present and initialises on its own, with no button to press first

#### Scenario: Loading begins on entering the viewport
- **WHEN** a viewer block is still below the fold
- **THEN** neither the rendering library nor the model has been requested, and the request starts when the block enters the viewport

#### Scenario: Several viewers on one page
- **WHEN** a page carries multiple viewers, as the materials catalogue does
- **THEN** they do not all request their models at once on page open

### Requirement: Graceful Degradation
A failure of the viewer SHALL NOT make the page useless.

#### Scenario: WebGL unavailable
- **WHEN** the browser cannot provide WebGL
- **THEN** the block shows the model's name, its file size and a working download link

#### Scenario: CDN unreachable
- **WHEN** the rendering library cannot be fetched
- **THEN** the block degrades the same way, and the rest of the page's content continues to work

#### Scenario: Download never depends on the viewer
- **WHEN** the viewer fails for any reason
- **THEN** the download link still resolves, because it points at the static file rather than at anything the viewer produces

### Requirement: Placement Driven by Pedagogical Role
A viewer SHALL appear where the model is the object of the activity, not wherever the component is mentioned.

#### Scenario: Catalogue page
- **WHEN** the materials page is viewed
- **THEN** all seven models are presented with viewer and download, as the canonical catalogue

#### Scenario: Session placement
- **WHEN** session pages are reviewed
- **THEN** session 1 shows the chassis, session 3 shows the chassis and the powered wheel, session 4 shows the track link and the board holder, and session 5 shows the track link and the unpowered wheel

#### Scenario: Session 8 is deliberately excluded
- **WHEN** the ultrasonic session is reviewed
- **THEN** it carries no viewer, because that session works time-of-flight measurement and dispersion rather than the sensor housing, and the two sensor models remain available from the catalogue

#### Scenario: Pedagogical blocks untouched
- **WHEN** a session page gains a viewer
- **THEN** its `Question`, `Context`, `Concepts`, `Phase`, `Materials`, `Reto` and `Evidence` blocks are unchanged

### Requirement: Attribution Accompanies Distribution
Every place a model can be obtained SHALL carry its attribution and licence.

#### Scenario: Attribution next to the download
- **WHEN** a model is offered for download
- **THEN** the author, the canonical source and the CC BY-NC-SA licence are stated, or directly linked from the block

#### Scenario: Required attribution text
- **WHEN** the licensing page presents the models
- **THEN** it reproduces the attribution wording the source requires, naming Kevin Thomas and the canonical Thingiverse source

### Requirement: Licensing Statements Match What Is Distributed
The program's documentation SHALL NOT claim a distribution posture the site does not follow.

#### Scenario: Superseded claims are corrected
- **WHEN** the licensing documentation is reviewed after this change
- **THEN** the statements that the models «no se redistribuyen aquí» and that readers should «enlácelos» instead of including them are corrected, because the site now distributes them

#### Scenario: Non-commercial becomes a stated constraint of the package
- **WHEN** the licensing page is read
- **THEN** it states that, with the models included, the whole package carries the non-commercial condition, and that offering the program commercially would require removing them

#### Scenario: Catalogue conflict is retained
- **WHEN** the licence of the models is described
- **THEN** the note that a mirror catalogue declares different metadata is kept, and no commercial permission is asserted

### Requirement: Transfer Cost Is Known, Not Assumed
The program SHALL verify rather than assume how much a reader actually downloads.

#### Scenario: Compression is confirmed after deployment
- **WHEN** the site is deployed
- **THEN** the response headers for a `.stl` request are checked to confirm whether the host compresses them, since the difference is 2.0 MB versus 5.7 MB across the set

#### Scenario: Per-page cost is documented
- **WHEN** viewers are placed on a page
- **THEN** the resulting transfer cost of that page's models is recorded, so a decision to move a heavy model elsewhere can be made with data
