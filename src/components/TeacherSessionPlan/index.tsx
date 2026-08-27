import React, {useEffect, useMemo, useState} from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import {GRADES, getGradeCopy, getGradeSessionPlan, getModule, getModuleTitle, moduleSessionPlans, sessionPlans, type GradeId, type SessionPlan, type RouteComplexity} from '@site/src/data/ciudadbots';
import styles from './styles.module.css';

interface TeacherSessionPlanProps {moduleId?: string; grade?: GradeId; onGradeChange?: (grade: GradeId) => void;}
type DetailKey = 'phases' | 'resources' | 'alignment' | 'evaluation';

function modeLabel(session: SessionPlan, isEnglish = false): string { return session.kind === 'guided' ? (isEnglish ? 'Guided route' : 'Ruta guiada') : (isEnglish ? 'Open route' : 'Ruta abierta'); }
function useLabel(use: 'before' | 'during' | 'extension'): string { return use === 'before' ? 'Antes de clase' : use === 'during' ? 'Durante la clase' : 'Extensión'; }
function complexityLabel(complexity: RouteComplexity, isEnglish = false): string { return complexity === 'adaptar' ? (isEnglish ? 'Adapt' : 'Adaptar') : complexity === 'integrar' ? (isEnglish ? 'Integrate' : 'Integrar') : (isEnglish ? 'Solve' : 'Resolver'); }

export default function TeacherSessionPlan({moduleId, grade: controlledGrade, onGradeChange}: TeacherSessionPlanProps): React.JSX.Element {
  const {i18n} = useDocusaurusContext();
  const isEnglish = i18n.currentLocale === 'en';
  const ui = isEnglish ? {
    library: 'Six-month route', plan: moduleId ? 'Module work plan' : 'Session library', planBody: moduleId ? 'Work in 60-minute sessions. Repeat a session when the group needs more practice.' : 'Explore guided and open sessions that extend the program over several months.', tracking: 'Open independent teacher tracking', grade: 'Group grade', groupView: 'Group view', guided: 'Guided sessions', open: 'Open challenges', available: 'Available in this module', blocks: '60-minute blocks', repeat: 'Repeat when needed', guidedRoute: 'Guided route', openRoute: 'Open challenge', active: 'Active view', helpers: 'Session helpers', helpersBody: 'Use these details to guide the current block. Full module areas remain in the tabs above.'
  } : {
    library: 'Ruta de seis meses', plan: moduleId ? 'Plan de trabajo del módulo' : 'Biblioteca de sesiones', planBody: moduleId ? 'Avance por sesiones de 60 minutos. Puede repetir una sesión si el grupo todavía necesita practicar.' : 'Explore las sesiones guiadas y abiertas que amplían el programa durante varios meses.', tracking: 'Ver seguimiento docente independiente', grade: 'Grado del grupo', groupView: 'Vista del grupo', guided: 'Sesiones guiadas', open: 'Desafíos abiertos', available: 'Disponibles en este módulo', blocks: 'Bloques de 60 min', repeat: 'Puede repetir si hace falta', guidedRoute: 'Ruta guiada', openRoute: 'Desafío abierto', active: 'Vista activa', helpers: 'Ayudas de esta sesión', helpersBody: 'Use estos detalles para acompañar el bloque actual. Las áreas completas del módulo están en las pestañas superiores.'
  };
  const sessions = useMemo(() => moduleId ? moduleSessionPlans.filter((item) => item.moduleId === moduleId) : sessionPlans, [moduleId]);
  const [selectedId, setSelectedId] = useState(sessions[0]?.id ?? '');
  const [localGrade, setLocalGrade] = useState<GradeId>('1-basico');
  const [blockIndex, setBlockIndex] = useState(0);
  const [openRoute, setOpenRoute] = useState<'guided' | 'open'>(moduleId ? 'guided' : 'guided');
  const [detail, setDetail] = useState<DetailKey | null>(null);
  const libraryHref = useBaseUrl('/ciudadbots/cobertura/');
  const grade = controlledGrade || localGrade;
  const changeGrade = (nextGrade: GradeId) => { setLocalGrade(nextGrade); onGradeChange?.(nextGrade); };
  const moduleData = moduleId ? getModule(moduleId) : undefined;
  const moduleTitle = moduleId ? getModuleTitle(moduleId, i18n.currentLocale) : sessions[0]?.title;
  const finalVisualSrc = moduleData?.finalVisual.src
    ? useBaseUrl(moduleData.finalVisual.src)
    : undefined;

  useEffect(() => {
    if (!sessions.some((session) => session.id === selectedId)) setSelectedId(sessions[0]?.id ?? '');
    setBlockIndex(0); setDetail(null);
  }, [sessions]);

  const visibleSessions = sessions
    .filter((session) => openRoute === 'open' ? session.kind === 'open' : session.kind === 'guided')
    .map((session) => getGradeSessionPlan(session, grade, isEnglish));
  const selectedBase = sessions.find((session) => session.id === selectedId) ?? sessions[0];
  const selected = selectedBase ? getGradeSessionPlan(selectedBase, grade, isEnglish) : undefined;
  if (!selected) return <p>No hay sesiones configuradas para este módulo.</p>;
  const blocks = selected.blocks || [];
  const block = blocks[Math.min(blockIndex, blocks.length - 1)];
  const expectation = getGradeCopy(selectedBase || selected, grade, isEnglish);
  const guidance = expectation?.blockGuidance[Math.min(blockIndex, (expectation.blockGuidance.length || 1) - 1)];
  const openChallenge = selected.openChallenge;
  const toggleDetail = (key: DetailKey) => setDetail((current) => current === key ? null : key);
  const detailLabels: [DetailKey, string][] = isEnglish
    ? [['phases', 'Session phases'], ['resources', 'Materials for this moment'], ['alignment', 'What to observe'], ['evaluation', 'Next step']]
    : [['phases', 'Fases de la sesión'], ['resources', 'Material del momento'], ['alignment', 'Qué observar'], ['evaluation', 'Siguiente paso']];
  const momentUse = blockIndex === 0 ? 'before' : 'during';
  const momentResources = selected.resources.filter((item) => item.use === momentUse);

  return (
    <section className={styles.shell} aria-labelledby={moduleId ? 'module-session-plan' : 'program-session-plan'}>
      <div className={styles.header}>
        <div><span className={styles.eyebrow}>{ui.library}</span><h3 id={moduleId ? 'module-session-plan' : 'program-session-plan'}>{ui.plan}</h3><p>{ui.planBody}</p>{moduleId && <a className={styles.libraryLink} href={libraryHref}>{ui.tracking}</a>}</div>
        <label className={styles.gradeSelect}><span>{ui.grade}</span><select value={grade} onChange={(event) => changeGrade(event.target.value as GradeId)}>{GRADES.map((item) => <option key={item.id} value={item.id}>{isEnglish ? `Grade ${Number(item.id[0]) + 6}` : item.label}</option>)}</select></label>
      </div>
      <div className={styles.planMetrics} aria-label="Resumen de la ruta">
        <div><span className={styles.metricIcon}>01</span><strong>{isEnglish ? `Grade ${Number(grade[0]) + 6}` : GRADES.find((item) => item.id === grade)?.label}</strong><small>{ui.groupView}</small></div>
        <div><span className={styles.metricIcon}>{visibleSessions.length}</span><strong>{openRoute === 'guided' ? ui.guided : ui.open}</strong><small>{ui.available}</small></div>
        <div><span className={styles.metricIcon}>{blocks.length || 1}</span><strong>{ui.blocks}</strong><small>{ui.repeat}</small></div>
      </div>
      <div className={styles.routeSwitch} role="tablist" aria-label="Tramos de la ruta">
        <button type="button" role="tab" aria-selected={openRoute === 'guided'} className={openRoute === 'guided' ? styles.routeActive : ''} onClick={() => {setOpenRoute('guided'); setSelectedId(sessions.find((item) => item.kind === 'guided')?.id || selectedId); setBlockIndex(0);}}><strong>{ui.guidedRoute} · {isEnglish ? `Grade ${Number(grade[0]) + 6}` : GRADES.find((item) => item.id === grade)?.label}</strong><small>{expectation?.routeSummary || (moduleId ? (isEnglish ? '3 sessions · optional continuation' : '3 sesiones · continuidad opcional') : (isEnglish ? '12 modules · technical foundation' : '12 módulos · base técnica'))}</small></button>
        <button type="button" role="tab" aria-selected={openRoute === 'open'} className={openRoute === 'open' ? styles.routeActive : ''} onClick={() => {setOpenRoute('open'); setSelectedId(sessions.find((item) => item.kind === 'open')?.id || selectedId); setBlockIndex(0);}}><strong>{ui.openRoute} · {isEnglish ? `Grade ${Number(grade[0]) + 6}` : GRADES.find((item) => item.id === grade)?.label}</strong><small>{moduleId ? (isEnglish ? 'Variable duration · original solution' : 'Duración variable · solución propia') : (isEnglish ? '12 challenges · original solution' : '12 desafíos · solución propia')}</small></button>
      </div>
      <div className={styles.gradeContext} aria-live="polite"><span className={styles.eyebrow}>{ui.active}</span><strong>{isEnglish ? `Grade ${Number(grade[0]) + 6}` : GRADES.find((item) => item.id === grade)?.label} · {expectation?.routeLabel}</strong><small>{expectation?.routeSummary}</small></div>
      <div className={styles.route} aria-label={`${modeLabel(selected, isEnglish)} ${isEnglish ? 'available' : 'disponibles'}`}>
        {visibleSessions.map((session) => <button key={session.id} type="button" className={`${styles.sessionButton} ${selected.id === session.id ? styles.selected : ''}`} onClick={() => {setSelectedId(session.id); setBlockIndex(0); setDetail(null);}}><span className={styles.sessionNumber}>{String(session.order).padStart(2, '0')}</span><span><strong>{session.title}</strong><small>{session.blocks?.length || 1} {isEnglish ? ((session.blocks?.length || 1) === 1 ? 'class' : 'classes') : ((session.blocks?.length || 1) === 1 ? 'clase' : 'clases')} · 60 min {isEnglish ? 'each' : 'c/u'} · {session.kind === 'guided' ? session.blocks?.length === 2 ? (isEnglish ? 'optional continuation' : 'continuidad opcional') : (isEnglish ? 'base' : 'base') : complexityLabel(session.openChallenge?.complexity || 'adaptar', isEnglish)}</small></span></button>)}
      </div>
      <article className={`${styles.detail} ${selected.kind === 'open' ? styles.open : ''}`}>
        <div className={styles.detailTop}><div><span className={styles.kind}>{modeLabel(selected, isEnglish)}</span><h4>{selected.title}</h4></div><span className={styles.duration}>{blocks.length} {isEnglish ? (blocks.length === 1 ? 'class' : 'classes') : (blocks.length === 1 ? 'clase' : 'clases')} · 60 min {isEnglish ? 'each' : 'c/u'}</span></div>
        <p className={styles.purpose}>{selected.purpose}</p>
        <div className={styles.blockNav} aria-label="Bloques de la sesión">{blocks.map((item, index) => <button key={item.id} type="button" className={index === blockIndex ? styles.blockActive : ''} onClick={() => setBlockIndex(index)}><b>{index + 1}</b><span>{item.title}</span></button>)}</div>
        <div className={styles.currentBlock}><div><span className={styles.eyebrow}>{isEnglish ? 'Now' : 'Ahora'}</span><h5>{block.title}</h5><p>{block.activities}</p></div><div className={styles.checkpoint}><strong>{isEnglish ? 'To continue' : 'Para continuar'}</strong><span>{block.checkpoint}</span><small>{block.continuation}</small></div></div>
        <div className={styles.gradeGuide} aria-live="polite">
          <div><span className={styles.eyebrow}>Pregunta motora · {GRADES.find((item) => item.id === grade)?.label}</span><strong>{selected.question}</strong></div>
          <div><strong>{isEnglish ? 'What the teacher does now' : 'Qué hace el docente ahora'}</strong><p>{guidance?.teacherAction}</p></div>
          <div><strong>{isEnglish ? 'Progress signal' : 'Señal de avance'}</strong><p>{guidance?.evidence}</p></div>
        </div>
        {finalVisualSrc && <div className={styles.visualReference}>
          <div>
            <span className={styles.eyebrow}>{isEnglish ? 'Visual reference' : 'Referencia visual'}</span>
            <strong>{isEnglish ? `Visual reference: ${moduleTitle}` : `Referencia visual: ${moduleTitle}`}</strong>
            <p>{isEnglish ? 'Show the completed model briefly so the team connects the build guide, the program, and the test.' : 'Muestre brevemente el modelo terminado para que el equipo conecte la guía, el programa y la prueba.'}</p>
            <small className={styles.visualReferenceHint}>{isEnglish ? 'Use the image to compare structure, movement, and the expected result.' : 'Use la imagen para comparar estructura, movimiento y resultado esperado.'}</small>
          </div>
          <img src={finalVisualSrc} alt={isEnglish ? `${moduleTitle} · completed model` : `${moduleTitle} · modelo terminado`} loading="lazy" />
        </div>}
        <div className={styles.detailLegend}><span className={styles.eyebrow}>{ui.helpers}</span><small>{ui.helpersBody}</small></div>
        <div className={styles.detailControls} role="list" aria-label={isEnglish ? 'Session helpers' : 'Ayudas de esta sesión'}>{detailLabels.map(([key, label]) => <button key={key} type="button" onClick={() => toggleDetail(key)} aria-expanded={detail === key} aria-controls={`session-detail-${key}`}>{label}<span aria-hidden="true">{detail === key ? '−' : '+'}</span></button>)}</div>
        {detail === 'phases' && <div id="session-detail-phases" className={styles.phaseGrid}>{selected.phases.map((phase) => <div className={`${styles.phase} ${styles[phase.kind]}`} key={phase.kind}><span>{phase.minutes} min · {phase.kind === 'act' ? (isEnglish ? 'Activate' : 'Activar') : phase.kind === 'exp' ? (isEnglish ? 'Explore' : 'Explorar') : phase.kind === 'cre' ? (isEnglish ? 'Create' : 'Crear') : (isEnglish ? 'Reflect' : 'Reflexionar')}</span><strong>{phase.title}</strong><p>{phase.body}</p></div>)}</div>}
        {detail === 'resources' && <div id="session-detail-resources" className={styles.resourceGrid}><div><strong>{isEnglish ? 'Prepare or use now' : 'Prepare o use ahora'}</strong><ul>{momentResources.map((item) => <li key={item.label}><span>{item.label}</span><small>{item.action} · {item.status === 'available' ? (isEnglish ? 'Available' : 'Disponible') : item.status === 'pending' ? (isEnglish ? 'In preparation' : 'En preparación') : (isEnglish ? 'Recommended' : 'Recomendado')}</small></li>)}</ul></div><div><strong>{isEnglish ? 'Where to find the full set' : 'Dónde consultar el conjunto completo'}</strong><p>{isEnglish ? 'Use the main Resources tab for all files, guides, and student links.' : 'Use la pestaña principal Recursos para consultar todos los archivos, guías y enlaces para estudiantes.'}</p></div></div>}
        {detail === 'alignment' && <div id="session-detail-alignment" className={styles.sessionSupport}><strong>{isEnglish ? `What to observe in ${GRADES.find((item) => item.id === grade)?.label}` : `Qué observar en ${GRADES.find((item) => item.id === grade)?.label}`}</strong><p>{expectation?.minimum}</p><p><b>{isEnglish ? 'Support:' : 'Apoyo:'}</b> {expectation?.support}</p><p><b>{isEnglish ? 'Extension:' : 'Extensión:'}</b> {expectation?.extension}</p><small>{isEnglish ? 'For the complete CNB and international standards mapping, open the main CNB and standards tab.' : 'Para consultar la alineación completa al CNB y los estándares internacionales, abra la pestaña principal CNB y estándares.'}</small></div>}
        {detail === 'evaluation' && <div id="session-detail-evaluation" className={styles.evaluationPanel}><strong>{isEnglish ? 'Decision for the next step' : 'Decisión para el siguiente paso'}</strong><p>{isEnglish ? 'Use these prompts to give feedback on the team process. This contextual view does not record individual grades.' : 'Use estas referencias para conversar sobre el proceso del equipo. Esta vista contextual no registra calificaciones individuales.'}</p><ul>{selected.evaluationCriteria.map((item) => <li key={item}>{item}</li>)}</ul></div>}
        {selected.kind === 'open' && openChallenge && (
          <section className={styles.challengeCard} aria-labelledby="module-transfer-challenge">
            <div className={styles.challengeHeader}>
              <div><span className={styles.eyebrow}>{isEnglish ? 'Context need' : 'Necesidad del contexto'}</span><h5 id="module-transfer-challenge">{openChallenge.need}</h5></div>
              <span className={styles.challengeLevel}>{isEnglish ? (openChallenge.complexity === 'adaptar' ? 'Adapt' : openChallenge.complexity === 'integrar' ? 'Integrate' : 'Solve') : complexityLabel(openChallenge.complexity)} · {openChallenge.suggestedBlocks} {isEnglish ? `class${openChallenge.suggestedBlocks === 1 ? '' : 'es'}` : `clase${openChallenge.suggestedBlocks === 1 ? '' : 's'}`}</span>
            </div>
            <p className={styles.challengeContext}>{openChallenge.challenge}</p>
            <div className={styles.challengeFocus}><strong>{isEnglish ? 'How to know it is advancing' : 'Cómo saber que avanza'}</strong><span>{openChallenge.completion}</span></div>
            <div className={styles.challengeGrid}>
              <div><strong>{isEnglish ? 'Team output' : 'Qué entrega el equipo'}</strong><p>{openChallenge.studentOutput}</p></div>
              <div><strong>{isEnglish ? `For ${GRADES.find((item) => item.id === grade)?.label}` : `Para ${GRADES.find((item) => item.id === grade)?.label}`}</strong><p>{expectation?.question}</p></div>
            </div>
            <details className={styles.challengeDetails}><summary>{isEnglish ? 'View teacher guide' : 'Ver guía docente del desafío'}</summary><div className={styles.challengeDetailGrid}><div><strong>{isEnglish ? 'Constraints' : 'Restricciones'}</strong><ul>{openChallenge.constraints.map((item) => <li key={item}>{item}</li>)}</ul></div><div><strong>{isEnglish ? 'Support for this grade' : 'Apoyo para este grado'}</strong><p>{expectation?.support}</p></div><div><strong>{isEnglish ? 'Completion signal' : 'Señal de cierre'}</strong><p>{openChallenge.completion}</p></div><div><strong>{isEnglish ? 'Next step' : 'Siguiente paso'}</strong><p>{selected.nextStep}</p></div></div><p className={styles.openNotice}>{isEnglish ? 'The team decides how to build and program. There is no single model or finished software to copy.' : 'El equipo decide cómo construir y programar. No hay un modelo armado ni un software terminado que deban copiar.'}</p></details>
          </section>
        )}
      </article>
    </section>
  );
}
