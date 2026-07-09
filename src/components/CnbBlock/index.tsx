import React from 'react';
import styles from './styles.module.css';

interface CnbBlockProps {
  badge: string;
  title: string;
  items: readonly {area: string; text: string}[];
}

/**
 * Badge + title + 2-column grid of area/text items, ported from the
 * original HTML's `.cnb-block`/`.cnb-grid`/`.cnb-item` pattern. Used for CNB
 * competency summaries and the international-standards summary cards.
 */
export default function CnbBlock({badge, title, items}: CnbBlockProps): JSX.Element {
  return (
    <div className={styles.block}>
      <div className={styles.top}>
        <span className={styles.badge}>{badge}</span>
        <span className={styles.title}>{title}</span>
      </div>
      <div className={styles.grid}>
        {items.map((item) => (
          <div className={styles.item} key={item.area}>
            <div className={styles.area}>{item.area}</div>
            <div className={styles.text}>{item.text}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
