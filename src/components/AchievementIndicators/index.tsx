import React from 'react';
import {translate} from '@docusaurus/Translate';
import {useStandardsContent} from '@site/src/data/ciudadbots';
import FlagNote from '@site/src/components/FlagNote';
import ImpactTable from '@site/src/components/ImpactTable';
import CnbBlock from '@site/src/components/CnbBlock';

interface AchievementIndicatorsProps {
  moduleTitle: string;
}

/**
 * The grade-differentiated CNB depth block for a single module: how to read
 * the grade 7/8/9 alignment, the generic maturity-by-grade table, the
 * official CNB competency synthesis, and the achievement indicators
 * specific to this module. Ported from the original HTML's `cnbMarkup(m)`
 * (excluding the international-standards portion, which is its own component).
 */
export default function AchievementIndicators({moduleTitle}: AchievementIndicatorsProps): JSX.Element {
  const {depthByGradeNote, maturityByGrade, cnbOfficialCompetencies, achievementNoteFor, achievementIndicators} =
    useStandardsContent();
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
      <ImpactTable rows={maturityByGrade} />
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
      <ImpactTable rows={achievementIndicators(moduleTitle)} />
    </>
  );
}
