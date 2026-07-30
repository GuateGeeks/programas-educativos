## Current Implementation Audit

All 12 Spanish module pages and all 12 English module pages contain `Module.Context`, `Module.Concepts`, and exactly four `Module.Phase` entries in the expected `act`, `exp`, `cre`, `ref` sequence. The current implementation content is useful but brief: each phase is generally one or two sentences and does not consistently name teacher moves, team actions, evidence, debugging prompts, safety cues, or grade differentiation.

| Module | Current Context Focus | Concepts Present | Current Phase Titles |
| --- | --- | --- | --- |
| 01 Mapper Bot | Robot draws community maps with distance, turns, loops, and marker calibration. | Sequence, wheel-distance, 90/45 turns, loops, calibration. | City blueprints; drawing robot design; build/program/calibrate; error to precision. |
| 02 Delivery Bot | Local delivery service with route, compartment, buttons, display, and access logic. | Subroutines, motorized compartment, route sequences, buttons/PIN, secure design. | Delivery services; compartment mechanism; route with access; safety and user experience. |
| 03 Forklift | Warehouse/market load movement with measured driving and motorized lifting. | Maneuverability, distance movement, rack and pinion, lifting, precision testing. | Logistics; chassis/forks; pick and place; precision from data. |
| 04 Repair Arm | Water infrastructure repair with color sensing, marks, arm, gripper, and replacement. | Color sensor, black mark signal, manipulator, urban maintenance, collaboration. | Water infrastructure; detection and arm; remove and replace; sensors as decisions. |
| 05 Tower Crane | Construction crane with pulley mechanics, winch, motor positions, manual/autonomous control. | Pulleys, winch/rope, angular position, manual/autonomous control, balance. | Building at height; pulleys/load; move loads; force/balance/safety. |
| 06 Compact Loader | Orientation control with yaw/gyroscope, corrected motion, 45-degree turns, and blade task. | Yaw, trajectory correction, blade, center of gravity, urban movement. | Small machines; hub orientation; blade route; feedback control. |
| 07 Sorting Arm | Color-based package sorting with conditionals, angular positions, subroutines, classification. | Color sorting, conditionals, subroutines, angular positions, error correction. | Sorting uses; arm/sensor; four colors; object to data. |
| 08 Bridge Builder | Staged bridge construction with transmission, color references, arm positions, progress. | Staged construction, color sensor, bevel gears, manipulator positions, measurement. | Community bridges; traction/arm; place sections; infrastructure planning. |
| 09 Elevator | Stateful system with current floor, selected floor, max floor, doors, and initial reference. | Variables, events/messages, state vs. destination, safety doors, calibration. | Real elevators; memory system; select/move floors; safety/state. |
| 10 City Car | Autonomous urban route using color markers, messages, orientation, and stop/charge choices. | Autonomous navigation, color markers, messages, yaw turns, route design. | Cars/traffic; markers/decisions; urban circuit; vehicle communication. |
| 11 Fire Rescue Unit | Emergency robot uses distance sensing, lifting arm, color sensor, and neutralization/rescue. | Emergency robotics, distance sensor, parallelogram arm, color detection, shortest path. | Emergencies; entry/search/arm; search and neutralize; human purpose. |
| 12 Ferris Wheel | Technical closer with speed, tilt, smooth acceleration, variables, parallel programs, emergency stop. | Smooth acceleration, speed variable, parallel control, tilt, emergency stop. | Fun/safety; motors/controls; manual/autonomous; engineering showcase. |

## Authoring Checklist

Each phase body should stay compact and naturally include the relevant parts of this pattern:

- Teacher move: what the teacher shows, asks, constrains, or checks.
- Team action: what students build, test, measure, decide, or document.
- Checkpoint/evidence: the artifact or observable state that proves readiness to continue.
- Debugging/iteration: the question teams use when the robot does not behave as expected.
- Safety/handling: the cue needed for motors, arms, loads, strings, elevators, moving robots, or public demonstrations.
- Grade differentiation: 1.º basic observes/builds with guidance, 2.º basic measures and debugs, 3.º basic redesigns, documents, transfers, or justifies.

## Module Implementation Map

| Module | Mechanism / Decision | Likely Failure Modes | Evidence Artifact | Safety / Handling Cue | Grade Differentiation Cue |
| --- | --- | --- | --- | --- | --- |
| 01 Mapper Bot | Differential drive, marker position, measured turns, looped drawing. | Marker off-axis, wheel slip, wrong turn angle, surface drag. | Before/after drawing, distance/error table, calibration note. | Keep hands clear while moving; lift robot before changing marker. | 1.º trace shapes; 2.º quantify error; 3.º improve route or create map extension. |
| 02 Delivery Bot | Motorized compartment, route subroutines, button/PIN access. | Door binding, PIN order error, route drift, obstacle handling missing. | Delivery test log with route, PIN, door state, result. | Do not force lid or gears; keep payload light. | 1.º run guided route; 2.º debug access sequence; 3.º design exception handling. |
| 03 Forklift | Rack and pinion lift, forks, measured approach, load placement. | Fork height mismatch, tipping load, overshoot, turn drift. | Attempt/error/adjustment table and target-distance measure. | Move with low load; keep fingers away from lift. | 1.º identify lift positions; 2.º measure placement error; 3.º optimize repeatability. |
| 04 Repair Arm | Color mark detection, gripper, replacement sequence. | Sensor threshold issue, gripper misalignment, piece drop, stopping too late. | Sensor reading table, repair sequence photo, improvement note. | Test gripper slowly; avoid pinching fingers. | 1.º compare colors; 2.º tune threshold; 3.º justify sensor-based control. |
| 05 Tower Crane | Pulley/winch, angular position, lift/rotate transfer. | Rope tangles, load swing, unstable base, motor position drift. | Safe-load transfer log with height, angle, and stability. | Keep load light; clear swing area; stop if base lifts. | 1.º observe pulley action; 2.º measure transfer precision; 3.º add safe operating limits. |
| 06 Compact Loader | Yaw reset, heading correction, 45-degree turns, blade movement. | Wrong hub orientation, yaw not reset, drift on surface, object jams. | Expected vs. actual path sketch and yaw/drift note. | Keep blade clear; use small/light objects. | 1.º compare corrected/uncorrected; 2.º measure drift; 3.º tune correction logic. |
| 07 Sorting Arm | Color calibration, subroutines, angular bin positions. | Ambiguous color readings, arm overshoot, weak grip, wrong bin mapping. | Color calibration table and accuracy count by color. | Keep fingers out of gripper and sweep area. | 1.º sort two colors; 2.º record accuracy; 3.º add recovery for unknown color. |
| 08 Bridge Builder | 4x4 transmission, color references, staged arm placement. | Section misalignment, missed color mark, traction slip, arm height error. | Section placement log and photo of staged bridge. | Stabilize sections before moving robot; keep path clear. | 1.º place one section; 2.º measure alignment; 3.º redesign sequence for repeatability. |
| 09 Elevator | Variables for state, winch movement, doors, force sensor reference. | Floor state mismatch, door opens at wrong time, overshoot, calibration missing. | State table with current/destination floors and door status. | Keep fingers clear of doors/winch; test without payload first. | 1.º trace floor state; 2.º debug movement formula; 3.º add validation or limits. |
| 10 City Car | Color-marker decisions, messages, yaw-based turns, route behavior. | Color misread, marker spacing, collision risk, message-action mismatch. | Route map with color commands and decision log. | One robot per lane during tests; stop before retrieving robot. | 1.º follow simple route; 2.º compare routes; 3.º design multi-vehicle protocol. |
| 11 Fire Rescue Unit | Distance sensing, lifting arm, color detection, neutralization action. | False distance, arm height misses target, color sensor noise, unsafe route. | Rescue run log with distance, color, action, and failure point. | Simulate hazards only; keep hand away from lifting arm. | 1.º identify sensors; 2.º tune search data; 3.º optimize path and ethical explanation. |
| 12 Ferris Wheel | Parallel programs, speed variable, tilt motor, emergency stop. | Abrupt acceleration, tilt beyond limit, parallel conflict, stop not responsive. | Safety test checklist with speed range, tilt limit, stop result. | Test at low speed first; stop before touching the model. | 1.º identify controls; 2.º test safe ranges; 3.º prepare showcase justification. |

## Density Review

The enriched implementation text remains compatible with the existing `<Module>` and `<PhaseTimeline>` renderer. Each phase body is still plain text rendered inside one `phaseCopy` paragraph, with no nested MDX blocks, lists, or new component requirements. The current phase cards support the added detail through wrapping text, so no React or CSS change is required for this change.
