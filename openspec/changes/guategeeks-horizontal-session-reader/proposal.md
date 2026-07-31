## Why

GuateGeeks session pages currently present the learning phases and visual references as a mostly vertical document, which makes the core steps feel dense and easy to skim past. The course now has enough session content and SMARS imagery that the reading experience should guide teachers and students through steps horizontally, closer to pages in a visual guide.

## What Changes

- Add a horizontal, page-like reader for the four `SessionModule` implementation phases in every GuateGeeks session.
- Add a reusable visual sequence/gallery treatment for GuateGeeks image sections so construction and reference images are shown as deliberate steps instead of loose vertical Markdown images.
- Preserve the existing MDX authoring model: sessions continue to define `SessionModule.Phase`, materials, reto, evidence, CNB, standards, evaluation, and supplemental visual content.
- Keep the change scoped to GuateGeeks session reading and visual guide presentation; CiudadBots behavior must not change unless a reused component is intentionally made more general without altering existing output.
- Maintain accessible navigation, responsive layouts, keyboard operation, reduced-motion behavior, print readability, and Docusaurus build compatibility.

## Capabilities

### New Capabilities

- `guategeeks-session-reading-experience`: Horizontal GuateGeeks session phase reader and improved visual sequence presentation for session imagery.

### Modified Capabilities

- `interactive-learning-components`: Extend the reusable component set with horizontal phase/step navigation patterns that can be used by GuateGeeks without breaking existing build-guide and CiudadBots components.

## Impact

- Affected code: `src/components/SessionModule`, `src/components/PhaseTimeline` or a new phase-reader component, a new visual guide/gallery component, related CSS modules, and selected `docs/guategeeks/*.mdx` files.
- Affected content: GuateGeeks supplemental image sections in sessions that already use SMARS imagery, especially sessions 1, 3, 4, 5, 7, 10, and 12.
- Affected systems: Docusaurus docs rendering, MDX compilation, accessibility semantics for tab/pagination controls, responsive documentation layout, and production build verification.
- Dependencies: no new runtime dependency is expected; the implementation should prefer existing React, Docusaurus, CSS, and local assets.
