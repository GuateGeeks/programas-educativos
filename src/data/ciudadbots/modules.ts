import type {Module} from './types';

// Base URLs for CiudadBots static assets (served from static/assets/ciudadbots/).
export const PROGRAMS_BASE = '/assets/ciudadbots/programs/';
export const BUILD_GUIDE_BASE = '/assets/ciudadbots/build-guide/page-';

// Structural data for the 12 CiudadBots modules — id, number, slug, session
// range, downloadable program filename, phase-kind sequence, and optional
// build-guide metadata. Narrative content (title, question, context,
// concepts, phase text, CNB, standards, evaluation) lives in each module's
// per-locale MDX file (docs/ for es, i18n/en/docusaurus-plugin-content-docs/
// current/ for en) and is supplied to <Module> as compound-component
// children. See openspec design for `neutralize-module-names-i18n`.
export const modules: readonly Module[] = [
  {
    id: 'm1',
    n: '01',
    slug: 'mapper-bot',
    sessions: '2-3',
    program: '01-mapper-bot.llsp',
    phaseKinds: ['act', 'exp', 'cre', 'ref'],
    guide: {pages: 20, imageBase: BUILD_GUIDE_BASE},
  },
  {
    id: 'm2',
    n: '02',
    slug: 'delivery-bot',
    sessions: '2-3',
    program: '02-delivery-bot.llsp',
    phaseKinds: ['act', 'exp', 'cre', 'ref'],
  },
  {
    id: 'm3',
    n: '03',
    slug: 'forklift',
    sessions: '2-3',
    program: '03-forklift.llsp',
    phaseKinds: ['act', 'exp', 'cre', 'ref'],
  },
  {
    id: 'm4',
    n: '04',
    slug: 'repair-arm',
    sessions: '2-3',
    program: '04-repair-arm.llsp',
    phaseKinds: ['act', 'exp', 'cre', 'ref'],
  },
  {
    id: 'm5',
    n: '05',
    slug: 'tower-crane',
    sessions: '2-4',
    program: '05-tower-crane.llsp',
    phaseKinds: ['act', 'exp', 'cre', 'ref'],
  },
  {
    id: 'm6',
    n: '06',
    slug: 'compact-loader',
    sessions: '2-3',
    program: '06-compact-loader.llsp',
    phaseKinds: ['act', 'exp', 'cre', 'ref'],
  },
  {
    id: 'm7',
    n: '07',
    slug: 'sorting-arm',
    sessions: '3-4',
    program: '07-sorting-arm.llsp',
    phaseKinds: ['act', 'exp', 'cre', 'ref'],
  },
  {
    id: 'm8',
    n: '08',
    slug: 'bridge-builder',
    sessions: '2-4',
    program: '08-bridge-builder.llsp',
    phaseKinds: ['act', 'exp', 'cre', 'ref'],
  },
  {
    id: 'm9',
    n: '09',
    slug: 'elevator',
    sessions: '3-4',
    program: '09-elevator.llsp',
    phaseKinds: ['act', 'exp', 'cre', 'ref'],
  },
  {
    id: 'm10',
    n: '10',
    slug: 'city-car',
    sessions: '2-4',
    program: '10-city-car.llsp',
    phaseKinds: ['act', 'exp', 'cre', 'ref'],
  },
  {
    id: 'm11',
    n: '11',
    slug: 'fire-rescue-unit',
    sessions: '2-4',
    program: '11-fire-rescue-unit.llsp',
    phaseKinds: ['act', 'exp', 'cre', 'ref'],
  },
  {
    id: 'm12',
    n: '12',
    slug: 'ferris-wheel',
    sessions: '2-3',
    program: '12-ferris-wheel.llsp',
    phaseKinds: ['act', 'exp', 'cre', 'ref'],
  },
];

/** Lookup a module by its id (e.g. "m1"). Throws if not found. */
export function getModule(id: string): Module {
  const found = modules.find((m) => m.id === id);
  if (!found) {
    throw new Error(`CiudadBots: no module with id "${id}".`);
  }
  return found;
}
