/*
 * PRUEBA 01: LED Indicador
 * Objetivo: Probar I/O digital, Serial, y control básico de tiempo
 *
 * Componentes:
 *  - Arduino Uno
 *  - LED rojo
 *  - Resistencia 220Ω
 *  - Protoboard
 *
 * Conexión:
 *  - LED ánodo (+) → Pin 13 (Arduino)
 *  - LED cátodo (-) → GND (Arduino) a través de resistencia 220Ω
 *
 * Comportamiento esperado:
 *  - LED parpadea cada 1 segundo (encendido 500ms, apagado 500ms)
 *  - Serial (9600 baud) imprime "LED ON" o "LED OFF"
 */

// Pin donde está conectado el LED
const int LED_PIN = 13;

// Tiempo de ciclo (en milisegundos)
const int CYCLE_TIME = 1000;

void setup() {
  // Configurar pin LED como salida
  pinMode(LED_PIN, OUTPUT);

  // Inicializar comunicación Serial (9600 baud)
  Serial.begin(9600);

  Serial.println("PRUEBA 01: LED Indicador iniciado");
  Serial.println("LED parpadeará cada " + String(CYCLE_TIME) + "ms");
}

void loop() {
  // Encender LED
  digitalWrite(LED_PIN, HIGH);
  Serial.println("LED ON");

  // Esperar mitad del ciclo
  delay(CYCLE_TIME / 2);

  // Apagar LED
  digitalWrite(LED_PIN, LOW);
  Serial.println("LED OFF");

  // Esperar otra mitad del ciclo
  delay(CYCLE_TIME / 2);
}
