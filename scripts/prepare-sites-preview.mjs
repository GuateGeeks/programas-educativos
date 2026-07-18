import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const buildDir = path.join(root, 'build');
const distDir = path.join(root, 'dist');
const hostingFile = path.join(root, '.openai', 'hosting.json');

fs.rmSync(distDir, {recursive: true, force: true});
fs.cpSync(buildDir, distDir, {recursive: true});

fs.mkdirSync(path.join(distDir, '.openai'), {recursive: true});
fs.copyFileSync(hostingFile, path.join(distDir, '.openai', 'hosting.json'));

fs.mkdirSync(path.join(distDir, 'server'), {recursive: true});
fs.writeFileSync(
  path.join(distDir, 'server', 'index.js'),
  `export default {
  async fetch(request, env) {
    if (env && env.ASSETS && typeof env.ASSETS.fetch === 'function') {
      return env.ASSETS.fetch(request);
    }

    return new Response('Static asset binding is unavailable.', {status: 500});
  },
};
`,
);
