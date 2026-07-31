## 1. Baseline and Integration Points

- [x] 1.1 Inspect `SessionModule`, `PhaseTimeline`, `BuildGuide`, and existing GuateGeeks session image sections to confirm current props, styling, and import patterns.
- [x] 1.2 Identify all GuateGeeks session pages that currently contain supplemental SMARS images and map each image group to a visual guide title and ordered step list.
- [x] 1.3 Confirm no implementation task requires a new runtime dependency; record any unavoidable dependency change before coding.

## 2. Horizontal Step Reader

- [x] 2.1 Add a reusable horizontal step reader component that accepts ordered step data, renders page-like panels, and exposes previous/next, direct step controls, and a current step counter.
- [x] 2.2 Add CSS module styles for desktop and mobile layouts with stable dimensions, scroll-snap behavior, no text overlap, and design-system token usage.
- [x] 2.3 Add keyboard navigation for ArrowLeft and ArrowRight, with clamped movement at the first and last step.
- [x] 2.4 Add accessible current-state semantics for the active step control and understandable labels for navigation controls.
- [x] 2.5 Add reduced-motion and print styles so motion preferences are respected and all steps print in document order.

## 3. GuateGeeks Phase Integration

- [x] 3.1 Update `SessionModule` so the `Implementación` tab renders GuateGeeks phases through the horizontal reader instead of the vertical `PhaseTimeline`.
- [x] 3.2 Preserve existing phase collection and validation behavior for `SessionModule.Phase` kinds and ordering.
- [x] 3.3 Verify sessions without sketches and sessions with sketches both render the horizontal reader correctly in the implementation tab.
- [x] 3.4 Verify CiudadBots and other existing `PhaseTimeline` consumers still render the vertical timeline unchanged.

## 4. Visual Step Guide

- [x] 4.1 Add a reusable `VisualStepGuide` component that accepts a title and ordered steps with image source, alt text, title, and body/caption text.
- [x] 4.2 Resolve static image paths with Docusaurus base URL behavior so visual guide images work under the configured site base URL.
- [x] 4.3 Render single-image guides without noisy disabled pagination controls.
- [x] 4.4 Render multi-image guides with primary image, caption, previous/next controls, step counter, and optional thumbnails.
- [x] 4.5 Add CSS module styles for visual guides that constrain image size, avoid overlap, support mobile widths, and print all steps readably.

## 5. GuateGeeks MDX Conversion

- [x] 5.1 Convert `docs/guategeeks/01-sistemas-del-robot.mdx` supplemental images to `VisualStepGuide` while keeping `StlViewer` separate.
- [x] 5.2 Convert `docs/guategeeks/03-slicer-y-tolerancias.mdx` supplemental printed-part imagery to `VisualStepGuide` while keeping `StlViewer` separate.
- [x] 5.3 Convert `docs/guategeeks/04-impresion-y-control-de-calidad.mdx` supplemental quality-control imagery to `VisualStepGuide` while keeping `StlViewer` separate.
- [x] 5.4 Convert `docs/guategeeks/05-ensamblaje-de-orugas.mdx` mechanical construction imagery to an ordered `VisualStepGuide`.
- [x] 5.5 Convert `docs/guategeeks/07-dos-motores-y-direccion.mdx` L293D shield imagery to `VisualStepGuide`.
- [x] 5.6 Convert `docs/guategeeks/10-integracion-autonoma.mdx` integrated-robot imagery to `VisualStepGuide`.
- [x] 5.7 Convert `docs/guategeeks/12-reto-integrador.mdx` final robot reference imagery to `VisualStepGuide`.
- [x] 5.8 Audit converted MDX blocks so every visual step has meaningful alt text and captions that match the visible image.

## 6. Verification

- [x] 6.1 Run TypeScript or lint checks available in the project for the changed React components.
- [x] 6.2 Run `npm run build` and fix any Docusaurus, MDX, static asset, or SSR errors.
- [x] 6.3 Inspect a text-heavy GuateGeeks session and an image-heavy GuateGeeks session at desktop and mobile widths for readable horizontal phase navigation and no overlapping controls.
- [x] 6.4 Inspect at least one CiudadBots module page to confirm its vertical phase timeline and build-guide viewer remain unchanged.
- [x] 6.5 Verify keyboard navigation for the phase reader and visual guide controls.
- [x] 6.6 Verify print output exposes all phase pages and all visual guide steps in document order.
