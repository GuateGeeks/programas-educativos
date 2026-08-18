import React from 'react';
import PhaseTimeline, {type Phase} from '@site/src/components/PhaseTimeline';
import FlagNote from '@site/src/components/FlagNote';
import SmarsCnbAlignment from '@site/src/components/SmarsCnbAlignment';
import styles from '@site/src/components/Showcase/styles.module.css';

const phases: Phase[] = [
  {
    kind: 'act',
    label: 'Preparación · 20 min',
    title: 'Organizar evidencias',
    body: 'Cada equipo reúne el video de la misión autónoma, bitácora de pruebas, tabla de calibración, sketch utilizado, fotografías del robot y decisiones técnicas justificadas con datos.',
  },
  {
    kind: 'exp',
    label: 'Ensayo · 20-30 min',
    title: 'Convertir datos en argumento',
    body: 'El equipo selecciona dos o tres decisiones importantes del proyecto y practica cómo explicarlas: qué problema observaron, qué midieron, qué cambiaron y cómo comprobaron que mejoró.',
  },
  {
    kind: 'cre',
    label: 'Presentación · 30-60 min',
    title: 'Demo técnica del robot',
    body: 'Cada equipo presenta el robot, ejecuta o muestra la misión autónoma, explica su arquitectura mecánica/electrónica y conecta el comportamiento observable con el código.',
  },
  {
    kind: 'ref',
    label: 'Reflexión · 15 min',
    title: 'De prototipo a sistema',
    body: 'Cierre con preguntas técnicas: qué límite encontró el robot, qué variable tuvo más impacto, qué rediseñarían y qué evidencia necesitarían para defender una versión mejor.',
  },
];

export default function SmarsShowcase(): React.JSX.Element {
  return (
    <section className={styles.showcase}>
      <PhaseTimeline phases={phases} />

      <FlagNote
        tone="info"
        title="Evaluación diferenciada por bachillerato"
        children="En 4.º bachillerato se evalúa comprensión de subsistemas, seguridad y construcción guiada. En 5.º bachillerato se exige medición, depuración y calibración con datos. En 6.º bachillerato se espera integración autónoma, documentación técnica y defensa de decisiones frente a una audiencia."
      />

      <FlagNote
        tone="good"
        title="Estándares internacionales en la presentación"
        children="La evidencia final debe mostrar una solución creada por estudiantes, código explicado, pruebas con datos, mejora iterativa, restricciones de diseño y comunicación técnica del impacto o aplicación del robot."
      />

      <SmarsCnbAlignment />
    </section>
  );
}
