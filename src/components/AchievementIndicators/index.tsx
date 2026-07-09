import React from 'react';
import {
  depthByGradeNote,
  maturityByGrade,
  cnbOfficialCompetencies,
  achievementNoteFor,
  achievementIndicators,
} from '@site/src/data/ciudadbots';
import FlagNote from '@site/src/components/FlagNote';
import ImpactTable from '@site/src/components/ImpactTable';
import CnbBlock from '@site/src/components/CnbBlock';

interface AchievementIndicatorsProps {
  moduleTitle: string;
}

/**
 * The grade-differentiated CNB depth block for a single module: how to read
 * the 1º/2º/3º básico alignment, the generic maturity-by-grade table, the
 * official CNB competency synthesis, and the achievement indicators
 * specific to this module. Ported from the original HTML's `cnbMarkup(m)`
 * (excluding the international-standards portion, which is its own component).
 */
export default function AchievementIndicators({moduleTitle}: AchievementIndicatorsProps): JSX.Element {
  return (
    <>
      <FlagNote tone="info" title="Cómo leer esta alineación">
        {depthByGradeNote}
      </FlagNote>
      <ImpactTable rows={maturityByGrade} />
      <CnbBlock
        badge="CNB"
        title="Competencias base del Ciclo Básico afines al programa"
        items={cnbOfficialCompetencies}
      />
      <FlagNote tone="good" title="Indicadores de logro sugeridos para este módulo">
        {achievementNoteFor(moduleTitle)}
      </FlagNote>
      <ImpactTable rows={achievementIndicators(moduleTitle)} />
    </>
  );
}
