import React from 'react';
import {translate} from '@docusaurus/Translate';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import CnbBlock from '@site/src/components/CnbBlock';
import CardGrid from '@site/src/components/CardGrid';
import ImpactTable from '@site/src/components/ImpactTable';
import FlagNote from '@site/src/components/FlagNote';
import {getSmarsCurriculumContent} from '@site/src/data/guategeeks/curriculum';
import styles from './styles.module.css';

interface SmarsCnbAlignmentProps {
  sessionTitle?: string;
  cnbItems?: readonly string[];
  standardsItems?: readonly string[];
}

export default function SmarsCnbAlignment({
  sessionTitle,
  cnbItems = [],
  standardsItems = [],
}: SmarsCnbAlignmentProps): React.JSX.Element {
  const {i18n} = useDocusaurusContext();
  const content = getSmarsCurriculumContent(i18n.currentLocale);
  const sessionAreas = cnbItems.map((text) => ({
    area: translate({id: 'guategeeks.smarsCnb.sessionArea', message: 'Aplicación a esta experiencia'}),
    text,
  }));
  const standardAreas = standardsItems.map((text) => ({
    area: translate({id: 'guategeeks.smarsCnb.internationalArea', message: 'Estándar internacional relacionado'}),
    text,
  }));

  return (
    <div className={styles.alignment}>
      <FlagNote
        tone="info"
        title={translate({id: 'guategeeks.smarsCnb.readingTitle', message: 'Cómo leer esta alineación'})}
        children={content.readingNote}
      />

      <ImpactTable rows={content.levelProgression} />

      <CnbBlock
        badge="CNB"
        title={translate({
          id: 'guategeeks.smarsCnb.title',
          message: 'Alineación Guatemala · Bachillerato en Ciencias y Letras · 4.º, 5.º y 6.º bachillerato',
        })}
        items={content.cnbCompetencies}
      />

      <CnbBlock
        badge="EJES"
        title={translate({id: 'guategeeks.smarsCnb.axesTitle', message: 'Ejes de integración del programa'})}
        items={content.axes}
      />

      <ImpactTable rows={content.indicators} />

      {sessionTitle && sessionAreas.length > 0 && (
        <CnbBlock
          badge="SESIÓN"
          title={translate(
            {id: 'guategeeks.smarsCnb.sessionTitle', message: 'Aplicación curricular · {title}'},
            {title: sessionTitle},
          )}
          items={sessionAreas}
        />
      )}

      <CnbBlock
        badge="INT"
        title={translate({id: 'guategeeks.smarsCnb.internationalTitle', message: 'Estándares internacionales · Secundaria alta'})}
        items={content.internationalCards}
      />

      <ImpactTable rows={content.internationalProgression} />
      <ImpactTable rows={content.internationalEvidence} />

      {standardAreas.length > 0 && (
        <CnbBlock
          badge="ESTÁNDARES"
          title={translate({id: 'guategeeks.smarsCnb.sessionStandardsTitle', message: 'Aplicación internacional a esta experiencia'})}
          items={standardAreas}
        />
      )}

      <CardGrid items={content.sourceLinks} />

      <FlagNote
        tone="good"
        title={translate({id: 'guategeeks.smarsCnb.reportingTitle', message: 'Seguimiento y reporte docente'})}
        children={content.reportingNote}
      />
    </div>
  );
}
