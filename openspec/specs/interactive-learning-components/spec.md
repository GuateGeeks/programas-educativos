## Purpose

Defines the reusable, program-agnostic React components that power interactive learning experiences in the hub: the CityBots 3D hero, the paginated build-guide viewer with lightbox, and the teacher progress tracker — all built to be data-driven so future programs can reuse them.

## Requirements

### Requirement: CityBots 3D hero component

The system SHALL provide a React component that renders the CiudadBots three.js 3D hero scene, loading the three.js dependency in a browser-only (client-side) manner so server-side rendering does not fail.

#### Scenario: Hero renders on the client
- **WHEN** a visitor loads the CiudadBots landing/overview in a browser
- **THEN** the 3D hero scene renders without a server-side-rendering error

#### Scenario: Build does not break on the 3D component
- **WHEN** the site is built for production
- **THEN** the build completes even though the 3D component depends on browser-only APIs

### Requirement: Build-guide viewer component

The system SHALL provide a reusable paginated build-guide viewer component that displays construction images one page at a time with previous/next navigation, a page counter, and an enlarged lightbox view, driven by a module's guide reference.

#### Scenario: Page navigation works
- **WHEN** a user clicks next or previous in the build-guide viewer
- **THEN** the viewer advances to the corresponding page image and updates the page counter, clamping at the first and last pages

#### Scenario: Lightbox enlarges the current page
- **WHEN** a user opens the enlarged view
- **THEN** the current construction page is shown in a lightbox overlay that can be closed

### Requirement: Teacher progress tracker component

The system SHALL provide a teacher progress tracker component that lets a teacher mark suggested sessions per module as complete, persists state in the browser's localStorage, and displays aggregate progress (sessions marked, modules complete, overall percent).

#### Scenario: Progress persists across reloads
- **WHEN** a teacher marks a session complete and later reloads the page in the same browser
- **THEN** the previously marked sessions remain marked and the aggregate progress reflects them

#### Scenario: Reset clears tracked progress
- **WHEN** a teacher triggers the tracker reset
- **THEN** all marked sessions are cleared and the aggregate progress returns to zero

### Requirement: Components are reusable across programs

The interactive components SHALL be authored as program-agnostic, data-driven React components so future programs in the hub can reuse them.

#### Scenario: Viewer driven by data, not hardcoded content
- **WHEN** the build-guide viewer is given a different guide reference (path and page count)
- **THEN** it renders that guide without component code changes
