## Context

The hub compiles and themes cleanly but was never wired for a real host. `docusaurus.config.ts` carries placeholder deployment values (`url: 'https://programas.guategeeks.gt'`, `baseUrl: '/'`) with an in-code comment saying to replace them "when a hosting target is chosen." Separately, the Liquid Glass theme port brought the CSS system but not brand image assets, so the hub still uses `guategeeks-logo.png` for the favicon, the navbar logo, and the OG image — a full 24KB raster doing three jobs. The sibling `equipos-educativos` site models the target setup: a dedicated `favicon.ico`, `logo.svg`, `social-card.png`, and a `.github/workflows/deploy.yml` using `peaceiris/actions-gh-pages`.

Decisions from exploration: host on **GitHub project pages**, deploy via a **peaceiris CI workflow** (explicitly not the `docusaurus deploy` command, despite the initial phrasing), and **generate favicon/OG assets from the hub's own logo** (keep the hub's distinct identity rather than copying equipos's).

## Goals / Non-Goals

**Goals:**
- Make the hub deployable to `https://guategeeks.github.io/programas-educativos/` with correct asset/link resolution.
- Auto-deploy on push to `main` via CI, mirroring equipos's mechanism.
- Ship a proper `favicon.ico` and OG `social-card.png` derived from the hub logo.

**Non-Goals:**
- Custom-domain hosting (no CNAME/DNS in this change; the config keeps GitHub-pages values).
- An SVG navbar logo (no vector source exists; the PNG stays).
- Using the `docusaurus deploy` command in CI (peaceiris is the chosen path; the npm script is left intact for manual use).
- Any content, routing, or theme changes beyond the shared config.

## Decisions

### Decision 1: GitHub project pages, not custom domain

Set `url: 'https://guategeeks.github.io'`, `baseUrl: '/programas-educativos/'`.

- **Why:** Zero DNS/CNAME setup; stands up immediately on the existing repo. The placeholder custom domain (`programas.guategeeks.gt`) can be layered on later by swapping `url`/`baseUrl` and adding `static/CNAME` — a small future change.
- **Consequence:** the non-root `baseUrl` is the main risk surface (see Decision 4).

### Decision 2: peaceiris CI workflow, mirroring equipos

Add `.github/workflows/deploy.yml`: trigger on push to `main`, `permissions: contents: write`, `actions/checkout@v4` (fetch-depth 0), `actions/setup-node@v4` (node 22, npm cache), `npm ci`, `npm run build`, then `peaceiris/actions-gh-pages@v3` with `publish_dir: ./build` and `github_token: ${{ secrets.GITHUB_TOKEN }}`.

- **Why:** The user chose "match equipos." It's the least surprising thing for whoever maintains both sites, and the default `GITHUB_TOKEN` avoids managing SSH keys or a `GIT_USER`.
- **Alternatives considered:** *`docusaurus deploy` in CI* — what the user first named, but it needs `GIT_USER`/token plumbing and diverges from equipos. *GitHub-native `actions/deploy-pages`* — cleanest (no `gh-pages` branch) but different from the established pattern. Both rejected for consistency with equipos.
- **Bilingual note:** `npm run build` emits both locales into `build/` (`build/` = es, `build/en/` = en). Publishing `./build` ships both; no extra config.

### Decision 3: Generate favicon/OG from the hub logo via a small script

Produce `favicon.ico` (16/32/48) and `social-card.png` (1200×630) from `static/img/guategeeks-logo.png`. Since Docusaurus/`sharp` cannot emit `.ico` directly, use `sharp` (resize to PNGs) + `png-to-ico` (assemble the `.ico`), driven by a committed `scripts/` generator mirroring the equipos `seed-images.mjs` pattern, added as dev dependencies.

- **Why:** A reproducible, committed generator beats a hand-made binary — the assets can be regenerated if the logo changes. Mirrors how equipos manages images (`sharp` + a seed script).
- **Alternatives considered:** *Commit hand-generated binaries only* (no script/deps) — simplest, but not reproducible and easy to drift. *A PNG favicon at a fixed size* — avoids the `.ico` encoder but the user asked for a proper favicon. *Reuse equipos's assets* — rejected in the scope questions (hub keeps its own identity).
- **Open point:** whether to keep the generator + deps in the repo or run it once and commit only the outputs (see Open Questions).

### Decision 4: Treat the baseUrl change as the primary risk and audit for it

Before considering deploy done, grep for root-absolute references (`href="/..."`, `src="/..."`, `url(/...)`, hardcoded `/ciudadbots`/`/estudiante`/`/img` in raw HTML/MDX/CSS) that bypass Docusaurus resolution.

- **Why:** Docusaurus rewrites `to:` links, `useBaseUrl()`, `img/...` config values, and markdown asset imports automatically — but raw absolute paths are silently correct at `baseUrl: '/'` and silently 404 at `/programas-educativos/`. This is the classic project-pages footgun.
- **Verification:** build, then `npm run serve` (which serves under the real `baseUrl`) and click through home, a module, the build guide, and `/estudiante`.

## Risks / Trade-offs

- **[Root-absolute paths 404 under baseUrl]** Any hardcoded `/...` reference breaks only in production. → Audit grep (Decision 4) + `npm run serve` click-through before merge.
- **[GitHub Pages not enabled]** The workflow publishes `gh-pages`, but Pages must be pointed at that branch once in repo Settings, or the site 404s despite a green workflow. → Documented as an explicit one-time manual task.
- **[`.ico` toolchain]** `sharp` needs native binaries in CI if generation runs there. → Generate locally and commit the asset outputs; keep generation out of the deploy workflow.
- **[org/project casing]** `organizationName` casing must match the real GitHub org or edit-links/deploy identity drift. GitHub URLs are case-insensitive but be consistent (equipos uses `GuateGeeks`). → Confirm the real org handle when setting it.
- **[First deploy needs Pages bootstrap]** The `gh-pages` branch won't exist until the first successful run. → Expected; the action creates it.

## Migration Plan

1. Update `docusaurus.config.ts`: `url`, `baseUrl`, `organizationName`, `projectName`, `favicon`, `themeConfig.image`, explicit `trailingSlash`.
2. Add favicon/OG generator + dev deps; run it; commit `static/img/favicon.ico` and `static/img/social-card.png`.
3. Audit + fix any root-absolute paths.
4. Add `.github/workflows/deploy.yml` (peaceiris).
5. `npm run build` + `npm run serve`; click-through under the real `baseUrl` in es and en.
6. Push to `main`; confirm the workflow runs green and `gh-pages` is published.
7. One-time: enable GitHub Pages (serve from `gh-pages`) in repo settings; confirm the live URL loads.
8. **Rollback:** revert the config + workflow + asset commits; the site simply stops auto-deploying. No content is touched.

## Open Questions

- Keep the favicon/OG **generator script + `sharp`/`png-to-ico` dev deps** in the repo, or run once and commit only the output binaries (leaner deps, less reproducible)?
- Confirm the exact GitHub **org handle and repo name** casing (`guategeeks` vs `GuateGeeks`; `programas-educativos`).
- ~~`trailingSlash`: pick `false`~~ **Resolved during implementation → `true`.** With `false`, the docs overview at `/ciudadbots` (no trailing slash) resolved its idiomatic `./slug` relative links to the 12 modules as *siblings* under `baseUrl` (`/programas-educativos/slug`) instead of children, failing the `onBrokenLinks: 'throw'` build. `trailingSlash: true` serves the overview at `/ciudadbots/` so `./slug` → `/ciudadbots/slug/`. The theme-change build passed earlier only because trailingSlash was unset (default).
- Layer the **custom domain** (`programas.guategeeks.gt`) now as a follow-up change, or leave the GitHub-pages URL as the canonical home?
