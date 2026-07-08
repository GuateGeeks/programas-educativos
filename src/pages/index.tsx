import React from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
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
    <Layout title="Programas Educativos" description={siteConfig.tagline}>
      <main className={styles.shell}>
        <section className={styles.hero}>
          <div className={styles.eyebrow}>GuateGeeks · Programas Educativos</div>
          <h1 className={styles.title}>Robótica aplicada y ciudadanía tecnológica para Guatemala</h1>
          <p className={styles.lead}>
            Un hub de programas educativos con retos cercanos al contexto guatemalteco. Cada programa
            reúne su secuencia docente, recursos por módulo, alineación curricular y evaluación en un
            solo lugar.
          </p>
          <div className={styles.actions}>
            <Link className={styles.primary} to="/ciudadbots">
              Explorar CiudadBots
            </Link>
            <Link className={styles.secondary} to="/estudiante">
              Modo estudiante
            </Link>
          </div>
        </section>

        <section className={styles.programs}>
          <h2 className={styles.programsTitle}>Programas</h2>
          <div className={styles.grid}>
            <Link className={styles.card} to="/ciudadbots">
              <span className={styles.badge}>Ciclo Básico</span>
              <h3>CiudadBots Guatemala</h3>
              <p>
                12 misiones de robótica LEGO SPIKE con retos de ciudad: cartografía, entrega,
                logística, infraestructura, emergencia y más. Incluye guía docente, programas base y
                rúbricas.
              </p>
              <span className={styles.cardLink}>Ver programa →</span>
            </Link>

            <div className={`${styles.card} ${styles.cardPlaceholder}`}>
              <span className={styles.badge}>Próximamente</span>
              <h3>Nuevos programas</h3>
              <p>
                Este hub está diseñado para crecer. Los próximos programas educativos de GuateGeeks
                aparecerán aquí, con su propia ruta y recursos.
              </p>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
