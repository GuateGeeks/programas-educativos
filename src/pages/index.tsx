import React from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Translate, {translate} from '@docusaurus/Translate';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './index.module.css';

/**
 * Hub landing page. GuateGeeks is a hub of educational programs; CiudadBots,
 * GuateGeeks SMARS and Tiempo Circular are the current three. Each card states
 * the grade its program targets, so a teacher can pick between them. Future
 * programs get their own card here without changing existing program routes.
 */
export default function Home(): React.JSX.Element {
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
              Un hub de programas educativos para el Ciclo Básico: robótica con bloques, robótica
              con Arduino y pantallas programables. Cada programa declara el grado que atiende y
              reúne su secuencia docente, recursos, alineación curricular y evaluación en un solo
              lugar.
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
                <Translate id="ciudadbots.home.cicloBasicoBadge">1.º a 3.º básico</Translate>
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

            <Link className={styles.card} to="/guategeeks">
              <span className={styles.badge}>
                <Translate id="guategeeks.home.terceroBadge">Tercero Básico</Translate>
              </span>
              <h3>GuateGeeks SMARS</h3>
              <p>
                <Translate id="guategeeks.home.smarsCardBody">
                  12 sesiones para construir un robot de orugas autónomo con Arduino puro: dos
                  motores, sensor ultrasónico y máquina de estados. Incluye guía docente, cinco
                  sketches verificados y rúbrica. Material disponible en español.
                </Translate>
              </p>
              <span className={styles.cardLink}>
                <Translate id="ciudadbots.home.viewProgram">Ver programa →</Translate>
              </span>
            </Link>

            <Link className={styles.card} to="/tiempo-circular">
              <span className={styles.badge}>
                <Translate id="tiempocircular.home.segundoBadge">Segundo Básico</Translate>
              </span>
              <h3>Tiempo Circular</h3>
              <p>
                <Translate id="tiempocircular.home.cardBody">
                  12 sesiones para construir un reloj sobre una pantalla circular con ESP32. La
                  trigonometría coloca las manecillas, el color se arma bit por bit y la carátula
                  final cuenta los ciclos del Cholq'ij. Material disponible en español.
                </Translate>
              </p>
              <span className={styles.cardLink}>
                <Translate id="ciudadbots.home.viewProgram">Ver programa →</Translate>
              </span>
            </Link>
          </div>
        </section>
      </main>
    </Layout>
  );
}
