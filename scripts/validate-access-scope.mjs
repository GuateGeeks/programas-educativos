import fs from 'node:fs';

const source = fs.readFileSync(new URL('../src/data/accessControl.ts', import.meta.url), 'utf8');
const requiredRoutes = [
  '/ciudadbots/',
  '/ciudadbots/robot-cartografo/',
  '/ciudadbots/robot-de-entregas/',
  '/ciudadbots/montacargas/',
  '/ciudadbots/showcase/',
  '/ciudadbots/cobertura/',
];
const missing = requiredRoutes.filter((route) => !source.includes(`'${route}'`));
if (missing.length) {
  console.error(`Missing demo routes: ${missing.join(', ')}`);
  process.exit(1);
}
if (!source.includes("profile: 'demo'") || !source.includes("profile: 'authorized'")) {
  console.error('Access profiles are incomplete.');
  process.exit(1);
}
console.log('Access scope validation passed.');
