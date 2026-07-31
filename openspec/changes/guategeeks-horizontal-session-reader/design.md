## Context

GuateGeeks already has 12 SMARS session pages under `docs/guategeeks/`. Each page uses `SessionModule` for the pedagogical structure and supplies four `SessionModule.Phase` children: Activar, Explorar, Crear, and Reflexionar. `SessionModule` currently renders those phases through the shared `PhaseTimeline`, which produces stacked vertical cards. Supplemental SMARS images are authored after the module as plain Markdown image blocks, also in a vertical flow.

That structure is correct pedagogically, but the reading experience is not doing enough work. The most important steps look like dense documentation instead of a guided sequence, and the images are helpful but not presented as a coherent visual guide.

Existing constraints:

- `PhaseTimeline` is shared with CiudadBots and showcase content, so changing it directly risks unintended layout regressions outside GuateGeeks.
- `SessionModule` deliberately keeps phase bodies compact and text-only.
- The L293D visual build change already added local SMARS images and asked that visual content remain supplemental after the module.
- Docusaurus SSR and MDX compilation must continue to work without browser-only assumptions during build.
- The Liquid Glass design system and existing component tokens should be reused instead of introducing a separate GuateGeeks palette.

## Goals / Non-Goals

**Goals:**

- Present GuateGeeks implementation phases as a horizontal, page-like sequence.
- Improve supplemental SMARS image sections with a guided visual sequence component.
- Preserve the current MDX authoring pattern for session phases and avoid embedding images inside `SessionModule.Phase`.
- Keep CiudadBots and existing `BuildGuide` behavior stable.
- Support desktop, mobile, keyboard navigation, reduced motion, print, and production build verification.

**Non-Goals:**

- Do not rewrite GuateGeeks curriculum content or change the 12-session structure.
- Do not move visual construction content into phase bodies.
- Do not redesign Docusaurus global chrome, sidebars, tabs, CNB, rubric, STL viewer, or Arduino code panels.
- Do not add a carousel dependency; React state and CSS are sufficient.
- Do not convert every Markdown image in the entire docs tree, only GuateGeeks session imagery relevant to the guided reading experience.

## Decisions

### D1: Add a GuateGeeks phase reader instead of changing `PhaseTimeline`

Create a new horizontal phase reader component and have `SessionModule` use it in the `Implementación` tab for GuateGeeks. Leave `PhaseTimeline` unchanged for CiudadBots and any existing consumers.

The reader should receive the same `Phase[]` shape already collected by `SessionModule`, so the compound-component MDX contract does not change:

```
Session MDX
    │
    ▼
<SessionModule.Phase> children
    │ collectChildren()
    ▼
Phase[]
    │
    ├─ old shared path: <PhaseTimeline>       CiudadBots / existing use
    │
    └─ new GuateGeeks path: <HorizontalPhaseReader>
```

Rationale: this gives GuateGeeks the requested horizontal reading model without destabilizing the mature CiudadBots module layout.

Alternatives considered:

- Modify `PhaseTimeline` globally. Rejected because it would change CiudadBots and showcase layout.
- Re-author every phase as custom MDX. Rejected because it breaks validation and repeats layout logic across 12 files.
- Use CSS only to make existing cards scroll horizontally. Rejected as the primary approach because the UX needs current-page state, navigation controls, accessibility labels, and print fallback.

### D2: Use scroll-snap pages with explicit controls

The phase reader should render all four phase panels in DOM order inside a horizontal scroll-snap track, with previous/next buttons, direct phase selectors, a current-step counter, and keyboard support for ArrowLeft/ArrowRight.

Expected interaction:

```
┌─────────────────────────────────────────────────────────┐
│  1 Activar   2 Explorar   3 Crear   4 Reflexionar       │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  Página actual: title, time label, body                 │
│                                                         │
├─────────────────────────────────────────────────────────┤
│  Anterior                         Paso 2 de 4  Siguiente│
└─────────────────────────────────────────────────────────┘
```

Rationale: scroll-snap keeps the model readable on touch devices while stateful controls make the sequence obvious on desktop.

Implementation notes:

- Keep phase content visible to screen readers in the same logical order.
- Use `aria-current` or equivalent state on phase selectors.
- Clamp navigation at the first and last phase.
- Respect `prefers-reduced-motion` by disabling smooth scrolling or animated transitions.
- For print styles, render all phases vertically so printed teacher material remains complete.

### D3: Create a `VisualStepGuide` for session imagery

Introduce a reusable visual sequence component for GuateGeeks supplemental images. It should accept a title and an ordered list of steps with image source, alt text, short heading, and explanatory body/caption.

Example authoring shape:

```tsx
<VisualStepGuide
  title="Guía visual de construcción mecánica"
  steps={[
    {
      image: '/assets/guategeeks/smars/soldering-motors.webp',
      alt: 'Cables soldados a los terminales de un motorreductor N20',
      title: 'Preparar los motores',
      body: 'Cada motor necesita dos cables firmes y distinguibles...',
    },
  ]}
/>
```

The component should present one primary image at a time, with caption, previous/next controls, step counter, and optional thumbnail strip when there is more than one image.

Rationale: the images become intentional steps rather than isolated blocks. This also gives maintainers a consistent place to enforce alt text and captions.

Alternatives considered:

- Reuse `BuildGuide` directly. Rejected because `BuildGuide` assumes sequential numbered image paths and does not carry per-step captions.
- Keep Markdown images and rely on CSS. Rejected because Markdown images do not provide navigation, grouping, or per-step state.
- Add images into `SessionModule.Phase`. Rejected because existing specs and layout constraints keep phase bodies compact and text-only.

### D4: Convert high-value GuateGeeks image sections first

The first implementation pass should convert visual sections in sessions that already have meaningful SMARS imagery:

- `01-sistemas-del-robot.mdx`
- `03-slicer-y-tolerancias.mdx`
- `04-impresion-y-control-de-calidad.mdx`
- `05-ensamblaje-de-orugas.mdx`
- `07-dos-motores-y-direccion.mdx`
- `10-integracion-autonoma.mdx`
- `12-reto-integrador.mdx`

The session phase reader applies to every GuateGeeks session automatically through `SessionModule`; the visual guide conversion only changes pages with supplemental images.

Rationale: this delivers the broad reading improvement everywhere while focusing manual MDX changes where images materially improve comprehension.

### D5: Preserve layout and build guarantees

Both new components should use CSS modules, existing design tokens, stable dimensions, and responsive constraints. Images should use Docusaurus-compatible static paths, `loading="lazy"`, and normal `<img>` rendering unless the local codebase already has a stronger image abstraction.

Verification should include:

- `npm run build`
- manual or automated viewport checks for at least one low-image session and one image-heavy session
- search/audit that supplemental image sections converted to `VisualStepGuide` still have meaningful alt text

## Risks / Trade-offs

- Horizontal readers can hide later steps if controls are unclear -> Use visible selectors, counters, and previous/next controls; keep all phases printable.
- Scroll position and React state can drift -> Use a single active index source and update it from both button actions and scroll events with clamping.
- Mobile text overflow in compact controls -> Use stable button dimensions, wrapping labels, and shorter visible labels where needed.
- Replacing Markdown images with JSX arrays can make MDX noisier -> Keep conversion limited to visual sections and use a small, predictable data shape.
- Existing `Module` stylesheet is reused by `SessionModule` -> Add component-local CSS for the new reader instead of stretching shared module styles beyond their current purpose.
- Lightbox behavior may duplicate `BuildGuide` -> Start without a lightbox unless image inspection requires it; if added, follow `BuildGuide` keyboard and close behavior.

## Migration Plan

1. Add the horizontal phase reader component and CSS.
2. Update `SessionModule` to render the new reader in the GuateGeeks implementation tab.
3. Add `VisualStepGuide` and CSS.
4. Convert high-value GuateGeeks visual Markdown sections to `VisualStepGuide`.
5. Verify build, responsiveness, keyboard navigation, reduced motion, and print layout.
6. Rollback strategy: restore `SessionModule` to `PhaseTimeline` and replace `VisualStepGuide` blocks with the previous Markdown image sections.

## Open Questions

- Should `VisualStepGuide` include an enlarged image view in the first implementation, or is the primary image with thumbnails enough?
- Should phase selectors show full labels (`Activar`, `Explorar`, `Crear`, `Reflexionar`) on mobile, or abbreviated labels plus accessible names?
- Should sessions 2, 6, 8, 9, and 11 receive new visual guide blocks later if suitable images are added, or remain text-first for now?
