## 1. Scaffold the Docusaurus hub

- [x] 1.1 Initialize a Docusaurus 3 site (TypeScript, classic preset) at the repository root with its own `package.json` and lockfile
- [x] 1.2 Add `.gitignore` entries for `node_modules/`, `build/`, and `.docusaurus/`; confirm the embedded `equipos-educativos` repo is untouched
- [x] 1.3 Configure `docusaurus.config` with GuateGeeks branding (title, logo, theme) and placeholder `url`/`baseUrl`
- [x] 1.4 Configure i18n: `defaultLocale: 'es'`, `locales: ['es', 'en']`, and enable the navbar locale switcher
- [x] 1.5 Verify the dev server starts (`npm run start`) and the default homepage renders without errors

## 2. Hub structure and asset migration

- [x] 2.1 Create the `/ciudadbots/*` docs namespace (`docs/ciudadbots/`) and a `sidebars` entry scoped to CiudadBots
- [x] 2.2 Install `three` as an npm dependency (replacing the vendored `three.min.js`)
- [x] 2.3 Copy the 12 `.llsp` programs into `static/ciudadbots/programs/`
- [x] 2.4 Copy the 48 build-guide JPGs into `static/ciudadbots/build-guide/` and the logo/PDF into `static/`
- [x] 2.5 Build the hub landing page with GuateGeeks branding and a link into the CiudadBots program

## 3. Program content model

- [x] 3.1 Define the typed module schema (identifier, number, title, short, sessions, question, context, concepts, 4 phases, cnb, standards, eval, program, optional guide)
- [x] 3.2 Port all 12 modules from the existing `modules` array into `src/data/ciudadbots/modules.ts`, removing the dead `original` local-path links
- [x] 3.3 Add a check/assertion that all 12 module ids, titles, and 4-phase structures are present and type-check
- [x] 3.4 Implement the reusable `<Module>` component rendering concepts, the 4 phases, CNB, standards, evaluation rubric, and the program download consistently
- [x] 3.5 Author the 12 per-module MDX pages (`docs/ciudadbots/NN-slug.mdx`) with narrative (question, context, notes) embedding `<Module id="mN" />`
- [x] 3.6 Add the CiudadBots program overview page
- [x] 3.7 Show an explicit "guide pending" placeholder for the 11 modules without a visual build guide

## 4. Interactive components

- [x] 4.1 Implement `<CityBotsHero>` (three.js) as a client-only component using `BrowserOnly`/`canUseDOM` and lazy import; verify no SSR/build failure
- [x] 4.2 Implement `<BuildGuide>` — data-driven paginated viewer (prev/next, page counter with clamping) plus a lightbox enlarged view
- [x] 4.3 Implement `<ProgressTracker>` — per-module session marking, program-scoped localStorage persistence, and aggregate progress (sessions marked, modules complete, percent) with reset
- [x] 4.4 Wire the components into the teacher module pages / overview

## 5. Student mode

- [x] 5.1 Create the `/estudiante/*` route with a minimal layout separate from the teacher surface
- [x] 5.2 Reuse `<BuildGuide>` in the student view showing construction imagery only (no downloads, no tracker, no rubric)
- [x] 5.3 Add the team-roles block (Constructor, Organizador, Programador) with the rotation suggestion
- [x] 5.4 Ensure the student view has a stable, shareable URL

## 6. Verification and cutover

- [x] 6.1 Run `npm run build` and confirm zero broken internal links and a successful static build
- [x] 6.2 Browser spot-check: 3D hero renders, build-guide viewer + lightbox work, tracker persists/resets, student link opens directly
- [x] 6.3 Confirm i18n: Spanish served by default, English locale route resolves (with fallback)
- [x] 6.4 Confirm all `.llsp` downloads and build-guide images resolve from `static/`
- [x] 6.5 **Decision: deferred.** The two source HTML files in `guategeeks-citybuilders-publicacion/` are kept as reference until a human confirms real-world parity (per design.md rollback strategy). Retirement will be a follow-up change once the Docusaurus site is reviewed in the browser and adopted.
