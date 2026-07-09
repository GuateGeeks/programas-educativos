## Why

The `configure-deployment-and-branding` change set the production origin to `https://guategeeks.github.io` as an interim GitHub-pages value. The real canonical home is the org's custom domain: the `guategeeks.github.io` user-pages repo owns `guategeeks.com`, and GitHub propagates that domain to every project repo at `guategeeks.com/<repo>/` — which is exactly how the sibling `equipos-educativos` site lives at `https://guategeeks.com/equipos-educativos` with no CNAME of its own. This change adopts that canonical origin so the hub's absolute URLs (canonical tags, sitemap, Open Graph/Twitter image) point at `guategeeks.com` instead of `github.io`.

## What Changes

- Set `url: 'https://guategeeks.com'` in `docusaurus.config.ts` (was `https://guategeeks.github.io`).
- Keep `baseUrl: '/programas-educativos/'` unchanged — the site remains a project-pages site served at `https://guategeeks.com/programas-educativos/`, matching the equipos pattern.
- **No `static/CNAME`** is added: the org user-pages repo owns the custom domain and propagates it to project repos. Adding a CNAME here would seize the apex domain for this repo and break the org root + equipos.
- No change to the deploy workflow, `organizationName`/`projectName`, `trailingSlash`, or any assets.

## Capabilities

### New Capabilities

- `site-deployment`: Adds a **canonical production domain** requirement — the site SHALL use `https://guategeeks.com` as its origin while remaining under the `/programas-educativos/` project path via org-pages custom-domain propagation (no per-repo CNAME). This complements, and finalizes, the interim `github.io` origin from `configure-deployment-and-branding`.

### Modified Capabilities

_None promoted. `site-deployment` currently exists only in the unarchived `configure-deployment-and-branding` change; `openspec/specs/` is empty. This change is additive (origin only; `baseUrl` and all other hosting behavior are unchanged), so it is expressed as an ADDED requirement rather than a delta. See Impact for reconciliation._

## Impact

- **Config**: one field — `docusaurus.config.ts` `url`. Regenerated absolute URLs: `<link rel="canonical">`, `sitemap.xml`, `og:image`/`twitter:image` (→ `https://guategeeks.com/programas-educativos/img/social-card.png`).
- **No behavior change** to routing, `baseUrl`, the peaceiris workflow, or the `gh-pages` publish target. The favicon `<link>` is baseUrl-relative and is unaffected.
- **Prerequisite (external, unchanged by this repo)**: the `guategeeks.github.io` org-pages repo must have `guategeeks.com` configured as its GitHub Pages custom domain (it already does, per equipos). This repo relies on that propagation.
- **Reconciliation with `configure-deployment-and-branding`**: both are unarchived and both touch the `url` field / `site-deployment` capability. This change supersedes that one's interim `url`. They should be applied/archived together (or this one applied after), so the `site-deployment` spec ends with `url = guategeeks.com` as the single source of truth.
- **Out of scope**: apex-root hosting (`baseUrl: '/'`), CNAME/DNS management, and any change to how equipos is deployed.
