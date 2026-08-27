import React from 'react';
import {translate} from '@docusaurus/Translate';
import {useStandardsContent} from '@site/src/data/ciudadbots';
import {GRADES, type GradeId} from '@site/src/data/ciudadbots';
import FlagNote from '@site/src/components/FlagNote';
import ImpactTable from '@site/src/components/ImpactTable';
import CnbBlock from '@site/src/components/CnbBlock';

interface AchievementIndicatorsProps {
  moduleTitle: string;
  grade?: GradeId | 'general';
}

/**
 * The grade-differentiated CNB depth block for a single module: how to read
 * the grade 7/8/9 alignment, the generic maturity-by-grade table, the
 * official CNB competency synthesis, and the achievement indicators
 * specific to this module. Ported from the original HTML's `cnbMarkup(m)`
 * (excluding the international-standards portion, which is its own component).
 */
export default function AchievementIndicators({moduleTitle, grade = 'general'}: AchievementIndicatorsProps): React.JSX.Element {
  const {depthByGradeNote, maturityByGrade, cnbOfficialCompetencies, achievementNoteFor, achievementIndicators} =
    useStandardsContent();
  const gradeLabel = grade === 'general' ? '' : GRADES.find((item) => item.id === grade)?.label || '';
  const gradeRows = (rows: readonly (readonly string[])[], labels: readonly string[]) => {
    if (grade === 'general') return {rows, compact: false};
    const row = rows.slice(1).find((item) => item[0] === gradeLabel);
    return {rows: [['Aspecto', `Aplicación en ${gradeLabel}`], ...labels.map((label, index) => [label, row?.[index + 1] || 'Sin contenido'])], compact: true};
  };
  const maturity = gradeRows(maturityByGrade, ['Qué debe cumplir', 'Evidencia observable', 'Medición de impacto']);
  const indicators = gradeRows(achievementIndicators(moduleTitle), ['Competencias CNB afines', 'Indicadores de logro', 'Evidencia esperada']);
  return (
    <>
      <FlagNote
        tone="info"
        title={translate({
          id: 'ciudadbots.achievementIndicators.howToReadTitle',
          message: 'Cómo leer esta alineación',
          description: 'Title of the note explaining how to read the grade-by-grade CNB alignment',
        })}>
        {depthByGradeNote}
      </FlagNote>
      <ImpactTable rows={maturity.rows} compact={maturity.compact} />
      <CnbBlock
        badge="CNB"
        title={translate({
          id: 'ciudadbots.achievementIndicators.competenciesTitle',
          message: 'Competencias base del Ciclo Básico afines al programa',
          description: 'Title of the CNB base competencies block',
        })}
        items={cnbOfficialCompetencies}
      />
      <FlagNote
        tone="good"
        title={translate({
          id: 'ciudadbots.achievementIndicators.suggestedTitle',
          message: 'Indicadores de logro sugeridos para este módulo',
          description: 'Title of the suggested achievement indicators note',
        })}>
        {achievementNoteFor(moduleTitle)}
      </FlagNote>
      <ImpactTable rows={indicators.rows} compact={indicators.compact} />
    </>
  );
}
