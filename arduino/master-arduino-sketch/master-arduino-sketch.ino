//for ds18b20 code
#include <OneWire.h>
#include <DallasTemperature.h>
#define ONE_WIRE_BUS_PIN 2

OneWire oneWire(ONE_WIRE_BUS_PIN);
DallasTemperature sensors(&oneWire);

  //device addresses to be found in another sketch and assigned here
DeviceAddress Probe01 = { 0x28, 0xFF, 0xE0, 0x7F, 0xB5, 0x16, 0x05, 0x50 }; 
DeviceAddress Probe02 = { 0x28, 0xFF, 0x50, 0xEF, 0xC1, 0x16, 0x04, 0xD1 };
DeviceAddress Probe03 = { 0x28, 0xFF, 0x7B, 0xCC, 0xC1, 0x16, 0x04, 0xA1 };
DeviceAddress Probe04 = { 0x28, 0xFF, 0x4F, 0x19, 0xC2, 0x16, 0x04, 0x5E };
//ds18b20 code end

//for relay control code
// declare and name all actuator pins on the arduino
const int r1 = 13;
const int r2 = 9;
const int r3 = 10;
const int r4 = 11;
//relay control code end

//declare command code variable
int commandCode = 0;

void setup() {
  
  Serial.begin(9600);
  
  //for ds18b20 code
  sensors.begin();
  sensors.setResolution(Probe01, 12);
  sensors.setResolution(Probe02, 12);
  sensors.setResolution(Probe03, 12);
  sensors.setResolution(Probe04, 12);
  //ds18b20 code end

  //relay control code
  pinMode(r1, OUTPUT);
  pinMode(r2, OUTPUT);
  pinMode(r3, OUTPUT);
  pinMode(r4, OUTPUT);
  //relay control code end
  
}

void loop() {
  
  //ds18b20 generic code
  sensors.requestTemperatures();
  delay(100);
  //end ds18b20 generic code

  // read serial data if its available and set command code
  if(Serial.available()){
    commandCode = Serial.read() - '0';
    delay(50);
  }   
  
  //Main set of if statements to trigger conditions from Serial commands
      
  if(commandCode == 1){
    Serial.print("Temperature Probe 1: ");
    printTemperature(Probe01);
    commandCode = 0;
  }
  
  if(commandCode == 2){
    Serial.print("Temperature Probe 2: ");
    printTemperature(Probe02);
    commandCode = 0;
  }
  
  if(commandCode == 3){
    Serial.print("Temperature Probe 3: ");
    printTemperature(Probe03);
    commandCode = 0;
  }
  
  if(commandCode == 4){
    Serial.print("Temperature Probe 4: ");
    printTemperature(Probe04);
    commandCode = 0;
  }

  if(commandCode == 5){
    Serial.println("Relay 1 on");
    digitalWrite(r1, HIGH);
    commandCode = 0;
  }

  if(commandCode == 6){
    Serial.println("Relay 1 off");
    digitalWrite(r1, LOW);
    commandCode = 0;
  }
  
  if(commandCode == 7){
    Serial.println("Relay 2 on");
    digitalWrite(r2, HIGH);
    commandCode = 0;
  }
  
  if(commandCode == 8){
    Serial.println("Relay 2 off");
    digitalWrite(r2, LOW);
    commandCode = 0;
  }
  
  if(commandCode == 9){
    Serial.println("Relay 3 on");
    digitalWrite(r3, HIGH);
    commandCode = 0;
  }
  
  if(commandCode == 10){
    Serial.println("Relay 3 off");
    digitalWrite(r3, LOW);
    commandCode = 0;
  }
  
//End of Main set of if statements 
        
}//end of main loop

//start of functions needed to be called in them main loop

//ds18b20 code functions
void printTemperature(DeviceAddress deviceAddress)
{

float tempC = sensors.getTempC(deviceAddress);

   if (tempC == -127.00) 
   {
   Serial.print("Error getting temperature  ");
   } 
   else
   {
   Serial.print("C: ");
   Serial.print(tempC);
   Serial.print(" F: ");
   Serial.println(DallasTemperature::toFahrenheit(tempC));
   }
}
// ds18b20 end code

