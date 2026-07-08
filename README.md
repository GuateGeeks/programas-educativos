# programas-educativos

GuateGeeks — hub de programas educativos, construido con [Docusaurus](https://docusaurus.io/).

El sitio está estructurado como un **hub**: cada programa vive bajo su propio espacio de rutas.
El primer programa es **CiudadBots Guatemala** (12 módulos de robótica LEGO SPIKE para Ciclo
Básico), servido bajo `/ciudadbots/*`, con un **modo estudiante** en `/estudiante`.

## Requisitos

- Node.js ≥ 18 (probado con Node 24).

## Comandos

```bash
npm install       # instalar dependencias
npm run start     # servidor de desarrollo (http://localhost:3000)
npm run build     # build de producción estático en build/ (es + en)
npm run serve     # servir el build localmente
npm run typecheck # verificación de tipos
```

## Estructura

```
docs/                     Contenido CiudadBots (MDX) → /ciudadbots/*
  overview.mdx            Vista general del programa (/ciudadbots/)
  NN-slug.mdx             Un módulo por archivo, embebe <Module id="mN" />
src/
  data/ciudadbots/        Modelo de datos tipado de los 12 módulos
  components/
    Module/               Render reutilizable de campos estructurados
    BuildGuide/           Visor de construcción paginado + lightbox
    ProgressTracker/      Seguimiento docente (localStorage)
    CityBotsHero/         Escena 3D (three.js, solo cliente)
  pages/
    index.tsx             Landing del hub (/)
    estudiante/           Modo estudiante (/estudiante)
static/assets/ciudadbots/ Programas .llsp, guía de construcción, PDF
```

## Contenido

Los 12 módulos se editan en dos lugares:

- **Estructura** (conceptos, fases, CNB, estándares, rúbrica, programa): `src/data/ciudadbots/modules.ts`.
- **Narrativa** (pregunta motora, contexto, notas): el archivo MDX de cada módulo en `docs/`.

## Internacionalización

Español (`es`) es el idioma por defecto; inglés (`en`) está configurado y usa el contenido en
español como respaldo hasta que se agreguen traducciones (`npm run write-translations`).
