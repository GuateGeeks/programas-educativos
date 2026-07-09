// Typed schema for a CiudadBots program module.
// Structural, locale-independent fields only — narrative content (title,
// driving question, context, concepts, phase text, CNB, standards,
// evaluation) is authored per locale in each module's MDX file and supplied
// to the <Module> compound component as children. See openspec design for
// `neutralize-module-names-i18n`.

/** Learning-cycle phase kind: Activar · Explorar · Crear · Reflexionar. */
export type PhaseKind = 'act' | 'exp' | 'cre' | 'ref';

/** Reference to a paginated visual build guide (images in static/). */
export interface GuideRef {
  pages: number;
  /** URL prefix for page images; page number + ".jpg" is appended. */
  imageBase: string;
}

export interface Module {
  /** Stable id, e.g. "m1" — referenced from MDX as <Module id="m1" />. */
  id: string;
  /** Two-digit number, e.g. "01". */
  n: string;
  /** URL/file slug, shared by both locales, e.g. "mapper-bot". */
  slug: string;
  /** Suggested session range, e.g. "2-3". */
  sessions: string;
  /** Downloadable LEGO SPIKE program filename. */
  program: string;
  /** Ordered sequence of the four learning-phase kinds, driving accent color and matching each locale's <Module.Phase> order. */
  phaseKinds: readonly [PhaseKind, PhaseKind, PhaseKind, PhaseKind];
  /** Optional visual build guide. */
  guide?: GuideRef;
}
