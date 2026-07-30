/*
 * FIRMWARE 04: Robot Autónomo con Máquina de Estados
 * Objetivo: Robot que evita obstáculos automáticamente
 *
 * Máquina de estados:
 *  1. STARTUP (5 segundos): LED rojo, cuenta regresiva
 *  2. PATROL: Motor adelante, sensor monitoreando
 *  3. OBSTACLE_DETECTED: Detiene, mide distancia
 *  4. TURN: Gira derecha o izquierda
 *  5. RESUME: Vuelve a PATROL
 */

// PINES
const int MOTOR_PIN_1 = 8;
const int MOTOR_PIN_2 = 9;
const int TRIG_PIN = 7;
const int ECHO_PIN = 6;
const int LED_PIN = 13;

// PARÁMETROS
const int OBSTACLE_DISTANCE = 20; // cm
const int PATROL_SPEED = 150;     // PWM (0-255)
const int TURN_SPEED = 100;       // PWM (giro)
const int TURN_TIME = 600;        // ms para girar ~90°

// ESTADOS
enum State {
  STARTUP,
  PATROL,
  OBSTACLE_DETECTED,
  TURN,
  RESUME
};

State currentState = STARTUP;
unsigned long stateStartTime = 0;

void setup() {
  pinMode(MOTOR_PIN_1, OUTPUT);
  pinMode(MOTOR_PIN_2, OUTPUT);
  pinMode(TRIG_PIN, OUTPUT);
  pinMode(ECHO_PIN, INPUT);
  pinMode(LED_PIN, OUTPUT);

  Serial.begin(9600);
  Serial.println("=== FIRMWARE 04: Robot Autónomo ===");
  Serial.println("Estado: STARTUP");

  stateStartTime = millis();
}

void loop() {
  unsigned long elapsed = millis() - stateStartTime;

  switch (currentState) {
    case STARTUP:
      if (elapsed < 5000) {
        // Parpadear LED rojo durante 5s
        if ((elapsed / 500) % 2 == 0) {
          digitalWrite(LED_PIN, HIGH);
        } else {
          digitalWrite(LED_PIN, LOW);
        }
        Serial.print("Iniciando en: ");
        Serial.println(5 - elapsed / 1000);
      } else {
        currentState = PATROL;
        stateStartTime = millis();
        Serial.println("Estado: PATROL - Buscando obstáculos");
        digitalWrite(LED_PIN, LOW);
      }
      break;

    case PATROL:
      // Avanzar
      motorForward(PATROL_SPEED);

      // Medir distancia
      float dist = getDistance();

      if (dist > 0 && dist < OBSTACLE_DISTANCE) {
        currentState = OBSTACLE_DETECTED;
        stateStartTime = millis();
        Serial.print("¡Obstáculo a ");
        Serial.print(dist);
        Serial.println(" cm!");
      }
      break;

    case OBSTACLE_DETECTED:
      // Detener
      motorStop();
      digitalWrite(LED_PIN, HIGH); // LED rojo = peligro

      if (elapsed > 500) {
        // Decidir dirección: gira derecha
        currentState = TURN;
        stateStartTime = millis();
        Serial.println("Estado: TURN - Girando");
      }
      break;

    case TURN:
      // Girar derecha (motor 2 más lento o invertido)
      digitalWrite(MOTOR_PIN_1, HIGH);
      analogWrite(MOTOR_PIN_2, TURN_SPEED / 2); // Más lento = gira

      if (elapsed > TURN_TIME) {
        currentState = RESUME;
        stateStartTime = millis();
        Serial.println("Estado: RESUME - Continuando");
      }
      break;

    case RESUME:
      digitalWrite(LED_PIN, LOW);
      currentState = PATROL;
      stateStartTime = millis();
      break;
  }

  delay(50); // Loop cada 50ms
}

// FUNCIONES AUXILIARES
void motorForward(int speed) {
  digitalWrite(MOTOR_PIN_1, HIGH);
  analogWrite(MOTOR_PIN_2, speed);
}

void motorStop() {
  digitalWrite(MOTOR_PIN_1, LOW);
  analogWrite(MOTOR_PIN_2, 0);
}

float getDistance() {
  digitalWrite(TRIG_PIN, LOW);
  delayMicroseconds(2);
  digitalWrite(TRIG_PIN, HIGH);
  delayMicroseconds(10);
  digitalWrite(TRIG_PIN, LOW);

  long duration = pulseIn(ECHO_PIN, HIGH, 30000);
  float distance = duration * 0.01715 / 2.0; // Conversión a cm

  if (distance < 2 || distance > 400) return -1; // Error
  return distance;
}
