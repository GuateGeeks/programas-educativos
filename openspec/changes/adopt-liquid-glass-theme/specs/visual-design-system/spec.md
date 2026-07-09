## ADDED Requirements

### Requirement: Unified GuateGeeks brand palette

The site SHALL define a single GuateGeeks brand palette as CSS custom properties: coral as the primary (mapped to `--ifm-color-primary-*`), with sky and plum as secondary/tertiary accents, exposed as numbered scales (`--gg-coral-*`, `--gg-sky-*`, `--gg-plum-*`). The palette SHALL be defined for both light (`:root`) and dark (`[data-theme='dark']`) modes. No teal-primary "CiudadBots publication" token set (`--gg-teal*`, `--gg-ink*`, `--gg-paper`, `--gg-gold`) SHALL remain in the codebase.

#### Scenario: Coral is the Infima primary in light mode

- **WHEN** the site loads in light mode
- **THEN** `--ifm-color-primary` resolves to the coral value (`#ef8556`) and Docusaurus primary-colored chrome (active links, primary buttons) renders coral

#### Scenario: Palette adapts to dark mode

- **WHEN** the user switches to dark mode
- **THEN** the coral/sky/plum and glass tokens resolve to their dark-mode values defined under `[data-theme='dark']`

#### Scenario: No retired teal tokens remain

- **WHEN** the stylesheet and all first-party component styles are inspected
- **THEN** no `--gg-teal*`, `--gg-ink*`, `--gg-paper`, `--gg-gold`, `--gg-line`, or `--gg-radius` custom properties are defined or referenced

### Requirement: Liquid glass surfaces and utilities

The site SHALL provide liquid-glass surface tokens (`--glass-bg`, `--glass-bg-card`, `--glass-border`, `--glass-shadow`, `--glass-specular`, `--glass-blur`, and their variants) and reusable utility classes consumable from TSX and MDX: `glass-panel`, `glass-card`, `text-gradient-coral`, `text-gradient-multi`, and `glow-coral`.

#### Scenario: Glass utility class is available globally

- **WHEN** a component or MDX page applies `className="glass-card"`
- **THEN** the element renders with the blurred translucent background, glass border, specular top edge, and elevation defined by the glass tokens

#### Scenario: Gradient text utility renders brand gradient

- **WHEN** an element uses `text-gradient-coral` or `text-gradient-multi`
- **THEN** its text is filled with the corresponding brand gradient (with a solid color fallback for unsupported browsers)

### Requirement: Brand typography

The site SHALL use Barlow as the base font and Barlow Condensed for headings, with JetBrains Mono for code, applied via `--ifm-font-family-base`, `--ifm-heading-font-family`, and heading rules. Content headings in the docs markdown area SHALL follow the same brand heading treatment.

#### Scenario: Headings use the condensed brand face

- **WHEN** any `h1`–`h6` renders
- **THEN** its computed `font-family` is Barlow Condensed (falling back to Barlow, then system sans-serif)

#### Scenario: Body copy uses Barlow

- **WHEN** body text renders
- **THEN** its computed `font-family` is Barlow (falling back to system sans-serif)

### Requirement: Docusaurus chrome theming

The site SHALL apply the Liquid Glass treatment to Docusaurus chrome: a glass navbar backdrop (implemented without placing `backdrop-filter` on the navbar element itself so the mobile sidebar is not clipped), coral sidebar active/hover states, gradient primary buttons and coral secondary buttons, a blurred footer, a coral focus ring, a themed scrollbar, and a `prefers-reduced-motion` guard.

#### Scenario: Active sidebar link is coral

- **WHEN** a documentation page is open
- **THEN** the active `menu__link` renders with the coral active treatment (coral text and coral-tinted background)

#### Scenario: Mobile navbar sidebar overlays content

- **WHEN** the mobile navbar sidebar is opened
- **THEN** it overlays all page content and is not clipped to the navbar area (backdrop-filter is not applied to the `.navbar` element directly)

#### Scenario: Reduced motion is respected

- **WHEN** the user has `prefers-reduced-motion: reduce` set
- **THEN** animations, transitions, and smooth scrolling are effectively disabled

### Requirement: Swizzled sidebar theme components

The site SHALL include the swizzled sidebar theme components ported from `equipos-educativos` (`DocRoot/Layout/Sidebar/ExpandButton` and `DocSidebar`) and enable the hideable sidebar behavior via `themeConfig.docs.sidebar.hideable`.

#### Scenario: Sidebar can be collapsed and re-expanded

- **WHEN** a visitor collapses the doc sidebar
- **THEN** the expand button appears and re-opens the sidebar, using the swizzled components' styling

### Requirement: Program components consume shared brand tokens

All first-party program components SHALL consume the shared design-system tokens rather than defining a per-program palette. The existing CiudadBots components (`Module`, `ProgressTracker`, `BuildGuide`, `CityBotsHero`) SHALL be re-skinned onto the Liquid Glass tokens with no remaining references to the retired teal vocabulary.

#### Scenario: CiudadBots components render in the coral system

- **WHEN** any CiudadBots component (`Module`, `ProgressTracker`, `BuildGuide`, `CityBotsHero`) renders
- **THEN** its colors, surfaces, radii, and typography derive from the shared Liquid Glass tokens and it presents coral (not teal) as its accent

#### Scenario: No component references undefined tokens

- **WHEN** the site is built
- **THEN** no component style references a CSS custom property that is not defined by the design system (no undefined-variable fallbacks)
