
//declare command code variable
String commandCode = "0";


//Serial buffer code
const byte numChars = 32;
char receivedChars[numChars];

boolean newData = false;
//Serial buffer code end

void setup() {
  Serial.begin(9600);
  pinMode(LED_BUILTIN, OUTPUT);

}

void loop() {
  

  // serial buffer code
  recvWithStartEndMarkers();
  showNewData();

    
  //Main set of if statements to trigger conditions from Serial commands
      
  if(commandCode == "1111"){
    digitalWrite(LED_BUILTIN, HIGH);   // turn the LED on (HIGH is the voltage level)
    delay(1000);                       // wait for a second
    digitalWrite(LED_BUILTIN, LOW);    // turn the LED off by making the voltage LOW
    delay(1000); 
    digitalWrite(LED_BUILTIN, HIGH);   // turn the LED on (HIGH is the voltage level)
    Serial.print("blink happened$");
    commandCode = "0";
  }

  if(commandCode == "8888"){
    String error = "error";
    Serial.print(error);
    Serial.print("@");
    commandCode = "0";

  }

  if(commandCode == "9999"){
    String identity = "box5,2te,1hu,2ph,3re,3pu";
    Serial.print(identity);
    Serial.print("$");
    commandCode = "0";

  }

  
//End of Main set of if statements 
        
}//end of main loop

//start of functions needed to be called in them main loop

//Serial buffer functions
void recvWithStartEndMarkers() {
    static boolean recvInProgress = false;
    static byte ndx = 0;
    char startMarker = '<';
    char endMarker = '>';
    char rc;
 
    while (Serial.available() > 0 && newData == false) {
        rc = Serial.read();

        if (recvInProgress == true) {
            if (rc != endMarker) {
                receivedChars[ndx] = rc;
                ndx++;
                if (ndx >= numChars) {
                    ndx = numChars - 1;
                }
            }
            else {
                receivedChars[ndx] = '\0'; // terminate the string
                recvInProgress = false;
                ndx = 0;
                newData = true;
            }
        }

        else if (rc == startMarker) {
            recvInProgress = true;
        }
    }
}

void showNewData() {
    if (newData == true) {
//        Serial.print(receivedChars);
//        Serial.print(":");
        commandCode = receivedChars;
        newData = false;
    }
}
