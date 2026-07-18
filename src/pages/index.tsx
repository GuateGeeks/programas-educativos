import React from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Translate, {translate} from '@docusaurus/Translate';
import styles from './index.module.css';

const contactHref = 'mailto:info@guategeeks.com?subject=Demo%20GuateGeeks%20Programas%20Educativos';

export default function Home() {
  return (
    <Layout
      title={translate({id: 'ciudadbots.home.pageTitle', message: 'Programas Educativos'})}
      description={translate({
        id: 'ciudadbots.home.description',
        message:
          'Programas de tecnologia aplicada listos para implementar en instituciones educativas.',
      })}>
      <main className={styles.shell}>
        <section className={styles.hero}>
          <div className={styles.heroCopy}>
            <div className={styles.eyebrow}>
              <Translate id="ciudadbots.home.eyebrow">GuateGeeks - Programas Educativos</Translate>
            </div>
            <h1 className={styles.title}>
              <Translate id="ciudadbots.home.title">
                Programas de tecnologia aplicada listos para implementar en el aula
              </Translate>
            </h1>
            <p className={styles.lead}>
              <Translate id="ciudadbots.home.lead">
                Ayudamos a instituciones educativas a convertir tecnologia emergente en aprendizaje
                visible: contenido listo, guia docente, vista estudiante, evidencia, showcase y
                equipo fisico opcional.
              </Translate>
            </p>
            <div className={styles.actions}>
              <a className={styles.primary} href={contactHref}>
                <Translate id="ciudadbots.home.requestDemo">Solicitar demo</Translate>
              </a>
              <Link className={styles.secondary} to="/ciudadbots/">
                <Translate id="ciudadbots.home.exploreLink">Explorar CiudadBots</Translate>
              </Link>
            </div>
          </div>
          <div className={styles.heroPanel} aria-label={translate({id: 'ciudadbots.home.heroPanelLabel', message: 'Resumen de valor GuateGeeks'})}>
            <div className={styles.panelMetric}>
              <strong>12</strong>
              <span>
                <Translate id="ciudadbots.home.metricMissions">misiones CiudadBots</Translate>
              </span>
            </div>
            <div className={styles.panelMetric}>
              <strong>3</strong>
              <span>
                <Translate id="ciudadbots.home.metricPathways">niveles de crecimiento</Translate>
              </span>
            </div>
            <div className={styles.panelMetric}>
              <strong>
                <Translate id="ciudadbots.home.metricEvidenceValue">Evidencia</Translate>
              </strong>
              <span>
                <Translate id="ciudadbots.home.metricEvidence">para direccion y familias</Translate>
              </span>
            </div>
          </div>
        </section>

        <section className={styles.promise}>
          <div>
            <span className={styles.sectionKicker}>
              <Translate id="ciudadbots.home.promiseKicker">El problema real</Translate>
            </span>
            <h2>
              <Translate id="ciudadbots.home.promiseTitle">
                La innovacion educativa no se sostiene solo comprando equipo
              </Translate>
            </h2>
          </div>
          <div className={styles.promiseGrid}>
            <div>
              <h3>
                <Translate id="ciudadbots.home.promiseSchoolsTitle">Las instituciones quieren diferenciarse</Translate>
              </h3>
              <p>
                <Translate id="ciudadbots.home.promiseSchoolsBody">
                  Necesitan programas visibles, modernos y defendibles frente a familias, aliados y
                  comunidad educativa.
                </Translate>
              </p>
            </div>
            <div>
              <h3>
                <Translate id="ciudadbots.home.promiseTeachersTitle">Los docentes necesitan estructura</Translate>
              </h3>
              <p>
                <Translate id="ciudadbots.home.promiseTeachersBody">
                  No basta con entregar kits. Hace falta una ruta clara, recursos listos y soporte
                  para implementar sin sobrecarga.
                </Translate>
              </p>
            </div>
            <div>
              <h3>
                <Translate id="ciudadbots.home.promiseLeadersTitle">La direccion necesita evidencia</Translate>
              </h3>
              <p>
                <Translate id="ciudadbots.home.promiseLeadersBody">
                  Cada ciclo debe terminar con productos, rubricas, aprendizajes visibles y una
                  recomendacion de siguiente paso.
                </Translate>
              </p>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionKicker}>
              <Translate id="ciudadbots.home.ladderKicker">Ruta GuateGeeks</Translate>
            </span>
            <h2>
              <Translate id="ciudadbots.home.ladderTitle">
                Tres niveles para empezar pequeno y crecer con evidencia
              </Translate>
            </h2>
          </div>
          <div className={styles.pathwayGrid}>
            <article className={styles.pathwayCard}>
              <span className={styles.statusBadge}>
                <Translate id="ciudadbots.home.exploradoresStatus">Concepto validable</Translate>
              </span>
              <h3>
                <Translate id="ciudadbots.home.exploradoresTitle">Exploradores</Translate>
              </h3>
              <p>
                <Translate id="ciudadbots.home.exploradoresBody">
                  Primer contacto con tecnologia aplicada para colegios que quieren probar con bajo
                  riesgo: experiencias cortas, retos simples y evidencia inicial.
                </Translate>
              </p>
            </article>
            <article className={`${styles.pathwayCard} ${styles.pathwayFeatured}`}>
              <span className={styles.statusBadge}>
                <Translate id="ciudadbots.home.constructoresStatus">Producto ancla disponible</Translate>
              </span>
              <h3>
                <Translate id="ciudadbots.home.constructoresTitle">Constructores</Translate>
              </h3>
              <p>
                <Translate id="ciudadbots.home.constructoresBody">
                  Programas estructurados donde los estudiantes construyen, programan, prueban y
                  explican soluciones. CiudadBots vive aqui.
                </Translate>
              </p>
            </article>
            <article className={styles.pathwayCard}>
              <span className={styles.statusBadge}>
                <Translate id="ciudadbots.home.creadoresStatus">Ruta avanzada futura</Translate>
              </span>
              <h3>
                <Translate id="ciudadbots.home.creadoresTitle">Creadores</Translate>
              </h3>
              <p>
                <Translate id="ciudadbots.home.creadoresBody">
                  Nivel premium para proyectos propios con impacto: prototipos, documentacion,
                  presentacion publica y conexion con necesidades reales.
                </Translate>
              </p>
            </article>
          </div>
        </section>

        <section className={`${styles.section} ${styles.featuredProduct}`}>
          <div>
            <span className={styles.sectionKicker}>
              <Translate id="ciudadbots.home.featuredKicker">Producto destacado</Translate>
            </span>
            <h2>CiudadBots Guatemala</h2>
            <p>
              <Translate id="ciudadbots.home.featuredBody">
                Un programa de robotica aplicada para Ciclo Basico con 12 misiones urbanas:
                cartografia, entregas, logistica, infraestructura, elevadores, rescate y mas. Incluye
                guia docente, vista estudiante, programas base, rubricas y showcase final.
              </Translate>
            </p>
            <div className={styles.actions}>
              <Link className={styles.primary} to="/ciudadbots/">
                <Translate id="ciudadbots.home.viewTeacherGuide">Ver guia docente</Translate>
              </Link>
              <Link className={styles.secondaryLight} to="/estudiante/">
                <Translate id="ciudadbots.home.studentModeLink">Ver vista estudiante</Translate>
              </Link>
            </div>
          </div>
          <div className={styles.featureList}>
            <span>
              <Translate id="ciudadbots.home.featureOne">12 modulos con retos de ciudad</Translate>
            </span>
            <span>
              <Translate id="ciudadbots.home.featureTwo">Alineacion CNB, ISTE, CSTA y NGSS</Translate>
            </span>
            <span>
              <Translate id="ciudadbots.home.featureThree">Rutas compacta, semestral y anual</Translate>
            </span>
            <span>
              <Translate id="ciudadbots.home.featureFour">Showcase y evaluacion final</Translate>
            </span>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionKicker}>
              <Translate id="ciudadbots.home.implementationKicker">Implementacion</Translate>
            </span>
            <h2>
              <Translate id="ciudadbots.home.implementationTitle">
                Del diagnostico al showcase sin improvisar
              </Translate>
            </h2>
          </div>
          <div className={styles.steps}>
            {[
              ['01', 'ciudadbots.home.stepOneTitle', 'Diagnosticar', 'ciudadbots.home.stepOneBody', 'Definimos metas, edades, tiempo disponible, equipo y nivel de madurez.'],
              ['02', 'ciudadbots.home.stepTwoTitle', 'Seleccionar ruta', 'ciudadbots.home.stepTwoBody', 'Elegimos demo, piloto, programa semestral o anual segun el objetivo institucional.'],
              ['03', 'ciudadbots.home.stepThreeTitle', 'Acompanamiento docente', 'ciudadbots.home.stepThreeBody', 'Preparamos al docente con flujo de sesiones, roles, recursos y criterios de evidencia.'],
              ['04', 'ciudadbots.home.stepFourTitle', 'Ejecutar y medir', 'ciudadbots.home.stepFourBody', 'Los estudiantes construyen, prueban, documentan y presentan resultados visibles.'],
            ].map(([number, titleId, title, bodyId, body]) => (
              <article className={styles.step} key={number}>
                <strong>{number}</strong>
                <h3>
                  <Translate id={titleId}>{title}</Translate>
                </h3>
                <p>
                  <Translate id={bodyId}>{body}</Translate>
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.splitSection}>
          <div className={styles.sectionBlock}>
            <span className={styles.sectionKicker}>
              <Translate id="ciudadbots.home.hardwareKicker">Equipo fisico</Translate>
            </span>
            <h2>
              <Translate id="ciudadbots.home.hardwareTitle">
                El hardware acompana la adopcion; no bloquea la venta
              </Translate>
            </h2>
            <ul className={styles.checkList}>
              <li>
                <Translate id="ciudadbots.home.hardwareOwn">Usar equipo compatible del colegio.</Translate>
              </li>
              <li>
                <Translate id="ciudadbots.home.hardwareRent">Alquilar equipo de GuateGeeks para pilotos o ciclos.</Translate>
              </li>
              <li>
                <Translate id="ciudadbots.home.hardwareBuy">Recomendar o vender kits para implementacion propia.</Translate>
              </li>
              <li>
                <Translate id="ciudadbots.home.hardwareService">Ejecutar modalidad completa con facilitacion y equipo.</Translate>
              </li>
            </ul>
          </div>
          <div className={styles.sectionBlock}>
            <span className={styles.sectionKicker}>
              <Translate id="ciudadbots.home.evidenceKicker">Evidencia</Translate>
            </span>
            <h2>
              <Translate id="ciudadbots.home.evidenceTitle">
                Cada programa debe dejar algo que direccion pueda mostrar
              </Translate>
            </h2>
            <ul className={styles.checkList}>
              <li>
                <Translate id="ciudadbots.home.evidenceArtifacts">Fotos, prototipos, codigo o bitacoras de equipos.</Translate>
              </li>
              <li>
                <Translate id="ciudadbots.home.evidenceRubrics">Rubricas de construccion, logica, proceso y comunicacion.</Translate>
              </li>
              <li>
                <Translate id="ciudadbots.home.evidenceReport">Reporte de impacto para direccion, familias o patrocinadores.</Translate>
              </li>
              <li>
                <Translate id="ciudadbots.home.evidenceShowcase">Mini showcase o presentacion final de aprendizajes.</Translate>
              </li>
            </ul>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionKicker}>
              <Translate id="ciudadbots.home.packagesKicker">Formas de empezar</Translate>
            </span>
            <h2>
              <Translate id="ciudadbots.home.packagesTitle">
                Paquetes pensados para validar rapido y crecer con confianza
              </Translate>
            </h2>
          </div>
          <div className={styles.packageGrid}>
            {[
              ['ciudadbots.home.packageDemoTitle', 'Demo Experience', 'ciudadbots.home.packageDemoBody', 'Una sesion demostrativa para abrir conversacion y mostrar el potencial.'],
              ['ciudadbots.home.packagePilotTitle', 'Piloto institucional', 'ciudadbots.home.packagePilotBody', '4 a 6 sesiones con evidencia, onboarding docente y mini showcase.'],
              ['ciudadbots.home.packageSemesterTitle', 'Programa semestral', 'ciudadbots.home.packageSemesterBody', 'Ruta de 12 a 24 sesiones con seguimiento y reporte final.'],
              ['ciudadbots.home.packageAnnualTitle', 'Programa anual', 'ciudadbots.home.packageAnnualBody', 'Implementacion profunda con portafolio, showcase y expansion por niveles.'],
            ].map(([titleId, title, bodyId, body]) => (
              <article className={styles.packageCard} key={titleId}>
                <h3>
                  <Translate id={titleId}>{title}</Translate>
                </h3>
                <p>
                  <Translate id={bodyId}>{body}</Translate>
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.cta}>
          <span className={styles.sectionKicker}>
            <Translate id="ciudadbots.home.ctaKicker">Siguiente paso</Translate>
          </span>
          <h2>
            <Translate id="ciudadbots.home.ctaTitle">
              Probemos un piloto medible antes de octubre
            </Translate>
          </h2>
          <p>
            <Translate id="ciudadbots.home.ctaBody">
              Podemos iniciar con una demo o piloto CiudadBots, usar equipo propio o equipo
              GuateGeeks, y cerrar con evidencia lista para direccion.
            </Translate>
          </p>
          <div className={styles.actionsCentered}>
            <a className={styles.primary} href={contactHref}>
              <Translate id="ciudadbots.home.ctaPrimary">Solicitar demo o piloto</Translate>
            </a>
            <Link className={styles.secondaryLight} to="/ciudadbots/">
              <Translate id="ciudadbots.home.ctaSecondary">Revisar CiudadBots</Translate>
            </Link>
          </div>
        </section>
      </main>
    </Layout>
  );
}
