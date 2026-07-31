import React, {useCallback, useRef, useState} from 'react';
import Translate, {translate} from '@docusaurus/Translate';
import styles from './styles.module.css';

export interface HorizontalStep {
  label: string;
  title: string;
  body: React.ReactNode;
  tone?: string;
}

interface HorizontalStepReaderProps {
  steps: readonly HorizontalStep[];
  ariaLabel: string;
}

function clamp(index: number, total: number): number {
  return Math.min(total - 1, Math.max(0, index));
}

function prefersReducedMotion(): boolean {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export default function HorizontalStepReader({
  steps,
  ariaLabel,
}: HorizontalStepReaderProps): React.JSX.Element {
  const [active, setActive] = useState(0);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const total = steps.length;

  const scrollToStep = useCallback(
    (index: number) => {
      const next = clamp(index, total);
      setActive(next);

      const track = trackRef.current;
      if (!track) {
        return;
      }
      track.scrollTo({
        left: next * track.clientWidth,
        behavior: prefersReducedMotion() ? 'auto' : 'smooth',
      });
    },
    [total],
  );

  const onScroll = useCallback(() => {
    const track = trackRef.current;
    if (!track || track.clientWidth === 0) {
      return;
    }
    const next = clamp(Math.round(track.scrollLeft / track.clientWidth), total);
    setActive((current) => (current === next ? current : next));
  }, [total]);

  const onKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        scrollToStep(active - 1);
      } else if (event.key === 'ArrowRight') {
        event.preventDefault();
        scrollToStep(active + 1);
      }
    },
    [active, scrollToStep],
  );

  const atStart = active === 0;
  const atEnd = active === total - 1;
  const previousLabel = translate({
    id: 'horizontalStepReader.previous',
    message: 'Anterior',
    description: 'Previous-step button label for horizontal learning step readers',
  });
  const nextLabel = translate({
    id: 'horizontalStepReader.next',
    message: 'Siguiente',
    description: 'Next-step button label for horizontal learning step readers',
  });

  return (
    <section className={styles.reader} aria-label={ariaLabel} onKeyDown={onKeyDown}>
      <div className={styles.stepTabs} role="list" aria-label={ariaLabel}>
        {steps.map((step, index) => {
          const isActive = active === index;
          const toneClass = step.tone ? styles[step.tone] ?? '' : '';
          return (
            <button
              aria-current={isActive ? 'step' : undefined}
              className={`${styles.stepTab} ${toneClass} ${isActive ? styles.stepTabActive : ''}`}
              key={`${step.label}-${step.title}`}
              onClick={() => scrollToStep(index)}
              type="button">
              <span className={styles.stepNumber}>{index + 1}</span>
              <span className={styles.stepTabText}>
                <span className={styles.stepLabel}>{step.label}</span>
                <span className={styles.stepName}>{step.title}</span>
              </span>
            </button>
          );
        })}
      </div>

      <div className={styles.track} onScroll={onScroll} ref={trackRef} tabIndex={0}>
        {steps.map((step, index) => {
          const toneClass = step.tone ? styles[step.tone] ?? '' : '';
          return (
            <article className={styles.panel} key={`${step.label}-${step.title}`}>
              <header className={`${styles.panelHeader} ${toneClass}`}>
                <div className={styles.panelNumber}>{index + 1}</div>
                <div>
                  <p className={styles.panelLabel}>{step.label}</p>
                  <h3 className={styles.panelTitle}>{step.title}</h3>
                </div>
              </header>
              <div className={styles.panelBody}>{step.body}</div>
            </article>
          );
        })}
      </div>

      <div className={styles.controls}>
        <button className={styles.navButton} disabled={atStart} onClick={() => scrollToStep(active - 1)} type="button">
          {previousLabel}
        </button>
        <span className={styles.count}>
          <Translate id="horizontalStepReader.count" values={{active: active + 1, total}}>
            {'Paso {active} / {total}'}
          </Translate>
        </span>
        <button className={styles.navButton} disabled={atEnd} onClick={() => scrollToStep(active + 1)} type="button">
          {nextLabel}
        </button>
      </div>
    </section>
  );
}
