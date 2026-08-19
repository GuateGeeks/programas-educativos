import React, {useState} from 'react';
import StlViewer from '@site/src/components/StlViewer';
import styles from './styles.module.css';

type GalleryMode = 'visual' | 'stl';

const visualReferences = [
  {
    image: '/assets/guategeeks/smars/heroshot.jpg',
    alt: 'Robot SMARS completo para identificar chasis, orugas, Arduino, shield, sensor y batería',
    title: 'Robot completo',
    body: 'Separa con colores lo mecánico, lo eléctrico y lo lógico. El sensor ultrasónico y las orugas son fáciles de ubicar; el punto importante es explicar por qué el Arduino no alimenta los motores directamente.',
  },
  {
    image: '/assets/guategeeks/smars/set-arduino.webp',
    alt: 'Arduino montado en el chasis Curiosity antes de colocar o revisar el shield',
    title: 'Controlador sobre el chasis',
    body: 'Observa dónde se apoya el Arduino y qué espacio queda para el shield y la batería. Esa posición ayuda a distinguir la estructura mecánica de la capa lógica del robot.',
  },
  {
    image: '/assets/guategeeks/smars/printed-parts.webp',
    alt: 'Piezas impresas del chasis Curiosity antes del ensamblaje',
    title: 'Piezas antes del ensamblaje',
    body: 'Compara las piezas impresas con el catálogo, verifica que no falten componentes y prepara una clasificación para el montaje.',
  },
];

const stlModels = [
  ['chassis_sl.stl', 'Chasis', 'Estructura principal; aloja el Arduino y el driver', 1, '1.8 MB'],
  ['powered_wheel.stl', 'Rueda motriz', 'Se acopla al eje del motorreductor N20', 2, '1.9 MB'],
  ['unpowered_wheel_sl.stl', 'Rueda libre', 'Tensa la oruga en el extremo opuesto al motor', 2, '1.1 MB'],
  ['mechanical_track.stl', 'Eslabón de oruga', 'Se encadena con segmentos de filamento para formar la oruga', 32, '142 KB'],
  ['holding_board_9v.stl', 'Soporte de motores y batería', 'Fija los dos N20 y el portapilas al chasis', 1, '176 KB'],
  ['ultrasonic_1.stl', 'Cubierta del sensor', 'Carcasa frontal del HC-SR04', 1, '697 KB'],
  ['ultrasonic_2b_v2.stl', 'Base del sensor', 'Sujeta el HC-SR04 al frente del chasis', 1, '30 KB'],
] as const;

export default function ResourceGallery(): React.JSX.Element {
  const [mode, setMode] = useState<GalleryMode>('visual');
  const [index, setIndex] = useState(0);
  const total = mode === 'visual' ? visualReferences.length : stlModels.length;
  const previous = () => setIndex((current) => (current - 1 + total) % total);
  const next = () => setIndex((current) => (current + 1) % total);

  const changeMode = (nextMode: GalleryMode) => {
    setMode(nextMode);
    setIndex(0);
  };

  return (
    <div className={styles.gallery}>
      <div className={styles.galleryHeader}>
        <div>
          <h3>Material visual del programa</h3>
          <p>Explora una referencia a la vez y prepara solo lo que corresponde a esta etapa.</p>
        </div>
        <div className={styles.modeTabs} role="tablist" aria-label="Tipo de recurso">
          <button type="button" role="tab" aria-selected={mode === 'visual'} className={mode === 'visual' ? styles.activeTab : ''} onClick={() => changeMode('visual')}>
            Referencias visuales
          </button>
          <button type="button" role="tab" aria-selected={mode === 'stl'} className={mode === 'stl' ? styles.activeTab : ''} onClick={() => changeMode('stl')}>
            Modelos STL
          </button>
        </div>
      </div>

      {mode === 'visual' ? (
        <div className={styles.visualSlide}>
          <img src={visualReferences[index].image} alt={visualReferences[index].alt} />
          <div className={styles.slideCopy}>
            <span className={styles.counter}>Imagen {index + 1} / {total}</span>
            <h4>{visualReferences[index].title}</h4>
            <p>{visualReferences[index].body}</p>
          </div>
        </div>
      ) : (
        <div className={styles.stlSlide}>
          <StlViewer file={stlModels[index][0]} name={stlModels[index][1]} role={stlModels[index][2]} quantity={stlModels[index][3]} size={stlModels[index][4]} />
        </div>
      )}

      <div className={styles.controls}>
        <button type="button" onClick={previous} aria-label="Recurso anterior">Anterior</button>
        <span>{index + 1} / {total}</span>
        <button type="button" onClick={next} aria-label="Recurso siguiente">Siguiente</button>
      </div>
    </div>
  );
}
