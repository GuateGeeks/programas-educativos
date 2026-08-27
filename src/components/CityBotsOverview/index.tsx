import React, {useId, useState} from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import {useStandardsContent} from '@site/src/data/ciudadbots';
import type {AreaText, BasicoLevel, ImpactRow} from '@site/src/data/ciudadbots/standards';
import {getOverviewPrimitiveProvider} from './primitiveProvider';
import styles from './styles.module.css';

type GradeKey = '1.º básico' | '2.º básico' | '3.º básico' | 'all';

const labels = {
  es: {
    levels: 'Tres niveles, una progresión',
    progression: 'Progresión por grado',
    all: 'Vista general',
    cnb: 'CNB de Guatemala · Progresión para Ciclo Básico',
    cnbHint: 'Abra un área para ver cómo se traduce en el aula.',
    grade: 'Grado',
  },
  en: {
    levels: 'Three levels, one progression',
    progression: 'Progression by grade',
    all: 'All grades',
    cnb: 'Guatemala CNB · Lower-secondary progression',
    cnbHint: 'Open an area to see how it translates into classroom work.',
    grade: 'Grade',
  },
};

function GradeCards({levels}: {levels: readonly BasicoLevel[]}): React.JSX.Element {
  return (
    <div className={styles.gradeGrid}>
      {levels.map((level, index) => (
        <article className={`${styles.gradeCard} ${styles[`grade${index + 1}`]}`} key={level.heading}>
          <span className={styles.gradeIndex}>0{index + 1}</span>
          <h3>{level.heading}</h3>
          <p className={styles.gradeGoal}>{level.goal}</p>
          <ul>
            {level.items.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </article>
      ))}
    </div>
  );
}

function ProgressionTabs({rows, text}: {rows: readonly ImpactRow[]; text: typeof labels.es}): React.JSX.Element {
  const [selected, setSelected] = useState<GradeKey>('all');
  const tabId = useId();
  const [, ...body] = rows;
  const grades: readonly {key: GradeKey; label: string}[] = [
    {key: 'all', label: text.all},
    {key: '1.º básico', label: text === labels.en ? 'Grade 7' : '1.º básico'},
    {key: '2.º básico', label: text === labels.en ? 'Grade 8' : '2.º básico'},
    {key: '3.º básico', label: text === labels.en ? 'Grade 9' : '3.º básico'},
  ];
  const gradeIndex = selected === 'all' ? -1 : grades.findIndex((grade) => grade.key === selected);
  return (
    <section className={styles.progressionPanel} aria-labelledby={`${tabId}-title`}>
      <div className={styles.sectionHeading}>
        <span className={styles.eyebrow}>{text.progression}</span>
        <h2 id={`${tabId}-title`}>{text.grade}: {selected === 'all' ? text.all : selected}</h2>
      </div>
      <div className={styles.tabs} role="tablist" aria-label={text.progression}>
        {grades.map((grade) => (
          <button
            type="button"
            role="tab"
            aria-selected={selected === grade.key}
            aria-controls={`${tabId}-panel`}
            id={`${tabId}-${grade.key}`}
            className={`${styles.tab} ${selected === grade.key ? styles.tabActive : ''}`}
            key={grade.key}
            onClick={() => setSelected(grade.key)}
          >
            {grade.label}
          </button>
        ))}
      </div>
      <div className={styles.progressionList} role="tabpanel" id={`${tabId}-panel`} aria-labelledby={`${tabId}-${selected}`}>
        {body.map((row) => (
          <article className={styles.progressionRow} key={row[0]}>
            <h3>{row[0]}</h3>
            {selected === 'all' ? (
              <div className={styles.progressionColumns}>
                {row.slice(1).map((value, index) => <div key={grades[index + 1].key}><span>{grades[index + 1].label}</span><p>{value}</p></div>)}
              </div>
            ) : <p className={styles.selectedProgression}>{row[gradeIndex] ?? row[1]}</p>}
          </article>
        ))}
      </div>
    </section>
  );
}

function CnbAccordionGrid({items, text}: {items: readonly AreaText[]; text: typeof labels.es}): React.JSX.Element {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className={styles.cnbPanel} aria-labelledby="cnb-overview-title">
      <div className={styles.sectionHeading}>
        <span className={styles.eyebrow}>{text.cnb}</span>
        <h2 id="cnb-overview-title">{text.cnbHint}</h2>
      </div>
      <div className={styles.cnbGrid}>
        {items.map((item, index) => {
          const expanded = open === index;
          const panelId = `cnb-panel-${index}`;
          return (
            <article className={`${styles.cnbCard} ${expanded ? styles.cnbCardOpen : ''}`} key={item.area}>
              <button type="button" className={styles.cnbButton} aria-expanded={expanded} aria-controls={panelId} onClick={() => setOpen(expanded ? null : index)}>
                <span>{item.area}</span><span className={styles.cnbToggle} aria-hidden="true">{expanded ? '−' : '+'}</span>
              </button>
              <div className={styles.cnbContent} id={panelId} role="region" aria-hidden={!expanded}>
                <p>{item.text}</p>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

export default function CityBotsOverview(): React.JSX.Element {
  const {i18n} = useDocusaurusContext();
  const content = useStandardsContent();
  const language = i18n.currentLocale === 'en' ? 'en' : 'es';
  const text = labels[language];
  const primitiveProvider = getOverviewPrimitiveProvider();
  return (
    <div className={styles.overview} data-primitive-provider={primitiveProvider}>
      <div className={styles.overviewMain}>
          <section aria-labelledby="citybots-levels-title">
            <div className={styles.sectionHeading}>
              <span className={styles.eyebrow}>CiudadBots</span>
              <h2 id="citybots-levels-title">{text.levels}</h2>
            </div>
            <GradeCards levels={content.basicoLevels} />
          </section>
          <ProgressionTabs rows={content.basicoComparison} text={text} />
          <CnbAccordionGrid items={content.transversalCnb} text={text} />
      </div>
    </div>
  );
}
