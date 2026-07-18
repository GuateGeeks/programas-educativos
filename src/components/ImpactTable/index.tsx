import React from 'react';
import styles from './styles.module.css';

interface ImpactTableProps {
  /** First row is the header; remaining rows are data. Each row has exactly 4 cells. */
  rows: readonly (readonly string[])[];
}

/**
 * Grade-comparison table (Nivel/Grado/Eje × grade columns), ported from the
 * original HTML's `.impact-table`/`.impact-row`/`.impact-cell` pattern.
 */
export default function ImpactTable({rows}: ImpactTableProps) {
  const [header, ...body] = rows;
  return (
    <div className={styles.table}>
      <div className={`${styles.row} ${styles.headRow}`}>
        {header.map((cell, i) => (
          // eslint-disable-next-line react/no-array-index-key
          <div className={styles.cell} key={i}>
            {cell}
          </div>
        ))}
      </div>
      {body.map((row, ri) => (
        // eslint-disable-next-line react/no-array-index-key
        <div className={styles.row} key={ri}>
          {row.map((cell, ci) => (
            // eslint-disable-next-line react/no-array-index-key
            <div className={`${styles.cell} ${ci === 0 ? styles.cellFirst : ''}`} key={ci}>
              {cell}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
