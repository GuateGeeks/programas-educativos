## ADDED Requirements

### Requirement: Canonical production domain

The site SHALL use `https://guategeeks.com` as its production origin (`url`) while retaining `baseUrl: '/programas-educativos/'`, so it is served at `https://guategeeks.com/programas-educativos/` via the org's user-pages custom-domain propagation. The repository SHALL NOT declare its own `static/CNAME`, because the custom domain is owned by the org user-pages repository and propagated to project repositories.

#### Scenario: Absolute URLs use the custom domain

- **WHEN** the site is built
- **THEN** generated absolute URLs — canonical link, sitemap entries, and `og:image`/`twitter:image` — use the `https://guategeeks.com` origin under the `/programas-educativos/` path

#### Scenario: No per-repo CNAME is emitted

- **WHEN** the build output is inspected
- **THEN** no `CNAME` file is present in `build/` (the domain is owned and propagated by the org user-pages site, not claimed by this repository)

#### Scenario: Project path is preserved

- **WHEN** the deployed site is loaded
- **THEN** it resolves at `https://guategeeks.com/programas-educativos/`, not at the apex root, leaving the org root and other project sites (e.g. `equipos-educativos`) unaffected
