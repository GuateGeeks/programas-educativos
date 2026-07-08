import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {modules} from '@site/src/data/ciudadbots';
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

const items: TrackerItem[] = modules.map((m) => ({
  id: m.id,
  title: m.title,
  detail: `${m.sessions} sesiones sugeridas`,
  steps: recommendedSessions(m.sessions),
}));

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
export default function ProgressTracker(): JSX.Element {
  const [state, setState] = useState<TrackerState>({});
  const [mounted, setMounted] = useState(false);

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
  }, [state]);

  return (
    <section className={styles.panel} aria-live="polite">
      <div className={styles.top}>
        <div>
          <h3 className={styles.heading}>Seguimiento docente del programa</h3>
          <p className={styles.lead}>
            Marque las sesiones ya implementadas. El avance se guarda en este navegador y le
            permite visualizar cuánto del programa ya trabajó con su grupo.
          </p>
        </div>
        <div className={styles.kpis}>
          <div className={styles.kpi}>
            <strong>{summary.doneSteps}/{summary.totalSteps}</strong>
            <span>Sesiones marcadas</span>
          </div>
          <div className={styles.kpi}>
            <strong>{summary.completedModules}/{items.length}</strong>
            <span>Módulos completos</span>
          </div>
          <div className={styles.kpi}>
            <strong>{summary.percent}%</strong>
            <span>Avance global</span>
          </div>
        </div>
      </div>

      <div className={styles.bar}>
        <div className={styles.barFill} style={{width: `${summary.percent}%`}} />
      </div>

      <div className={styles.actions}>
        <button className={styles.reset} onClick={reset} type="button" disabled={!mounted}>
          Reiniciar seguimiento
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
                  {done} de {item.steps} sesiones
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
                    aria-label={`Marcar sesión ${idx + 1} de ${item.title}`}>
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
