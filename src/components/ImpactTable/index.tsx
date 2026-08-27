import React, {useState} from 'react';
import styles from './styles.module.css';

interface ImpactTableProps {
  /** First row is the header; remaining rows are data. */
  rows: readonly (readonly string[])[];
  compact?: boolean;
  interactive?: boolean;
}

/**
 * Grade-comparison table (Nivel/Grado/Eje × grade columns), ported from the
 * original HTML's `.impact-table`/`.impact-row`/`.impact-cell` pattern.
 */
export default function ImpactTable({rows, compact = false, interactive = false}: ImpactTableProps): React.JSX.Element {
  const [header, ...body] = rows;
  const [activeRow, setActiveRow] = useState(0);
  if (interactive) {
    const selected = body[activeRow] || body[0];
    return (
      <section className={`${styles.interactive} ${compact ? styles.compact : ''}`} aria-label="Explorador de medición">
        <div className={styles.interactiveNav} role="tablist" aria-label="Seleccionar eje de medición">
          {body.map((row, index) => <button type="button" role="tab" aria-selected={activeRow === index} className={activeRow === index ? styles.activeTab : ''} onClick={() => setActiveRow(index)} key={row[0]}><span>{String(index + 1).padStart(2, '0')}</span>{row[0]}</button>)}
        </div>
        {selected && <div className={styles.interactivePanel} role="tabpanel" aria-live="polite"><span>{header[0]}</span><strong>{selected[0]}</strong><div className={styles.interactiveValue}>{selected.slice(1).map((cell, index) => <article key={`${selected[0]}-${index}`}><small>{header[index + 1]}</small><p>{cell}</p></article>)}</div></div>}
      </section>
    );
  }
  return (
    <div className={`${styles.table} ${compact ? styles.compact : ''}`}>
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
