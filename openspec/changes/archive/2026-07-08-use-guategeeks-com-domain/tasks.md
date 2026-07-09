## 1. Config

- [x] 1.1 In `docusaurus.config.ts` set `url: 'https://guategeeks.com'` (was `https://guategeeks.github.io`); `baseUrl: '/programas-educativos/'`, `organizationName`, `projectName`, `trailingSlash`, and the deploy workflow left unchanged
- [x] 1.2 Confirmed no `static/CNAME` exists (domain is owned/propagated by the org user-pages repo)

## 2. Verify

- [x] 2.1 `npm run build` passes for both locales (exit 0)
- [x] 2.2 Build output confirmed: canonical link, `og:url`, `og:image`/`twitter:image`, and `sitemap.xml` all use `https://guategeeks.com/programas-educativos/`; no stray `guategeeks.github.io` references remain
- [x] 2.3 Confirmed no `CNAME` file emitted into `build/`
- [ ] 2.4 **User action (post-deploy):** confirm `https://guategeeks.com/programas-educativos/` loads live (depends on the org-pages custom domain, which this repo does not control)
