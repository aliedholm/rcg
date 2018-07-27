// declare and name all actuator pins on the arduino

const int r1 = 8;
const int r2 = 9;
const int r3 = 10;
const int r4 = 11;

void setup() {

  pinMode(r1, OUTPUT);
  pinMode(r2, OUTPUT);
  pinMode(r3, OUTPUT);
  pinMode(r4, OUTPUT);

  Serial.begin(9600);
}

void loop() {

  int n = 0;
  if(Serial.available()){
    n = Serial.read() - '0';
    device 
  }
  if(n == 101){
    digitalWrite(r1, LOW);
    delay(50);
  }
  if(n == 100){
    digitalWrite(r1, HIGH);
    delay(50);
  }
  delay(50);

}
