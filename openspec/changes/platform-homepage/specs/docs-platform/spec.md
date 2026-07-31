## ADDED Requirements

### Requirement: Platform homepage levels
The hub landing page SHALL present GuateGeeks as a platform of educational programs organized by
the three learning levels Explorador, Constructor, and Creador.

#### Scenario: Landing page shows the platform levels
- **WHEN** a visitor loads the site root
- **THEN** the homepage displays the Explorador, Constructor, and Creador levels as primary
  navigation sections or cards

#### Scenario: Level copy explains learning progression
- **WHEN** a visitor scans the homepage levels
- **THEN** each level communicates its educational purpose and progression role without requiring
  the visitor to open a separate standalone HTML page

### Requirement: Program cards with availability state
The platform homepage SHALL show program cards inside the appropriate learning level, including
available programs and upcoming programs, with clear state, complexity, summary, and tags.

#### Scenario: Available program card links to its existing route
- **WHEN** a visitor selects an available program card
- **THEN** the card navigates to that program's existing Docusaurus route without changing the
  program namespace

#### Scenario: Upcoming program card does not create a broken route
- **WHEN** a visitor views a program marked as upcoming
- **THEN** the card clearly communicates that the program is not yet available and does not link to
  a missing local route

#### Scenario: Current programs remain discoverable
- **WHEN** the homepage renders the platform program cards
- **THEN** CiudadBots, GuateGeeks SMARS, and Tiempo Circular are all visible as available programs
  with links to `/ciudadbots`, `/guategeeks`, and `/tiempo-circular`

### Requirement: Platform imagery resolves through Docusaurus
The platform homepage SHALL use the owned images from the proposal folder as Docusaurus static
assets resolved under the configured site `baseUrl`.

#### Scenario: Level images load on deployed base URL
- **WHEN** the site is served under `/programas-educativos/`
- **THEN** the homepage's level images resolve with HTTP 200 from static asset URLs under that base
  path

#### Scenario: Program images load on deployed base URL
- **WHEN** the homepage renders program cards
- **THEN** each card image resolves with HTTP 200 from Docusaurus static assets and no card renders a
  broken image

### Requirement: Homepage localization follows Docusaurus i18n
The platform homepage SHALL render locale-aware UI copy through Docusaurus translation mechanisms
rather than the proposal folder's `localStorage` language switcher.

#### Scenario: Spanish homepage renders by default
- **WHEN** a visitor loads the default site root
- **THEN** platform headings, level labels, card state labels, actions, and supporting copy render in
  Spanish

#### Scenario: English homepage renders translated copy
- **WHEN** a visitor opens the English locale homepage
- **THEN** platform headings, level labels, card state labels, actions, and supporting copy render in
  English rather than untranslated Spanish

### Requirement: Platform homepage preserves existing program content
The homepage redesign SHALL NOT move, rewrite, or break existing program documentation routes,
sidebars, module pages, student mode, or curriculum content.

#### Scenario: Existing program namespaces still resolve
- **WHEN** a visitor navigates from the redesigned homepage to an available program
- **THEN** `/ciudadbots`, `/guategeeks`, `/tiempo-circular`, and `/estudiante` continue resolving as
  they did before this change

#### Scenario: Program docs remain outside homepage scope
- **WHEN** the homepage platform change is implemented
- **THEN** existing program documentation content and sidebars remain functionally unchanged unless
  explicitly touched for route labels or homepage navigation

### Requirement: Platform homepage is responsive and readable
The platform homepage SHALL remain visually readable and usable at desktop and mobile widths, with
no overlapping text, controls, images, or cards.

#### Scenario: Desktop layout presents a platform overview
- **WHEN** a visitor opens the homepage at a desktop width
- **THEN** the hero, level sections, and program cards form a clear platform overview with visible
  primary actions

#### Scenario: Mobile layout stacks without overflow
- **WHEN** a visitor opens the homepage at a mobile width
- **THEN** level sections, program cards, tags, actions, and images stack or wrap without horizontal
  overflow or text overlap
