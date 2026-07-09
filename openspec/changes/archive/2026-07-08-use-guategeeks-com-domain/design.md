## Context

`configure-deployment-and-branding` shipped the hub on GitHub project pages with an interim origin `url: 'https://guategeeks.github.io'` and `baseUrl: '/programas-educativos/'`. The canonical home is the org custom domain. Investigation of the sibling site confirmed the mechanism: `equipos-educativos` uses `url: 'https://guategeeks.com'`, `baseUrl: '/equipos-educativos'`, has **no** `static/CNAME`, and its workflow publishes to `gh-pages` — yet it serves at `guategeeks.com/equipos-educativos`. This is only possible because the org's user-pages repo (`guategeeks.github.io`) owns the `guategeeks.com` custom domain, which GitHub propagates to all project repos as `guategeeks.com/<repo>/`. This change applies the same pattern to the hub.

## Goals / Non-Goals

**Goals:**
- Make `https://guategeeks.com` the canonical origin for the hub's absolute URLs.
- Keep the site at the `/programas-educativos/` project path (mirror equipos exactly).

**Non-Goals:**
- Apex-root hosting (`baseUrl: '/'`) — explicitly rejected; it would seize the domain and break the org root + equipos.
- Adding/managing a CNAME or DNS in this repo.
- Any change to the deploy workflow, `trailingSlash`, org/project names, or assets.

## Decisions

### Decision 1: Change only `url`; keep `baseUrl` and add no CNAME

Set `url: 'https://guategeeks.com'`; leave `baseUrl: '/programas-educativos/'`; do not add `static/CNAME`.

- **Why:** Matches the proven equipos setup. The org user-pages repo owns the domain and propagates it; a per-repo CNAME would override that and claim the apex for this repo, breaking `guategeeks.com` root and equipos's path.
- **Alternative considered:** Apex root (`baseUrl: '/'` + CNAME) — rejected by the user in favor of the subpath; carries domain-seizure risk.

### Decision 2: Verify via the built origin, not just the field

Confirm the change through generated absolute URLs (canonical, sitemap, OG image) pointing at `guategeeks.com/programas-educativos/`, and confirm no `CNAME` file is emitted into `build/`.

- **Why:** The `url` field only surfaces in absolute-URL contexts; a build-output check is the real proof the origin propagated correctly.

## Risks / Trade-offs

- **[Org domain assumption]** If `guategeeks.github.io` does not actually have `guategeeks.com` set as its Pages custom domain, the hub would 404 at `guategeeks.com/programas-educativos/` despite a correct config. → Out of this repo's control; equipos being live at `guategeeks.com/equipos-educativos` is strong evidence it's already configured. Confirm the hub URL loads after deploy.
- **[Two unarchived changes touch `url`]** `configure-deployment-and-branding` still carries `url: github.io`. → This change supersedes it; apply/archive them together so `site-deployment` settles on `guategeeks.com`.
- **[Local build unaffected]** `baseUrl` is unchanged, so local `npm run build`/`serve` behavior is identical; only absolute origins differ.

## Migration Plan

1. Edit `docusaurus.config.ts`: `url` → `https://guategeeks.com` (leave `baseUrl`, workflow, everything else).
2. `npm run build`; grep the built output to confirm canonical/sitemap/OG absolute URLs use `guategeeks.com/programas-educativos/` and that no `build/CNAME` exists.
3. Deploy (existing workflow) and confirm `https://guategeeks.com/programas-educativos/` loads.
4. **Rollback:** revert the single `url` line.

## Open Questions

- Confirm the `guategeeks.github.io` org-pages repo has `guategeeks.com` as its verified Pages custom domain (assumed from equipos being live).
- Long-term: should the hub eventually become the `guategeeks.com` apex root (a larger, separate change), or stay a peer project under the shared domain alongside equipos?
