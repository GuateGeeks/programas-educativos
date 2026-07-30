## Context

GuateGeeks currently documents a phone-free autonomous SMARS build around Arduino Uno, TB6612FNG, two buttons, buzzer, HC-SR04, and five Arduino sketches. The user confirmed a new direction: use the L293D motor shield and the local `smars_export/` plus `img-smars/` material to enrich the current GuateGeeks documentation format.

This is a cross-cutting hardware change. The current TB6612FNG contract appears in MDX docs, session metadata, Arduino sketches, README files, shopping lists, troubleshooting, safety notes, and active OpenSpec change specs. The L293D shield also changes pin availability: common Arduino Motor Shield v1-compatible boards use shield-controlled digital pins for motor speed/direction and expose analog pins for external sensors or controls.

Reference constraints:

- The current GuateGeeks format is one MDX page per session, with `SessionModule` holding the pedagogical structure and extra visual sections after the module.
- `SessionModule.Phase` bodies should stay text-only because the component renders phase body content in compact paragraph layout.
- Adafruit's Motor Shield v1 documentation says the AF_Motor library is required for that shield family and documents shield-owned pins and power cautions.
- TI's L293D documentation identifies the L293D as a quadruple half-H driver with 600 mA per channel typical L293D output capability and separate logic/motor supply concerns.

## Goals / Non-Goals

**Goals:**

- Make the L293D motor shield the canonical driver for the GuateGeeks SMARS course variant.
- Update the hardware contract, pin table, power guidance, safety checklist, materials, session descriptions, and firmware wrappers to match the shield.
- Preserve the existing 12-session GuateGeeks learning progression and Docusaurus/MDX format.
- Use `img-smars/` to add visual construction guidance to the current docs without redesigning the docs platform.
- Adapt the motor sketches so the same high-level signed-speed behavior works through the L293D shield.
- Keep the classroom robot autonomous and locally operated through buttons and buzzer, not Bluetooth/app remote control.

**Non-Goals:**

- Do not redesign the GuateGeeks documentation UI or create a new visual component unless plain MDX images prove insufficient.
- Do not import the Instructables text verbatim; use it as construction sequence reference and write GuateGeeks-authored instructional text.
- Do not adopt Bluetooth, Android app control, or phone-based operation from the export.
- Do not claim hardware readiness without a human-gated physical test on the actual L293D shield.
- Do not preserve the old TB6612FNG pin table as a co-equal default in this course variant.

## Decisions

### Use an AFMotor-compatible L293D shield baseline

The implementation will target an Arduino Motor Shield v1-compatible L293D shield using the `AFMotor` library unless the physical shield in hand is proven to require a different API. This matches the common L293D shield family and the local SMARS export's motor-shield workflow.

Alternatives considered:

- Keep TB6612FNG and use shield photos only for mechanical steps. Rejected because the user explicitly requested the L293D shield.
- Drive the shield without a library. Rejected for the v1-compatible baseline because the shield uses latch-controlled motor direction and official documentation treats the library as required.
- Use Motor Shield v2. Rejected because v2 is not L293D-based and would not match the user's requested shield.

### Move classroom peripherals to analog pins used as digital I/O

The shield will own the motor-related digital pins. GuateGeeks peripherals will move away from the old TB6612FNG pins:

| Function | Proposed canonical assignment |
|---|---|
| Left motor | Shield port M1 |
| Right motor | Shield port M2 |
| Buzzer | A0 |
| MODO button | A1 with `INPUT_PULLUP` |
| INICIO button | A2 with `INPUT_PULLUP` |
| HC-SR04 TRIG | A3 |
| HC-SR04 ECHO | A4 |
| Random seed / spare | A5, unconnected if used for entropy |

The implementation should document D3-D12 as shield-owned or unavailable for student peripherals in the canonical build. This keeps the pin table simple and avoids subtle conflicts with motor PWM, latch, servo headers, and future use of M3/M4.

Alternatives considered:

- Keep buttons on D2/D3. Rejected because D3 is used by common shield motor PWM and the single digital exception makes classroom wiring harder to reason about.
- Keep HC-SR04 on D11/D12. Rejected because those pins are shield-owned in v1-compatible L293D shields.
- Use A4/A5 for sensor and A3 for buzzer. Rejected because A5 is useful as the same unconnected entropy source already used by the autonomous sketch.

### Preserve the existing motor API shape in sketches

The sketches should continue exposing high-level helpers such as `mover(int izquierda, int derecha)`, `frenar()`, and signed-speed motor commands. Internally, the implementation maps signed values to `AF_DCMotor.setSpeed(abs(v))` and `AF_DCMotor.run(FORWARD/BACKWARD/RELEASE)`.

This minimizes pedagogical churn: students still learn differential drive, speed with sign, calibration offsets, and obstacle-evasion behavior. The low-level implementation changes from TB6612FNG pins to shield motor ports.

### Keep NiMH/external motor power guidance, not rectangular 9V as recommendation

Some SMARS export imagery shows a rectangular 9V battery. The L293D shield documentation and classroom reliability both argue against presenting that as the recommended motor supply. The implementation should use the visual if helpful only with captions that separate photo reference from the GuateGeeks power standard.

The canonical power guidance should specify a suitable rechargeable pack for motors, correct shield jumper state, polarity checks, motor-power LED checks, common ground where applicable, and a lifted-robot motor test before allowing floor movement.

### Add visual guidance after modules, not inside `SessionModule`

Each enriched session keeps the existing `SessionModule` block intact and adds a short `## Guía visual de construcción` or similarly named section after it. Images use local paths from `img-smars/`, concise captions, and alt text that describes the construction state.

The first pass should prioritize:

- `index.mdx`: finished robot reference image.
- Sessions 1, 3, 4: subsystems, printed parts, quality-control references.
- Session 5: soldering motors, fitting motors, motor holders, wheels, tracks.
- Sessions 7, 10, 12: shield/motor wiring, integrated robot, autonomous demonstration, only where the image matches the L293D shield course variant.
- `materiales.mdx` and `licencias.mdx`: visual BOM/provenance notes.

### Treat export content as a sequence source, not as authoritative prose

The implementation should map the 16 export steps to the course, but rewrite the content for GuateGeeks:

- Keep: printed parts, motor preparation, motor fitting, holders, wheels, Arduino/shield mounting, motor terminal connection, track assembly, final sharing/showcase.
- Rewrite: motor testing, battery placement, power wiring, and shield mounting to match classroom safety and the selected L293D shield.
- Exclude from the core course: Bluetooth/app remote control and phone-based operation.

## Risks / Trade-offs

- **Shield variant mismatch** -> Before implementation finalization, confirm whether the physical board is Adafruit Motor Shield v1-compatible, Bluino-compatible, or another L293D shield. If not compatible with `AFMotor`, update the pin/API contract before editing all docs.
- **External library dependency** -> Record `AFMotor` installation in `arduino/guategeeks/README.md`, each affected sketch README, and `docs/guategeeks/materiales.mdx`. Compile verification must include the library version/source.
- **Pin collisions** -> Replace every TB6612FNG pin reference and audit all sketches/docs for D3-D12 student peripheral use.
- **Power reliability** -> Keep the recommendation away from rectangular 9V batteries for motor operation, even if the export photos show one. Add explicit captions or omit those images where they would teach the wrong power practice.
- **License/provenance ambiguity** -> Since the user confirmed use of the assets, document the confirmed source and attribution in `licencias.mdx`, but avoid copying long Instructables prose.
- **Active OpenSpec conflict** -> This change supersedes TB6612FNG assumptions from `guategeeks-smars-ciclo-basico`. Applying both without reconciling specs can reintroduce contradictory requirements.

## Migration Plan

1. Establish the new L293D shield contract in materials, safety, session index, Arduino README, shopping list, troubleshooting, and session metadata.
2. Adapt the motor sketches and wrappers to the selected shield API while preserving behavior at the helper-function level.
3. Reassign buttons, buzzer, HC-SR04, and entropy pin references across code and docs.
4. Add visual construction sections to the GuateGeeks docs using `img-smars/`.
5. Update attribution/licensing for SMARS images and export-derived construction guidance.
6. Run Docusaurus build and Arduino compile checks with the documented dependency set.
7. Leave physical motor/sensor/autonomous tests marked as human-gated until tested on the actual shield.

Rollback strategy: revert the L293D docs/code change set as one unit and restore the TB6612FNG hardware contract. Do not mix a TB6612FNG pin table with L293D shield photos or sketches.

## Open Questions

- Which exact L293D shield model will be used in classrooms: Adafruit Motor Shield v1-compatible, Bluino, or another clone?
- Should GuateGeeks distribute a local copy/vendor note for `AFMotor`, or only document installation through Arduino Library Manager?
- Should photos that show a rectangular 9V battery be omitted entirely, or included only with warning captions?
