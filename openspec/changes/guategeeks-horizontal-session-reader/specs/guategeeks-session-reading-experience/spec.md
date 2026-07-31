## ADDED Requirements

### Requirement: Horizontal Session Phase Reader
GuateGeeks SHALL present each session's implementation phases as a horizontal, page-like reader while preserving the authored `SessionModule.Phase` sequence and content.

#### Scenario: Phases render as pages
- **WHEN** a GuateGeeks session is viewed on the `Implementación` tab
- **THEN** the four authored phases are presented as ordered horizontal pages for Activar, Explorar, Crear, and Reflexionar

#### Scenario: Phase order remains validated
- **WHEN** a session's authored phase kinds do not match the expected session metadata sequence
- **THEN** the existing validation failure still prevents the session from rendering with an incorrect phase order

#### Scenario: Direct phase navigation works
- **WHEN** a user selects a phase control or uses previous/next controls
- **THEN** the reader moves to the selected phase, updates the current step indicator, and does not move beyond the first or last phase

#### Scenario: Every GuateGeeks session receives the reader
- **WHEN** any of the 12 GuateGeeks session pages renders through `SessionModule`
- **THEN** its implementation phases use the horizontal reader without requiring per-page phase markup changes

### Requirement: Accessible and Responsive Phase Reading
The horizontal phase reader SHALL remain accessible, keyboard operable, responsive, reduced-motion aware, and printable.

#### Scenario: Keyboard navigation works
- **WHEN** focus is within the phase reader and the user presses ArrowLeft or ArrowRight
- **THEN** the reader moves to the previous or next phase when available and keeps focus behavior understandable

#### Scenario: Current phase is announced
- **WHEN** a phase is active
- **THEN** the active phase control exposes current-state semantics through accessible markup such as `aria-current` or an equivalent pattern

#### Scenario: Mobile layout remains readable
- **WHEN** a GuateGeeks session is viewed at mobile widths
- **THEN** phase controls, counters, body text, and navigation buttons do not overlap or overflow their containers

#### Scenario: Reduced motion is respected
- **WHEN** the user has `prefers-reduced-motion: reduce` enabled
- **THEN** phase movement avoids smooth-scrolling or animated transitions that conflict with the user's preference

#### Scenario: Print includes all phases
- **WHEN** a GuateGeeks session page is printed
- **THEN** all implementation phases are visible in document order rather than only the currently active horizontal page

### Requirement: Visual Session Guide Presentation
GuateGeeks SHALL present supplemental session images as guided visual sequences where multiple construction or reference images belong to the same instructional section.

#### Scenario: Image sequences are grouped
- **WHEN** a session has multiple related SMARS images for construction or reference
- **THEN** those images are rendered in an ordered visual guide with one primary image, step caption, and navigation controls

#### Scenario: Captions stay tied to images
- **WHEN** a user navigates between visual guide steps
- **THEN** the displayed caption, title, and alt text correspond to the currently displayed image

#### Scenario: Single-image sections still improve presentation
- **WHEN** a visual section has only one relevant image
- **THEN** it renders with the same framed visual treatment without unnecessary disabled pagination controls

#### Scenario: Visual content remains supplemental
- **WHEN** a GuateGeeks session is authored or updated
- **THEN** images remain outside `SessionModule.Phase` bodies and appear in supplemental visual sections after the module or in the appropriate non-phase resource area

### Requirement: GuateGeeks Visual Conversion Scope
The first implementation SHALL convert the existing high-value GuateGeeks visual sections without rewriting curriculum text unrelated to image presentation.

#### Scenario: High-value sessions are converted
- **WHEN** the change is implemented
- **THEN** visual sections in sessions 1, 3, 4, 5, 7, 10, and 12 use the guided visual presentation where their existing images form references or construction sequences

#### Scenario: Text-first sessions are not forced into galleries
- **WHEN** a GuateGeeks session has no meaningful supplemental image sequence
- **THEN** the session still receives the horizontal phase reader but does not need a new visual guide block

#### Scenario: Existing STL viewers remain separate
- **WHEN** a session contains `StlViewer` components
- **THEN** those STL viewers remain available as model references and are not folded into the image-only visual guide

### Requirement: GuateGeeks Reading Experience Build Quality
The horizontal reader and visual guide SHALL build cleanly and avoid regressions in Docusaurus documentation layouts.

#### Scenario: Production build succeeds
- **WHEN** the production site build runs after implementation
- **THEN** Docusaurus compiles the GuateGeeks MDX and React components without broken imports, broken local asset paths, or SSR errors

#### Scenario: CiudadBots remains stable
- **WHEN** CiudadBots module pages render after the GuateGeeks reader change
- **THEN** their existing phase timeline and build-guide behavior remains unchanged unless explicitly covered by a separate requirement

#### Scenario: Local images remain accessible
- **WHEN** a guided visual step uses a local SMARS image
- **THEN** the image has meaningful alt text and resolves from the existing static assets during the site build
