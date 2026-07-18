## Context

The current homepage has a hero, two calls to action, one CiudadBots card, and a "new programs coming soon" placeholder. That is clean but undersells the institutional product. The existing teacher and student experiences should remain intact; the homepage needs to become the buyer-facing layer above them.

This change implements the first commercial surface. It should be useful for a director, academic coordinator, NGO, company sponsor, or potential partner evaluating whether GuateGeeks is credible enough for a conversation.

## Goals / Non-Goals

### Goals

- Make the homepage explain GuateGeeks as a system of institutional technology programs.
- Make CiudadBots easy to understand as the current anchor product.
- Show the three program pathways without implying all are complete.
- Explain hardware support as optional.
- Explain the evidence/showcase promise.
- Provide clear CTAs for "request demo" or "explore CiudadBots".
- Keep the site static and easy to maintain.

### Non-Goals

- Add authentication or private content.
- Add payments, checkout, or membership management.
- Add a CRM integration.
- Build full Exploradores or Creadores content.
- Change the module-level teacher documentation.
- Change the student view.

## Page Architecture

The homepage should become a multi-section institutional landing:

1. **Hero**
   - Eyebrow: GuateGeeks Programas Educativos.
   - Headline: outcome-first, not technology-first.
   - Supporting copy: ready-to-implement programs with teacher support, evidence, and equipment options.
   - CTAs: request demo / explore CiudadBots.

2. **Institutional Pain / Promise**
   - Schools want innovation but need structure.
   - Teachers need guidance, not more workload.
   - Leadership needs visible evidence.
   - GuateGeeks connects those pieces.

3. **Product Ladder**
   - Exploradores: first contact / pilot / low risk.
   - Constructores: structured program / CiudadBots.
   - Creadores: advanced innovation / conceptual future pathway.
   - Include maturity labels.

4. **Featured Product: CiudadBots**
   - 12 robotics missions.
   - Ciclo Basico.
   - Teacher guide, student view, rubrics, downloadable resources, showcase.
   - Link to CiudadBots guide.

5. **How Implementation Works**
   - Discover needs.
   - Select pathway/package.
   - Onboard teacher.
   - Run sessions.
   - Capture evidence.
   - Showcase and recommend next step.

6. **Hardware Options**
   - Use your equipment.
   - Rent GuateGeeks equipment.
   - Buy/recommend kit.
   - Full-service implementation.

7. **Evidence And Showcase**
   - Photos/artifacts.
   - Rubrics.
   - Student explanation.
   - Impact report.
   - Parent/sponsor-ready output.

8. **Package Paths**
   - Demo experience.
   - Paid pilot.
   - Semester program.
   - Annual program.

9. **Final CTA**
   - Request demo / contact.
   - Secondary: explore CiudadBots / student view.

## Content Principles

- Lead with outcomes, not technology lists.
- Keep language direct and institutional.
- Avoid saying Exploradores and Creadores are complete products if they are conceptual.
- Avoid in-app instructional text about how to use the website.
- Make CTAs practical: demo, pilot, explore.
- Keep Spanish and English translation keys aligned with current i18n pattern.

## Technical Approach

- Modify `src/pages/index.tsx` and `src/pages/index.module.css`.
- Keep Docusaurus `Translate` wrappers for visible strings.
- Add or update English translations if existing translation files require explicit content.
- Reuse simple static React sections; no new dependency is required.
- Preserve links:
  - `/ciudadbots/`
  - `/estudiante/`
  - contact can initially use `mailto:info@guategeeks.com` or a simple contact CTA if no form exists.

## Risks / Trade-Offs

- **Too much copy:** The page can become dense. Use sections and compact cards.
- **Overpromising tiers:** Use maturity labels for conceptual pathways.
- **Bilingual drift:** Update both locales or use Docusaurus translation IDs carefully.
- **Commercial vs teacher confusion:** Keep the homepage commercial; teacher docs stay under CiudadBots.

## Open Questions

- Should the primary CTA be WhatsApp, email, or a contact form?
- Do we want to include pricing ranges now or keep pricing for proposals?
- Which package should be the most prominent before October: Demo Experience or Paid Pilot?
