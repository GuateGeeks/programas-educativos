import React, {useState} from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import {useStandardsContent} from '@site/src/data/ciudadbots';
import {useAccessControl} from '@site/src/components/AccessControl';
import styles from './styles.module.css';

type GuidePanel = {title: string; kicker: string; content: React.ReactNode};

function Panel({panel, open, onToggle}: {panel: GuidePanel; open: boolean; onToggle: () => void}): React.JSX.Element {
  const panelId = `guide-panel-${panel.kicker}`;
  return (
    <article className={`${styles.panel} ${open ? styles.panelOpen : ''}`}>
      <button type="button" className={styles.panelButton} aria-expanded={open} aria-controls={panelId} onClick={onToggle}>
        <span><small>{panel.kicker}</small><strong>{panel.title}</strong></span>
        <span className={styles.toggle} aria-hidden="true">{open ? '−' : '+'}</span>
      </button>
      <div className={styles.panelContent} id={panelId} role="region" aria-hidden={!open}>
        <div>{panel.content}</div>
      </div>
    </article>
  );
}

export function CityBotsIntroPanels(): React.JSX.Element {
  const {i18n} = useDocusaurusContext();
  const {isDemo} = useAccessControl();
  const base = useBaseUrl('/');
  const en = i18n.currentLocale === 'en';
  const [open, setOpen] = useState(0);
  const panels: GuidePanel[] = en ? [
    {kicker: '01', title: 'Browse module by module', content: <p>Each module brings implementation, resources, CNB alignment, and teacher assessment together in one place.</p>},
    {kicker: '02', title: "What's included", content: <p>Base LEGO SPIKE programs, a build-guide viewer, methodology guidance, and ready-to-use rubrics.</p>},
    {kicker: '03', title: 'How to plan', content: <p>Choose a compact, standard, or extended track according to available kits and the depth your group needs.</p>},
    {kicker: '04', title: 'How to access this material', content: isDemo ? <p>Start here, review the authorized demo views, and use the coverage page to understand the full route.</p> : <p>Start here, choose the module, review implementation, prepare resources, then consult CNB and assessment. You can also open the <a href={`${base}estudiante/`}>student view</a> for team work.</p>},
  ] : [
    {kicker: '01', title: 'Navegue módulo por módulo', content: <p>Cada módulo organiza en un solo lugar la implementación, los recursos, la alineación CNB y la evaluación docente.</p>},
    {kicker: '02', title: 'Qué incluye', content: <p>Programas base LEGO SPIKE, visor de construcción, orientaciones metodológicas y rúbricas listas para usar.</p>},
    {kicker: '03', title: 'Cómo planificar', content: <p>Elija una ruta compacta, estándar o extendida según los kits disponibles y la profundidad que necesita el grupo.</p>},
    {kicker: '04', title: 'Cómo acceder al contenido', content: isDemo ? <p>Empiece aquí, revise las vistas autorizadas de la demo y consulte cobertura para comprender la ruta completa.</p> : <p>Empiece aquí, elija el módulo, revise la implementación, prepare recursos y consulte CNB y evaluación. También puede abrir el <a href={`${base}estudiante/`}>modo estudiante</a> para el trabajo en equipo.</p>},
  ];
  const activePanel = panels[open] ?? panels[0];
  return (
    <div className={styles.linearSteps} aria-label={en ? 'How to use this material' : 'Cómo usar este material'}>
      <div className={styles.stepRail} role="tablist" aria-label={en ? 'Material steps' : 'Pasos del material'}>
        {panels.map((panel, index) => (
          <button
            type="button"
            role="tab"
            aria-selected={open === index}
            aria-controls="intro-step-content"
            className={`${styles.stepButton} ${open === index ? styles.stepButtonActive : ''}`}
            key={panel.kicker}
            onClick={() => setOpen(index)}
          >
            <span className={styles.stepNumber}>{panel.kicker}</span>
            <span>{panel.title}</span>
          </button>
        ))}
      </div>
      <div className={styles.stepContent} id="intro-step-content" role="tabpanel">
        <span className={styles.stepContentKicker}>{activePanel.kicker}</span>
        <h3>{activePanel.title}</h3>
        {activePanel.content}
      </div>
    </div>
  );
}

export default function CityBotsGuidePanels(): React.JSX.Element {
  const {i18n} = useDocusaurusContext();
  const {isDemo} = useAccessControl();
  const {scopeOptions} = useStandardsContent();
  const base = useBaseUrl('/');
  const en = i18n.currentLocale === 'en';
  const [open, setOpen] = useState(0);
  const panels: GuidePanel[] = en ? [
    {kicker: '01', title: 'Team work profiles', content: <><p>Organize teams with three rotating profiles so every student explores a different responsibility:</p><ul><li><b>Builder</b> assembles the robot and compares it with the visual guide.</li><li><b>Organizer</b> takes care of materials, timing, and step completion.</li><li><b>Programmer</b> opens the base program, adjusts blocks, and explains the code.</li></ul><p>Rotate profiles during the module.</p></>},
    {kicker: '02', title: 'Student access', content: <><p>Share the <a href={`${base}estudiante/`}>student view</a> when the center has the material hosted online. Teams can advance at their own pace with the visual guide.</p></>},
    {kicker: '03', title: 'Implementation routes', content: <div className={styles.routeGrid}>{scopeOptions.map((option) => <div className={styles.route} key={option.title}><b>{option.title}</b><p>{option.text}</p></div>)}</div>},
    {kicker: '04', title: 'Six-month progression', content: <><p>The first 12 experiences are guided and the next 12 are open. Each module includes a flexible 60-minute plan, resources, grade-specific tracking, and applicable assessment.</p><a className={styles.inlineLink} href={`${base}ciudadbots/cobertura/`}>Open coverage and progression →</a></>},
    {kicker: '05', title: 'Curriculum framework', content: <><p>The overview aligns the lower-secondary CNB with Mathematics, Natural Sciences, Learning and Communication Technologies, Communication and Language, and Entrepreneurship for Productivity.</p><p>Each module adds international standards, resources, and assessment at the depth your group needs.</p></>},
    {kicker: '06', title: "What's expected of the teacher", content: <p>Lead the experience, set the pace, organize roles, collect evidence, and use each module's information to support technical improvement and student learning.</p>},
    {kicker: '07', title: 'Another lower-secondary program', content: <><p><a href={`${base}guategeeks/`}><b>GuateGeeks · SMARS Autonomous Classroom</b></a> works with pure Arduino: a tracked robot that detects obstacles and makes decisions with two motors, an ultrasonic sensor, and a state machine.</p><p>CiudadBots starts with block-based urban engineering challenges; SMARS goes deeper into electronics and C++.</p></>},
  ] : [
    {kicker: '01', title: 'Perfiles de trabajo del equipo', content: <><p>Organice equipos con tres perfiles rotativos para que cada estudiante explore una responsabilidad distinta:</p><ul><li><b>Constructor</b> arma el robot y compara la estructura con la guía visual.</li><li><b>Organizador</b> cuida materiales, tiempos y el cierre de cada paso.</li><li><b>Programador</b> abre el programa base, ajusta bloques y explica el código.</li></ul><p>Rote los perfiles durante el módulo.</p></>},
    {kicker: '02', title: 'Acceso para estudiantes', content: <><p>Comparta el <a href={`${base}estudiante/`}>modo estudiante</a> cuando el centro tenga el material alojado en red. El equipo podrá avanzar a su ritmo con la guía visual.</p></>},
    {kicker: '03', title: 'Rutas de implementación', content: <div className={styles.routeGrid}>{scopeOptions.map((option) => <div className={styles.route} key={option.title}><b>{option.title}</b><p>{option.text}</p></div>)}</div>},
    {kicker: '04', title: 'Ruta progresiva de seis meses', content: <><p>Las primeras 12 experiencias son guiadas y las siguientes 12 son abiertas. Cada módulo incluye un plan flexible de 60 minutos, recursos, seguimiento por grado y evaluación aplicable.</p><a className={styles.inlineLink} href={`${base}ciudadbots/cobertura/`}>Ver cobertura y progresión →</a></>},
    {kicker: '05', title: 'Marco curricular', content: <><p>La vista general alinea primero el CNB de Ciclo Básico con Matemática, Ciencias Naturales, Tecnologías del Aprendizaje y la Comunicación, Comunicación y Lenguaje, y Emprendimiento para la Productividad.</p><p>Cada módulo agrega estándares internacionales, recursos y evaluación según la profundidad que necesite el grupo.</p></>},
    {kicker: '06', title: 'Qué se espera del docente', content: <p>Conduzca la experiencia, decida el ritmo, organice roles, recoja evidencias y use la información del módulo para acompañar la mejora técnica y el aprendizaje.</p>},
    {kicker: '07', title: 'Otro programa para Ciclo Básico', content: <><p><a href={`${base}guategeeks/`}><b>GuateGeeks · SMARS Aula Autónomo</b></a> trabaja con Arduino puro: un robot de orugas que detecta obstáculos y decide por sí mismo con dos motores, sensor ultrasónico y máquina de estados.</p><p>CiudadBots parte de retos de ingeniería urbana con bloques; SMARS profundiza en electrónica y C++.</p></>},
  ];
  const visiblePanels = isDemo ? panels.filter((panel) => panel.kicker !== '02' && panel.kicker !== '07') : panels;
  return <section className={styles.container} aria-label={en ? 'Teacher guide details' : 'Detalles de la guía docente'}>{visiblePanels.map((panel, index) => <Panel key={panel.kicker} panel={panel} open={open === index} onToggle={() => setOpen(open === index ? -1 : index)} />)}</section>;
}
