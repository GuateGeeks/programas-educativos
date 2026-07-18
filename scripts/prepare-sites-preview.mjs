import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const distDir = path.join(root, 'dist');
const hostingFile = path.join(root, '.openai', 'hosting.json');

fs.rmSync(distDir, {recursive: true, force: true});
fs.mkdirSync(path.join(distDir, '.openai'), {recursive: true});
fs.mkdirSync(path.join(distDir, 'server'), {recursive: true});
fs.copyFileSync(hostingFile, path.join(distDir, '.openai', 'hosting.json'));

const html = `<!doctype html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>GuateGeeks - Programas Educativos Preview</title>
  <style>
    :root { color-scheme: light; font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; }
    body { margin: 0; background: #f6f8fb; color: #18202f; }
    a { color: inherit; }
    .shell { max-width: 1120px; margin: 0 auto; padding: 28px 20px 56px; }
    .hero { display: grid; grid-template-columns: minmax(0, 1.35fr) minmax(280px, .65fr); gap: 28px; align-items: stretch; padding: 42px; background: #222736; color: #fff; border-radius: 12px; }
    .eyebrow, .kicker { color: #35a7c9; font-weight: 800; text-transform: uppercase; font-size: 12px; letter-spacing: .08em; }
    h1 { font-size: clamp(34px, 5vw, 64px); line-height: .98; margin: 16px 0; }
    h2 { font-size: clamp(26px, 3vw, 38px); line-height: 1.05; margin: 10px 0 18px; }
    h3 { margin: 0 0 10px; font-size: 20px; }
    p { color: #4b5565; line-height: 1.62; }
    .hero p { color: #dfe8f3; font-size: 19px; }
    .actions { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 22px; }
    .btn { display: inline-flex; align-items: center; justify-content: center; min-height: 44px; padding: 0 18px; border-radius: 8px; font-weight: 800; text-decoration: none; }
    .primary { background: #ff6f61; color: #fff; }
    .secondary { border: 1px solid rgba(255,255,255,.35); color: #fff; }
    .panel { display: grid; gap: 12px; }
    .metric { background: rgba(255,255,255,.09); border: 1px solid rgba(255,255,255,.16); border-radius: 8px; padding: 18px; }
    .metric strong { display: block; font-size: 34px; }
    section { margin-top: 44px; }
    .grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 16px; }
    .grid4 { grid-template-columns: repeat(4, minmax(0, 1fr)); }
    .card, .band { background: #fff; border: 1px solid #dce3ee; border-radius: 8px; padding: 22px; box-shadow: 0 12px 30px rgba(27,39,61,.06); }
    .featured { border: 2px solid #35a7c9; }
    .badge { display: inline-flex; margin-bottom: 14px; padding: 6px 10px; border-radius: 999px; background: #e8f6fb; color: #186d86; font-size: 12px; font-weight: 800; }
    .product { display: grid; grid-template-columns: minmax(0, 1.1fr) minmax(280px, .9fr); gap: 24px; background: #0f766e; color: #fff; border-radius: 12px; padding: 34px; }
    .product p { color: #e6fffb; }
    .list { display: grid; gap: 12px; }
    .list span { display: block; border: 1px solid rgba(255,255,255,.22); border-radius: 8px; padding: 14px; background: rgba(255,255,255,.1); font-weight: 700; }
    .split { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 18px; }
    ul { padding-left: 20px; line-height: 1.7; color: #4b5565; }
    .cta { text-align: center; background: #222736; color: #fff; border-radius: 12px; padding: 38px 24px; }
    .cta p { color: #dfe8f3; max-width: 720px; margin: 0 auto; }
    .cta .actions { justify-content: center; }
    .note { margin: 18px 0 0; font-size: 13px; color: #6b7280; }
    @media (max-width: 860px) { .hero, .product, .split, .grid, .grid4 { grid-template-columns: 1fr; } .hero { padding: 28px; } }
  </style>
</head>
<body>
  <main class="shell">
    <section class="hero">
      <div>
        <div class="eyebrow">GuateGeeks - Programas Educativos</div>
        <h1>Programas de tecnologia aplicada listos para implementar en el aula</h1>
        <p>Ayudamos a instituciones educativas a convertir tecnologia emergente en aprendizaje visible: contenido listo, guia docente, vista estudiante, evidencia, showcase y equipo fisico opcional.</p>
        <div class="actions">
          <a class="btn primary" href="mailto:info@guategeeks.com?subject=Demo%20GuateGeeks%20Programas%20Educativos">Solicitar demo</a>
          <a class="btn secondary" href="#ciudadbots">Explorar CiudadBots</a>
        </div>
      </div>
      <div class="panel">
        <div class="metric"><strong>12</strong> misiones CiudadBots</div>
        <div class="metric"><strong>3</strong> niveles de crecimiento</div>
        <div class="metric"><strong>Evidencia</strong> para direccion y familias</div>
      </div>
    </section>

    <section>
      <div class="kicker">El problema real</div>
      <h2>La innovacion educativa no se sostiene solo comprando equipo</h2>
      <div class="grid">
        <article class="card"><h3>Las instituciones quieren diferenciarse</h3><p>Necesitan programas visibles, modernos y defendibles frente a familias, aliados y comunidad educativa.</p></article>
        <article class="card"><h3>Los docentes necesitan estructura</h3><p>No basta con entregar kits. Hace falta una ruta clara, recursos listos y soporte para implementar sin sobrecarga.</p></article>
        <article class="card"><h3>La direccion necesita evidencia</h3><p>Cada ciclo debe terminar con productos, rubricas, aprendizajes visibles y una recomendacion de siguiente paso.</p></article>
      </div>
    </section>

    <section>
      <div class="kicker">Ruta GuateGeeks</div>
      <h2>Tres niveles para empezar pequeno y crecer con evidencia</h2>
      <div class="grid">
        <article class="card"><span class="badge">Concepto validable</span><h3>Exploradores</h3><p>Primer contacto con tecnologia aplicada para colegios que quieren probar con bajo riesgo.</p></article>
        <article class="card featured"><span class="badge">Producto ancla disponible</span><h3>Constructores</h3><p>Programas estructurados donde los estudiantes construyen, programan, prueban y explican soluciones. CiudadBots vive aqui.</p></article>
        <article class="card"><span class="badge">Ruta avanzada futura</span><h3>Creadores</h3><p>Nivel premium para proyectos propios con impacto, prototipos, documentacion y presentacion publica.</p></article>
      </div>
    </section>

    <section id="ciudadbots" class="product">
      <div>
        <div class="kicker">Producto destacado</div>
        <h2>CiudadBots Guatemala</h2>
        <p>Un programa de robotica aplicada para Ciclo Basico con 12 misiones urbanas: cartografia, entregas, logistica, infraestructura, elevadores, rescate y mas.</p>
        <p>Incluye guia docente, vista estudiante, programas base, rubricas y showcase final.</p>
      </div>
      <div class="list">
        <span>12 modulos con retos de ciudad</span>
        <span>Alineacion CNB, ISTE, CSTA y NGSS</span>
        <span>Rutas compacta, semestral y anual</span>
        <span>Showcase y evaluacion final</span>
      </div>
    </section>

    <section>
      <div class="kicker">Implementacion</div>
      <h2>Del diagnostico al showcase sin improvisar</h2>
      <div class="grid grid4">
        <article class="card"><h3>01 Diagnosticar</h3><p>Definimos metas, edades, tiempo disponible, equipo y nivel de madurez.</p></article>
        <article class="card"><h3>02 Seleccionar ruta</h3><p>Elegimos demo, piloto, programa semestral o anual segun el objetivo institucional.</p></article>
        <article class="card"><h3>03 Acompanamiento docente</h3><p>Preparamos al docente con flujo de sesiones, roles, recursos y criterios de evidencia.</p></article>
        <article class="card"><h3>04 Ejecutar y medir</h3><p>Los estudiantes construyen, prueban, documentan y presentan resultados visibles.</p></article>
      </div>
    </section>

    <section class="split">
      <article class="band"><div class="kicker">Equipo fisico</div><h2>El hardware acompana la adopcion; no bloquea la venta</h2><ul><li>Usar equipo compatible del colegio.</li><li>Alquilar equipo de GuateGeeks para pilotos.</li><li>Recomendar o vender kits.</li><li>Ejecutar modalidad completa con facilitacion y equipo.</li></ul></article>
      <article class="band"><div class="kicker">Evidencia</div><h2>Cada programa debe dejar algo que direccion pueda mostrar</h2><ul><li>Fotos, prototipos, codigo o bitacoras.</li><li>Rubricas de construccion, logica y comunicacion.</li><li>Reporte de impacto.</li><li>Mini showcase final.</li></ul></article>
    </section>

    <section>
      <div class="kicker">Formas de empezar</div>
      <h2>Paquetes pensados para validar rapido y crecer con confianza</h2>
      <div class="grid grid4">
        <article class="card"><h3>Demo Experience</h3><p>Una sesion demostrativa para abrir conversacion y mostrar potencial.</p></article>
        <article class="card"><h3>Piloto institucional</h3><p>4 a 6 sesiones con evidencia, onboarding docente y mini showcase.</p></article>
        <article class="card"><h3>Programa semestral</h3><p>Ruta de 12 a 24 sesiones con seguimiento y reporte final.</p></article>
        <article class="card"><h3>Programa anual</h3><p>Implementacion profunda con portafolio, showcase y expansion.</p></article>
      </div>
    </section>

    <section class="cta">
      <div class="kicker">Siguiente paso</div>
      <h2>Probemos un piloto medible antes de octubre</h2>
      <p>Podemos iniciar con una demo o piloto CiudadBots, usar equipo propio o equipo GuateGeeks, y cerrar con evidencia lista para direccion.</p>
      <div class="actions">
        <a class="btn primary" href="mailto:info@guategeeks.com?subject=Demo%20GuateGeeks%20Programas%20Educativos">Solicitar demo o piloto</a>
      </div>
    </section>
    <p class="note">Preview ligero generado desde la propuesta en develop. La implementacion completa vive en el PR de Docusaurus.</p>
  </main>
</body>
</html>`;

const worker = `const html = ${JSON.stringify(html)};

export default {
  async fetch() {
    return new Response(html, {
      headers: {'content-type': 'text/html; charset=utf-8'},
    });
  },
};
`;

fs.writeFileSync(path.join(distDir, 'server', 'index.js'), worker);
