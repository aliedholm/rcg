const int relay1 = 8;
const int relay2 = 9;
const int relay3 = 10;
const int relay4 = 11;

void setup() {
  pinMode(relay1, OUTPUT);
  Serial.begin(9600);
}

void loop() {
  int n = 2;
  if(Serial.available()){
    n = Serial.read() - '0';
  }
  if(n == 0){
    digitalWrite(relay1, LOW);
    delay(50);
  }
  if(n == 1){
    digitalWrite(relay1, HIGH);
    delay(50);
  }
  delay(50);

}
