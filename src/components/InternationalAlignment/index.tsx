import React from 'react';
import {translate} from '@docusaurus/Translate';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import {GRADES, useStandardsContent, type GradeId} from '@site/src/data/ciudadbots';
import CnbBlock from '@site/src/components/CnbBlock';
import ImpactTable from '@site/src/components/ImpactTable';
import CardGrid from '@site/src/components/CardGrid';

/**
 * ISTE/CSTA/NGSS progression content for lower secondary: summary cards, two
 * grade-progression tables, and outbound source links. Ported from the
 * original HTML's `internationalAlignment()`. Used per-module (CNB tab) and
 * on the overview/Showcase pages.
 */
interface InternationalAlignmentProps {grade?: GradeId | 'general'; interactive?: boolean;}

export default function InternationalAlignment({grade = 'general', interactive = false}: InternationalAlignmentProps): React.JSX.Element {
  const {internationalCards, internationalProgression, internationalEvidence, internationalSourceCards} =
    useStandardsContent();
  const {i18n} = useDocusaurusContext();
  const isEnglish = i18n.currentLocale === 'en';
  const gradeIndex = grade === 'general' ? -1 : GRADES.findIndex((item) => item.id === grade);
  const gradeLabel = grade === 'general' ? '' : isEnglish ? `Grade ${Number(grade?.[0]) + 6}` : GRADES.find((item) => item.id === grade)?.label || '';
  const visibleRows = (rows: readonly (readonly string[])[], header: string) => {
    if (grade === 'general') return {rows, compact: false};
    return {rows: [[rows[0][0], header], ...rows.slice(1).map((row) => [row[0], row[gradeIndex + 1]])], compact: true};
  };
  const progression = grade === 'general'
    ? {rows: internationalProgression, compact: false}
    : {rows: [[internationalProgression[0][0], `${isEnglish ? 'Application in' : 'Aplicación en'} ${gradeLabel}`], ['ISTE', internationalProgression[gradeIndex + 1]?.[1] || (isEnglish ? 'No content' : 'Sin contenido')], ['CSTA', internationalProgression[gradeIndex + 1]?.[2] || (isEnglish ? 'No content' : 'Sin contenido')], ['NGSS / Ingeniería', internationalProgression[gradeIndex + 1]?.[3] || (isEnglish ? 'No content' : 'Sin contenido')]], compact: true};
  const evidence = visibleRows(internationalEvidence, `${isEnglish ? 'What to observe in' : 'Qué observar en'} ${gradeLabel}`);
  return (
    <>
      <CnbBlock
        badge="INT"
        title={translate({
          id: 'ciudadbots.internationalAlignment.title',
          message: 'Estándares internacionales · Progresión para Ciclo Básico',
          description: 'Title of the international standards (ISTE/CSTA/NGSS) summary block',
        })}
        items={internationalCards}
      />
      <ImpactTable rows={progression.rows} compact={progression.compact} interactive={interactive} />
      <ImpactTable rows={evidence.rows} compact={evidence.compact} interactive={interactive} />
      <CardGrid items={internationalSourceCards} />
    </>
  );
}
