## ADDED Requirements

### Requirement: Docusaurus hub scaffold

The system SHALL provide a Docusaurus 3 site rooted at the repository, with its own `package.json`, lockfile, `docusaurus.config.js`, and `sidebars` configuration, that builds and serves locally without errors.

#### Scenario: Local development server starts

- **WHEN** a developer runs the site's dev command (e.g. `npm run start`) from the repository root
- **THEN** the Docusaurus server starts and serves the homepage without build errors

#### Scenario: Production build succeeds

- **WHEN** a developer runs the production build command (e.g. `npm run build`)
- **THEN** Docusaurus produces a static `build/` output with zero broken internal links reported

### Requirement: Program-namespaced structure

The hub SHALL organize program content under a per-program namespace so that additional programs can be added later without restructuring existing routes. CiudadBots content SHALL live under a `/ciudadbots/*` route namespace.

#### Scenario: CiudadBots content is namespaced

- **WHEN** a visitor navigates to a CiudadBots module
- **THEN** its URL is under the `/ciudadbots/` path prefix

#### Scenario: Adding a second program does not move CiudadBots routes

- **WHEN** a new program is added to the hub
- **THEN** existing `/ciudadbots/*` routes remain unchanged and the new program occupies its own namespace

### Requirement: Bilingual i18n configuration

The site SHALL be configured for internationalization with Spanish as the default locale and English as an additional locale, so all content is authored in Spanish and English translations can be added incrementally.

#### Scenario: Spanish is served by default

- **WHEN** a visitor loads the site root without a locale prefix
- **THEN** the Spanish (`es`) version of the content is served

#### Scenario: English locale is available

- **WHEN** a visitor switches to the English locale
- **THEN** the site serves the `en` locale route, falling back to source content where a translation is not yet provided

### Requirement: Static asset hosting

The site SHALL host the program's downloadable and media assets (LEGO SPIKE `.llsp` programs, build-guide images, the construction PDF, and branding logo) from the Docusaurus `static/` directory so they resolve at stable URLs.

#### Scenario: A program file is downloadable

- **WHEN** a teacher clicks the download link for a module's `.llsp` program
- **THEN** the file is served from a stable static URL and downloads successfully

#### Scenario: Build-guide images resolve

- **WHEN** the build-guide viewer requests a page image
- **THEN** the corresponding image is served from the static assets directory

### Requirement: Hub branding and landing

The site SHALL present GuateGeeks branding (logo, theme) and a landing page that introduces the hub and links to the available program(s).

#### Scenario: Landing page links to CiudadBots

- **WHEN** a visitor loads the hub landing page
- **THEN** the page displays GuateGeeks branding and provides a navigable link into the CiudadBots program
