# PRUEBA 02: Motor DC Control con PWM

## ¿Qué hace?

Este sketch controla la **velocidad** de un motor DC usando **PWM (Pulse Width Modulation)**. PWM es una técnica que enciende/apaga el motor muy rápido para simular voltajes intermedios.

## Conceptos clave

- **PWM**: Modulación de ancho de pulso (frecuencia ~1000 Hz, cambiar ciclo de trabajo 0-100%)
- **analogWrite()**: Escribir valor PWM (0-255) en pin PWM (pins 3, 5, 6, 9, 10, 11)
- **L298N Driver**: Circuito que maneja corriente alta para motores, controlado por Arduino
- **Velocidad proporcional**: PWM 0=parado, PWM 127≈50%, PWM 255=máximo

## Conexión del circuito

```
Arduino              L298N              Motor
-----                -----              -----
Pin 8  ──→  IN1  ┐
                 ├─→ OUT1 ───┐
Pin 9  ──→  IN2  ┘           │ (Motor)
                            │
GND    ──→  GND  ────────────┘

Alimentación:
Batería 9V (+) ──→ L298N +12V
Batería 9V (-) ──→ L298N GND ──→ Arduino GND (común)
```

## Cómo probar

1. Carga el sketch en Arduino
2. Abre Monitor Serial (9600 baud)
3. Escribe números: 0, 50, 100, 150, 200, 255 (presiona Enter)
4. El motor debería accelerar proporcionalmente

## Reto para estudiantes

**Nivel 2: Modificación**
1. Encuentra el **PWM mínimo** donde el motor comienza a moverse (típicamente 60-100)
2. Crea función de aceleración suave: 0 → 255 en 5 segundos
3. Invierte dirección: usa IN1 para dirección adelante/atrás

**Nivel 3: Algoritmo**
Implementa un ciclo: acelera 2s, mantén máximo 2s, desacelera 2s, repite.

## Valores esperados

| PWM | Comportamiento |
|-----|-----------------|
| 0-59 | Motor parado (no suficiente torque) |
| 60-100 | Motor comienza a girar (lento) |
| 100-200 | Rango de control útil |
| 200-255 | Motor a máxima velocidad |

## Consumo de corriente

- Reposo: ~5 mA (Arduino)
- Motor girado lento (PWM 100): ~500 mA
- Motor máximo (PWM 255): ~1000 mA (1 A)
- Fuente: Batería 9V con capacidad >1000 mAh recomendada
