import React from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Translate from '@docusaurus/Translate';
import styles from './index.module.css';

type Program = {
  name: string;
  href?: string;
  available?: boolean;
};

type LearningLevel = {
  kicker: React.ReactNode;
  name: React.ReactNode;
  description: React.ReactNode;
  programs: readonly Program[];
  accent: string;
};

const levels: readonly LearningLevel[] = [
  {
    kicker: <Translate id="platform.level.explorador.kicker">Descubrir y probar</Translate>,
    name: <Translate id="platform.level.explorador.name">Explorador</Translate>,
    description: (
      <Translate id="platform.level.explorador.description">
        Primer contacto con tecnología creativa: circuitos, narrativas con robots y experiencias
        aumentadas para aprender haciendo antes de programar proyectos complejos.
      </Translate>
    ),
    accent: 'sky',
    programs: [
      {name: 'Circuitos en Acción'},
      {name: 'Rutas con Tale-Bot'},
      {name: 'Mundo Aumentado'},
    ],
  },
  {
    kicker: <Translate id="platform.level.constructor.kicker">Diseñar y programar</Translate>,
    name: <Translate id="platform.level.constructor.name">Constructor</Translate>,
    description: (
      <Translate id="platform.level.constructor.description">
        Programas donde el equipo convierte ideas en máquinas: estructura, sensores, código,
        pruebas y mejora iterativa conectada con retos reales.
      </Translate>
    ),
    accent: 'coral',
    programs: [
      {name: 'CiudadBots Guatemala', href: '/ciudadbots', available: true},
      {name: 'GuateGeeks SMARS', href: '/guategeeks', available: true},
      {name: 'Rescate Makerzoid'},
      {name: 'Expediciones VR'},
    ],
  },
  {
    kicker: <Translate id="platform.level.creador.kicker">Prototipar y comunicar</Translate>,
    name: <Translate id="platform.level.creador.name">Creador</Translate>,
    description: (
      <Translate id="platform.level.creador.description">
        Rutas para construir artefactos propios: pantallas, wearables, IA creativa y fabricación
        digital con documentación, iteración y presentación pública.
      </Translate>
    ),
    accent: 'plum',
    programs: [
      {name: 'Tiempo Circular'},
      {name: 'SmartLab Wearables'},
      {name: 'Estudio IA Creativa'},
      {name: 'FabLab 3D'},
    ],
  },
];

function ProgramCard({program}: {program: Program}): React.JSX.Element {
  if (program.href) {
    return (
      <Link className={styles.programCard} to={program.href}>
        <span className={styles.programDot} aria-hidden="true" />
        <span className={styles.programName}>{program.name}</span>
        {program.available && <span className={styles.programStatus}>Disponible</span>}
      </Link>
    );
  }

  return (
    <div className={`${styles.programCard} ${styles.programCardUpcoming}`} aria-disabled="true">
      <span className={styles.programDot} aria-hidden="true" />
      <span className={styles.programName}>{program.name}</span>
      <span className={styles.programStatus}>Próximamente</span>
    </div>
  );
}

function LevelSection({level, index}: {level: LearningLevel; index: number}): React.JSX.Element {
  return (
    <section className={`${styles.level} ${styles[`level-${level.accent}`]}`}>
      <div className={styles.levelIntro}>
        <span className={styles.levelNumber}>0{index + 1}</span>
        <div>
          <p className={styles.levelKicker}>{level.kicker}</p>
          <h2>{level.name}</h2>
          <p className={styles.levelDescription}>{level.description}</p>
        </div>
      </div>
      <div className={styles.programList}>
        {level.programs.map((program) => (
          <ProgramCard key={program.name} program={program} />
        ))}
      </div>
    </section>
  );
}

export default function Home(): React.JSX.Element {
  return (
    <Layout
      title="Programas Educativos"
      description="Programas educativos GuateGeeks por niveles de aprendizaje.">
      <main className={styles.shell}>
        <header className={styles.header}>
          <p className={styles.eyebrow}>GuateGeeks · Programas Educativos</p>
          <h1>Programas Educativos</h1>
        </header>

        <div className={styles.levels}>
          {levels.map((level, index) => (
            <LevelSection key={index} level={level} index={index} />
          ))}
        </div>
      </main>
    </Layout>
  );
}
