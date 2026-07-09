import React, {useState} from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';
import {getModule, PROGRAMS_BASE} from '@site/src/data/ciudadbots';
import BuildGuide from '@site/src/components/BuildGuide';
import PhaseTimeline from '@site/src/components/PhaseTimeline';
import CnbBlock from '@site/src/components/CnbBlock';
import CardGrid from '@site/src/components/CardGrid';
import AchievementIndicators from '@site/src/components/AchievementIndicators';
import InternationalAlignment from '@site/src/components/InternationalAlignment';
import CnbSourceLinks from '@site/src/components/CnbSourceLinks';
import RubricTable, {type RubricRow} from '@site/src/components/RubricTable';
import styles from './styles.module.css';

interface ModuleProps {
  /** Module id, e.g. "m1". */
  id: string;
}

type TabKey = 'metodo' | 'recursos' | 'cnb' | 'eval';

const TABS: {key: TabKey; label: string}[] = [
  {key: 'metodo', label: 'Implementación'},
  {key: 'recursos', label: 'Recursos'},
  {key: 'cnb', label: 'CNB y estándares'},
  {key: 'eval', label: 'Evaluación'},
];

const RUBRIC_LEVELS = [
  'Lo demuestra con autonomía, precisión y puede justificar decisiones con evidencia.',
  'Lo demuestra de forma correcta y suficiente para cumplir la meta.',
  'Lo demuestra parcialmente o necesita apoyo para completarlo.',
  'Todavía no logra aplicarlo o explicarlo con claridad.',
] as const;

/**
 * Reusable renderer for a program module's structured fields. Driven entirely
 * by the typed module data, so every module shares one consistent layout.
 * Narrative (question/context) is authored in the surrounding MDX page.
 */
export default function Module({id}: ModuleProps): JSX.Element {
  const m = getModule(id);
  const [tab, setTab] = useState<TabKey>('metodo');
  const programHref = useBaseUrl(`${PROGRAMS_BASE}${m.program}`);
  const pdfHref = useBaseUrl('/assets/ciudadbots/trazamapas-chapin-guia-construccion.pdf');
  const rubricRows: RubricRow[] = m.evaluation.map((criterion) => ({
    criterion,
    levels: RUBRIC_LEVELS,
  }));

  return (
    <section className={styles.module}>
      <div className={styles.tabs} role="tablist" aria-label={`Secciones de ${m.title}`}>
        {TABS.map((t) => (
          <button
            key={t.key}
            role="tab"
            aria-selected={tab === t.key}
            className={`${styles.tab} ${tab === t.key ? styles.tabActive : ''}`}
            onClick={() => setTab(t.key)}
            type="button">
            {t.label}
          </button>
        ))}
      </div>

      {tab === 'metodo' && (
        <div className={styles.panel}>
          <div className={styles.chips}>
            {m.concepts.map((c) => (
              <span className={styles.chip} key={c}>
                {c}
              </span>
            ))}
          </div>
          <PhaseTimeline phases={m.phases} />
        </div>
      )}

      {tab === 'recursos' && (
        <div className={styles.panel}>
          <div className={styles.resourceCard}>
            <strong>Programa base LEGO SPIKE / LLSP</strong>
            <p>
              Úselo como base de implementación del módulo. Puede abrirlo antes de clase para revisar
              bloques, sensores y la secuencia esperada.
            </p>
            <a className={styles.download} href={programHref} download>
              Descargar {m.program}
            </a>
          </div>

          {m.guide ? (
            <div className={styles.guideBlock}>
              <BuildGuide guide={m.guide} />
              <a className={styles.pdfLink} href={pdfHref} download>
                Descargar guía en PDF
              </a>
            </div>
          ) : (
            <div className={`${styles.resourceCard} ${styles.pending}`}>
              <strong>Guía visual de construcción</strong>
              <p>
                Visor de construcción paso a paso pendiente para este módulo. Por ahora, apóyese en
                el programa base y en la metodología de implementación.
              </p>
              <span className={styles.pendingTag}>Visor pendiente</span>
            </div>
          )}
        </div>
      )}

      {tab === 'cnb' && (
        <div className={styles.panel}>
          <CnbBlock
            badge="CNB"
            title="Alineación Guatemala · Ciclo Básico · 1.º, 2.º y 3.º básico"
            items={m.cnb.map((text) => ({area: 'Área curricular', text}))}
          />
          <AchievementIndicators moduleTitle={m.title} />
          <InternationalAlignment />
          <CardGrid
            items={m.standards.map((text) => ({title: 'Aplicación específica del módulo', text}))}
          />
          <CnbSourceLinks />
        </div>
      )}

      {tab === 'eval' && (
        <div className={styles.panel}>
          <p className={styles.scaleNote}>
            Escala sugerida: 4 = Sobresaliente, 3 = Logrado, 2 = En proceso, 1 = Inicial.
          </p>
          <RubricTable rows={rubricRows} />
        </div>
      )}
    </section>
  );
}
