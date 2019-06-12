int pin = 6; // Analog pin in that 

#define floatPin 4  // Digital pin that float value is connected to
#define switchPin 2 // Digital pin that switch is connected to
#define relayPin 6 // Digital pin that switch is connected to

int sensorValue;

void setup() {
  // put your setup code here, to run once:
  Serial.begin(9600);
  delay(100);

  pinMode(4, INPUT);
  pinMode(2, INPUT);
  pinMode(6, OUTPUT);
}

void loop() {
   
  int floatValue = digitalRead(floatPin);
  Serial.print("Float Value");
  Serial.println(floatValue);

  int switchValue = digitalRead(switchPin);
  Serial.print("Switch Value");
  Serial.println(switchValue);
  
  if(switchValue == LOW && floatValue == LOW) {
    digitalWrite(relayPin, LOW);
  }
  if(switchValue == HIGH && floatValue == HIGH) {
    digitalWrite(relayPin, HIGH);
  }
  if(switchValue == HIGH && floatValue == LOW) {
    digitalWrite(relayPin, LOW);
  }
  if(switchValue == LOW && floatValue == HIGH) {
    digitalWrite(relayPin, LOW);
  }    
  delay(500); 

}
