## 1. Hardware Contract

- [x] 1.1 Confirm the exact classroom L293D shield target in the implementation notes: AFMotor-compatible Motor Shield v1 clone, Bluino-compatible shield, or a different L293D shield.
- [x] 1.2 Update `docs/guategeeks/materiales.mdx` so the canonical driver is an L293D motor shield, not TB6612FNG.
- [x] 1.3 Replace the canonical pin table with the L293D shield mapping: motors on M1/M2, buzzer A0, buttons A1/A2, HC-SR04 A3/A4, A5 spare or entropy.
- [x] 1.4 Update power guidance to describe shield motor power, polarity checks, shield power indicator checks, and why Arduino 5V must not power motors.
- [x] 1.5 Remove TB6612FNG drop-in substitution language from the default kit path and replace it with an explicit warning that bare drivers require different code and wiring.
- [x] 1.6 Update `arduino/guategeeks/HARDWARE_SHOPPING_LIST.md`, `README.md`, `TROUBLESHOOTING.md`, and `LICENCIAS.md` to match the L293D shield contract.
- [x] 1.7 Update `docs/guategeeks/seguridad.mdx` and `docs/guategeeks/plantillas.mdx` so safety checks and templates use the shield contract.
- [x] 1.8 Audit `src/data/guategeeks/sessions.ts` and update any session summary, material, or sketch text that names TB6612FNG or old driver pins.

## 2. Firmware Migration

- [x] 2.1 Update `01_botones_y_buzzer` constants and README so buttons use A1/A2 and buzzer uses A0.
- [x] 2.2 Update `02_prueba_motores` to use the L293D shield motor API for left M1 and right M2, preserving signed speed semantics.
- [x] 2.3 Update `03_prueba_ultrasonido` constants and README so TRIG uses A3 and ECHO uses A4.
- [x] 2.4 Update `04_smars_autonomo` to use the shield motor abstraction, revised peripheral pins, and A5 entropy while preserving autonomous behavior.
- [x] 2.5 Update `05_asistente_calibracion` to drive the shield motors and keep the serial calibration workflow.
- [x] 2.6 Document the motor shield dependency in every affected sketch README and in the top-level Arduino README.
- [x] 2.7 If using AFMotor, add `#include <AFMotor.h>` and code comments that explain M1/M2 without exposing shield internals to students.
- [x] 2.8 Add or update troubleshooting guidance for reversed motor direction: swap the two terminal wires or adjust a documented inversion constant.
- [x] 2.9 Ensure all code listings displayed in Docusaurus still import from the canonical `.ino` files under `arduino/guategeeks/`.

## 3. Visual Build Guide

- [x] 3.1 Create an image placement map for the implementation using `img-smars/` filenames, target pages, captions, and any warning needed for non-canonical visible items.
- [x] 3.2 Update `docs/guategeeks/index.mdx` with a finished SMARS visual reference while keeping the current overview format.
- [x] 3.3 Add visual subsystem references to `docs/guategeeks/01-sistemas-del-robot.mdx` after the `SessionModule` block.
- [x] 3.4 Add printed-part visual guidance to `docs/guategeeks/03-slicer-y-tolerancias.mdx`.
- [x] 3.5 Add quality-control visual guidance to `docs/guategeeks/04-impresion-y-control-de-calidad.mdx`.
- [x] 3.6 Add the main mechanical construction guide to `docs/guategeeks/05-ensamblaje-de-orugas.mdx` using motor soldering, motor fitting, holders, wheels, and track images.
- [x] 3.7 Add L293D shield visual guidance to `docs/guategeeks/07-dos-motores-y-direccion.mdx` only where the image matches the selected shield workflow.
- [x] 3.8 Add integrated-robot visual references to sessions 10 and 12 if the images clarify autonomous integration or final demonstration.
- [x] 3.9 Keep images out of `SessionModule.Phase` blocks and place them in supplemental sections with alt text and concise captions.
- [x] 3.10 Omit Bluetooth/app guidance from the core course, even when adapting export steps that mention it.

## 4. Attribution and Course Content

- [x] 4.1 Update `docs/guategeeks/licencias.mdx` with the confirmed provenance for `smars_export/` and `img-smars/` assets.
- [x] 4.2 Rewrite export-derived construction steps as GuateGeeks-authored Spanish instructional text, avoiding long copied passages.
- [x] 4.3 Add captions or warnings for any image that shows a rectangular 9V battery, Bluetooth/app context, or non-canonical visible component.
- [x] 4.4 Update session materials and evidence prompts where the L293D shield changes what students must photograph, test, or document.
- [x] 4.5 Keep the CNB and international standards references intact unless the session learning evidence changes materially.

## 5. Consistency Audits

- [x] 5.1 Run a repository search for `TB6612`, `STBY`, `PWMA`, `PWMB`, `AIN1`, `AIN2`, `BIN1`, and `BIN2`; resolve remaining default-path references or label them as legacy comparison notes.
- [x] 5.2 Run a repository search for old pin descriptions `D11 ECHO`, `D12 TRIG`, `D2 botón`, and `D3 botón`; update them to the L293D-compatible pin table where appropriate.
- [x] 5.3 Verify no GuateGeeks page teaches Bluetooth, phone remote control, or Android app control as part of the core autonomous course.
- [x] 5.4 Verify every visual image path resolves locally and every added image has meaningful alt text.
- [x] 5.5 Reconcile the active `guategeeks-smars-ciclo-basico` TB6612FNG requirements before archive/sync so OpenSpec does not contain contradictory hardware contracts.

## 6. Verification

- [x] 6.1 Run the Docusaurus build and fix MDX/image/import errors introduced by the update.
- [x] 6.2 Compile all five `arduino/guategeeks` sketches for Arduino Uno with the documented motor shield dependency installed, recording core and library versions.
- [ ] 6.3 Human-gated: load `02_prueba_motores` on an Arduino Uno with the selected L293D shield and verify lifted left/right track direction, speed, and stop behavior.
- [ ] 6.4 Human-gated: load `04_smars_autonomo` and verify buttons, buzzer, ultrasonic readings, obstacle evasion, and no brownout under the selected battery pack.
- [ ] 6.5 Human-gated: run `05_asistente_calibracion` and record whether serial commands still adjust left/right offsets as documented.
