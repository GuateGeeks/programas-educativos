import React from 'react';
import {cnbSourceLinks, impactReportingNote} from '@site/src/data/ciudadbots';
import CardGrid from '@site/src/components/CardGrid';
import FlagNote from '@site/src/components/FlagNote';

/**
 * Links to the official CNB Guatemala wiki, plus the closing "how to report
 * impact" note. Ported from the original HTML's `cnbSourceLinks()` and the
 * trailing flag in `cnbMarkup(m)`.
 */
export default function CnbSourceLinks(): JSX.Element {
  return (
    <>
      <CardGrid items={cnbSourceLinks} />
      <FlagNote tone="good" title="Uso docente para reportar impacto">
        {impactReportingNote}
      </FlagNote>
    </>
  );
}
