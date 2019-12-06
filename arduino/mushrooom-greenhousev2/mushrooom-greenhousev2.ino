
//declare command code variable
    String commandCode = "0";

//Serial buffer code
    const byte numChars = 32;
    char receivedChars[numChars];
    
    boolean newData = false;
//end serial buffer code

//dht22 code
#include "DHT.h"
#define DHTPIN 3
#define DHTTYPE DHT22
DHT dht(DHTPIN, DHTTYPE);
//end dht22 code

//ds18b20 code
    #include <OneWire.h>
    
    #include <DallasTemperature.h>
    
    #define ONE_WIRE_BUS_PIN A0
    
    OneWire oneWire(ONE_WIRE_BUS_PIN);
    
    DallasTemperature sensors(&oneWire);
    
    DeviceAddress Probe01 = { 0x28, 0xAA, 0xA4, 0x54, 0x13, 0x13, 0x02, 0xDC };
    DeviceAddress Probe02 = { 0x28, 0x39, 0x99, 0xAA, 0x1F, 0x13, 0x01, 0x61 };

//Program setup
void setup() {
  //basic setup
  Serial.begin(9600);

  //blink diagnostic setup
  pinMode(LED_BUILTIN, OUTPUT);

  //DHT22 code
  dht.begin();

  //ds18b20 code
  sensors.begin();
      
  // set the resolution to 10 bit (Can be 9 to 12 bits .. lower is faster)
  sensors.setResolution(Probe01, 12);
  sensors.setResolution(Probe02, 12);
}


//main program loop
void loop() {
  

// serial buffer code
    recvWithStartEndMarkers();
    showNewData();

//ds18b20 code to refresh temp each loop
    sensors.requestTemperatures();  
    
//Main set of if statements to trigger conditions from Serial commands

  //check temperatures 
    if(commandCode == "1111"){
      printTemperature(Probe01);
      Serial.print("$");
      commandCode = "0";
    }

    if(commandCode == "1112"){
      printTemperature(Probe02);
      Serial.print("$");
      commandCode = "0";
    }

    if(commandCode == "1121"){
      float h = dht.readHumidity();
      Serial.print(h);
      Serial.print("$");
      commandCode = "0";
    }

    if(commandCode == "1122"){
      float t = dht.readTemperature();
      Serial.print(t);
      Serial.print("$");
      commandCode = "0";
    }
    
  // blink diagnostic
    if(commandCode == "9998"){
      digitalWrite(LED_BUILTIN, HIGH);   // turn the LED on (HIGH is the voltage level)
      delay(1000);                       // wait for a second
      digitalWrite(LED_BUILTIN, LOW);    // turn the LED off by making the voltage LOW
      delay(1000); 
      digitalWrite(LED_BUILTIN, HIGH);   // turn the LED on (HIGH is the voltage level)
      Serial.print("blink happened$");
      commandCode = "0";
    }
    
  // report an error
    if(commandCode == "9991"){
      String error = "error";
      Serial.print(error);
      Serial.print("@");
      commandCode = "0";
    }

  // report identity
    if(commandCode == "9999"){
      String identity = "tempArd:1111;temp1,1112;temp2,1113;temp3,1121;DHThum,1122;DHTtemp,1122;temp-error,9998;temp-blink,9999;temp-identity";
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
//ds18b20 functions
    void printTemperature(DeviceAddress deviceAddress)
    {
    
    float tempC = sensors.getTempC(deviceAddress);
    
       if (tempC == -127.00) 
       {
       Serial.print("Error getting temperature  ");
       } 
       else
       {
       Serial.print(DallasTemperature::toFahrenheit(tempC));
       }
    }
