import React, {useState} from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Translate, {translate} from '@docusaurus/Translate';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import {getModule, getModuleTitle, getSessionPlansForModule, GRADES, PROGRAMS_BASE} from '@site/src/data/ciudadbots';
import type {GradeId} from '@site/src/data/ciudadbots';
import type {PhaseKind} from '@site/src/data/ciudadbots/types';
import BuildGuide from '@site/src/components/BuildGuide';
import type {Phase} from '@site/src/components/PhaseTimeline';
import CnbBlock from '@site/src/components/CnbBlock';
import CardGrid from '@site/src/components/CardGrid';
import AchievementIndicators from '@site/src/components/AchievementIndicators';
import InternationalAlignment from '@site/src/components/InternationalAlignment';
import CnbSourceLinks from '@site/src/components/CnbSourceLinks';
import TeacherSessionPlan from '@site/src/components/TeacherSessionPlan';
import GradeEvaluation from '@site/src/components/GradeEvaluation';
import FinalVisual from '@site/src/components/FinalVisual';
import {useAccessControl} from '@site/src/components/AccessControl';
import styles from './styles.module.css';

// ---- Compound sub-components -------------------------------------------
// These are content markers, not independently-rendered components: <Module>
// (below) inspects its `children` for these types and pulls their props
// straight out, so a module's narrative can be authored per locale as plain
// MDX children while the parent keeps one consistent layout. See openspec
// design for `neutralize-module-names-i18n` Decision 2.

interface QuestionProps {
  children: React.ReactNode;
}
function Question(_props: QuestionProps): null {
  return null;
}
Question.displayName = 'Module.Question';

interface ContextProps {
  children: React.ReactNode;
}
function ModuleContext(_props: ContextProps): null {
  return null;
}
ModuleContext.displayName = 'Module.Context';

interface ConceptsProps {
  items: readonly string[];
}
function Concepts(_props: ConceptsProps): null {
  return null;
}
Concepts.displayName = 'Module.Concepts';

interface ModulePhaseProps {
  kind: PhaseKind;
  label: string;
  title: string;
  children: React.ReactNode;
}
function ModulePhase(_props: ModulePhaseProps): null {
  return null;
}
ModulePhase.displayName = 'Module.Phase';

interface ItemsProps {
  items: readonly string[];
}
function Cnb(_props: ItemsProps): null {
  return null;
}
Cnb.displayName = 'Module.Cnb';
function Standards(_props: ItemsProps): null {
  return null;
}
Standards.displayName = 'Module.Standards';
function Evaluation(_props: ItemsProps): null {
  return null;
}
Evaluation.displayName = 'Module.Evaluation';

interface CollectedContent {
  question?: React.ReactNode;
  context?: React.ReactNode;
  concepts: readonly string[];
  phases: Phase[];
  cnb: readonly string[];
  standards: readonly string[];
  evaluation: readonly string[];
}

function collectChildren(children: React.ReactNode): CollectedContent {
  const collected: CollectedContent = {
    concepts: [],
    phases: [],
    cnb: [],
    standards: [],
    evaluation: [],
  };
  React.Children.forEach(children, (child) => {
    if (!React.isValidElement(child)) {
      return;
    }
    switch (child.type) {
      case Question:
        collected.question = (child.props as QuestionProps).children;
        break;
      case ModuleContext:
        collected.context = (child.props as ContextProps).children;
        break;
      case Concepts:
        collected.concepts = (child.props as ConceptsProps).items;
        break;
      case ModulePhase: {
        const {kind, label, title, children: body} = child.props as ModulePhaseProps;
        collected.phases.push({kind, label, title, body});
        break;
      }
      case Cnb:
        collected.cnb = (child.props as ItemsProps).items;
        break;
      case Standards:
        collected.standards = (child.props as ItemsProps).items;
        break;
      case Evaluation:
        collected.evaluation = (child.props as ItemsProps).items;
        break;
      default:
        break;
    }
  });
  return collected;
}

// --------------------------------------------------------------------------

interface ModuleComponent extends React.FC<ModuleProps> {
  Question: typeof Question;
  Context: typeof ModuleContext;
  Concepts: typeof Concepts;
  Phase: typeof ModulePhase;
  Cnb: typeof Cnb;
  Standards: typeof Standards;
  Evaluation: typeof Evaluation;
}

interface ModuleProps {
  /** Module id, e.g. "m1". */
  id: string;
  children?: React.ReactNode;
}

type TabKey = 'metodo' | 'recursos' | 'cnb' | 'eval';
type AlignmentView = 'overview' | 'cnb' | 'standards';
type AlignmentGrade = GradeId | 'general';

/**
 * Reusable renderer for a module's content. Structural fields (number, slug,
 * program filename, phase-kind sequence, guide) come from the shared data
 * schema; narrative fields (question, context, concepts, phase text, CNB,
 * standards, evaluation) are supplied per locale as compound-component
 * children, authored in that module's MDX file. Every module shares one
 * layout in both locales.
 */
const ModuleImpl: React.FC<ModuleProps> = ({id, children}) => {
  const m = getModule(id);
  const {i18n} = useDocusaurusContext();
  const {isDemo} = useAccessControl();
  const en = i18n.currentLocale === 'en';
  const title = getModuleTitle(id, i18n.currentLocale);
  const [tab, setTab] = useState<TabKey>('metodo');
  const [programGrade, setProgramGrade] = useState<GradeId>('1-basico');
  const [alignmentView, setAlignmentView] = useState<AlignmentView>('overview');
  const [alignmentGrade, setAlignmentGrade] = useState<AlignmentGrade>('1-basico');
  const programHref = useBaseUrl(`${PROGRAMS_BASE}${m.program}`);
  const studentHref = useBaseUrl(`/estudiante?module=${id}`);

  const content = collectChildren(children);
  const modulePlan = getSessionPlansForModule(id)[0];
  const gradeExpectation = alignmentGrade === 'general' ? undefined : modulePlan?.expectations.find((item) => item.grade === alignmentGrade);
  const syncGrade = (nextGrade: GradeId) => { setProgramGrade(nextGrade); setAlignmentGrade(nextGrade); };
  const actualKinds = content.phases.map((p) => p.kind).join(',');
  const expectedKinds = m.phaseKinds.join(',');
  if (actualKinds !== expectedKinds) {
    throw new Error(
      `CiudadBots: module "${id}" phase kinds [${actualKinds}] do not match the expected sequence [${expectedKinds}]. Check <Module.Phase kind> order in this locale's MDX.`,
    );
  }

  const guideTitle = m.guide
    ? translate(
        {
          id: 'ciudadbots.module.guideTitle',
          message: 'Guía visual de construcción · {title}',
          description: "A module's build-guide title, interpolating the module's own title",
        },
        {title},
      )
    : undefined;

  const TABS: {key: TabKey; label: string; hint: string}[] = [
    {key: 'metodo', label: translate({id: 'ciudadbots.module.tab.metodo', message: 'Implementación'}), hint: en ? 'Plan and sessions' : 'Plan y sesiones'},
    {key: 'recursos', label: translate({id: 'ciudadbots.module.tab.recursos', message: 'Recursos'}), hint: en ? 'Ready-to-use material' : 'Material listo'},
    {key: 'cnb', label: translate({id: 'ciudadbots.module.tab.cnb', message: 'CNB y estándares'}), hint: en ? 'Curriculum alignment' : 'Alineación'},
    {key: 'eval', label: translate({id: 'ciudadbots.module.tab.eval', message: 'Evaluación'}), hint: en ? 'Teacher reference' : 'Referencia docente'},
  ];
  const activeTab = TABS.find((item) => item.key === tab) || TABS[0];

  const gradeLens = {
    '1-basico': 'En este grado: reconocer componentes, seguir secuencias y explicar el resultado con apoyo visual.',
    '2-basico': 'En este grado: medir, comparar pruebas y justificar ajustes con datos sencillos.',
    '3-basico': 'En este grado: diseñar, documentar y defender una solución con criterios de éxito.',
  } satisfies Record<GradeId, string>;
  const selectedGradeLens = alignmentGrade === 'general' ? '' : gradeLens[alignmentGrade];
  const cnbItems = content.cnb.map((text) => {
    const [area, ...detail] = text.split(':');
    return {area: area || translate({id: 'ciudadbots.module.cnb.area', message: 'Área curricular'}), text: `${detail.join(':').trim() || text}${selectedGradeLens ? ` ${selectedGradeLens}` : ''}`};
  });
  const standardsItems = content.standards.map((text) => ({
    title: `${alignmentGrade === 'general' ? 'General' : GRADES.find((grade) => grade.id === alignmentGrade)?.label} · ${translate({id: 'ciudadbots.module.standards.itemTitle', message: 'Aplicación específica del módulo'})}`,
    text: `${text}${selectedGradeLens ? ` ${selectedGradeLens}` : ''}`,
  }));

  const cnbBlock = (
    <CnbBlock
      badge="CNB"
      title={translate({
        id: 'ciudadbots.module.cnb.title',
        message: alignmentGrade === 'general' ? 'Alineación Guatemala · Ciclo Básico · 1.º, 2.º y 3.º básico' : `Alineación Guatemala · Ciclo Básico · ${GRADES.find((grade) => grade.id === alignmentGrade)?.label}`,
      })}
      items={cnbItems}
    />
  );

  const internationalBlock = (
    <>
      <InternationalAlignment grade={alignmentGrade} />
      {alignmentGrade !== 'general' && <div className={styles.gradeStandards}><div><span className={styles.alignmentEyebrow}>{en ? 'Module application' : 'Aplicación del módulo'}</span><h4>{en ? `How it is shown in Grade ${Number(alignmentGrade[0]) + 6}` : `Cómo se evidencia en ${GRADES.find((grade) => grade.id === alignmentGrade)?.label}`}</h4><p>{en ? 'These are the concrete connections between this module and the selected standards.' : 'Estas son las conexiones concretas entre este módulo y los estándares seleccionados.'}</p></div><CardGrid items={standardsItems} /></div>}
    </>
  );

  const alignmentPanel = (
    <div className={styles.alignmentExperience}>
      <div className={styles.alignmentSectionHead}><div><span className={styles.alignmentEyebrow}>{en ? 'Reference framework' : 'Marco de referencia'}</span><h3>CNB y estándares</h3><p>{en ? 'Review the curriculum purpose, grade progression, and international references for this module.' : 'Consulte el propósito curricular, la progresión por grado y las referencias internacionales del módulo.'}</p></div><span className={styles.alignmentViewCount}>{en ? '3 views' : '3 vistas'}</span></div>
      <div className={styles.alignmentSummary}>
        <div><span className={styles.alignmentIcon}>CNB</span><strong>{en ? 'Curriculum route' : 'Ruta curricular'}</strong><small>{en ? 'What is taught in Guatemala' : 'Qué se trabaja en Guatemala'}</small></div>
        <div><span className={styles.alignmentIcon}>{content.cnb.length}</span><strong>{en ? 'Related areas' : 'Áreas relacionadas'}</strong><small>{en ? 'Module connections' : 'Conexiones del módulo'}</small></div>
        <div><span className={styles.alignmentIcon}>{content.standards.length}</span><strong>{en ? 'Global references' : 'Referencias globales'}</strong><small>{en ? 'Applied standards' : 'Estándares aplicados'}</small></div>
      </div>
      <div className={styles.alignmentToolbar} role="tablist" aria-label={en ? 'Alignment view' : 'Vista de alineación'}>
        {([['overview', en ? 'Overview' : 'Resumen'], ['cnb', 'CNB'], ['standards', en ? 'Standards' : 'Estándares']] as [AlignmentView, string][]).map(([view, label], index) => <button key={view} type="button" role="tab" aria-selected={alignmentView === view} className={alignmentView === view ? styles.alignmentActive : ''} onClick={() => setAlignmentView(view)}><span>0{index + 1}</span>{label}</button>)}
        <label className={styles.alignmentGrade}><span>{en ? 'Show' : 'Mostrar'}</span><select value={alignmentGrade} onChange={(event) => { const next = event.target.value as AlignmentGrade; setAlignmentGrade(next); if (next !== 'general') setProgramGrade(next); }}><option value="general">{en ? 'All grades · full overview' : 'Todos los grados · panorama completo'}</option>{GRADES.map((grade) => <option key={grade.id} value={grade.id}>{en ? `Grade ${Number(grade.id[0]) + 6}` : grade.label}</option>)}</select></label>
      </div>
      <div className={styles.alignmentGradeCard} aria-live="polite"><span className={styles.alignmentEyebrow}>{alignmentGrade === 'general' ? 'Panorama completo · 1.º, 2.º y 3.º básico' : `Vista filtrada · ${GRADES.find((grade) => grade.id === alignmentGrade)?.label}`}</span><strong>{gradeExpectation?.minimum || 'Consulte la progresión completa y seleccione un grado para ver únicamente su alcance.'}</strong><p>{gradeExpectation?.support || 'El panorama completo reúne los tres niveles para planificar; cada vista de grado reduce la información a lo que debe observar.'}</p></div>
      {alignmentView === 'overview' && <div className={styles.alignmentOverview}><button type="button" onClick={() => setAlignmentView('cnb')}><strong>CNB Guatemala</strong><span>{en ? 'Areas, competencies, and indicators to observe.' : 'Áreas, competencias e indicadores que puede observar.'}</span><b>{en ? 'Explore CNB →' : 'Explorar CNB →'}</b></button><button type="button" onClick={() => setAlignmentView('standards')}><strong>{en ? 'International standards' : 'Estándares internacionales'}</strong><span>{en ? 'A common language for communicating program impact.' : 'Lenguaje común para comunicar el impacto del programa.'}</span><b>{en ? 'Explore standards →' : 'Explorar estándares →'}</b></button></div>}
      {alignmentView === 'cnb' && <div className={styles.alignmentDetail}>{cnbBlock}<AchievementIndicators moduleTitle={title} grade={alignmentGrade} /><CnbSourceLinks /></div>}
      {alignmentView === 'standards' && <div className={styles.alignmentDetail}>{internationalBlock}</div>}
    </div>
  );

  return (
    <section className={styles.module}>
      <div className={styles.moduleLead}>
        <div>
          <span className={styles.moduleKicker}>CiudadBots Guatemala · Módulo {m.n}</span>
          <strong>{title}</strong>
          <small>Una vista de trabajo para preparar, acompañar y cerrar esta experiencia.</small>
        </div>
        <span className={styles.moduleStatus}>{m.sessions} sesiones sugeridas</span>
      </div>
      {content.question && (
        <div className={styles.question}>
          <strong>
            <Translate id="ciudadbots.module.drivingQuestion">Pregunta motora.</Translate>
          </strong>{' '}
          <span>{content.question}</span>
        </div>
      )}
      {content.context && <div className={styles.context}>{content.context}</div>}

      <div className={styles.navigationCard}>
        <div className={styles.tabs}
        role="tablist"
        aria-label={translate(
          {id: 'ciudadbots.module.tablistLabel', message: 'Secciones de {title}'},
          {title},
        )}>
        {TABS.map((t) => (
          <button
            key={t.key}
            role="tab"
            aria-selected={tab === t.key}
            className={`${styles.tab} ${tab === t.key ? styles.tabActive : ''}`}
            onClick={() => setTab(t.key)}
            type="button">
            <span className={styles.tabNumber}>0{TABS.indexOf(t) + 1}</span>
            <span><strong>{t.label}</strong><small>{t.hint}</small></span>
          </button>
        ))}
        </div>
        <div className={styles.navigationLegend}><span>{activeTab.label}</span><small>{activeTab.hint} · {translate({id: 'ciudadbots.module.navigation.primaryHint', message: 'Seleccione una vista y avance por bloques.'})}</small></div>
      </div>

      {tab === 'metodo' && (
        <div className={styles.panel}>
          <div className={styles.sectionIntro}><span>{en ? '01 · Implementation route' : '01 · Ruta de implementación'}</span><h3>{en ? 'From challenge to test' : 'Del reto a la prueba'}</h3><p>{en ? 'Work through the module in 60-minute blocks and move forward according to the group’s evidence.' : 'Trabaje el módulo por bloques de 60 minutos y avance según la evidencia del grupo.'}</p></div>
          <details className={styles.conceptsDisclosure}>
            <summary><span>{en ? 'Module concepts' : 'Conceptos del módulo'}</span><small>{content.concepts.length} {en ? 'technical focus areas' : 'focos técnicos'}</small></summary>
            <div className={styles.chips}>
              {content.concepts.map((c) => <span className={styles.chip} key={c}>{c}</span>)}
            </div>
          </details>
          <TeacherSessionPlan moduleId={id} grade={programGrade} onGradeChange={syncGrade} />
          {isDemo && m.guide && (
              <button className={styles.guideShortcut} type="button" onClick={() => setTab('recursos')}>
              <span><strong>{en ? 'Visual build guide' : 'Guía visual de construcción'}</strong><small>{en ? 'Open this robot’s illustrated steps' : 'Abra los pasos ilustrados de este robot'}</small></span>
              <span aria-hidden="true">{en ? 'View resources →' : 'Ver recursos →'}</span>
            </button>
          )}
        </div>
      )}

      {tab === 'recursos' && (
        <div className={styles.panel}>
          <div className={styles.sectionIntro}><span>{en ? '02 · Class material' : '02 · Material de clase'}</span><h3>{en ? 'Ready-to-use resources' : 'Recursos listos para usar'}</h3><p>{en ? 'Prepare the program, check the guide, and share only what students need.' : 'Prepare el programa, consulte la guía y comparta únicamente lo que el estudiante necesita.'}</p></div>
          <div className={styles.resourceCard}>
            <div className={styles.resourceHeader}>
              <div>
                <span className={styles.resourceEyebrow}>{en ? 'Module resource' : 'Recurso del módulo'}</span>
                <strong>
                  <Translate id="ciudadbots.module.resource.programTitle">Programa base LEGO SPIKE / LLSP</Translate>
                </strong>
              </div>
              <span className={styles.resourceFormat}>.LLSP</span>
            </div>
            <p className={styles.resourceDescription}>
              <Translate id="ciudadbots.module.resource.programBody">
                Úselo como base de implementación del módulo. Puede abrirlo antes de clase para revisar
                bloques, sensores y la secuencia esperada.
              </Translate>
            </p>
            <div className={styles.resourceHint}>{en ? 'Review the program first. Then share the student view so each team can work at its own pace. If it does not open with a double click, import it from ' : 'Primero revise el programa. Después comparta la vista de estudiante para que cada equipo avance a su ritmo. Si no abre con doble clic, impórtelo desde '}<strong>LEGO Education SPIKE · {en ? 'Open project' : 'Abrir proyecto'}</strong>.</div>
            <div className={styles.resourceActions}>
              <a className={styles.download} href={programHref} download>
                {translate({id: 'ciudadbots.module.resource.download', message: 'Descargar {program}'}, {program: `${title} · ${m.program}`})}
              </a>
              <a className={styles.studentLink} href={studentHref}>
                <Translate id="ciudadbots.module.resource.shareStudent">Abrir vista de estudiante</Translate>
              </a>
            </div>
          </div>

          {m.guide && guideTitle ? (
            <div className={styles.guideBlock}>
              <BuildGuide guide={m.guide} title={guideTitle} />
            </div>
          ) : (
            <div className={`${styles.resourceCard} ${styles.pending}`}>
              <strong>
                <Translate id="ciudadbots.module.resource.guideTitle">Guía visual de construcción</Translate>
              </strong>
              <p>
                <Translate id="ciudadbots.module.resource.guidePendingBody">
                  Visor de construcción paso a paso pendiente para este módulo. Por ahora, apóyese en
                  el programa base y en la metodología de implementación.
                </Translate>
              </p>
              <span className={styles.pendingTag}>
                <Translate id="ciudadbots.module.resource.guidePendingTag">Visor pendiente</Translate>
              </span>
            </div>
          )}
          <FinalVisual src={m.finalVisual.src} version={m.finalVisual.version} title={title} />
        </div>
      )}

      {tab === 'cnb' && (
        <div className={styles.panel}>
          {alignmentPanel}
        </div>
      )}

      {tab === 'eval' && (
        <div className={styles.panel}>
          <div className={`${styles.sectionIntro} ${styles.sectionIntroCompact}`}><span>{en ? '04 · Teacher reference' : '04 · Referencia docente'}</span><p>{en ? 'Use the team’s evidence to guide feedback and the next step.' : 'Use la evidencia del equipo para orientar la retroalimentación y el siguiente paso.'}</p></div>
          <GradeEvaluation moduleId={id} grade={programGrade} onGradeChange={syncGrade} />
        </div>
      )}
    </section>
  );
};

const Module = ModuleImpl as ModuleComponent;
Module.Question = Question;
Module.Context = ModuleContext;
Module.Concepts = Concepts;
Module.Phase = ModulePhase;
Module.Cnb = Cnb;
Module.Standards = Standards;
Module.Evaluation = Evaluation;

export default Module;
