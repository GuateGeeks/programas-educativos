import React from 'react';
import styles from './styles.module.css';

type Tone = 'info' | 'good' | 'warn';

interface FlagNoteProps {
  tone: Tone;
  title: string;
  children: React.ReactNode;
}

/**
 * Left-accented callout, ported from the original HTML's `.flag` pattern
 * (info/good/warn tones).
 */
export default function FlagNote({tone, title, children}: FlagNoteProps): React.JSX.Element {
  return (
    <div className={`${styles.flag} ${styles[tone]}`}>
      <div className={styles.title}>{title}</div>
      <p>{children}</p>
    </div>
  );
}
