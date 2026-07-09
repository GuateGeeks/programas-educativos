import React, {useState} from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Translate, {translate} from '@docusaurus/Translate';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import {useDoc} from '@docusaurus/plugin-content-docs/client';
import {getModule, PROGRAMS_BASE} from '@site/src/data/ciudadbots';
import type {PhaseKind} from '@site/src/data/ciudadbots/types';
import BuildGuide from '@site/src/components/BuildGuide';
import PhaseTimeline, {type Phase} from '@site/src/components/PhaseTimeline';
import CnbBlock from '@site/src/components/CnbBlock';
import CardGrid from '@site/src/components/CardGrid';
import AchievementIndicators from '@site/src/components/AchievementIndicators';
import InternationalAlignment from '@site/src/components/InternationalAlignment';
import CnbSourceLinks from '@site/src/components/CnbSourceLinks';
import RubricTable, {type RubricRow} from '@site/src/components/RubricTable';
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

const RUBRIC_LEVELS = [
  translate({
    id: 'ciudadbots.module.rubric.level4',
    message: 'Lo demuestra con autonomía, precisión y puede justificar decisiones con evidencia.',
  }),
  translate({
    id: 'ciudadbots.module.rubric.level3',
    message: 'Lo demuestra de forma correcta y suficiente para cumplir la meta.',
  }),
  translate({
    id: 'ciudadbots.module.rubric.level2',
    message: 'Lo demuestra parcialmente o necesita apoyo para completarlo.',
  }),
  translate({
    id: 'ciudadbots.module.rubric.level1',
    message: 'Todavía no logra aplicarlo o explicarlo con claridad.',
  }),
] as const;

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
  const {metadata} = useDoc();
  const {i18n} = useDocusaurusContext();
  const title = metadata.title;
  const leadWithInternational = i18n.currentLocale === 'en';
  const [tab, setTab] = useState<TabKey>('metodo');
  const programHref = useBaseUrl(`${PROGRAMS_BASE}${m.program}`);
  const pdfHref = useBaseUrl(`/assets/ciudadbots/${m.slug}-guia-construccion.pdf`);

  const content = collectChildren(children);
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

  const rubricRows: RubricRow[] = content.evaluation.map((criterion) => ({
    criterion,
    levels: RUBRIC_LEVELS,
  }));

  const TABS: {key: TabKey; label: string}[] = [
    {key: 'metodo', label: translate({id: 'ciudadbots.module.tab.metodo', message: 'Implementación'})},
    {key: 'recursos', label: translate({id: 'ciudadbots.module.tab.recursos', message: 'Recursos'})},
    {key: 'cnb', label: translate({id: 'ciudadbots.module.tab.cnb', message: 'CNB y estándares'})},
    {key: 'eval', label: translate({id: 'ciudadbots.module.tab.eval', message: 'Evaluación'})},
  ];

  const cnbItems = content.cnb.map((text) => ({
    area: translate({id: 'ciudadbots.module.cnb.area', message: 'Área curricular'}),
    text,
  }));
  const standardsItems = content.standards.map((text) => ({
    title: translate({id: 'ciudadbots.module.standards.itemTitle', message: 'Aplicación específica del módulo'}),
    text,
  }));

  const cnbBlock = (
    <CnbBlock
      badge="CNB"
      title={translate({
        id: 'ciudadbots.module.cnb.title',
        message: 'Alineación Guatemala · Ciclo Básico · 1.º, 2.º y 3.º básico',
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
            <Translate id="ciudadbots.module.drivingQuestion">Pregunta motora.</Translate>
          </strong>{' '}
          {content.question}
        </p>
      )}
      {content.context && <div className={styles.context}>{content.context}</div>}

      <div
        className={styles.tabs}
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
            {t.label}
          </button>
        ))}
      </div>

      {tab === 'metodo' && (
        <div className={styles.panel}>
          <div className={styles.chips}>
            {content.concepts.map((c) => (
              <span className={styles.chip} key={c}>
                {c}
              </span>
            ))}
          </div>
          <PhaseTimeline phases={content.phases} />
        </div>
      )}

      {tab === 'recursos' && (
        <div className={styles.panel}>
          <div className={styles.resourceCard}>
            <strong>
              <Translate id="ciudadbots.module.resource.programTitle">Programa base LEGO SPIKE / LLSP</Translate>
            </strong>
            <p>
              <Translate id="ciudadbots.module.resource.programBody">
                Úselo como base de implementación del módulo. Puede abrirlo antes de clase para revisar
                bloques, sensores y la secuencia esperada.
              </Translate>
            </p>
            <a className={styles.download} href={programHref} download>
              {translate({id: 'ciudadbots.module.resource.download', message: 'Descargar {program}'}, {program: m.program})}
            </a>
          </div>

          {m.guide && guideTitle ? (
            <div className={styles.guideBlock}>
              <BuildGuide guide={m.guide} title={guideTitle} />
              <a className={styles.pdfLink} href={pdfHref} download>
                <Translate id="ciudadbots.module.resource.downloadPdf">Descargar guía en PDF</Translate>
              </a>
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
        </div>
      )}

      {tab === 'cnb' && (
        <div className={styles.panel}>
          {leadWithInternational ? (
            <>
              {internationalBlock}
              <details className={styles.secondary}>
                <summary>
                  <Translate id="ciudadbots.module.cnb.secondarySummary">
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
            <Translate id="ciudadbots.module.eval.scaleNote">
              Escala sugerida: 4 = Sobresaliente, 3 = Logrado, 2 = En proceso, 1 = Inicial.
            </Translate>
          </p>
          <RubricTable rows={rubricRows} />
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
