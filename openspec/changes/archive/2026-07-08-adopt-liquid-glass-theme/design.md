## Context

The hub (`programas-educativos`) and the sibling `equipos-educativos` site are both GuateGeeks properties but ship different visual systems. The hub uses a minimal 45-line `src/css/custom.css` built on a **teal-primary** token set (`--gg-teal`, `--gg-ink`, `--gg-paper`, `--gg-gold`, `--gg-line`, `--gg-radius`) that its four CiudadBots components already depend on (~55 references across `Module`, `ProgressTracker`, `BuildGuide`, `CityBotsHero`). `equipos-educativos` ships a mature **GuateGeeks Liquid Glass** system (~350 lines): coral-primary with sky/plum accents, `--glass-*` surface tokens, Barlow typography, glass utility classes, full chrome overrides, and swizzled sidebar components.

The critical constraint is a **token-vocabulary collision**: the tokens the hub's components reference (`--gg-teal`, `--gg-ink`, `--gg-line`, `--gg-paper`, `--gg-gold`, `--gg-radius`) do **not** exist in the Liquid Glass system, which instead defines numbered scales (`--gg-coral-300…800`, `--gg-sky-*`, `--gg-plum-*`) and `--glass-*`. A straight file copy would leave every component referencing undefined variables. The user has chosen a **full unify**: adopt the Liquid Glass system everywhere and rewrite the four components onto it, retiring CiudadBots' teal identity.

## Goals / Non-Goals

**Goals:**
- Make the Liquid Glass system the hub's single theming contract (tokens, typography, utilities, chrome, swizzles).
- Re-skin the four CiudadBots components onto Liquid Glass tokens with zero references to the retired teal vocabulary.
- Preserve full light/dark parity and accessibility (focus ring, reduced motion).
- Leave all content, routing, data model, i18n, and `/estudiante` behavior unchanged.

**Non-Goals:**
- No changes to docs content, MDX, the module data model, sidebars' information architecture, or routing.
- No component behavior changes (three.js hero logic, tracker localStorage, flipbook pagination stay as-is) — visual re-skin only.
- Not self-hosting fonts in this change (kept as a follow-up; see Risks).
- Not resolving deployment/CI (out of scope, as in the hub change).

## Decisions

### Decision 1: Full port over bridge or chrome-only

Adopt the Liquid Glass tokens as the only palette and **rewrite** the four components, rather than (a) a compatibility bridge aliasing old→new tokens, or (b) applying only chrome overrides.

- **Why:** The user's intent is one unified GuateGeeks brand; CiudadBots explicitly becomes coral. A bridge would leave dual vocabularies and a lingering teal identity in the DOM; chrome-only would produce a visually split site (coral chrome, teal content).
- **Alternatives considered:** *Bridge layer* (map `--gg-teal → --gg-sky-500`, etc.) — lower effort, keeps components untouched, but preserves the teal look we want gone and leaves debt. *Chrome-only* — fastest, but fails the "unified brand" goal.

### Decision 2: Port the Liquid Glass CSS as the base, then reconcile component styles

Replace `src/css/custom.css` wholesale with the `equipos-educativos` version, then update each component's `*.module.css` (and any inline colors in TSX) to consume the new tokens. Map retired tokens to their Liquid Glass equivalents case-by-case rather than mechanically:

```
retired (teal)      →  Liquid Glass replacement
────────────────       ─────────────────────────────
--gg-teal           →  --gg-coral-500 (accent) or --gg-sky-500 (secondary accent)
--gg-teal-soft      →  rgba(239,133,86,0.08) tint / --glass-bg-card
--gg-ink            →  --ifm-font-color-base (theme text)
--gg-ink-2          →  muted text (--ifm-color-emphasis-700)
--gg-paper          →  page background (--ifm-background-color)
--gg-card           →  --glass-bg-card (or a solid surface where glass is inappropriate)
--gg-line           →  --glass-border / --ifm-color-emphasis-300
--gg-gold           →  a plum or coral accent (design call per usage)
--gg-radius (16px)  →  keep 16–20px literal to match glass-card radius
```

- **Why:** Some retired tokens are semantic (ink = text, line = border, paper = bg) and map to Infima theme variables that already flip for dark mode; others are accents needing a design decision. Mechanical aliasing would miss dark-mode correctness.
- **Alternative considered:** Introduce semantic aliases in `custom.css` (e.g. re-add `--gg-line: var(--glass-border)`) to minimize component edits — rejected because it re-introduces the vocabulary we're retiring and muddies the single-source goal.

### Decision 3: Port swizzled theme components verbatim, then verify against hub's Docusaurus version

Copy `src/theme/DocRoot/Layout/Sidebar/ExpandButton` and `src/theme/DocSidebar` from `equipos-educativos` and set `themeConfig.docs.sidebar.hideable: true`.

- **Why:** The user selected swizzled components as in-scope; they carry the hideable-sidebar UX. Verbatim port preserves tested behavior.
- **Watch-out:** `equipos-educativos` pins Docusaurus `3.9.2` while the hub is on `^3.6.0`. Swizzled internals can drift between minor versions, so the ejected components must be checked against the hub's resolved Docusaurus theme API (see Risks).

### Decision 4: Keep the Google Fonts `@import`, flag self-hosting as follow-up

Port the `@import` for Barlow / Barlow Condensed / JetBrains Mono as-is.

- **Why:** Matches `equipos-educativos`, zero build wiring, keeps this change purely visual.
- **Alternative considered:** Self-host via `@fontsource/barlow` — better performance/privacy/offline, but adds a dependency and build wiring; deferred to keep scope tight.

## Risks / Trade-offs

- **[Undefined-variable regressions]** Missing a retired-token reference leaves a component styled by the CSS fallback (often unstyled/black). → Grep the whole `src/` tree for every retired token before and after; the spec's "no undefined tokens" scenario is the acceptance gate. Verify visually in light **and** dark mode.
- **[Docusaurus version skew on swizzles]** Hub `^3.6.0` vs equipos `3.9.2` — a swizzled component may reference APIs that differ. → Diff against the hub's own `swizzle ... --eject` output for the same components; adjust imports/props as needed. Consider aligning the hub to a matching Docusaurus version.
- **[Render-blocking font fetch]** Remote `@import` blocks first paint and requires network. → Accept for now; follow-up to self-host. `font-display: swap` is already in the import URL.
- **[CiudadBots identity change is irreversible-in-perception]** Stakeholders who associate CiudadBots with teal will see coral. → This is the explicit, chosen intent (unify the brand); note it in release comms.
- **[Coordination with in-flight hub change]** `create-guategeeks-docusaurus-hub` is unarchived and also touches theming/config. → Land order matters; rebase this change's `custom.css`/config edits on whatever the hub change ships, or sequence this to apply after it.

## Migration Plan

1. Port `src/css/custom.css` (Liquid Glass) + fonts import; update `docusaurus.config.ts` `themeConfig` (colorMode, `docs.sidebar.hideable`, prism as needed).
2. Port swizzled `src/theme/*` components; reconcile against the hub's Docusaurus version.
3. Rewrite the four components' `*.module.css` (+ inline TSX colors) token-by-token per the mapping table.
4. Grep `src/` for retired tokens → expect zero hits.
5. `npm run build` + `npm run typecheck`; manually review every surface (home, a CiudadBots module, tracker, build guide, `/estudiante`, mobile nav) in light and dark.
6. **Rollback:** revert is a clean git revert of this change's files — `custom.css`, `src/theme/*`, and the four `*.module.css`/TSX files; no data or content is touched.

## Open Questions

- Should the hub align its Docusaurus version to `3.9.2` (matching equipos) to de-risk the swizzles, or stay on `^3.6.0` and adapt them?
- For the two accent-only retired tokens (`--gg-gold`, secondary `--gg-teal` uses), which Liquid Glass accent is preferred per surface — plum, sky, or a coral tint?
- Do we want to fold this into the `create-guategeeks-docusaurus-hub` change instead of running it as a separate follow-on, given both edit `custom.css` and the config?
