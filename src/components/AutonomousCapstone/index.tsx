import React, {useMemo, useState} from 'react';
import {autonomousCapstone, GRADES, type GradeId} from '@site/src/data/ciudadbots';
import styles from './styles.module.css';


export default function AutonomousCapstone(): React.JSX.Element {
  const [grade, setGrade] = useState<GradeId>('1-basico');
  const [milestoneId, setMilestoneId] = useState(autonomousCapstone.milestones[0].id);
  const milestone = autonomousCapstone.milestones.find((item) => item.id === milestoneId) || autonomousCapstone.milestones[0];
  const expectation = useMemo(() => autonomousCapstone.expectations.find((item) => item.grade === grade)!, [grade]);

  return <section className={styles.panel} aria-live="polite">
    <div className={styles.header}><div><span className={styles.eyebrow}>Cierre autónomo · 3 sesiones</span><h3>{autonomousCapstone.title}</h3><p>{autonomousCapstone.description}</p></div><div className={styles.controls}><label>Grado<select value={grade} onChange={(event) => setGrade(event.target.value as GradeId)}>{GRADES.map((item) => <option key={item.id} value={item.id}>{item.label}</option>)}</select></label></div></div>
    <div className={styles.contexts}><strong>Problemáticas posibles</strong><div>{autonomousCapstone.problemContexts.map((item) => <span key={item}>{item}</span>)}</div></div>
    <div className={styles.expectation}><span>Qué se espera en {GRADES.find((item) => item.id === grade)?.label}</span><strong>{expectation.focus}</strong><p>{expectation.teacherSupport}</p></div>
    <div className={styles.milestones}>{autonomousCapstone.milestones.map((item) => <button key={item.id} type="button" className={item.id === milestone.id ? styles.active : ''} onClick={() => setMilestoneId(item.id)}><b>{item.order}</b><span>{item.title}</span><small>Sesión sugerida</small></button>)}</div>
    <article className={styles.detail}><div className={styles.detailTop}><div><span className={styles.eyebrow}>Sesión {milestone.order} de 3</span><h4>{milestone.title}</h4></div><span className={styles.status}>Sesión sugerida</span></div><p>{milestone.purpose}</p><div className={styles.columns}><div><strong>Qué hace el equipo</strong><ul>{milestone.activities.map((item) => <li key={item}>{item}</li>)}</ul></div><div><strong>Producto de la sesión</strong><ul>{milestone.evidence.map((item) => <li key={item}>{item}</li>)}</ul></div></div><div className={styles.note}>El docente puede ampliar esta sesión según el avance del grupo y continuar con el siguiente hito cuando la solución esté lista para avanzar.</div></article>
    <details className={styles.alignment}><summary>CNB, estándares e indicadores del cierre</summary><div className={styles.alignmentGrid}><div><strong>CNB</strong><ul>{autonomousCapstone.cnb.map((item) => <li key={item}>{item}</li>)}</ul></div><div><strong>Estándares</strong><ul>{autonomousCapstone.standards.map((item) => <li key={item}>{item}</li>)}</ul></div><div><strong>Indicadores de {GRADES.find((item) => item.id === grade)?.label}</strong><ul>{expectation.indicators.map((item) => <li key={item}>{item}</li>)}</ul></div></div></details><div className={styles.note}>El cierre no entrega un modelo armado ni un programa terminado. El docente plantea el problema y acompaña las decisiones del equipo.</div>
  </section>;
}
