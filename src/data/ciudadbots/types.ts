// Typed schema for a CiudadBots program module.
// One shape shared by all modules so the <Module> renderer stays consistent.

/** Learning-cycle phase kind: Activar · Explorar · Crear · Reflexionar. */
export type PhaseKind = 'act' | 'exp' | 'cre' | 'ref';

export interface Phase {
  /** Phase kind, drives the accent color. */
  kind: PhaseKind;
  /** Short label, e.g. "Activar · 15 min". */
  label: string;
  /** Phase title. */
  title: string;
  /** Phase description. */
  body: string;
}

/** Reference to a paginated visual build guide (images in static/). */
export interface GuideRef {
  title: string;
  pages: number;
  /** URL prefix for page images; page number + ".jpg" is appended. */
  imageBase: string;
}

export interface Module {
  /** Stable id, e.g. "m1" — referenced from MDX as <Module id="m1" />. */
  id: string;
  /** Two-digit number, e.g. "01". */
  n: string;
  /** URL/file slug, e.g. "trazamapas-chapin". */
  slug: string;
  title: string;
  /** One-line summary of the module focus. */
  short: string;
  /** Suggested session range, e.g. "2-3". */
  sessions: string;
  /** Driving question. */
  question: string;
  /** Context / scenario narrative. */
  context: string;
  /** Key robotics/CS concepts. */
  concepts: string[];
  /** Exactly four phases: act, exp, cre, ref. */
  phases: readonly [Phase, Phase, Phase, Phase];
  /** CNB curriculum alignment lines. */
  cnb: string[];
  /** International standards (CSTA/ISTE/NGSS) lines. */
  standards: string[];
  /** Evaluation rubric criteria. */
  evaluation: string[];
  /** Downloadable LEGO SPIKE program filename. */
  program: string;
  /** Optional visual build guide. */
  guide?: GuideRef;
}
