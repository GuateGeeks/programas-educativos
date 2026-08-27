import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {translate} from '@docusaurus/Translate';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import {modules, getModuleTitle} from '@site/src/data/ciudadbots';
import {sessions as guategeeksSessions, getSessionTitle} from '@site/src/data/guategeeks';
import CiudadBotsProgress from '@site/src/components/CiudadBotsProgress';
import styles from './styles.module.css';

const STORAGE_KEYS = {
  ciudadbots: 'guategeeks-citybots-docente-progreso-v1',
  guategeeks: 'guategeeks-smars-docente-progreso-v1',
} as const;

type TrackerState = Record<string, boolean[]>;

interface TrackerItem {
  id: string;
  title: string;
  detail: string;
  steps: number;
}

interface ProgressTrackerProps {
  program?: 'ciudadbots' | 'guategeeks';
}

/** Largest number in a range like "2-4" → 4 suggested sessions. */
function recommendedSessions(range: string): number {
  const nums = String(range).match(/\d+/g) || [];
  return nums.length ? Math.max(...nums.map(Number)) : 1;
}

function loadState(storageKey: string): TrackerState {
  try {
    return JSON.parse(localStorage.getItem(storageKey) || '{}') as TrackerState;
  } catch {
    return {};
  }
}

function valuesFor(state: TrackerState, item: TrackerItem): boolean[] {
  const stored = Array.isArray(state[item.id]) ? state[item.id].slice(0, item.steps) : [];
  const values = [...stored];
  while (values.length < item.steps) {
    values.push(false);
  }
  return values;
}

/**
 * Teacher progress tracker. Marks suggested sessions per module, persists to
 * localStorage, and shows aggregate progress. Hydrates after mount so SSR and
 * first client render match (both start empty).
 */
export default function ProgressTracker({
  program = 'ciudadbots',
}: ProgressTrackerProps): React.JSX.Element {
  if (program === 'ciudadbots') {
    return <CiudadBotsProgress />;
  }
  const {i18n} = useDocusaurusContext();
  const [state, setState] = useState<TrackerState>({});
  const [mounted, setMounted] = useState(false);
  const storageKey = STORAGE_KEYS[program];

  const items: TrackerItem[] = useMemo(
    () => {
      if (program === 'guategeeks') {
        return guategeeksSessions.map((s) => ({
          id: s.id,
          title: getSessionTitle(s.id, i18n.currentLocale),
          detail: translate(
            {id: 'guategeeks.progressTracker.blocksSuggested', message: '{blocks} bloques de 60 min sugeridos'},
            {blocks: s.recommendedBlocks},
          ),
          steps: s.recommendedBlocks,
        }));
      }

      return modules.map((m) => ({
        id: m.id,
        title: getModuleTitle(m.id, i18n.currentLocale),
        detail: translate(
          {id: 'ciudadbots.progressTracker.sessionsSuggested', message: '{sessions} sesiones sugeridas'},
          {sessions: m.sessions},
        ),
        steps: recommendedSessions(m.sessions),
      }));
    },
    [i18n.currentLocale, program],
  );

  useEffect(() => {
    setState(loadState(storageKey));
    setMounted(true);
  }, [storageKey]);

  const persist = useCallback((next: TrackerState) => {
    setState(next);
    try {
      localStorage.setItem(storageKey, JSON.stringify(next));
    } catch {
      /* storage unavailable — keep in-memory only */
    }
  }, [storageKey]);

  const toggle = useCallback(
    (item: TrackerItem, stepIndex: number) => {
      const values = valuesFor(state, item);
      values[stepIndex] = !values[stepIndex];
      persist({...state, [item.id]: values});
    },
    [state, persist],
  );

  const reset = useCallback(() => {
    try {
      localStorage.removeItem(storageKey);
    } catch {
      /* ignore */
    }
    setState({});
  }, [storageKey]);

  const summary = useMemo(() => {
    const totalSteps = items.reduce((sum, item) => sum + item.steps, 0);
    let doneSteps = 0;
    let completedModules = 0;
    for (const item of items) {
      const values = valuesFor(state, item);
      const done = values.filter(Boolean).length;
      doneSteps += done;
      if (done === item.steps) {
        completedModules += 1;
      }
    }
    const percent = totalSteps ? Math.round((doneSteps / totalSteps) * 100) : 0;
    return {totalSteps, doneSteps, completedModules, percent};
  }, [items, state]);

  return (
    <section className={styles.panel} aria-live="polite">
      <div className={styles.top}>
        <div>
          <h3 className={styles.heading}>
            {translate({id: 'ciudadbots.progressTracker.heading', message: 'Seguimiento docente del programa'})}
          </h3>
          <p className={styles.lead}>
            {translate({
              id: 'ciudadbots.progressTracker.lead',
              message: program === 'guategeeks'
                ? 'Marque los bloques de 60 minutos ya implementados. El avance se guarda en este navegador y le permite visualizar cuánto del programa ya trabajó con su grupo.'
                : 'Marque las sesiones ya implementadas. El avance se guarda en este navegador y le permite visualizar cuánto del programa ya trabajó con su grupo.',
            })}
          </p>
        </div>
        <div className={styles.kpis}>
          <div className={styles.kpi}>
            <strong>
              {summary.doneSteps}/{summary.totalSteps}
            </strong>
              <span>{program === 'guategeeks' ? 'Bloques marcados' : translate({id: 'ciudadbots.progressTracker.kpi.sessions', message: 'Sesiones marcadas'})}</span>
          </div>
          <div className={styles.kpi}>
            <strong>
              {summary.completedModules}/{items.length}
            </strong>
              <span>{program === 'guategeeks' ? 'Experiencias completas' : translate({id: 'ciudadbots.progressTracker.kpi.modules', message: 'Módulos completos'})}</span>
          </div>
          <div className={styles.kpi}>
            <strong>{summary.percent}%</strong>
            <span>{translate({id: 'ciudadbots.progressTracker.kpi.percent', message: 'Avance global'})}</span>
          </div>
        </div>
      </div>

      <div className={styles.bar}>
        <div className={styles.barFill} style={{width: `${summary.percent}%`}} />
      </div>

      <div className={styles.actions}>
        <button className={styles.reset} onClick={reset} type="button" disabled={!mounted}>
          {translate({id: 'ciudadbots.progressTracker.reset', message: 'Reiniciar seguimiento'})}
        </button>
      </div>

      <div className={styles.list}>
        {items.map((item) => {
          const values = valuesFor(state, item);
          const done = values.filter(Boolean).length;
          const rowPercent = Math.round((done / item.steps) * 100);
          return (
            <div className={styles.row} key={item.id}>
              <div className={styles.rowTop}>
                <div>
                  <div className={styles.rowTitle}>{item.title}</div>
                  <div className={styles.rowSub}>{item.detail}</div>
                </div>
                <div className={styles.rowStatus}>
                  {translate(
                    {id: 'ciudadbots.progressTracker.rowStatus', message: program === 'guategeeks' ? '{done} de {steps} bloques' : '{done} de {steps} sesiones'},
                    {done, steps: item.steps},
                  )}
                </div>
              </div>
              <div className={styles.dots}>
                {values.map((val, idx) => (
                  <button
                    // eslint-disable-next-line react/no-array-index-key
                    key={idx}
                    type="button"
                    className={`${styles.dot} ${val ? styles.dotDone : ''}`}
                    onClick={() => toggle(item, idx)}
                    aria-pressed={val}
                    aria-label={translate(
                      {id: 'ciudadbots.progressTracker.markSession', message: program === 'guategeeks' ? 'Marcar bloque {n} de {title}' : 'Marcar sesión {n} de {title}'},
                      {n: idx + 1, title: item.title},
                    )}>
                    {idx + 1}
                  </button>
                ))}
              </div>
              <div className={styles.rowBar}>
                <div className={styles.rowBarFill} style={{width: `${rowPercent}%`}} />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
