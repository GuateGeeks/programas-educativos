## Context

The CiudadBots curriculum exists in two forms:
1. **Original source**: Complete, self-contained HTML app (`guategeeks-citybuilders-programa-robotica.html`) with all 12 modules embedded as a JavaScript data array
2. **Current Docusaurus version**: TypeScript data structure (`src/data/ciudadbots/modules.ts`) migrated from the HTML but missing some fields and complete text

The HTML source is authoritative and contains all original content. The Docusaurus site must become a full-featured replacement, requiring a complete content sync from the original HTML to ensure no teacher or student-facing content is lost or diminished.

## Goals / Non-Goals

**Goals:**
- Extract all content fields from the original HTML source
- Populate `src/data/ciudadbots/modules.ts` with complete, unabbreviated content for all 12 modules
- Maintain exact wording and formatting from the original where possible
- Ensure Docusaurus components correctly render the complete content
- Create a maintainable, single source of truth (the TypeScript modules file)
- Verify completeness through data validation

**Non-Goals:**
- Redesign the module structure or TypeScript interfaces (backward compatibility required)
- Create new UI components (existing components should render enriched data correctly)
- Port the entire HTML app to React/Docusaurus (keep Docusaurus architecture)
- Modify the original HTML files (read-only reference source)

## Decisions

### Decision 1: Content extraction approach
**Choice**: Manual extraction from HTML source into TypeScript, with validation checklist.

**Rationale**: The HTML file is 1,300 lines with CSS and JS mixed with data. A manual, careful extraction ensures accuracy and allows for careful review of field names and structure alignment. Automated parsing risks missing edge cases or incorrect field mappings.

**Alternative considered**: Script-based JSON/TypeScript extraction—rejected because the data is embedded in JavaScript and would require complex parsing; manual extraction with validation is more reliable.

### Decision 2: Field completeness standard
**Choice**: Every module MUST have all fields from the HTML source; use original wording directly where feasible.

**Rationale**: The HTML source is comprehensive. Any abbreviation or omission reduces teaching value. Teachers rely on full contexts, complete phase descriptions, and detailed standards references.

**Alternative considered**: Keep minimal fields and let teachers refer to HTML—rejected because it defeats the purpose of migration and fragments the source of truth.

### Decision 3: Handling the guide field
**Choice**: Include `guide` metadata (title, pages, imageBase) for modules with visual guides; omit for modules without guides.

**Rationale**: Only Trazamapas Chapín (m1) currently has a visual guide. The guide field enables the BuildGuide component to render step-by-step images. Other modules don't need this field.

**Alternative considered**: Add guide data for all 12—rejected because other modules lack visual content, making the field misleading.

### Decision 4: Data validation strategy
**Choice**: Create a validation script or checklist that verifies:
- All 12 modules present and distinct
- Each module has all required fields (no null/empty values except optional fields)
- Each phase has all required subfields
- CNB and standards arrays are non-empty
- Evaluation array has at least 3 criteria

**Rationale**: Manual migration is error-prone. Validation ensures completeness before merge and catches regressions if data is accidentally removed later.

**Alternative considered**: Manual review only—rejected because validation is repeatable and catches errors earlier.

### Decision 5: Component testing
**Choice**: Verify that existing Docusaurus components (`BuildGuide`, `Module`, `CityBotsHero`, etc.) correctly render the enriched data without changes.

**Rationale**: The component interfaces should not change; they should simply have more data to display. If components break, it indicates a structural issue that must be addressed before merge.

**Alternative considered**: Update components as needed—rejected because components are already stable; data enrichment should not require component changes.

## Risks / Trade-offs

| Risk | Mitigation |
|------|-----------|
| **Manual extraction introduces typos or missing fields** | Create detailed validation checklist and cross-reference HTML source against final TypeScript file field-by-field |
| **Component rendering breaks with enriched data** | Run full component test suite and manual UI inspection on Docusaurus site before merge |
| **Field name mismatches between HTML and TypeScript** | Document exact field mapping (e.g., `eval` in HTML → `evaluation` in TypeScript) before extraction begins |
| **Large text diffs are hard to review** | Structure the PR to clearly show field-by-field additions; use comments in code to mark extracted sections |
| **Maintenance burden if HTML source updates later** | Document extraction process in a runbook so future syncs are straightforward; consider automating if syncs become frequent |

## Migration Plan

1. **Preparation**: Create detailed extraction checklist mapping HTML fields to TypeScript structure
2. **Extraction**: Carefully extract content from `guategeeks-citybuilders-programa-robotica.html` into module definitions
3. **Validation**: Run validation script to verify all 12 modules are complete
4. **Component Testing**: Test Docusaurus site in browser to ensure all components render correctly
5. **Code Review**: PR with detailed field-by-field changes for review
6. **Merge & Deploy**: Merge to main and deploy to staging/production

## Open Questions

- Are there other HTML files in `guategeeks-citybuilders-publicacion/` (beyond `programa-robotica.html` and `trazamapas-estudiante.html`) that contain additional content to extract?
- Should the build guide assets (images in `trazamapas-chapin-pages/`) be copied to `static/` or remain in `guategeeks-citybuilders-publicacion/`?
- Are there any performance concerns with rendering all 12 complete modules on the page, or should pagination/lazy-loading be considered?
