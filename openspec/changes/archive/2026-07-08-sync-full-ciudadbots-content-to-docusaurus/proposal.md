## Why

The Docusaurus site currently contains a minimalized version of the CiudadBots curriculum content. The original, complete content exists in `guategeeks-citybuilders-publicacion/` (self-contained HTML apps) and needs to be fully extracted and synced to the Docusaurus site. This ensures teachers and students have access to all original materials, descriptions, phase details, and assets in a consistent, maintainable format.

## What Changes

- Extract all original content fields from the HTML source files (`guategeeks-citybuilders-programa-robotica.html` and related files)
- Ensure all 12 CiudadBots modules have complete content in `src/data/ciudadbots/modules.ts`:
  - Full module descriptions, questions, and contexts
  - All learning phases with complete text (Activate, Explore, Create, Reflect)
  - Complete CNB curriculum mappings
  - Complete standards references (CSTA, ISTE, NGSS)
  - Complete evaluation rubrics
  - Build guide metadata for modules with visual guides
- Verify that Docusaurus components correctly render all module content
- Ensure assets (images, PDFs, guides) are properly linked and accessible

## Capabilities

### New Capabilities
- `ciudadbots-full-content`: Complete, synchronized CiudadBots module content with all original fields, descriptions, phases, standards, and evaluation criteria—matching the comprehensive original HTML source exactly.

### Modified Capabilities
<!-- No existing capabilities require spec-level changes; this is content enrichment of the existing ciudadbots structure. -->

## Impact

- **Code**: `src/data/ciudadbots/modules.ts` (content structure and completeness)
- **Components**: Existing components in `src/components/` will render the enriched data
- **Assets**: Build guides, images, and downloadable materials remain in `static/assets/` and `guategeeks-citybuilders-publicacion/`
- **No breaking changes**: The module TypeScript structure remains compatible with existing components
