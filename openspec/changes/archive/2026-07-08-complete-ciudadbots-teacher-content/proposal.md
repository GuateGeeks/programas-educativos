## Why

The original CiudadBots teacher guide (`guategeeks-citybuilders-publicacion/guategeeks-citybuilders-programa-robotica.html`) is 1,302 lines, but only its ~200-line `modules` data array was ever ported to the Docusaurus site — faithfully. The other ~780 lines are render functions that generate substantial teacher-facing content with no equivalent in Docusaurus today: an entire closing "Showcase" session, grade-differentiated (1º/2º/3º básico) CNB achievement indicators and ISTE/CSTA/NGSS progression tables per module, and several structural blocks on the overview page (pacing options, the básico-by-básico alignment breakdown, the full module index). A prior change (`sync-full-ciudadbots-content-to-docusaurus`) closed itself as complete without noticing this gap, because it only compared the data array, not the full HTML. `openspec/specs/` is still empty, confirming no capability from that effort was ever formalized. This change closes the real gap so the Docusaurus site is a full replacement for the original HTML guide, not a partial one.

## What Changes

- Add the missing **closing Showcase page**: "Presentación final: diseñamos una ciudad con robots" with its 3 phases (Preparación, Presentación, Reflexión), the grade-differentiated evaluation note, and the full 4-criterion final rubric (Construcción funcional, Programa y lógica, Proceso de ingeniería, Comunicación), each with complete 4-level descriptive text. Add it to site navigation as the closing entry after module 12.
- Enrich the **per-module "CNB y estándares" tab** (currently two bare bullet lists) to include: the 1º/2º/3º básico depth-reading note, grade-specific achievement indicators for that module, the full ISTE/CSTA/NGSS progression tables with descriptive cards, and outbound links to the official CNB Guatemala wiki pages.
- Restore the **overview page's missing structural blocks**: the 4-option pacing/scope list (compacta/estándar/extendida/por proyectos), the full 1º/2º/3º básico alignment breakdown (level cards + comparison table across pensamiento computacional / matemática / ciencia e ingeniería / comunicación), the transversal CNB block, the "qué se espera del docente" and "cómo acceder al contenido" notes, and a full module index linking every session (including Showcase).
- Make an explicit, documented decision on the unlinked `trazamapas-chapin-guia-construccion.pdf` asset (link it from the build-guide resource card, or note why the image-viewer supersedes it) rather than leaving it orphaned.

## Capabilities

### New Capabilities
- `ciudadbots-closing-showcase`: The final "Showcase" session — closing phases, grade-differentiated evaluation guidance, and the program-level final rubric — reachable from site navigation.
- `ciudadbots-standards-depth`: Grade-differentiated CNB achievement indicators and ISTE/CSTA/NGSS progression content, rendered per module and sourced from a single shared dataset (not hand-duplicated per module).
- `ciudadbots-overview-structure`: The overview page's pacing options, básico-by-básico alignment breakdown, transversal CNB block, and full session index, matching the original HTML's teacher-navigation structure.

### Modified Capabilities
<!-- openspec/specs/ is currently empty; no existing capability specs to modify. -->

## Impact

- **Code**: `src/data/ciudadbots/` (extend types/data to carry grade-level and standards-progression content once, shared across modules and the showcase page), `src/components/Module/index.tsx` (CNB tab), `docs/overview.mdx`, a new `docs/13-showcase.mdx` (or equivalent), `sidebars.ts`.
- **New components likely needed**: something like `AchievementIndicators`, `StandardsProgression`, `ScopeOptions`, `ShowcaseRubric` — reusable rather than copy-pasted per module/page.
- **Assets**: decision + wiring for `trazamapas-chapin-guia-construccion.pdf`.
- **No breaking changes**: purely additive content and structure; existing module pages, BuildGuide, ProgressTracker, and CityBotsHero are unaffected in their current behavior.
