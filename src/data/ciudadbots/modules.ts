import type {Module} from './types';

// Base URLs for CiudadBots static assets (served from static/assets/ciudadbots/).
export const PROGRAMS_BASE = '/assets/ciudadbots/programs/';
export const BUILD_GUIDE_BASE = '/assets/ciudadbots/build-guide/page-';

// The 12 CiudadBots Guatemala modules, migrated from the original
// programa-robotica.html `modules` array. Dead `original` local-path links
// were removed. Only module 1 currently has a visual build guide.
export const modules: readonly Module[] = [
  {
    id: 'm1',
    n: '01',
    slug: 'trazamapas-chapin',
    title: 'Trazamapas Chapín',
    short: 'Planos, distancia y giros',
    sessions: '2-3',
    program: '01_Jamie_t.llsp',
    guide: {
      title: 'Guía visual de construcción · Trazamapas Chapín',
      pages: 48,
      imageBase: BUILD_GUIDE_BASE,
    },
    question:
      '¿Cómo puede un robot dibujar el plano de una comunidad guatemalteca siguiendo instrucciones exactas?',
    context:
      'Los estudiantes construyen un robot cartógrafo GuateGeeks que dibuja en papel. El reto conecta mapas de barrio, calles, casas, mercados y servicios, con movimiento por distancia, giros de 90 y 45 grados, bucles y calibración física del marcador.',
    concepts: [
      'Algoritmo secuencial',
      'Distancia por rotación de rueda',
      'Giros de 90 y 45 grados',
      'Bucles para figuras geométricas',
      'Calibración y prueba',
    ],
    phases: [
      {kind: 'act', label: 'Activar · 15 min', title: 'Planos de ciudad', body: 'Mostrar un mapa simple de Guatemala o de la comunidad. Preguntar para qué sirven los planos y qué información conviene mostrar o quitar.'},
      {kind: 'exp', label: 'Explorar · 25 min', title: 'Diseño del robot dibujante', body: 'Identificar dos motores, sensor de distancia, ruedas, bola de apoyo y marcador. Discutir por qué el marcador debe quedar al centro del eje de giro.'},
      {kind: 'cre', label: 'Crear · 60-90 min', title: 'Construir, programar y calibrar', body: 'Construir Trazamapas Chapín con la guía. Descargar el programa base. Programar avanzar 5 cm, girar 90 grados, repetir 4 veces y luego dibujar una casa con techo.'},
      {kind: 'ref', label: 'Reflexionar · 15 min', title: 'Del error a la precisión', body: 'Comparar dibujos entre equipos. Identificar si el problema fue mecánico, matemático o de programación. Registrar el ajuste que más mejoró la precisión.'},
    ],
    cnb: [
      'Matemáticas: medidas, geometría, estimación y relaciones entre distancia y rotación.',
      'Ciencias Naturales: máquinas, movimiento, fuerza y observación de causa-efecto.',
      'Comunicación y Lenguaje: explicación oral del algoritmo y de los ajustes realizados.',
      'Productividad y Desarrollo: uso de tecnología para representar y resolver necesidades del entorno.',
    ],
    standards: [
      'CSTA: algoritmos, secuencias y ciclos.',
      'ISTE: diseño innovador y depuración.',
      'NGSS ETS: definir, probar y mejorar una solución.',
    ],
    evaluation: [
      'Calcula o ajusta distancia y giro con evidencia.',
      'Usa bucles para simplificar el programa.',
      'Explica cómo la posición del marcador afecta el resultado.',
    ],
  },
  {
    id: 'm2',
    n: '02',
    slug: 'quetzal-express',
    title: 'Quetzal Express',
    short: 'Carga, ruta y código PIN',
    sessions: '2-3',
    program: '02_Delivery_t.llsp',
    question:
      '¿Cómo diseñamos un robot que entregue un paquete de forma segura en una colonia, aldea o campus escolar?',
    context:
      'El robot simula un servicio de entrega local GuateGeeks: llevar medicina, refacción, libros o materiales a la persona correcta. Trabaja movimiento autónomo, subrutinas, apertura/cierre de compartimento, botones, pantalla del hub y lógica de acceso.',
    concepts: ['Subrutinas', 'Apertura y cierre con motor', 'Secuencias de ruta', 'Botones y PIN', 'Diseño seguro de entrega'],
    phases: [
      {kind: 'act', label: 'Activar · 15 min', title: 'Robots en servicios de entrega', body: 'Conversar sobre pedidos de comida, paquetes y seguridad. ¿Qué problemas reales enfrentaría un robot repartidor en la calle?'},
      {kind: 'exp', label: 'Explorar · 25 min', title: 'Compartimento y mecanismo', body: 'Analizar motor grande, motores medianos, tapa y mecanismo de manivela. Probar manualmente abrir y cerrar sin forzar piezas.'},
      {kind: 'cre', label: 'Crear · 60-90 min', title: 'Ruta con acceso', body: 'Construir Quetzal Express. Crear bloques para abrir, cerrar, girar izquierda, girar derecha y avanzar. Integrar una secuencia de PIN con botones antes de abrir.'},
      {kind: 'ref', label: 'Reflexionar · 15 min', title: 'Seguridad y experiencia de usuario', body: 'Cada grupo explica cómo evitaría entregas equivocadas y qué haría si el robot encuentra un obstáculo.'},
    ],
    cnb: [
      'Matemáticas: patrones, secuencia y comparación de rutas.',
      'Comunicación y Lenguaje: instrucciones claras y explicación de reglas.',
      'Formación Ciudadana: seguridad, responsabilidad y servicios comunitarios.',
      'Productividad y Desarrollo: diseño de soluciones para necesidades locales.',
    ],
    standards: [
      'CSTA: procedimientos y eventos.',
      'ISTE: uso creativo de tecnología para resolver problemas.',
      'NGSS ETS: comparar soluciones según criterios y restricciones.',
    ],
    evaluation: [
      'Divide acciones complejas en subrutinas.',
      'Integra ruta y apertura sin intervención manual.',
      'Justifica reglas de seguridad del sistema.',
    ],
  },
  {
    id: 'm3',
    n: '03',
    slug: 'cargaxela',
    title: 'CargaXela',
    short: 'Precisión, carga y maniobra',
    sessions: '2-3',
    program: '03_ForkLift_t.llsp',
    question:
      '¿Cómo logra un robot mover carga en un mercado, bodega o taller sin chocar ni perder precisión?',
    context:
      'Los estudiantes construyen un montacargas inspirado en bodegas, mercados y talleres guatemaltecos. El módulo trabaja movimiento por centímetros, giros controlados, elevación con motor y maniobras repetibles.',
    concepts: ['Maniobrabilidad', 'Movimiento por distancia', 'Rack y piñón', 'Elevación de carga', 'Prueba de precisión'],
    phases: [
      {kind: 'act', label: 'Activar · 12 min', title: 'Almacenes y logística', body: 'Mostrar imágenes o describir un supermercado/almacén. ¿Por qué un montacargas necesita precisión?'},
      {kind: 'exp', label: 'Explorar · 25 min', title: 'Chasis y horquillas', body: 'Identificar motores de movimiento y motor del manipulador. Revisar cómo la cremallera convierte giro en movimiento vertical.'},
      {kind: 'cre', label: 'Crear · 70-100 min', title: 'Recoger y colocar contenedor', body: 'Construir CargaXela. Programar avance medido, levantar horquillas, acercarse al contenedor, girar y ubicarlo en una zona marcada.'},
      {kind: 'ref', label: 'Reflexionar · 15 min', title: 'Precisión no es suerte', body: 'Medir qué tan lejos quedó la carga del objetivo. Hacer una tabla de intento, error y ajuste.'},
    ],
    cnb: [
      'Matemáticas: medición, estimación, ángulos y registro de datos.',
      'Ciencias Naturales: transferencia de movimiento y mecanismos.',
      'Comunicación y Lenguaje: argumentación de decisiones técnicas.',
      'Productividad y Desarrollo: procesos de trabajo, logística y eficiencia.',
    ],
    standards: ['CSTA: prueba y depuración.', 'ISTE: pensamiento computacional.', 'NGSS ETS: optimización por pruebas.'],
    evaluation: [
      'Programa movimientos medidos y repetibles.',
      'Reconoce relación entre mecanismo y función.',
      'Usa datos de prueba para mejorar.',
    ],
  },
  {
    id: 'm4',
    n: '04',
    slug: 'aquamaya',
    title: 'AquaMaya',
    short: 'Sensor de color y manipulación',
    sessions: '2-3',
    program: '04_Grabber_t.llsp',
    question: '¿Cómo puede un robot ayudar a reparar una tubería de agua sin poner en riesgo a una persona?',
    context:
      'La misión simula reparación de infraestructura de agua en una comunidad guatemalteca. Introduce sensor de color, marcas de referencia, brazo manipulador, agarre y reemplazo de piezas.',
    concepts: ['Sensor de color', 'Marca negra como señal', 'Manipulador y garra', 'Mantenimiento urbano', 'Trabajo colaborativo entre robots'],
    phases: [
      {kind: 'act', label: 'Activar · 12 min', title: 'Infraestructura de agua', body: 'Conversar sobre tuberías, agua potable y riesgos de reparación. ¿Por qué conviene enviar un robot?'},
      {kind: 'exp', label: 'Explorar · 25 min', title: 'Detección y brazo', body: 'Revisar el sensor de color, el motor del brazo y la garra. Probar cómo cambia la lectura con colores distintos.'},
      {kind: 'cre', label: 'Crear · 70-100 min', title: 'Retirar y reemplazar', body: 'Construir AquaMaya. Programar avanzar hasta marca negra, detenerse, tomar pieza dañada, retroceder y colocar nueva pieza.'},
      {kind: 'ref', label: 'Reflexionar · 15 min', title: 'Sensores como decisiones', body: 'Distinguir entre mover por tiempo y mover hasta detectar algo. ¿Cuál es más robusto y por qué?'},
    ],
    cnb: [
      'Ciencias Naturales: recursos, agua, seguridad e impacto de la tecnología.',
      'Matemáticas: condición, comparación y ubicación espacial.',
      'Productividad y Desarrollo: solución de problemas de la comunidad.',
      'Comunicación y Lenguaje: reporte del procedimiento realizado.',
    ],
    standards: ['CSTA: condicionales y sensores.', 'ISTE: diseñador innovador.', 'NGSS ETS: criterios de seguridad y eficiencia.'],
    evaluation: [
      'Usa el sensor como condición de parada.',
      'Coordina movimiento y manipulación.',
      'Explica el valor de la automatización en tareas riesgosas.',
    ],
  },
  {
    id: 'm5',
    n: '05',
    slug: 'grua-ceiba',
    title: 'Grúa Ceiba',
    short: 'Poleas, winch y control',
    sessions: '2-4',
    program: '05_TowerCrane_t.llsp',
    question: '¿Cómo mueve una grúa una carga pesada con precisión y equilibrio en una obra de nuestra ciudad?',
    context:
      'Los estudiantes construyen una grúa de obra GuateGeeks. El módulo une mecánica de poleas, winch, posiciones de motor, control manual y operación autónoma con sensor.',
    concepts: ['Polea fija y móvil', 'Winch y cuerda', 'Posición angular', 'Control manual/autónomo', 'Equilibrio y carga'],
    phases: [
      {kind: 'act', label: 'Activar · 15 min', title: 'Construcción en altura', body: 'Preguntar qué máquinas han visto en construcciones. ¿Qué pasaría si una grúa se mueve sin precisión?'},
      {kind: 'exp', label: 'Explorar · 30 min', title: 'Poleas y carga', body: 'Comparar polea fija y móvil. Observar cómo el winch enrolla cuerda y cómo el brazo gira.'},
      {kind: 'cre', label: 'Crear · 90-120 min', title: 'Mover cargas entre puntos', body: 'Construir Grúa Ceiba. Programar subir/bajar carga, girar brazo y automatizar una transferencia usando posiciones medidas.'},
      {kind: 'ref', label: 'Reflexionar · 15 min', title: 'Fuerza, equilibrio y seguridad', body: 'Discutir por qué la velocidad no siempre es el objetivo. La grúa debe ser estable, predecible y segura.'},
    ],
    cnb: [
      'Ciencias Naturales: fuerza, máquinas simples, poleas y equilibrio.',
      'Matemáticas: grados, medición y proporcionalidad.',
      'Productividad y Desarrollo: seguridad en procesos de construcción.',
      'Comunicación y Lenguaje: explicación técnica oral.',
    ],
    standards: ['NGSS: máquinas simples y diseño de ingeniería.', 'CSTA: eventos y variables.', 'ISTE: prueba sistemática de soluciones.'],
    evaluation: [
      'Relaciona poleas con reducción de esfuerzo.',
      'Usa posiciones de motor para controlar carga.',
      'Prioriza seguridad en el diseño del programa.',
    ],
  },
  {
    id: 'm6',
    n: '06',
    slug: 'volcancito-loader',
    title: 'Volcancito Loader',
    short: 'Giroscopio y dirección',
    sessions: '2-3',
    program: '06_BobCat_t.llsp',
    question: '¿Cómo mantiene su dirección un robot cuando el terreno es irregular, como una calle en reparación o una ladera?',
    context:
      'El minicargador GuateGeeks introduce control de orientación usando yaw/giroscopio. Permite trabajar movimiento recto corregido, giros de 45 grados y pala frontal para pequeñas tareas urbanas o comunitarias.',
    concepts: ['Yaw y orientación', 'Corrección de trayectoria', 'Pala y brazo', 'Centro de gravedad', 'Movimiento en ciudad'],
    phases: [
      {kind: 'act', label: 'Activar · 12 min', title: 'Máquinas pequeñas, grandes problemas', body: 'Listar tareas urbanas donde una máquina grande estorba: aceras, jardinería, nieve, tierra o reparación menor.'},
      {kind: 'exp', label: 'Explorar · 25 min', title: 'Orientación del hub', body: 'Explicar que el hub puede saber si giró. Probar resetear yaw y comparar giros sin corrección y con corrección.'},
      {kind: 'cre', label: 'Crear · 70-100 min', title: 'Ruta con pala', body: 'Construir Volcancito Loader. Programar mantener dirección, avanzar una distancia, girar 45 grados y empujar/transportar un objeto.'},
      {kind: 'ref', label: 'Reflexionar · 15 min', title: 'Control por retroalimentación', body: 'Comparar un programa por tiempo contra uno que mira orientación. ¿Cuál resiste mejor los errores?'},
    ],
    cnb: [
      'Matemáticas: ángulos, dirección, estimación y medición.',
      'Ciencias Naturales: movimiento, fricción y estabilidad.',
      'Productividad y Desarrollo: herramientas para tareas locales.',
      'Comunicación: interpretación de resultados y explicación de pruebas.',
    ],
    standards: ['CSTA: sensores y ciclos de control.', 'ISTE: pensamiento computacional y depuración.', 'NGSS ETS: mejorar con base en evidencia.'],
    evaluation: [
      'Usa orientación para corregir movimiento.',
      'Programa giros medidos.',
      'Documenta al menos dos ciclos de mejora.',
    ],
  },
  {
    id: 'm7',
    n: '07',
    slug: 'brazo-mercado',
    title: 'Brazo Mercado',
    short: 'Color, posiciones y subrutinas',
    sessions: '3-4',
    program: '07_PowerArm_t.llsp',
    question: '¿Cómo decide un robot a dónde llevar productos o paquetes según la información que recibe?',
    context:
      'El robot clasifica paquetes por color como si organizara productos en un mercado, bodega o centro de acopio. Es el módulo más fuerte para condicionales, posiciones angulares, subrutinas y sistemas de clasificación.',
    concepts: ['Clasificación por color', 'Condicionales', 'Subrutinas', 'Posiciones angulares', 'Corrección de error'],
    phases: [
      {kind: 'act', label: 'Activar · 15 min', title: '¿Dónde usamos clasificación?', body: 'Basura reciclable, frutas, paquetes, biblioteca o supermercado. ¿Qué datos usa una persona para clasificar?'},
      {kind: 'exp', label: 'Explorar · 30 min', title: 'Brazo y sensor', body: 'Analizar base fija, garra, motor de elevación, motor de agarre y sensor de color. Calibrar colores antes de programar.'},
      {kind: 'cre', label: 'Crear · 120 min', title: 'Clasificar cuatro colores', body: 'Construir Brazo Mercado. Crear subrutinas: subir, bajar, agarrar, soltar. Leer color y mover a posiciones 45, 135, 225 o 315 grados.'},
      {kind: 'ref', label: 'Reflexionar · 20 min', title: 'Del objeto al dato', body: 'Explicar cómo una señal física se convierte en decisión del programa. Registrar qué color generó más errores y por qué.'},
    ],
    cnb: [
      'Matemáticas: clasificación, patrones, ángulos y tablas de datos.',
      'Ciencias Naturales: sensores y observación sistemática.',
      'Comunicación: explicación de reglas if/then en lenguaje natural.',
      'Productividad y Desarrollo: automatización de procesos repetitivos.',
    ],
    standards: ['CSTA: condicionales, procedimientos y datos.', 'ISTE: soluciones automatizadas.', 'NGSS ETS: pruebas comparativas.'],
    evaluation: [
      'Integra lectura de color con decisiones.',
      'Organiza el programa en subrutinas reutilizables.',
      'Propone manejo de errores de clasificación.',
    ],
  },
  {
    id: 'm8',
    n: '08',
    slug: 'puente-motagua',
    title: 'Puente Motagua',
    short: 'Infraestructura y precisión',
    sessions: '2-4',
    program: '08_BridgeMaster_t.llsp',
    question: '¿Cómo puede un robot construir un puente por etapas para conectar dos comunidades?',
    context:
      'Los estudiantes colocan secciones de puente inspiradas en la necesidad de conectar territorios separados por ríos, barrancos o caminos difíciles. El módulo trabaja transmisión, color como referencia, posiciones de brazo y construcción incremental.',
    concepts: ['Construcción por etapas', 'Sensor de color', 'Transmisión con engranajes cónicos', 'Posiciones de manipulador', 'Medición de avance'],
    phases: [
      {kind: 'act', label: 'Activar · 12 min', title: 'Puentes en la comunidad', body: 'Conversar sobre ríos, barrancos, tráfico y conexión entre lugares. ¿Qué hace que un puente sea importante?'},
      {kind: 'exp', label: 'Explorar · 25 min', title: 'Tracción y brazo', body: 'Observar transmisión 4x4, motor de avance, sensor de color y brazo. Identificar posiciones baja, media y alta.'},
      {kind: 'cre', label: 'Crear · 90-120 min', title: 'Colocar secciones', body: 'Construir Puente Motagua. Medir avance por rotación, detectar inicio/fin con color, colocar sección y regresar por otra.'},
      {kind: 'ref', label: 'Reflexionar · 15 min', title: 'Infraestructura y planificación', body: 'Discutir por qué construir por etapas requiere referencias claras, medición y repetibilidad.'},
    ],
    cnb: [
      'Medio Social y Natural: infraestructura, comunidad y movilidad.',
      'Matemáticas: medición, unidades, comparación y proporcionalidad.',
      'Ciencias Naturales: mecanismos y transmisión.',
      'Productividad y Desarrollo: planificación de procesos técnicos.',
    ],
    standards: ['NGSS ETS: diseñar bajo restricciones.', 'CSTA: automatización por sensores.', 'ISTE: colaboración y prototipado.'],
    evaluation: [
      'Mide distancia por rotación.',
      'Usa posiciones de brazo para una tarea real.',
      'Explica cómo el color sirve como referencia de construcción.',
    ],
  },
  {
    id: 'm9',
    n: '09',
    slug: 'elevador-tikal',
    title: 'Elevador Tikal',
    short: 'Variables, pisos y seguridad',
    sessions: '3-4',
    program: '09_Elevator_t.llsp',
    question: '¿Cómo sabe un elevador dónde está, a dónde debe ir y cuándo abrir sus puertas de forma segura?',
    context:
      'Este módulo introduce sistemas con estado mediante un elevador GuateGeeks para edificios, centros comerciales o bibliotecas escolares: variables de piso actual, piso seleccionado, máximo de pisos, puertas y sensor para referencia inicial.',
    concepts: ['Variables', 'Eventos y mensajes', 'Estado actual vs destino', 'Puertas de seguridad', 'Calibración de piso inicial'],
    phases: [
      {kind: 'act', label: 'Activar · 15 min', title: 'Elevadores reales', body: 'Preguntar qué hace un elevador antes de moverse. ¿Por qué no debe abrir puertas en cualquier momento?'},
      {kind: 'exp', label: 'Explorar · 30 min', title: 'Sistema con memoria', body: 'Identificar winch, puertas, sensor de fuerza y pantalla. Presentar variables: piso, piso actual y piso máximo.'},
      {kind: 'cre', label: 'Crear · 120 min', title: 'Seleccionar y mover entre pisos', body: 'Construir Elevador Tikal. Programar selección con botones, visualización de piso, movimiento calculado y apertura/cierre de puertas.'},
      {kind: 'ref', label: 'Reflexionar · 20 min', title: 'Seguridad y estado', body: 'Analizar qué fallaría si el elevador no recordara el piso actual. Conectar con otros sistemas de la vida diaria.'},
    ],
    cnb: [
      'Matemáticas: enteros, diferencia entre valores y operaciones.',
      'Ciencias Naturales: fuerza, polea y movimiento vertical.',
      'Comunicación: descripción de un sistema con estados.',
      'Productividad y Desarrollo: seguridad en sistemas automatizados.',
    ],
    standards: ['CSTA: variables, eventos y mensajes.', 'ISTE: pensamiento computacional avanzado.', 'NGSS ETS: seguridad como restricción de diseño.'],
    evaluation: [
      'Usa variables para representar estado.',
      'Integra botones, pantalla, motor y puertas.',
      'Explica riesgos y medidas de seguridad.',
    ],
  },
  {
    id: 'm10',
    n: '10',
    slug: 'aurora-movil',
    title: 'Aurora Móvil',
    short: 'Rutas por color y orientación',
    sessions: '2-4',
    program: '10_CityCar_t.llsp',
    question: '¿Cómo puede un vehículo decidir su ruta leyendo señales del entorno de una ciudad guatemalteca?',
    context:
      'Aurora Móvil usa marcadores de color para girar, avanzar, ir a estación de carga o detenerse. Integra sensor de color, mensajes y orientación para imaginar movilidad urbana más limpia y ordenada.',
    concepts: ['Navegación autónoma', 'Marcadores de color', 'Mensajes', 'Giros por yaw', 'Diseño de rutas urbanas'],
    phases: [
      {kind: 'act', label: 'Activar · 15 min', title: 'Autos y tráfico', body: 'Discutir tráfico, vehículos pequeños, energía limpia y señales. ¿Qué información necesita un carro autónomo?'},
      {kind: 'exp', label: 'Explorar · 25 min', title: 'Marcadores y decisiones', body: 'Asignar significado a colores: azul derecha, morado izquierda, verde carga, rojo alto. Probar lectura antes de la ruta.'},
      {kind: 'cre', label: 'Crear · 90-120 min', title: 'Circuito urbano', body: 'Construir Aurora Móvil. Crear mensajes para cada color. Programar avance continuo, detección y acción correspondiente.'},
      {kind: 'ref', label: 'Reflexionar · 15 min', title: 'Comunicación entre vehículos', body: 'Imaginar cómo varios Aurora Móvil compartirían información para evitar choques.'},
    ],
    cnb: [
      'Formación Ciudadana: movilidad, seguridad vial y convivencia.',
      'Matemáticas: orientación, secuencias y ángulos.',
      'Ciencias Naturales: energía, sensores y movimiento.',
      'Productividad y Desarrollo: soluciones para transporte urbano.',
    ],
    standards: ['CSTA: eventos, mensajes y condicionales.', 'ISTE: ciudadanía digital y diseño.', 'NGSS ETS: sistemas de transporte.'],
    evaluation: [
      'Mapea colores a acciones correctas.',
      'Programa una ruta autónoma verificable.',
      'Explica cómo señales del entorno cambian decisiones.',
    ],
  },
  {
    id: 'm11',
    n: '11',
    slug: 'bombero-volcan',
    title: 'Bombero Volcán',
    short: 'Búsqueda, sensor y rescate',
    sessions: '2-4',
    program: '11_FireTamer_t.llsp',
    question: '¿Cómo puede un robot ayudar en una emergencia sin exponer a una persona al peligro?',
    context:
      'Bombero Volcán entra a una casa, detecta distancia, eleva un brazo con sensor de color para localizar fuego y ejecuta una acción de neutralización o rescate. El módulo conecta tecnología con prevención y cuidado comunitario.',
    concepts: ['Robótica de emergencia', 'Sensor de distancia', 'Brazo con paralelogramo', 'Detección de color', 'Ruta más corta y rescate'],
    phases: [
      {kind: 'act', label: 'Activar · 15 min', title: 'Emergencias y seguridad', body: 'Ubicar el extintor más cercano del aula. Conversar sobre por qué los robots no reemplazan bomberos, pero sí reducen riesgo.'},
      {kind: 'exp', label: 'Explorar · 30 min', title: 'Entrada, búsqueda y brazo', body: 'Revisar sensor ultrasónico, brazo elevador y sensor de color. Probar niveles de altura y detección de llama.'},
      {kind: 'cre', label: 'Crear · 90-120 min', title: 'Buscar y neutralizar', body: 'Construir Bombero Volcán. Programar entrada hasta distancia, búsqueda de color, detener brazo en llama y ejecutar acción de apagar/rescatar.'},
      {kind: 'ref', label: 'Reflexionar · 15 min', title: 'Tecnología con propósito humano', body: 'Cada grupo identifica una tarea peligrosa de Guatemala donde un robot podría ayudar.'},
    ],
    cnb: [
      'Ciencias Naturales: prevención de riesgos, fuego, seguridad y tecnología.',
      'Formación Ciudadana: cuidado de la vida y comunidad.',
      'Matemáticas: altura, distancia y comparación.',
      'Comunicación: presentación de una solución de emergencia.',
    ],
    standards: ['NGSS ETS: diseñar soluciones seguras.', 'CSTA: sensores, condiciones y procedimientos.', 'ISTE: tecnología para impacto social.'],
    evaluation: [
      'Integra distancia y color en una misión.',
      'Secuencia búsqueda, detección y acción.',
      'Explica el valor social del robot.',
    ],
  },
  {
    id: 'm12',
    n: '12',
    slug: 'rueda-feria-chapina',
    title: 'Rueda de Feria Chapina',
    short: 'Velocidad, variable y parada',
    sessions: '2-3',
    program: '12_DaisyWheel_t.llsp',
    question: '¿Cómo diseñamos una atracción de feria divertida que también sea segura?',
    context:
      'El cierre técnico convierte el carrusel en una atracción de feria chapina. Trabaja control de velocidad, inclinación, aceleración suave, variables, programas paralelos y parada de emergencia.',
    concepts: ['Aceleración suave', 'Variable velocidad', 'Control paralelo', 'Inclinación por motor', 'Parada de emergencia'],
    phases: [
      {kind: 'act', label: 'Activar · 12 min', title: 'Diversión y seguridad', body: 'Preguntar qué hace seguro un juego mecánico. ¿Por qué no debe arrancar ni detenerse de golpe?'},
      {kind: 'exp', label: 'Explorar · 25 min', title: 'Motores y controles', body: 'Identificar motor de giro, motor de inclinación, botones del hub y sensor de fuerza. Definir límites seguros.'},
      {kind: 'cre', label: 'Crear · 70-100 min', title: 'Modo manual y autónomo', body: 'Construir Rueda de Feria Chapina. Programar incremento gradual de velocidad, control de inclinación y parada de emergencia.'},
      {kind: 'ref', label: 'Reflexionar · 20 min', title: 'Showcase de ingeniería', body: 'Presentar la máquina explicando qué programa corre en paralelo, qué variable controla y cómo se protege al usuario.'},
    ],
    cnb: [
      'Ciencias Naturales: fuerza, movimiento circular y seguridad.',
      'Matemáticas: variables, incremento, decremento y rangos.',
      'Comunicación: presentación técnica final.',
      'Expresión Artística: diseño de experiencia y estética del carrusel.',
    ],
    standards: ['CSTA: variables, ciclos y concurrencia básica.', 'ISTE: creatividad y comunicación.', 'NGSS ETS: criterios de seguridad y mejora.'],
    evaluation: [
      'Usa variable para controlar velocidad.',
      'Implementa parada segura.',
      'Describe programas paralelos y función de cada uno.',
    ],
  },
];

/** Lookup a module by its id (e.g. "m1"). Throws if not found. */
export function getModule(id: string): Module {
  const found = modules.find((m) => m.id === id);
  if (!found) {
    throw new Error(`CiudadBots: no existe el módulo con id "${id}".`);
  }
  return found;
}
