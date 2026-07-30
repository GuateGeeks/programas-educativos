# PRUEBA 01: LED Indicador

## ¿Qué hace?

Este sketch hace parpadear un LED conectado al pin 13 cada 1 segundo. Es una prueba fundamental de I/O digital (entrada/salida) y comunicación Serial.

## Conceptos clave

- `digitalWrite()`: Escribir nivel lógico (HIGH/LOW) en un pin
- `pinMode()`: Configurar pin como entrada o salida
- `Serial.println()`: Enviar texto al puerto Serial para depuración
- `delay()`: Pausar ejecución en milisegundos

## Conexión del circuito

```
Arduino          Protoboard
-----            ----------
5V       ----→   Red (power rail)
GND      ----→   Blue (ground rail)
Pin 13   ----→   LED ánodo (+) en serie con resistencia 220Ω hacia GND

Diagrama:
+5V ─── Pin13 ─── [LED] ─── [220Ω] ─── GND
```

## Cómo cargar

1. Abre Arduino IDE
2. Abre este archivo (sketch.ino)
3. Conecta Arduino Uno por USB
4. Selecciona: Herramientas → Placa → Arduino Uno
5. Selecciona: Herramientas → Puerto → COM# (o tu puerto)
6. Presiona: Cargar (flecha derecha)
7. Espera "Carga completada"

## Cómo probar

1. Abre Monitor Serial (Herramientas → Monitor Serial)
2. Asegúrate que la velocidad sea 9600 baud
3. Deberías ver "LED ON" y "LED OFF" alternando cada 1 segundo
4. El LED físico debería parpadear al mismo ritmo

## Reto para estudiantes

**Modifica el sketch:**
1. Cambia `CYCLE_TIME` a 500 (LED más rápido) o 2000 (LED más lento)
2. Añade un segundo LED en pin 12 que parpadee opuesto (cuando pin 13 está ON, pin 12 está OFF)
3. Crea un patrón: 3 parpadeos rápidos, pausa 1 segundo, repetir

## Valores típicos

- `CYCLE_TIME = 500`: LED muy rápido (1000ms/ciclo = 1Hz)
- `CYCLE_TIME = 1000`: LED normal (500ms cada estado)
- `CYCLE_TIME = 2000`: LED lento (1000ms cada estado)

## Troubleshooting

| Problema | Causa | Solución |
|----------|-------|----------|
| LED no enciende | Polaridad invertida | Invierte LED (ánodo a 5V, cátodo a GND) |
| LED muy débil | Resistencia muy grande | Usa 220Ω (no 10kΩ) |
| No hay texto en Serial | Puerto incorrecto | Revisa Herramientas → Puerto |
| Compilación falla | Typo en código | Copia exactamente del README |
