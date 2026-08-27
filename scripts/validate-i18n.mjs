import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const translationsPath = path.join(root, 'i18n/en/code.json');
const translations = JSON.parse(fs.readFileSync(translationsPath, 'utf8'));
const missing = Object.entries(translations).filter(([, value]) => !value || typeof value.message !== 'string' || !value.message.trim());
if (missing.length) {
  console.error(`Missing English translation messages: ${missing.map(([key]) => key).join(', ')}`);
  process.exit(1);
}

const localeFiles = [
  path.join(root, 'src/components/AccessControl/index.tsx'),
  path.join(root, 'src/components/Module/index.tsx'),
  path.join(root, 'src/components/TeacherSessionPlan/index.tsx'),
  path.join(root, 'src/components/GradeEvaluation/index.tsx'),
  path.join(root, 'src/theme/Footer/index.tsx'),
];
const absent = localeFiles.filter((file) => !fs.existsSync(file));
if (absent.length) {
  console.error(`Missing localized surface: ${absent.map((file) => path.relative(root, file)).join(', ')}`);
  process.exit(1);
}

const englishDocs = path.join(root, 'i18n/en/docusaurus-plugin-content-docs/current');
const requiredModules = Array.from({length: 12}, (_, index) => `${String(index + 1).padStart(2, '0')}-`);
const englishModuleFiles = fs.readdirSync(path.join(englishDocs, 'ciudadbots'));
const missingModules = requiredModules.filter((prefix) => !englishModuleFiles.some((file) => file.startsWith(prefix)));
if (missingModules.length) {
  console.error(`Missing English CiudadBots module files: ${missingModules.join(', ')}`);
  process.exit(1);
}

console.log(`i18n validation passed: ${Object.keys(translations).length} English UI messages and ${englishModuleFiles.length} English CiudadBots documents found.`);
