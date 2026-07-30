import React, {useEffect, useRef, useState} from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';
import useBaseUrl from '@docusaurus/useBaseUrl';
import {translate} from '@docusaurus/Translate';
import styles from './styles.module.css';

/**
 * Pinned CDN version. Never use a floating tag: with `@latest` the viewer would
 * break the day three.js ships a breaking change, without anyone touching this
 * repository.
 *
 * esm.sh specifically, because `STLLoader.js` imports three with a bare
 * specifier (`from 'three'`) that a browser cannot resolve without an import
 * map. esm.sh rewrites it to an absolute path; unpkg and raw jsdelivr do not.
 * See design decision D2.
 */
const THREE_CDN = 'https://esm.sh/three@0.160.1';

interface StlViewerProps {
  /** File name under static/models/guategeeks/, e.g. "chassis_sl.stl". */
  file: string;
  /** Human name shown as the block title. */
  name: string;
  /** What the part does in the robot. */
  role: string;
  /** How many units the build needs. */
  quantity: number;
  /** Approximate transfer size, shown so a docent can plan a print session. */
  size: string;
}

function Viewer({file, name, role, quantity, size}: StlViewerProps): React.JSX.Element {
  const mountRef = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<'idle' | 'loading' | 'ready' | 'failed'>('idle');
  const href = useBaseUrl(`/models/guategeeks/${file}`);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) {
      return undefined;
    }

    let cancelled = false;
    let cleanup: (() => void) | undefined;

    // The viewer is always visible — no click required — but the network cost
    // is deferred until the block is actually reached, so a page carrying
    // several viewers does not request every model at once. See D3.
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) {
          return;
        }
        observer.disconnect();
        setState('loading');

        (async () => {
          try {
            const [THREE, {STLLoader}] = await Promise.all([
              import(/* webpackIgnore: true */ THREE_CDN),
              import(/* webpackIgnore: true */ `${THREE_CDN}/examples/jsm/loaders/STLLoader.js`),
            ]);
            if (cancelled || !mountRef.current) {
              return;
            }

            const width = mount.clientWidth || 480;
            const height = 320;

            const scene = new THREE.Scene();
            const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 2000);
            const renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
            renderer.setSize(width, height);
            mount.appendChild(renderer.domElement);

            scene.add(new THREE.AmbientLight(0xffffff, 0.6));
            const key = new THREE.DirectionalLight(0xffffff, 1.1);
            key.position.set(1, 1, 1);
            scene.add(key);
            const fill = new THREE.DirectionalLight(0xffffff, 0.4);
            fill.position.set(-1, -0.5, -1);
            scene.add(fill);

            const geometry = await new Promise<any>((resolve, reject) => {
              new STLLoader().load(href, resolve, undefined, reject);
            });
            if (cancelled || !mountRef.current) {
              return;
            }

            // Centre the part and frame it: the models arrive in printer
            // coordinates, so their origin is not the centre of mass.
            geometry.center();
            geometry.computeBoundingSphere();
            const radius = geometry.boundingSphere?.radius ?? 50;

            const mesh = new THREE.Mesh(
              geometry,
              new THREE.MeshStandardMaterial({color: 0x4a90d9, roughness: 0.55, metalness: 0.1}),
            );
            scene.add(mesh);

            camera.position.set(radius * 1.6, radius * 1.2, radius * 1.9);
            camera.lookAt(0, 0, 0);

            setState('ready');

            let frame = 0;
            const tick = () => {
              frame = requestAnimationFrame(tick);
              mesh.rotation.z += 0.004;
              renderer.render(scene, camera);
            };
            tick();

            const onResize = () => {
              const w = mount.clientWidth || width;
              camera.aspect = w / height;
              camera.updateProjectionMatrix();
              renderer.setSize(w, height);
            };
            window.addEventListener('resize', onResize);

            cleanup = () => {
              cancelAnimationFrame(frame);
              window.removeEventListener('resize', onResize);
              geometry.dispose();
              mesh.material.dispose();
              renderer.dispose();
              renderer.domElement.remove();
            };
          } catch {
            // WebGL unavailable, CDN unreachable, or the model failed to parse.
            // The block degrades to name, size and download link; the download
            // never depended on the viewer. See D3.
            if (!cancelled) {
              setState('failed');
            }
          }
        })();
      },
      {rootMargin: '200px'},
    );

    observer.observe(mount);

    return () => {
      cancelled = true;
      observer.disconnect();
      cleanup?.();
    };
  }, [href]);

  return (
    <div className={styles.block}>
      <div className={styles.header}>
        <div>
          <strong className={styles.name}>{name}</strong>
          <span className={styles.role}>{role}</span>
        </div>
        <span className={styles.qty}>
          {translate({id: 'guategeeks.stl.quantity', message: '×{n} a imprimir'}, {n: quantity})}
        </span>
      </div>

      <div className={styles.stage} ref={mountRef}>
        {state === 'loading' && (
          <span className={styles.status}>
            {translate({id: 'guategeeks.stl.loading', message: 'Cargando modelo…'})}
          </span>
        )}
        {state === 'failed' && (
          <span className={styles.status}>
            {translate({
              id: 'guategeeks.stl.failed',
              message: 'No se pudo mostrar el modelo en este navegador. La descarga sigue disponible.',
            })}
          </span>
        )}
      </div>

      <div className={styles.actions}>
        <span className={styles.meta}>
          {file} · {size} · CC BY-NC-SA, Kevin Thomas
        </span>
        <a className={styles.download} href={href} download>
          {translate({id: 'guategeeks.stl.download', message: 'Descargar STL'})}
        </a>
      </div>
    </div>
  );
}

/**
 * Shows one adopted SMARS model and offers it for download.
 *
 * The same static file feeds the viewer and the download link, and no
 * converted or simplified variant is ever produced: a decimated mesh would be
 * a derivative work inheriting the models' CC BY-NC-SA ShareAlike condition.
 * See design decision D1.
 */
export default function StlViewer(props: StlViewerProps): React.JSX.Element {
  return (
    <BrowserOnly
      fallback={
        <div className={styles.block}>
          <div className={styles.header}>
            <strong className={styles.name}>{props.name}</strong>
          </div>
        </div>
      }>
      {() => <Viewer {...props} />}
    </BrowserOnly>
  );
}
