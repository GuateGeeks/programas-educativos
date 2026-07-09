import {modules, getModule, PROGRAMS_BASE, BUILD_GUIDE_BASE} from './modules';

export * from './types';
export * from './standards';
export {modules, getModule, PROGRAMS_BASE, BUILD_GUIDE_BASE};

// Import-time integrity check. Runs during SSR/build (and in the browser),
// so a malformed module set fails the build instead of shipping silently.
// Compile-time: the `readonly [Phase, Phase, Phase, Phase]` tuple in types.ts
// already guarantees exactly four phases per module.
export const EXPECTED_MODULE_COUNT = 12;

(function validateModules(): void {
  if (modules.length !== EXPECTED_MODULE_COUNT) {
    throw new Error(
      `CiudadBots: se esperaban ${EXPECTED_MODULE_COUNT} módulos, se encontraron ${modules.length}.`,
    );
  }
  const seen = new Set<string>();
  for (const m of modules) {
    if (!m.id || seen.has(m.id)) {
      throw new Error(`CiudadBots: id de módulo inválido o duplicado: "${m.id}".`);
    }
    seen.add(m.id);
    if (!m.title.trim()) {
      throw new Error(`CiudadBots: el módulo "${m.id}" no tiene título.`);
    }
    if (m.phases.length !== 4) {
      throw new Error(
        `CiudadBots: el módulo "${m.id}" debe tener 4 fases, tiene ${m.phases.length}.`,
      );
    }
  }
})();
