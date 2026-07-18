import React from 'react';
import {translate} from '@docusaurus/Translate';
import styles from './styles.module.css';

export interface RubricRow {
  criterion: string;
  /** Exactly 4 performance-level descriptions: Sobresaliente, Logrado, En proceso, Inicial. */
  levels: readonly [string, string, string, string];
}

interface RubricTableProps {
  rows: readonly RubricRow[];
  /** Optional label for the criterion header column (defaults to a translated "Criterio"). */
  headerLabel?: string;
}

/**
 * 4-level evaluation rubric table, ported from the original HTML's
 * `.rubric`/`.rubric-row` pattern. Shared between the per-module evaluation
 * tab (generic level text applied to each module's criteria) and the
 * Showcase page's final rubric (criterion-specific level text).
 */
export default function RubricTable({rows, headerLabel}: RubricTableProps) {
  const resolvedHeaderLabel =
    headerLabel ?? translate({id: 'ciudadbots.rubricTable.criterion', message: 'Criterio'});
  const levelHeaders = [
    translate({id: 'ciudadbots.rubricTable.level4', message: '4 · Sobresaliente'}),
    translate({id: 'ciudadbots.rubricTable.level3', message: '3 · Logrado'}),
    translate({id: 'ciudadbots.rubricTable.level2', message: '2 · En proceso'}),
    translate({id: 'ciudadbots.rubricTable.level1', message: '1 · Inicial'}),
  ] as const;

  return (
    <div className={styles.rubric}>
      <div className={`${styles.row} ${styles.head}`}>
        <div>{resolvedHeaderLabel}</div>
        {levelHeaders.map((h) => (
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
