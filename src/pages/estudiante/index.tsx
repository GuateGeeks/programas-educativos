import React from 'react';
import Layout from '@theme/Layout';
import Translate, {translate} from '@docusaurus/Translate';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import {getModule, getModuleTitle} from '@site/src/data/ciudadbots';
import BuildGuide from '@site/src/components/BuildGuide';
import styles from './styles.module.css';

const STUDENT_MODULE_ID = 'm1';

/**
 * Student build view — a stripped, shareable route (/estudiante) showing only
 * the visual construction guide and team roles. No downloads, no progress
 * tracker, no rubric. Currently serves the Mapper Bot build (the only module
 * with a visual guide today).
 */
export default function EstudiantePage(): JSX.Element {
  const {i18n} = useDocusaurusContext();
  const module = getModule(STUDENT_MODULE_ID);
  const title = getModuleTitle(STUDENT_MODULE_ID, i18n.currentLocale);
  const guide = module.guide;

  const ROLES = [
    {
      name: translate({id: 'ciudadbots.estudiante.roles.builder.name', message: 'Constructor'}),
      desc: translate({
        id: 'ciudadbots.estudiante.roles.builder.desc',
        message:
          'Arma el robot con base en la imagen del paso y confirma que la estructura coincida antes de avanzar.',
      }),
    },
    {
      name: translate({id: 'ciudadbots.estudiante.roles.organizer.name', message: 'Organizador'}),
      desc: translate({
        id: 'ciudadbots.estudiante.roles.organizer.desc',
        message: 'Ordena piezas, cuida el material y verifica que el equipo complete cada paso con calma y claridad.',
      }),
    },
    {
      name: translate({id: 'ciudadbots.estudiante.roles.programmer.name', message: 'Programador'}),
      desc: translate({
        id: 'ciudadbots.estudiante.roles.programmer.desc',
        message:
          'Cuando llegue el momento, abre el programa base, sigue las instrucciones del equipo y explica el comportamiento del robot.',
      }),
    },
  ];

  return (
    <Layout
      title={translate(
        {id: 'ciudadbots.estudiante.pageTitle', message: 'Modo estudiante · {title}'},
        {title},
      )}
      description={translate({
        id: 'ciudadbots.estudiante.pageDescription',
        message: 'Guía visual de construcción paso a paso para estudiantes.',
      })}>
      <main className={styles.shell}>
        <section className={styles.hero}>
          <div className={styles.eyebrow}>
            <Translate id="ciudadbots.estudiante.eyebrow">GuateGeeks · CiudadBots · Modo estudiante</Translate>
          </div>
          <h1 className={styles.title}>{title}</h1>
          <p className={styles.lead}>
            <Translate id="ciudadbots.estudiante.lead">
              Esta guía les permite avanzar paso a paso en la construcción del robot junto a su
              equipo. Usen los roles, conversen cada decisión y roten responsabilidades para que
              todos exploren una forma distinta de trabajar.
            </Translate>
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
            <Translate id="ciudadbots.estudiante.rolesNote">
              Sugerencia: roten de rol cada cierto número de pasos para que todos vivan una
              responsabilidad distinta.
            </Translate>
          </p>
        </section>

        <section className={styles.guideSection}>
          {guide ? (
            <BuildGuide guide={guide} title={title} />
          ) : (
            <p>
              <Translate id="ciudadbots.estudiante.guideUnavailable">
                La guía visual de este módulo aún no está disponible.
              </Translate>
            </p>
          )}
          <p className={styles.tip}>
            <Translate id="ciudadbots.estudiante.tip">
              Antes de avanzar, comparen el robot físico con la imagen. Si algo no coincide,
              deténganse, ajusten y luego sigan con el siguiente paso.
            </Translate>
          </p>
        </section>
      </main>
    </Layout>
  );
}
