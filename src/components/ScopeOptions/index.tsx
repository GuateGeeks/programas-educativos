import React from 'react';
import {useStandardsContent} from '@site/src/data/ciudadbots';
import styles from './styles.module.css';

/**
 * The four pacing options for implementing the program (compact/standard/
 * extended/project-based). Ported from the original HTML's `.scope-list`.
 */
export default function ScopeOptions(): React.JSX.Element {
  const {scopeOptions} = useStandardsContent();
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
