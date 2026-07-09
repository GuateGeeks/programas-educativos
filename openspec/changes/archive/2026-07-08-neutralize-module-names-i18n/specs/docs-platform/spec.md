## MODIFIED Requirements

### Requirement: Bilingual i18n configuration

The site SHALL be configured for internationalization with Spanish as the default locale and English as a fully authored additional locale, so that every program page (module pages, overview, Showcase, student view, homepage, navbar, and footer) renders complete, non-fallback English content when the `en` locale is selected.

#### Scenario: Spanish is served by default
- **WHEN** a visitor loads the site root without a locale prefix
- **THEN** the Spanish (`es`) version of the content is served

#### Scenario: English locale serves fully authored content
- **WHEN** a visitor switches to the English locale
- **THEN** the site serves the `en` locale route with content authored in English for that page — no page silently falls back to untranslated Spanish text
