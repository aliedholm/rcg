
//declare command code variable
    String commandCode = "0";

//Serial buffer code
    const byte numChars = 32;
    char receivedChars[numChars];
    
    boolean newData = false;
//end serial buffer code

//dht22 code
#include "DHT.h"
#define DHTTYPE DHT22

#define DHT1PIN 2
DHT dht1(DHT1PIN, DHTTYPE);

#define DHT2PIN 3
DHT dht2(DHT2PIN, DHTTYPE);
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
  dht1.begin();
  dht2.begin();
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

//grounds
    if(commandCode == "0010"){
      printTemperature(Probe01);
      Serial.print("$");
      commandCode = "0";
    }

//grounds-control
    if(commandCode == "0011"){
      printTemperature(Probe02);
      Serial.print("$");
      commandCode = "0";
    }

//ambient-hum-inside
    if(commandCode == "0020"){
      float h = dht1.readHumidity();
      Serial.print(h);
      Serial.print("$");
      commandCode = "0";
    }

//ambient-temp-inside
    if(commandCode == "0021"){
      float t = dht1.readTemperature(true);
      Serial.print(t);
      Serial.print("$");
      commandCode = "0";
    }

//ambient-hum-outside
    if(commandCode == "0200"){
      float h = dht2.readHumidity();
      Serial.print(h);
      Serial.print("$");
      commandCode = "0";
    }

//ambient-temp-outside
    if(commandCode == "0201"){
      float t = dht2.readTemperature(true);
      Serial.print(t);
      Serial.print("$");
      commandCode = "0";
    }
    
  // report identity
    if(commandCode == "9999"){
      String identity = "sensorArd:0010;Grounds_Temperature,0011;Grounds_Temperature_Control,0020;Ambient_Humidity_Inside,0021;Ambient_Temperature_Inside,0200;Ambient_Humidity_Outside,0201;Ambient_Temperature_Outside,9999;temp-identity";
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
