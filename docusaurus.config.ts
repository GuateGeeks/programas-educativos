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

  presets: [
    [
      'classic',
      {
        docs: {
          path: 'docs',
          // Program namespace: all docs content is served under /ciudadbots/*.
          routeBasePath: 'ciudadbots',
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
      title: 'GuateGeeks',
      logo: {
        alt: 'GuateGeeks',
        src: 'img/guategeeks-logo.png',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'ciudadbotsSidebar',
          position: 'left',
          label: 'CiudadBots',
        },
        {to: '/estudiante', label: 'Modo estudiante', position: 'left'},
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
          title: 'Programa',
          items: [
            {label: 'CiudadBots Guatemala', to: '/ciudadbots'},
            {label: 'Modo estudiante', to: '/estudiante'},
          ],
        },
        {
          title: 'Marco curricular',
          items: [
            {label: 'CNB Ciclo Básico', href: 'https://cnbguatemala.org/wiki/CNB_Ciclo_B%C3%A1sico'},
            {label: 'ISTE Standards', href: 'https://iste.org/standards/students'},
            {label: 'CSTA K-12', href: 'https://csteachers.org/k12standards/'},
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
