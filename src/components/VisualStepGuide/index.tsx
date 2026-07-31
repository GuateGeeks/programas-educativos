import React, {useCallback, useState} from 'react';
import Translate, {translate} from '@docusaurus/Translate';
import {useBaseUrlUtils} from '@docusaurus/useBaseUrl';
import styles from './styles.module.css';

export interface VisualStep {
  image: string;
  alt: string;
  title: string;
  body: React.ReactNode;
}

interface VisualStepGuideProps {
  title: string;
  steps: readonly VisualStep[];
}

function clamp(index: number, total: number): number {
  return Math.min(total - 1, Math.max(0, index));
}

export default function VisualStepGuide({title, steps}: VisualStepGuideProps): React.JSX.Element | null {
  const {withBaseUrl} = useBaseUrlUtils();
  const [active, setActive] = useState(0);
  const total = steps.length;

  const moveTo = useCallback(
    (index: number) => {
      setActive(clamp(index, total));
    },
    [total],
  );

  const onKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLElement>) => {
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        moveTo(active - 1);
      } else if (event.key === 'ArrowRight') {
        event.preventDefault();
        moveTo(active + 1);
      }
    },
    [active, moveTo],
  );

  if (total === 0) {
    return null;
  }

  const current = steps[active];
  const currentSrc = withBaseUrl(current.image);
  const hasMultipleSteps = total > 1;
  const previousLabel = translate({
    id: 'visualStepGuide.previous',
    message: 'Anterior',
    description: 'Previous-step button label for visual step guides',
  });
  const nextLabel = translate({
    id: 'visualStepGuide.next',
    message: 'Siguiente',
    description: 'Next-step button label for visual step guides',
  });

  return (
    <section className={styles.guide} aria-label={title} onKeyDown={onKeyDown}>
      <div className={styles.header}>
        <h2 className={styles.title}>{title}</h2>
        {hasMultipleSteps && (
          <span className={styles.count}>
            <Translate id="visualStepGuide.count" values={{active: active + 1, total}}>
              {'Imagen {active} / {total}'}
            </Translate>
          </span>
        )}
      </div>

      <div className={styles.main}>
        <div className={styles.stage}>
          <img src={currentSrc} alt={current.alt} draggable={false} loading="lazy" />
        </div>
        <div className={styles.caption}>
          <h3>{current.title}</h3>
          <div>{current.body}</div>
        </div>
      </div>

      {hasMultipleSteps && (
        <>
          <div className={styles.controls}>
            <button className={styles.navButton} disabled={active === 0} onClick={() => moveTo(active - 1)} type="button">
              {previousLabel}
            </button>
            <button
              className={styles.navButton}
              disabled={active === total - 1}
              onClick={() => moveTo(active + 1)}
              type="button">
              {nextLabel}
            </button>
          </div>

          <div className={styles.thumbnails} aria-label={translate({id: 'visualStepGuide.thumbnailList', message: 'Pasos visuales'})}>
            {steps.map((step, index) => (
              <button
                aria-current={active === index ? 'step' : undefined}
                className={`${styles.thumbnail} ${active === index ? styles.thumbnailActive : ''}`}
                key={`${step.image}-${step.title}`}
                onClick={() => moveTo(index)}
                type="button">
                <img src={withBaseUrl(step.image)} alt="" draggable={false} loading="lazy" />
                <span>{index + 1}</span>
              </button>
            ))}
          </div>
        </>
      )}

      <div className={styles.printSteps} aria-hidden="true">
        {steps.map((step, index) => (
          <figure className={styles.printStep} key={`${step.image}-${step.title}`}>
            <img src={withBaseUrl(step.image)} alt={step.alt} />
            <figcaption>
              <strong>
                {index + 1}. {step.title}
              </strong>
              <div>{step.body}</div>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
