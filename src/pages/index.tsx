import React from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import useBaseUrl from '@docusaurus/useBaseUrl';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import {useAccessControl} from '@site/src/components/AccessControl';
import styles from './index.module.css';

const text = {
  es: {brand: 'Programas educativos', badge: 'Portafolio educativo GuateGeeks', title: 'Elija la ruta ideal para empezar a crear.', lead: 'Tres niveles, una navegación clara y una oferta organizada para que cada estudiante, familia o institución encuentre el punto de entrada correcto.', stats: ['Niveles formativos', 'Base metodológica', 'De exploración a creación de tecnología'], section: 'Seleccione el nivel', sectionCopy: 'Cada nivel responde a una etapa distinta del aprendizaje tecnológico.', enter: 'Ingresar', levels: [['Nivel explorador', 'Explorador', 'Descubrir y atreverse.', 'Primeras experiencias con tecnología, lógica y creatividad.'], ['Nivel constructor', 'Constructor', 'Construir y resolver.', 'Robótica aplicada, programación y solución técnica del mundo real.'], ['Nivel creador', 'Creador', 'Diseñar y desarrollar ideas.', 'Programas orientados a proyecto, prototipado y presentación.']]},
  en: {brand: 'Educational programs', badge: 'GuateGeeks learning portfolio', title: 'Choose the right path to start creating.', lead: 'Three levels, clear navigation, and an organized offer so each student, family, or institution can find the right starting point.', stats: ['Learning levels', 'Methodology base', 'From exploration to technology creation'], section: 'Choose a level', sectionCopy: 'Each level responds to a different stage of technology learning.', enter: 'Enter', levels: [['Explorer level', 'Explorer', 'Discover and dare.', 'First experiences with technology, logic, and creativity.'], ['Builder level', 'Builder', 'Build and solve.', 'Applied robotics, programming, and real-world technical problem solving.'], ['Creator level', 'Creator', 'Design and develop ideas.', 'Programs focused on projects, prototyping, and presentation.']]},
} as const;
const images = ['/assets/platform/levels/explorador.png', '/assets/platform/levels/constructor.png', '/assets/platform/levels/creador.png'];
const routes = ['/nivel-explorador', '/nivel-constructor', '/nivel-creador'];

export default function Home(): React.JSX.Element {
  const {i18n} = useDocusaurusContext();
  const {isDemo} = useAccessControl();
  const copy = text[i18n.currentLocale === 'en' ? 'en' : 'es'];
  const imageUrls = [useBaseUrl(images[0]), useBaseUrl(images[1]), useBaseUrl(images[2])];
  return <Layout title="Programas Educativos" description="Programas educativos GuateGeeks"><main className={styles.shell}><section className={styles.hero}><div className={styles.heroPanel}><span className={styles.eyebrow}>{copy.badge}</span><h1>{copy.title}</h1><p>{copy.lead}</p><div className={styles.heroStats}><div className={styles.heroStat}><strong>3</strong><span>{copy.stats[0]}</span></div><div className={styles.heroStat}><strong>STEAM</strong><span>{copy.stats[1]}</span></div><div className={styles.heroStat}><strong>1 ruta</strong><span>{copy.stats[2]}</span></div></div></div></section><section className={styles.section}><div className={styles.sectionHead}><h2>{copy.section}</h2><p>{copy.sectionCopy}</p></div><div className={styles.levels}>{copy.levels.map((level, index) => <article className={styles.card} key={level[1]}><div className={styles.cardMedia}><img src={imageUrls[index]} alt={level[1]} /></div><div className={styles.cardBody}><span className={styles.badge}>{level[0]}</span><h3>{level[1]}</h3><div className={styles.cardLead}>{level[2]}</div><p>{level[3]}</p>{isDemo && index !== 1 ? <span className={`${styles.cta} ${styles.disabledCta}`} aria-disabled="true">{copy.enter}</span> : <Link className={styles.cta} to={routes[index]}>{copy.enter}</Link>}</div></article>)}</div></section></main></Layout>;
}
