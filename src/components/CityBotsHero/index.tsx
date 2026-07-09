import React, {useEffect, useRef} from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';
import Translate, {translate} from '@docusaurus/Translate';
import styles from './styles.module.css';

/**
 * Client-only three.js hero. The canvas is built inside a BrowserOnly boundary
 * and `three` is imported dynamically inside the effect, so the module never
 * loads WebGL/browser APIs during SSR or the production build.
 */
function HeroCanvas(): JSX.Element {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) {
      return undefined;
    }
    let cleanup: (() => void) | undefined;
    let cancelled = false;

    (async () => {
      const THREE = await import('three');
      if (cancelled || !mountRef.current) {
        return;
      }

      const width = mount.clientWidth || 520;
      const height = mount.clientHeight || 420;
      const scene = new THREE.Scene();
      scene.fog = new THREE.Fog(0x232834, 10, 28);

      const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
      camera.position.set(6.5, 6.8, 9.4);
      camera.lookAt(0, 0.4, 0);

      const renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.8));
      renderer.setSize(width, height);
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      mount.appendChild(renderer.domElement);

      const ambient = new THREE.AmbientLight(0xffffff, 0.9);
      const key = new THREE.DirectionalLight(0xffc7a8, 1.7);
      key.position.set(7, 10, 6);
      const fill = new THREE.DirectionalLight(0x5fbad6, 0.85);
      fill.position.set(-6, 5, -3);
      scene.add(ambient, key, fill);

      const city = new THREE.Group();
      scene.add(city);

      const ground = new THREE.Mesh(
        new THREE.CylinderGeometry(5.4, 6.2, 0.5, 48),
        new THREE.MeshStandardMaterial({color: 0x2a3040, metalness: 0.35, roughness: 0.84}),
      );
      ground.position.y = -0.42;
      city.add(ground);

      const road = new THREE.Mesh(
        new THREE.TorusGeometry(3.35, 0.34, 18, 80),
        new THREE.MeshStandardMaterial({color: 0x1d212d, metalness: 0.12, roughness: 0.95}),
      );
      road.rotation.x = Math.PI / 2;
      road.position.y = -0.12;
      city.add(road);

      const roadGlow = new THREE.Mesh(
        new THREE.TorusGeometry(3.36, 0.06, 10, 80),
        new THREE.MeshBasicMaterial({color: 0xf09d77, transparent: true, opacity: 0.9}),
      );
      roadGlow.rotation.x = Math.PI / 2;
      roadGlow.position.y = -0.08;
      city.add(roadGlow);

      const baseBlockGeo = new THREE.BoxGeometry(0.9, 1, 0.9);
      const blockColors = [0xf0a07c, 0x5fbad6, 0xb8d289, 0x516884];
      const blocks: import('three').Mesh[] = [];
      for (let i = 0; i < 14; i += 1) {
        const h = 0.8 + (i % 4) * 0.45 + (i % 3) * 0.18;
        const material = new THREE.MeshStandardMaterial({
          color: blockColors[i % blockColors.length],
          metalness: 0.2,
          roughness: 0.78,
        });
        const mesh = new THREE.Mesh(baseBlockGeo, material);
        const angle = (i / 14) * Math.PI * 2;
        const radius = 1.65 + (i % 2) * 1.05;
        mesh.position.set(Math.cos(angle) * radius, h / 2 - 0.12, Math.sin(angle) * radius);
        mesh.scale.y = h;
        city.add(mesh);
        blocks.push(mesh);
      }

      const beaconGeo = new THREE.CylinderGeometry(0.06, 0.06, 1.4, 12);
      const beaconMat = new THREE.MeshStandardMaterial({
        color: 0x8dd0e4,
        emissive: 0x3fa0bf,
        emissiveIntensity: 1.4,
      });
      for (let i = 0; i < 4; i += 1) {
        const pole = new THREE.Mesh(beaconGeo, beaconMat);
        const a = (i / 4) * Math.PI * 2 + 0.35;
        pole.position.set(Math.cos(a) * 2.25, 0.36, Math.sin(a) * 2.25);
        city.add(pole);
      }

      const robot = new THREE.Group();
      const body = new THREE.Mesh(
        new THREE.BoxGeometry(0.9, 0.45, 1.15),
        new THREE.MeshStandardMaterial({color: 0xf4f4f6, metalness: 0.15, roughness: 0.82}),
      );
      const shell = new THREE.Mesh(
        new THREE.BoxGeometry(0.68, 0.32, 0.8),
        new THREE.MeshStandardMaterial({color: 0x3fa0bf, metalness: 0.18, roughness: 0.55}),
      );
      shell.position.y = 0.18;
      const head = new THREE.Mesh(
        new THREE.BoxGeometry(0.62, 0.4, 0.42),
        new THREE.MeshStandardMaterial({color: 0x1f2431, metalness: 0.22, roughness: 0.58}),
      );
      head.position.set(0, 0.38, 0.18);
      const eyeGeo = new THREE.SphereGeometry(0.06, 16, 16);
      const eyeMat = new THREE.MeshBasicMaterial({color: 0xf0a07c});
      const eyeL = new THREE.Mesh(eyeGeo, eyeMat);
      const eyeR = new THREE.Mesh(eyeGeo, eyeMat);
      eyeL.position.set(-0.12, 0.38, 0.41);
      eyeR.position.set(0.12, 0.38, 0.41);
      const wheelGeo = new THREE.CylinderGeometry(0.15, 0.15, 0.08, 18);
      const wheelMat = new THREE.MeshStandardMaterial({color: 0x20232d, metalness: 0.3, roughness: 0.6});
      const wheels = [-0.32, 0.32].map((x) => {
        const wheel = new THREE.Mesh(wheelGeo, wheelMat);
        wheel.rotation.z = Math.PI / 2;
        wheel.position.set(x, -0.14, 0);
        return wheel;
      });
      robot.add(body, shell, head, eyeL, eyeR, ...wheels);
      robot.position.y = 0.02;
      city.add(robot);

      const curve = new THREE.CatmullRomCurve3(
        [
          new THREE.Vector3(3.35, 0.12, 0),
          new THREE.Vector3(2.15, 0.12, 2.2),
          new THREE.Vector3(0, 0.12, 3.35),
          new THREE.Vector3(-2.4, 0.12, 2.2),
          new THREE.Vector3(-3.35, 0.12, 0),
          new THREE.Vector3(-2.2, 0.12, -2.25),
          new THREE.Vector3(0, 0.12, -3.35),
          new THREE.Vector3(2.25, 0.12, -2.15),
          new THREE.Vector3(3.35, 0.12, 0),
        ],
        true,
      );

      const pathLine = new THREE.Line(
        new THREE.BufferGeometry().setFromPoints(curve.getPoints(160)),
        new THREE.LineBasicMaterial({color: 0x8dd0e4, transparent: true, opacity: 0.48}),
      );
      pathLine.position.y = 0.02;
      city.add(pathLine);

      const orb = new THREE.Mesh(
        new THREE.SphereGeometry(0.12, 18, 18),
        new THREE.MeshBasicMaterial({color: 0xf0a07c}),
      );
      city.add(orb);

      const halo = new THREE.Mesh(
        new THREE.RingGeometry(0.18, 0.24, 32),
        new THREE.MeshBasicMaterial({
          color: 0xf0a07c,
          transparent: true,
          opacity: 0.8,
          side: THREE.DoubleSide,
        }),
      );
      halo.rotation.x = -Math.PI / 2;
      city.add(halo);

      let frameId = 0;
      const clock = new THREE.Clock();

      const animate = () => {
        const t = clock.getElapsedTime();
        city.rotation.y = Math.sin(t * 0.22) * 0.16 - 0.26;
        city.rotation.x = -0.07 + Math.sin(t * 0.18) * 0.02;
        blocks.forEach((block, index) => {
          block.position.y = block.scale.y / 2 - 0.12 + Math.sin(t * 1.2 + index * 0.7) * 0.035;
        });

        const progress = (t * 0.08) % 1;
        const pos = curve.getPointAt(progress);
        const tangent = curve.getTangentAt(progress);
        robot.position.copy(pos);
        robot.position.y += 0.18;
        robot.rotation.y = Math.atan2(tangent.x, tangent.z);
        robot.rotation.z = Math.sin(t * 2.6) * 0.04;
        orb.position.copy(pos);
        orb.position.y += 0.36;
        halo.position.copy(pos);
        halo.position.y += 0.04;
        halo.scale.setScalar(1 + Math.sin(t * 3.2) * 0.08);
        (halo.material as import('three').MeshBasicMaterial).opacity =
          0.55 + Math.sin(t * 3.2) * 0.18;

        renderer.render(scene, camera);
        frameId = requestAnimationFrame(animate);
      };

      const resize = () => {
        const w = mount.clientWidth || width;
        const h = mount.clientHeight || height;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      };

      window.addEventListener('resize', resize, {passive: true});
      animate();

      cleanup = () => {
        cancelAnimationFrame(frameId);
        window.removeEventListener('resize', resize);
        renderer.dispose();
        if (renderer.domElement.parentNode === mount) {
          mount.removeChild(renderer.domElement);
        }
      };
    })();

    return () => {
      cancelled = true;
      if (cleanup) {
        cleanup();
      }
    };
  }, []);

  return (
    <div
      className={styles.canvas}
      ref={mountRef}
      aria-label={translate({id: 'ciudadbots.hero.canvasAriaLabel', message: 'Escena 3D de CiudadBots'})}
    />
  );
}

export default function CityBotsHero(): JSX.Element {
  return (
    <BrowserOnly
      fallback={
        <div className={styles.fallback}>
          <Translate id="ciudadbots.hero.fallback">
            Vista conceptual de CiudadBots. Si la escena 3D no carga en este navegador, el
            contenido del programa sigue funcionando completo.
          </Translate>
        </div>
      }>
      {() => <HeroCanvas />}
    </BrowserOnly>
  );
}
