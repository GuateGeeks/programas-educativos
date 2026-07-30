# Manifiesto de modelos 3D · GuateGeeks SMARS

Los siete modelos del robot SMARS, **adoptados sin modificación** del paquete
`smars_aula_autonomo_v2_fuentes_publicas`, que a su vez los obtuvo de la colección pública del
proyecto original.

**Fecha de adopción:** 2026-07-30
**Origen:** `smars_aula_autonomo_v2_fuentes_publicas/assets/3d/public_sources/models/`
**Autor:** Kevin Thomas
**Licencia:** CC BY-NC-SA (la fuente consultada no indica versión)

## Los siete modelos

| Archivo | Cant. | Función | Triángulos | Disco | gzip |
|---|---:|---|---:|---:|---:|
| `chassis_sl.stl` | 1 | Chasis SMARS screwless | 36 996 | 1 806K | 621K |
| `powered_wheel.stl` | 2 | Rueda motriz | 38 880 | 1 898K | 743K |
| `unpowered_wheel_sl.stl` | 2 | Rueda libre screwless | 22 694 | 1 108K | 422K |
| `mechanical_track.stl` | **32** | Eslabón de oruga | 2 924 | 142K | 25K |
| `holding_board_9v.stl` | 1 | Soporte de motores y batería | 3 618 | 176K | 33K |
| `ultrasonic_1.stl` | 1 | Cubierta del sensor ultrasónico | 14 284 | 697K | 220K |
| `ultrasonic_2b_v2.stl` | 1 | Base del sensor ultrasónico | 632 | 30K | 6K |
| | | **Total** | | **5 861K** | **2 073K** |

El eslabón de oruga se imprime **32 veces**: es el archivo más liviano y el que más tiempo de
impresora consume.

## Verificación de integridad

Los siete son **STL binario** e idénticos byte a byte a su origen, comprobado por SHA-256 al
adoptarlos. Cualquier diferencia futura es un error, no una optimización: no se convierten, no se
decimán y no se reparan mallas.

| Archivo | SHA-256 |
|---|---|
| `chassis_sl.stl` | verificado contra el paquete fuente |
| `powered_wheel.stl` | verificado contra el paquete fuente |
| `unpowered_wheel_sl.stl` | verificado contra el paquete fuente |
| `mechanical_track.stl` | verificado contra el paquete fuente |
| `holding_board_9v.stl` | verificado contra el paquete fuente |
| `ultrasonic_1.stl` | verificado contra el paquete fuente |
| `ultrasonic_2b_v2.stl` | verificado contra el paquete fuente |

Las sumas completas están en
`openspec/changes/guategeeks-modelos-3d/.wip/0.2-baseline.json`.

## Por qué no hay versiones convertidas

No existe ningún GLB, malla decimada ni miniatura generada a partir de estos modelos, y no debe
crearse. Alojar el archivo original **no** constituye una obra derivada, pero una malla convertida o
simplificada **sí lo sería** y heredaría la cláusula ShareAlike de CC BY-NC-SA. Servir el original
evita esa cadena, y de paso garantiza que el estudiante descarga exactamente lo que el slicer
necesita.

## Atribución requerida

> SMARS modular robot, diseño de Kevin Thomas. Fuente:
> https://www.thingiverse.com/thing:2662828. Distribuido bajo CC BY-NC-SA según la página fuente
> consultada.

**GuateGeeks no está afiliado oficialmente al proyecto SMARS.**

## Condición No Comercial

Con estos modelos incluidos, **el paquete completo queda sujeto a la cláusula No Comercial**. Si
GuateGeeks llegara a ofrecerse como programa pagado, los modelos tendrían que retirarse y volver a
enlazarse desde su fuente.

Una institución que cobre específicamente por copias impresas del chasis debe solicitar permiso o
confirmar los términos con el autor.

## Nota sobre catálogos en conflicto

La fuente advierte que un espejo del proyecto en otro catálogo declara metadatos de licencia
distintos. Por eso se toma Thingiverse como referencia canónica, no se copian archivos desde ese
espejo y **no se afirma permiso comercial**.

## Fuentes

- Modelo original — https://www.thingiverse.com/thing:2662828
- Biblioteca de partes — https://www.smarsfan.com/learn/parts/index
- Instrucciones de construcción — https://www.smarsfan.com/build/buildinstructions/wheeled/
- Repositorio comunitario — https://github.com/kevinmcaleer/smars
