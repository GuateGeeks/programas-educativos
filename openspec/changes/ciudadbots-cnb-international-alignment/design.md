## Context

CiudadBots is implemented as Docusaurus MDX pages under `docs/ciudadbots/`, with shared program-level CNB and international standards copy in `src/data/ciudadbots/standards.ts`. Module pages provide local arrays for CNB mappings, standards references, and evaluation criteria, while shared components render the grade-depth and international progression content.

The current structure already supports teacher-facing planning. The gap is content precision: module mappings use broad area statements, some CNB area names are legacy or not aligned to Ciclo Básico, TAC is underused, and CSTA references point to older Level 2 wording rather than the current 2026 PK-12 framing.

## Goals / Non-Goals

**Goals:**

- Enrich every CiudadBots module with traceable CNB-aligned mappings and stronger evidence language.
- Update shared standards content to include TAC and current international standards framing.
- Preserve the existing module pages, tabs, routes, and build-guide behavior.
- Keep English and Spanish locale content coherent where shared standards are rendered in both locales.
- Make the final showcase useful for program-level evidence collection and teacher reporting.

**Non-Goals:**

- Do not redesign the CiudadBots UI or navigation.
- Do not replace the CNB with international standards; international frameworks remain supplemental.
- Do not add new runtime dependencies.
- Do not change lesson sequence, module count, or module slugs.
- Do not create a full standards database unless the existing content surfaces cannot carry the enriched mappings.

## Decisions

1. **Use existing rendering surfaces first.**

   Keep shared program-level language in `src/data/ciudadbots/standards.ts` and keep module-specific evidence in each module's MDX arrays. This limits the implementation to content enrichment and small copy/data edits.

   Alternative considered: introduce a new `src/data/ciudadbots/alignment.ts` model and renderer. That would improve normalization but would add component migration work for a content-focused change. It should only be introduced if module strings become too dense or hard to maintain.

2. **Use current CNB Ciclo Básico area names.**

   CiudadBots CNB mappings should use area labels from the local CNB package and official CNB sources, including `Matemática`, `Ciencias Naturales`, `Tecnologías del Aprendizaje y la Comunicación`, `Comunicación y Lenguaje, Idioma Español`, and `Emprendimiento para la Productividad`.

   Alternative considered: preserve legacy labels such as `Productividad y Desarrollo` for continuity with older content. That weakens teacher reporting against the current Ciclo Básico package, so the enriched content should use current labels.

3. **Treat TAC as a core alignment, not a secondary note.**

   Every robotics module involves programming, digital documentation, collaboration, or data handling, so TAC should appear in the program-level transversal CNB block and in module-level mappings where the evidence supports it.

   Alternative considered: mention TAC only in the overview. That would miss the module-level planning value teachers need.

4. **Update CSTA to the 2026 PK-12 framing.**

   Shared standards copy should use `2026 CSTA PK-12 Computer Science Standards`, with middle-school concepts and practices rather than the older `K-12 CS Level 2` label.

   Alternative considered: keep the current CSTA label because it is familiar. The current official source has changed, so keeping old wording would make the content feel stale and less defensible.

5. **Tie evaluations to artifacts teachers can collect.**

   Module rubrics should assess evidence such as a working robot, program changes, measurements, data tables, debugging notes, diagrams or pseudocode, team explanation, and final presentation. This supports CNB and international reporting without turning the lesson into a standards checklist.

   Alternative considered: add standards codes only to the CNB tab and leave rubrics as-is. That would improve traceability but not classroom assessment quality.

## Risks / Trade-offs

- **Risk: Module arrays become long and harder to scan.** -> Keep each item concise and focused on teacher evidence; avoid copying full CNB text into MDX.
- **Risk: Standards codes can imply stricter official alignment than intended.** -> Phrase mappings as teacher-facing alignment/evidence support, not certification or official endorsement.
- **Risk: English locale may expose Guatemala-specific CNB terminology awkwardly.** -> Keep English copy explanatory and lead with international standards while retaining CNB in a secondary position.
- **Risk: CNB indicator references may drift from source PDFs.** -> Use the local CNB package as the working source and keep official source links visible.

## Migration Plan

1. Update shared standards copy in `src/data/ciudadbots/standards.ts`.
2. Enrich the 12 module MDX files with current CNB area names, TAC references, current international standards references, and stronger evaluation evidence.
3. Enrich `docs/ciudadbots/overview.mdx` only where program-level wording needs to introduce the updated standards framing.
4. Enrich `docs/ciudadbots/13-showcase.mdx` so final presentation evidence matches the same CNB/international/evaluation model.
5. Run typecheck/build to verify MDX imports, page rendering, and docs generation.

Rollback is content-only: revert the changed MDX/data files if the enriched content needs to be revised.

## Open Questions

- Should module-level CNB mappings display indicator codes directly, or should codes stay in source comments/implementation notes while teacher-facing text stays concise?
- Should the Spanish module pages remain the source of truth for module-specific content, or should English-localized module pages be added later for full parity?
