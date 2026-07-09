## ADDED Requirements

### Requirement: Proper favicon

The site SHALL serve a purpose-built `favicon.ico` (containing standard small icon sizes, e.g. 16/32/48 px) derived from the GuateGeeks hub logo, wired via the Docusaurus `favicon` config. The full-resolution logo PNG SHALL NOT be used directly as the favicon.

#### Scenario: Browser tab shows a crisp icon

- **WHEN** the site loads in a browser
- **THEN** the tab renders a legible GuateGeeks icon from `favicon.ico`, not a downscaled full logo

### Requirement: Open Graph social card

The site SHALL provide a dedicated Open Graph image (a 1200×630 `social-card.png` derived from the hub brand) wired via `themeConfig.image`, so shared/link previews display a purpose-made card rather than the raw logo.

#### Scenario: Link preview uses the social card

- **WHEN** a page URL is shared to a platform that reads Open Graph metadata
- **THEN** the preview shows the GuateGeeks `social-card.png` at the correct aspect ratio

### Requirement: Brand assets resolve under deployment baseUrl

All brand image assets SHALL be referenced through Docusaurus config/base-URL resolution so they load correctly on the deployed site under its non-root `baseUrl`.

#### Scenario: Favicon and card load on the deployed site

- **WHEN** the deployed site is loaded at its project-pages URL
- **THEN** `favicon.ico` and `social-card.png` resolve (HTTP 200) under the configured `baseUrl`
