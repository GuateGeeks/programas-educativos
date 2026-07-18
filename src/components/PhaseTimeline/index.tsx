import React from 'react';
import type {PhaseKind} from '@site/src/data/ciudadbots/types';
import styles from './styles.module.css';

/**
 * One learning-cycle phase's locale-specific content. The four kinds map to
 * Activar/Explorar/Crear/Reflexionar (or, for the Showcase closing session,
 * Preparación/Presentación/Reflexión) — authored per module, per locale.
 */
export interface Phase {
  kind: PhaseKind;
  label: string;
  title: string;
  body: React.ReactNode;
}

interface PhaseTimelineProps {
  phases: readonly Phase[];
}

/**
 * Renders a sequence of learning-cycle phases. Shared between `Module`'s
 * "Implementation" tab and the `Showcase` page.
 */
export default function PhaseTimeline({phases}: PhaseTimelineProps) {
  return (
    <>
      {phases.map((phase, i) => (
        // eslint-disable-next-line react/no-array-index-key
        <div className={styles.phase} key={i}>
          <div className={`${styles.phaseHdr} ${styles[phase.kind]}`}>
            <div className={styles.phCircle}>{i + 1}</div>
            <div>
              <div className={styles.phLbl}>{phase.label}</div>
              <div className={styles.phTitle}>{phase.title}</div>
            </div>
          </div>
          <p className={styles.phaseCopy}>{phase.body}</p>
        </div>
      ))}
    </>
  );
}
