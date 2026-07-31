## 1. Baseline and Scope

- [x] 1.1 Inspect `src/pages/index.tsx`, `src/pages/index.module.css`, `docusaurus.config.ts`, and current homepage translation resources before editing.
- [x] 1.2 Confirm the proposal folder image inventory and map each selected image to a stable `static/assets/platform/**` destination path.
- [x] 1.3 Confirm existing live routes for `/ciudadbots`, `/guategeeks`, `/tiempo-circular`, and `/estudiante` so homepage actions use valid Docusaurus paths.
- [x] 1.4 Confirm no new runtime dependency is required for the platform homepage.

## 2. Platform Assets

- [x] 2.1 Create the `static/assets/platform/levels/` and `static/assets/platform/programs/` asset folders.
- [x] 2.2 Copy the three level images from the proposal folder into `static/assets/platform/levels/`.
- [x] 2.3 Copy the nine proposal program images into `static/assets/platform/programs/`.
- [x] 2.4 Add or document alt text for every platform image in the homepage data.
- [x] 2.5 Verify copied image files resolve from the Docusaurus `static/` namespace and avoid copying the proposal's unrelated `constructores/ciudadbots/**` bundle.

## 3. Homepage Data Model

- [x] 3.1 Define typed homepage data for `PlatformLevel`, `PlatformProgram`, program status, and complexity.
- [x] 3.2 Populate the Explorador level with the three upcoming proposal programs.
- [x] 3.3 Populate the Constructor level with CiudadBots and GuateGeeks SMARS as available programs plus the upcoming proposal programs.
- [x] 3.4 Populate the Creador level with Tiempo Circular as an available program plus the upcoming proposal programs.
- [x] 3.5 Ensure upcoming cards have no missing local route hrefs and available cards link to existing Docusaurus routes.

## 4. Homepage Rendering

- [x] 4.1 Replace the current simple homepage layout with a platform hero that communicates GuateGeeks as an educational program platform.
- [x] 4.2 Render the three platform levels as primary sections or cards on the homepage.
- [x] 4.3 Render program cards with image, status, complexity, summary, tags, and action area.
- [x] 4.4 Render available program cards as navigable Docusaurus links and upcoming cards as non-broken disabled/informational cards.
- [x] 4.5 Resolve platform images with Docusaurus base URL behavior so they work under `/programas-educativos/`.
- [x] 4.6 Preserve the existing `Layout` title/description behavior and Docusaurus navigation chrome.

## 5. Visual Design and Responsiveness

- [x] 5.1 Replace or extend homepage CSS with responsive platform styles using existing Liquid Glass and GuateGeeks design tokens.
- [x] 5.2 Ensure desktop layout presents a clear platform overview with visible actions and balanced level/program sections.
- [x] 5.3 Ensure mobile layout stacks levels and cards without horizontal overflow, text overlap, or clipped controls.
- [x] 5.4 Ensure images use stable aspect ratios and object-fit rules so card layout does not shift unexpectedly.
- [x] 5.5 Ensure disabled/upcoming states are visibly distinct without reducing text contrast below usable levels.
- [x] 5.6 Ensure the homepage does not introduce a standalone beige/green visual system disconnected from the existing brand palette.

## 6. Localization

- [x] 6.1 Wrap homepage UI labels, headings, support copy, status text, action labels, level names, and summaries with Docusaurus translation APIs.
- [x] 6.2 Update English translation resources for all new homepage strings that need explicit `en` copy.
- [x] 6.3 Verify the default Spanish homepage renders Spanish copy.
- [x] 6.4 Verify the English homepage renders English copy rather than untranslated Spanish UI strings.
- [x] 6.5 Ensure no proposal `localStorage` language-switching logic is introduced.

## 7. Regression and Verification

- [x] 7.1 Run TypeScript checks available for the site.
- [x] 7.2 Run `npm run build` and fix any Docusaurus, MDX, route, i18n, or static asset errors.
- [x] 7.3 Serve the built site locally and verify the redesigned homepage loads under `/programas-educativos/`.
- [x] 7.4 Check available-card routes for `/ciudadbots`, `/guategeeks`, `/tiempo-circular`, and `/estudiante`.
- [x] 7.5 Check at least one copied level image and one copied program image return HTTP 200 under the configured base URL.
- [x] 7.6 Inspect desktop and mobile homepage screenshots for responsive readability and no overlapping UI.
- [x] 7.7 Inspect at least one existing program page after the change to confirm docs routes and sidebars remain stable.
- [x] 7.8 Run `openspec instructions apply --change platform-homepage --json` and confirm all implementation tasks are trackable.
