# GuateGeeks · Modelos 3D — Tareas

> **Regla:** una casilla se marca solo cuando el artefacto existe **y** es correcto **y** la
> verificación que lo respalda dejó salida de herramienta.
>
> **Regla propia de este cambio:** los modelos se adoptan, no se editan. Cualquier diferencia byte a
> byte con el paquete fuente es un error, no una optimización.

## 0. Preparación

- [x] 0.1 Guardar la huella de los bloques pedagógicos de las sesiones 1, 3, 4 y 5, para probar al final que no cambiaron
- [x] 0.2 Registrar el tamaño en disco y comprimido de cada modelo, como línea base del costo por página

## 1. Adopción de los modelos

- [x] 1.1 Copiar los siete STL a `static/models/guategeeks/`
- [x] 1.2 Crear un manifiesto con origen, fecha de adopción, autor, licencia y cantidad requerida por modelo
- [x] 1.3 Verificar que cada archivo servido es **byte a byte idéntico** al del paquete fuente
- [x] 1.4 Confirmar que los siete siguen siendo STL binario y que no se alteró ninguno

## 2. Componente `StlViewer`

- [x] 2.1 Crear `src/components/StlViewer/` con `BrowserOnly`, siguiendo el patrón de `CityBotsHero`
- [x] 2.2 Cargar `three` y `STLLoader` desde `https://esm.sh/three@0.160.1`, con la versión fijada en una constante única
- [x] 2.3 Diferir la carga con `IntersectionObserver`: visible siempre, red solo al entrar en viewport
- [x] 2.4 Encuadre automático de la pieza en cámara, con rotación e iluminación suficientes para leer la geometría
- [x] 2.5 Botón de descarga que apunta al archivo estático, independiente de que el visor funcione
- [x] 2.6 Degradación sin WebGL o sin CDN: nombre, tamaño y enlace de descarga
- [x] 2.7 Mostrar atribución y licencia junto a cada modelo
- [x] 2.8 Crear `styles.module.css` coherente con el resto de componentes del sitio
- [x] 2.9 Verificar con `tsc --noEmit` y guardar la salida
- [x] 2.10 Confirmar que `package.json` no ganó dependencias

## 3. Catálogo en materiales

- [x] 3.1 Sustituir en `materiales.mdx` la sección que solo enlaza por el catálogo de los siete modelos
- [x] 3.2 Indicar por modelo su función en el robot y **cuántas unidades** hace falta imprimir
- [x] 3.3 Conservar los enlaces a las fuentes canónicas, para atribución y para comprobar versiones nuevas
- [x] 3.4 Mantener en esa misma página los parámetros de impresión recomendados

## 4. Visores en sesiones

- [x] 4.1 Sesión 1 · `chassis_sl`
- [x] 4.2 Sesión 3 · `chassis_sl` y `powered_wheel`
- [x] 4.3 Sesión 4 · `mechanical_track` y `holding_board_9v`
- [x] 4.4 Sesión 5 · `mechanical_track` y `unpowered_wheel_sl`
- [x] 4.5 Confirmar que la sesión 8 **no** recibe visor, y que los modelos del sensor se enlazan desde el catálogo
- [x] 4.6 Añadir en la guía docente qué modelos trabaja cada sesión, para preparar la impresión con antelación

## 5. Licencias

- [x] 5.1 Corregir en `index.mdx` la afirmación «los modelos 3D … no se redistribuyen aquí»
- [x] 5.2 Corregir en `licencias.mdx` la instrucción «No incluya los modelos 3D … Enlácelos»
- [x] 5.3 Declarar que, con los modelos incluidos, **la condición No Comercial vincula al paquete completo**, y que ofrecer el programa de forma pagada exigiría retirarlos
- [x] 5.4 Reproducir el texto de atribución que la fuente exige, nombrando a Kevin Thomas y la fuente canónica
- [x] 5.5 Conservar la nota sobre el conflicto entre catálogos y la ausencia de permiso comercial
- [x] 5.6 Registrar que el visor carga una biblioteca desde un host externo, y que por eso el sitio deja de funcionar por completo en una intranet aislada

## 6. Verificación

- [x] 6.1 Los siete modelos resuelven en sus rutas publicadas tras el build
- [x] 6.2 Cada archivo publicado es byte a byte idéntico a su origen
- [x] 6.3 No existe ningún GLB, malla decimada ni miniatura generada a partir de los modelos
- [x] 6.4 **Los bloques pedagógicos de las sesiones 1, 3, 4 y 5 son idénticos a los de 0.1**
- [x] 6.5 `npm run build` en verde, sin enlaces rotos
- [x] 6.6 `tsc --noEmit` sin errores
- [x] 6.7 URLs de CiudadBots sin cambios respecto al baseline
- [x] 6.8 Ninguna afirmación de licencia contradice lo que el sitio distribuye realmente
- [x] 6.9 La versión de `three` está fijada en un solo lugar y no aparece ningún `@latest`
- [x] 6.10 Documentar el costo transferido por página con visores

---

## Fuera del alcance del agente

**Verificar la compresión del host.** Si el servidor comprime `.stl`, el costo real es 2.0 MB; si
no, 5.7 MB. Se comprueba leyendo las cabeceras de respuesta **tras el despliegue**, que este entorno
no puede realizar.

**Comprobar el visor en navegador.** Que la pieza se encuadre bien, que la rotación sea legible y que
el contraste cumpla WCAG requiere abrir el sitio. Igual que la degradación sin WebGL, que exige un
navegador con WebGL deshabilitado.

**Decidir si el peso es aceptable en aula.** La sesión 3 carga 1.4 MB comprimidos. Si es demasiado
para las conexiones de las escuelas destinatarias, la mitigación es mover `powered_wheel` al
catálogo — pero ese juicio depende del contexto real de uso.

**Confirmar la versión de la licencia.** La fuente advierte que el catálogo consultado no indica
versión de CC BY-NC-SA y que un espejo declara metadatos distintos. Resolverlo requiere contactar al
autor o a los catálogos.
