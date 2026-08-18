import React from 'react';
import {useStandardsContent} from '@site/src/data/ciudadbots';
import styles from './styles.module.css';

interface ScopeOption {
  title: string;
  text: string;
}

interface ScopeOptionsProps {
  options?: readonly ScopeOption[];
}

/**
 * The four pacing options for implementing the program (compact/standard/
 * extended/project-based). Ported from the original HTML's `.scope-list`.
 */
export default function ScopeOptions({options}: ScopeOptionsProps): React.JSX.Element {
  const {scopeOptions} = useStandardsContent();
  const items = options ?? scopeOptions;

  return (
    <div className={styles.list}>
      {items.map((opt) => (
        <div className={styles.scope} key={opt.title}>
          <b>{opt.title}</b>
          <p>{opt.text}</p>
        </div>
      ))}
    </div>
  );
}
