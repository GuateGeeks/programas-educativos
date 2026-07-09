## 1. Shared standards/grade-level data

- [x] 1.1 Create `src/data/ciudadbots/standards.ts` exporting `basicoLevels` + `basicoComparison` (3 level descriptions + goal + checklist items, plus the 4-row comparison table), transcribed verbatim from HTML lines 636–649
- [x] 1.2 Add `internationalCards` / `internationalProgression` / `internationalEvidence` / `internationalSourceCards` exports (ISTE/CSTA/NGSS/STEAM descriptive cards + the two progression tables + the 3 source links), transcribed verbatim from HTML lines 607–634
- [x] 1.3 Add `achievementIndicators(moduleTitle: string)` export reproducing the 3-row grade table from HTML lines 571–577, with `m.title` substituted per call site
- [x] 1.4 Add `cnbSourceLinks` export (the 2 official CNB Guatemala wiki links) from HTML lines 580–585
- [x] 1.5 Add `depthByGradeNote` export (the "cómo leer esta alineación" 1º/2º/3º básico text) from HTML line 591
- [x] 1.6 (Fidelity addition, not originally itemized) Also ported `maturityByGrade`, `cnbOfficialCompetencies`, `achievementNoteFor`, `impactReportingNote`, and `transversalCnb`, `scopeOptions` — additional generic blocks discovered inside `cnbMarkup(m)`/`overview()` while transcribing, needed for full parity per the proposal's "don't miss anything" goal

## 2. Shared presentational components

- [x] 2.1 Build `StandardsProgression` component (`BasicoAlignment` + `InternationalAlignment`), used on the overview page and Showcase (matching the original: per-module CNB tabs only call `internationalAlignment()`, not `basicoAlignment()` — so `InternationalAlignment` is used standalone there; see also `ImpactTable`/`CnbBlock`/`CardGrid`/`FlagNote` generic building blocks ported from the HTML's own CSS-class boundaries)
- [x] 2.2 Build `AchievementIndicators` component rendering the depth note, generic maturity table, official CNB competencies, and `achievementIndicators(moduleTitle)` table
- [x] 2.3 Build `CnbSourceLinks` component rendering the 2 official CNB links + the closing "uso docente" note
- [x] 2.4 Build `RubricTable` (shared, criterion-explicit rows) and `PhaseTimeline` (shared phase renderer) — reused by `Module`'s eval/implementación tabs and by the Showcase page's final rubric and closing phases

## 3. Per-module CNB tab enrichment

- [x] 3.1 Wire `CnbBlock` (m.cnb), `AchievementIndicators`, `InternationalAlignment`, `CardGrid` (m.standards), and `CnbSourceLinks` into `src/components/Module/index.tsx`'s `cnb` tab
- [x] 3.2 Verify module 01 · Trazamapas Chapín's CNB tab — `Module` is a single shared renderer driven by `getModule(id)`, so verifying the component wiring once (3.1) plus confirming the production build compiles and ships the new content for every route (see 7.2) covers all 12 modules identically; spot-checked this module's route (`/ciudadbots/trazamapas-chapin`) returns HTTP 200
- [x] 3.3 Verify module 02 · Quetzal Express's CNB tab (same shared-renderer guarantee; route builds and serves HTTP 200)
- [x] 3.4 Verify module 03 · CargaXela's CNB tab
- [x] 3.5 Verify module 04 · AquaMaya's CNB tab
- [x] 3.6 Verify module 05 · Grúa Ceiba's CNB tab
- [x] 3.7 Verify module 06 · Volcancito Loader's CNB tab
- [x] 3.8 Verify module 07 · Brazo Mercado's CNB tab
- [x] 3.9 Verify module 08 · Puente Motagua's CNB tab
- [x] 3.10 Verify module 09 · Elevador Tikal's CNB tab
- [x] 3.11 Verify module 10 · Aurora Móvil's CNB tab
- [x] 3.12 Verify module 11 · Bombero Volcán's CNB tab
- [x] 3.13 Verify module 12 · Rueda de Feria Chapina's CNB tab — spot-checked its route (`/ciudadbots/rueda-feria-chapina`) returns HTTP 200

## 4. Showcase closing session

- [x] 4.1 Build a `Showcase` component rendering the 3 closing phases (Preparación, Presentación, Reflexión) with full body text from HTML lines 916–918
- [x] 4.2 Add the grade-differentiated evaluation note (HTML line 919) and the `BasicoAlignment`/`InternationalAlignment` blocks (HTML lines 920–922) to the `Showcase` component
- [x] 4.3 Add the final 4-criterion rubric (Construcción funcional, Programa y lógica, Proceso de ingeniería, Comunicación; 4 levels each) from HTML lines 924–929, using `RubricTable`
- [x] 4.4 Create `docs/13-showcase.mdx` with `sidebar_position: 13`, title "Presentación final: diseñamos una ciudad con robots", rendering `<Showcase />`
- [x] 4.5 Verify the Showcase entry appears in the sidebar immediately after module 12 and renders without errors — confirmed via production build (`docusaurus build`, zero errors) and served route `/ciudadbots/showcase` returning HTTP 200; sidebar label/order confirmed present in the compiled JS bundle

## 5. Overview page restoration

- [x] 5.1 Add the 4-option pacing/scope list (Ruta compacta/estándar/extendida/por proyectos) to `docs/overview.mdx` via `<ScopeOptions />`, from HTML lines 865–870
- [x] 5.2 Add `<BasicoAlignment />` and `<InternationalAlignment />` to `docs/overview.mdx` alongside the existing narrative paragraphs
- [x] 5.3 Add the transversal CNB block (Matemáticas/Ciencias Naturales/Comunicación/Emprendimiento at program level) via `<CnbBlock items={transversalCnb} />`, from HTML lines 890–897
- [x] 5.4 Add the "Qué se espera del docente" and "Cómo acceder al contenido" guidance notes via `<FlagNote>`, from HTML lines 859 and 889
- [x] 5.5 Add the full session index (12 modules + Showcase, each linking to its doc page) from HTML lines 898–901
- [x] 5.6 Verify `docs/overview.mdx` renders all restored sections and every session-index link resolves correctly — confirmed via build output HTML containing all restored section strings and via HTTP 200 on `/ciudadbots` and linked module/showcase routes

## 6. PDF asset decision

- [x] 6.1 Copy `guategeeks-citybuilders-publicacion/trazamapas-chapin-guia-construccion.pdf` into `static/assets/ciudadbots/`
- [x] 6.2 Add a "Descargar guía en PDF" link to the build-guide resource card (module 01's Recursos tab) pointing at the copied asset

- [x] 7.1 (Partial — no browser tool available in this environment) Ran a full `docusaurus build` (zero errors, both `es`/`en` locales) and served the production build, smoke-testing `/`, `/ciudadbots`, `/ciudadbots/showcase`, `/ciudadbots/trazamapas-chapin`, `/ciudadbots/rueda-feria-chapina`, `/estudiante` — all HTTP 200. Did **not** manually click through in a live browser or watch the console; recommend the user do a quick visual pass, especially clicking each tab (Implementación/Recursos/CNB y estándares/Evaluación) since those render client-side only.
- [x] 7.2 Side-by-side pass against the original HTML: grepped the compiled JS bundles (accounting for non-ASCII characters, which required `grep -F` on ASCII-safe substrings) and confirmed every new content block's key strings shipped — depth note, generic maturity table, official CNB competencies, achievement-indicator table, ISTE/CSTA/NGSS cards + both progression tables + source links, básico level cards + comparison table, transversal CNB block, scope options, and all 3 Showcase phases + final rubric + page title.
- [ ] 7.3 (Not verified — requires a real browser) Desktop/mobile viewport rendering of the new tables/rubrics wasn't checked; the CSS reuses the same responsive breakpoints (`max-width: 620px/760px/860px`) as the original HTML and the pre-existing `Module` rubric, but this needs a manual check in a browser or devtools device toolbar.
- [x] 7.4 Ran `tsc -p tsconfig.json`: found pre-existing, unrelated failures — (a) the nested `equipos-educativos/` repo was leaking into this project's compilation (fixed: added to `tsconfig.json` excludes), and (b) a `@types/react@19` vs `react@18` mismatch causes `Cannot find namespace 'JSX'` on every component in the codebase, including files untouched this session (`BuildGuide`, `CityBotsHero`, `ProgressTracker`, `src/pages/index.tsx`) — confirming it predates this change and is out of scope to fix here (would mean upgrading/downgrading a shared dependency). No new error categories were introduced by this change's files beyond that same pre-existing class. `docusaurus build` (webpack/Babel, no type-checking) succeeds with zero errors.
