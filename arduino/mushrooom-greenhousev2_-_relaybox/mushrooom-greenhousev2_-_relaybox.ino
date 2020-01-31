
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
  pinMode(9, OUTPUT);
  pinMode(10, OUTPUT);
  pinMode(11, OUTPUT);
  pinMode(12, OUTPUT);
  
  digitalWrite(9, HIGH);
  digitalWrite(10, HIGH);
  digitalWrite(11, HIGH);
  digitalWrite(12, HIGH);

//  digitalWrite(9, LOW);
//  digitalWrite(10, LOW);
//  digitalWrite(11, LOW);
//  digitalWrite(12, LOW);

}
//main program loop
void loop() {
  

// serial buffer code
    recvWithStartEndMarkers();
    showNewData(); 
    
//Main set of if statements to trigger conditions from Serial commands

  //toggle relays 
//Mister Solenoid
    if(commandCode == "1201"){
      digitalWrite(10, HIGH);
      Serial.print("10$");
      delay(250);
      commandCode = "0";
    }

    if(commandCode == "1200"){
      digitalWrite(10, LOW);
      Serial.print("11$");
      delay(250);
      commandCode = "0";
    }
    
//Vent Fan
    if(commandCode == "1001"){
      digitalWrite(11, HIGH);
      Serial.print("20$");
      delay(250);
      commandCode = "0";
    }

    if(commandCode == "1000"){
      digitalWrite(11, LOW);
      Serial.print("21$");
      delay(250);
      commandCode = "0";
    }

  // report identity
    if(commandCode == "9999"){
      String identity = "relayArd:1201;Mister_On,1200;Mister_Off,1001;Vent_Fan_On,1000;Vent_Fan_Off,9999;temp-identity";
      Serial.print(identity);
      Serial.print("$");
      commandCode = "0";
    }

    delay(15);
    
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

