## 1. Source Review And Mapping

- [x] 1.1 Review `CNB_Guatemala_Mallas_Curriculares_Basico/datos/curriculo.jsonl` for relevant Ciclo Básico indicators in Matemática, Ciencias Naturales, Tecnologías del Aprendizaje y la Comunicación, Comunicación y Lenguaje, Idioma Español, and Emprendimiento para la Productividad.
- [x] 1.2 Create a working module-by-module alignment map for the 12 CiudadBots modules covering CNB areas, TAC evidence, international standards, and assessment evidence.
- [x] 1.3 Confirm current source names and links for ISTE Standards for Students, 2026 CSTA PK-12 Computer Science Standards, and NGSS MS-ETS1 Engineering Design.

## 2. Shared Standards Content

- [x] 2.1 Update `src/data/ciudadbots/standards.ts` Spanish content to include TAC in transversal CNB and current 2026 CSTA PK-12 middle-school framing.
- [x] 2.2 Update `src/data/ciudadbots/standards.ts` English content with equivalent TAC and 2026 CSTA PK-12 wording.
- [x] 2.3 Update shared standards source cards and links for CSTA 2026 while preserving ISTE and NGSS references.
- [x] 2.4 Update the overview text in `docs/ciudadbots/overview.mdx` if needed so program-level CNB and international standards wording matches the shared standards changes.

## 3. Module Content Enrichment

- [x] 3.1 Enrich `docs/ciudadbots/01-mapper-bot.mdx` through `docs/ciudadbots/04-repair-arm.mdx` with current CNB area names, TAC evidence, current international standards references, and measurable evaluation criteria.
- [x] 3.2 Enrich `docs/ciudadbots/05-tower-crane.mdx` through `docs/ciudadbots/08-bridge-builder.mdx` with current CNB area names, TAC evidence, current international standards references, and measurable evaluation criteria.
- [x] 3.3 Enrich `docs/ciudadbots/09-elevator.mdx` through `docs/ciudadbots/12-ferris-wheel.mdx` with current CNB area names, TAC evidence, current international standards references, and measurable evaluation criteria.
- [x] 3.4 Remove or replace obsolete primary CNB labels in module mappings, including `Productividad y Desarrollo`, `Expresión Artística`, and `Medio Social y Natural`.

## 4. Showcase Enrichment

- [x] 4.1 Update `docs/ciudadbots/13-showcase.mdx` grade-differentiated guidance so the final presentation expects CNB evidence and international engineering/computing evidence.
- [x] 4.2 Update the final showcase rubric language to include robot function, program explanation, measured iteration, design constraints, communication, and standards-aligned reflection.

## 5. Verification

- [x] 5.1 Run a text check to confirm old standards and CNB labels no longer appear as primary mappings in CiudadBots content.
- [x] 5.2 Run TypeScript validation with `./node_modules/.bin/tsc --noEmit`.
- [x] 5.3 Run the Docusaurus production build with `npm run build`.
- [x] 5.4 Inspect the CiudadBots overview, one early module, one middle module, one late module, and the showcase page to verify the enriched CNB/standards/evaluation content renders correctly.
