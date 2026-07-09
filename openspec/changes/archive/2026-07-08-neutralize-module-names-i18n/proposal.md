## Why

CiudadBots' 12 module names (Trazamapas Chapín, Quetzal Express, CargaXela, AquaMaya, Grúa Ceiba, Volcancito Loader, Brazo Mercado, Puente Motagua, Elevador Tikal, Aurora Móvil, Bombero Volcán, Rueda de Feria Chapina) lean on Guatemalan slang, place names, and national symbols that don't have honest English equivalents ("Chapín" has no translation), which is what's currently blocking real bilingual content. The `en` locale is already declared in `docusaurus.config.ts` but has no `i18n/` directory — it silently falls back to Spanish. Renaming to neutral, engineering-oriented names and building the missing translation plumbing are the same piece of work: give every module a name that means the same functional thing in both languages, then actually author both languages everywhere a learner or teacher sees text.

## What Changes

- **BREAKING**: All 12 module titles, slugs, and doc filenames are renamed from Guatemala-flavored names to neutral, engineering/city-oriented names derived from the underlying LEGO SPIKE program identity (e.g. `trazamapas-chapin` → `mapper-bot`, `puente-motagua` → `bridge-builder`, `rueda-feria-chapina` → `ferris-wheel`). Old URLs change; no redirects exist today (see Impact).
- **BREAKING**: `src/data/ciudadbots/modules.ts` schema narrows to structural-only fields (id, number, slug, session count, program filename, phase `kind` sequence, optional guide metadata). All narrative/translatable content (title, driving question, context, concepts, phase text, CNB mapping, evaluation criteria) moves out of shared TS into per-locale MDX, authored once in Spanish (`docs/`) and once in English (`i18n/en/docusaurus-plugin-content-docs/current/`).
- The shared `<Module>` renderer becomes a compound component (`<Module.Context>`, `<Module.Phase>`, `<Module.Concepts>`, etc.) so each locale's MDX supplies content while layout stays centralized and consistent.
- Module scenario/context prose is rewritten to remove country-specific references (e.g. "comunidad guatemalteca" → generic community framing), consistent with the new neutral naming — this applies to the fictional mission text only; program branding (GuateGeeks) and the Guatemala CNB curriculum target are unaffected.
- The English locale reframes each module's "CNB y estándares" tab to lead with international standards (ISTE/CSTA/NGSS); the Guatemala CNB mapping is translated but demoted to a secondary/footnote position in English (Spanish keeps CNB primary).
- Shared standards/CNB content currently hardcoded in `src/data/ciudadbots` (`internationalCards`, `maturityByGrade`, `cnbOfficialCompetencies`, `achievementIndicators`, etc.) becomes locale-aware.
- All hardcoded UI-chrome strings across components (`Module` tab labels, download buttons, rubric scale text, team-role names/descriptions in `/estudiante`, hero copy, homepage) move to Docusaurus's translation APIs (`<Translate>`/`translate()` + `i18n/<locale>/code.json`) instead of literal Spanish JSX text.
- The overview page, Showcase page, and student build page (`/estudiante`) are authored/translated per locale and no longer hardcode a module's Spanish title.
- Navbar, footer, and site metadata strings gain real `en` translations via Docusaurus's native theme i18n extraction.

## Capabilities

### New Capabilities
- `ui-string-localization`: every UI-chrome string in the app (tab labels, buttons, rubric scale, team-role copy, hero/homepage copy, navbar/footer) is authored per-locale via Docusaurus's translation APIs rather than hardcoded Spanish text, so `en` renders genuinely translated UI instead of a Spanish fallback.

### Modified Capabilities
- `program-content-model`: schema narrows to structural-only fields; narrative content (title, question, context, concepts, phases, CNB, standards, evaluation) moves to per-locale MDX rendered through a compound `<Module>` API; module identifiers adopt the new neutral naming scheme.
- `docs-platform`: bilingual i18n requirement upgrades from "en locale declared, content falls back to es" to "en locale has fully authored, non-fallback content across every program page."
- `ciudadbots-overview-structure`: session index and module references updated to the new neutral names; overview page content authored per locale (es primary CNB framing, en international-standards framing carried through from the module-level decision).
- `ciudadbots-standards-depth`: the shared CNB/international-standards data becomes locale-aware; English locale requirement changes to lead with international standards and demote CNB to secondary.
- `ciudadbots-closing-showcase`: Showcase page's reference to the closing module updates to its new name; Showcase content authored per locale.

## Impact

- **Renamed/restructured**: `docs/*.mdx` (13 module + overview + showcase files, filenames and slugs change), `src/data/ciudadbots/modules.ts` and `types.ts` (schema narrows), `src/data/ciudadbots/index.ts` and sibling standards-data files (become locale-aware).
- **New tree**: `i18n/en/docusaurus-plugin-content-docs/current/*.mdx`, `i18n/en/docusaurus-theme-classic/{navbar,footer}.json`, `i18n/en/code.json` (none of this exists today).
- **Components touched**: `Module` (becomes compound, drops hardcoded strings), `InternationalAlignment`, `AchievementIndicators`, `CnbBlock`, `CnbSourceLinks`, `ImpactTable`, `ScopeOptions`, `BasicoAlignment`, `ProgressTracker`, `Showcase`, `RubricTable`, and `src/pages/estudiante/index.tsx` / `src/pages/index.tsx`.
- **Known pre-existing bug surfaced by this change**: `Module/index.tsx` hardcodes the module-1 build-guide PDF path (`/assets/ciudadbots/trazamapas-chapin-guia-construccion.pdf`) regardless of which module is rendered — renaming module 1 forces this to be fixed properly (guide asset paths should come from `guide` metadata, not a literal old slug).
- **URLs break**: `/ciudadbots/<old-slug>` routes change to `/ciudadbots/<new-slug>` with no redirect layer in place. Two other in-progress changes (`use-guategeeks-com-domain`, `configure-deployment-and-branding`) suggest the site hasn't fully launched yet, so this is likely the cheap window to do it — worth confirming before implementation.
- **Out of scope**: the legacy standalone HTML in `guategeeks-citybuilders-publicacion/` and the untracked `equipos-educativos/` directory are not touched by this change.
