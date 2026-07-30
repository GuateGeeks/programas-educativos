import React from 'react';
import styles from './styles.module.css';

export interface CardGridItem {
  title: string;
  text: string;
  href?: string;
  linkLabel?: string;
}

interface CardGridProps {
  items: readonly CardGridItem[];
}

/**
 * Grid of small title/text cards with an optional outbound link, ported from
 * the original HTML's `.card-grid`/`.mini-card` pattern.
 */
export default function CardGrid({items}: CardGridProps): React.JSX.Element {
  return (
    <div className={styles.grid}>
      {items.map((item) => (
        <div className={styles.card} key={item.title}>
          <div className={styles.title}>{item.title}</div>
          <p>{item.text}</p>
          {item.href && (
            <p>
              <a href={item.href} target="_blank" rel="noreferrer">
                {item.linkLabel ?? item.title}
              </a>
            </p>
          )}
        </div>
      ))}
    </div>
  );
}
