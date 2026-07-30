## ADDED Requirements

### Requirement: Canonical L293D Shield Driver
GuateGeeks SHALL define an Arduino-compatible L293D motor shield as the canonical motor driver for this SMARS course variant.

#### Scenario: Driver identification
- **WHEN** any GuateGeeks SMARS document, sketch, README, shopping list, or troubleshooting page identifies the motor driver
- **THEN** it identifies the canonical driver as an L293D motor shield and does not present TB6612FNG as the default driver for this variant

#### Scenario: Obsolete TB6612FNG signals removed
- **WHEN** a learner follows the canonical pin table or motor-driver explanation
- **THEN** the instructions do not ask them to wire `STBY`, `PWMA`, `PWMB`, `AIN1`, `AIN2`, `BIN1`, or `BIN2` as external driver pins

#### Scenario: Motor terminals named by shield port
- **WHEN** the two track motors are connected
- **THEN** the left track motor is assigned to shield port `M1` and the right track motor is assigned to shield port `M2`, with a note that reversing one motor's direction is corrected by swapping that motor's two terminal wires or by a documented software inversion

### Requirement: Shield-Compatible Pin Allocation
The canonical pin table SHALL reserve shield-owned digital pins for the L293D motor shield and move student peripherals to non-conflicting pins.

#### Scenario: Peripheral pin table
- **WHEN** the canonical GuateGeeks SMARS pin table is inspected
- **THEN** it assigns buzzer to `A0`, MODO button to `A1` with `INPUT_PULLUP`, INICIO button to `A2` with `INPUT_PULLUP`, HC-SR04 `TRIG` to `A3`, HC-SR04 `ECHO` to `A4`, and leaves `A5` available for entropy or spare use

#### Scenario: Shield-owned pins are not reused
- **WHEN** documentation instructs students where to connect buttons, buzzer, HC-SR04, or future classroom peripherals
- **THEN** it does not assign those peripherals to digital pins owned or plausibly occupied by the L293D motor shield, including D3-D12 in the canonical build

#### Scenario: Session references stay consistent
- **WHEN** sessions 6 through 11 describe buttons, buzzer, ultrasonic sensing, motor testing, autonomous behavior, or calibration
- **THEN** their pin names and diagrams match the canonical L293D shield pin table

### Requirement: L293D Power and Safety Guidance
The course SHALL provide power and safety guidance specific to L293D motor shields and classroom SMARS use.

#### Scenario: Motor supply is separate from Arduino 5V
- **WHEN** the materials or safety page explains motor power
- **THEN** it states that motor current is supplied through the shield's motor-power input or documented external supply path, not from the Arduino 5V pin

#### Scenario: Rectangular 9V battery is not recommended
- **WHEN** an image or construction reference shows a rectangular 9V battery
- **THEN** the accompanying GuateGeeks text either omits that power approach or labels it as non-canonical for reliable classroom motor testing

#### Scenario: Polarity and power indicator checks
- **WHEN** students energize the shield for the first motor test
- **THEN** the checklist requires verifying battery polarity, shield power indicator state where available, motor terminal tightness, and robot-lifted test posture before the tracks touch the floor

#### Scenario: Current limitation is visible
- **WHEN** the L293D is described in teacher-facing or safety material
- **THEN** the material mentions that L293D-based shields are for small DC motors and that overheating, brownouts, or weak movement require checking motor current, battery condition, friction, and wiring before increasing speed

### Requirement: Materials and Shopping List Alignment
The course SHALL update its materials contract so the physical kit matches the L293D shield build.

#### Scenario: Kit list includes shield
- **WHEN** a docent reviews the electronic kit list
- **THEN** it lists one Arduino-compatible L293D motor shield, two compatible gearmotors, the selected battery holder or rechargeable pack, motor terminal wiring, HC-SR04, two buttons, and buzzer

#### Scenario: Deprecated driver substitutions are removed from default path
- **WHEN** the materials page lists substitutions
- **THEN** TB6612FNG, DRV8833, or other bare-driver modules are not shown as drop-in substitutions for this L293D shield variant without a warning that code and wiring must change

#### Scenario: Visual BOM matches written BOM
- **WHEN** `img-smars/` photos are used as bill-of-materials illustrations
- **THEN** captions identify any visible item that is illustrative only or not part of the canonical kit
