import React from 'react';
import {GRADES, useStandardsContent, type GradeId} from '@site/src/data/ciudadbots';
import ImpactTable from '@site/src/components/ImpactTable';
import styles from './styles.module.css';

/**
 * The grade 7/8/9 (Ciclo Básico) alignment breakdown: three level cards
 * (goal + checklist) plus a 4-axis comparison table. Ported from the original
 * HTML's `basicoAlignment()`. Used on the overview page and the Showcase page.
 */
interface BasicoAlignmentProps {grade?: GradeId | 'general'; interactive?: boolean;}

export default function BasicoAlignment({grade = 'general', interactive = false}: BasicoAlignmentProps): React.JSX.Element {
  const {basicoLevels, basicoComparison} = useStandardsContent();
  const gradeIndex = grade === 'general' ? -1 : GRADES.findIndex((item) => item.id === grade);
  const visibleLevels = grade === 'general' ? basicoLevels : basicoLevels.filter((level) => level.heading.startsWith(GRADES[gradeIndex]?.label || ''));
  const visibleComparison = grade === 'general' ? basicoComparison : [
    [basicoComparison[0][0], GRADES[gradeIndex]?.label || ''] as readonly string[],
    ...basicoComparison.slice(1).map((row) => [row[0], row[gradeIndex + 1]] as readonly string[]),
  ];
  return (
    <>
      <div className={`${styles.grid} ${grade !== 'general' ? styles.filtered : ''}`}>
        {visibleLevels.map((level) => (
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
      <ImpactTable rows={visibleComparison} compact={grade !== 'general'} interactive={interactive} />
    </>
  );
}
