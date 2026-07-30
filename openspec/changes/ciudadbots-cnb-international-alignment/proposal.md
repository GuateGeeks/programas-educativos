## Why

CiudadBots already includes CNB, international standards, and evaluation sections, but the current module-level mappings are mostly broad statements instead of traceable curriculum alignments. Teachers need clearer evidence that each robotics activity supports Guatemala Ciclo Básico expectations and current international robotics, computing, and engineering standards.

This change enriches the existing content so each module can be used for planning, reporting, and differentiated instruction across 1.º, 2.º, and 3.º básico.

## What Changes

- Update CiudadBots CNB mappings to use current Ciclo Básico area names and more specific indicator-level references.
- Add stronger support for `Tecnologías del Aprendizaje y la Comunicación` as a core robotics/programming alignment.
- Replace generic CSTA Level 2 wording with current `2026 CSTA PK-12` middle-school framing.
- Add explicit ISTE Students and NGSS MS-ETS1 references where module evidence supports them.
- Enrich module evaluation criteria so teachers can assess observable artifacts: measurements, data tables, program changes, test results, diagrams, reflection, and presentation evidence.
- Keep the content data-driven and reusable where possible so shared standards language is not duplicated across modules.
- Preserve the existing Docusaurus module structure and visual build-guide behavior.

## Capabilities

### New Capabilities

- `ciudadbots-cnb-international-alignment`: Defines traceable CNB, TAC, ISTE, CSTA 2026, NGSS, and evidence-based evaluation requirements for all CiudadBots modules and the closing showcase.

### Modified Capabilities

- `ciudadbots-standards-depth`: Update standards-depth requirements to use current CNB area names, include TAC as a transversal area, and replace old CSTA Level 2 wording with 2026 CSTA PK-12 middle-school standards.
- `ciudadbots-full-content`: Strengthen per-module CNB, standards, and evaluation completeness requirements from broad text to specific, measurable, evidence-based mappings.
- `ciudadbots-overview-structure`: Extend the overview-level transversal CNB block to include TAC and current international standards framing.
- `ciudadbots-closing-showcase`: Enrich the final showcase requirements so the culminating presentation demonstrates CNB evidence and international-standards-aligned engineering reflection.

## Impact

- Affected docs: `docs/ciudadbots/*.mdx`.
- Affected shared data/components: `src/data/ciudadbots/standards.ts`, potentially `src/data/ciudadbots/modules.ts`, and CiudadBots module rendering components if a structured alignment data model is introduced.
- Affected specs: existing CiudadBots OpenSpec specs plus a new alignment capability spec.
- No runtime dependency changes are expected.
- No breaking user-facing routes or URL changes are expected.
