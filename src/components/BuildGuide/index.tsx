import React, {useCallback, useEffect, useState} from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Translate, {translate} from '@docusaurus/Translate';
import type {GuideRef} from '@site/src/data/ciudadbots/types';
import styles from './styles.module.css';

interface BuildGuideProps {
  guide: GuideRef;
  /** Locale-appropriate display title for this guide (e.g. "Visual Build Guide · Mapper Bot"). */
  title: string;
  /** Start page (1-based). */
  initialPage?: number;
}

function pagePath(imageBase: string, page: number): string {
  return `${imageBase}${String(page).padStart(2, '0')}.jpg`;
}

/**
 * Data-driven paginated build-guide viewer. Shows one construction image at a
 * time with prev/next (clamped), a page counter, and an enlarged lightbox view.
 * Reused by the teacher module pages and the student build view.
 */
export default function BuildGuide({guide, title, initialPage = 1}: BuildGuideProps) {
  const {pages, imageBase} = guide;
  const [page, setPage] = useState(Math.min(Math.max(initialPage, 1), pages));
  const [lightbox, setLightbox] = useState(false);

  const move = useCallback(
    (delta: number) => setPage((p) => Math.min(pages, Math.max(1, p + delta))),
    [pages],
  );

  // Base-url resolved image src (respects site baseUrl for static assets).
  const src = useBaseUrl(pagePath(imageBase, page));

  const atStart = page === 1;
  const atEnd = page === pages;

  useEffect(() => {
    if (!lightbox) {
      return undefined;
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setLightbox(false);
      } else if (e.key === 'ArrowLeft') {
        move(-1);
      } else if (e.key === 'ArrowRight') {
        move(1);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lightbox, move]);

  const counter = (
    <span className={styles.count}>
      <Translate id="ciudadbots.buildGuide.page" description="Build-guide page counter label" values={{page, pages}}>
        {'Página {page} / {pages}'}
      </Translate>
    </span>
  );

  const previousLabel = translate({
    id: 'ciudadbots.buildGuide.previous',
    message: 'Anterior',
    description: 'Build-guide previous-page button',
  });
  const nextLabel = translate({
    id: 'ciudadbots.buildGuide.next',
    message: 'Siguiente',
    description: 'Build-guide next-page button',
  });
  const enlargeLabel = translate({
    id: 'ciudadbots.buildGuide.enlarge',
    message: 'Vista grande',
    description: 'Build-guide open-lightbox button',
  });
  const closeLabel = translate({
    id: 'ciudadbots.buildGuide.close',
    message: 'Cerrar',
    description: 'Build-guide close-lightbox button',
  });
  const enlargedTitle = translate({
    id: 'ciudadbots.buildGuide.enlargedTitle',
    message: 'Vista ampliada de construcción',
    description: 'Build-guide lightbox toolbar title',
  });
  const pageAlt = translate(
    {
      id: 'ciudadbots.buildGuide.pageAlt',
      message: '{title} — página {page} de {pages}',
      description: 'Build-guide page image alt text',
    },
    {title, page, pages},
  );
  const enlargedAlt = translate(
    {
      id: 'ciudadbots.buildGuide.enlargedAlt',
      message: '{title} — página {page} ampliada',
      description: 'Build-guide lightbox image alt text',
    },
    {title, page},
  );

  return (
    <div className={styles.viewer}>
      <div className={styles.toolbar}>
        <strong className={styles.viewerTitle}>{title}</strong>
        <button className={styles.btn} onClick={() => move(-1)} disabled={atStart} type="button">
          {previousLabel}
        </button>
        {counter}
        <button className={styles.btn} onClick={() => move(1)} disabled={atEnd} type="button">
          {nextLabel}
        </button>
        <button
          className={`${styles.btn} ${styles.secondary}`}
          onClick={() => setLightbox(true)}
          type="button">
          {enlargeLabel}
        </button>
      </div>
      <div className={styles.stage}>
        <img src={src} alt={pageAlt} draggable={false} loading="lazy" />
      </div>

      {lightbox && (
        <div
          className={styles.lightbox}
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setLightbox(false);
            }
          }}>
          <div className={styles.lightboxInner}>
            <div className={styles.lightboxToolbar}>
              <strong className={styles.viewerTitle}>{enlargedTitle}</strong>
              <button className={styles.btn} onClick={() => move(-1)} disabled={atStart} type="button">
                {previousLabel}
              </button>
              {counter}
              <button className={styles.btn} onClick={() => move(1)} disabled={atEnd} type="button">
                {nextLabel}
              </button>
              <button
                className={`${styles.btn} ${styles.secondary}`}
                onClick={() => setLightbox(false)}
                type="button">
                {closeLabel}
              </button>
            </div>
            <div className={styles.lightboxStage}>
              <img src={src} alt={enlargedAlt} draggable={false} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
