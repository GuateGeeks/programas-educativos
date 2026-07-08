import React from 'react';
import Layout from '@theme/Layout';
import {getModule} from '@site/src/data/ciudadbots';
import BuildGuide from '@site/src/components/BuildGuide';
import styles from './styles.module.css';

const ROLES = [
  {
    name: 'Constructor',
    desc: 'Arma el robot con base en la imagen del paso y confirma que la estructura coincida antes de avanzar.',
  },
  {
    name: 'Organizador',
    desc: 'Ordena piezas, cuida el material y verifica que el equipo complete cada paso con calma y claridad.',
  },
  {
    name: 'Programador',
    desc: 'Cuando llegue el momento, abre el programa base, sigue las instrucciones del equipo y explica el comportamiento del robot.',
  },
];

/**
 * Student build view — a stripped, shareable route (/estudiante) showing only
 * the visual construction guide and team roles. No downloads, no progress
 * tracker, no rubric. Currently serves the Trazamapas Chapín build (the only
 * module with a visual guide today).
 */
export default function EstudiantePage(): JSX.Element {
  const module = getModule('m1');
  const guide = module.guide;

  return (
    <Layout
      title="Modo estudiante · Trazamapas Chapín"
      description="Guía visual de construcción paso a paso para estudiantes.">
      <main className={styles.shell}>
        <section className={styles.hero}>
          <div className={styles.eyebrow}>GuateGeeks · CiudadBots Guatemala · Modo estudiante</div>
          <h1 className={styles.title}>{module.title}</h1>
          <p className={styles.lead}>
            Esta guía les permite avanzar paso a paso en la construcción del robot junto a su equipo.
            Usen los roles, conversen cada decisión y roten responsabilidades para que todos exploren
            una forma distinta de trabajar.
          </p>
          <div className={styles.roles}>
            {ROLES.map((r) => (
              <div className={styles.role} key={r.name}>
                <strong>{r.name}</strong>
                <p>{r.desc}</p>
              </div>
            ))}
          </div>
          <p className={styles.rolesNote}>
            Sugerencia: roten de rol cada cierto número de pasos para que todos vivan una
            responsabilidad distinta.
          </p>
        </section>

        <section className={styles.guideSection}>
          {guide ? (
            <BuildGuide guide={guide} />
          ) : (
            <p>La guía visual de este módulo aún no está disponible.</p>
          )}
          <p className={styles.tip}>
            Antes de avanzar, comparen el robot físico con la imagen. Si algo no coincide, deténganse,
            ajusten y luego sigan con el siguiente paso.
          </p>
        </section>
      </main>
    </Layout>
  );
}
