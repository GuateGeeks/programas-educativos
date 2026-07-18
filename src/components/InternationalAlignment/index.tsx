import React from 'react';
import {translate} from '@docusaurus/Translate';
import {useStandardsContent} from '@site/src/data/ciudadbots';
import CnbBlock from '@site/src/components/CnbBlock';
import ImpactTable from '@site/src/components/ImpactTable';
import CardGrid from '@site/src/components/CardGrid';

/**
 * ISTE/CSTA/NGSS progression content for lower secondary: summary cards, two
 * grade-progression tables, and outbound source links. Ported from the
 * original HTML's `internationalAlignment()`. Used per-module (CNB tab) and
 * on the overview/Showcase pages.
 */
export default function InternationalAlignment() {
  const {internationalCards, internationalProgression, internationalEvidence, internationalSourceCards} =
    useStandardsContent();
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
      <ImpactTable rows={internationalProgression} />
      <ImpactTable rows={internationalEvidence} />
      <CardGrid items={internationalSourceCards} />
    </>
  );
}
