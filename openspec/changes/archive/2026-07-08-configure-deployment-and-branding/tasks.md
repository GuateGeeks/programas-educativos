## 1. Hosting configuration

- [x] 1.1 In `docusaurus.config.ts` set `url: 'https://guategeeks.github.io'` and `baseUrl: '/programas-educativos/'`
- [x] 1.2 Set `organizationName: 'GuateGeeks'` / `projectName: 'programas-educativos'` (confirmed from the git remote `git@github.com:GuateGeeks/programas-educativos.git`)
- [x] 1.3 Add explicit `trailingSlash` — set to **`true`** (not `false` as originally planned): `false` broke the overview's `./slug` relative links under baseUrl; see design.md resolution.

## 2. Brand assets

- [x] 2.1 Added a reproducible generator at `scripts/generate-brand-assets.py`. **Deviation from plan:** used **Pillow** (already available) instead of adding `sharp` + `png-to-ico` dev deps — resolves the design open-question toward the leaner "commit outputs, no new native deps" path. No `package.json` change.
- [x] 2.2 Generated `static/img/favicon.ico` (16/32/48/64) from `static/img/guategeeks-logo.png`
- [x] 2.3 Generated `static/img/social-card.png` (1200×630, dark brand gradient + centered logo + coral base bar)
- [x] 2.4 Wired `favicon: 'img/favicon.ico'` and `themeConfig.image: 'img/social-card.png'` in `docusaurus.config.ts` (navbar logo keeps the existing PNG)

## 3. baseUrl safety audit

- [x] 3.1 Grepped TSX/MDX/CSS for root-absolute references. Findings: `<Link to="/…">` (index.tsx), `useBaseUrl(PROGRAMS_BASE…)` (Module), `useBaseUrl(pagePath…)` (BuildGuide), `useBaseUrl(pdf)`, and an idiomatic `[…](/estudiante)` markdown link — all route through Docusaurus baseUrl resolution.
- [x] 3.2 No raw baseUrl-bypassing paths needed fixing. Confirmed definitively by the `onBrokenLinks: 'throw'` build passing under the new baseUrl.

## 4. CI deploy workflow

- [x] 4.1 Added `.github/workflows/deploy.yml`: push to `main`, `permissions: contents: write`, checkout (fetch-depth 0), setup-node 22 + npm cache, `npm ci`, `npm run build`
- [x] 4.2 Added the `peaceiris/actions-gh-pages@v3` publish step (`publish_dir: ./build`, `github_token: ${{ secrets.GITHUB_TOKEN }}`)

## 5. Verify

- [x] 5.1 `npm run build` passes for both locales (es + en), including the `onBrokenLinks: 'throw'` check
- [x] 5.2 Runtime smoke test via `docusaurus serve`: `/programas-educativos/`, `/ciudadbots/`, `/estudiante/`, `/img/favicon.ico`, `/img/social-card.png` all return **200**; bare `/` returns 302 → baseUrl. (A human visual click-through is still recommended, but routing/asset resolution is confirmed.)
- [x] 5.3 Built `<head>` confirmed: `<link rel="icon" href="/programas-educativos/img/favicon.ico">` and `og:image`/`twitter:image` → `https://guategeeks.github.io/programas-educativos/img/social-card.png`
- [ ] 5.4 **User action:** push to `main` and confirm the workflow runs green and publishes to `gh-pages` (requires a push — not done autonomously)
- [ ] 5.5 **User action:** enable GitHub Pages (serve from `gh-pages` branch) in repo Settings, then confirm the live URL loads (requires repo admin)
