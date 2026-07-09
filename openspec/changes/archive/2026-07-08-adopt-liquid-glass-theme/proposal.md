## Why

The root hub (`programas-educativos`) currently ships a minimal 45-line theme built on a teal-primary "CiudadBots publication" token set (`--gg-ink`, `--gg-teal`, `--gg-paper`, `--gg-gold`), while the sibling `equipos-educativos` site has a fully-developed **GuateGeeks Liquid Glass** design system: a coral/sky/plum palette, glass surface tokens and utilities, Barlow typography, and consistent chrome (navbar/sidebar/button/footer) overrides. The two GuateGeeks properties look like different products. To present one coherent GuateGeeks brand across every program, the hub should adopt the Liquid Glass system as its single source of visual truth — coral becomes the primary everywhere, including CiudadBots.

## What Changes

- Replace the hub's teal-primary `src/css/custom.css` with the **GuateGeeks Liquid Glass** design system ported from `equipos-educativos`: coral (`#ef8556`) primary via `--ifm-color-primary-*`, the numbered coral/sky/plum scales, and the `--glass-*` surface tokens (light + dark mode).
- Adopt **Barlow + Barlow Condensed** as the base/heading typography (JetBrains Mono for code), wired the same way `equipos-educativos` does it.
- Bring over the reusable **glass utility classes** (`glass-panel`, `glass-card`, `text-gradient-coral`, `text-gradient-multi`, `glow-coral`) and the **chrome overrides** (navbar liquid-glass backdrop, sidebar active states, button gradients, footer blur, focus ring, scrollbar, reduced-motion).
- Bring over the **swizzled theme components** from `equipos-educativos` (`DocRoot/Layout/Sidebar/ExpandButton`, `DocSidebar`) and enable the hideable sidebar behavior in `docusaurus.config.ts`.
- **BREAKING (visual):** Rewrite the four existing CiudadBots components — `Module`, `ProgressTracker`, `BuildGuide`, `CityBotsHero` — and their `*.module.css` from the retired teal `--gg-*` vocabulary (`--gg-teal`, `--gg-ink`, `--gg-line`, `--gg-paper`, `--gg-gold`, `--gg-radius`, ~55 references) onto the Liquid Glass tokens. CiudadBots is re-skinned coral; its teal identity is retired.
- Update `docusaurus.config.ts` `themeConfig` (color mode, prism, docs sidebar `hideable`) to match the new system where it affects theming.

## Capabilities

### New Capabilities

- `visual-design-system`: The GuateGeeks Liquid Glass design system as the hub's single theming contract — the coral/sky/plum + glass design tokens (light/dark), Barlow typography, reusable glass utility classes, Docusaurus chrome overrides, swizzled sidebar theme components, and the requirement that all first-party program components consume these shared tokens rather than a per-program palette.

### Modified Capabilities

_None — `openspec/specs/` is currently empty (the `create-guategeeks-docusaurus-hub` change that introduces `docs-platform` is still in flight and unarchived), so there is no promoted capability whose requirements this change alters._

## Impact

- **Styling source of truth**: `src/css/custom.css` is replaced (45 → ~350 lines). All `--gg-teal*/--gg-ink*/--gg-paper/--gg-gold/--gg-line/--gg-radius` token references are removed from the codebase.
- **Components rewritten**: `src/components/Module`, `src/components/ProgressTracker`, `src/components/BuildGuide`, `src/components/CityBotsHero` (TSX where colors are inline, and each `styles.module.css`).
- **New source**: `src/theme/DocRoot/Layout/Sidebar/ExpandButton/*` and `src/theme/DocSidebar/*` (swizzled), plus `docusaurus.config.ts` `themeConfig.docs.sidebar.hideable`.
- **Fonts**: adds a Google Fonts `@import` (Barlow / Barlow Condensed / JetBrains Mono) — a render-blocking external fetch; self-hosting is noted as a follow-up option in design.
- **No content or routing changes**: docs, MDX, data model, i18n, and `/estudiante` routes are untouched — this is purely a theming/visual migration.
- **Relationship to in-flight hub change**: `create-guategeeks-docusaurus-hub` scopes theming only as "present GuateGeeks branding (logo, theme)"; this change makes that theming requirement concrete. Sequencing/merge coordination between the two changes is a known consideration.
