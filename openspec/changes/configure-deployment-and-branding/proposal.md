## Why

The hub builds and themes cleanly but is not launch-ready. Two gaps surfaced during visual review: (1) deployment was explicitly out of scope for both prior changes, so the config still carries placeholder hosting values (`url: 'https://programas.guategeeks.gt'`, `baseUrl: '/'`) that don't match any real target and would 404 assets on GitHub Pages; and (2) the theme port brought over the CSS design system but not the brand image assets — the browser tab renders the full 24KB logo squeezed into a favicon, and link previews reuse that logo instead of a proper Open Graph card. This change makes the hub deployable to GitHub Pages and gives it proper favicon/OG assets.

## What Changes

- Set the hosting target to **GitHub project pages**: update `docusaurus.config.ts` to `url: 'https://guategeeks.github.io'` and `baseUrl: '/programas-educativos/'`, and align `organizationName`/`projectName` to the real GitHub org/repo casing.
- Add a **CI deploy workflow** at `.github/workflows/deploy.yml` mirroring the equipos setup: on push to `main`, `npm ci` → `npm run build` → `peaceiris/actions-gh-pages` publishes `build/` to the `gh-pages` branch. **Note:** this uses the peaceiris action, not the `docusaurus deploy` command — the existing `deploy` npm script remains available for manual use but is not exercised by CI.
- Generate proper **branding assets from the hub's own `guategeeks-logo.png`**: a multi-size `favicon.ico` and a 1200×630 `social-card.png`, placed in `static/img/`.
- Wire the new assets into `docusaurus.config.ts`: `favicon: 'img/favicon.ico'` and `themeConfig.image: 'img/social-card.png'` (navbar logo keeps the existing PNG — there is no vector source to make a clean SVG).
- Audit for any hardcoded root-absolute paths that would break under the non-root `baseUrl`.
- Record the one-time manual step: enabling GitHub Pages (serve from `gh-pages` branch) in repository settings.

## Capabilities

### New Capabilities

- `site-deployment`: The build-and-publish pipeline and hosting configuration — GitHub project-pages `url`/`baseUrl`, correct org/project identity, `trailingSlash` handling, and a CI workflow that builds the bilingual site and publishes it to `gh-pages` on every push to `main`.
- `brand-assets`: The resolvable brand image assets and their config wiring — a proper `favicon.ico` and Open Graph `social-card.png` derived from the hub logo, so browser tabs and social/link previews render correct GuateGeeks branding.

### Modified Capabilities

_None — `openspec/specs/` is empty (the `docs-platform` and `visual-design-system` capabilities from the two prior changes are unarchived). `brand-assets` overlaps conceptually with the "Hub branding" requirement in the in-flight `docs-platform` spec and the logo mention in `visual-design-system`; that overlap is noted in Impact rather than expressed as a delta, since neither is promoted yet._

## Impact

- **Config**: `docusaurus.config.ts` — `url`, `baseUrl`, `organizationName`, `projectName`, `favicon`, `themeConfig.image`, and (new) explicit `trailingSlash`.
- **New CI**: `.github/workflows/deploy.yml` (the hub has no `.github/` yet). Requires the repo's default `GITHUB_TOKEN` (write permission) and a one-time GitHub Pages settings change (serve from `gh-pages`).
- **New assets**: `static/img/favicon.ico`, `static/img/social-card.png`. Generating a true multi-size `.ico` needs an encoder — a small build dependency (`sharp` + `png-to-ico`) and/or a one-off generation script (mirroring the equipos `scripts/seed-images.mjs` pattern).
- **baseUrl change is potentially breaking for links**: moving from `/` to `/programas-educativos/` means any root-absolute path (`/img/...`, `/ciudadbots/...` written as raw HTML/markdown hrefs) must go through Docusaurus link/asset resolution or it will 404. Docusaurus-native `to:` links, `useBaseUrl`, and `img/...` config values are handled automatically.
- **Relationship to prior changes**: complements `create-guategeeks-docusaurus-hub` (which deferred deployment) and `adopt-liquid-glass-theme` (which handled CSS but not image assets). No code from those changes is altered except the shared `docusaurus.config.ts`.
- **Out of scope**: custom-domain hosting, an SVG navbar logo (no vector source), and any change to the `docusaurus deploy` command path beyond leaving the npm script intact.
