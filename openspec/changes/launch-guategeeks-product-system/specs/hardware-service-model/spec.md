## Purpose

Defines how GuateGeeks uses physical equipment as a service advantage while keeping educational outcomes at the center of the product.

## Requirements

### Requirement: Four equipment modalities

GuateGeeks SHALL support four equipment modalities: client-owned equipment, GuateGeeks rental equipment, recommended/purchased kits, and full-service implementation.

#### Scenario: Client already owns robotics kits
- **WHEN** a client has compatible equipment
- **THEN** GuateGeeks can offer content and support without requiring additional hardware purchase.

#### Scenario: Client lacks equipment
- **WHEN** a client has no robotics kits
- **THEN** GuateGeeks can offer rental, kit purchase/recommendation, or full-service delivery.

### Requirement: Operational checklist

Each hardware-supported delivery SHALL include an operational checklist covering inventory, setup, transport, storage, maintenance, damage responsibility, and return.

#### Scenario: Pilot uses GuateGeeks equipment
- **WHEN** equipment is delivered for a pilot
- **THEN** there is a documented checklist before and after the session cycle.

### Requirement: Capacity planning

GuateGeeks SHALL define kit-to-student ratios and maximum cohort sizes for each delivery model.

#### Scenario: School requests a cohort
- **WHEN** a school asks for a number of students
- **THEN** GuateGeeks can determine whether current equipment supports the cohort or requires additional kits/facilitators.
