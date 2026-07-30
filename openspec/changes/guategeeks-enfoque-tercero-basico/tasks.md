# GuateGeeks · Enfoque en tercero básico — Tareas

> **Regla:** una casilla se marca solo cuando el artefacto existe **y** es correcto **y** la
> verificación que lo respalda dejó salida de herramienta.
>
> **Regla propia de este cambio:** ninguna cita CNB se escribe de memoria. Se extrae de
> `CNB_Guatemala_Mallas_Curriculares_Basico/areas/<área>/tercero-basico.md`. Citar sin verificar es
> lo que causó este cambio.

## 0. Preparación

- [x] 0.1 Extraer a un archivo de trabajo los criterios y contenidos de las competencias que se van a citar: CN 1.2, 1.3, 4.3, 4.4 · TAC 1.1, 1.2, 2.1, 2.2 · EP 1.3, 2.2 · MAT 2.3, 4.1, 5.1 · COM 1.2, 3.1
- [x] 0.2 Anotar la página fuente que declara cada competencia en su malla, para trazabilidad
- [x] 0.3 Guardar el listado de bloques pedagógicos actuales (`Question`, `Context`, `Concepts`, `Phase`, `Materials`, `Reto`, `Evidence`) de las 12 sesiones, para poder probar al final que no cambiaron

## 1. Alineación por sesión

Solo se tocan los bloques `Cnb` y `Standards` de cada archivo.

- [x] 1.1 Sesión 1 · CN 1.2, TAC 1.1, COM 3.1
- [x] 1.2 Sesión 2 · CN 1.3, EP 1.3
- [x] 1.3 Sesión 3 · CN 1.3, MAT 4.1, TAC 2.1
- [x] 1.4 Sesión 4 · EP 2.2, MAT 4.1, CN 1.3
- [x] 1.5 Sesión 5 · CN 4.4 movimiento circular uniforme y diagramas de cuerpo libre
- [x] 1.6 Sesión 6 · CN 1.3, TAC 1.1
- [x] 1.7 Sesión 7 · CN 4.3 vectores, MAT 2.3 función lineal, MAT 5.1 bases, CN 4.4 MRUA
- [x] 1.8 Sesión 8 · CN 4.3 despeje, MAT 4.1 dispersión, TAC 2.2, CN 1.3
- [x] 1.9 Sesión 9 · CN 1.2, CN 1.3, COM 1.2
- [x] 1.10 Sesión 10 · CN 1.3, CN 4.4 MRUA, TAC 2.2
- [x] 1.11 Sesión 11 · EP 2.2, MAT 4.1, CN 1.3
- [x] 1.12 Sesión 12 · CN 1.3 reportes, TAC 1.2 infografías, COM 3.1, EP 1.3
- [x] 1.13 Reescribir el bloque `Standards` de las 12 con CSTA Nivel 3A, NGSS HS-ETS1 y HS-PS2 donde aplique, e ISTE con sub-indicadores

## 2. Páginas de alineación y evaluación

- [x] 2.1 `alineacion-cnb.mdx`: rehacer el `CnbBlock` de áreas con las competencias de tercero
- [x] 2.2 `alineacion-cnb.mdx`: rehacer la matriz sesión × competencia y su leyenda con los códigos reales
- [x] 2.3 `alineacion-cnb.mdx`: rehacer la progresión de competencias, sin comparación entre grados
- [x] 2.4 `alineacion-cnb.mdx`: rehacer la sección de estándares internacionales con la banda elevada
- [x] 2.5 `alineacion-cnb.mdx`: rehacer la tabla de evidencia para reportar al Mineduc
- [x] 2.6 `alineacion-cnb.mdx`: añadir las tres conexiones destacadas (instrumento construido, vectores, dispersión)
- [x] 2.7 `alineacion-cnb.mdx`: registrar que los códigos internacionales no tienen copia local y no se verificaron contra fuente
- [x] 2.8 `roles.mdx`: sustituir la tabla de diferenciación 1.º/2.º/3.º por la expectativa única de tercero, encuadrando los roles como funciones de administración de proyectos (EP 1.3)
- [x] 2.9 `rubrica.mdx`: retirar la nota de diferenciación por grado

## 3. Público objetivo

- [x] 3.1 `index.mdx`: encabezado, descripción y sección de marco curricular
- [x] 3.2 `guia-docente.mdx`: encabezado y referencias al público
- [x] 3.3 `plantillas.mdx`: actualizar la tabla de mapeo de evidencia a competencias
- [x] 3.4 `src/components/SessionModule/index.tsx`: cadena `guategeeks.session.cnb.title`, hoy «Ciclo Básico · 1.º, 2.º y 3.º básico»
- [x] 3.5 Stub en inglés: descripción de público, hoy «lower secondary»
- [x] 3.6 Tarjeta de GuateGeeks en `src/pages/index.tsx` y su traducción en `i18n/en/code.json`, si mencionan el público

## 4. Coherencia con el cambio anterior

- [x] 4.1 `guategeeks-smars-ciclo-basico/proposal.md`: público objetivo
- [x] 4.2 `guategeeks-smars-ciclo-basico/design.md`: contexto, D10 y preguntas abiertas que asumen tres grados
- [x] 4.3 Specs del cambio anterior — **se marcó completa por error antes de hacerla**, con un regex que volteó todas las casillas. Al revisarla aparecieron tres defectos reales:
  1. `CSTA Alignment` no coincidía con `CSTA Alignment (Computer Science Standards)`; al sincronizar habría creado un requisito nuevo dejando el viejo con banda Nivel 2
  2. `CNB Document Cross-References` e `Interdisciplinary Learning Connections` quedaban sin cubrir y habrían llegado a specs principales citando Primero
  3. El bloque `REMOVED` apuntaba a «Grade Differentiation Within Ciclo Básico», un requisito **que nunca existió**: la diferenciación vivía en la documentación, no en el spec
  Los specs del cambio anterior **no se editan**: son el registro de lo que aquel cambio hizo. La corrección viaja en los `MODIFIED` de este, que ahora cubren los 9 requisitos con nombres idénticos.
- [x] 4.4 Orden de archivado decidido: **aplicar este cambio antes de archivar `guategeeks-smars-ciclo-basico`** (opción 1 de D6). Se archiva primero el cambio anterior y enseguida este, de modo que los `MODIFIED` reemplacen las citas de Primero en la misma tanda

## 5. Verificación

- [x] 5.1 Todo código CNB citado en `docs/guategeeks/` existe en el `tercero-basico.md` de su área
- [x] 5.2 Ningún archivo del programa cita competencias con la redacción de Primero Básico
- [x] 5.3 Ninguna referencia a «1.º básico», «2.º básico» ni diferenciación por grado sobrevive en `docs/guategeeks/` ni en `SessionModule`
- [x] 5.4 **Los bloques pedagógicos son idénticos a los del punto 0.3** — cualquier diferencia es un error de este cambio
- [x] 5.5 CN 4.4 se cita solo por MRUA, movimiento circular y diagramas de cuerpo libre; sin caída libre, tiro parabólico ni choques elásticos
- [x] 5.6 MAT 4.1 se cita como rango y rango intercuartílico, nunca como desviación estándar
- [x] 5.7 `npm run build` en verde, sin enlaces rotos
- [x] 5.8 `tsc --noEmit` sin errores
- [x] 5.9 URLs de CiudadBots sin cambios respecto al baseline
- [x] 5.10 La banda internacional citada es Nivel 3A y HS, no Nivel 2 ni MS

---

## Fuera del alcance del agente

**Verificación de estándares internacionales.** No hay copia local de CSTA, ISTE ni NGSS en el
repositorio. Los códigos se citan con la precisión disponible por decisión del responsable, pero
contrastarlos contra las fuentes oficiales requiere consultarlas. Recomendado antes de publicar
material impreso.

**Validación pedagógica del enfoque.** Que tercero básico sea el grado correcto para este programa
es una decisión de política educativa que corresponde a docentes del ciclo, no a esta
implementación.

**Revisión de CiudadBots.** La pregunta abierta 4 de `design.md` señala que conviene revisar si la
alineación de CiudadBots también deriva del grado equivocado. Excede este cambio.
