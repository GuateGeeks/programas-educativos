import React from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import type {Locale} from '@site/src/data/ciudadbots';
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

  return (
    <section className={styles.showcase}>
      <PhaseTimeline phases={c.phases} />

      <FlagNote tone="info" title={c.gradeNoteTitle}>
        {c.gradeNoteBody}
      </FlagNote>

      <BasicoAlignment />

      <FlagNote tone="good" title={c.intlNoteTitle}>
        {c.intlNoteBody}
      </FlagNote>

      <InternationalAlignment />

      <p className={styles.scaleNote}>
        <strong>{c.scaleNoteLead}</strong>
        {c.scaleNoteBody}
      </p>
      <RubricTable rows={c.finalRubric} headerLabel={c.finalRubricHeader} />
    </section>
  );
}
