/*
 * PRUEBA 03: Sensor Ultrasónico HC-SR04
 * Objetivo: Medir distancia a objetos usando sensor de tiempo de vuelo
 *
 * Conexión:
 *  - HC-SR04 VCC → Arduino 5V
 *  - HC-SR04 GND → Arduino GND
 *  - HC-SR04 TRIG → Pin 7 (Arduino)
 *  - HC-SR04 ECHO → Pin 6 (Arduino)
 */

const int TRIG_PIN = 7;   // Trigger pin
const int ECHO_PIN = 6;   // Echo pin
const float SOUND_SPEED = 343.0; // m/s a 20°C
const float CM_PER_US = SOUND_SPEED / 20000.0; // Conversión a cm

void setup() {
  pinMode(TRIG_PIN, OUTPUT);
  pinMode(ECHO_PIN, INPUT);
  Serial.begin(9600);
  Serial.println("PRUEBA 03: Sensor HC-SR04 iniciado");
}

void loop() {
  // Enviar pulso trigger
  digitalWrite(TRIG_PIN, LOW);
  delayMicroseconds(2);
  digitalWrite(TRIG_PIN, HIGH);
  delayMicroseconds(10);
  digitalWrite(TRIG_PIN, LOW);

  // Medir tiempo de echo
  long duration = pulseIn(ECHO_PIN, HIGH, 30000);

  // Calcular distancia
  // Distancia = (Tiempo / 2) × Velocidad del sonido
  // Factor: tiempo en microsegundos → distancia en cm = tiempo × 0.01715
  float distance_cm = duration * CM_PER_US / 2.0;

  // Rango válido HC-SR04: 2cm a 400cm
  if (distance_cm < 2 || distance_cm > 400) {
    Serial.println("Fuera de rango");
  } else {
    Serial.print("Distancia: ");
    Serial.print(distance_cm, 1); // 1 decimal
    Serial.println(" cm");
  }

  delay(100); // Medir cada 100ms
}

/*
 * Versión con promedio (más estable):
 */
float getAverageDistance(int samples = 5) {
  float sum = 0;
  for (int i = 0; i < samples; i++) {
    digitalWrite(TRIG_PIN, LOW);
    delayMicroseconds(2);
    digitalWrite(TRIG_PIN, HIGH);
    delayMicroseconds(10);
    digitalWrite(TRIG_PIN, LOW);

    long duration = pulseIn(ECHO_PIN, HIGH, 30000);
    float distance = duration * CM_PER_US / 2.0;

    if (distance >= 2 && distance <= 400) {
      sum += distance;
    }
    delay(10);
  }
  return sum / samples;
}
