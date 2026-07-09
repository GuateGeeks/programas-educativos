import React from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Translate, {translate} from '@docusaurus/Translate';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './index.module.css';

/**
 * Hub landing page. GuateGeeks is a hub of educational programs; CiudadBots is
 * the first. Future programs get their own card here without changing existing
 * program routes.
 */
export default function Home(): JSX.Element {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={translate({id: 'ciudadbots.home.pageTitle', message: 'Programas Educativos'})}
      description={siteConfig.tagline}>
      <main className={styles.shell}>
        <section className={styles.hero}>
          <div className={styles.eyebrow}>GuateGeeks · Programas Educativos</div>
          <h1 className={styles.title}>
            <Translate id="ciudadbots.home.title">
              Robótica aplicada y ciudadanía tecnológica para Guatemala
            </Translate>
          </h1>
          <p className={styles.lead}>
            <Translate id="ciudadbots.home.lead">
              Un hub de programas educativos con retos de ingeniería urbana. Cada programa reúne
              su secuencia docente, recursos por módulo, alineación curricular y evaluación en un
              solo lugar.
            </Translate>
          </p>
          <div className={styles.actions}>
            <Link className={styles.primary} to="/ciudadbots">
              <Translate id="ciudadbots.home.exploreLink">Explorar CiudadBots</Translate>
            </Link>
            <Link className={styles.secondary} to="/estudiante">
              <Translate id="ciudadbots.home.studentModeLink">Modo estudiante</Translate>
            </Link>
          </div>
        </section>

        <section className={styles.programs}>
          <h2 className={styles.programsTitle}>
            <Translate id="ciudadbots.home.programsTitle">Programas</Translate>
          </h2>
          <div className={styles.grid}>
            <Link className={styles.card} to="/ciudadbots">
              <span className={styles.badge}>
                <Translate id="ciudadbots.home.cicloBasicoBadge">Ciclo Básico</Translate>
              </span>
              <h3>CiudadBots Guatemala</h3>
              <p>
                <Translate id="ciudadbots.home.ciudadbotsCardBody">
                  12 misiones de robótica LEGO SPIKE con retos de ciudad: cartografía, entrega,
                  logística, infraestructura, emergencia y más. Incluye guía docente, programas
                  base y rúbricas.
                </Translate>
              </p>
              <span className={styles.cardLink}>
                <Translate id="ciudadbots.home.viewProgram">Ver programa →</Translate>
              </span>
            </Link>

            <div className={`${styles.card} ${styles.cardPlaceholder}`}>
              <span className={styles.badge}>
                <Translate id="ciudadbots.home.comingSoonBadge">Próximamente</Translate>
              </span>
              <h3>
                <Translate id="ciudadbots.home.newProgramsTitle">Nuevos programas</Translate>
              </h3>
              <p>
                <Translate id="ciudadbots.home.newProgramsBody">
                  Este hub está diseñado para crecer. Los próximos programas educativos de
                  GuateGeeks aparecerán aquí, con su propia ruta y recursos.
                </Translate>
              </p>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
