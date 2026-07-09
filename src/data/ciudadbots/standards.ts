// Shared CNB / international-standards content, ported verbatim from the
// original programa-robotica.html render functions (cnbOfficialCompetencies,
// cnbAchievementIndicators, cnbSourceLinks, internationalAlignment,
// basicoAlignment). Stored once here instead of duplicated per module, since
// almost none of it is actually module-specific — only the achievement
// indicators table substitutes the module's title.

/** A labelled area + descriptive text, used for CNB/standards summary grids. */
export interface AreaText {
  area: string;
  text: string;
}

/** A mini-card: title + text, optionally linking out to a source. */
export interface LinkCard {
  title: string;
  text: string;
  href?: string;
  linkLabel?: string;
}

/** One row of a grade-comparison table; first row is the header. */
export type ImpactRow = readonly [string, string, string, string];

export const depthByGradeNote =
  'La planificación está pensada para Ciclo Básico. El mismo módulo puede trabajarse en 1.º, 2.º o 3.º básico, pero cambia el nivel de profundidad esperado: en 1.º se prioriza comprensión y ejecución guiada; en 2.º se exige análisis, medición y mejora; en 3.º se espera diseño autónomo, documentación técnica y transferencia a problemas reales.';

export const maturityByGrade: readonly ImpactRow[] = [
  ['Nivel', 'Lo que debe cumplir', 'Evidencia observable', 'Medición de impacto'],
  [
    '1.º básico',
    'Comprende el problema, arma el robot con guía, identifica sensores/motores y ejecuta un programa funcional.',
    'Bitácora con pasos, robot armado, programa base probado y explicación oral simple.',
    'Lista de cotejo: construcción, conexión, secuencia lógica, colaboración y vocabulario técnico inicial.',
  ],
  [
    '2.º básico',
    'Ajusta parámetros, mide resultados, usa datos de prueba y explica la relación entre mecanismo, sensor y código.',
    'Tabla de intentos, cambios de valores, comparación antes/después y justificación del ajuste.',
    'Rúbrica: precisión, depuración, uso de medición, interpretación de sensores y trabajo por roles.',
  ],
  [
    '3.º básico',
    'Rediseña o amplía la solución, documenta el algoritmo y conecta el proyecto con una necesidad real de Guatemala.',
    'Prototipo mejorado, diagrama o pseudocódigo, presentación técnica y propuesta de aplicación comunitaria.',
    'Proyecto: funcionalidad, innovación, evidencia de iteración, comunicación técnica e impacto social.',
  ],
];

export const cnbOfficialCompetencies: readonly AreaText[] = [
  {
    area: 'Matemáticas · Básico',
    text: 'El CNB de Básico enfatiza producir y analizar información mediante patrones, relaciones, representación gráfica, modelos y resolución de problemas. En 3.º básico crece la aplicación de modelos algebraicos y geométricos para justificar soluciones.',
  },
  {
    area: 'Ciencias Naturales',
    text: 'El ciclo básico pide usar saberes científicos y tecnológicos para explicar fenómenos del entorno, comprender relaciones entre sistemas naturales y acción humana, y actuar con criterios de prevención, seguridad y conservación.',
  },
  {
    area: 'Comunicación y Lenguaje',
    text: 'Se espera escuchar, hablar, leer y escribir para construir conocimiento técnico y científico, usar códigos verbales y digitales, y producir textos o informes para explicar procesos y resolver problemas.',
  },
  {
    area: 'Emprendimiento para la Productividad',
    text: 'El CNB orienta a formular proyectos viables que mejoren la calidad de vida, con pertinencia cultural, organización del trabajo, toma de decisiones y conexión con necesidades reales del entorno.',
  },
];

/** Achievement note for a specific module — mirrors the original's inline template. */
export function achievementNoteFor(moduleTitle: string): string {
  return `Estos indicadores aterrizan las competencias del CNB de Básico al trabajo observable dentro de ${moduleTitle}. No sustituyen el plan de área del centro educativo; sirven como puente para planificar, evaluar y reportar avance.`;
}

/** Grade-specific achievement indicators for a module — mirrors cnbAchievementIndicators(m). */
export function achievementIndicators(moduleTitle: string): readonly ImpactRow[] {
  return [
    ['Grado', 'Competencias CNB afines', `Indicadores de logro sugeridos para ${moduleTitle}`, 'Evidencia esperada'],
    [
      '1.º básico',
      'Comprende relaciones entre forma, medida, secuencia, causa-efecto y comunicación del proceso.',
      'Construye el robot con guía, sigue la secuencia del reto, reconoce componentes y explica con lenguaje sencillo qué hace cada bloque o mecanismo.',
      'Robot armado, programa base funcional, explicación oral breve y bitácora con pasos completados.',
    ],
    [
      '2.º básico',
      'Analiza datos, ajusta procedimientos, usa recursos tecnológicos con intención y comunica decisiones con evidencia.',
      `Mide, compara intentos, depura valores, interpreta el efecto de sensor o mecanismo y justifica al menos un ajuste hecho durante ${moduleTitle}.`,
      'Tabla de pruebas, cambios registrados, mejora observable entre intentos y explicación técnica del ajuste.',
    ],
    [
      '3.º básico',
      'Aplica modelos, propone soluciones viables, documenta procesos y vincula tecnología con impacto local.',
      `Rediseña o amplía ${moduleTitle}, documenta el algoritmo o flujo de control y argumenta cómo el proyecto responde a una necesidad de Guatemala.`,
      'Prototipo mejorado, diagrama o pseudocódigo, evidencia de iteración y presentación con justificación del impacto.',
    ],
  ];
}

export const cnbSourceLinks: readonly LinkCard[] = [
  {
    title: 'Fuente oficial CNB · Ciclo Básico',
    text: 'Síntesis docente construida a partir del portal oficial del CNB para Ciclo Básico y su listado de competencias por área y grado.',
    href: 'https://cnbguatemala.org/wiki/CNB_Ciclo_B%C3%A1sico',
    linkLabel: 'Ver CNB Ciclo Básico',
  },
  {
    title: 'Competencias por área y grado',
    text: 'Referencia oficial usada para aterrizar competencias afines de Matemáticas, Ciencias Naturales, Comunicación y Emprendimiento dentro del programa.',
    href: 'https://cnbguatemala.org/wiki/CNB_Ciclo_B%C3%A1sico/Todas_las_competencias_por_%C3%A1rea_y_grado',
    linkLabel: 'Ver competencias oficiales',
  },
];

export const impactReportingNote =
  'Registrar por equipo una evidencia de programación, una evidencia de ingeniería y una evidencia de comunicación. Con esas tres piezas se puede reportar avance frente a ISTE, CSTA y NGSS sin convertir la clase en una lista de contenidos aislados.';

export const internationalCards: readonly AreaText[] = [
  {
    area: 'ISTE Students',
    text: 'Diseñador innovador, pensador computacional, comunicador creativo, colaborador global y aprendiz empoderado.',
  },
  {
    area: 'CSTA K-12 CS · Nivel 2',
    text: 'Algoritmos y programación, sistemas de computación, datos y análisis, e impactos de la computación.',
  },
  {
    area: 'NGSS MS-ETS1',
    text: 'Definir problemas, evaluar soluciones, analizar datos de prueba y optimizar diseños de ingeniería.',
  },
  {
    area: 'Competencias globales STEAM',
    text: 'Colaboración, creatividad, comunicación, pensamiento crítico, prototipado e iteración con evidencia.',
  },
];

export const internationalProgression: readonly ImpactRow[] = [
  ['Nivel', 'ISTE', 'CSTA', 'NGSS / Ingeniería'],
  [
    '1.º básico',
    'Usa tecnología para aprender, crear una solución guiada y comunicar lo que construyó.',
    'Crea secuencias, eventos y ciclos simples; reconoce hardware, sensores y salida del sistema.',
    'Define el problema con criterios simples: qué debe hacer el robot, con qué materiales y bajo qué restricción.',
  ],
  [
    '2.º básico',
    'Usa retroalimentación para mejorar el prototipo y comunica decisiones con evidencia.',
    'Aplica condicionales, subrutinas, sensores, datos de prueba y depuración sistemática.',
    'Compara soluciones o versiones usando criterios: precisión, seguridad, tiempo, estabilidad y confiabilidad.',
  ],
  [
    '3.º básico',
    'Diseña una solución propia, trabaja colaborativamente y presenta impacto local o comunitario.',
    'Documenta algoritmos modulares, variables/estados, datos de desempeño e impacto de la automatización.',
    'Analiza datos de pruebas para optimizar el diseño y justificar la versión final.',
  ],
];

export const internationalEvidence: readonly ImpactRow[] = [
  ['Medición', '1.º básico', '2.º básico', '3.º básico'],
  [
    'Evidencia técnica',
    'Programa ejecutado, robot funcional y explicación de bloques básicos.',
    'Bitácora con cambios de parámetros, errores y mejoras.',
    'Diagrama, pseudocódigo o documentación del sistema completo.',
  ],
  [
    'Evidencia de ingeniería',
    'Identifica criterios del reto y verifica si el robot cumple la misión.',
    'Compara intentos con datos: distancia, tiempo, precisión o lectura de sensor.',
    'Optimiza una solución y justifica decisiones según restricciones reales.',
  ],
  [
    'Evidencia de comunicación',
    'Describe qué hizo el robot y qué aprendió.',
    'Explica por qué hizo un ajuste y qué evidencia lo respalda.',
    'Presenta una solución técnica conectada con una necesidad de Guatemala.',
  ],
];

export const internationalSourceCards: readonly LinkCard[] = [
  {
    title: 'ISTE Standards for Students',
    text: 'Referencia para creatividad digital, pensamiento computacional, colaboración y comunicación.',
    href: 'https://iste.org/standards/students',
    linkLabel: 'Consultar ISTE',
  },
  {
    title: 'CSTA K-12 Computer Science Standards',
    text: 'Referencia para algoritmos, programación, sistemas, datos e impacto de la computación.',
    href: 'https://csteachers.org/k12standards/',
    linkLabel: 'Consultar CSTA',
  },
  {
    title: 'NGSS MS-ETS1 Engineering Design',
    text: 'Referencia para definir problemas, comparar soluciones, analizar pruebas y optimizar diseños.',
    href: 'https://www.nextgenscience.org/topic-arrangement/msengineering-design',
    linkLabel: 'Consultar NGSS',
  },
  {
    title: 'Uso GuateGeeks',
    text: 'Estas referencias se traducen a evidencias de aula: robot funcional, programa explicado, datos de prueba, mejora iterativa y presentación técnica.',
  },
];

export interface BasicoLevel {
  heading: string;
  goal: string;
  items: readonly string[];
}

export const basicoLevels: readonly BasicoLevel[] = [
  {
    heading: '1.º básico · Exploración guiada',
    goal: 'Meta: que el estudiante pase de usuario a constructor/programador inicial.',
    items: [
      'Reconoce componentes: hub, motor, sensor y mecanismo.',
      'Sigue instrucciones de construcción con roles.',
      'Ejecuta secuencias y ciclos simples.',
      'Explica causa y efecto: bloque, movimiento, sensor.',
    ],
  },
  {
    heading: '2.º básico · Análisis y mejora',
    goal: 'Meta: que el estudiante mida, compare y mejore con evidencia.',
    items: [
      'Registra datos de pruebas y errores.',
      'Ajusta grados, tiempos, distancias o umbrales.',
      'Usa condicionales, subrutinas y sensores con intención.',
      'Relaciona diseño mecánico con desempeño.',
    ],
  },
  {
    heading: '3.º básico · Diseño e impacto',
    goal: 'Meta: que el estudiante proponga soluciones propias conectadas con Guatemala.',
    items: [
      'Rediseña una parte del robot o misión.',
      'Documenta algoritmo, decisiones y pruebas.',
      'Evalúa seguridad, eficiencia e impacto social.',
      'Presenta una solución técnica con evidencia.',
    ],
  },
];

export const basicoComparison: readonly ImpactRow[] = [
  ['Eje', '1.º básico', '2.º básico', '3.º básico'],
  [
    'Pensamiento computacional',
    'Secuencia, evento y ciclo simple.',
    'Condicionales, sensores, subrutinas y depuración.',
    'Algoritmos modulares, variables, estados y documentación.',
  ],
  [
    'Matemática aplicada',
    'Medir distancia, contar repeticiones y reconocer ángulos.',
    'Calcular, comparar intentos y ajustar parámetros.',
    'Modelar relaciones, optimizar y justificar con datos.',
  ],
  [
    'Ciencia e ingeniería',
    'Identificar fuerza, movimiento, sensores y mecanismos.',
    'Explicar cómo el mecanismo afecta el resultado.',
    'Rediseñar bajo criterios de seguridad, eficiencia e impacto.',
  ],
  [
    'Comunicación',
    'Describe qué construyó y qué hace el robot.',
    'Explica decisiones, errores y ajustes.',
    'Presenta una solución con lenguaje técnico y evidencia.',
  ],
];

/** Transversal (program-level, not module-specific) CNB alignment — overview page only. */
export const transversalCnb: readonly AreaText[] = [
  {
    area: 'Matemáticas',
    text: 'Medición, geometría, proporcionalidad, variables, tablas de datos, estimación, análisis de error y solución de problemas.',
  },
  {
    area: 'Ciencias Naturales',
    text: 'Movimiento, fuerza, energía, sensores, máquinas simples, seguridad, ambiente y relación entre tecnología y comunidad.',
  },
  {
    area: 'Comunicación y Lenguaje',
    text: 'Bitácora, explicación oral, argumentación, vocabulario técnico, presentación de evidencias y comunicación de resultados.',
  },
  {
    area: 'Emprendimiento / Productividad',
    text: 'Diseño de soluciones, trabajo colaborativo, tecnología aplicada, mejora continua, innovación e impacto en necesidades locales.',
  },
];

export interface ScopeOption {
  title: string;
  text: string;
}

export const scopeOptions: readonly ScopeOption[] = [
  {
    title: 'Ruta compacta · 12 sesiones',
    text: 'Úsela cuando necesite una visión general del programa o una implementación breve de introducción.',
  },
  {
    title: 'Ruta estándar · 24 sesiones',
    text: 'Úsela cuando quiera dedicar una sesión a construcción/programación y otra a mejora o reto aplicado.',
  },
  {
    title: 'Ruta extendida · 36+ sesiones',
    text: 'Úsela cuando desee trabajar contexto, construcción, reto libre y presentación con más profundidad.',
  },
  {
    title: 'Ruta por proyectos',
    text: 'Úsela para seleccionar solo los módulos que mejor se ajusten a sus metas, tiempo y disponibilidad de kits.',
  },
];
