

void setup() {
  // start serial port at 9600 bps and wait for port to open:
  Serial.begin(9600);
}
char str[80];
int i = 0;

void loop() {
  // if we get a valid byte, read analog ins:
  while (Serial.available() > 0) {
    // get incoming byte:
    str[i] = Serial.read();
    i++;
    if (str[i-1] == '\n') {
      str[i] = '\0';
      i = 0;
      Serial.print(str);
    }
  }

}
