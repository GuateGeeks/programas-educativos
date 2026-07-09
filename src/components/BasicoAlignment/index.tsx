import React from 'react';
import {basicoLevels, basicoComparison} from '@site/src/data/ciudadbots';
import ImpactTable from '@site/src/components/ImpactTable';
import styles from './styles.module.css';

/**
 * The 1º/2º/3º básico alignment breakdown: three level cards (goal +
 * checklist) plus a 4-axis comparison table. Ported from the original HTML's
 * `basicoAlignment()`. Used on the overview page and the Showcase page.
 */
export default function BasicoAlignment(): JSX.Element {
  return (
    <>
      <div className={styles.grid}>
        {basicoLevels.map((level) => (
          <div className={styles.card} key={level.heading}>
            <h4>{level.heading}</h4>
            <p>{level.goal}</p>
            <ul>
              {level.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <ImpactTable rows={basicoComparison} />
    </>
  );
}
