## Why

GuateGeeks needs to align its SMARS build guide with the available SMARS export and image set, using the L293D motor shield the user confirmed instead of the current TB6612FNG contract. This makes the documentation visually actionable for construction while removing the mismatch between the intended hardware and the photos from `img-smars/`.

## What Changes

- **BREAKING**: Replace the current GuateGeeks SMARS motor-driver contract from TB6612FNG to an Arduino-compatible L293D motor shield.
- **BREAKING**: Update the motor-control sketches, pin references, safety notes, materials, troubleshooting, and session content that currently assume TB6612FNG pins such as `STBY`, `PWMA`, `PWMB`, `AIN1/AIN2`, and `BIN1/BIN2`.
- Add visual construction guidance to the existing `docs/guategeeks/` format using `img-smars/` images and the sequence from `smars_export/` as the source material.
- Preserve the current GuateGeeks session structure: one MDX page per session, `SessionModule` for pedagogical structure, and supplemental visual sections after the module.
- Keep the autonomous classroom goal: students build a tracked SMARS robot that can be tested, calibrated, documented, and presented through the existing 12-session learning progression.
- Update attribution and licensing notes for the SMARS export-derived images and any reused construction content.

## Capabilities

### New Capabilities

- `guategeeks-l293d-hardware-contract`: Defines the L293D motor shield as the canonical GuateGeeks SMARS driver, including materials, power cautions, pin/control abstraction, and replacement of obsolete TB6612FNG references.
- `guategeeks-smars-visual-build-guide`: Adds a visual construction guide based on `smars_export/` and `img-smars/`, while keeping the current GuateGeeks documentation format.
- `smars-arduino-l293d-sketches`: Adapts the GuateGeeks Arduino sketches and downloadable teaching wrappers so the motor routines target the L293D shield instead of TB6612FNG.

### Modified Capabilities

- None in `openspec/specs/`. GuateGeeks capabilities currently exist in active change specs rather than synced main specs; this change intentionally supersedes the TB6612FNG assumptions from `guategeeks-smars-ciclo-basico`.

## Impact

- Affected docs: `docs/guategeeks/index.mdx`, `materiales.mdx`, `seguridad.mdx`, `plantillas.mdx`, `licencias.mdx`, and sessions that describe hardware, assembly, motor testing, ultrasonic integration, autonomous behavior, calibration, and final challenge.
- Affected data: `src/data/guategeeks/sessions.ts` if session metadata, titles, summaries, materials, or sketch descriptions mention TB6612FNG.
- Affected firmware: `arduino/guategeeks/02_prueba_motores`, `04_smars_autonomo`, `05_asistente_calibracion`, shared README/hardware/troubleshooting docs, and any code display imports that derive from those sketches.
- Affected assets: `img-smars/` images become first-class documentation illustrations; conflicting images may now be valid if they show the confirmed L293D shield, but photos that imply Bluetooth/app control still require careful captioning or exclusion.
- Verification: Docusaurus build, Arduino compile checks for the updated sketches, and human-gated hardware tests for L293D motor behavior remain required before claiming field readiness.
