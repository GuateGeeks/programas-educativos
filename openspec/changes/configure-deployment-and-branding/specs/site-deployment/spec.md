## ADDED Requirements

### Requirement: GitHub project-pages hosting configuration

The site SHALL be configured for GitHub project-pages hosting: `url` set to the org pages origin (`https://guategeeks.github.io`), `baseUrl` set to the repository path (`/programas-educativos/`), and `organizationName`/`projectName` set to the real GitHub org/repository. The production build SHALL resolve all first-party assets and internal links correctly under the non-root `baseUrl`.

#### Scenario: Assets resolve under the project baseUrl

- **WHEN** the production site is served at `https://guategeeks.github.io/programas-educativos/`
- **THEN** the favicon, logo, CSS/JS bundles, and internal navigation links load without 404s (all prefixed by the configured `baseUrl`)

#### Scenario: No root-absolute paths escape the baseUrl

- **WHEN** the site is built and inspected
- **THEN** no first-party link or asset reference points at a root-absolute path (`/img/...`, `/ciudadbots/...`) that bypasses Docusaurus baseUrl resolution

### Requirement: Automated deploy on push to main

The repository SHALL include a GitHub Actions workflow that, on every push to `main`, installs dependencies, builds the bilingual (es/en) site, and publishes the `build/` output to the `gh-pages` branch using the `peaceiris/actions-gh-pages` action. The workflow SHALL use the repository's `GITHUB_TOKEN` with write permission.

#### Scenario: Push to main triggers a published build

- **WHEN** a commit is pushed to the `main` branch
- **THEN** the workflow builds the site and publishes the generated static files to the `gh-pages` branch

#### Scenario: Build failure blocks publish

- **WHEN** the `npm run build` step fails
- **THEN** the workflow stops and does not publish to `gh-pages`

### Requirement: Deterministic trailing-slash behavior

The site SHALL set `trailingSlash` explicitly so generated URLs and the on-disk file layout match GitHub Pages' serving behavior, avoiding redirect or 404 ambiguity for directory-style routes.

#### Scenario: Route URLs match served files

- **WHEN** a documentation route is opened on the deployed site
- **THEN** the URL form served matches the built file layout for the configured `trailingSlash`, with no unexpected 404 or redirect loop
