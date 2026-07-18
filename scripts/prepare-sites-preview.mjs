import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const buildDir = path.join(root, 'build');
const distDir = path.join(root, 'dist');
const hostingFile = path.join(root, '.openai', 'hosting.json');
const cssPath = path.join(buildDir, 'assets', 'css');

fs.rmSync(distDir, {recursive: true, force: true});
fs.cpSync(buildDir, distDir, {recursive: true});

fs.mkdirSync(path.join(distDir, '.openai'), {recursive: true});
fs.copyFileSync(hostingFile, path.join(distDir, '.openai', 'hosting.json'));

const cssFile = fs.readdirSync(cssPath).find((file) => file.endsWith('.css'));
const css = cssFile ? fs.readFileSync(path.join(cssPath, cssFile), 'utf8') : '';

function page(filePath) {
  let html = fs.readFileSync(path.join(buildDir, filePath), 'utf8');
  html = html.replace(/<link rel="stylesheet" href="[^"]+">/g, `<style>${css}</style>`);
  html = html.replace(/<script[\s\S]*?<\/script>/g, '');
  return html;
}

function binaryAsset(filePath, contentType) {
  return {
    contentType,
    body: fs.readFileSync(path.join(root, 'static', filePath)).toString('base64'),
  };
}

const pages = {
  '/': page('index.html'),
  '/programas-educativos/': page('index.html'),
  '/ciudadbots/': page('ciudadbots/index.html'),
  '/programas-educativos/ciudadbots/': page('ciudadbots/index.html'),
  '/estudiante/': page('estudiante/index.html'),
  '/programas-educativos/estudiante/': page('estudiante/index.html'),
  '/en/': page('en/index.html'),
  '/programas-educativos/en/': page('en/index.html'),
};

const assets = {
  '/img/guategeeks-logo.png': binaryAsset('img/guategeeks-logo.png', 'image/png'),
  '/programas-educativos/img/guategeeks-logo.png': binaryAsset('img/guategeeks-logo.png', 'image/png'),
  '/img/favicon.ico': binaryAsset('img/favicon.ico', 'image/x-icon'),
  '/programas-educativos/img/favicon.ico': binaryAsset('img/favicon.ico', 'image/x-icon'),
  '/img/social-card.png': binaryAsset('img/social-card.png', 'image/png'),
  '/programas-educativos/img/social-card.png': binaryAsset('img/social-card.png', 'image/png'),
};

fs.mkdirSync(path.join(distDir, 'server'), {recursive: true});
fs.writeFileSync(
  path.join(distDir, 'server', 'index.js'),
  `const pages = ${JSON.stringify(pages)};
const assets = ${JSON.stringify(assets)};

function decodeBase64(value) {
  const raw = atob(value);
  const bytes = new Uint8Array(raw.length);
  for (let index = 0; index < raw.length; index += 1) {
    bytes[index] = raw.charCodeAt(index);
  }
  return bytes;
}

const app = {
  async fetch(request, env) {
    const url = new URL(request.url);
    let pathname = url.pathname;

    if (!pathname.endsWith('/') && pages[pathname + '/']) {
      pathname += '/';
    }

    if (pages[pathname]) {
      return new Response(request.method === 'HEAD' ? null : pages[pathname], {
        headers: {'content-type': 'text/html; charset=utf-8'},
      });
    }

    if (assets[pathname]) {
      const asset = assets[pathname];
      return new Response(request.method === 'HEAD' ? null : decodeBase64(asset.body), {
        headers: {'content-type': asset.contentType},
      });
    }

    if (env && env.ASSETS && typeof env.ASSETS.fetch === 'function') {
      return env.ASSETS.fetch(request);
    }

    return new Response('Not found', {status: 404});
  },
};

export default app;
`,
);
