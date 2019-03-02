

char str[80];
void setup() {
  // start serial port at 9600 bps and wait for port to open:
  Serial.begin(9600);
  str[0] = 'A';
  str[1] = ':';
  while (Serial.available() <= 0) {
      Serial.print("waiting");
      delay(500);
  }
}

int i = 2;

void loop() {
  // if we get a valid byte, read analog ins:
  while (Serial.available() > 0) {
    // get incoming byte:
    str[i] = Serial.read();
    i++;
    if (str[i-1] == '\n') {
      str[i] = '\0';
      i = 2;
      Serial.print(str);
    }
  }

}
