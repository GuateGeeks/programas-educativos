/*
 * PRUEBA 02: Motor DC - Control PWM
 * Objetivo: Controlar velocidad de motor DC usando PWM (Pulse Width Modulation)
 *
 * Componentes:
 *  - Arduino Uno
 *  - Motor DC 3-6V (SMARS)
 *  - Driver motor L298N
 *  - Batería 9V
 *  - Jumpers y protoboard
 *
 * Conexión L298N:
 *  - L298N IN1 → Pin 8 (Arduino)
 *  - L298N IN2 → Pin 9 (Arduino)
 *  - L298N OUT1, OUT2 → Motor
 *  - L298N +12V → Batería (+)
 *  - L298N GND → Batería (-) y Arduino GND (común)
 */

// Pines del driver motor L298N
const int MOTOR_PIN_1 = 8;    // IN1 (dirección)
const int MOTOR_PIN_2 = 9;    // IN2 (dirección) - También PWM para velocidad

// Variable de velocidad (0-255)
int motorSpeed = 0;

void setup() {
  // Configurar pines como salida
  pinMode(MOTOR_PIN_1, OUTPUT);
  pinMode(MOTOR_PIN_2, OUTPUT);

  // Serial para depuración
  Serial.begin(9600);
  Serial.println("PRUEBA 02: Motor DC iniciado");
  Serial.println("Velocidad 0-255. Escribe velocidad y presiona Enter.");
}

void loop() {
  // Leer velocidad del Serial (para pruebas interactivas)
  if (Serial.available()) {
    String input = Serial.readStringUntil('\n');
    motorSpeed = input.toInt();

    // Limitar a rango 0-255
    motorSpeed = constrain(motorSpeed, 0, 255);

    Serial.print("Velocidad motor: ");
    Serial.print(motorSpeed);
    Serial.println(" (0-255)");
  }

  // Controlar motor con PWM
  // IN1=HIGH, IN2=PWM → Motor adelante con velocidad variable
  digitalWrite(MOTOR_PIN_1, HIGH);
  analogWrite(MOTOR_PIN_2, motorSpeed);

  delay(100); // Actualizar cada 100ms
}

/*
 * Versión alternativa: Aceleración gradual
 *
 * Descomenta esta función y llámala en loop() para ver aceleración
 */
void accelerateMotor() {
  for (int speed = 0; speed <= 255; speed++) {
    analogWrite(MOTOR_PIN_2, speed);
    Serial.println(speed);
    delay(50);
  }

  delay(2000); // Mantener velocidad máxima

  for (int speed = 255; speed >= 0; speed--) {
    analogWrite(MOTOR_PIN_2, speed);
    Serial.println(speed);
    delay(50);
  }
}
