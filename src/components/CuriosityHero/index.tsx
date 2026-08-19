import React, {useState} from 'react';
import Link from '@docusaurus/Link';
import StlViewer from '@site/src/components/StlViewer';
import styles from './styles.module.css';

const focusAreas = [
  {
    id: 'estructura',
    label: 'Estructura',
    text: 'El chasis sostiene el Arduino, el driver, la batería y los elementos que permiten que el robot avance.',
  },
  {
    id: 'energia',
    label: 'Energía',
    text: 'La alimentación y la distribución de energía se revisan antes de conectar el sistema y comenzar las pruebas.',
  },
  {
    id: 'autonomia',
    label: 'Autonomía',
    text: 'Sensores, motores y código se integran para que Curiosity pueda interpretar el entorno y tomar decisiones.',
  },
];

export default function CuriosityHero(): React.JSX.Element {
  const [activeArea, setActiveArea] = useState(focusAreas[0]);

  return (
    <section className={styles.hero} aria-labelledby="curiosity-hero-title">
      <div className={styles.visualColumn}>
        <div className={styles.visualHeader}>
          <span className={styles.kicker}>Exploración 3D</span>
          <span className={styles.counter}>Modelo 1 / 1</span>
        </div>
        <div className={styles.viewer}>
          <StlViewer
            file="chassis_sl.stl"
            name="Chasis Curiosity"
            role="Modelo 3D de la estructura principal"
            quantity={1}
            size="1.8 MB"
          />
        </div>
        <p className={styles.caption}>
          Explora la estructura que sostiene el robot y úsala como referencia antes de revisar los
          demás componentes.
        </p>
      </div>

      <div className={styles.content}>
        <p className={styles.eyebrow}>GuateGeeks · Programa de robótica</p>
        <h2 id="curiosity-hero-title">Curiosity</h2>
        <p className={styles.lead}>Construcción y control de un robot autónomo</p>
        <p>
          Una ruta de aprendizaje para que estudiantes de 4.º, 5.º y 6.º bachillerato diseñen,
          construyan, programen, midan y comuniquen una solución tecnológica.
        </p>

        <div className={styles.focus}>
          <div className={styles.focusTabs} role="tablist" aria-label="Partes del proyecto">
            {focusAreas.map((area) => (
              <button
                key={area.id}
                type="button"
                role="tab"
                aria-selected={activeArea.id === area.id}
                className={activeArea.id === area.id ? styles.activeTab : styles.tab}
                onClick={() => setActiveArea(area)}>
                {area.label}
              </button>
            ))}
          </div>
          <p className={styles.focusText}>{activeArea.text}</p>
        </div>

        <div className={styles.actions}>
          <Link className={styles.primaryAction} to="/guategeeks/materiales">
            Explorar materiales
          </Link>
          <Link className={styles.secondaryAction} to="/guategeeks/sistemas-del-robot">
            Comenzar ruta
          </Link>
        </div>
      </div>
    </section>
  );
}
