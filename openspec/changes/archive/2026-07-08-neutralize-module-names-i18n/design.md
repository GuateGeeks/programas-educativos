## Context

CiudadBots is a 12-module LEGO SPIKE robotics curriculum. Each module wraps an underlying LEGO program (`Jamie`, `Delivery`, `ForkLift`, `Grabber`, `TowerCrane`, `BobCat`, `PowerArm`, `BridgeMaster`, `Elevator`, `CityCar`, `FireTamer`, `DaisyWheel`) in a Guatemalan-flavored fiction (Trazamapas Chapín, Puente Motagua, Rueda de Feria Chapina, ...). The site declares an `en` locale in `docusaurus.config.ts` but has no `i18n/` directory — `en` currently renders the same Spanish strings under `/en/*` routes. This was a deliberate deferral in the original build ("English strings are stubs/fallbacks" was an explicit non-goal), not an oversight.

Content today is split across three places with three different levels of i18n-readiness:
1. `docs/*.mdx` — thin per-module wrapper pages (title, driving question, teacher note, `<Module id="mN" />`). Natively translatable via Docusaurus's doc-file i18n.
2. `src/data/ciudadbots/modules.ts` and sibling standards-data files — the bulk of the actual prose (context, phases, concepts, CNB mapping, standards, evaluation). Plain TypeScript, invisible to Docusaurus i18n.
3. ~10 React components (`Module`, `InternationalAlignment`, `AchievementIndicators`, `ProgressTracker`, the `/estudiante` page, the homepage) — hardcoded Spanish JSX text mixed with dynamic content.

Decisions already locked in from exploration:
- Module names become **literal/functional** (Tower Crane, Bridge Builder, Ferris Wheel), mapping onto the underlying LEGO program identity.
- Narrative content moves to **native per-locale MDX** rather than a parallel `modules.es.ts`/`modules.en.ts` fork.
- English CNB framing **leads with international standards**, demoting the Guatemala-specific CNB mapping to secondary.
- "Neutral" scope covers **titles and narrative/scenario prose**, not just titles.

## Goals / Non-Goals

**Goals:**
- Every module has one neutral, engineering-oriented name used consistently across ES title, EN title, slug, filename, and sidebar label.
- `en` renders fully authored English content everywhere a user can read Spanish today — no silent fallback.
- Module content authoring moves to a shape where adding/editing a module's prose never requires touching `modules.ts` or component code.
- The `<Module>` component and its siblings keep one consistent layout across both locales.

**Non-Goals:**
- Adding a third locale. The compound-component/MDX approach should not preclude it, but nothing here builds for it explicitly.
- Redesigning the CNB/international-standards content itself (only its per-locale framing/ordering changes).
- Renaming or translating the legacy `guategeeks-citybuilders-publicacion/` HTML, or touching `equipos-educativos/`.
- Setting up URL redirects as part of this change (flagged as an open question below — may be a prerequisite, not part of, this work).
- Machine translation quality assurance / native-speaker review process — out of scope for this change to define; assume authored English is reviewed the same way Spanish content is today.

## Decisions

### Decision 1: Neutral naming table

Names are derived directly from the underlying LEGO program's functional identity — not invented, excavated. Slugs follow the English name (kebab-case) so both locales share one canonical path.

| # | `.llsp` program | Current ES title | New ES title | New EN title | New slug |
|---|---|---|---|---|---|
| 01 | `Jamie` | Trazamapas Chapín | Robot Cartógrafo | Mapper Bot | `mapper-bot` |
| 02 | `Delivery` | Quetzal Express | Robot de Entregas | Delivery Bot | `delivery-bot` |
| 03 | `ForkLift` | CargaXela | Montacargas | Forklift | `forklift` |
| 04 | `Grabber` | AquaMaya | Brazo Reparador | Repair Arm | `repair-arm` |
| 05 | `TowerCrane` | Grúa Ceiba | Grúa Torre | Tower Crane | `tower-crane` |
| 06 | `BobCat` | Volcancito Loader | Cargador Compacto | Compact Loader | `compact-loader` |
| 07 | `PowerArm` | Brazo Mercado | Brazo Clasificador | Sorting Arm | `sorting-arm` |
| 08 | `BridgeMaster` | Puente Motagua | Constructor de Puentes | Bridge Builder | `bridge-builder` |
| 09 | `Elevator` | Elevador Tikal | Elevador | Elevator | `elevator` |
| 10 | `CityCar` | Aurora Móvil | Auto Urbano | City Car | `city-car` |
| 11 | `FireTamer` | Bombero Volcán | Unidad de Rescate | Fire Rescue Unit | `fire-rescue-unit` |
| 12 | `DaisyWheel` | Rueda de Feria Chapina | Rueda de la Fortuna | Ferris Wheel | `ferris-wheel` |

`id` (`m1`...`m12`) and `n` (`01`...`12`) are stable identifiers and don't change — only `title` and `slug` do. This table is the working default; confirm before `tasks.md` execution since every downstream file name depends on it.

- **Alternative considered**: keep Spanish titles distinct from English titles conceptually (translate meaning, not word-for-word) rather than 1:1 pairs. Rejected — 1:1 functional pairing is what makes the set feel consistent and is what "translate it entirely, keep original content" implies: same thing, two languages, not two different fictions.

### Decision 2: `<Module>` becomes a compound component; `modules.ts` narrows to structure only

```
BEFORE                                    AFTER
──────                                    ─────
modules.ts (shared, ES only)              modules.ts (shared, locale-free)
  title, question, context,                 id, n, slug, sessions,
  concepts, phases[], cnb[],                program, phases[].kind,
  standards[], evaluation[]                 guide.{pages, imageBase}
        │
        ▼                                 docs/01-mapper-bot.mdx (es)
  <Module id="m1" />                        <Module id="m1">
  reads everything from                       <Module.Question>...</Module.Question>
  modules.ts                                  <Module.Context>...</Module.Context>
                                               <Module.Concepts>[...]</Module.Concepts>
                                               <Module.Phase kind="act" ...>...</Module.Phase>
                                               <Module.Cnb>[...]</Module.Cnb>
                                               <Module.Standards>[...]</Module.Standards>
                                               <Module.Evaluation>[...]</Module.Evaluation>
                                             </Module>

                                           i18n/en/.../01-mapper-bot.mdx (en)
                                             <Module id="m1"> ... same shape, English text ... </Module>
```
`<Module>` (the parent) still owns tabs, layout, and structural lookups (`getModule(id)` for `n`, `slug`, `program`, `guide`, phase `kind` sequence). The `Module.*` children collect their props/children into context and the parent renders them into the existing tab layout — so the visual consistency Decision 2 in the original design was protecting is preserved; what moves is *where the text lives*, not *how it's laid out*.

- **Alternative considered (parallel `modules.es.ts` / `modules.en.ts`)**: rejected per prior exploration — invisible to Docusaurus i18n tooling, and nothing enforces the two files stay structurally in sync as content evolves.
- **Alternative considered (props-drilling via a big object passed to `<Module>` instead of compound children)**: rejected — compound components read better in MDX prose and let phase blocks stay visually close to their narrative order in the file, matching how the current MDX already reads.

### Decision 2a (addendum, found during implementation): a minimal cross-module title index is still needed

`ProgressTracker` (renders all 12 modules' names in one aggregate list) and `/estudiante` (displays its module's title outside any docs-page context) both need a module's title *without* being inside that module's own MDX render tree — so neither `useDoc()` (current-page-only) nor MDX-supplied children (Decision 2) can reach it. Rather than pulling full narrative back into shared data, `src/data/ciudadbots/titles.ts` adds one small locale-keyed lookup, `moduleTitles: Record<'es'|'en', Record<id, string>>` — title strings only, nothing else. This is the same trade-off already accepted in Decision 3 (small, slow-changing, cross-module data is fine as a parallel-locale object; it's only per-module *narrative* that must live in MDX). Within a module's own page, `<Module>` still reads its title via Docusaurus's `useDoc().metadata.title` rather than this index, so the index is only consulted by components rendering *other* modules' titles in aggregate.

### Decision 3: Locale-aware standards/CNB data

`internationalCards`, `maturityByGrade`, `cnbOfficialCompetencies`, `achievementIndicators(moduleTitle)`, etc. (`src/data/ciudadbots`) are shared *across all modules*, not per-module — they don't fit the per-module MDX pattern from Decision 2. These move to a locale-keyed structure within `src/data/ciudadbots` (e.g. one object keyed by `currentLocale`, or split `standards.es.ts`/`standards.en.ts` loaded by the same locale hook `<Module>` will already need for structural lookups). This is a narrower, lower-drift-risk case than the full module content (small, slow-changing reference tables), so the "parallel file" trade-off rejected in Decision 2 is acceptable here.

`AchievementIndicators` also takes `moduleTitle` as a prop today and interpolates it into sentences (`achievementNoteFor(moduleTitle)`) — those interpolation templates need translating too, and must consume the locale-appropriate title (the new EN/ES title pairs from Decision 1), not a hardcoded one.

### Decision 4: English CNB framing — reorder, don't remove

Per the locked decision, the English "CNB y estándares" tab leads with `InternationalAlignment` (ISTE/CSTA/NGSS) and shows the translated CNB mapping in a collapsed/secondary section (e.g. below a divider, or behind a "Guatemala National Curriculum (CNB) alignment" disclosure). Spanish keeps today's order (CNB primary, international standards below). This is a per-locale *ordering/emphasis* change in the `Module` "cnb" tab panel, not a content removal — the translated CNB content still ships in English, just de-emphasized.

### Decision 5: UI-chrome strings via Docusaurus Translate API

Every hardcoded string in components (tab labels, "Descargar {program}", rubric scale legend, `/estudiante` role names/descriptions, homepage copy) moves to `translate({id, message})` / `<Translate>` calls backed by `i18n/<locale>/code.json`. Navbar and footer labels in `docusaurus.config.ts` need no code change — Docusaurus's classic theme already extracts `navbar.items[].label` and footer link labels into `i18n/<locale>/docusaurus-theme-classic/{navbar,footer}.json` once `npm run write-translations -- --locale en` is run.

### Decision 6: Fix the module-1-only hardcoding incidentally exposed

`Module/index.tsx` hardcodes `pdfHref` to `/assets/ciudadbots/trazamapas-chapin-guia-construccion.pdf` regardless of `id`, and `src/pages/estudiante/index.tsx` hardcodes `getModule('m1')` plus a literal `"Modo estudiante · Trazamapas Chapín"` title. Renaming module 1 breaks both today's literal string and (if left as-is) tomorrow's, so this change fixes both to derive from `guide` metadata / the active module's (locale-aware) title instead of literal strings. `/estudiante` staying scoped to module 1 specifically (only module with a build guide) is unchanged — only the hardcoded name goes away.

## Risks / Trade-offs

- **[Risk]** Renaming slugs breaks every existing `/ciudadbots/<old-slug>` URL with no redirect layer. → Mitigation: confirm with the user whether the site has any live traffic/backlinks yet (two other in-progress changes suggest deployment isn't finalized); if it's pre-launch, no redirects needed — flagged as an Open Question, not assumed.
- **[Risk]** Compound-component MDX (Decision 2) is a bigger refactor than a parallel-file fork; every one of the 12 modules' MDX needs rewriting in both locales simultaneously, and the `<Module>` parent/child context wiring is new code with no precedent elsewhere in this codebase. → Mitigation: build and validate the compound-component shape against one module end-to-end (both locales) before repeating it 11 more times.
- **[Risk]** Static asset filenames (`static/assets/ciudadbots/trazamapas-chapin-guia-construccion.pdf`, `BUILD_GUIDE_BASE` image paths) still carry the old name. → Mitigation: decide whether asset filenames get renamed too (cosmetic/consistency) or intentionally left as internal identifiers decoupled from the public-facing name — recommend the latter (rename is cosmetic churn on binary assets with no user-visible URL exposure beyond the download link text, which Decision 6 already fixes to not leak the old name).
- **[Risk]** Translation quality/consistency across 12 modules × ~8 fields + shared standards data + ~10 components is a lot of surface for drift or missed strings. → Mitigation: `tasks.md` should sequence one fully-verified module first, then a mechanical sweep, and a final pass grepping for remaining hardcoded Spanish string literals in `src/components` and `src/pages` as a completeness check.

## Migration Plan

1. Land the schema/compound-component change (Decision 2) and structural data narrowing against module 1 only, both locales, fully verified end-to-end (build, both locales render, no fallback).
2. Repeat the pattern mechanically for modules 2–12, plus overview and Showcase pages.
3. Migrate shared standards/CNB data to locale-aware form (Decision 3) and wire the English reorder (Decision 4).
4. Sweep UI-chrome strings (Decision 5) across all components and `/estudiante` + homepage.
5. Run `write-translations` for navbar/footer/theme strings; verify `en` build has zero Spanish-fallback strings by diffing rendered `/en/*` pages against `/*`.
6. Decide and execute the redirect question (see Open Questions) before/alongside deployment.

Rollback: each step is additive/isolated enough (new `i18n/en` tree, narrowed but still-typed `modules.ts`) to revert per-commit; no data migration or irreversible external state is involved.

## Open Questions

- Is the site live/indexed anywhere yet, or is this pre-launch? Determines whether old-slug → new-slug redirects are required.
- Should the 12 candidate names in Decision 1 be treated as final, or reviewed module-by-module before implementation starts?
- Do downloadable asset filenames (`.llsp` files, build-guide PDF/images) get renamed to match the new module names, or stay as internal identifiers? Design recommends the latter; confirm.
- Does the English-locale CNB demotion (Decision 4) apply to the overview page's transversal CNB block too, or only per-module tabs?
