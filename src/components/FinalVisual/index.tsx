import React, {useEffect, useState} from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';
import {translate} from '@docusaurus/Translate';
import styles from './styles.module.css';

interface FinalVisualProps {
  src?: string;
  version?: string;
  title: string;
}

/** A single, enlargeable reference for the completed robot. */
export default function FinalVisual({src, version, title}: FinalVisualProps): React.JSX.Element {
  const [open, setOpen] = useState(false);
  const imageSrc = src ? useBaseUrl(src) : undefined;

  useEffect(() => {
    if (!open) return undefined;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open]);

  if (!imageSrc) {
    return (
      <section className={`${styles.card} ${styles.pending}`} aria-label={translate({id: 'ciudadbots.finalVisual.pendingLabel', message: 'Referencia visual pendiente'})}>
        <div className={styles.heading}>
          <span className={styles.eyebrow}>{translate({id: 'ciudadbots.finalVisual.eyebrow', message: 'Referencia visual'})}</span>
          <h3>{translate({id: 'ciudadbots.finalVisual.pendingTitle', message: 'Imagen final en preparación'})}</h3>
        </div>
        <p>{translate({id: 'ciudadbots.finalVisual.pendingBody', message: 'Esta referencia se incorporará cuando el modelo final y su guía visual estén listos.'})}</p>
      </section>
    );
  }

  return (
    <section className={styles.card} aria-labelledby="final-visual-title">
      <div className={styles.heading}>
        <span className={styles.eyebrow}>{translate({id: 'ciudadbots.finalVisual.eyebrow', message: 'Referencia visual'})}</span>
        <h3 id="final-visual-title">{translate({id: 'ciudadbots.finalVisual.title', message: 'Así se ve al finalizar'})}</h3>
      </div>
      <button type="button" className={styles.imageButton} onClick={() => setOpen(true)} aria-label={translate({id: 'ciudadbots.finalVisual.open', message: 'Ampliar referencia visual de {title}'}, {title})}>
        <img src={imageSrc} alt={translate({id: 'ciudadbots.finalVisual.alt', message: '{title}, robot terminado'}, {title})} loading="lazy" />
        <span>{translate({id: 'ciudadbots.finalVisual.enlarge', message: 'Ver imagen grande'})}</span>
      </button>
      <p className={styles.caption}>{translate({id: 'ciudadbots.finalVisual.caption', message: 'Use la imagen para reconocer el resultado esperado y conversar sobre qué parte podría mejorarse.'})}</p>
      {open && (
        <div className={styles.lightbox} role="dialog" aria-modal="true" aria-label={title} onClick={() => setOpen(false)}>
          <button type="button" className={styles.close} onClick={() => setOpen(false)} aria-label={translate({id: 'ciudadbots.finalVisual.close', message: 'Cerrar imagen'})}>×</button>
          <img src={imageSrc} alt={translate({id: 'ciudadbots.finalVisual.alt', message: '{title}, robot terminado'}, {title})} onClick={(event) => event.stopPropagation()} />
        </div>
      )}
    </section>
  );
}
