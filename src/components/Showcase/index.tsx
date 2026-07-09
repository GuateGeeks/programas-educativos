import React from 'react';
import type {Phase} from '@site/src/data/ciudadbots/types';
import PhaseTimeline from '@site/src/components/PhaseTimeline';
import FlagNote from '@site/src/components/FlagNote';
import BasicoAlignment from '@site/src/components/BasicoAlignment';
import InternationalAlignment from '@site/src/components/InternationalAlignment';
import RubricTable, {type RubricRow} from '@site/src/components/RubricTable';
import styles from './styles.module.css';

const PHASES: readonly Phase[] = [
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
];

const FINAL_RUBRIC: readonly RubricRow[] = [
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
];

/**
 * The program's closing "Showcase" session: final presentation phases,
 * grade-differentiated evaluation guidance, and the program-level final
 * rubric. Ported from the original HTML's `showcase()`.
 */
export default function Showcase(): JSX.Element {
  return (
    <section className={styles.showcase}>
      <PhaseTimeline phases={PHASES} />

      <FlagNote tone="info" title="Evaluación diferenciada por grado">
        El showcase debe evaluarse con expectativas distintas: 1.º básico demuestra comprensión
        funcional; 2.º básico demuestra análisis de pruebas y mejora; 3.º básico demuestra diseño
        propio, documentación técnica y conexión con una necesidad real de Guatemala.
      </FlagNote>

      <BasicoAlignment />

      <FlagNote tone="good" title="Estándares internacionales en el showcase">
        El cierre del programa debe mostrar evidencias que dialoguen con ISTE, CSTA y NGSS: solución
        creada por estudiantes, algoritmo/programa explicado, pruebas con datos, mejora iterativa y
        comunicación del impacto.
      </FlagNote>

      <InternationalAlignment />

      <p className={styles.scaleNote}>
        <strong>Escala final sugerida.</strong> Use 4 a 1 por criterio y convierta el promedio a
        porcentaje o nota institucional. Esto facilita comparar desempeño técnico, proceso y
        comunicación entre módulos.
      </p>
      <RubricTable rows={FINAL_RUBRIC} headerLabel="Evaluación final" />
    </section>
  );
}
