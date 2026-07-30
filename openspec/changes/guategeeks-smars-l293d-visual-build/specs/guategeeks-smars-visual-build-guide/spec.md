## ADDED Requirements

### Requirement: Visual Build Guide Sections
GuateGeeks SHALL enrich the existing SMARS session pages with visual construction sections that use local `img-smars/` assets while preserving the current MDX/session format.

#### Scenario: SessionModule format preserved
- **WHEN** an enriched session page is inspected
- **THEN** the existing `SessionModule` structure remains the primary pedagogical block and visual build content appears as supplemental Markdown/MDX sections after the module

#### Scenario: Images are local and accessible
- **WHEN** a visual construction image is added
- **THEN** it uses a local `img-smars/` asset, includes descriptive alt text, and is accompanied by nearby explanatory text or caption that identifies the construction state

#### Scenario: No phase layout breakage
- **WHEN** a session phase is rendered by `SessionModule.Phase`
- **THEN** it does not contain embedded image blocks, nested visual galleries, or long construction lists that would break the compact phase layout

### Requirement: SMARS Export Sequence Mapping
The visual guide SHALL use `smars_export/` as a construction sequence reference and rewrite the content for GuateGeeks.

#### Scenario: Mechanical steps are mapped into course sessions
- **WHEN** the export steps for printed parts, soldering motors, fitting motors, motor holders, wheels, and tracks are used
- **THEN** they are mapped into sessions 3, 4, and 5 with GuateGeeks-authored Spanish instructional text

#### Scenario: Electronics steps are rewritten for L293D shield
- **WHEN** export steps about adding a motor shield or connecting motor cables are used
- **THEN** the GuateGeeks version references the canonical L293D shield, M1/M2 motor ports, revised peripheral pins, and classroom power guidance

#### Scenario: Bluetooth and app control excluded
- **WHEN** export steps mention Bluetooth, phone remote control, or an Android app
- **THEN** the core GuateGeeks course does not adopt those controls and instead preserves local operation through buttons, buzzer, and autonomous behavior

#### Scenario: Final showcase reused without remote-control dependency
- **WHEN** the export's final enjoyment/showcase idea is adapted
- **THEN** it is framed as documentation, demonstration, and peer explanation of the autonomous robot rather than app-based driving

### Requirement: Image Placement Map
The course SHALL use the available SMARS images where they clarify construction and omit or caption images that could teach the wrong hardware practice.

#### Scenario: Overview image
- **WHEN** the GuateGeeks index page is enriched
- **THEN** it may use `img-smars/heroshot.jpg` as a finished-robot reference without replacing the page's current overview structure

#### Scenario: Fabrication images
- **WHEN** sessions 3 or 4 discuss printed parts, slicer settings, tolerances, or quality control
- **THEN** they may use `img-smars/3d printed parts.webp` and related printed-part images as visual references for accepted parts

#### Scenario: Assembly images
- **WHEN** session 5 discusses soldering motors, fitting motors, motor holders, wheels, or tracks
- **THEN** it uses relevant images such as `soldering-motors.webp`, `fit-motors.webp`, `fit-motor-holders.webp`, `attach-wheels*.webp`, and `tracks-*.webp` with captions that match the GuateGeeks assembly instructions

#### Scenario: Electronics images
- **WHEN** images such as `motordriver.webp`, `add-motor-shield-*.webp`, or `connect-cables.webp` are used
- **THEN** the surrounding text verifies that the visible hardware matches the canonical L293D shield workflow or explicitly labels any mismatch

### Requirement: Attribution and Licensing for Visual Sources
The visual guide SHALL document source attribution and licensing for SMARS export-derived content and images.

#### Scenario: License page updated
- **WHEN** `docs/guategeeks/licencias.mdx` is inspected after implementation
- **THEN** it identifies SMARS, Kevin Thomas/model sources, the local SMARS export source, image provenance, and GuateGeeks-authored adaptation terms separately

#### Scenario: No long copied prose
- **WHEN** construction guidance derived from the export appears in GuateGeeks docs
- **THEN** it is paraphrased or rewritten as original GuateGeeks instructional text rather than copied as long Instructables passages

#### Scenario: Asset provenance visible to maintainers
- **WHEN** a maintainer reviews the visual update
- **THEN** the implementation notes or license page identify which `img-smars/` files were used and what upstream/export context they came from

### Requirement: Visual Documentation Build Quality
The enriched docs SHALL build cleanly and remain readable across supported Docusaurus layouts.

#### Scenario: Docusaurus build succeeds
- **WHEN** the site build runs after visual guide updates
- **THEN** MDX compilation succeeds with no broken imports, broken local image paths, or unsupported JSX in session pages

#### Scenario: Images do not dominate compact docs
- **WHEN** a session page is viewed at desktop or mobile widths
- **THEN** images are constrained by normal documentation content width and do not overlap text, tables, admonitions, code blocks, or STL viewers
