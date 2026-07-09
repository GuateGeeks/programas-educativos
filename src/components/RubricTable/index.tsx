import React from 'react';
import styles from './styles.module.css';

export interface RubricRow {
  criterion: string;
  /** Exactly 4 performance-level descriptions: Sobresaliente, Logrado, En proceso, Inicial. */
  levels: readonly [string, string, string, string];
}

interface RubricTableProps {
  rows: readonly RubricRow[];
  /** Optional label for the criterion header column (defaults to "Criterio"). */
  headerLabel?: string;
}

const LEVEL_HEADERS = ['4 · Sobresaliente', '3 · Logrado', '2 · En proceso', '1 · Inicial'] as const;

/**
 * 4-level evaluation rubric table, ported from the original HTML's
 * `.rubric`/`.rubric-row` pattern. Shared between the per-module evaluation
 * tab (generic level text applied to each module's criteria) and the
 * Showcase page's final rubric (criterion-specific level text).
 */
export default function RubricTable({rows, headerLabel = 'Criterio'}: RubricTableProps): JSX.Element {
  return (
    <div className={styles.rubric}>
      <div className={`${styles.row} ${styles.head}`}>
        <div>{headerLabel}</div>
        {LEVEL_HEADERS.map((h) => (
          <div key={h}>{h}</div>
        ))}
      </div>
      {rows.map((row) => (
        <div className={styles.row} key={row.criterion}>
          <div className={styles.criterion}>{row.criterion}</div>
          {row.levels.map((lvl, i) => (
            // eslint-disable-next-line react/no-array-index-key
            <div className={styles.level} data-level={4 - i} key={i}>
              {lvl}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
