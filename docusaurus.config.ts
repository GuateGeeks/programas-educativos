import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// GuateGeeks — hub de programas educativos.
// The site is structured as a hub: each program lives under its own route
// namespace (CiudadBots is the first, served under /ciudadbots/*). Adding a
// future program means adding another docs folder/instance without moving
// existing routes.
const config: Config = {
  title: 'GuateGeeks · Programas Educativos',
  tagline: 'Robótica aplicada y ciudadanía tecnológica para Guatemala',
  favicon: 'img/favicon.ico',

  // Served at https://guategeeks.com/programas-educativos/ — the org user-pages
  // repo (guategeeks.github.io) owns the guategeeks.com custom domain and GitHub
  // propagates it to project repos, so no per-repo CNAME is needed here.
  url: 'https://guategeeks.com',
  baseUrl: '/programas-educativos/',
  // true so the docs overview at /ciudadbots/ resolves its `./slug` relative
  // links as children (…/ciudadbots/slug/) rather than siblings under baseUrl.
  trailingSlash: true,

  organizationName: 'GuateGeeks',
  projectName: 'programas-educativos',

  onBrokenLinks: 'throw',

  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },

  // Bilingual: Spanish is the source/default locale; English is available and
  // falls back to Spanish content until translations are authored.
  i18n: {
    defaultLocale: 'es',
    locales: ['es', 'en'],
    localeConfigs: {
      es: {label: 'Español'},
      en: {label: 'English'},
    },
  },

  plugins: [
    // Lets MDX import an Arduino sketch as a raw string:
    //   import code from '@site/arduino/guategeeks/<dir>/<dir>.ino';
    // webpack 5's built-in `asset/source` does this without any extra
    // dependency (raw-loader is not installed, and asset/source supersedes it).
    //
    // This is what keeps the code shown on a session page and the file a
    // student downloads from ever diverging: both come from this one import,
    // so the .ino under arduino/guategeeks/ stays the single editable source.
    // See design decision D11.
    function arduinoSketchRawImport() {
      return {
        name: 'guategeeks-arduino-sketch-raw-import',
        configureWebpack() {
          return {
            module: {
              rules: [{test: /\.ino$/i, type: 'asset/source' as const}],
            },
          };
        },
      };
    },
  ],

  presets: [
    [
      'classic',
      {
        docs: {
          path: 'docs',
          // Docs are served from the site root; each program owns a
          // subdirectory of docs/ that supplies its URL segment, e.g.
          // docs/ciudadbots/mapper-bot.mdx -> /ciudadbots/mapper-bot.
          routeBasePath: '/',
          sidebarPath: './sidebars.ts',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/social-card.png',
    colorMode: {
      defaultMode: 'light',
      respectPrefersColorScheme: true,
    },
    navbar: {
      logo: {
        alt: 'GuateGeeks',
        src: 'img/guategeeks-logo.png',
      },
      items: [
        {
          type: 'localeDropdown',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Programas',
          items: [
            {label: 'CiudadBots Guatemala', to: '/ciudadbots'},
            {label: 'GuateGeeks SMARS', to: '/guategeeks'},
            {label: 'Tiempo Circular', to: '/tiempo-circular'},
            {label: 'Modo estudiante', to: '/estudiante'},
          ],
        },
        {
          title: 'Marco curricular',
          items: [
            {label: 'CNB Ciclo Básico', href: 'https://cnbguatemala.org/wiki/CNB_Ciclo_B%C3%A1sico'},
            {label: 'ISTE Standards', href: 'https://iste.org/standards/students'},
            {label: 'CSTA 2026 PK-12', href: 'https://csteachers.org/pk12standards/view/'},
          ],
        },
      ],
      copyright: `© ${'2026'} GuateGeeks · Programas Educativos.`,
    },
    docs: {
      sidebar: {
        hideable: true,
      },
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
