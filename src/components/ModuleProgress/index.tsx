import React, {useEffect, useMemo, useState} from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';
import {GRADES, sessionPlans, type GradeId} from '@site/src/data/ciudadbots';
import styles from './styles.module.css';

type Status = 'pending' | 'in-progress' | 'completed' | 'reinforcement';
interface RecordItem {status: Status; evidence: string; feedback?: string; nextStep?: string; updatedAt?: string;}
interface GroupRecord {name: string; sessions?: Record<string, Status>; blocks?: Record<string, Status>; evidence?: Record<string, RecordItem>; updatedAt?: string;}
interface TrackerState {version: number; groups: Partial<Record<GradeId, Record<string, GroupRecord>>>;}

const STORAGE_KEY = 'guategeeks-citybots-docente-progreso-v2';
const labels: Record<Status, string> = {pending: 'Pendiente', 'in-progress': 'En progreso', completed: 'Completado', reinforcement: 'Requiere refuerzo'};

function load(): TrackerState { try { const value = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null') as TrackerState | null; return value?.groups ? value : {version: 2, groups: {}}; } catch { return {version: 2, groups: {}}; } }
function nextStatus(status: Status): Status { return status === 'pending' ? 'in-progress' : status === 'in-progress' ? 'completed' : status === 'completed' ? 'reinforcement' : 'pending'; }

interface ModuleProgressProps {moduleId: string; grade: GradeId;}

export default function ModuleProgress({moduleId, grade}: ModuleProgressProps): React.JSX.Element {
  const [state, setState] = useState<TrackerState>({version: 2, groups: {}});
  const [group, setGroup] = useState('Mi grupo');
  const [evidenceDraft, setEvidenceDraft] = useState('');
  const [feedbackDraft, setFeedbackDraft] = useState('');
  const [nextStepDraft, setNextStepDraft] = useState('');
  const [saved, setSaved] = useState(false);
  const coverageHref = useBaseUrl('/ciudadbots/cobertura/');
  const session = useMemo(() => sessionPlans.find((item) => item.moduleId === moduleId && item.kind === 'guided'), [moduleId]);
  const groupId = group.trim().toLowerCase().replace(/[^a-z0-9áéíóúüñ]+/gi, '-') || 'mi-grupo';
  const currentGroup = state.groups[grade]?.[groupId] || {name: group, sessions: {}, blocks: {}, evidence: {}};
  const blockStatus = (index: number): Status => currentGroup.blocks?.[`${session?.id}-b${index + 1}`] || 'pending';
  const challengeKey = `challenge-${moduleId}`;
  const challengeEvidence = currentGroup.evidence?.[challengeKey];

  useEffect(() => { setState(load()); }, [grade, moduleId]);
  useEffect(() => { setEvidenceDraft(challengeEvidence?.evidence || ''); setFeedbackDraft(challengeEvidence?.feedback || ''); setNextStepDraft(challengeEvidence?.nextStep || ''); setSaved(false); }, [challengeEvidence?.evidence, challengeEvidence?.feedback, challengeEvidence?.nextStep, grade, groupId, moduleId]);

  const persist = (nextGroup: GroupRecord) => {
    const next: TrackerState = {...state, groups: {...state.groups, [grade]: {...(state.groups[grade] || {}), [groupId]: {...nextGroup, name: group, updatedAt: new Date().toISOString()}}}};
    setState(next); setSaved(true);
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch { /* Keep the current session usable if storage is unavailable. */ }
  };
  const updateBlock = (index: number) => persist({...currentGroup, blocks: {...(currentGroup.blocks || {}), [`${session?.id}-b${index + 1}`]: nextStatus(blockStatus(index))}});
  const saveEvidence = () => persist({...currentGroup, evidence: {...(currentGroup.evidence || {}), [challengeKey]: {status: challengeEvidence?.status || 'in-progress', evidence: evidenceDraft, feedback: feedbackDraft, nextStep: nextStepDraft, updatedAt: new Date().toISOString()}}});

  if (!session) return <></>;
  return <section className={styles.panel} aria-labelledby="module-progress-title">
    <div className={styles.header}><div><span className={styles.eyebrow}>Seguimiento del módulo</span><h5 id="module-progress-title">Avance de {GRADES.find((item) => item.id === grade)?.label}</h5><p>Marque los bloques conforme avance el grupo. Puede repetirlos sin alterar la ruta.</p></div><label>Grupo<input value={group} onChange={(event) => {setGroup(event.target.value); setSaved(false);}} /></label></div>
    <div className={styles.blocks}>{(session.blocks || []).map((block, index) => <button key={block.id} type="button" className={styles[blockStatus(index)]} onClick={() => updateBlock(index)}><b>{index + 1}</b><span>{block.title}</span><small>{labels[blockStatus(index)]}</small></button>)}</div>
    <div className={styles.transfer}><div><span className={styles.eyebrow}>Desafío de transferencia</span><strong>Registre una evidencia breve</strong><p>Describa qué intentó el equipo, qué observó y qué debería probar después.</p></div><div className={styles.fields}><textarea value={evidenceDraft} onChange={(event) => {setEvidenceDraft(event.target.value); setSaved(false);}} placeholder="Evidencia observada" rows={2} /><textarea value={feedbackDraft} onChange={(event) => {setFeedbackDraft(event.target.value); setSaved(false);}} placeholder="Retroalimentación docente" rows={2} /><textarea value={nextStepDraft} onChange={(event) => {setNextStepDraft(event.target.value); setSaved(false);}} placeholder="Siguiente paso" rows={2} /></div><button type="button" onClick={saveEvidence}>Guardar evidencia</button></div>
    <div className={styles.footer}><span>{saved ? 'Guardado en este navegador' : 'Registro por grupo y grado'}</span><a href={coverageHref}>Abrir seguimiento completo</a></div>
  </section>;
}
