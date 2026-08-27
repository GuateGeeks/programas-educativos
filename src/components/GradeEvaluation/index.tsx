import React, {useMemo, useState} from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import {getSessionAssessment, getSessionPlansForModule, GRADES, type GradeId} from '@site/src/data/ciudadbots';
import RubricTable from '@site/src/components/RubricTable';
import styles from './styles.module.css';

interface GradeEvaluationProps {moduleId: string; grade?: GradeId; onGradeChange?: (grade: GradeId) => void;}

export default function GradeEvaluation({moduleId, grade: controlledGrade, onGradeChange}: GradeEvaluationProps): React.JSX.Element {
  const {i18n} = useDocusaurusContext();
  const isEnglish = i18n.currentLocale === 'en';
  const sessions = useMemo(() => getSessionPlansForModule(moduleId), [moduleId]);
  const [localGrade, setLocalGrade] = useState<GradeId>('1-basico');
  const [route, setRoute] = useState<'guided' | 'open'>('guided');
  const grade = controlledGrade || localGrade;
  const routeSessions = sessions.filter((session) => session.kind === route);
  const [sessionId, setSessionId] = useState(routeSessions[0]?.id || '');
  const selected = routeSessions.find((session) => session.id === sessionId) || routeSessions[0];
  const [blockIndex, setBlockIndex] = useState(0);
  const assessment = selected ? getSessionAssessment(selected, grade, blockIndex, isEnglish) : undefined;
  const changeGrade = (nextGrade: GradeId) => { setLocalGrade(nextGrade); onGradeChange?.(nextGrade); setBlockIndex(0); };
  const changeRoute = (nextRoute: 'guided' | 'open') => { setRoute(nextRoute); setSessionId(sessions.find((session) => session.kind === nextRoute)?.id || ''); setBlockIndex(0); };
  const modeLabel = assessment?.mode === 'required' ? (isEnglish ? 'Required assessment' : 'Evaluación requerida') : assessment?.mode === 'optional' ? (isEnglish ? 'Optional reference' : 'Referencia opcional') : (isEnglish ? 'Process observation' : 'Observación de proceso');
  if (!assessment || !selected) return <section className={styles.panel}><p>{isEnglish ? 'No assessment reference is configured for this module.' : 'No hay una referencia de evaluación configurada para este módulo.'}</p></section>;

  return (
    <section className={styles.panel} aria-label={isEnglish ? 'Context-based assessment' : 'Evaluación por contexto'}>
      <div className={styles.top}>
        <div><span>{isEnglish ? 'Module assessment' : 'Evaluación del módulo'}</span><h3>{isEnglish ? 'Reference for observing the team' : 'Referencia para observar al equipo'}</h3><p>{isEnglish ? 'Select the context you want to support. This is not an individual grade.' : 'Seleccione el contexto que desea acompañar. No es una calificación individual.'}</p></div>
        <label>{isEnglish ? 'Grade' : 'Grado'}<select value={grade} onChange={(event) => changeGrade(event.target.value as GradeId)}>{GRADES.map((item) => <option key={item.id} value={item.id}>{isEnglish ? `Grade ${Number(item.id[0]) + 6}` : item.label}</option>)}</select></label>
      </div>
      <div className={styles.contextNav} role="tablist" aria-label="Ruta de evaluación">
        <button type="button" role="tab" aria-selected={route === 'guided'} className={route === 'guided' ? styles.active : ''} onClick={() => changeRoute('guided')}><b>01</b><span><strong>{isEnglish ? 'Guided route' : 'Ruta guiada'}</strong><small>{isEnglish ? 'Build and understand' : 'Construir y comprender'}</small></span></button>
        <button type="button" role="tab" aria-selected={route === 'open'} className={route === 'open' ? styles.active : ''} onClick={() => changeRoute('open')}><b>02</b><span><strong>{isEnglish ? 'Open challenge' : 'Desafío abierto'}</strong><small>{isEnglish ? 'Design and solve' : 'Diseñar y resolver'}</small></span></button>
      </div>
      <div className={styles.selectionGrid}>
        <label>{isEnglish ? 'Session' : 'Sesión'}<select value={selected.id} onChange={(event) => {setSessionId(event.target.value); setBlockIndex(0);}}>{routeSessions.map((session) => <option key={session.id} value={session.id}>{session.title}</option>)}</select></label>
        <label>{isEnglish ? 'Block' : 'Bloque'}<select value={blockIndex} onChange={(event) => setBlockIndex(Number(event.target.value))}>{(selected.blocks || []).map((block, index) => <option key={block.id} value={index}>{index + 1}. {block.title}</option>)}</select></label>
      </div>
      <div className={styles.activeContext} aria-live="polite"><span>{assessment.context}</span><strong>{GRADES.find((item) => item.id === grade)?.label} · {modeLabel}</strong><small>{assessment.focus}</small></div>
      {assessment.mode === 'observation' && <div className={styles.observationNotice}><strong>{isEnglish ? 'Observe and discuss' : 'Observe y converse'}</strong><span>{isEnglish ? 'This moment does not require a score. Use the criteria to guide the team’s next step.' : 'Este momento no requiere una puntuación. Use los criterios para orientar el siguiente paso del equipo.'}</span></div>}
      <div className={styles.rubricIntro}><strong>{isEnglish ? 'Observation rubric for this session' : 'Rúbrica de observación de esta sesión'}</strong><span>{isEnglish ? 'Use the row that best describes the team. This is a reference, not an individual grade.' : 'Use el nivel que mejor describa al equipo. Es una referencia, no una calificación individual.'}</span></div>
      <RubricTable rows={assessment.criteria.map((criterion) => ({criterion: criterion.title, levels: criterion.levels}))} headerLabel={isEnglish ? 'Criterion' : 'Criterio'} />
      <div className={styles.nextStep}><b>{isEnglish ? 'Next step' : 'Siguiente paso'}</b><span>{assessment.nextStep}</span></div>
    </section>
  );
}
