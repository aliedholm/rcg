const int ledPin = 13;
int n;

void setup() {
  pinMode(ledPin, OUTPUT);
  Serial.begin(9600);
  n = 7;
}

void loop() {
  if(Serial.available()){
    n = Serial.read() - '0';
  }
  digitalWrite(ledPin, HIGH);
  delay(n*100);
  digitalWrite(ledPin, LOW);
  delay(n*100);
}
