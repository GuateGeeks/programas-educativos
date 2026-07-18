import React from 'react';
import {translate} from '@docusaurus/Translate';
import {useStandardsContent} from '@site/src/data/ciudadbots';
import CardGrid from '@site/src/components/CardGrid';
import FlagNote from '@site/src/components/FlagNote';

/**
 * Links to the official CNB Guatemala wiki, plus the closing "how to report
 * impact" note. Ported from the original HTML's `cnbSourceLinks()` and the
 * trailing flag in `cnbMarkup(m)`.
 */
export default function CnbSourceLinks() {
  const {cnbSourceLinks, impactReportingNote} = useStandardsContent();
  return (
    <>
      <CardGrid items={cnbSourceLinks} />
      <FlagNote
        tone="good"
        title={translate({
          id: 'ciudadbots.cnbSourceLinks.reportingTitle',
          message: 'Uso docente para reportar impacto',
          description: 'Title of the note explaining how to use these sources to report program impact',
        })}>
        {impactReportingNote}
      </FlagNote>
    </>
  );
}
