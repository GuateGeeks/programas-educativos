import React from 'react';
import {scopeOptions} from '@site/src/data/ciudadbots';
import styles from './styles.module.css';

/**
 * The four pacing options for implementing the program (compacta/estándar/
 * extendida/por proyectos). Ported from the original HTML's `.scope-list`.
 */
export default function ScopeOptions(): JSX.Element {
  return (
    <div className={styles.list}>
      {scopeOptions.map((opt) => (
        <div className={styles.scope} key={opt.title}>
          <b>{opt.title}</b>
          <p>{opt.text}</p>
        </div>
      ))}
    </div>
  );
}
