import React, {useState} from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';
import {getModule, PROGRAMS_BASE} from '@site/src/data/ciudadbots';
import type {Phase} from '@site/src/data/ciudadbots/types';
import BuildGuide from '@site/src/components/BuildGuide';
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
];

function PhaseCard({phase, index}: {phase: Phase; index: number}): JSX.Element {
  return (
    <div className={styles.phase}>
      <div className={`${styles.phaseHdr} ${styles[phase.kind]}`}>
        <div className={styles.phCircle}>{index + 1}</div>
        <div>
          <div className={styles.phLbl}>{phase.label}</div>
          <div className={styles.phTitle}>{phase.title}</div>
        </div>
      </div>
      <p className={styles.phaseCopy}>{phase.body}</p>
    </div>
  );
}

/**
 * Reusable renderer for a program module's structured fields. Driven entirely
 * by the typed module data, so every module shares one consistent layout.
 * Narrative (question/context) is authored in the surrounding MDX page.
 */
export default function Module({id}: ModuleProps): JSX.Element {
  const m = getModule(id);
  const [tab, setTab] = useState<TabKey>('metodo');
  const programHref = useBaseUrl(`${PROGRAMS_BASE}${m.program}`);

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
          {m.phases.map((phase, i) => (
            <PhaseCard phase={phase} index={i} key={phase.kind} />
          ))}
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
          <h4 className={styles.blockTitle}>Alineación CNB · Ciclo Básico</h4>
          <ul className={styles.list}>
            {m.cnb.map((x) => (
              <li key={x}>{x}</li>
            ))}
          </ul>
          <h4 className={styles.blockTitle}>Estándares internacionales</h4>
          <ul className={styles.list}>
            {m.standards.map((x) => (
              <li key={x}>{x}</li>
            ))}
          </ul>
        </div>
      )}

      {tab === 'eval' && (
        <div className={styles.panel}>
          <p className={styles.scaleNote}>
            Escala sugerida: 4 = Sobresaliente, 3 = Logrado, 2 = En proceso, 1 = Inicial.
          </p>
          <div className={styles.rubric}>
            <div className={`${styles.rubricRow} ${styles.rubricHead}`}>
              <div>Criterio</div>
              <div>4 · Sobresaliente</div>
              <div>3 · Logrado</div>
              <div>2 · En proceso</div>
              <div>1 · Inicial</div>
            </div>
            {m.evaluation.map((criterion) => (
              <div className={styles.rubricRow} key={criterion}>
                <div className={styles.criterion}>{criterion}</div>
                {RUBRIC_LEVELS.map((lvl, i) => (
                  // eslint-disable-next-line react/no-array-index-key
                  <div className={styles.level} data-level={4 - i} key={i}>
                    {lvl}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
