import React, {useState} from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import {GRADES, type GradeId, type Locale} from '@site/src/data/ciudadbots';
import PhaseTimeline, {type Phase} from '@site/src/components/PhaseTimeline';
import FlagNote from '@site/src/components/FlagNote';
import BasicoAlignment from '@site/src/components/BasicoAlignment';
import InternationalAlignment from '@site/src/components/InternationalAlignment';
import RubricTable, {type RubricRow} from '@site/src/components/RubricTable';
import styles from './styles.module.css';

interface ShowcaseContent {
  phases: readonly Phase[];
  gradeNoteTitle: string;
  gradeNoteBody: string;
  intlNoteTitle: string;
  intlNoteBody: string;
  scaleNoteLead: string;
  scaleNoteBody: string;
  finalRubricHeader: string;
  finalRubric: readonly RubricRow[];
}

const gradeClosingCopy: Record<Locale, Record<GradeId, {expectation: string; evidence: readonly string[]; focus: readonly string[] }>> = {
  es: {
    '1-basico': {expectation: 'Construye una solución acotada, sigue una secuencia y explica con apoyo cómo responde a la necesidad.', evidence: ['Prototipo funcional o demostración guiada', 'Explicación oral o visual de las partes principales', 'Criterio sencillo para comprobar el resultado'], focus: ['Comprensión funcional', 'Ejecución guiada', 'Comunicación clara', 'Inicio']},
    '2-basico': {expectation: 'Compara pruebas, mejora una decisión técnica y comunica con datos por qué su solución funciona mejor.', evidence: ['Tabla de intentos y ajustes', 'Programa, diagrama o explicación del control', 'Comparación antes y después'], focus: ['Análisis de pruebas', 'Mejora con evidencia', 'Decisión técnica', 'Proceso']},
    '3-basico': {expectation: 'Diseña una solución propia, documenta el sistema y defiende cómo responde a una necesidad real de Guatemala.', evidence: ['Prototipo y documentación técnica', 'Evidencia de iteración con criterios', 'Presentación del impacto, límites y siguiente versión'], focus: ['Diseño autónomo', 'Documentación', 'Impacto local', 'Transferencia']},
  },
  en: {
    '1-basico': {expectation: 'Builds a focused solution, follows a sequence, and explains with support how it responds to the need.', evidence: ['Functional prototype or guided demonstration', 'Spoken or visual explanation of the main parts', 'Simple criterion to check the result'], focus: ['Functional understanding', 'Guided execution', 'Clear communication', 'Beginning']},
    '2-basico': {expectation: 'Compares tests, improves a technical decision, and uses data to explain why the solution works better.', evidence: ['Test and adjustment table', 'Program, diagram, or control explanation', 'Before-and-after comparison'], focus: ['Test analysis', 'Evidence-backed improvement', 'Technical decision', 'Process']},
    '3-basico': {expectation: 'Designs an original solution, documents the system, and defends how it responds to a real need in Guatemala.', evidence: ['Prototype and technical documentation', 'Iteration evidence using criteria', 'Presentation of impact, limits, and next version'], focus: ['Autonomous design', 'Documentation', 'Local impact', 'Transfer']},
  },
};

const gradeRubricDetails: Record<Locale, Record<GradeId, readonly RubricRow[]>> = {
  es: {
    '1-basico': [
      {criterion: 'Construcción guiada', levels: ['Completa la misión con apoyo mínimo y cuida la estabilidad del robot.', 'Arma el robot y cumple la misión siguiendo la guía.', 'Completa parte del armado o necesita ayuda frecuente.', 'No logra completar el armado ni comprobar la misión.']},
      {criterion: 'Secuencia y programa', levels: ['Explica el orden de los bloques y anticipa el movimiento.', 'Ejecuta la secuencia base y relaciona bloques con acciones.', 'Ejecuta la secuencia con apoyo y explica solo una parte.', 'No logra ejecutar ni explicar la secuencia.']},
      {criterion: 'Prueba y mejora', levels: ['Describe el error, prueba un cambio y explica el resultado.', 'Registra una prueba y propone un ajuste sencillo.', 'Observa el resultado, pero necesita guía para ajustar.', 'No registra una prueba ni reconoce qué debe cambiar.']},
      {criterion: 'Comunicación del equipo', levels: ['Presenta el robot con vocabulario técnico inicial y responde preguntas.', 'Describe qué construyó y cómo responde a la necesidad.', 'Explica con apoyo visual y deja aspectos sin aclarar.', 'No logra explicar el proceso o la relación con el reto.']},
    ],
    '2-basico': [
      {criterion: 'Diseño y funcionamiento', levels: ['Optimiza la solución y demuestra precisión y estabilidad con datos.', 'Construye una solución funcional y verifica criterios de desempeño.', 'La solución funciona parcialmente o depende de ajustes sin comparar resultados.', 'No logra relacionar el diseño con el desempeño observado.']},
      {criterion: 'Programa y control', levels: ['Modulariza el programa y justifica parámetros, sensores o ciclos.', 'Relaciona el código con el comportamiento y ajusta valores con intención.', 'Modifica el programa, pero explica solo una parte del efecto.', 'No logra conectar el código con el comportamiento del robot.']},
      {criterion: 'Datos e iteración', levels: ['Compara varias pruebas, identifica patrones y defiende la mejora elegida.', 'Registra intentos, mide un resultado y aplica una mejora verificable.', 'Registra datos incompletos o ajusta sin comparación suficiente.', 'No usa datos para orientar una mejora.']},
      {criterion: 'Comunicación técnica', levels: ['Argumenta decisiones con evidencia y responde preguntas sobre el proceso.', 'Explica qué cambió y por qué la versión final funciona mejor.', 'Comunica el resultado con apoyo y justifica parcialmente sus decisiones.', 'No logra justificar las decisiones técnicas del equipo.']},
    ],
    '3-basico': [
      {criterion: 'Solución autónoma', levels: ['Entrega una solución robusta, viable y conectada con una necesidad comunitaria.', 'Diseña y construye una solución propia que responde al reto.', 'Presenta un prototipo parcial o requiere apoyo para delimitar el problema.', 'No logra definir una solución relacionada con la necesidad.']},
      {criterion: 'Sistema y algoritmo', levels: ['Documenta una arquitectura clara, modular y transferible a otra situación.', 'Explica el algoritmo, componentes y decisiones principales con documentación.', 'Documenta solo una parte del sistema o deja relaciones sin explicar.', 'No presenta una explicación verificable del sistema.']},
      {criterion: 'Optimización con evidencia', levels: ['Analiza restricciones, compara versiones y defiende una optimización con datos.', 'Itera, mide el desempeño y justifica la versión final con evidencia.', 'Realiza cambios, pero la evidencia o el criterio de comparación son limitados.', 'No muestra una iteración sustentada en pruebas.']},
      {criterion: 'Impacto y defensa', levels: ['Defiende impacto, límites y siguiente versión con lenguaje técnico y perspectiva local.', 'Presenta la solución, su impacto en Guatemala y las decisiones del equipo.', 'Presenta el prototipo con vacíos en impacto, límites o comunicación técnica.', 'No logra comunicar el propósito ni el impacto de la solución.']},
    ],
  },
  en: {
    '1-basico': [
      {criterion: 'Guided construction', levels: ['Completes the mission with little support and keeps the robot stable.', 'Builds the robot and completes the mission using the guide.', 'Completes part of the build or needs frequent help.', 'Cannot complete the build or check the mission.']},
      {criterion: 'Sequence and program', levels: ['Explains the block order and predicts the movement.', 'Runs the base sequence and relates blocks to actions.', 'Runs the sequence with support and explains only part of it.', 'Cannot run or explain the sequence.']},
      {criterion: 'Testing and improvement', levels: ['Describes the error, tests a change, and explains the result.', 'Records a test and proposes a simple adjustment.', 'Observes the result but needs guidance to adjust.', 'Does not record a test or identify what should change.']},
      {criterion: 'Team communication', levels: ['Presents the robot with beginning technical vocabulary and answers questions.', 'Describes what was built and how it responds to the need.', 'Explains with visual support and leaves gaps.', 'Cannot explain the process or its link to the challenge.']},
    ],
    '2-basico': [
      {criterion: 'Design and performance', levels: ['Optimizes the solution and demonstrates precision and stability with data.', 'Builds a functional solution and checks performance criteria.', 'The solution works partly or needs adjustments without comparing results.', 'Cannot relate design decisions to observed performance.']},
      {criterion: 'Program and control', levels: ['Modularizes the program and justifies parameters, sensors, or loops.', 'Relates code to behavior and adjusts values intentionally.', 'Changes the program but explains only part of the effect.', 'Cannot connect code to robot behavior.']},
      {criterion: 'Data and iteration', levels: ['Compares several tests, identifies patterns, and defends the selected improvement.', 'Records attempts, measures a result, and applies a verifiable improvement.', 'Records incomplete data or adjusts without enough comparison.', 'Does not use data to guide an improvement.']},
      {criterion: 'Technical communication', levels: ['Argues decisions with evidence and answers process questions.', 'Explains what changed and why the final version works better.', 'Communicates with support and partly justifies decisions.', 'Cannot justify the team\'s technical decisions.']},
    ],
    '3-basico': [
      {criterion: 'Autonomous solution', levels: ['Delivers a robust, viable solution connected to a community need.', 'Designs and builds an original solution that responds to the challenge.', 'Presents a partial prototype or needs help narrowing the problem.', 'Cannot define a solution related to the need.']},
      {criterion: 'System and algorithm', levels: ['Documents a clear, modular architecture transferable to another situation.', 'Explains the algorithm, components, and main decisions with documentation.', 'Documents only part of the system or leaves relationships unclear.', 'Provides no verifiable explanation of the system.']},
      {criterion: 'Evidence-backed optimization', levels: ['Analyzes constraints, compares versions, and defends an optimization with data.', 'Iterates, measures performance, and justifies the final version with evidence.', 'Makes changes, but evidence or comparison criteria are limited.', 'Shows no test-supported iteration.']},
      {criterion: 'Impact and defense', levels: ['Defends impact, limits, and next version with technical language and local perspective.', 'Presents the solution, its impact in Guatemala, and team decisions.', 'Presents the prototype with gaps in impact, limits, or technical communication.', 'Cannot communicate the solution\'s purpose or impact.']},
    ],
  },
};

const gradeShowcasePhases: Record<Locale, Record<GradeId, readonly Phase[]>> = {
  es: {
    '1-basico': [
      {kind: 'act', label: 'Preparación · 20 min', title: 'Ordenar lo que construimos', body: 'Ayude al equipo a reunir el prototipo, el programa base y un dibujo de lo que el robot debe hacer. Ensayen una explicación breve con apoyo visual.'},
      {kind: 'cre', label: 'Presentación · 30 min', title: 'Demostrar la misión', body: 'Cada equipo muestra el robot en acción, señala sus partes principales y explica, con sus palabras, cómo responde a la necesidad planteada.'},
      {kind: 'ref', label: 'Reflexión · 15 min', title: 'Contar lo aprendido', body: 'Pregunte qué funcionó, qué fue difícil y qué cambiarían con más tiempo. Cierre reconociendo el proceso de construir y probar.'},
    ],
    '2-basico': [
      {kind: 'act', label: 'Preparación · 20 min', title: 'Organizar pruebas y decisiones', body: 'Pida al equipo seleccionar sus mejores intentos, anotar una medida antes y después, y preparar una explicación de la mejora realizada.'},
      {kind: 'cre', label: 'Presentación · 30-45 min', title: 'Demostrar con datos', body: 'Cada equipo presenta el robot, compara dos pruebas y explica qué parámetro, mecanismo o bloque modificó para obtener un mejor resultado.'},
      {kind: 'ref', label: 'Reflexión · 15 min', title: 'Defender una mejora', body: 'Converse sobre qué evidencia respalda la versión final, qué limitación permanece y cómo continuaría el equipo el diseño.'},
    ],
    '3-basico': [
      {kind: 'act', label: 'Preparación · 20 min', title: 'Construir el relato técnico', body: 'Pida al equipo organizar problema, restricciones, diagrama del sistema, pruebas y decisiones de diseño para presentar una solución propia.'},
      {kind: 'cre', label: 'Presentación · 45-60 min', title: 'Defender una solución', body: 'Cada equipo demuestra el prototipo, explica el algoritmo, justifica sus iteraciones y conecta la solución con una necesidad real de Guatemala.'},
      {kind: 'ref', label: 'Reflexión · 15 min', title: 'Proyectar la siguiente versión', body: 'Cierre identificando impacto, límites, riesgos y el siguiente experimento que permitiría mejorar o transferir la solución.'},
    ],
  },
  en: {
    '1-basico': [
      {kind: 'act', label: 'Preparation · 20 min', title: 'Organize what we built', body: 'Help the team gather the prototype, base program, and a drawing of what the robot should do. Rehearse a short explanation with visual support.'},
      {kind: 'cre', label: 'Presentation · 30 min', title: 'Demonstrate the mission', body: 'Each team shows the robot in action, points out its main parts, and explains in their own words how it responds to the need.'},
      {kind: 'ref', label: 'Reflection · 15 min', title: 'Share what we learned', body: 'Ask what worked, what was difficult, and what they would change with more time. Close by recognizing the process of building and testing.'},
    ],
    '2-basico': [
      {kind: 'act', label: 'Preparation · 20 min', title: 'Organize tests and decisions', body: 'Ask the team to select its best attempts, record one before-and-after measure, and prepare an explanation of the improvement.'},
      {kind: 'cre', label: 'Presentation · 30-45 min', title: 'Demonstrate with data', body: 'Each team presents the robot, compares two tests, and explains which parameter, mechanism, or block it changed for a better result.'},
      {kind: 'ref', label: 'Reflection · 15 min', title: 'Defend an improvement', body: 'Discuss what evidence supports the final version, what limitation remains, and how the team would continue the design.'},
    ],
    '3-basico': [
      {kind: 'act', label: 'Preparation · 20 min', title: 'Build the technical story', body: 'Ask the team to organize the problem, constraints, system diagram, tests, and design decisions for an original solution.'},
      {kind: 'cre', label: 'Presentation · 45-60 min', title: 'Defend a solution', body: 'Each team demonstrates the prototype, explains the algorithm, justifies iterations, and connects the solution to a real need in Guatemala.'},
      {kind: 'ref', label: 'Reflection · 15 min', title: 'Plan the next version', body: 'Close by identifying impact, limits, risks, and the next experiment that could improve or transfer the solution.'},
    ],
  },
};

// This page (the program's single closing session) is authored per locale as
// a plain object rather than via the <Module> compound-component pattern —
// unlike the 12 repeated modules, there's only one Showcase page, so the
// per-locale-MDX motivation (avoiding N-times structural repetition) doesn't
// apply. See openspec design for `neutralize-module-names-i18n`.
const content: Record<Locale, ShowcaseContent> = {
  es: {
    phases: [
      {
        kind: 'act',
        label: 'Preparación · 20 min',
        title: 'Ensayo con bitácora',
        body: 'Pida a cada equipo organizar evidencias CNB e internacionales: foto o video del robot, programa usado, tabla de pruebas, explicación de una mejora y conexión con una necesidad o criterio de seguridad del entorno. Esto facilitará la exposición y la evaluación final.',
      },
      {
        kind: 'cre',
        label: 'Presentación · 30-60 min',
        title: 'Demostración pública',
        body: 'Guíe a cada grupo para presentar el problema abordado, el robot construido, cómo funciona, qué falló, qué ajustaron y qué harían en una segunda versión.',
      },
      {
        kind: 'ref',
        label: 'Reflexión · 15 min',
        title: 'De usuario a diseñador',
        body: 'Cierre con una reflexión guiada: qué cambió en la forma de comprender una máquina, una solución tecnológica o un problema del entorno después de trabajar el programa.',
      },
    ],
    gradeNoteTitle: 'Evaluación diferenciada por grado',
    gradeNoteBody:
      'El showcase debe evaluarse con expectativas distintas: 1.º básico demuestra comprensión funcional y explicación guiada; 2.º básico demuestra análisis de pruebas, medición y mejora con evidencia; 3.º básico demuestra diseño propio, documentación técnica y conexión con una necesidad real de Guatemala. En los tres niveles, la presentación debe reunir evidencia CNB y evidencia de ingeniería/programación alineada con estándares internacionales.',
    intlNoteTitle: 'Estándares internacionales en el showcase',
    intlNoteBody:
      'El cierre del programa debe mostrar evidencias que dialoguen con ISTE Standards for Students, 2026 CSTA PK-12 y NGSS MS-ETS1: solución creada por estudiantes, algoritmo/programa explicado, pruebas con datos, mejora iterativa, restricciones de diseño y comunicación del impacto.',
    scaleNoteLead: 'Escala final sugerida.',
    scaleNoteBody:
      ' Use 4 a 1 por criterio y convierta el promedio a porcentaje o nota institucional. Esto facilita comparar desempeño técnico, proceso y comunicación entre módulos.',
    finalRubricHeader: 'Evaluación final',
    finalRubric: [
      {
        criterion: 'Construcción funcional',
        levels: [
          'Robot cumple la misión con estabilidad, precisión, autonomía y evidencia de criterios/restricciones.',
          'Robot cumple la misión de forma correcta y muestra criterios básicos de seguridad.',
          'Robot cumple parcialmente o requiere ajustes frecuentes sin evidencia completa de estabilidad.',
          'Robot no logra ejecutar la misión propuesta ni verificar sus restricciones.',
        ],
      },
      {
        criterion: 'Programa y lógica',
        levels: [
          'Explica con claridad algoritmo, variables, sensores, ciclos o eventos usando programa, diagrama o pseudocódigo.',
          'Relaciona correctamente el código con el comportamiento del robot y sus decisiones principales.',
          'Explica solo una parte del programa o necesita apoyo para conectar código y comportamiento.',
          'No logra relacionar código, datos de sensor y comportamiento observable.',
        ],
      },
      {
        criterion: 'Proceso de ingeniería',
        levels: [
          'Muestra tabla de pruebas, error, mejora, decisión justificada y vínculo con restricciones de diseño.',
          'Muestra intentos, datos y ajustes suficientes para mejorar el resultado.',
          'Probó, pero documentó poco o ajustó sin evidencia clara de medición.',
          'No muestra proceso de mejora, datos ni reflexión técnica verificable.',
        ],
      },
      {
        criterion: 'Comunicación',
        levels: [
          'Presenta con seguridad, lenguaje técnico, evidencias CNB/internacionales organizadas e impacto local claro.',
          'Presenta con claridad el proceso, resultados y una conexión curricular o comunitaria.',
          'Presenta con apoyo del equipo o con vacíos en evidencia, vocabulario técnico o impacto.',
          'No logra comunicar el proceso, hallazgos ni relación con el problema abordado.',
        ],
      },
    ],
  },
  en: {
    phases: [
      {
        kind: 'act',
        label: 'Preparation · 20 min',
        title: 'Rehearsal with a log',
        body: 'Ask each team to organize CNB and international evidence: a photo or video of the robot, the program used, a test table, an explanation of one improvement, and a connection to a local need or safety criterion. This makes the presentation and final evaluation easier.',
      },
      {
        kind: 'cre',
        label: 'Presentation · 30-60 min',
        title: 'Public demonstration',
        body: 'Guide each group to present the problem they tackled, the robot they built, how it works, what failed, what they adjusted, and what they would do in a second version.',
      },
      {
        kind: 'ref',
        label: 'Reflection · 15 min',
        title: 'From user to designer',
        body: 'Close with a guided reflection: what changed in how they understand a machine, a technological solution, or a problem in their environment after working through the program.',
      },
    ],
    gradeNoteTitle: 'Grade-differentiated evaluation',
    gradeNoteBody:
      'The showcase should be evaluated with different expectations: grade 7 demonstrates functional understanding and guided explanation; grade 8 demonstrates test analysis, measurement, and evidence-backed improvement; grade 9 demonstrates original design, technical documentation, and a connection to a real need in Guatemala. At all levels, the presentation should gather CNB evidence and engineering/programming evidence aligned to international standards.',
    intlNoteTitle: 'International standards in the showcase',
    intlNoteBody:
      'The program\'s closing should show evidence that speaks to ISTE Standards for Students, 2026 CSTA PK-12, and NGSS MS-ETS1: a student-created solution, an explained algorithm/program, data-backed tests, iterative improvement, design constraints, and communication of impact.',
    scaleNoteLead: 'Suggested final scale.',
    scaleNoteBody:
      ' Use 4 to 1 per criterion and convert the average to a percentage or institutional grade. This makes it easier to compare technical performance, process, and communication across modules.',
    finalRubricHeader: 'Final evaluation',
    finalRubric: [
      {
        criterion: 'Functional construction',
        levels: [
          'The robot completes the mission with stability, precision, autonomy, and evidence of criteria/constraints.',
          'The robot completes the mission correctly and shows basic safety criteria.',
          'The robot partially completes the mission or needs frequent adjustments without full stability evidence.',
          'The robot fails to carry out the proposed mission or verify its constraints.',
        ],
      },
      {
        criterion: 'Program and logic',
        levels: [
          'Clearly explains the algorithm, variables, sensors, loops, or events using the program, a diagram, or pseudocode.',
          'Correctly relates the code to the robot\'s behavior and main decisions.',
          'Explains only part of the program or needs support to connect code and behavior.',
          'Cannot relate code, sensor data, and observable behavior.',
        ],
      },
      {
        criterion: 'Engineering process',
        levels: [
          'Shows a test table, error, improvement, justified decision, and link to design constraints.',
          'Shows enough attempts, data, and adjustments to improve the result.',
          'Tested, but documented little or adjusted without clear measurement evidence.',
          'Shows no improvement process, data, or verifiable technical reflection.',
        ],
      },
      {
        criterion: 'Communication',
        levels: [
          'Presents confidently, with technical language, organized CNB/international evidence, and clear local impact.',
          'Clearly presents the process, results, and one curricular or community connection.',
          'Presents with team support or gaps in evidence, technical vocabulary, or impact.',
          'Cannot communicate the process, findings, or relationship to the problem addressed.',
        ],
      },
    ],
  },
};

/**
 * The program's closing "Showcase" session: final presentation phases,
 * grade-differentiated evaluation guidance, and the program-level final
 * rubric. Ported from the original HTML's `showcase()`.
 */
export default function Showcase(): React.JSX.Element {
  const {i18n} = useDocusaurusContext();
  const c = content[i18n.currentLocale as Locale] ?? content.es;
  const isEnglish = i18n.currentLocale === 'en';
  const [grade, setGrade] = useState<GradeId>('1-basico');
  const [rubricView, setRubricView] = useState<'summary' | 'detailed'>('summary');
  const closing = gradeClosingCopy[isEnglish ? 'en' : 'es'][grade];
  const gradeRubric = gradeRubricDetails[isEnglish ? 'en' : 'es'][grade];
  const showcasePhases = gradeShowcasePhases[isEnglish ? 'en' : 'es'][grade];

  return (
    <section className={styles.showcase}>
      <section className={styles.gradeSwitcher} aria-label={isEnglish ? 'Showcase grade filter' : 'Filtro del showcase por grado'}>
        <div><span>{isEnglish ? 'Showcase route' : 'Ruta del showcase'}</span><strong>{isEnglish ? 'Choose the group grade' : 'Elija el grado del grupo'}</strong><small>{isEnglish ? 'This selection updates the closing phases and final evaluation.' : 'Esta selección actualiza las fases de cierre y la evaluación final.'}</small></div>
        <div className={styles.gradeSwitcherButtons} role="tablist" aria-label={isEnglish ? 'Filter showcase by grade' : 'Filtrar showcase por grado'}>{GRADES.map((item) => <button type="button" role="tab" aria-selected={grade === item.id} className={grade === item.id ? styles.gradeSwitcherActive : ''} onClick={() => setGrade(item.id)} key={item.id}>{isEnglish ? `Grade ${Number(item.id[0]) + 6}` : item.label}</button>)}</div>
      </section>

      <PhaseTimeline phases={showcasePhases} />

      <FlagNote tone="info" title={c.gradeNoteTitle}>
        {c.gradeNoteBody} {isEnglish ? 'Selected expectation:' : 'Expectativa seleccionada:'} <strong>{closing.expectation}</strong>
      </FlagNote>

      <section className={styles.gradeAssessment} aria-label={isEnglish ? 'Showcase assessment by grade' : 'Evaluación del showcase por grado'}>
        <div className={styles.gradeAssessmentHead}><div><span>{isEnglish ? 'Final project reference' : 'Referencia del proyecto final'}</span><h3>{isEnglish ? 'One expectation for each grade' : 'Una expectativa para cada grado'}</h3><p>{isEnglish ? 'The selected grade controls the expectation and final rubric below.' : 'El grado seleccionado controla la expectativa y la rúbrica final.'}</p></div></div>
        <div className={styles.gradeAssessmentBody} aria-live="polite"><span>{isEnglish ? 'What the team should achieve' : 'Qué debe lograr el equipo'}</span><strong>{closing.expectation}</strong><div><b>{isEnglish ? 'Evidence to request' : 'Evidencia que puede solicitar'}</b><ul>{closing.evidence.map((item) => <li key={item}>{item}</li>)}</ul></div></div>
      </section>

      <BasicoAlignment grade={grade} interactive />

      <FlagNote tone="good" title={c.intlNoteTitle}>
        {c.intlNoteBody}
      </FlagNote>

      <InternationalAlignment grade={grade} interactive />

      <p className={styles.scaleNote}>
        <strong>{c.scaleNoteLead}</strong>
        {c.scaleNoteBody}
      </p>
      <div className={styles.finalRubric}>
        <div className={styles.finalRubricHead}>
          <div><span>{c.finalRubricHeader}</span><strong>{GRADES.find((item) => item.id === grade)?.label}</strong><small>{isEnglish ? 'Team-level reference for the selected final project grade.' : 'Referencia para observar al equipo según el grado seleccionado.'}</small></div>
          <label className={styles.finalGradeFilter}>{isEnglish ? 'Filter final evaluation' : 'Filtrar evaluación final'}<select value={grade} onChange={(event) => setGrade(event.target.value as GradeId)} aria-label={isEnglish ? 'Filter final evaluation by grade' : 'Filtrar evaluación final por grado'}>{GRADES.map((item) => <option key={item.id} value={item.id}>{item.label}</option>)}</select></label>
        </div>
        <div className={styles.rubricViewNav} role="tablist" aria-label={isEnglish ? 'Evaluation display' : 'Vista de evaluación'}>
          <button type="button" role="tab" aria-selected={rubricView === 'summary'} className={rubricView === 'summary' ? styles.rubricViewActive : ''} onClick={() => setRubricView('summary')}>{isEnglish ? 'Quick view' : 'Vista rápida'}</button>
          <button type="button" role="tab" aria-selected={rubricView === 'detailed'} className={rubricView === 'detailed' ? styles.rubricViewActive : ''} onClick={() => setRubricView('detailed')}>{isEnglish ? 'Full rubric' : 'Rúbrica completa'}</button>
        </div>
        {rubricView === 'summary' ? <div className={styles.rubricSummary} aria-live="polite">{gradeRubric.map((row) => <article key={row.criterion}><span>{row.criterion}</span><strong>{row.levels[1]}</strong><small>{isEnglish ? 'Expected reference' : 'Referencia esperada'}</small></article>)}</div> : <RubricTable rows={gradeRubric} headerLabel={c.finalRubricHeader} />}
      </div>
    </section>
  );
}
