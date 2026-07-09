## Purpose

Defines the stripped-down, student-facing build experience: a separate route from the teacher surface that shows only construction guidance and team roles, reachable via a stable shareable link, with no teacher-only content exposed.

## Requirements

### Requirement: Separate student build route

The system SHALL provide a distinct student-facing route (under `/estudiante/*`) with a minimal layout separate from the teacher surface, so students can be given a direct link to a build experience without the full teacher content.

#### Scenario: Student route is reachable independently
- **WHEN** a student opens the `/estudiante` link for a module's build
- **THEN** the stripped student build view loads without requiring navigation through the teacher surface

### Requirement: Build-only content for students

The student view SHALL show only the visual construction guide (build images with page navigation and enlarged view) and team roles, and SHALL NOT expose program downloads, the teacher progress tracker, or the evaluation rubric.

#### Scenario: No teacher-only elements are shown
- **WHEN** a student opens the student build view
- **THEN** the page shows construction imagery and team roles but shows no `.llsp` download link, no progress tracker, and no evaluation rubric

#### Scenario: Students advance through build steps
- **WHEN** a student uses next/previous in the student build view
- **THEN** the construction image advances page by page with the enlarged view available

### Requirement: Team roles guidance

The student view SHALL present the suggested team roles (Constructor, Organizador, Programador) with a recommendation to rotate roles.

#### Scenario: Roles are displayed
- **WHEN** a student opens the student build view
- **THEN** the Constructor, Organizador, and Programador roles are shown with a note suggesting rotation

### Requirement: Shareable direct link

The student view SHALL be reachable via a stable, shareable URL that a teacher can distribute to students.

#### Scenario: Shared link opens the student view
- **WHEN** a teacher copies the student view URL and a student opens it
- **THEN** the student build view loads directly at that URL
