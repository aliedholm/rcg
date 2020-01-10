
//declare command code variable
    String commandCode = "0";

//Serial buffer code
    const byte numChars = 32;
    char receivedChars[numChars];
    
    boolean newData = false;
//end serial buffer code

void setup() {
  //basic setup
  Serial.begin(9600);

  //blink diagnostic setup
  pinMode(LED_BUILTIN, OUTPUT);
  pinMode(10, OUTPUT);
  pinMode(11, OUTPUT);
  pinMode(12, OUTPUT);
  pinMode(13, OUTPUT);

  
}
//main program loop
void loop() {
  

// serial buffer code
    recvWithStartEndMarkers();
    showNewData(); 
    
//Main set of if statements to trigger conditions from Serial commands

  //toggle relays 
//relay 1
    if(commandCode == "5510"){
      digitalWrite(10, HIGH);
      Serial.print("r1-low");
      Serial.print("$");
      commandCode = "0";
    }

    if(commandCode == "5511"){
      digitalWrite(10, LOW);
      Serial.print("r1-high");
      Serial.print("$");
      commandCode = "0";
    }
//relay2
    if(commandCode == "5520"){
      digitalWrite(11, HIGH);
      Serial.print("r2-low");
      Serial.print("$");
      commandCode = "0";
    }

    if(commandCode == "5521"){
      digitalWrite(11, LOW);
      Serial.print("r2-high");
      Serial.print("$");
      commandCode = "0";
    }
//relay3
    if(commandCode == "5530"){
      digitalWrite(12, HIGH);
      Serial.print("r3-low");
      Serial.print("$");
      commandCode = "0";
    }

    if(commandCode == "5531"){
      digitalWrite(12, LOW);
      Serial.print("r3-high");
      Serial.print("$");
      commandCode = "0";
    }
//relay4
    if(commandCode == "5540"){
      digitalWrite(13, HIGH);
      Serial.print("r4-low");
      Serial.print("$");
      commandCode = "0";
    }

    if(commandCode == "5541"){
      digitalWrite(13, LOW);
      Serial.print("r4-high");
      Serial.print("$");
      commandCode = "0";
    }

  // report identity
    if(commandCode == "9999"){
      String identity = "relayArd:5510;r1-low,5511;r1-high,5520;r2-low,5521;r2-high,5530;r3-low,5531;r3-high,5540;r4-low,5541;r4-high,6666;test,9999;temp-identity";
      Serial.print(identity);
      Serial.print("$");
      commandCode = "0";
    }

      if(commandCode == "6666"){
      Serial.print("test");
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

