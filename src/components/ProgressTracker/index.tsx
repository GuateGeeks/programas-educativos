import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {translate} from '@docusaurus/Translate';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import {modules, getModuleTitle} from '@site/src/data/ciudadbots';
import styles from './styles.module.css';

// Program-scoped storage key (kept from the original publication).
const STORAGE_KEY = 'guategeeks-citybots-docente-progreso-v1';

type TrackerState = Record<string, boolean[]>;

interface TrackerItem {
  id: string;
  title: string;
  detail: string;
  steps: number;
}

/** Largest number in a range like "2-4" → 4 suggested sessions. */
function recommendedSessions(range: string): number {
  const nums = String(range).match(/\d+/g) || [];
  return nums.length ? Math.max(...nums.map(Number)) : 1;
}

function loadState(): TrackerState {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}') as TrackerState;
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
export default function ProgressTracker(): React.JSX.Element {
  const {i18n} = useDocusaurusContext();
  const [state, setState] = useState<TrackerState>({});
  const [mounted, setMounted] = useState(false);

  const items: TrackerItem[] = useMemo(
    () =>
      modules.map((m) => ({
        id: m.id,
        title: getModuleTitle(m.id, i18n.currentLocale),
        detail: translate(
          {id: 'ciudadbots.progressTracker.sessionsSuggested', message: '{sessions} sesiones sugeridas'},
          {sessions: m.sessions},
        ),
        steps: recommendedSessions(m.sessions),
      })),
    [i18n.currentLocale],
  );

  useEffect(() => {
    setState(loadState());
    setMounted(true);
  }, []);

  const persist = useCallback((next: TrackerState) => {
    setState(next);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      /* storage unavailable — keep in-memory only */
    }
  }, []);

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
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* ignore */
    }
    setState({});
  }, []);

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
              message:
                'Marque las sesiones ya implementadas. El avance se guarda en este navegador y le permite visualizar cuánto del programa ya trabajó con su grupo.',
            })}
          </p>
        </div>
        <div className={styles.kpis}>
          <div className={styles.kpi}>
            <strong>
              {summary.doneSteps}/{summary.totalSteps}
            </strong>
            <span>{translate({id: 'ciudadbots.progressTracker.kpi.sessions', message: 'Sesiones marcadas'})}</span>
          </div>
          <div className={styles.kpi}>
            <strong>
              {summary.completedModules}/{items.length}
            </strong>
            <span>{translate({id: 'ciudadbots.progressTracker.kpi.modules', message: 'Módulos completos'})}</span>
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
                    {id: 'ciudadbots.progressTracker.rowStatus', message: '{done} de {steps} sesiones'},
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
                      {id: 'ciudadbots.progressTracker.markSession', message: 'Marcar sesión {n} de {title}'},
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
