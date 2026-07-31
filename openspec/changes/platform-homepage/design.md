## Context

The current Docusaurus homepage is a concise hub card list for CiudadBots, GuateGeeks SMARS, and
Tiempo Circular. That is functional, but it does not yet communicate the broader GuateGeeks
platform model or the future program portfolio.

The folder `programas-educativos-propuesta-sin-ciudadbots-programas/` contains a static microsite
proposal with:

- `index.html` presenting three levels: Explorador, Constructor, Creador.
- three separate level HTML pages with program cards.
- owned image assets for each level and each proposed program.
- a small custom ES/EN language switcher implemented with `localStorage`.

The live site is Docusaurus with `routeBasePath: '/'`, Spanish as default locale, English as an
additional locale, program namespaces under `/ciudadbots`, `/guategeeks`, `/tiempo-circular`, and
student mode under `/estudiante`. Existing program docs are not static HTML microsites; they are
Docusaurus docs and React components.

## Goals / Non-Goals

**Goals:**

- Make `/` feel like the main GuateGeeks educational platform entry point.
- Adapt the proposal's level taxonomy and program-card model into the existing Docusaurus homepage.
- Show active and upcoming programs without broken links.
- Preserve all existing live routes and program documentation behavior.
- Reuse owned proposal assets through Docusaurus static asset paths.
- Keep homepage copy localizable through Docusaurus i18n.
- Build and render cleanly at desktop and mobile widths.

**Non-Goals:**

- Do not copy the standalone HTML pages into `static/` as parallel routes.
- Do not add `/nivel-explorador`, `/nivel-constructor`, or `/nivel-creador` routes in this first
  implementation.
- Do not migrate the proposal's `constructores/ciudadbots` HTML/PDF/page-image bundle; the live
  CiudadBots Docusaurus content already owns that program route.
- Do not rewrite CiudadBots, GuateGeeks SMARS, Tiempo Circular, sidebars, module pages, student
  mode, or curriculum content.
- Do not add a runtime dependency or a separate routing framework.

## Decisions

### D1: Convert the proposal into one Docusaurus homepage

Implement the platform as a redesigned `src/pages/index.tsx` backed by
`src/pages/index.module.css`. The level pages in the proposal become homepage sections rather than
separate routes.

Rationale: the user's request is specifically for the main site page to become a platform. A single
homepage gives visitors the whole ecosystem immediately while avoiding new route maintenance.

Alternative considered: copy the static microsite into `static/` and link to it. Rejected because
it would bypass Docusaurus i18n, duplicate navigation, ignore the current program namespaces, and
create stale CiudadBots links.

### D2: Use a typed, data-driven homepage model

Represent levels and program cards as local typed arrays in `src/pages/index.tsx` unless the file
becomes too large, in which case move data to a colocated `src/pages/platformData.ts`.

Suggested shape:

```ts
type ProgramStatus = 'available' | 'upcoming';
type ProgramComplexity = 'novato' | 'geek' | 'pro';

interface PlatformProgram {
  title: string;
  status: ProgramStatus;
  complexity: ProgramComplexity;
  image: string;
  summary: React.ReactNode;
  tags: readonly string[];
  href?: string;
  secondaryHref?: string;
}

interface PlatformLevel {
  id: 'explorador' | 'constructor' | 'creador';
  title: string;
  image: string;
  purpose: React.ReactNode;
  programs: readonly PlatformProgram[];
}
```

Rationale: this avoids repeated JSX blocks and makes future program additions a data edit rather
than a layout rewrite.

Alternative considered: hardcode every card directly in JSX. Acceptable for a tiny page, but less
maintainable as the platform grows.

### D3: Place current programs into the level taxonomy

Use the static proposal as the base taxonomy, then insert the live programs:

```text
Explorador
├─ Circuitos en Acción        upcoming
├─ Rutas con Tale-Bot         upcoming
└─ Mundo Aumentado            upcoming

Constructor
├─ CiudadBots Guatemala       available -> /ciudadbots
├─ GuateGeeks SMARS           available -> /guategeeks
├─ Rescate Makerzoid          upcoming
└─ Expediciones VR            upcoming

Creador
├─ Tiempo Circular            available -> /tiempo-circular
├─ SmartLab Wearables         upcoming
├─ Estudio IA Creativa        upcoming
└─ FabLab 3D                  upcoming
```

Rationale: CiudadBots and GuateGeeks SMARS are construction/robotics programs; Tiempo Circular is a
display/interface project that fits the creation/prototyping progression better than the static
proposal's original empty Creador level.

Alternative considered: keep only CiudadBots available as in the static proposal. Rejected because
the live platform already contains GuateGeeks SMARS and Tiempo Circular, and hiding them would make
the homepage less useful.

### D4: Copy only selected proposal assets into Docusaurus static assets

Copy level and program images from:

- `programas-educativos-propuesta-sin-ciudadbots-programas/assets/nivel-*.png`
- `programas-educativos-propuesta-sin-ciudadbots-programas/assets/programas/*.png`

to a stable namespace such as:

```text
static/assets/platform/
├─ levels/
└─ programs/
```

Do not copy `constructores/ciudadbots/**` for this change.

Resolve images in React through `useBaseUrl` so the deployed `/programas-educativos/` base URL is
handled correctly.

Rationale: the selected images support the platform homepage directly. The CiudadBots construction
bundle is unrelated to this homepage migration and would add asset weight without changing the
entry point.

Alternative considered: import image files from the proposal folder in JSX. Rejected because that
folder is an untracked proposal source and not a stable web asset namespace.

### D5: Use Docusaurus i18n instead of the static language switcher

All homepage labels, status text, actions, level copy, and card summaries should use
`<Translate>` or `translate()`. English strings should be captured in `i18n/en/code.json` if the
build/extraction flow requires explicit translation resources.

Rationale: the site already has locale routing and a navbar locale dropdown. A second
`localStorage` language switcher would conflict with that model.

Alternative considered: port the static `copy` object and `setLang` function. Rejected because it
does not integrate with Docusaurus locale URLs or theme translations.

### D6: Re-skin the static visual direction onto the current design system

Use the proposal's richer imagery and platform hierarchy, but style it with the existing
GuateGeeks Liquid Glass tokens and Docusaurus layout constraints. Avoid copying the proposal's
single beige/green palette literally; the homepage should remain consistent with the current
coral/sky/plum brand system and dark/light modes.

Rationale: the proposal provides content and information architecture. The live site already has a
shared visual design system that must remain the source of truth.

Alternative considered: paste the static CSS wholesale. Rejected because it would introduce a
parallel design language, duplicate global resets, and ignore dark mode.

## Risks / Trade-offs

- Large PNG assets increase page weight -> Copy only homepage-relevant images first and use
  constrained rendered sizes; optimize/compress assets if build or load checks show excessive size.
- Upcoming cards can feel like dead ends -> Show clear "Próximamente/Coming soon" state and omit
  hrefs for unavailable programs.
- The level taxonomy may evolve -> Keep it data-driven so programs can move levels later without
  layout surgery.
- Homepage translations can drift -> Use translation IDs consistently and verify `/en/` renders
  English copy.
- Existing in-progress changes may touch nearby files -> Read `src/pages/index.tsx`,
  `src/pages/index.module.css`, and `i18n/en/code.json` before editing, and work with any existing
  changes rather than reverting them.

## Migration Plan

1. Copy selected level and program images into `static/assets/platform/**`.
2. Replace `src/pages/index.tsx` with a data-driven platform homepage that renders levels and cards.
3. Replace or extend `src/pages/index.module.css` with responsive platform styles using existing
   design tokens.
4. Add or update English translations for homepage UI strings.
5. Verify typecheck/build.
6. Serve locally and inspect desktop and mobile viewports.
7. Check routes for all available cards and static asset resolution under `/programas-educativos/`.

Rollback strategy: restore the previous `src/pages/index.tsx` and `src/pages/index.module.css`, and
remove the copied `static/assets/platform/**` files if the platform homepage needs to be backed out.

## Open Questions

- Should level sections remain only on the homepage for now, or should a later change add dedicated
  `/niveles/<nivel>` pages?
- Should upcoming program cards collect interest/contact information later, or remain informational
  until content exists?
- Should image optimization convert the proposal PNGs to WebP during implementation, or should the
  first implementation copy the source PNGs and optimize as a follow-up?
