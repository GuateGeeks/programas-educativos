## ADDED Requirements

### Requirement: Canonical hardware contract

The program SHALL target a single, explicitly documented hardware configuration: an ESP32 development board driving a 1.28-inch round GC9A01 TFT LCD module (240×240, IPS, RGB565) over SPI, with **no** real-time-clock module and **no** SD-card module.

#### Scenario: Pin map is published once and used everywhere

- **WHEN** a teacher or student reads the materials page or any sketch README
- **THEN** the same pin map is stated: VCC→3.3 V, GND→GND, SCL→GPIO18, SDA→GPIO23, DC→GPIO25, CS→GPIO26, RST→GPIO27

#### Scenario: Sketches agree with the published pin map

- **WHEN** any sketch in `arduino/tiempo-circular/` is inspected
- **THEN** its pin `#define` values match the published pin map exactly

#### Scenario: No RTC or SD hardware is required

- **WHEN** the hardware shopping list is read
- **THEN** it contains no real-time-clock module and no SD-card module, and the time source is documented as `millis()` followed by NTP over the ESP32's own WiFi

### Requirement: Six layered sketches, each isolating one subsystem

The program SHALL ship exactly six Arduino sketches under `arduino/tiempo-circular/`, ordered so that each one exercises a single new subsystem and can be used to localise a fault by returning to the previous layer.

#### Scenario: The six sketches exist with their layered names

- **WHEN** `arduino/tiempo-circular/` is listed
- **THEN** it contains `01_pantalla_viva`, `02_color_y_bits`, `03_geometria_circular`, `04_reloj_millis`, `05_reloj_ntp`, and `06_cholqij`, each as a directory holding `<name>.ino` and `README.md`

#### Scenario: Each sketch carries its didactic wrapper

- **WHEN** a sketch's `README.md` is read
- **THEN** it states the subsystem under test, the pin reference, the assigned challenge level, what the student should observe on screen, and the evidence template for that session

#### Scenario: Sketch code is displayed from its single source

- **WHEN** a session page shows sketch code
- **THEN** the code is imported raw from the `.ino` file under `arduino/tiempo-circular/` via the existing `arduinoSketchRawImport` webpack rule, so the displayed code and the downloadable file cannot diverge

#### Scenario: Comments are in Spanish

- **WHEN** any sketch source is read
- **THEN** its explanatory comments are written in Spanish, consistent with the rest of the program's authored content

### Requirement: Sketch code is originally authored, not derived from the saved tutorial

All sketch code SHALL be written for this program. The saved tutorial in `watch/` SHALL be treated as a hardware, imagery and outcome reference; none of its code SHALL be reproduced or adapted.

#### Scenario: Origin is declared

- **WHEN** `arduino/tiempo-circular/LICENCIAS.md` is read
- **THEN** it states that the sketches are original work licensed MIT, that `watch/` supplied the pinout, wiring, library identification and the photographs used in the program, and that the saved page's code was unusable because method calls, string literals and numeric arguments were stripped from it

#### Scenario: Upstream imagery is attributed wherever it appears

- **WHEN** a page or README displays an image taken from `watch/esp32-round-circular-tft-lcd-display-assets/`
- **THEN** the image carries a visible credit naming esp32io.com / DIYables as its source, and the licences page records that these images are third-party material reproduced with attribution rather than GuateGeeks work

### Requirement: Time source progresses from millis() to NTP

The clock SHALL first be built on `millis()`, its drift SHALL be measured as a session activity, and NTP over WiFi SHALL be introduced afterwards as the correction, with the timezone fixed to UTC-6.

#### Scenario: The drifting clock comes first

- **WHEN** `04_reloj_millis` runs
- **THEN** it renders an analog and digital time display driven by `millis()` and does not contact any network

#### Scenario: Drift is measurable by students

- **WHEN** a team follows session 9
- **THEN** the material gives a procedure to compare the device against a reference clock over a stated interval and to record the accumulated error with significant figures

#### Scenario: NTP corrects the drift

- **WHEN** `05_reloj_ntp` runs with valid WiFi credentials
- **THEN** it obtains time over NTP, applies a UTC-6 offset, and renders the corrected time

#### Scenario: A no-network fallback keeps the program complete

- **WHEN** a school has no usable WiFi
- **THEN** session 10 provides an alternate path that still delivers its evidence without a network connection, and the program can be completed without NTP

### Requirement: Hardware verification is human-gated and unclaimed

Because no physical hardware is available for this change, the program SHALL NOT claim that any sketch has been verified on hardware.

#### Scenario: Unverified status is explicit

- **WHEN** a sketch README or the troubleshooting page is read
- **THEN** it states that the sketch has not been validated on physical hardware and marks on-hardware verification as a pending human-gated step

#### Scenario: Compilation is the only automated check claimed

- **WHEN** the change reports what was checked
- **THEN** it reports at most a compile check performed with `arduino-cli` against the ESP32 core, and reports honestly if even that could not be run

### Requirement: ESP32 toolchain setup is documented separately from the Uno workflow

The program SHALL document ESP32 board-manager and driver setup, because it differs from the Arduino Uno toolchain used by GuateGeeks SMARS.

#### Scenario: Setup instructions are available

- **WHEN** a teacher prepares machines for the first coding session
- **THEN** the materials or troubleshooting page explains adding the ESP32 board manager URL, selecting the board, installing the USB-serial driver, and installing the `DIYables_TFT_Round` library with its dependencies
