## Why

The CiudadBots Guatemala robotics curriculum currently lives as two hand-built, standalone HTML files (`programa-robotica.html`, `trazamapas-estudiante.html`) that render all content from an inline JavaScript `modules` array. This is hard to maintain, not searchable, not editable by non-developers, contains dead links (pointing at a contributor's local `~/Downloads`), and cannot scale to host additional educational programs. Moving to Docusaurus gives GuateGeeks a proper documentation platform: searchable, versionable, bilingual, editable in Markdown, and structured so more programs can be added later without a rewrite.

## What Changes

- Introduce a Docusaurus site at the repository root as a **hub** designed to host multiple educational programs, with CiudadBots Guatemala as the first program under a `/ciudadbots/*` namespace.
- Port the 12 CiudadBots modules into a **hybrid content model**: structured fields (concepts, the 4 phases, CNB alignment, standards, rubric, `.llsp` program) live in a typed data file rendered by a reusable `<Module>` component; each module's narrative (driving question, context, teacher notes) lives in per-module MDX.
- Re-implement the interactive pieces as reusable React components: the three.js **CityBots 3D hero**, the **build-guide viewer** (image flipbook + lightbox), and the **teacher progress tracker** (localStorage-backed).
- Preserve the **two-audience split**: a rich teacher surface (all tabs, downloads, tracker) and a separate stripped **student build view** under `/estudiante/*` (build images only, no downloads, shareable link, team roles).
- Configure Docusaurus **i18n** for Spanish (default) and English, with all existing content authored in Guatemalan Spanish and English translation stubs in place.
- Migrate static assets (`.llsp` LEGO SPIKE programs, the 48-page build guide images, the 11MB PDF, logo) into Docusaurus `static/`.
- Remove the dead `original` links (local `~/Downloads` paths) and explicitly record the known content gap: only module 1 currently has a visual build guide.

## Capabilities

### New Capabilities

- `docs-platform`: The Docusaurus hub foundation — project scaffold, bilingual (es/en) i18n configuration, program-namespaced routing and sidebars, theming/branding, static-asset hosting, and local build/serve workflow.
- `program-content-model`: The hybrid data + MDX model for a program's modules — a typed module schema and data file, a reusable `<Module>` renderer for structured fields (concepts, 4 phases, CNB, standards, rubric, downloadable program), and per-module MDX narrative pages. Instantiated by the 12 CiudadBots modules.
- `interactive-learning-components`: Reusable client-side React components ported from the current SPA — the three.js 3D hero scene, the paginated build-guide viewer with lightbox, and the localStorage teacher progress tracker.
- `student-mode`: The stripped student-facing build experience — a separate minimal route/layout showing only construction imagery with team roles, no downloads or rubric, and a shareable direct link.

### Modified Capabilities

_None — this is a greenfield site; there are no existing specs in `openspec/specs/`._

## Impact

- **New dependency & tooling**: Docusaurus 3 (React 18, Node ≥ 18), a `package.json` and lockfile at the repo root, `docusaurus.config.js`, `sidebars.js`, and an `i18n/` tree.
- **New source tree**: `docs/ciudadbots/*` (MDX), `src/components/*` (Hero, BuildGuide, ProgressTracker, Module), `src/data/*` (typed module data), `src/pages/estudiante/*`, `static/*` (assets).
- **Source content**: `guategeeks-citybuilders-publicacion/` becomes the migration source; its two HTML files are superseded by the Docusaurus site (kept for reference during the port, retired after).
- **Repo layout**: root gains a Node project; the empty embedded `equipos-educativos` git repo is unaffected but must be considered when placing the site (site lives at root).
- **Known content gap carried forward**: 11 of 12 modules have no visual build guide yet (placeholder retained, logged as future work).
- **Deployment** (out of scope for this change, noted for follow-up): a static host / CI build for the generated site.
