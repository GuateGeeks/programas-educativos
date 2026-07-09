import React from 'react';
import {
  internationalCards,
  internationalProgression,
  internationalEvidence,
  internationalSourceCards,
} from '@site/src/data/ciudadbots';
import CnbBlock from '@site/src/components/CnbBlock';
import ImpactTable from '@site/src/components/ImpactTable';
import CardGrid from '@site/src/components/CardGrid';

/**
 * ISTE/CSTA/NGSS progression content for Ciclo Básico: summary cards, two
 * grade-progression tables, and outbound source links. Ported from the
 * original HTML's `internationalAlignment()`. Used per-module (CNB tab) and
 * on the overview/Showcase pages.
 */
export default function InternationalAlignment(): JSX.Element {
  return (
    <>
      <CnbBlock badge="INT" title="Estándares internacionales · Progresión para Ciclo Básico" items={internationalCards} />
      <ImpactTable rows={internationalProgression} />
      <ImpactTable rows={internationalEvidence} />
      <CardGrid items={internationalSourceCards} />
    </>
  );
}
