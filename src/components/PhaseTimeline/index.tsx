import React, {useState} from 'react';
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
export default function PhaseTimeline({phases}: PhaseTimelineProps): React.JSX.Element {
  const [activeIndex, setActiveIndex] = useState(0);
  const activePhase = phases[activeIndex];
  if (!activePhase) return null;
  const move = (delta: number) => setActiveIndex((current) => Math.min(Math.max(current + delta, 0), phases.length - 1));

  return (
    <div className={styles.timeline}>
      <div className={styles.phaseList} role="tablist" aria-label="Fases de la experiencia">
        {phases.map((phase, i) => (
          <button
            // eslint-disable-next-line react/no-array-index-key
            key={i}
            type="button"
            role="tab"
            aria-selected={activeIndex === i}
            className={`${styles.phaseToggle} ${styles[phase.kind]} ${activeIndex === i ? styles.selected : ''}`}
            onClick={() => setActiveIndex(i)}>
            <span className={styles.phCircle}>{i + 1}</span>
            <span className={styles.phaseHeading}>
              <span className={styles.phLbl}>{phase.label}</span>
              <span className={styles.phTitle}>{phase.title}</span>
            </span>
            <span className={styles.chevron} aria-hidden="true">{activeIndex === i ? '−' : '+'}</span>
          </button>
        ))}
      </div>
      <div className={`${styles.phaseBody} ${styles[activePhase.kind]}`} role="tabpanel">
        <p className={styles.phaseCopy}>{activePhase.body}</p>
        <div className={styles.navigation}>
          <button type="button" onClick={() => move(-1)} disabled={activeIndex === 0}>Anterior</button>
          <span>{activeIndex + 1} de {phases.length}</span>
          <button type="button" onClick={() => move(1)} disabled={activeIndex === phases.length - 1}>Siguiente</button>
        </div>
      </div>
    </div>
  );
}
