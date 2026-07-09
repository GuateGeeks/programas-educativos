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
        body: 'Pida a cada equipo organizar cuatro evidencias: foto del robot, programa usado, tabla de pruebas y explicación de una mejora. Esto facilitará la exposición y la evaluación final.',
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
      'El showcase debe evaluarse con expectativas distintas: 1.º básico demuestra comprensión funcional; 2.º básico demuestra análisis de pruebas y mejora; 3.º básico demuestra diseño propio, documentación técnica y conexión con una necesidad real de Guatemala.',
    intlNoteTitle: 'Estándares internacionales en el showcase',
    intlNoteBody:
      'El cierre del programa debe mostrar evidencias que dialoguen con ISTE, CSTA y NGSS: solución creada por estudiantes, algoritmo/programa explicado, pruebas con datos, mejora iterativa y comunicación del impacto.',
    scaleNoteLead: 'Escala final sugerida.',
    scaleNoteBody:
      ' Use 4 a 1 por criterio y convierta el promedio a porcentaje o nota institucional. Esto facilita comparar desempeño técnico, proceso y comunicación entre módulos.',
    finalRubricHeader: 'Evaluación final',
    finalRubric: [
      {
        criterion: 'Construcción funcional',
        levels: [
          'Robot cumple la misión con estabilidad, precisión y autonomía.',
          'Robot cumple la misión de forma correcta.',
          'Robot cumple parcialmente o requiere ajustes frecuentes.',
          'Robot no logra ejecutar la misión propuesta.',
        ],
      },
      {
        criterion: 'Programa y lógica',
        levels: [
          'Explica con claridad la lógica, variables, sensores o ciclos usados.',
          'Relaciona correctamente el código con el comportamiento del robot.',
          'Explica solo una parte del programa o necesita apoyo.',
          'No logra relacionar código y comportamiento.',
        ],
      },
      {
        criterion: 'Proceso de ingeniería',
        levels: [
          'Muestra evidencia clara de prueba, error, mejora y toma de decisiones.',
          'Muestra intentos y ajustes suficientes para mejorar.',
          'Probó, pero documentó poco o ajustó sin evidencia clara.',
          'No muestra proceso de mejora ni reflexión técnica.',
        ],
      },
      {
        criterion: 'Comunicación',
        levels: [
          'Presenta con seguridad, lenguaje técnico y evidencias bien organizadas.',
          'Presenta con claridad el proceso y los resultados.',
          'Presenta con apoyo del equipo o con vacíos de explicación.',
          'No logra comunicar el proceso ni los hallazgos.',
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
        body: "Ask each team to organize four pieces of evidence: a photo of the robot, the program used, a test table, and an explanation of one improvement. This makes the presentation and final evaluation easier.",
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
      "The showcase should be evaluated with different expectations: grade 7 demonstrates functional understanding; grade 8 demonstrates test analysis and improvement; grade 9 demonstrates original design, technical documentation, and a connection to a real need in Guatemala.",
    intlNoteTitle: 'International standards in the showcase',
    intlNoteBody:
      'The program\'s closing should show evidence that speaks to ISTE, CSTA, and NGSS: a student-created solution, an explained algorithm/program, data-backed tests, iterative improvement, and communication of impact.',
    scaleNoteLead: 'Suggested final scale.',
    scaleNoteBody:
      ' Use 4 to 1 per criterion and convert the average to a percentage or institutional grade. This makes it easier to compare technical performance, process, and communication across modules.',
    finalRubricHeader: 'Final evaluation',
    finalRubric: [
      {
        criterion: 'Functional construction',
        levels: [
          'The robot completes the mission with stability, precision, and autonomy.',
          'The robot completes the mission correctly.',
          'The robot partially completes the mission or needs frequent adjustments.',
          'The robot fails to carry out the proposed mission.',
        ],
      },
      {
        criterion: 'Program and logic',
        levels: [
          'Clearly explains the logic, variables, sensors, or loops used.',
          'Correctly relates the code to the robot\'s behavior.',
          'Explains only part of the program or needs support.',
          'Cannot relate the code to the behavior.',
        ],
      },
      {
        criterion: 'Engineering process',
        levels: [
          'Shows clear evidence of testing, error, improvement, and decision-making.',
          'Shows enough attempts and adjustments to improve.',
          'Tested, but documented little or adjusted without clear evidence.',
          'Shows no improvement process or technical reflection.',
        ],
      },
      {
        criterion: 'Communication',
        levels: [
          'Presents confidently, with technical language and well-organized evidence.',
          'Clearly presents the process and results.',
          'Presents with team support or gaps in explanation.',
          'Cannot communicate the process or findings.',
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
export default function Showcase(): JSX.Element {
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
