## Why

The current homepage lists the active programs, but it does not yet feel like the main entry point
to a GuateGeeks educational platform. The folder
`programas-educativos-propuesta-sin-ciudadbots-programas/` already contains a stronger platform
concept organized by learning levels and program cards, and the user has confirmed ownership of
that content.

## What Changes

- Replace the current simple homepage with a platform-style landing experience for GuateGeeks
  educational programs.
- Adapt the static proposal's three-level model — Explorador, Constructor, Creador — into the
  Docusaurus homepage rather than copying standalone HTML pages.
- Present current and future programs as platform cards with status, level, complexity, summary,
  tags, and route actions.
- Preserve existing live program routes: `/ciudadbots`, `/guategeeks`, `/tiempo-circular`, and
  `/estudiante`.
- Reuse the proposal's owned visual assets by moving appropriate images into Docusaurus static
  assets with stable paths.
- Keep all homepage UI copy compatible with Docusaurus i18n instead of the proposal's
  `localStorage` language switcher.
- Keep this change scoped to the homepage/platform entry point and static assets; existing program
  docs, sidebars, module pages, student mode behavior, and curriculum content should remain stable.

## Capabilities

### New Capabilities

- None.

### Modified Capabilities

- `docs-platform`: the hub landing page changes from a simple program list into a platform
  homepage organized by learning levels, available/upcoming program cards, Docusaurus-resolved
  platform imagery, and stable links into existing program namespaces.

## Impact

- Affected code: `src/pages/index.tsx`, `src/pages/index.module.css`, and possibly small supporting
  data/types colocated with the homepage if the card data becomes too large for inline JSX.
- Affected assets: selected images from
  `programas-educativos-propuesta-sin-ciudadbots-programas/assets/**` copied into `static/` under a
  stable platform asset namespace.
- Affected localization: homepage strings rendered through Docusaurus translation APIs and English
  translations updated where needed.
- Affected verification: Docusaurus typecheck/build, homepage visual checks at desktop/mobile
  widths, route checks for every available program card, and asset path checks under the configured
  `/programas-educativos/` base URL.
- Dependencies: no new runtime dependency is expected.
