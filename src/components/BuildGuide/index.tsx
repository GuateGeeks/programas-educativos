import React, {useCallback, useEffect, useState} from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';
import type {GuideRef} from '@site/src/data/ciudadbots/types';
import styles from './styles.module.css';

interface BuildGuideProps {
  guide: GuideRef;
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
export default function BuildGuide({guide, initialPage = 1}: BuildGuideProps): JSX.Element {
  const {pages, imageBase, title} = guide;
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
      Página <strong>{page}</strong> / {pages}
    </span>
  );

  return (
    <div className={styles.viewer}>
      <div className={styles.toolbar}>
        <strong className={styles.viewerTitle}>{title}</strong>
        <button className={styles.btn} onClick={() => move(-1)} disabled={atStart} type="button">
          Anterior
        </button>
        {counter}
        <button className={styles.btn} onClick={() => move(1)} disabled={atEnd} type="button">
          Siguiente
        </button>
        <button
          className={`${styles.btn} ${styles.secondary}`}
          onClick={() => setLightbox(true)}
          type="button">
          Vista grande
        </button>
      </div>
      <div className={styles.stage}>
        <img
          src={src}
          alt={`${title} — página ${page} de ${pages}`}
          draggable={false}
          loading="lazy"
        />
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
              <strong className={styles.viewerTitle}>Vista ampliada de construcción</strong>
              <button className={styles.btn} onClick={() => move(-1)} disabled={atStart} type="button">
                Anterior
              </button>
              {counter}
              <button className={styles.btn} onClick={() => move(1)} disabled={atEnd} type="button">
                Siguiente
              </button>
              <button
                className={`${styles.btn} ${styles.secondary}`}
                onClick={() => setLightbox(false)}
                type="button">
                Cerrar
              </button>
            </div>
            <div className={styles.lightboxStage}>
              <img src={src} alt={`${title} — página ${page} ampliada`} draggable={false} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
