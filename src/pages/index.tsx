import React from 'react';
import Link from '@docusaurus/Link';
import Translate, {translate} from '@docusaurus/Translate';
import useBaseUrl from '@docusaurus/useBaseUrl';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import styles from './index.module.css';

type ProgramStatus = 'available' | 'upcoming';
type ProgramComplexity = 'novato' | 'geek' | 'pro';

interface PlatformProgram {
  title: string;
  status: ProgramStatus;
  complexity: ProgramComplexity;
  image: string;
  imageAlt: string;
  summary: React.ReactNode;
  tags: readonly React.ReactNode[];
  href?: string;
  secondaryHref?: string;
  secondaryLabel?: React.ReactNode;
}

interface PlatformLevel {
  id: 'explorador' | 'constructor' | 'creador';
  title: React.ReactNode;
  kicker: React.ReactNode;
  image: string;
  imageAlt: string;
  purpose: React.ReactNode;
  accentColor: string;
  programs: readonly PlatformProgram[];
}

const complexityScale: readonly ProgramComplexity[] = ['novato', 'geek', 'pro'];

function getComplexityLabel(complexity: ProgramComplexity): string {
  switch (complexity) {
    case 'novato':
      return translate({id: 'platform.home.complexity.novato', message: 'Novato'});
    case 'geek':
      return translate({id: 'platform.home.complexity.geek', message: 'Geek'});
    case 'pro':
      return translate({id: 'platform.home.complexity.pro', message: 'Pro'});
    default:
      return complexity;
  }
}

function getPlatformLevels(): readonly PlatformLevel[] {
  return [
    {
      id: 'explorador',
      title: <Translate id="platform.home.level.explorador.title">Explorador</Translate>,
      kicker: <Translate id="platform.home.level.explorador.kicker">Descubrir y probar</Translate>,
      image: '/assets/platform/levels/explorador.png',
      imageAlt: translate({
        id: 'platform.home.level.explorador.imageAlt',
        message: 'Estudiantes explorando circuitos, sensores y primeras ideas de robótica.',
      }),
      purpose: (
        <Translate id="platform.home.level.explorador.purpose">
          Primer contacto con tecnología creativa: circuitos, narrativas con robots y experiencias
          aumentadas para aprender haciendo antes de programar proyectos complejos.
        </Translate>
      ),
      accentColor: 'var(--gg-sky-500)',
      programs: [
        {
          title: 'Circuitos en Acción',
          status: 'upcoming',
          complexity: 'novato',
          image: '/assets/platform/programs/explorador-circuitos.png',
          imageAlt: translate({
            id: 'platform.home.program.circuitos.imageAlt',
            message: 'Mesa de trabajo con luces, cables y componentes para circuitos iniciales.',
          }),
          summary: (
            <Translate id="platform.home.program.circuitos.summary">
              Retos cortos para entender energía, entradas y salidas mientras el equipo construye
              prototipos visibles desde la primera sesión.
            </Translate>
          ),
          tags: [
            <Translate id="platform.home.tag.circuitos">Circuitos</Translate>,
            <Translate id="platform.home.tag.sensores">Sensores</Translate>,
            <Translate id="platform.home.tag.primariaBasico">Primaria alta y básico</Translate>,
          ],
        },
        {
          title: 'Rutas con Tale-Bot',
          status: 'upcoming',
          complexity: 'novato',
          image: '/assets/platform/programs/explorador-talebot.png',
          imageAlt: translate({
            id: 'platform.home.program.talebot.imageAlt',
            message: 'Robot Tale-Bot sobre una ruta ilustrada para pensamiento computacional.',
          }),
          summary: (
            <Translate id="platform.home.program.talebot.summary">
              Secuencias, orientación espacial y depuración sin pantallas, con misiones narrativas
              listas para aula.
            </Translate>
          ),
          tags: [
            <Translate id="platform.home.tag.pensamientoComputacional">
              Pensamiento computacional
            </Translate>,
            <Translate id="platform.home.tag.secuencias">Secuencias</Translate>,
            <Translate id="platform.home.tag.narrativa">Narrativa</Translate>,
          ],
        },
        {
          title: 'Mundo Aumentado',
          status: 'upcoming',
          complexity: 'geek',
          image: '/assets/platform/programs/explorador-ar.png',
          imageAlt: translate({
            id: 'platform.home.program.ar.imageAlt',
            message: 'Estudiantes observando una escena aumentada sobre una mesa de aprendizaje.',
          }),
          summary: (
            <Translate id="platform.home.program.ar.summary">
              Actividades para mezclar objetos físicos, observación científica y capas digitales
              que ayudan a explicar fenómenos.
            </Translate>
          ),
          tags: [
            <Translate id="platform.home.tag.realidadAumentada">Realidad aumentada</Translate>,
            <Translate id="platform.home.tag.exploracion">Exploración</Translate>,
            <Translate id="platform.home.tag.ciencia">Ciencia</Translate>,
          ],
        },
      ],
    },
    {
      id: 'constructor',
      title: <Translate id="platform.home.level.constructor.title">Constructor</Translate>,
      kicker: <Translate id="platform.home.level.constructor.kicker">Diseñar y programar</Translate>,
      image: '/assets/platform/levels/constructor.png',
      imageAlt: translate({
        id: 'platform.home.level.constructor.imageAlt',
        message: 'Aula de robótica con estudiantes construyendo robots y prototipos.',
      }),
      purpose: (
        <Translate id="platform.home.level.constructor.purpose">
          Programas donde el equipo convierte ideas en máquinas: estructura, sensores, código,
          pruebas y mejora iterativa conectada con retos reales.
        </Translate>
      ),
      accentColor: 'var(--gg-coral-500)',
      programs: [
        {
          title: 'CiudadBots Guatemala',
          status: 'available',
          complexity: 'geek',
          image: '/assets/platform/programs/constructor-ciudadbots.png',
          imageAlt: translate({
            id: 'platform.home.program.ciudadbots.imageAlt',
            message: 'Robot educativo CiudadBots recorriendo una ciudad de aprendizaje.',
          }),
          summary: (
            <Translate id="platform.home.program.ciudadbots.summary">
              Misiones de robótica LEGO SPIKE con retos urbanos: cartografía, entrega, logística,
              infraestructura, emergencia y comunicación de soluciones.
            </Translate>
          ),
          tags: [
            <Translate id="platform.home.tag.legoSpike">LEGO SPIKE</Translate>,
            <Translate id="platform.home.tag.roboticaAplicada">Robótica aplicada</Translate>,
            <Translate id="platform.home.tag.cicloBasico">Ciclo Básico</Translate>,
          ],
          href: '/ciudadbots',
          secondaryHref: '/estudiante',
          secondaryLabel: <Translate id="platform.home.action.studentMode">Modo estudiante</Translate>,
        },
        {
          title: 'GuateGeeks SMARS',
          status: 'available',
          complexity: 'pro',
          image: '/assets/platform/programs/constructor-makerzoid.png',
          imageAlt: translate({
            id: 'platform.home.program.smars.imageAlt',
            message: 'Robot de orugas tipo SMARS con componentes Arduino sobre mesa de trabajo.',
          }),
          summary: (
            <Translate id="platform.home.program.smars.summary">
              Construcción de un robot de orugas autónomo con Arduino puro, dos motores, sensor
              ultrasónico y máquina de estados.
            </Translate>
          ),
          tags: [
            <Translate id="platform.home.tag.arduino">Arduino</Translate>,
            <Translate id="platform.home.tag.roboticaMovil">Robótica móvil</Translate>,
            <Translate id="platform.home.tag.terceroBasico">Tercero Básico</Translate>,
          ],
          href: '/guategeeks',
        },
        {
          title: 'Rescate Makerzoid',
          status: 'upcoming',
          complexity: 'geek',
          image: '/assets/platform/programs/constructor-makerzoid.png',
          imageAlt: translate({
            id: 'platform.home.program.makerzoid.imageAlt',
            message: 'Kit Makerzoid preparado para una misión de rescate con piezas modulares.',
          }),
          summary: (
            <Translate id="platform.home.program.makerzoid.summary">
              Proyectos de rescate y mecanismos rápidos para trabajar estrategia, diseño mecánico y
              colaboración bajo restricciones.
            </Translate>
          ),
          tags: [
            <Translate id="platform.home.tag.mecanismos">Mecanismos</Translate>,
            <Translate id="platform.home.tag.rescate">Rescate</Translate>,
            <Translate id="platform.home.tag.trabajoEquipo">Trabajo en equipo</Translate>,
          ],
        },
        {
          title: 'Expediciones VR',
          status: 'upcoming',
          complexity: 'geek',
          image: '/assets/platform/programs/constructor-vr.png',
          imageAlt: translate({
            id: 'platform.home.program.vr.imageAlt',
            message: 'Estudiantes usando visores de realidad virtual para explorar entornos.',
          }),
          summary: (
            <Translate id="platform.home.program.vr.summary">
              Experiencias inmersivas guiadas para investigar lugares, sistemas y problemas antes
              de diseñar una solución física o digital.
            </Translate>
          ),
          tags: [
            <Translate id="platform.home.tag.realidadVirtual">Realidad virtual</Translate>,
            <Translate id="platform.home.tag.investigacion">Investigación</Translate>,
            <Translate id="platform.home.tag.diseno">Diseño</Translate>,
          ],
        },
      ],
    },
    {
      id: 'creador',
      title: <Translate id="platform.home.level.creador.title">Creador</Translate>,
      kicker: <Translate id="platform.home.level.creador.kicker">Prototipar y comunicar</Translate>,
      image: '/assets/platform/levels/creador.png',
      imageAlt: translate({
        id: 'platform.home.level.creador.imageAlt',
        message: 'Estudiantes creando prototipos digitales, pantallas y objetos interactivos.',
      }),
      purpose: (
        <Translate id="platform.home.level.creador.purpose">
          Rutas para construir artefactos propios: pantallas, wearables, IA creativa y fabricación
          digital con documentación, iteración y presentación pública.
        </Translate>
      ),
      accentColor: 'var(--gg-plum-500)',
      programs: [
        {
          title: 'Tiempo Circular',
          status: 'available',
          complexity: 'pro',
          image: '/assets/platform/programs/creador-ia.png',
          imageAlt: translate({
            id: 'platform.home.program.tiempoCircular.imageAlt',
            message: 'Pantalla circular programable con una carátula de reloj colorida.',
          }),
          summary: (
            <Translate id="platform.home.program.tiempoCircular.summary">
              Programación de un reloj sobre pantalla circular con ESP32: trigonometría, color,
              coordenadas y una carátula inspirada en los ciclos del Cholq'ij.
            </Translate>
          ),
          tags: [
            <Translate id="platform.home.tag.esp32">ESP32</Translate>,
            <Translate id="platform.home.tag.pantallas">Pantallas</Translate>,
            <Translate id="platform.home.tag.segundoBasico">Segundo Básico</Translate>,
          ],
          href: '/tiempo-circular',
        },
        {
          title: 'SmartLab Wearables',
          status: 'upcoming',
          complexity: 'geek',
          image: '/assets/platform/programs/creador-wearables.png',
          imageAlt: translate({
            id: 'platform.home.program.wearables.imageAlt',
            message: 'Prototipo wearable con luces y sensores cosidos en tela.',
          }),
          summary: (
            <Translate id="platform.home.program.wearables.summary">
              Laboratorios de tecnología vestible para combinar electrónica suave, medición y
              diseño centrado en personas.
            </Translate>
          ),
          tags: [
            <Translate id="platform.home.tag.wearables">Wearables</Translate>,
            <Translate id="platform.home.tag.disenoHumano">Diseño humano</Translate>,
            <Translate id="platform.home.tag.prototipo">Prototipo</Translate>,
          ],
        },
        {
          title: 'Estudio IA Creativa',
          status: 'upcoming',
          complexity: 'pro',
          image: '/assets/platform/programs/creador-ia.png',
          imageAlt: translate({
            id: 'platform.home.program.ia.imageAlt',
            message: 'Pantalla con interfaz de inteligencia artificial creativa para aula.',
          }),
          summary: (
            <Translate id="platform.home.program.ia.summary">
              Proyectos para usar IA como material de creación, análisis y comunicación,
              manteniendo criterio, autoría y revisión humana.
            </Translate>
          ),
          tags: [
            <Translate id="platform.home.tag.ia">IA</Translate>,
            <Translate id="platform.home.tag.creatividad">Creatividad</Translate>,
            <Translate id="platform.home.tag.autoria">Autoría</Translate>,
          ],
        },
        {
          title: 'FabLab 3D',
          status: 'upcoming',
          complexity: 'pro',
          image: '/assets/platform/programs/creador-fab3d.png',
          imageAlt: translate({
            id: 'platform.home.program.fab3d.imageAlt',
            message: 'Piezas impresas en 3D y herramientas de fabricación digital.',
          }),
          summary: (
            <Translate id="platform.home.program.fab3d.summary">
              Diseño, fabricación y prueba de objetos físicos para resolver necesidades concretas
              del aula, la comunidad o un reto de ingeniería.
            </Translate>
          ),
          tags: [
            <Translate id="platform.home.tag.impresion3d">Impresión 3D</Translate>,
            <Translate id="platform.home.tag.fabricacion">Fabricación</Translate>,
            <Translate id="platform.home.tag.iteracion">Iteración</Translate>,
          ],
        },
      ],
    },
  ];
}

function StatusBadge({status}: {status: ProgramStatus}): React.JSX.Element {
  const label =
    status === 'available'
      ? translate({id: 'platform.home.status.available', message: 'Disponible'})
      : translate({id: 'platform.home.status.upcoming', message: 'Próximamente'});

  return (
    <span className={`${styles.statusBadge} ${styles[`status-${status}`]}`}>{label}</span>
  );
}

function ComplexityMeter({complexity}: {complexity: ProgramComplexity}): React.JSX.Element {
  const label = getComplexityLabel(complexity);
  const activeIndex = complexityScale.indexOf(complexity);

  return (
    <div
      className={styles.complexity}
      aria-label={translate(
        {
          id: 'platform.home.complexity.ariaLabel',
          message: 'Complejidad: {complexity}',
        },
        {complexity: label},
      )}>
      <span className={styles.complexityLabel}>{label}</span>
      <span className={styles.complexityBars} aria-hidden="true">
        {complexityScale.map((step, index) => (
          <span
            key={step}
            className={`${styles.complexityBar} ${index <= activeIndex ? styles.complexityBarActive : ''}`}
          />
        ))}
      </span>
    </div>
  );
}

function ProgramCard({program}: {program: PlatformProgram}): React.JSX.Element {
  const imageUrl = useBaseUrl(program.image);

  return (
    <article
      className={`${styles.programCard} ${program.status === 'upcoming' ? styles.programCardUpcoming : ''}`}
      aria-disabled={program.status === 'upcoming' ? true : undefined}>
      <div className={styles.programMedia}>
        <img src={imageUrl} alt={program.imageAlt} loading="lazy" />
      </div>
      <div className={styles.programBody}>
        <div className={styles.cardMeta}>
          <StatusBadge status={program.status} />
          <ComplexityMeter complexity={program.complexity} />
        </div>
        <h3>{program.title}</h3>
        <p>{program.summary}</p>
        <div className={styles.tags}>
          {program.tags.map((tag, index) => (
            <span className={styles.tag} key={index}>
              {tag}
            </span>
          ))}
        </div>
      </div>
      <div className={styles.programActions}>
        {program.href ? (
          <Link className={styles.cardPrimaryAction} to={program.href}>
            <Translate id="platform.home.action.openProgram">Abrir programa</Translate>
          </Link>
        ) : (
          <span className={styles.cardDisabledAction}>
            <Translate id="platform.home.action.upcoming">En preparación</Translate>
          </span>
        )}
        {program.secondaryHref && program.secondaryLabel ? (
          <Link className={styles.cardSecondaryAction} to={program.secondaryHref}>
            {program.secondaryLabel}
          </Link>
        ) : null}
      </div>
    </article>
  );
}

function LevelSection({level}: {level: PlatformLevel}): React.JSX.Element {
  const imageUrl = useBaseUrl(level.image);

  return (
    <section
      className={styles.levelSection}
      id={`nivel-${level.id}`}
      style={{'--level-accent': level.accentColor} as React.CSSProperties}>
      <div className={styles.levelHeader}>
        <div className={styles.levelImage}>
          <img src={imageUrl} alt={level.imageAlt} loading="lazy" />
        </div>
        <div className={styles.levelCopy}>
          <p className={styles.levelKicker}>{level.kicker}</p>
          <h2>{level.title}</h2>
          <p>{level.purpose}</p>
        </div>
      </div>
      <div className={styles.programGrid}>
        {level.programs.map((program) => (
          <ProgramCard key={program.title} program={program} />
        ))}
      </div>
    </section>
  );
}

export default function Home(): React.JSX.Element {
  const {siteConfig} = useDocusaurusContext();
  const levels = getPlatformLevels();
  const heroImage = useBaseUrl('/assets/platform/levels/constructor.png');
  const availablePrograms = levels.reduce(
    (count, level) => count + level.programs.filter((program) => program.status === 'available').length,
    0,
  );

  return (
    <Layout
      title={translate({id: 'platform.home.pageTitle', message: 'Programas Educativos GuateGeeks'})}
      description={siteConfig.tagline}>
      <main className={styles.page}>
        <section className={styles.hero}>
          <img
            className={styles.heroImage}
            src={heroImage}
            alt={translate({
              id: 'platform.home.hero.imageAlt',
              message: 'Estudiantes trabajando en una plataforma de robótica educativa GuateGeeks.',
            })}
          />
          <div className={styles.heroShade} aria-hidden="true" />
          <div className={styles.heroContent}>
            <p className={styles.eyebrow}>
              <Translate id="platform.home.eyebrow">GuateGeeks · Programas Educativos</Translate>
            </p>
            <h1>
              <Translate id="platform.home.heroTitle">Programas Educativos GuateGeeks</Translate>
            </h1>
            <p className={styles.heroLead}>
              <Translate id="platform.home.heroLead">
                Una plataforma de rutas para descubrir, construir y crear con robótica, programación
                y fabricación digital en el aula.
              </Translate>
            </p>
            <div className={styles.heroActions}>
              <Link className={styles.primaryAction} to="/ciudadbots">
                <Translate id="platform.home.hero.primaryAction">Entrar a CiudadBots</Translate>
              </Link>
              <Link className={styles.secondaryAction} to="/estudiante">
                <Translate id="platform.home.hero.secondaryAction">Modo estudiante</Translate>
              </Link>
            </div>
            <dl className={styles.heroStats}>
              <div>
                <dt>{levels.length}</dt>
                <dd>
                  <Translate id="platform.home.stat.levels">niveles de aprendizaje</Translate>
                </dd>
              </div>
              <div>
                <dt>{availablePrograms}</dt>
                <dd>
                  <Translate id="platform.home.stat.available">programas disponibles</Translate>
                </dd>
              </div>
              <div>
                <dt>{levels.reduce((count, level) => count + level.programs.length, 0)}</dt>
                <dd>
                  <Translate id="platform.home.stat.portfolio">rutas en el portafolio</Translate>
                </dd>
              </div>
            </dl>
          </div>
        </section>

        <section className={styles.platformIntro}>
          <p>
            <Translate id="platform.home.intro.eyebrow">Plataforma por progresión</Translate>
          </p>
          <h2>
            <Translate id="platform.home.intro.title">
              Del primer circuito al prototipo que se puede presentar
            </Translate>
          </h2>
          <div className={styles.introText}>
            <p>
              <Translate id="platform.home.intro.body">
                Cada nivel agrupa experiencias con una intención clara: explorar conceptos,
                construir sistemas y crear proyectos comunicables. Las tarjetas disponibles abren
                rutas Docusaurus activas; las próximas rutas quedan visibles sin enlazar a páginas
                inexistentes.
              </Translate>
            </p>
          </div>
        </section>

        <div className={styles.levels}>
          {levels.map((level) => (
            <LevelSection key={level.id} level={level} />
          ))}
        </div>
      </main>
    </Layout>
  );
}
