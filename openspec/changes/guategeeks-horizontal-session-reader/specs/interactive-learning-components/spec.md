## ADDED Requirements

### Requirement: Horizontal Step Reader Component
The system SHALL provide a reusable React component that renders an ordered set of textual learning steps as horizontal pages with direct step controls, previous/next navigation, and a current step indicator.

#### Scenario: Ordered steps render horizontally
- **WHEN** the component receives an ordered list of learning steps
- **THEN** it renders them in that order as horizontal pages without requiring callers to duplicate navigation markup

#### Scenario: Navigation clamps at boundaries
- **WHEN** a user navigates before the first step or after the last step
- **THEN** the component remains on the nearest valid step and communicates disabled or unavailable navigation affordances

#### Scenario: Component is data-driven
- **WHEN** the component receives a different step list from another program or page
- **THEN** it renders that sequence without component code changes

#### Scenario: Existing phase timeline remains available
- **WHEN** existing pages still use the original phase timeline component
- **THEN** that component remains available and keeps its existing vertical rendering behavior

### Requirement: Visual Step Guide Component
The system SHALL provide a reusable React component for captioned visual sequences with local images, ordered navigation, and optional thumbnails.

#### Scenario: Captioned image step renders
- **WHEN** the component receives a visual step with image source, alt text, title, and body text
- **THEN** it renders the image with its matching title and body text as the active visual step

#### Scenario: Multiple visual steps can be navigated
- **WHEN** the component receives more than one visual step
- **THEN** it provides navigation that changes the active image and updates the step counter and caption content

#### Scenario: Single visual step avoids noisy controls
- **WHEN** the component receives exactly one visual step
- **THEN** it renders the image and caption without unnecessary previous, next, or thumbnail controls

#### Scenario: Static asset paths work in Docusaurus
- **WHEN** a visual step references a local static asset path
- **THEN** the component renders the image in production builds using the site's configured base URL behavior

### Requirement: Interactive Components Respect Documentation Constraints
Horizontal and visual-step interactive components SHALL fit inside Docusaurus documentation pages without breaking server-side rendering, accessibility, reduced-motion preferences, responsive layout, or print output.

#### Scenario: Server-side rendering is safe
- **WHEN** the production Docusaurus build renders documentation pages
- **THEN** the components do not access browser-only APIs during server-side rendering

#### Scenario: Controls are keyboard operable
- **WHEN** a user navigates the component using keyboard focus and arrow or button activation
- **THEN** the active step can be changed without requiring pointer input

#### Scenario: Reduced motion is respected
- **WHEN** `prefers-reduced-motion: reduce` is active
- **THEN** the components avoid smooth animated movement that conflicts with the user preference

#### Scenario: Responsive dimensions are stable
- **WHEN** the component renders at desktop or mobile documentation widths
- **THEN** images, controls, counters, and body text remain within their containers without overlapping adjacent content

#### Scenario: Print output remains complete
- **WHEN** a documentation page containing the component is printed
- **THEN** the printed output includes all steps in readable document order
