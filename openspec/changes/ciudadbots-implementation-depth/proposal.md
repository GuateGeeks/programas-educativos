## Why

CiudadBots now has stronger CNB, standards, and evaluation alignment, but the implementation guidance for the 12 classroom cases remains too brief for teachers to run sessions with consistent pacing, evidence collection, debugging support, and grade differentiation. Enriching the implementation phases will make each module more classroom-ready without changing the existing navigation or component model.

## What Changes

- Enrich the `Implementación` content for all 12 CiudadBots modules in Spanish.
- Mirror equivalent implementation guidance in the English locale so both locales remain functionally aligned.
- Expand each `Activar`, `Explorar`, `Crear`, and `Reflexionar` phase with concrete teacher moves, student actions, checkpoints, evidence prompts, and debugging questions.
- Add module-appropriate safety or handling guidance for moving motors, arms, loads, elevators, robot traffic, sensors, strings, or public showcase demonstrations.
- Add grade-differentiated implementation cues that let teachers adapt the same case for 1.º, 2.º, and 3.º básico.
- Preserve the current `<Module>` compound component and MDX authoring model unless implementation content becomes unreadably dense during application.
- No breaking changes.

## Capabilities

### New Capabilities

- None.

### Modified Capabilities

- `ciudadbots-full-content`: Strengthen the completeness requirements for module implementation phases so each case includes classroom-ready procedural guidance, evidence checkpoints, debugging prompts, safety cues, and grade differentiation in both supported locales.

## Impact

- Affected content: `docs/ciudadbots/*.mdx` and `i18n/en/docusaurus-plugin-content-docs/current/ciudadbots/*.mdx`.
- Potentially affected component code: `src/components/Module/index.tsx` and `src/components/Module/styles.module.css` only if the enriched content requires additional structure for readability.
- Affected specs: `openspec/specs/ciudadbots-full-content/spec.md`.
- No new dependencies, routes, APIs, or build assets are expected.
