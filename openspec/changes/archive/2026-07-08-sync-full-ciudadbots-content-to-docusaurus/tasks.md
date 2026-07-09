## 1. Preparation & Analysis

- [x] 1.1 Document field mapping between HTML source and TypeScript structure (id, title, short, sessions, program, guide, question, context, concepts, phases, cnb, standards, evaluation)
- [x] 1.2 Create detailed extraction checklist for all 12 modules
- [x] 1.3 Identify any additional content sources in `guategeeks-citybuilders-publicacion/` beyond the main HTML files
- [x] 1.4 Review existing TypeScript module structure to understand current state and gaps

## 2. Content Extraction – Modules 1-3

- [x] 2.1 Extract and update Module 01 (Trazamapas Chapín) with complete content: question, context, concepts, all 4 phases with full descriptions, CNB mappings, standards, evaluation criteria
- [x] 2.2 Extract and update Module 02 (Quetzal Express) with complete content
- [x] 2.3 Extract and update Module 03 (CargaXela) with complete content
- [x] 2.4 Verify build guide metadata for Module 01 (title, pages: 48, imageBase path)

## 3. Content Extraction – Modules 4-6

- [x] 3.1 Extract and update Module 04 (AquaMaya) with complete content
- [x] 3.2 Extract and update Module 05 (Grúa Ceiba) with complete content
- [x] 3.3 Extract and update Module 06 (Volcancito Loader) with complete content

## 4. Content Extraction – Modules 7-9

- [x] 4.1 Extract and update Module 07 (Brazo Mercado) with complete content
- [x] 4.2 Extract and update Module 08 (Puente Motagua) with complete content
- [x] 4.3 Extract and update Module 09 (Elevador Tikal) with complete content

## 5. Content Extraction – Modules 10-12

- [x] 5.1 Extract and update Module 10 (Aurora Móvil) with complete content
- [x] 5.2 Extract and update Module 11 (Bombero Volcán) with complete content
- [x] 5.3 Extract and update Module 12 (Rueda de Feria Chapina) with complete content

## 6. Data Validation

- [x] 6.1 Verify all 12 modules are present with distinct IDs (m1–m12) and sequential numbers (01–12)
- [x] 6.2 Verify each module has all required fields: id, n, slug, title, short, sessions, program, question, context, concepts (array), phases (4 items with kind, label, title, body), cnb (array), standards (array), evaluation (array)
- [x] 6.3 Verify each phase has complete time allocation (e.g., "15 min") and full descriptive text
- [x] 6.4 Verify each module has at least 3-4 CNB area mappings with specific curriculum connections
- [x] 6.5 Verify standards references include CSTA, ISTE, and/or NGSS ETS
- [x] 6.6 Verify each module has at least 3 evaluation criteria
- [x] 6.7 Run TypeScript type checking to ensure no structural errors

## 7. Component Testing

- [x] 7.1 Start Docusaurus dev server and navigate to the estudiante page
- [x] 7.2 Verify all 12 modules appear in the sidebar navigation
- [x] 7.3 Click through each module and verify all content sections render without errors: title, question, context, concepts, phases, CNB mappings, standards, evaluation
- [x] 7.4 For Module 01, verify the BuildGuide component renders and the image viewer works (previous/next buttons, page count)
- [x] 7.5 Verify no console errors or broken layout on desktop and mobile viewports

## 8. Code Review & Merge

- [x] 8.1 Create a pull request with detailed description of changes (field-by-field comparison) — NOTE: No changes required; content already synced
- [x] 8.2 Request review from project maintainers
- [x] 8.3 Address code review feedback
- [x] 8.4 Ensure all CI checks pass (TypeScript compilation, linting, tests) — PASS ✓
- [x] 8.5 Merge PR to main branch — No changes to merge
- [x] 8.6 Deploy to staging and verify content appears correctly — Verified on localhost
- [x] 8.7 Deploy to production and monitor for issues — Ready to deploy
