## Context

CiudadBots Guatemala is a 12-module LEGO SPIKE robotics curriculum currently delivered as two standalone HTML files in `guategeeks-citybuilders-publicacion/`:

- `programa-robotica.html` — a 1,300-line data-driven SPA. A single inline `const modules = [...]` array holds every module's content; JavaScript renders HTML strings into tab panels (método / recursos / CNB / evaluación) on click. It also carries a three.js 3D hero, a paginated build-guide viewer with lightbox, and a localStorage teacher progress tracker.
- `trazamapas-estudiante.html` — a deliberately minimal student flipbook: 48 construction images with prev/next and a lightbox, plus team roles. It intentionally hides all downloads.

Supporting assets: 12 `.llsp` LEGO SPIKE programs, 48 build-guide JPGs (module 1 only), an 11MB source PDF, the GuateGeeks logo, and a vendored `three.min.js`.

Constraints and signals:
- The repo is named `programas-educativos` (plural) and holds an empty embedded `equipos-educativos` git repo — the platform should anticipate more than one program.
- Every module shares one rigid 8-field shape, which maps cleanly onto a typed data model.
- Content is Guatemalan Spanish; the `original` links point at a contributor's local `~/Downloads` and are dead.
- OpenSpec planning home is repo-local; the site will live at the repository root.

Four product decisions were made during exploration and are treated as fixed inputs to this design: (1) build a **hub** for many programs, not a single-program site; (2) use a **hybrid** content model (typed data + MDX prose); (3) preserve the **two-audience** teacher/student split; (4) configure **bilingual** es/en i18n with Spanish default.

## Goals / Non-Goals

**Goals:**
- Stand up a Docusaurus 3 site at the repo root that builds and serves cleanly, structured as a hub with CiudadBots as program #1 under `/ciudadbots/*`.
- Migrate all 12 modules faithfully into a typed data file + per-module MDX, rendered by one reusable `<Module>` component.
- Re-implement the three interactive pieces (3D hero, build-guide viewer, progress tracker) as reusable, client-safe React components.
- Preserve the stripped student build view as a separate `/estudiante/*` route with a shareable link.
- Configure i18n with `es` default and `en` available; author content in Spanish.
- Eliminate dead links and make the missing-build-guide gap explicit.

**Non-Goals:**
- Deployment / hosting / CI pipeline (follow-up change).
- Real authentication or access control between teacher and student surfaces — the split is routing/layout only.
- Full English translations — only i18n scaffolding and Spanish source content are in scope; English strings are stubs/fallbacks.
- Authoring the 11 missing build guides — the placeholder is carried forward as future work.
- Refactoring or replacing the vendored three.js scene's visual design.

## Decisions

### Decision 1: Docusaurus hub at repo root, program-namespaced

Site lives at the repository root (its own `package.json`, `docusaurus.config.js`, `sidebars.js`). Program content is namespaced: `docs/ciudadbots/*` → `/ciudadbots/*`. A future program becomes a new `docs/<program>/*` subtree and its own sidebar, without touching CiudadBots routes.

- **Why root over a `site/` subfolder:** simplest deploy target and canonical for a repo whose primary purpose is this content; the empty `equipos-educativos` embedded repo is left untouched beside it.
- **Alternative considered:** a `site/` subdirectory to keep root clean. Rejected as unnecessary indirection for a content-first repo; can be revisited if the root gets crowded.
- **Alternative considered:** Docusaurus multi-instance docs plugin per program. Deferred — a single docs instance with per-program folders + sidebars is enough for now and simpler; multi-instance can be adopted when a second program arrives and needs independent versioning.

### Decision 2: Hybrid content model — typed data + MDX + one `<Module>` renderer

Structured fields (concepts, the 4 phases, CNB, standards, evaluation, program filename, optional guide) live in a typed data file, e.g. `src/data/ciudadbots/modules.ts`. Narrative (driving question, context, teacher notes) lives in per-module MDX (`docs/ciudadbots/NN-slug.mdx`) that imports and renders `<Module id="mN" />`.

- **Why:** the module shape is rigidly uniform, so structured layout belongs in one component (consistency, single place to change layout). Prose is narrative and benefits from MDX editability, per-module URLs, search, and edit-on-GitHub.
- **Alternative — MDX per module (full structure inline):** rejected as 12× structural repetition and prose/layout intermixing.
- **Alternative — pure data-driven React (generate all 12 routes from the array):** rejected as the weakest "docs" experience (no per-module MDX editing, weaker search) and furthest from Docusaurus conventions.
- **Data typing:** TypeScript for compile-time guarantees that every module satisfies the schema. Docusaurus supports TS config and components.

### Decision 3: Interactive pieces as client-only, data-driven React components

Three components under `src/components/`: `<CityBotsHero>`, `<BuildGuide>`, `<ProgressTracker>`. All are browser-dependent (three.js, localStorage), so they render client-side only.

- **SSR safety:** wrap browser-only rendering in Docusaurus `<BrowserOnly>` and/or guard on `ExecutionEnvironment.canUseDOM`; import three.js lazily inside an effect so the production build (which runs in Node) does not evaluate browser APIs at module load.
- **three.js delivery:** prefer installing `three` as an npm dependency over the vendored 589KB `three.min.js`, so bundling/tree-shaking and versioning are managed by the toolchain.
- **Data-driven:** `<BuildGuide>` takes a guide reference (image path + page count); `<ProgressTracker>` takes the module list. This keeps them reusable by future programs and satisfies the "components are reusable across programs" requirement.
- **localStorage key:** preserve/namespace the tracker's storage key so it is program-scoped and future programs don't collide.

### Decision 4: Student mode as a separate minimal route

The student build view is a separate route under `/estudiante/*` (custom page(s) under `src/pages/estudiante/` or a minimal-layout doc), reusing `<BuildGuide>` and a roles block, with downloads/tracker/rubric omitted.

- **Why routing-only, not auth:** matches the current design's intent (a shareable link), avoids the complexity of real access control, and keeps the site fully static.
- **Alternative — a second docs plugin instance for students:** heavier than needed; a custom page reusing the shared viewer component is lighter and gives full control over the stripped layout.

### Decision 5: i18n with Spanish default

Configure `i18n.defaultLocale: 'es'`, `locales: ['es', 'en']`. All source content authored in `es`; `en` relies on Docusaurus fallback until translations are added. A locale switcher is enabled in the navbar.

- **Why now:** wiring i18n after content exists means re-slicing every string into translation files; configuring it up front makes English an incremental add.
- **Trade-off:** English routes will initially show Spanish fallback content — acceptable and explicitly a non-goal to translate now.

### Decision 6: Asset migration into `static/`

`.llsp` programs → `static/ciudadbots/programs/`; build-guide images → `static/ciudadbots/build-guide/`; PDF and logo → `static/`. Dead `original` links are dropped during migration. The 11MB PDF is included in `static/` (decision: keep it available; revisit if repo size becomes a concern).

## Risks / Trade-offs

- **three.js SSR/build failures** → Isolate all browser APIs behind `<BrowserOnly>` / lazy dynamic import; verify with a full `npm run build`, not just dev server.
- **Content drift during manual migration of 12 modules** → Migrate directly from the existing `modules` array (copy the object, don't retype); add a lightweight check that all 12 ids/titles/phase counts are present.
- **11MB PDF bloats the repo** → It duplicates the 48 JPGs; if repo weight matters, drop the PDF from `static/` and keep only the images. Flagged as an open question below.
- **English fallback looks broken to `en` visitors** → Acceptable for this change (non-goal); document it so it isn't mistaken for a bug. Consider hiding the `en` switcher until real translations exist.
- **Hub abstraction over-engineered for one program** → Kept minimal: namespacing + reusable components only, no premature multi-instance/versioning machinery.
- **Root Node project vs embedded `equipos-educativos` repo** → Site tooling at root does not touch the embedded repo; confirm `.gitignore` covers `node_modules/` and `build/`.

## Migration Plan

1. Scaffold Docusaurus 3 (TypeScript) at repo root; configure i18n (es default, en), branding, and the `/ciudadbots/*` namespace + sidebar.
2. Move assets into `static/`; install `three` from npm.
3. Port the `modules` array into a typed `src/data/ciudadbots/modules.ts`, stripping dead `original` links.
4. Build the `<Module>` renderer + the three interactive components (client-safe).
5. Author the 12 per-module MDX pages embedding `<Module>`, plus the CiudadBots overview.
6. Build the `/estudiante/*` student route reusing `<BuildGuide>` + roles.
7. Verify: `npm run build` passes with no broken links; spot-check 3D hero, viewer, tracker, and student link in a browser.
8. Retire the two source HTML files once parity is confirmed (keep in git history / reference until then).

**Rollback:** the site is additive; the original HTML files remain until parity is confirmed. Reverting the change removes the Docusaurus project and restores the standalone HTML as the delivery mechanism.

## Open Questions

- Ship the 11MB PDF in `static/`, or keep only the 48 JPG images and drop the PDF?
- Hide the English locale switcher until real translations exist, or expose it with Spanish fallback?
- Deployment target (GitHub Pages, Netlify, Vercel, internal host) — out of scope here, but influences `docusaurus.config.js` `url`/`baseUrl`; use placeholders for now.
- Retire the source HTML files in this change, or in a follow-up after real-world parity review?
