import React, {useState} from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Translate, {translate} from '@docusaurus/Translate';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import {useDoc} from '@docusaurus/plugin-content-docs/client';
import {getSession, WIRING_REFERENCE} from '@site/src/data/guategeeks';
import type {PhaseKind} from '@site/src/data/guategeeks/types';
import type {Phase} from '@site/src/components/PhaseTimeline';
import HorizontalStepReader from '@site/src/components/HorizontalStepReader';
import CnbBlock from '@site/src/components/CnbBlock';
import CardGrid from '@site/src/components/CardGrid';
import AchievementIndicators from '@site/src/components/AchievementIndicators';
import InternationalAlignment from '@site/src/components/InternationalAlignment';
import CnbSourceLinks from '@site/src/components/CnbSourceLinks';
import RubricTable, {type RubricRow} from '@site/src/components/RubricTable';
// Deliberately reuses the CiudadBots module stylesheet rather than copying it,
// so the two programs stay visually identical by construction instead of by
// discipline. See design decision D6.
import styles from '@site/src/components/Module/styles.module.css';

// ---- Compound sub-components -------------------------------------------
// Content markers, not independently-rendered components: <SessionModule>
// inspects its `children` for these types and pulls their props straight out,
// so a session's narrative is authored as plain MDX children while the parent
// keeps one consistent layout. Same pattern as <Module>.

interface QuestionProps {
  children: React.ReactNode;
}
function Question(_props: QuestionProps): null {
  return null;
}
Question.displayName = 'SessionModule.Question';

interface ContextProps {
  children: React.ReactNode;
}
function SessionContext(_props: ContextProps): null {
  return null;
}
SessionContext.displayName = 'SessionModule.Context';

interface ConceptsProps {
  items: readonly string[];
}
function Concepts(_props: ConceptsProps): null {
  return null;
}
Concepts.displayName = 'SessionModule.Concepts';

interface SessionPhaseProps {
  kind: PhaseKind;
  label: string;
  title: string;
  children: React.ReactNode;
}
function SessionPhase(_props: SessionPhaseProps): null {
  return null;
}
SessionPhase.displayName = 'SessionModule.Phase';

interface ItemsProps {
  items: readonly string[];
}
function Materials(_props: ItemsProps): null {
  return null;
}
Materials.displayName = 'SessionModule.Materials';
function Reto(_props: ContextProps): null {
  return null;
}
Reto.displayName = 'SessionModule.Reto';
function Evidence(_props: ItemsProps): null {
  return null;
}
Evidence.displayName = 'SessionModule.Evidence';
// Receives the session's <SketchBlock>, which the MDX builds from a direct
// import of the .ino. The import has to be static, so it belongs in the MDX
// rather than here — this keeps SessionModule unaware of file paths.
function Code(_props: ContextProps): null {
  return null;
}
Code.displayName = 'SessionModule.Code';
function Cnb(_props: ItemsProps): null {
  return null;
}
Cnb.displayName = 'SessionModule.Cnb';
function Standards(_props: ItemsProps): null {
  return null;
}
Standards.displayName = 'SessionModule.Standards';
function Evaluation(_props: ItemsProps): null {
  return null;
}
Evaluation.displayName = 'SessionModule.Evaluation';

interface CollectedContent {
  question?: React.ReactNode;
  context?: React.ReactNode;
  reto?: React.ReactNode;
  code?: React.ReactNode;
  concepts: readonly string[];
  materials: readonly string[];
  evidence: readonly string[];
  phases: Phase[];
  cnb: readonly string[];
  standards: readonly string[];
  evaluation: readonly string[];
}

function collectChildren(children: React.ReactNode): CollectedContent {
  const collected: CollectedContent = {
    concepts: [],
    materials: [],
    evidence: [],
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
      case SessionContext:
        collected.context = (child.props as ContextProps).children;
        break;
      case Reto:
        collected.reto = (child.props as ContextProps).children;
        break;
      case Code:
        collected.code = (child.props as ContextProps).children;
        break;
      case Concepts:
        collected.concepts = (child.props as ConceptsProps).items;
        break;
      case Materials:
        collected.materials = (child.props as ItemsProps).items;
        break;
      case Evidence:
        collected.evidence = (child.props as ItemsProps).items;
        break;
      case SessionPhase: {
        const {kind, label, title, children: body} = child.props as SessionPhaseProps;
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

interface SessionModuleComponent extends React.FC<SessionModuleProps> {
  Question: typeof Question;
  Context: typeof SessionContext;
  Concepts: typeof Concepts;
  Phase: typeof SessionPhase;
  Materials: typeof Materials;
  Reto: typeof Reto;
  Evidence: typeof Evidence;
  Code: typeof Code;
  Cnb: typeof Cnb;
  Standards: typeof Standards;
  Evaluation: typeof Evaluation;
}

interface SessionModuleProps {
  /** Session id, e.g. "s1". */
  id: string;
  children?: React.ReactNode;
}

type TabKey = 'metodo' | 'codigo' | 'cnb' | 'eval';

const RUBRIC_LEVELS = [
  translate({
    id: 'guategeeks.session.rubric.level4',
    message: 'Lo demuestra con autonomía, precisión y puede justificar decisiones con evidencia.',
  }),
  translate({
    id: 'guategeeks.session.rubric.level3',
    message: 'Lo demuestra de forma correcta y suficiente para cumplir la meta.',
  }),
  translate({
    id: 'guategeeks.session.rubric.level2',
    message: 'Lo demuestra parcialmente o necesita apoyo para completarlo.',
  }),
  translate({
    id: 'guategeeks.session.rubric.level1',
    message: 'Todavía no logra aplicarlo o explicarlo con claridad.',
  }),
] as const;

const RETO_LABELS: Record<number, string> = {
  0: translate({id: 'guategeeks.session.reto.level0', message: 'Nivel 0 · Documentar'}),
  1: translate({id: 'guategeeks.session.reto.level1', message: 'Nivel 1 · Observar'}),
  2: translate({id: 'guategeeks.session.reto.level2', message: 'Nivel 2 · Modificar'}),
  3: translate({id: 'guategeeks.session.reto.level3', message: 'Nivel 3 · Algoritmos'}),
  4: translate({id: 'guategeeks.session.reto.level4', message: 'Nivel 4 · Ingeniería'}),
};

/**
 * Reusable renderer for a GuateGeeks session. Structural fields (number, slug,
 * macro-phase, mini-cycle phase sequence, challenge level, associated sketch)
 * come from the shared data schema; narrative fields are supplied as
 * compound-component children authored in that session's MDX file. Every
 * session shares one layout, matching the CiudadBots module layout.
 */
const SessionModuleImpl: React.FC<SessionModuleProps> = ({id, children}) => {
  const s = getSession(id);
  const {metadata} = useDoc();
  const {i18n} = useDocusaurusContext();
  const title = metadata.title;
  const leadWithInternational = i18n.currentLocale === 'en';
  const [tab, setTab] = useState<TabKey>('metodo');
  const wiringHref = useBaseUrl(WIRING_REFERENCE);

  const content = collectChildren(children);
  const actualKinds = content.phases.map((p) => p.kind).join(',');
  const expectedKinds = s.phaseKinds.join(',');
  if (actualKinds !== expectedKinds) {
    throw new Error(
      `GuateGeeks: session "${id}" phase kinds [${actualKinds}] do not match the expected sequence [${expectedKinds}]. Check <SessionModule.Phase kind> order in this session's MDX.`,
    );
  }

  const rubricRows: RubricRow[] = content.evaluation.map((criterion) => ({
    criterion,
    levels: RUBRIC_LEVELS,
  }));
  const phaseSteps = content.phases.map((phase) => ({
    label: phase.label,
    title: phase.title,
    body: phase.body,
    tone: phase.kind,
  }));

  // The code panel only exists for the six sessions that work with a sketch.
  const TABS: {key: TabKey; label: string}[] = [
    {key: 'metodo', label: translate({id: 'guategeeks.session.tab.metodo', message: 'Implementación'})},
    ...(s.sketch
      ? [{key: 'codigo' as TabKey, label: translate({id: 'guategeeks.session.tab.codigo', message: 'Código'})}]
      : []),
    {key: 'cnb', label: translate({id: 'guategeeks.session.tab.cnb', message: 'CNB y estándares'})},
    {key: 'eval', label: translate({id: 'guategeeks.session.tab.eval', message: 'Evaluación'})},
  ];

  const cnbItems = content.cnb.map((text) => ({
    area: translate({id: 'guategeeks.session.cnb.area', message: 'Área curricular'}),
    text,
  }));
  const standardsItems = content.standards.map((text) => ({
    title: translate({
      id: 'guategeeks.session.standards.itemTitle',
      message: 'Aplicación específica de la sesión',
    }),
    text,
  }));

  const cnbBlock = (
    <CnbBlock
      badge="CNB"
      title={translate({
        id: 'guategeeks.session.cnb.title',
        message: 'Alineación Guatemala · Ciclo Básico · Tercero Básico',
      })}
      items={cnbItems}
    />
  );

  const internationalBlock = (
    <>
      <InternationalAlignment />
      <CardGrid items={standardsItems} />
    </>
  );

  return (
    <section className={styles.module}>
      {content.question && (
        <p className={styles.question}>
          <strong>
            <Translate id="guategeeks.session.drivingQuestion">Pregunta motora.</Translate>
          </strong>{' '}
          {content.question}
        </p>
      )}
      {content.context && <div className={styles.context}>{content.context}</div>}

      <div
        className={styles.tabs}
        role="tablist"
        aria-label={translate(
          {id: 'guategeeks.session.tablistLabel', message: 'Secciones de {title}'},
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
            {t.label}
          </button>
        ))}
      </div>

      {tab === 'metodo' && (
        <div className={styles.panel}>
          <div className={styles.chips}>
            <span className={styles.chip}>{RETO_LABELS[s.retoLevel]}</span>
            {content.concepts.map((c) => (
              <span className={styles.chip} key={c}>
                {c}
              </span>
            ))}
          </div>
          <HorizontalStepReader
            ariaLabel={translate(
              {id: 'guategeeks.session.phaseReaderLabel', message: 'Fases de implementación de {title}'},
              {title},
            )}
            steps={phaseSteps}
          />

          {content.materials.length > 0 && (
            <div className={styles.resourceCard}>
              <strong>
                <Translate id="guategeeks.session.materialsTitle">Materiales de la sesión</Translate>
              </strong>
              <ul>
                {content.materials.map((m) => (
                  <li key={m}>{m}</li>
                ))}
              </ul>
            </div>
          )}

          {content.reto && (
            <div className={styles.resourceCard}>
              <strong>
                {translate(
                  {id: 'guategeeks.session.retoTitle', message: 'Reto · {level}'},
                  {level: RETO_LABELS[s.retoLevel]},
                )}
              </strong>
              <div>{content.reto}</div>
            </div>
          )}

          {content.evidence.length > 0 && (
            <div className={styles.resourceCard}>
              <strong>
                <Translate id="guategeeks.session.evidenceTitle">Evidencia esperada</Translate>
              </strong>
              <ul>
                {content.evidence.map((e) => (
                  <li key={e}>{e}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {tab === 'codigo' && s.sketch && (
        <div className={styles.panel}>
          <div className={styles.resourceCard}>
            <strong>
              {translate(
                {id: 'guategeeks.session.sketchTitle', message: 'Sketch Arduino · {label}'},
                {label: s.sketch.label},
              )}
            </strong>
            <p>
              <Translate id="guategeeks.session.sketchBody">
                Código adoptado del proyecto SMARS bajo licencia MIT, comentado en español. Compila
                para Arduino Uno sin librerías externas. Al abrirlo en el Arduino IDE, la carpeta y
                el archivo deben conservar el mismo nombre.
              </Translate>
            </p>
          </div>

          {content.code}

          <div className={styles.resourceCard}>
            <strong>
              <Translate id="guategeeks.session.wiringTitle">Cableado y tabla de pines</Translate>
            </strong>
            <p>
              <Translate id="guategeeks.session.wiringBody">
                Todos los sketches comparten la misma asignación de pines. Verifique el cableado
                antes de energizar, y recuerde que STBY debe quedar en HIGH para que el driver
                habilite los motores.
              </Translate>
            </p>
            <a className={styles.pdfLink} href={wiringHref}>
              <Translate id="guategeeks.session.wiringLink">Ver materiales y pines</Translate>
            </a>
          </div>
        </div>
      )}

      {tab === 'cnb' && (
        <div className={styles.panel}>
          {leadWithInternational ? (
            <>
              {internationalBlock}
              <details className={styles.secondary}>
                <summary>
                  <Translate id="guategeeks.session.cnb.secondarySummary">
                    Guatemala National Curriculum (CNB) alignment
                  </Translate>
                </summary>
                {cnbBlock}
                <AchievementIndicators moduleTitle={title} />
                <CnbSourceLinks />
              </details>
            </>
          ) : (
            <>
              {cnbBlock}
              <AchievementIndicators moduleTitle={title} />
              {internationalBlock}
              <CnbSourceLinks />
            </>
          )}
        </div>
      )}

      {tab === 'eval' && (
        <div className={styles.panel}>
          <p className={styles.scaleNote}>
            <Translate id="guategeeks.session.eval.scaleNote">
              Escala sugerida: 4 = Sobresaliente, 3 = Logrado, 2 = En proceso, 1 = Inicial.
            </Translate>
          </p>
          <RubricTable rows={rubricRows} />
        </div>
      )}
    </section>
  );
};

const SessionModule = SessionModuleImpl as SessionModuleComponent;
SessionModule.Question = Question;
SessionModule.Context = SessionContext;
SessionModule.Concepts = Concepts;
SessionModule.Phase = SessionPhase;
SessionModule.Materials = Materials;
SessionModule.Reto = Reto;
SessionModule.Evidence = Evidence;
SessionModule.Code = Code;
SessionModule.Cnb = Cnb;
SessionModule.Standards = Standards;
SessionModule.Evaluation = Evaluation;

export default SessionModule;
