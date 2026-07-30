## ADDED Requirements

### Requirement: L293D Shield Motor API Adaptation
The GuateGeeks Arduino sketches SHALL control the two SMARS track motors through the canonical L293D motor shield instead of direct TB6612FNG pins.

#### Scenario: Motor sketch uses shield ports
- **WHEN** `arduino/guategeeks/02_prueba_motores/02_prueba_motores.ino` is inspected
- **THEN** it creates left and right motor controls for shield ports `M1` and `M2` and does not define TB6612FNG pin constants

#### Scenario: Autonomous sketch uses shield ports
- **WHEN** `arduino/guategeeks/04_smars_autonomo/04_smars_autonomo.ino` is inspected
- **THEN** its `mover(int izquierda, int derecha)` behavior is implemented through the L293D shield motor abstraction and no longer writes to `STBY`, `PWMA`, `PWMB`, `AIN1`, `AIN2`, `BIN1`, or `BIN2`

#### Scenario: Calibration sketch uses shield ports
- **WHEN** `arduino/guategeeks/05_asistente_calibracion/05_asistente_calibracion.ino` is inspected
- **THEN** its serial calibration commands adjust left and right signed motor speeds through the L293D shield abstraction

#### Scenario: Signed speed semantics preserved
- **WHEN** a sketch calls the motor helper with positive, negative, or zero speed
- **THEN** positive speed runs the track forward, negative speed runs it backward, and zero releases or stops the motor according to the documented shield behavior

### Requirement: Documented Motor Library Dependency
The course SHALL document and verify any Arduino library dependency required by the selected L293D shield.

#### Scenario: AFMotor dependency declared
- **WHEN** the implementation targets an Adafruit Motor Shield v1-compatible L293D shield
- **THEN** affected sketches include `AFMotor.h`, affected READMEs document how to install the AFMotor/Adafruit Motor Shield V1 library, and the software page no longer claims the motor sketches have no external dependency

#### Scenario: Compile command includes dependency context
- **WHEN** compile verification is recorded
- **THEN** the output or notes identify the Arduino core version and the motor shield library version or source used for the build

#### Scenario: Dependency exception is explicit
- **WHEN** a physical L293D shield is not AFMotor-compatible and uses a different API
- **THEN** the code, docs, and verification notes identify the exact shield model and library or direct-control method used

### Requirement: Peripheral Pin Reassignment in Code
All GuateGeeks Arduino sketches SHALL use the L293D-compatible peripheral pin table.

#### Scenario: Button and buzzer pins updated
- **WHEN** `01_botones_y_buzzer` and `04_smars_autonomo` are inspected
- **THEN** MODO uses `A1`, INICIO uses `A2`, buzzer uses `A0`, and both buttons retain `INPUT_PULLUP` behavior

#### Scenario: Ultrasonic pins updated
- **WHEN** `03_prueba_ultrasonido` and `04_smars_autonomo` are inspected
- **THEN** HC-SR04 `TRIG` uses `A3`, `ECHO` uses `A4`, and distance conversion behavior remains `duration / 58` with the existing timeout sentinel

#### Scenario: Entropy pin remains unconnected
- **WHEN** the autonomous sketch seeds random behavior from an analog pin
- **THEN** it uses an unconnected pin such as `A5` and documents that the pin must remain unused for that purpose

#### Scenario: Readme pin tables match code
- **WHEN** a sketch README documents pin assignments
- **THEN** every pin listed matches constants used by the corresponding `.ino` file

### Requirement: Autonomous Behavior Preserved
The L293D adaptation SHALL preserve the classroom behavior of the existing GuateGeeks sketches.

#### Scenario: Phone-free operation remains
- **WHEN** the autonomous firmware is described or run
- **THEN** mode selection and start/pause remain controlled by local buttons and buzzer feedback, not by Bluetooth, phone, or external app

#### Scenario: Obstacle evasion remains randomized
- **WHEN** an obstacle is detected within the configured threshold
- **THEN** the robot brakes or releases motors as documented, signals with the buzzer, reverses, chooses a randomized turn direction/duration, and then resumes measurement

#### Scenario: Differential-drive learning objective remains
- **WHEN** sessions 7, 10, or 11 explain movement
- **THEN** they still teach independent left/right track speeds, signed speed, turning by different or opposing speeds, and calibration offsets

#### Scenario: Motor direction calibration supported
- **WHEN** one motor runs opposite the expected direction after wiring
- **THEN** the troubleshooting guide gives a clear correction path: swap that motor's two terminal wires or change a documented per-motor inversion constant, then re-run the lifted motor test

### Requirement: Verification Gates for L293D Firmware
The L293D firmware change SHALL distinguish automated compile verification from human-gated hardware verification.

#### Scenario: Automated compile verification
- **WHEN** implementation claims the Arduino sketches are build-ready
- **THEN** compile output exists for all five sketch directories with the selected Arduino Uno core and documented L293D shield dependency

#### Scenario: Human-gated motor verification
- **WHEN** tasks require observing track direction, speed, heat, brownout behavior, or sensor response on the physical robot
- **THEN** those tasks remain marked human-gated until a named tester records the result

#### Scenario: Site code display remains synchronized
- **WHEN** a session page displays a sketch
- **THEN** the displayed code and the downloadable sketch derive from the same canonical `.ino` file under `arduino/guategeeks/`
