// Minimal locale-keyed session title index, mirroring the CiudadBots pattern.
// Each session's own title lives in its per-locale MDX frontmatter — but a few
// surfaces need every session's display name in aggregate, outside that
// session's own render tree, where neither MDX children nor Docusaurus's
// useDoc() can reach. Title strings only, nothing narrative.
//
// GuateGeeks ships in Spanish only (see design decision D10), so the `en` map
// intentionally carries the Spanish titles: an English-locale visitor sees the
// same names the material uses, rather than invented translations for pages
// that do not exist in English.

export type Locale = 'es' | 'en';

const es: Record<string, string> = {
  s1: 'Sistemas del robot',
  s2: 'Seguridad y energía',
  s3: 'Slicer y tolerancias',
  s4: 'Impresión y control de calidad',
  s5: 'Ensamblaje de orugas',
  s6: 'Botones y buzzer',
  s7: 'Dos motores y dirección',
  s8: 'Sensor ultrasónico',
  s9: 'Lectura de código y máquina de estados',
  s10: 'Integración autónoma',
  s11: 'Calibración',
  s12: 'Reto integrador y presentación',
};

export const sessionTitles: Record<Locale, Record<string, string>> = {
  es,
  en: es,
};
