## Context

CiudadBots module pages are authored as locale-specific MDX under `docs/ciudadbots/` for Spanish and `i18n/en/docusaurus-plugin-content-docs/current/ciudadbots/` for English. The shared `<Module>` compound component extracts `Question`, `Context`, `Concepts`, four `Phase` entries, CNB mappings, standards, and evaluation criteria, then renders the implementation tab as concept chips plus the phase timeline.

The previous CNB and standards alignment work made the curriculum and evaluation tabs more rigorous. This change focuses on the `Implementación` content itself: making each case easier for a teacher to facilitate in a real classroom by adding concrete procedure, checkpoints, evidence, debugging, safety, and grade adaptation inside the existing phase bodies.

## Goals / Non-Goals

**Goals:**

- Enrich all 12 Spanish CiudadBots module implementation phases with classroom-ready procedural guidance.
- Keep the English locale aligned with equivalent implementation guidance.
- Use a consistent authoring pattern across modules while preserving each module's unique robotics challenge.
- Keep the existing four-phase instructional model: `Activar`, `Explorar`, `Crear`, and `Reflexionar`.
- Preserve the current MDX-based content model unless readability requires a small renderer adjustment.

**Non-Goals:**

- Do not redesign the CiudadBots page layout or navigation.
- Do not introduce new dependencies, routes, program files, or build-guide assets.
- Do not change CNB/standards/evaluation mappings except where a short implementation phrase must stay consistent with existing wording.
- Do not create student-mode content or alter the student build route.

## Decisions

1. Keep implementation enrichment in MDX phase bodies.

   The current `program-content-model` spec requires narrative text to live in per-locale MDX, and the current `<Module>` renderer already supports richer phase body text. Keeping this as content-first work reduces risk and lets teachers edit module guidance without TypeScript changes. The alternative was adding structured phase subfields such as `checkpoint`, `evidence`, and `debugging`, but that would require component and content-model changes before proving the added structure is necessary.

2. Use a repeatable phase-writing pattern.

   Each phase body should include the most relevant items from this pattern: teacher action, student/team action, checkpoint or evidence, debugging prompt, safety/handling cue, and grade differentiation. The pattern should be applied naturally rather than as visible labels in every paragraph, so the implementation tab stays readable instead of turning into a checklist.

3. Keep module-specific authenticity.

   Guidance should refer to the robot's actual task: mapping, delivery, forklift lifting, repair arm replacement, crane loads, compact loader route, color sorting, bridge construction, elevator floors, urban traffic, rescue neutralization, and final ride/showcase controls. Reusing generic copy across modules would meet word count but would weaken teacher usefulness.

4. Preserve bilingual parity without literal translation.

   Spanish is the primary authoring surface for the Guatemala classroom context. English content should communicate the same classroom procedure, evidence, safety, and differentiation, but it can use natural English phrasing and international terminology where appropriate.

## Risks / Trade-offs

- Longer phase copy could make the implementation tab feel dense -> Keep each phase concise, prefer tight paragraphs, and only adjust component styling if the content becomes hard to scan.
- Generic enrichment could blur differences between modules -> Draft module-by-module, using each robot's mechanism, sensor, movement, and classroom evidence as the anchor.
- English and Spanish modules could drift -> Update each locale as a pair and verify all 12 modules have matching phase counts and equivalent implementation guidance.
- Safety guidance could become repetitive -> Include only safety cues that match the mechanism or classroom risk in that module.
- Existing CNB/evaluation work could be accidentally weakened -> Limit edits to context, concepts, and phase bodies unless consistency requires a small local wording adjustment.
